"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RefreshCcw, Home, Bug, ChevronDown } from "lucide-react";

export default function Error({ error, reset }) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log for debugging
    console.error("App error:", error);
  }, [error]);

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-black/10 dark:border-white/10
      bg-gradient-to-br from-white/70 to-white/30 dark:from-[#0b1218]/70 dark:to-[#0b1218]/30
      backdrop-blur p-6 md:p-10 max-w-3xl mx-auto mt-10 text-center">

      {/* Aurora blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-16 h-64 w-64 md:h-80 md:w-80 rounded-full bg-[var(--accent)]/25 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -left-10 h-56 w-56 md:h-72 md:w-72 rounded-full bg-[var(--secondary)]/25 blur-3xl animate-blob [animation-delay:2s]" />
      </div>
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid
        [mask-image:radial-gradient(90%_120%_at_50%_0%,black_40%,transparent_100%)]" />

      <div className="space-y-4">
        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs">
          <Bug size={14} className="text-[var(--accent)]" />
          <span className="opacity-80">Something went wrong</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-amber-400
            bg-clip-text text-transparent bg-[length:200%_auto] animate-bg-pan-slow">
            Unexpected error
          </span>
        </h1>

        <p className="opacity-80 text-sm md:text-base">
          We hit a snag. You can try again or head back home.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-white
              bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-amber-400
              bg-[length:200%_auto] animate-[bg-pan_12s_linear_infinite] hover:opacity-95 transition"
          >
            <RefreshCcw size={16} /> Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            <Home size={16} /> Go home
          </Link>
        </div>

        {/* Show error details in development */}
        {process.env.NODE_ENV !== "production" && (
          <div className="pt-2 text-left">
            <button
              onClick={() => setShowDetails((v) => !v)}
              className="inline-flex items-center gap-1 text-sm opacity-80 hover:opacity-100"
            >
              <ChevronDown
                size={16}
                className={`transition-transform ${showDetails ? "rotate-180" : ""}`}
              />
              {showDetails ? "Hide technical details" : "Show technical details"}
            </button>

            {showDetails && (
              <pre className="mt-2 rounded-lg p-3 overflow-auto text-xs border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                {String(error?.message || "Unknown error")}
                {"\n"}
                {String(error?.stack || "")}
              </pre>
            )}
          </div>
        )}
      </div>
    </section>
  );
}