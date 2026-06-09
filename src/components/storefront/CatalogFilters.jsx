"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
];

const collectionOptions = [
  { value: "all", label: "All collections" },
  { value: "featured", label: "Featured" },
  { value: "best-sellers", label: "Best sellers" },
  { value: "new-arrivals", label: "New arrivals" },
  { value: "flash-deals", label: "Flash deals" },
  { value: "gaming-workspace", label: "Gaming & workspace" },
];

export default function CatalogFilters({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "All";
  const currentCollection = searchParams.get("collection") ?? "all";
  const currentSort = searchParams.get("sort") ?? "featured";
  const currentQuery = searchParams.get("q") ?? "";

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams.toString());

    if (!value || value === "All" || value === "all" || (key === "sort" && value === "featured")) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    router.push(`/products${next.toString() ? `?${next}` : ""}`);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    updateParam("q", String(formData.get("q") || "").trim());
  }

  return (
    <form onSubmit={handleSearchSubmit} className="grid gap-4 rounded-[30px] border border-white/8 bg-white/[0.03] p-5 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div className="relative">
        <input
          key={currentQuery}
          name="q"
          type="search"
          defaultValue={currentQuery}
          placeholder="Search products, categories, and creator tools"
          className="min-h-12 w-full rounded-2xl border border-white/10 bg-[#0b0c10] px-4 pr-28 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/20"
        />
        <button
          type="submit"
          className="absolute inset-y-1 right-1 inline-flex h-10 items-center justify-center rounded-2xl bg-white/10 px-4 text-zinc-200 transition hover:bg-white/15 hover:text-white"
          aria-label="Search products"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      <select
        value={currentCategory}
        onChange={(event) => updateParam("category", event.target.value)}
        className="min-h-12 rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-zinc-200 outline-none focus:border-white/20"
      >
        <option value="All">All categories</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        value={currentCollection}
        onChange={(event) => updateParam("collection", event.target.value)}
        className="min-h-12 rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-zinc-200 outline-none focus:border-white/20"
      >
        {collectionOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={currentSort}
        onChange={(event) => updateParam("sort", event.target.value)}
        className="min-h-12 rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-zinc-200 outline-none focus:border-white/20"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
}
