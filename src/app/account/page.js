"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { formatCurrency } from "@/lib/store-data";

export default function AccountPage() {
  const { user, login, register, logout } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    queueMicrotask(() => {
      fetch("/api/orders", { credentials: "include" })
        .then((response) => response.json())
        .then((data) => setOrders(data.orders || []))
        .catch(() => setOrders([]));
    });
  }, [user]);

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (mode === "register") {
        await register(form);
      } else {
        await login({ email: form.email, password: form.password });
      }
    } catch (authError) {
      setError(authError.message);
    }
  }

  if (user) {
    return (
      <div className="min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="rounded-[32px] border border-white/8 bg-white/[0.03] p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Account</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">{user.name}</h1>
            <p className="mt-3 text-sm text-zinc-400">{user.email}</p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
              <ShieldCheck className="h-5 w-5" />
              Signed in as {user.role}
            </div>
            <button type="button" onClick={logout} className="mt-6 rounded-2xl border border-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-200 transition hover:border-white/20 hover:text-white">
              Sign out
            </button>
            {user.role === "admin" ? (
              <Link href="/admin" className="ml-3 inline-flex rounded-2xl bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100">
                Admin dashboard
              </Link>
            ) : null}
          </section>

          <section className="rounded-[32px] border border-white/8 bg-white/[0.03] p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Orders</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Order history</h2>
            <div className="mt-6 space-y-4">
              {orders.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-white/12 p-6 text-sm text-zinc-400">No orders yet. Completed checkout orders will appear here.</p>
              ) : (
                orders.map((order) => (
                  <article key={order.id} className="rounded-2xl border border-white/8 bg-black/20 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{order.orderNumber}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">{order.status}</p>
                      </div>
                      <p className="text-lg font-semibold text-white">{formatCurrency(order.total)}</p>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl rounded-[32px] border border-white/8 bg-white/[0.03] p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Secure account</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">{mode === "register" ? "Create your account" : "Sign in"}</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-400">Save order history, customer reviews, wishlist items, and checkout details securely.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {mode === "register" ? <AccountField label="Name" value={form.name} onChange={(value) => updateField("name", value)} required /> : null}
          <AccountField label="Email" type="email" value={form.email} onChange={(value) => updateField("email", value)} required />
          <AccountField label="Password" type="password" value={form.password} onChange={(value) => updateField("password", value)} required />
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <button type="submit" className="w-full rounded-2xl bg-white px-5 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100">
            {mode === "register" ? "Create account" : "Sign in"}
          </button>
        </form>

        <button type="button" onClick={() => setMode((value) => (value === "login" ? "register" : "login"))} className="mt-5 text-sm font-semibold text-zinc-300 transition hover:text-white">
          {mode === "register" ? "Already have an account? Sign in" : "Need an account? Create one"}
        </button>

        <p className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-xs leading-6 text-amber-100">
          Demo admin login: admin@mysticcommerce.local / Admin@12345
        </p>
      </div>
    </div>
  );
}

function AccountField({ label, value, onChange, type = "text", required = false }) {
  return (
    <label className="block text-sm text-zinc-400">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="min-h-12 w-full rounded-2xl border border-white/10 bg-[#0b0c10] px-4 text-sm text-white outline-none focus:border-white/20"
      />
    </label>
  );
}
