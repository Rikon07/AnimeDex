// src/app/register/page.js
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setOk("");
    setLoading(true);

    const form = e.currentTarget;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setErr(j?.error || "Registration failed");
      return;
    }

    setOk("Account created! Logging you in...");
    // Auto-login
    const login = await signIn("credentials", { email, password, redirect: false });
    if (login?.error) {
      setOk("");
      setErr("Registered, but auto-login failed. Please login manually.");
      return;
    }
    window.location.assign("/anime");
  }

  return (
    <div className="grid place-items-center py-10">
      <div className="w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10
                      bg-gradient-to-br from-white/70 to-white/30 dark:from-[#0b1218]/70 dark:to-[#0b1218]/30
                      backdrop-blur p-6 space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">Create account</h1>
          <p className="text-sm opacity-80">Join AnimeDex</p>
        </div>

        {ok ? <div className="rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3 py-2 text-sm">{ok}</div> : null}
        {err ? <div className="rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 px-3 py-2 text-sm">{err}</div> : null}

        <form onSubmit={onSubmit} className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm opacity-80">Name</span>
            <div className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2">
              <User size={16} className="opacity-70" />
              <input name="name" required placeholder="Your name" className="w-full bg-transparent outline-none" />
            </div>
          </label>

          <label className="grid gap-1">
            <span className="text-sm opacity-80">Email</span>
            <div className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2">
              <Mail size={16} className="opacity-70" />
              <input name="email" type="email" required placeholder="you@mail.com" className="w-full bg-transparent outline-none" />
            </div>
          </label>

          <label className="grid gap-1">
            <span className="text-sm opacity-80">Password</span>
            <div className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2">
              <Lock size={16} className="opacity-70" />
              <input name="password" type="password" required minLength={6} placeholder="Min 6 characters" className="w-full bg-transparent outline-none" />
            </div>
          </label>

          <button
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white
                       bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-amber-400
                       bg-[length:200%_auto] animate-[bg-pan_12s_linear_infinite] hover:opacity-95 disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
            {loading ? "Creating..." : "Create account"}
          </button>

          <p className="text-sm opacity-80 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--accent)] hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}