// src/app/anime/page.js
import Link from "next/link";
import AnimeCard from "../../components/AnimeCard";
import { headers } from "next/headers";
import { Sparkles, Plus, Star } from "lucide-react";

function baseUrl() {
  const h = headers();
  const proto = h.get("x-forwarded-proto") || "http";
  const host = h.get("x-forwarded-host") || h.get("host");
  const fallback = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:3000";
  return host ? `${proto}://${host}` : fallback;
}

export default async function AnimeListPage() {
  const h = headers();
  const res = await fetch(`${baseUrl()}/api/anime`, {
    cache: "no-store",
    headers: { cookie: h.get("cookie") ?? "" }, // harmless if API is public
  });

  let list = [];
  if (res.ok) {
    const j = await res.json().catch(() => []);
    list = Array.isArray(j) ? j : [];
  }

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-black/10 dark:border-white/10
      bg-gradient-to-br from-white/70 to-white/30 dark:from-[#0b1218]/70 dark:to-[#0b1218]/30
      backdrop-blur p-6 md:p-8 space-y-6">

      {/* Aurora blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-16 h-64 w-64 md:h-80 md:w-80 rounded-full bg-[var(--accent)]/25 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -left-10 h-56 w-56 md:h-72 md:w-72 rounded-full bg-[var(--secondary)]/25 blur-3xl animate-blob [animation-delay:2s]" />
      </div>
      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid
        [mask-image:radial-gradient(80%_80%_at_50%_50%,black_40%,transparent_100%)]" />

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 px-3 py-1 text-xs">
            <Sparkles className="text-[var(--accent)]" size={14} />
            <span className="opacity-80">Adventure • Emotion • Thrill</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-amber-400
              bg-clip-text text-transparent bg-[length:200%_auto] animate-bg-pan-slow">
              Anime Library
            </span>
          </h1>
          <div className="text-sm opacity-80 flex items-center gap-3">
            <span>Total titles: <b>{list.length}</b></span>
            <span className="inline-flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" /> Ratings 1–5
            </span>
          </div>
        </div>

        <Link
          href="/dashboard/add-anime"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-white
            bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-amber-400
            bg-[length:200%_auto] animate-[bg-pan_12s_linear_infinite]
            hover:opacity-95 shadow-sm hover:shadow transition"
        >
          <Plus size={18} /> Add Anime
        </Link>
      </div>

      {/* Content */}
      {list.length === 0 ? (
        <div className="mt-2 rounded-2xl border border-black/10 dark:border-white/10 p-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-[var(--secondary)]/30 grid place-items-center mb-3">
            <Sparkles className="text-[var(--accent)]" />
          </div>
          <p className="opacity-80">No anime yet. Be the first to add one!</p>
          <div className="mt-4">
            <Link
              href="/dashboard/add-anime"
              className="px-4 py-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              Add your first anime
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {list.map((a) => (
            <AnimeCard key={a._id || a.id} anime={a} />
          ))}
        </div>
      )}
    </section>
  );
}