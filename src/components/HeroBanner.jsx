// src/components/HeroBanner.jsx
import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  const posters = [
    { src: "https://thereadersbay.wordpress.com/wp-content/uploads/2019/07/7144770.png", alt: "Naruto & friends" },
    { src: "https://m.media-amazon.com/images/M/MV5BZjliODY5MzQtMmViZC00MTZmLWFhMWMtMjMwM2I3OGY1MTRiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", alt: "Jujutsu Kaisen key visual" },
    { src: "https://4kwallpapers.com/images/wallpapers/vinland-saga-2880x1800-14817.jpg", alt: "Vinland Saga" },
    { src: "https://4kwallpapers.com/images/wallpapers/edward-elric-3840x2743-10540.jpg", alt: "Fullmetal Alchemist" },
    { src: "https://4kwallpapers.com/images/wallpapers/tanjiro-kamado-2048x2048-9322.jpg", alt: "Demon Slayer" },
    { src: "https://wallpapers.com/images/hd/hunter-x-hunter-minimalist-bho9xujpbs7vavly.jpg", alt: "Hunter x Hunter" },
  ];

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

      <div className="relative grid gap-10 lg:grid-cols-2 items-center">
        {/* Left: Text + CTA */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="opacity-80">Watch • Rate • Share</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Find Your Next{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-amber-400 bg-clip-text text-transparent
              bg-[length:200%_auto] animate-bg-pan-slow">
              Binge‑Worthy Anime
            </span>
          </h1>

          <p className="text-sm sm:text-base opacity-80 max-w-prose">
            From shounen epics to cozy slice‑of‑life — explore trending titles, dive into details,
            and build your list. Track seasons, episodes, and rate shows 1–5 stars.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/anime"
              className="group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-white
                bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-amber-400
                bg-[length:200%_auto] animate-bg-pan-slow shadow-sm hover:shadow transition"
            >
              Browse Anime
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>

          </div>

          <div className="flex items-center gap-6 pt-4 text-sm opacity-80">
            <div><span className="font-semibold">Fresh</span> drops weekly</div>
            <div><span className="font-semibold">Rate</span> 1–5 stars</div>
            <div><span className="font-semibold">Get</span> the thrills</div>
          </div>
        </div>

        {/* Right: Glassy image grid using next/image */}
        <div className="relative">
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {posters.map((p, i) => (
              <div
                key={i}
                className="group relative h-28 sm:h-32 md:h-36 rounded-xl overflow-hidden
                  border border-black/10 dark:border-white/10
                  bg-white/10 dark:bg-white/5"
              >
                {/* Image */}
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 33vw"
                  className="object-cover scale-[1.02] transition-transform duration-700 group-hover:scale-110"
                  priority={i < 2} // boost LCP a bit
                />

                {/* Glass overlay (frosted) */}
                <div
                  className="absolute inset-0 rounded-xl
                    bg-white/10 dark:bg-white/5
                    backdrop-blur-[1px] sm:backdrop-blur-[1px]
                    transition-all duration-500
                    group-hover:bg-white/15 group-hover:backdrop-blur-[0px]"
                />

                {/* Soft gradient veil for depth */}
                <div className="pointer-events-none absolute inset-0
                  bg-gradient-to-t from-black/40 via-transparent to-transparent
                  opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Glare sweep on hover */}
                <div className="pointer-events-none absolute -inset-x-10 -top-1/2 h-[180%]
                  rotate-[20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent
                  blur-2xl opacity-0 group-hover:opacity-60 group-hover:translate-x-8
                  transition-all duration-700" />

                {/* Subtle inner ring */}
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/15 dark:ring-white/10" />
              </div>
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