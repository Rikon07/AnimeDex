import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-black/10 dark:border-white/10
      bg-gradient-to-br from-white/70 to-white/30 dark:from-[#0b1218]/70 dark:to-[#0b1218]/30
      backdrop-blur px-6 py-14 sm:px-10 sm:py-20 md:px-14 md:py-24">

      {/* Aurora blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -right-16 h-64 w-64 md:h-80 md:w-80 rounded-full bg-[var(--accent)]/25 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -left-10 h-56 w-56 md:h-72 md:w-72 rounded-full bg-[var(--secondary)]/25 blur-3xl animate-blob [animation-delay:2s]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-56 w-56 md:h-72 md:w-72 rounded-full bg-[var(--primary)]/20 blur-3xl animate-blob [animation-delay:4s]" />
      </div>

      {/* Grid overlay with soft mask */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid
        [mask-image:radial-gradient(80%_80%_at_50%_50%,black_40%,transparent_100%)]" />

      <div className="relative grid gap-10 md:grid-cols-2 items-center">
        {/* Left: Text + CTAs */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="opacity-80">Watch • Feel • Enjoy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Explore Your Next{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-amber-400 bg-clip-text text-transparent
              bg-[length:200%_auto] animate-bg-pan-slow">
              Anime
            </span>
          </h1>

          <p className="text-sm sm:text-base opacity-80 max-w-prose">
            Browse trending titles, dive into details, and add your favorites to AnimeDex. Clean UI, fast loading, and dark‑mode ready.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/anime"
              className="group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-white
                bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-amber-400
                bg-[length:200%_auto] animate-bg-pan-slow shadow-sm hover:shadow
                transition"
            >
              Browse Anime
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>

            <Link
              href="/login"
              className="shine inline-flex items-center gap-2 rounded-lg px-4 py-2.5
                border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              Login
            </Link>
          </div>

          <div className="flex items-center gap-6 pt-4 text-sm opacity-80">
            <div><span className="font-semibold">10k+</span> titles</div>
            <div><span className="font-semibold">Fast</span> SSR/ISR</div>
            <div><span className="font-semibold">Secure</span> Auth</div>
          </div>
        </div>

        {/* Right: Decorative mock cards/chips */}
        <div className="relative">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-28 sm:h-32 md:h-36 rounded-xl border border-black/10 dark:border-white/10
                  bg-[radial-gradient(120%_140%_at_30%_20%,rgba(255,255,255,.6),transparent_60%)]
                  dark:bg-[radial-gradient(120%_140%_at_30%_20%,rgba(255,255,255,.08),transparent_60%)]
                  backdrop-blur"
                style={{ animationDelay: `${(i % 3) * 0.6}s` }}
              />
            ))}
          </div>

          {/* Floating chips */}
          <div className="absolute -top-3 right-0 md:-right-4">
            <div className="animate-float inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs
              bg-[var(--secondary)]/25 border border-black/10 dark:border-white/10 backdrop-blur">
              ⭐ Trending
            </div>
          </div>
          <div className="absolute -bottom-4 left-0">
            <div className="animate-float inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs
              bg-[var(--primary)]/20 border border-black/10 dark:border-white/10 backdrop-blur"
              style={{ animationDelay: "1s" }}
            >
              🎬 New Seasons
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}