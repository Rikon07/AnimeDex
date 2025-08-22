import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-black/10 dark:border-white/10
      bg-gradient-to-br from-white/70 to-white/30 dark:from-[#0b1218]/70 dark:to-[#0b1218]/30
      backdrop-blur p-6 md:p-10 max-w-3xl mx-auto mt-10 text-center">

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-16 h-64 w-64 md:h-80 md:w-80 rounded-full bg-[var(--accent)]/25 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -left-10 h-56 w-56 md:h-72 md:w-72 rounded-full bg-[var(--secondary)]/25 blur-3xl animate-blob [animation-delay:2s]" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid
        [mask-image:radial-gradient(90%_120%_at_50%_0%,black_40%,transparent_100%)]" />

      <div className="space-y-4">
        <div className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs">
          <Compass size={14} className="text-[var(--accent)]" />
          <span className="opacity-80">Page not found</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold">404 — Lost in the multiverse</h1>
        <p className="opacity-80 text-sm md:text-base">
          The page you’re looking for doesn’t exist or has moved.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>
    </section>
  );
}