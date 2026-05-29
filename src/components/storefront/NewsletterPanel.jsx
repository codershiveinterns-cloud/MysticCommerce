"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

export default function NewsletterPanel() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="rounded-[32px] border border-white/8 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-8 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Newsletter & offers</p>
          <h3 className="text-3xl font-semibold text-white sm:text-4xl">Get weekly drops, flash deal alerts, and curated tech picks.</h3>
          <p className="max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Join the MysticCommerce list for launch reminders, restocks, price drops, and premium setup inspiration tailored for gamers, creators, and modern professionals.
          </p>
        </div>

        {isSubmitted ? (
          <div className="rounded-[28px] border border-emerald-400/20 bg-emerald-400/10 p-6 text-zinc-100">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
              <Check className="h-4 w-4" />
              You are in
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-200">
              Thanks for subscribing. Your first curated MysticCommerce drop arrives soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/8 bg-[#0c0d10] p-5">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500" htmlFor="newsletter-email">
              Email address
            </label>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@example.com"
                className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-white/20"
              />
              <button type="submit" className="min-h-12 rounded-2xl bg-white px-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#09090b] transition hover:bg-zinc-100">
                <span className="flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  Subscribe
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
