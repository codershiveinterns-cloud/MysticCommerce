"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/store-data";
import { useStore } from "@/components/storefront/StoreProvider";

export default function CheckoutPage() {
  const { cartItems, subtotal } = useStore();
  const shipping = cartItems.length > 0 ? 18 : 0;
  const total = subtotal + shipping;

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

          <div className="grid gap-6 md:grid-cols-2">
            <Panel title="Contact">
              <Field label="Email address" placeholder="you@example.com" />
            </Panel>
            <Panel title="Delivery">
              <Field label="City" placeholder="New York" />
            </Panel>
            <Panel title="Shipping address">
              <Field label="Address line" placeholder="123 Mystic Avenue" />
            </Panel>
            <Panel title="Payment">
              <Field label="Card placeholder" placeholder="4242 4242 4242 4242" />
            </Panel>
          </div>

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
                      <p className="text-xs text-zinc-500">{item.variant.name} · Qty {item.quantity}</p>
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

          <button type="button" className="mt-8 w-full rounded-2xl bg-white px-5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100">
            Place order
          </button>
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

function Field({ label, placeholder }) {
  return (
    <label className="block text-sm text-zinc-400">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        className="min-h-12 w-full rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/20"
      />
    </label>
  );
}
