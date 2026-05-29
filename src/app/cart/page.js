"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/store-data";
import { useStore } from "@/components/storefront/StoreProvider";

export default function CartPage() {
  const { cartItems, subtotal, updateQuantity, removeFromCart } = useStore();
  const shipping = cartItems.length > 0 ? 18 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/8 bg-white/[0.03] p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Cart</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Your frontend storefront cart</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
              This milestone keeps cart behavior lightweight and client-side while still delivering a realistic shopping flow for UI/UX review.
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="rounded-[32px] border border-white/8 bg-white/[0.03] p-8 text-center">
              <p className="text-lg font-semibold text-white">Your cart is empty.</p>
              <p className="mt-3 text-sm text-zinc-400">Browse the catalog and add premium tech products to preview the storefront experience.</p>
              <Link href="/products" className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100">
                Continue shopping
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <article key={`${item.product.id}-${item.variant.id}`} className="rounded-[30px] border border-white/8 bg-white/[0.03] p-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">{item.product.category}</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{item.product.name}</h2>
                    <p className="mt-2 text-sm text-zinc-400">Variant: {item.variant.name}</p>
                    <p className="mt-1 text-sm text-zinc-500">{item.product.delivery}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xl font-semibold text-white">{formatCurrency(item.lineTotal)}</p>
                    <p className="text-sm text-zinc-500">{formatCurrency(item.product.price)} each</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="inline-flex items-center overflow-hidden rounded-2xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity - 1)}
                      className="px-4 py-3 text-zinc-300 transition hover:text-white"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-3 text-sm font-semibold text-white">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.variant.id, item.quantity + 1)}
                      className="px-4 py-3 text-zinc-300 transition hover:text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id, item.variant.id)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-300 transition hover:border-white/20 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <aside className="rounded-[32px] border border-white/8 bg-white/[0.03] p-8 h-fit lg:sticky lg:top-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Summary</p>
          <div className="mt-6 space-y-4 text-sm text-zinc-400">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-white">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Estimated shipping</span>
              <span className="font-semibold text-white">{formatCurrency(shipping)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/8 pt-4 text-base">
              <span className="text-white">Estimated total</span>
              <span className="font-semibold text-white">{formatCurrency(total)}</span>
            </div>
          </div>

          <Link href="/checkout" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100">
            Continue to checkout
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-xs leading-6 text-zinc-500">
            Checkout is intentionally a polished placeholder in this milestone so the frontend journey can be reviewed without backend payment integration.
          </p>
        </aside>
      </div>
    </div>
  );
}
