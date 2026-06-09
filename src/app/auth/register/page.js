"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await register(form);
      router.push("/account");
    } catch (authError) {
      setError(authError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl rounded-[32px] border border-white/8 bg-white/[0.03] p-8">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <ShieldCheck className="h-6 w-6 text-amber-300" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Create account</p>
            <p className="text-sm text-zinc-400">Register to save your wishlist, orders, and checkout progress.</p>
          </div>
        </div>

        <h1 className="mt-8 text-4xl font-semibold text-white">Create your account</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-400">Sign up securely and access your MysticCommerce dashboard.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block text-sm text-zinc-400">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              required
              className="min-h-12 w-full rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-white outline-none focus:border-white/20"
            />
          </label>

          <label className="block text-sm text-zinc-400">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              required
              className="min-h-12 w-full rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-white outline-none focus:border-white/20"
            />
          </label>

          <label className="block text-sm text-zinc-400">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              required
              className="min-h-12 w-full rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-white outline-none focus:border-white/20"
            />
          </label>

          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-white px-5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create account
          </button>
        </form>

        <div className="mt-6 text-sm text-zinc-400">
          Already have an account? <Link href="/auth/login" className="text-white underline">Sign in</Link>.
        </div>
      </div>
    </div>
  );
}
