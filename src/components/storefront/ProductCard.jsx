"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { formatCurrency, getProductImageSrc } from "@/lib/store-data";
import { useStore } from "@/components/storefront/StoreProvider";

export default function ProductCard({ product, priority = false }) {
  const { addToCart, getProductReviewStats, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);
  const reviewStats = getProductReviewStats(product.id);

  return (
    <motion.article whileHover={{ y: -6 }} className="group flex h-full flex-col overflow-hidden rounded-[28px] glass-panel-glow">
      <div className={`relative overflow-hidden border-b border-white/8 bg-gradient-to-br ${product.palette.panel}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_45%)]" />
        <div className={`absolute left-6 top-6 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/90 backdrop-blur ${product.palette.border}`}>
          {product.badge}
        </div>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-5 top-5 z-10 rounded-xl border p-2 transition ${
            wished ? "border-white/20 bg-white/10 text-white" : "border-white/10 bg-black/20 text-zinc-300 hover:text-white"
          }`}
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
        </button>
        <div className="relative aspect-[4/3] p-6">
          <Image
            src={getProductImageSrc(product.id)}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-[#09090b]/10 to-transparent" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-500">{product.category}</p>
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="text-lg font-semibold text-white transition group-hover:text-zinc-200">{product.name}</h3>
          </Link>
          <p className="text-sm leading-6 text-zinc-400">{product.tagline}</p>
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            <Star className="h-4 w-4 fill-white/80 text-white/80" />
            {reviewStats.count > 0 ? (
              <>
                <span>{reviewStats.average.toFixed(1)}</span>
                <span className="text-zinc-500">({reviewStats.count} reviews)</span>
              </>
            ) : (
              <span className="text-zinc-500">No reviews yet</span>
            )}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/6 pt-5">
          <div>
            <p className="text-xl font-semibold text-white">{formatCurrency(product.price)}</p>
            <p className="text-xs text-zinc-500 line-through">{formatCurrency(product.compareAtPrice)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/products/${product.id}`}
              className="rounded-xl border border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-200 transition hover:border-white/20 hover:text-white"
            >
              View
            </Link>
            <button
              type="button"
              onClick={() => addToCart(product.id, product.variants[0].id, 1)}
              className="rounded-xl bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Add
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
