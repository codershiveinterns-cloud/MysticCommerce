"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PackageCheck, Plus, ReceiptText, Save, ShieldCheck, WalletCards } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { formatCurrency } from "@/lib/store-data";

const ORDER_STATUSES = ["confirmed", "processing", "shipped", "delivered", "cancelled", "payment_pending"];

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const [summary, setSummary] = useState(null);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "Smart Gadgets",
    price: 99,
    compareAtPrice: 129,
    badge: "New",
    stock: 12,
    collections: "featured,new-arrivals",
  });
  const [error, setError] = useState("");

  async function loadAdminData() {
    setError("");

    try {
      const [summaryResponse, ordersResponse, inventoryResponse, productsResponse] = await Promise.all([
        fetch("/api/admin/summary", { credentials: "include" }),
        fetch("/api/admin/orders", { credentials: "include" }),
        fetch("/api/inventory", { credentials: "include" }),
        fetch("/api/admin/products", { credentials: "include" }),
      ]);

      if (!summaryResponse.ok || !ordersResponse.ok || !inventoryResponse.ok || !productsResponse.ok) {
        throw new Error("Admin access is required.");
      }

      const [summaryData, ordersData, inventoryData, productsData] = await Promise.all([
        summaryResponse.json(),
        ordersResponse.json(),
        inventoryResponse.json(),
        productsResponse.json(),
      ]);

      setSummary(summaryData.summary);
      setOrders(ordersData.orders || []);
      setInventory(inventoryData.inventory || []);
      setProducts(productsData.products || []);
    } catch (adminError) {
      setError(adminError.message);
    }
  }

  useEffect(() => {
    if (user?.role === "admin") {
      queueMicrotask(() => loadAdminData());
    }
  }, [user]);

  async function updateOrderStatus(orderId, status) {
    await fetch("/api/admin/orders", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });
    loadAdminData();
  }

  async function updateStock(productId, stock) {
    await fetch("/api/inventory", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, stock }),
    });
    loadAdminData();
  }

  async function saveProduct(event) {
    event.preventDefault();
    await fetch("/api/admin/products", {
      method: productForm.id ? "PATCH" : "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productForm),
    });
    setProductForm({
      name: "",
      category: productForm.category,
      price: 99,
      compareAtPrice: 129,
      badge: "New",
      stock: 12,
      collections: "featured,new-arrivals",
    });
    loadAdminData();
  }

  if (isLoading) {
    return <AdminShell title="Loading admin dashboard" />;
  }

  if (!user || user.role !== "admin") {
    return (
      <AdminShell title="Admin access required">
        <p className="max-w-xl text-sm leading-7 text-zinc-400">Sign in with an admin account to manage products, inventory, orders, and payments.</p>
        <Link href="/auth/login" className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100">
          Sign in
        </Link>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Admin dashboard">
      {error ? <p className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">{error}</p> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric icon={WalletCards} label="Revenue" value={formatCurrency(summary?.revenue || 0)} />
        <Metric icon={ReceiptText} label="Orders" value={summary?.orders || 0} />
        <Metric icon={ShieldCheck} label="Customers" value={summary?.customers || 0} />
        <Metric icon={PackageCheck} label="Low stock" value={summary?.lowStock || 0} />
      </div>

      <section className="rounded-[32px] border border-white/8 bg-white/[0.03] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">Order management</p>
        <div className="mt-5 space-y-4">
          {orders.length === 0 ? (
            <p className="text-sm text-zinc-400">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <article key={order.id} className="rounded-2xl border border-white/8 bg-black/20 p-5">
                <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
                  <div>
                    <p className="font-semibold text-white">{order.orderNumber}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">{order.customer?.email}</p>
                  </div>
                  <p className="text-lg font-semibold text-white">{formatCurrency(order.total)}</p>
                  <select
                    value={order.status}
                    onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                    className="min-h-11 rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-white outline-none"
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/8 bg-white/[0.03] p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">Product database</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Manage catalog products</h2>
          </div>
          <button
            type="button"
            onClick={() => setProductForm({ name: "", category: "Smart Gadgets", price: 99, compareAtPrice: 129, badge: "New", stock: 12, collections: "featured,new-arrivals" })}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-200"
          >
            <Plus className="h-4 w-4" />
            New
          </button>
        </div>

        <form onSubmit={saveProduct} className="mt-6 grid gap-4 lg:grid-cols-6">
          <Input label="Name" value={productForm.name} onChange={(value) => setProductForm((current) => ({ ...current, name: value }))} className="lg:col-span-2" />
          <Input label="Category" value={productForm.category} onChange={(value) => setProductForm((current) => ({ ...current, category: value }))} className="lg:col-span-2" />
          <Input label="Price" type="number" value={productForm.price} onChange={(value) => setProductForm((current) => ({ ...current, price: value }))} />
          <Input label="Stock" type="number" value={productForm.stock} onChange={(value) => setProductForm((current) => ({ ...current, stock: value }))} />
          <Input label="Compare at" type="number" value={productForm.compareAtPrice} onChange={(value) => setProductForm((current) => ({ ...current, compareAtPrice: value }))} />
          <Input label="Badge" value={productForm.badge} onChange={(value) => setProductForm((current) => ({ ...current, badge: value }))} />
          <Input label="Collections" value={productForm.collections} onChange={(value) => setProductForm((current) => ({ ...current, collections: value }))} className="lg:col-span-3" />
          <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#09090b]">
            <Save className="h-4 w-4" />
            Save
          </button>
        </form>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setProductForm({ ...product, collections: product.collections.join(",") })}
              className="rounded-2xl border border-white/8 bg-black/20 p-5 text-left transition hover:border-white/20"
            >
              <p className="font-semibold text-white">{product.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">{product.category}</p>
              <p className="mt-4 text-sm text-zinc-300">{formatCurrency(product.price)} · {product.stock} in stock</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/8 bg-white/[0.03] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">Inventory management</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {inventory.map((item) => (
            <article key={item.productId} className="rounded-2xl border border-white/8 bg-black/20 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">{item.sku}</p>
                </div>
                <input
                  type="number"
                  min="0"
                  value={item.stock}
                  onChange={(event) => updateStock(item.productId, event.target.value)}
                  className="min-h-11 w-24 rounded-2xl border border-white/10 bg-[#0b0c10] px-3 text-sm text-white outline-none"
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}

function AdminShell({ title, children = null }) {
  return (
    <div className="min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-[32px] border border-white/8 bg-white/[0.03] p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">MysticCommerce</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6">
      <Icon className="h-5 w-5 text-amber-200" />
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        className="min-h-12 w-full rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-white outline-none focus:border-white/20"
      />
    </label>
  );
}
