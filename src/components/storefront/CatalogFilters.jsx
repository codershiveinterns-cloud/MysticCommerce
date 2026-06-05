"use client";

import { useEffect, useState } from "react";
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
  const [query, setQuery] = useState(currentQuery);

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

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
    updateParam("q", query.trim());
  }

  return (
    <form onSubmit={handleSearchSubmit} className="grid gap-4 rounded-[30px] border border-white/8 bg-white/[0.03] p-5 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products, categories, and creator tools"
        className="min-h-12 rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/20"
      />

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
    </div>
  );
}
