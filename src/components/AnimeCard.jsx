// src/components/AnimeCard.jsx
import Link from "next/link";
import { Star, Tags, Hash, Layers, ImageIcon } from "lucide-react";

export default function AnimeCard({ anime }) {
  const id = anime.id || anime._id;
  const genresArr = Array.isArray(anime.genres)
    ? anime.genres
    : String(anime.genres || "")
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean);

  // Normalize rating to 1–5 stars (in case old data was 0–10)
  const raw = Number(anime.rating);
  const normalized = Number.isFinite(raw) ? (raw > 5 ? Math.round(raw / 2) : Math.round(raw)) : 0;
  const stars = Math.max(0, Math.min(5, normalized));

  return (
    <Link
      href={`/anime/${id}`}
      aria-label={`Open details for ${anime.title}`}
      className="group relative block rounded-2xl p-[1px]
                 bg-gradient-to-r from-[var(--accent)]/50 via-fuchsia-500/40 to-amber-400/50
                 hover:from-[var(--accent)]/80 hover:via-fuchsia-500/70 hover:to-amber-400/80
                 transition-shadow hover:shadow-lg focus:outline-none focus-visible:ring-2 ring-[var(--accent)]/60"
    >
      <div className="rounded-[calc(1rem-1px)] overflow-hidden
                      border border-black/10 dark:border-white/10
                      bg-white/80 dark:bg-[#0b1218]/80 backdrop-blur">
        {/* Image */}
        <div className="relative h-44 w-full">
          {anime.imageUrl ? (
            <img
              src={anime.imageUrl}
              alt={anime.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-sm opacity-60">
              <ImageIcon className="mr-1" size={16} /> No image
            </div>
          )}

          {/* Gradient overlay on hover */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges: Seasons & Episodes */}
          <div className="absolute top-2 left-2 flex gap-2">
            {Number.isFinite(Number(anime.seasons)) && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium
                               bg-black/50 text-white backdrop-blur border border-white/15
                               inline-flex items-center gap-1">
                <Layers size={14} /> S{anime.seasons}
              </span>
            )}
          </div>
          <div className="absolute top-2 right-2">
            {Number.isFinite(Number(anime.episodes)) && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium
                               bg-black/50 text-white backdrop-blur border border-white/15
                               inline-flex items-center gap-1">
                <Hash size={14} /> Ep {anime.episodes}
              </span>
            )}
          </div>

          {/* Stars overlay */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < stars ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          <h3 className="font-semibold leading-snug">
            <span className="bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-amber-400
                             bg-clip-text text-transparent">
              {anime.title}
            </span>
          </h3>

          {anime.description ? (
            <p className="text-sm opacity-80 line-clamp-3">
              {anime.description}
            </p>
          ) : null}

          {/* Genres as chips */}
          {genresArr.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {genresArr.slice(0, 3).map((g, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full text-xs border border-black/10 dark:border-white/10
                             bg-black/5 dark:bg-white/5 inline-flex items-center gap-1"
                >
                  <Tags size={12} className="opacity-60" />
                  {g}
                </span>
              ))}
              {genresArr.length > 3 && (
                <span className="px-2 py-0.5 rounded-full text-xs border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                  +{genresArr.length - 3}
                </span>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="pt-1">
            <span className="shine inline-flex items-center gap-1 text-[var(--accent)] text-sm">
              Details
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}