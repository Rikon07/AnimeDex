import Link from "next/link";
import { headers } from "next/headers";
import { ArrowLeft, Star, Tags, Hash, Film } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth";
import { redirect } from "next/navigation";

function baseUrl() {
  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  return `${proto}://${host}`;
}

// If your /api/anime/[id] is protected by session, forward cookies
async function getAnime(id) {
  const h = headers();
  const res = await fetch(`${baseUrl()}/api/anime/${id}`, {
    cache: "no-store",
    headers: {
      cookie: h.get("cookie") ?? "",
    },
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function AnimeDetailsPage({ params }) {
  // Require login and redirect back here after login
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent(`/anime/${params.id}`)}`);
  }

  const item = await getAnime(params.id);
  if (!item) {
    return (
      <div className="rounded-xl border border-black/10 dark:border-white/10 p-6">
        Not found
      </div>
    );
  }

  // Normalize rating to 1–5 stars (handles any legacy 0–10 data)
  const raw = Number(item.rating);
  const normalized = Number.isFinite(raw) ? (raw > 5 ? Math.round(raw / 2) : Math.round(raw)) : 0;
  const stars = Math.max(0, Math.min(5, normalized));

  const genres = Array.isArray(item.genres)
    ? item.genres
    : String(item.genres || "")
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean);

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-black/10 dark:border-white/10
      bg-gradient-to-br from-white/70 to-white/30 dark:from-[#0b1218]/70 dark:to-[#0b1218]/30
      backdrop-blur p-6 md:p-8">

      {/* Aurora blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-16 h-64 w-64 md:h-80 md:w-80 rounded-full bg-[var(--accent)]/25 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -left-10 h-56 w-56 md:h-72 md:w-72 rounded-full bg-[var(--secondary)]/25 blur-3xl animate-blob [animation-delay:2s]" />
      </div>
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid
        [mask-image:radial-gradient(80%_80%_at_50%_50%,black_40%,transparent_100%)]" />

      {/* Top bar */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <Link href="/anime" className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition">
          <ArrowLeft size={16} /> Back to list
        </Link>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Image */}
        <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          ) : (
            <div className="h-[340px] w-full grid place-items-center opacity-60 text-sm">
              No image
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs">
            <Film size={14} className="opacity-70" />
            <span className="opacity-80">Anime Details</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-amber-400
              bg-clip-text text-transparent bg-[length:200%_auto] animate-bg-pan-slow">
              {item.title}
            </span>
          </h1>

          <p className="opacity-90">{item.description}</p>

          {/* Genres */}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {genres.map((g, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full text-xs border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                  <Tags size={12} className="inline-block mr-1 opacity-60" />
                  {g}
                </span>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-3">
              <div className="text-xs opacity-70">Episodes</div>
              <div className="text-lg font-semibold">{item.episodes}</div>
            </div>
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-3">
              <div className="text-xs opacity-70">Seasons</div>
              <div className="text-lg font-semibold">{item.seasons}</div>
            </div>
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-3">
              <div className="text-xs opacity-70">Rating</div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className={i < stars ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"} />
                ))}
                <span className="text-sm opacity-80 ml-1">{stars}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}