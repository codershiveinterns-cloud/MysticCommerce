"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { useStore } from "@/components/storefront/StoreProvider";
import { getProductById } from "@/lib/store-data";
import ProductCard from "@/components/storefront/ProductCard";

export default function WishlistPage() {
  const { user } = useAuth();
  const { wishlistIds } = useStore();
  const wishlistProducts = wishlistIds.map((productId) => getProductById(productId)).filter(Boolean);

  return (
    <div className="min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-[34px] border border-white/8 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-8 sm:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Wishlist</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Your saved picks</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
            {user
              ? "These items will be saved to your account so you can revisit them anytime."
              : "Sign in to save your wishlist to your account and access it from any device."}
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="rounded-[32px] border border-white/8 bg-white/[0.03] p-10 text-center text-zinc-400">
            <p className="text-xl font-semibold text-white">Your wishlist is empty</p>
            <p className="mt-3 text-sm leading-7">Add products from the catalog to save them for later.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/products" className="rounded-2xl border border-white/10 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#09090b] transition hover:bg-zinc-100">
                Browse catalog
              </Link>
              {!user ? (
                <Link href="/auth/login" className="rounded-2xl border border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white/20 hover:bg-white/5">
                  Sign in
                </Link>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
