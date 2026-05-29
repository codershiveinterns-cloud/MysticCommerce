"use client";

import Link from "next/link";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <footer className="relative mt-16 border-t border-white/8 bg-[#050507]">
      <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#11131a] text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-white">MysticCommerce</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Future-ready shopping</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-zinc-400">
            A premium storefront concept for electronics, creator gear, gaming accessories, mobile tools, smart home devices, and everyday tech essentials.
          </p>
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Frontend milestone · 7 days · 2 revisions
          </div>
        </div>

        <FooterColumn
          title="Store"
          links={[
            { href: "/products", label: "All products" },
            { href: "/products?collection=best-sellers", label: "Best sellers" },
            { href: "/products?collection=flash-deals", label: "Flash deals" },
            { href: "/products?collection=new-arrivals", label: "New arrivals" },
          ]}
        />

        <FooterColumn
          title="Categories"
          links={[
            { href: "/products?category=Gaming%20Accessories", label: "Gaming accessories" },
            { href: "/products?category=Creator%20%26%20Streaming%20Accessories", label: "Creator gear" },
            { href: "/products?category=Smart%20Gadgets", label: "Smart gadgets" },
            { href: "/products?category=Wireless%20Headphones%20%26%20Audio", label: "Audio" },
          ]}
        />

        <div className="space-y-4 rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white">Milestone delivery</p>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li>Premium homepage and storefront UI</li>
            <li>Responsive product, catalog, and category layouts</li>
            <li>Navigation, animations, and mobile optimization</li>
            <li>Frontend architecture for future ecommerce growth</li>
          </ul>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setIsSubscribed(true);
            }}
            className="space-y-3"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="min-h-11 w-full rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-white/20"
            />
            <button type="submit" className="min-h-11 w-full rounded-2xl bg-white px-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#09090b] transition hover:bg-zinc-100">
              {isSubscribed ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="h-4 w-4" />
                  Subscribed
                </span>
              ) : (
                "Join updates"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-zinc-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {currentYear} MysticCommerce. UI/UX and frontend milestone storefront concept.</p>
          <div className="flex items-center gap-5">
            <Link href="/cart" className="transition hover:text-zinc-300">
              Cart
            </Link>
            <Link href="/checkout" className="transition hover:text-zinc-300">
              Checkout
            </Link>
            <Link href="/products" className="transition hover:text-zinc-300">
              Catalog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white">{title}</p>
      <div className="mt-4 grid gap-3 text-sm text-zinc-400">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="transition hover:text-white">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
