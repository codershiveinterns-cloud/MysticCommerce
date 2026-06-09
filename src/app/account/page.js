"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { formatCurrency } from "@/lib/store-data";

export default function AccountPage() {
  const { user, logout } = useAuth();
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
        <h1 className="mt-4 text-4xl font-semibold text-white">Your account is ready</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-400">Sign in or create a new account to save wishlist items, checkout details, order history, and a tailored shopping experience.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link href="/auth/login" className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:border-white/20 hover:bg-white/5">
            Sign in
          </Link>
          <Link href="/auth/register" className="rounded-2xl border border-white/10 bg-white px-5 py-4 text-center text-sm font-semibold uppercase tracking-[0.24em] text-[#09090b] transition hover:bg-zinc-100">
            Create account
          </Link>
        </div>

        <p className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-xs leading-6 text-amber-100">
          Demo admin login: admin@mysticcommerce.local / Admin@12345
        </p>
      </div>
    </div>
  );
}
