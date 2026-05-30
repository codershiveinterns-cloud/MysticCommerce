"use client";

import { use, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Heart, ShieldAlert, ShoppingBag, Sparkles, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/storefront/ProductCard";
import ProductArtwork from "@/components/storefront/ProductArtwork";
import ProductReviews from "@/components/storefront/ProductReviews";
import { useStore } from "@/components/storefront/StoreProvider";
import { formatCurrency, getProductById, getProductImageSrc, getRelatedProducts } from "@/lib/store-data";

export default function ProductPage({ params }) {
  const { id } = use(params);
  const product = getProductById(id) ?? getProductById(1);

  return <ProductDetailContent key={product.id} product={product} />;
}

function ProductDetailContent({ product }) {
  const relatedProducts = useMemo(() => getRelatedProducts(product, 4), [product]);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, getProductReviewStats, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);
  const reviewStats = getProductReviewStats(product.id);

  function handleAddToCart() {
    addToCart(product.id, selectedVariant.id, quantity);
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1800);
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="absolute right-[-10%] top-16 h-80 w-80 rounded-full bg-cyan-400/10 blur-[130px]" />
      <div className="absolute left-[-10%] top-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-[130px]" />

      <div className="mx-auto max-w-7xl space-y-10">
        <Link href="/products" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="space-y-5">
            <div className={`relative overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br ${product.palette.panel} p-8 sm:p-10`}>
              <ProductArtwork illustration={product.illustration} accent={product.palette.glow} />
              <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
                {product.badge}
              </div>
              <div className="relative mx-auto aspect-square max-w-xl overflow-hidden rounded-[28px] border border-white/8 bg-black/20">
                <Image
                  src={getProductImageSrc(product.id)}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-200">
                  <Sparkles className={`h-4 w-4 ${product.palette.accent}`} />
                  {product.delivery}
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`rounded-[24px] border p-4 text-left transition ${
                    selectedVariant.id === variant.id
                      ? "border-white/20 bg-white/[0.05]"
                      : "border-white/8 bg-white/[0.03] hover:border-white/16"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-4 w-4 rounded-full ${variant.swatch}`} />
                    <div>
                      <p className="text-sm font-semibold text-white">{variant.name}</p>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Finish</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">{product.category}</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{product.name}</h1>
              <p className="text-lg leading-8 text-zinc-300">{product.tagline}</p>
              <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-300">
                <div className="flex items-center gap-2">
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
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  {product.serialNumber}
                </span>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/8 bg-white/[0.03] p-6 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Price</p>
                  <div className="mt-2 flex items-center gap-3">
                    <p className="text-3xl font-semibold text-white">{formatCurrency(product.price)}</p>
                    <p className="text-sm text-zinc-500 line-through">{formatCurrency(product.compareAtPrice)}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-emerald-300">{product.stock > 5 ? "In stock and ready to ship" : `Only ${product.stock} left`}</p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                <div className="inline-flex items-center overflow-hidden rounded-2xl border border-white/10">
                  <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="px-4 py-3 text-zinc-300 transition hover:text-white">
                    -
                  </button>
                  <span className="px-4 py-3 text-sm font-semibold text-white">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))}
                    className="px-4 py-3 text-zinc-300 transition hover:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="rounded-2xl bg-white px-5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100"
                >
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    {isAdded ? "Added to cart" : "Add to cart"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`rounded-2xl border p-4 transition ${
                    wished ? "border-white/20 bg-white/[0.05] text-white" : "border-white/10 text-zinc-300 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {product.highlights.map((highlight) => (
                <div key={highlight} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-sm text-zinc-300">
                  <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/8">
                    <Check className="h-4 w-4 text-white" />
                  </span>
                  <p className="leading-6">{highlight}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[30px] border border-white/8 bg-white/[0.03] p-6 sm:p-7">
              <div className="flex gap-5 border-b border-white/8 pb-4 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
                {[
                  ["description", "Description"],
                  ["specs", "Specs"],
                  ["advisory", "Advisory"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setActiveTab(value)}
                    className={`relative pb-2 transition ${activeTab === value ? "text-white" : "hover:text-zinc-300"}`}
                  >
                    {label}
                    {activeTab === value ? <span className="absolute inset-x-0 bottom-0 h-px bg-white" /> : null}
                  </button>
                ))}
              </div>

              <div className="mt-5 min-h-28 text-sm leading-7 text-zinc-400">
                <AnimatePresence mode="wait">
                  {activeTab === "description" ? (
                    <motion.div key="description" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
                      {product.description}
                    </motion.div>
                  ) : null}

                  {activeTab === "specs" ? (
                    <motion.div key="specs" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="space-y-3">
                      {Object.entries(product.specs).map(([label, value]) => (
                        <div key={label} className="flex flex-col gap-1 border-b border-white/6 pb-3 sm:flex-row sm:items-center sm:justify-between">
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</span>
                          <span className="text-zinc-200">{value}</span>
                        </div>
                      ))}
                    </motion.div>
                  ) : null}

                  {activeTab === "advisory" ? (
                    <motion.div
                      key="advisory"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="flex gap-3 rounded-[24px] border border-amber-300/15 bg-amber-400/10 p-4 text-zinc-200"
                    >
                      <ShieldAlert className="mt-1 h-4 w-4 shrink-0 text-amber-300" />
                      <p>{product.advisory}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <ProductReviews product={product} />

        <section className="space-y-6 border-t border-white/8 pt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Related picks</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Keep the storefront journey going</h2>
            </div>
            <Link href="/products" className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400 transition hover:text-white">
              View full catalog
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} priority={index < 2} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

