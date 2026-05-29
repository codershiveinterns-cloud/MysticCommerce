"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { brandPartners, homeMetrics } from "@/lib/store-data";

export default function StorefrontHero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.16),transparent_22%),radial-gradient(circle_at_bottom,rgba(244,114,182,0.08),transparent_28%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400"
          >
            <Zap className="h-4 w-4 text-cyan-300" />
            Premium tech storefront · 2026 drop
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="space-y-6"
          >
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Discover the future of <span className="text-gradient">gaming, workspace, and lifestyle tech.</span>
            </h1>
            <p className="max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              MysticCommerce curates premium electronics, creator gear, smart home upgrades, and everyday tech essentials for modern shoppers who want performance and design in the same cart.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/products" className="rounded-2xl bg-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100">
              <span className="flex items-center justify-center gap-2">
                Shop the catalog
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
            <Link href="#collections" className="rounded-2xl border border-white/10 px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-100 transition hover:border-white/20 hover:bg-white/[0.04]">
              Explore collections
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="grid max-w-xl grid-cols-3 gap-4 border-t border-white/8 pt-8"
          >
            {homeMetrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-2xl font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_45%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br from-slate-950 via-[#111827] to-[#09090b] p-6 shadow-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_34%,transparent_60%,rgba(56,189,248,0.14))]" />
            <div className="relative grid gap-4 sm:grid-cols-2">
              <SpotlightCard title="New arrivals" text="Fresh smart gadgets, creator tools, and premium peripherals landing weekly." />
              <SpotlightCard title="Flash deals" text="Short-window discounts on charging, gaming, and mobile essentials." />
              <SpotlightCard title="Setup-ready" text="Collections designed to pair gaming gear with clean workstation style." />
              <SpotlightCard title="Trusted picks" text="Customer-loved audio, creator, and lifestyle tech curated by category." />
            </div>
            <div className="relative mt-6 rounded-[28px] border border-white/10 bg-black/30 p-5">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-400">
                <Sparkles className="h-4 w-4 text-violet-300" />
                Brand partnerships
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {brandPartners.map((partner) => (
                  <span key={partner} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold tracking-[0.18em] text-zinc-200">
                    {partner}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SpotlightCard({ title, text }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
      <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{text}</p>
    </div>
  );
}
