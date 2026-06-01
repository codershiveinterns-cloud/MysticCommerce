"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PackageCheck, ReceiptText, ShieldCheck, WalletCards } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { formatCurrency } from "@/lib/store-data";

const ORDER_STATUSES = ["confirmed", "processing", "shipped", "delivered", "cancelled", "payment_pending"];

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const [summary, setSummary] = useState(null);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");

  async function loadAdminData() {
    setError("");

    try {
      const [summaryResponse, ordersResponse, inventoryResponse] = await Promise.all([
        fetch("/api/admin/summary", { credentials: "include" }),
        fetch("/api/admin/orders", { credentials: "include" }),
        fetch("/api/inventory", { credentials: "include" }),
      ]);

      if (!summaryResponse.ok || !ordersResponse.ok || !inventoryResponse.ok) {
        throw new Error("Admin access is required.");
      }

      const [summaryData, ordersData, inventoryData] = await Promise.all([
        summaryResponse.json(),
        ordersResponse.json(),
        inventoryResponse.json(),
      ]);

      setSummary(summaryData.summary);
      setOrders(ordersData.orders || []);
      setInventory(inventoryData.inventory || []);
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

  if (isLoading) {
    return <AdminShell title="Loading admin dashboard" />;
  }

  if (!user || user.role !== "admin") {
    return (
      <AdminShell title="Admin access required">
        <p className="max-w-xl text-sm leading-7 text-zinc-400">Sign in with an admin account to manage products, inventory, orders, and payments.</p>
        <Link href="/account" className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100">
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
