"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Grid2X2, Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getStoreCategories } from "@/lib/store-data";
import { useStore } from "@/components/storefront/StoreProvider";

export default function Navbar() {
  const router = useRouter();
  const { cartCount, wishlistCount } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const categories = useMemo(() => getStoreCategories().slice(0, 5), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleSearchSubmit(event) {
    event.preventDefault();
    const normalized = query.trim();
    router.push(`/products${normalized ? `?q=${encodeURIComponent(normalized)}` : ""}`);
    setIsOpen(false);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-panel border-b border-white/8 py-3 shadow-2xl" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/brand/mysticcommerce-logo-crest.svg"
              alt="MysticCommerce"
              width={720}
              height={240}
              priority
              className="h-14 w-auto max-w-[180px] object-contain sm:h-16 sm:max-w-[210px]"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link href="/" className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400 transition hover:text-white">
              Home
            </Link>
            <Link href="/products" className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400 transition hover:text-white">
              Catalog
            </Link>
            <Link href="/#collections" className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400 transition hover:text-white">
              Collections
            </Link>
            <Link href="/#reviews" className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400 transition hover:text-white">
              Reviews
            </Link>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2">
              <Search className="h-4 w-4 text-zinc-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products"
                className="w-44 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
              />
            </form>
            <Link href="/products" className="relative rounded-2xl border border-white/10 p-3 text-zinc-300 transition hover:border-white/20 hover:text-white">
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 ? <Badge>{wishlistCount}</Badge> : null}
            </Link>
            <Link href="/cart" className="relative rounded-2xl bg-white p-3 text-[#09090b] transition hover:bg-zinc-100">
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 ? <Badge dark>{cartCount}</Badge> : null}
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <Link href="/cart" className="relative rounded-2xl bg-white p-3 text-[#09090b]">
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 ? <Badge dark>{cartCount}</Badge> : null}
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="rounded-2xl border border-white/10 p-3 text-zinc-300 transition hover:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-4 top-24 z-40 rounded-[28px] border border-white/10 bg-[#0b0c10]/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3">
              <Search className="h-4 w-4 text-zinc-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
              />
            </form>

            <div className="mt-5 grid gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-zinc-300">
              <Link href="/" onClick={() => setIsOpen(false)} className="rounded-2xl border border-white/8 px-4 py-3 hover:border-white/16 hover:text-white">
                Home
              </Link>
              <Link href="/products" onClick={() => setIsOpen(false)} className="rounded-2xl border border-white/8 px-4 py-3 hover:border-white/16 hover:text-white">
                Catalog
              </Link>
            </div>

            <div className="mt-6 rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                <Grid2X2 className="h-4 w-4" />
                Popular categories
              </div>
              <div className="grid gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/products?category=${encodeURIComponent(category.name)}`}
                    onClick={() => setIsOpen(false)}
                    className="rounded-2xl border border-white/8 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300 hover:border-white/16 hover:text-white"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Badge({ children, dark = false }) {
  return (
    <span
      className={`absolute -right-2 -top-2 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold ${
        dark ? "bg-[#09090b] text-white" : "bg-white text-[#09090b]"
      }`}
    >
      {children}
    </span>
  );
}
