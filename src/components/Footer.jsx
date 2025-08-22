"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Twitter, Mail, Heart, Send, ArrowUp } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onSubscribe(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setMsg("Please enter a valid email.");
      return;
    }
    setMsg("Thanks for subscribing! 🎉");
    setEmail("");
    setTimeout(() => setMsg(""), 3000);
  }

  return (
    <footer className="relative mt-10">
      {/* Animated gradient divider */}
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent bg-[length:200%_100%] animate-[bg-pan_8s_linear_infinite]" />

      <div className="relative overflow-hidden border-t border-black/10 dark:border-white/10
                      bg-white/60 dark:bg-black/30 backdrop-blur">
        {/* Ambient grid + soft mask */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(80%_120%_at_50%_0%,black_40%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {/* Brand + socials */}
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <span className="text-xl font-semibold bg-gradient-to-r from-sky-500 via-fuchsia-500 to-amber-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-[bg-pan_8s_linear_infinite]">
                  AnimeDex
                </span>
              </Link>
              <p className="text-sm opacity-80 max-w-sm">
                Discover your next anime. Modern UI, secure auth, and smooth performance.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Rikon07"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter/X"
                  className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="mailto:hello@example.com"
                  aria-label="Email"
                  className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="text-sm font-semibold opacity-80">Explore</div>
                <ul className="space-y-2 text-sm">
                  <li><Link className="hover:underline opacity-90" href="/">Home</Link></li>
                  <li><Link className="hover:underline opacity-90" href="/anime">Anime</Link></li>
                  <li><Link className="hover:underline opacity-90" href="/dashboard/add-anime">Add Anime</Link></li>
                </ul>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-semibold opacity-80">Account</div>
                <ul className="space-y-2 text-sm">
                  <li><Link className="hover:underline opacity-90" href="/login">Login</Link></li>
                  <li><Link className="hover:underline opacity-90" href="/register">Register</Link></li>
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <div className="text-sm font-semibold opacity-80">Stay updated</div>
              <p className="text-sm opacity-80">
                Join our newsletter for updates on new features and titles.
              </p>
              <form onSubmit={onSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent outline-none focus:ring-2 ring-[var(--accent)]/50 transition"
                />
                <button
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white
                             bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-amber-400
                             bg-[length:200%_auto] animate-[bg-pan_12s_linear_infinite] hover:opacity-95 transition"
                >
                  <Send size={16} />
                  Subscribe
                </button>
              </form>
              {msg ? (
                <div className="text-sm mt-1 opacity-90">{msg}</div>
              ) : (
                <div className="text-xs opacity-70">We respect your privacy. Unsubscribe anytime.</div>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs opacity-80">
              © {new Date().getFullYear()} AnimeDex — Made with{" "}
              <Heart className="inline-block text-rose-500" size={14} /> for anime fans.
            </div>
            <div className="text-xs opacity-80">
              <Link className="hover:underline" href="/anime">Browse</Link>
              <span className="mx-2">•</span>
              <Link className="hover:underline" href="/dashboard/add-anime">Add</Link>
              <span className="mx-2">•</span>
              <Link className="hover:underline" href="/login">Login</Link>
            </div>
          </div>
        </div>

        {/* Back to top (floating) */}
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-6 right-6 z-40 p-2.5 rounded-full border
                      border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#0a171f]/80 backdrop-blur
                      shadow-sm hover:shadow transition
                      ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}