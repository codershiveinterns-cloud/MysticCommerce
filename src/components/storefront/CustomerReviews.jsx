"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useStore } from "@/components/storefront/StoreProvider";

export default function CustomerReviews() {
  const { getAllReviews, isHydrated } = useStore();
  const reviews = getAllReviews().slice(0, 3);

  if (!isHydrated) {
    return <ReviewNotice title="Loading customer reviews" text="Checking for reviews submitted on this device." />;
  }

  if (reviews.length === 0) {
    return (
      <ReviewNotice
        title="No customer reviews yet"
        text="Reviews will appear here after shoppers submit them from product pages."
        action={<Link href="/products" className="mt-6 inline-flex rounded-2xl bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100">Review a product</Link>}
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {reviews.map((review) => (
        <article key={review.id} className="rounded-[28px] border border-white/8 bg-white/[0.03] p-7">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className={`h-4 w-4 ${index < review.rating ? "fill-white/80 text-white/80" : "text-zinc-700"}`} />
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-white">{review.title}</p>
          <p className="mt-3 text-sm leading-7 text-zinc-400">&quot;{review.comment}&quot;</p>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-white">
              {getInitials(review.name)}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{review.name}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{review.product.name}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ReviewNotice({ title, text, action = null }) {
  return (
    <div className="rounded-[28px] border border-dashed border-white/12 bg-white/[0.02] p-8 text-center">
      <p className="text-xl font-semibold text-white">{title}</p>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-400">{text}</p>
      {action}
    </div>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
