"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/store-data";
import { useAuth } from "@/components/auth/AuthProvider";
import { useStore } from "@/components/storefront/StoreProvider";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cartItems, clearCart, subtotal } = useStore();
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    city: "",
    address: "",
    paymentMethod: "mock-card",
  });
  const [orderResult, setOrderResult] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shipping = cartItems.length > 0 ? 18 : 0;
  const total = subtotal + shipping;

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setOrderResult(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          name: form.name || user?.name || "",
          email: form.email || user?.email || "",
          items: cartItems.map((item) => ({
            productId: item.product.id,
            variantId: item.variant.id,
            quantity: item.quantity,
          })),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to place order.");
      }

      clearCart();
      setOrderResult(data);
    } catch (checkoutError) {
      setError(checkoutError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/8 bg-white/[0.03] p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Checkout</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Secure checkout for premium tech orders</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
              Add your contact, delivery, and payment details to complete your MysticCommerce order.
            </p>
          </div>

          {!user ? (
            <div className="rounded-[28px] border border-amber-300/20 bg-amber-300/10 p-6 text-sm leading-7 text-amber-100">
              Sign in or create an account before placing an order so your order history, cart, and support details can be saved securely.
              <Link href="/account" className="ml-2 font-semibold text-white underline underline-offset-4">
                Go to account
              </Link>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
            <Panel title="Contact">
              <Field label="Full name" value={form.name || user?.name || ""} onChange={(value) => updateField("name", value)} placeholder="Your name" required />
              <Field label="Email address" type="email" value={form.email || user?.email || ""} onChange={(value) => updateField("email", value)} placeholder="you@example.com" required />
            </Panel>
            <Panel title="Delivery">
              <Field label="City" value={form.city} onChange={(value) => updateField("city", value)} placeholder="New York" required />
            </Panel>
            <Panel title="Shipping address">
              <Field label="Address line" value={form.address} onChange={(value) => updateField("address", value)} placeholder="123 Mystic Avenue" required />
            </Panel>
            <Panel title="Payment">
              <label className="block text-sm text-zinc-400">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Gateway mode</span>
                <select
                  value={form.paymentMethod}
                  onChange={(event) => updateField("paymentMethod", event.target.value)}
                  className="min-h-12 w-full rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-white outline-none focus:border-white/20"
                >
                  <option value="mock-card">Mock secure card authorization</option>
                  <option value="cod">Cash on delivery</option>
                </select>
              </label>
            </Panel>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={!user || cartItems.length === 0 || isSubmitting}
                className="w-full rounded-2xl bg-white px-5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
              >
                {isSubmitting ? "Placing order" : "Place secure order"}
              </button>
              {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
              {orderResult ? (
                <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
                  {orderResult.message} Payment status: {orderResult.payment.status}.
                </p>
              ) : null}
            </div>
          </form>

          <div className="rounded-[32px] border border-emerald-400/20 bg-emerald-400/10 p-6 text-zinc-100">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">Buyer protection</p>
                <p className="mt-2 text-sm leading-6 text-zinc-200">
                  Every order is reviewed for safe dispatch, tracked delivery, and support coverage on eligible products.
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-[32px] border border-white/8 bg-white/[0.03] p-8 h-fit lg:sticky lg:top-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Order summary</p>
          <div className="mt-6 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-sm text-zinc-400">No items in cart yet. Add products from the catalog to begin checkout.</p>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.product.id}-${item.variant.id}`} className="rounded-2xl border border-white/8 bg-black/20 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.product.name}</p>
                      <p className="text-xs text-zinc-500">{item.variant.name} / Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-white">{formatCurrency(item.lineTotal)}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 space-y-4 border-t border-white/8 pt-6 text-sm text-zinc-400">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-white">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-white">{formatCurrency(shipping)}</span>
            </div>
            <div className="flex items-center justify-between text-base">
              <span className="text-white">Estimated total</span>
              <span className="font-semibold text-white">{formatCurrency(total)}</span>
            </div>
          </div>

          <Link href="/products" className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400 transition hover:text-white">
            Continue browsing
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, type = "text", required = false }) {
  return (
    <label className="block text-sm text-zinc-400">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        className="min-h-12 w-full rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/20"
      />
    </label>
  );
}
