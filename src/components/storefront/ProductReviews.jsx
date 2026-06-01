"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function ProductReviews({ product }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const stats = useMemo(() => {
    const average = reviews.length ? reviews.reduce((total, review) => total + Number(review.rating || 0), 0) / reviews.length : 0;
    return { average, count: reviews.length };
  }, [reviews]);

  useEffect(() => {
    queueMicrotask(() => {
      setIsLoading(true);
      fetch(`/api/reviews?productId=${product.id}`)
        .then((response) => response.json())
        .then((data) => setReviews(data.reviews || []))
        .finally(() => setIsLoading(false));
    });
  }, [product.id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/reviews", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, rating, title, comment }),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to submit review.");
      return;
    }

    setReviews((current) => [data.review, ...current]);
    setTitle("");
    setComment("");
    setRating(5);
    setIsSubmitted(true);
    window.setTimeout(() => setIsSubmitted(false), 2200);
  }

  return (
    <section id="reviews" className="space-y-6 border-t border-white/8 pt-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Product reviews</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Share your experience</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
            Reviews shown here are submitted by signed-in MysticCommerce customers and stored in the backend database.
          </p>
        </div>
        <div className="rounded-[24px] border border-white/8 bg-white/[0.03] px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">Current rating</p>
          <div className="mt-2 flex items-center gap-2 text-white">
            <Star className="h-5 w-5 fill-white/80 text-white/80" />
            <span className="text-2xl font-semibold">{stats.count ? stats.average.toFixed(1) : "New"}</span>
            <span className="text-sm text-zinc-500">{stats.count === 1 ? "1 review" : `${stats.count} reviews`}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {user ? (
          <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">Write a review</p>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Rating</label>
                <div className="mt-3 flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      aria-label={`${value} star rating`}
                      className={`rounded-xl border p-2 transition ${value <= rating ? "border-amber-300/40 bg-amber-300/10 text-amber-200" : "border-white/10 text-zinc-500 hover:text-zinc-300"}`}
                    >
                      <Star className={`h-5 w-5 ${value <= rating ? "fill-current" : ""}`} />
                    </button>
                  ))}
                </div>
              </div>
              <ReviewInput label="Review title" value={title} onChange={setTitle} placeholder="What stood out?" required />
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Review</span>
                <textarea
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  required
                  minLength={20}
                  placeholder="Tell shoppers about fit, quality, delivery, setup, or performance."
                  className="mt-2 min-h-32 w-full resize-none rounded-2xl border border-white/10 bg-[#0b0c10] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/20"
                />
              </label>
              {error ? <p className="text-sm text-red-300">{error}</p> : null}
              <button type="submit" className="w-full rounded-2xl bg-white px-5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100">
                {isSubmitted ? "Review added" : "Submit review"}
              </button>
            </div>
          </form>
        ) : (
          <div className="rounded-[28px] border border-amber-300/20 bg-amber-300/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-100">Sign in to review</p>
            <p className="mt-3 text-sm leading-7 text-amber-100/80">Customer reviews are linked to authenticated accounts.</p>
            <Link href="/account" className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100">
              Sign in
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {isLoading ? (
            <ReviewEmptyState title="Loading reviews" text="Checking the review database." />
          ) : reviews.length === 0 ? (
            <ReviewEmptyState title="No reviews yet" text="This product is ready for its first customer review." />
          ) : (
            reviews.map((review) => (
              <article key={review.id} className="rounded-[28px] border border-white/8 bg-white/[0.03] p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{review.title}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      {review.name} / {formatReviewDate(review.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className={`h-4 w-4 ${index < review.rating ? "fill-white/80 text-white/80" : "text-zinc-700"}`} />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-400">&quot;{review.comment}&quot;</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function ReviewInput({ label, value, onChange, placeholder, required = false }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-2 min-h-12 w-full rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/20"
      />
    </label>
  );
}

function ReviewEmptyState({ title, text }) {
  return (
    <div className="rounded-[28px] border border-dashed border-white/12 bg-white/[0.02] p-8 text-center">
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
    </div>
  );
}

function formatReviewDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
