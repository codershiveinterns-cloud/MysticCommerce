import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={`/products?category=${encodeURIComponent(category.name)}`}
          className="group rounded-[28px] border border-white/8 bg-white/[0.03] p-7 transition hover:border-white/16 hover:bg-white/[0.05]"
        >
          <div className="flex h-full flex-col justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                  {category.productCount} items
                </span>
              </div>
              <p className="text-sm leading-6 text-zinc-400">{category.description}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-200 transition group-hover:gap-3 group-hover:text-white">
              Browse category
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
