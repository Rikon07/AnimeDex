"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { LogIn, Mail, Lock, Loader2, Chrome } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) return setErr("Invalid email or password");

    window.location.assign("/anime");
  }

  return (
    <div className="grid place-items-center py-10">
      <div className="w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10
                      bg-gradient-to-br from-white/70 to-white/30 dark:from-[#0b1218]/70 dark:to-[#0b1218]/30
                      backdrop-blur p-6 space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-sm opacity-80">Welcome back</p>
        </div>

        {err ? <div className="rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 px-3 py-2 text-sm">{err}</div> : null}

        <form onSubmit={onSubmit} className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm opacity-80">Email</span>
            <div className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2">
              <Mail size={16} className="opacity-70" />
              <input name="email" type="email" required className="w-full bg-transparent outline-none" />
            </div>
          </label>

          <label className="grid gap-1">
            <span className="text-sm opacity-80">Password</span>
            <div className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2">
              <Lock size={16} className="opacity-70" />
              <input name="password" type="password" required className="w-full bg-transparent outline-none" />
            </div>
          </label>

          <button disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white
                       bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-amber-400
                       bg-[length:200%_auto] animate-[bg-pan_12s_linear_infinite] hover:opacity-95 disabled:opacity-60">
            {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google OAuth */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/anime" })}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
        >
          <Chrome size={18} /> Continue with Google
        </button>

        <p className="text-sm opacity-80 text-center">
          New here? <Link href="/register" className="text-[var(--accent)] hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}