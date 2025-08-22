// src/components/AddAnimeForm.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Star, StarHalf, ImageIcon, Tags, Film, Loader2, Hash, Sparkles } from "lucide-react";

function Stars({ value, onChange }) {
  // integer 1–5
  return (
    <div role="radiogroup" aria-label="Rating" className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          onClick={() => onChange(n)}
          className="p-1 rounded hover:scale-110 transition-transform"
          title={`${n} star${n > 1 ? "s" : ""}`}
        >
          {n <= value ? (
            <Star className="text-yellow-400 fill-yellow-400" size={20} />
          ) : (
            <Star className="text-yellow-400" size={20} />
          )}
        </button>
      ))}
      <span className="ml-2 text-sm opacity-80">{value}/5</span>
    </div>
  );
}

export default function AddAnimeForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");
  const [rating, setRating] = useState(4);
  const [image, setImage] = useState("");

  // Genres preview chips
  const [genresInput, setGenresInput] = useState("");
  const genreChips = useMemo(
    () => genresInput.split(",").map((g) => g.trim()).filter(Boolean),
    [genresInput]
  );

  async function onSubmit(e) {
    e.preventDefault();
    setOk("");
    setErr("");

    const form = e.currentTarget;
    const data = {
      title: form.title.value,
      description: form.description.value,
      genres: form.genres.value,
      episodes: form.episodes.value,
      seasons: form.seasons.value,
      rating, // 1–5
      imageUrl: form.imageUrl.value,
    };

    setLoading(true);
    const res = await fetch("/api/anime", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setErr(j?.error || "Failed to add anime");
      return;
    }

    form.reset();
    setRating(4);
    setImage("");
    setGenresInput("");
    setOk("Anime added!");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative max-w-2xl mx-auto grid gap-4 p-6 rounded-2xl border border-black/10 dark:border-white/10
                 bg-gradient-to-br from-white/70 to-white/30 dark:from-[#0b1218]/70 dark:to-[#0b1218]/30 backdrop-blur"
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-2 text-lg font-semibold">
        <Sparkles className="text-[var(--accent)]" />
        Add a new anime
      </div>

      {/* Alerts */}
      {ok ? (
        <div className="rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3 py-2 text-sm">
          {ok}
        </div>
      ) : null}
      {err ? (
        <div className="rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 px-3 py-2 text-sm">
          {err}
        </div>
      ) : null}

      {/* Title */}
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Title</span>
        <div className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 focus-within:ring-2 ring-[var(--accent)]/50 transition">
          <Film size={18} className="opacity-70" />
          <input name="title" placeholder="e.g., Fullmetal Alchemist: Brotherhood" required className="w-full bg-transparent outline-none" />
        </div>
      </label>

      {/* Description */}
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Description</span>
        <textarea
          name="description"
          placeholder="Short synopsis..."
          required
          rows={4}
          className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 focus:ring-2 ring-[var(--accent)]/50 outline-none transition"
        />
      </label>

      {/* Genres */}
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Genres</span>
        <div className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 focus-within:ring-2 ring-[var(--accent)]/50 transition">
          <Tags size={18} className="opacity-70" />
          <input
            name="genres"
            placeholder="Action, Adventure, Fantasy"
            required
            className="w-full bg-transparent outline-none"
            value={genresInput}
            onChange={(e) => setGenresInput(e.target.value)}
          />
        </div>
        {genreChips.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {genreChips.map((g, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full text-xs border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                {g}
              </span>
            ))}
          </div>
        )}
      </label>

      {/* Grid: Episodes, Seasons, Rating */}
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="grid gap-1">
          <span className="text-sm opacity-80">Episodes</span>
          <div className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 focus-within:ring-2 ring-[var(--accent)]/50 transition">
            <Hash size={18} className="opacity-70" />
            <input name="episodes" type="number" min="1" placeholder="e.g., 64" required className="w-full bg-transparent outline-none" />
          </div>
        </label>

        <label className="grid gap-1">
          <span className="text-sm opacity-80">Seasons</span>
          <div className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 focus-within:ring-2 ring-[var(--accent)]/50 transition">
            <Hash size={18} className="opacity-70" />
            <input name="seasons" type="number" min="1" placeholder="e.g., 1" required className="w-full bg-transparent outline-none" />
          </div>
        </label>

        <label className="grid gap-1">
          <span className="text-sm opacity-80">Rating (1–5)</span>
          <div className="rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2">
            <Stars value={rating} onChange={setRating} />
          </div>
        </label>
      </div>

      {/* Image URL + Preview */}
      <label className="grid gap-1">
        <span className="text-sm opacity-80">Image URL</span>
        <div className="flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 focus-within:ring-2 ring-[var(--accent)]/50 transition">
          <ImageIcon size={18} className="opacity-70" />
          <input
            name="imageUrl"
            placeholder="https://…"
            className="w-full bg-transparent outline-none"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        {image ? (
          <div className="mt-2 rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
            <img
              src={image}
              alt="Preview"
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-[1.02]"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        ) : null}
      </label>

      {/* Submit */}
      <div className="pt-1">
        <button
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white
                     bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-amber-400
                     bg-[length:200%_auto] animate-[bg-pan_12s_linear_infinite]
                     hover:opacity-95 disabled:opacity-60 shadow-sm hover:shadow transition"
        >
          {loading ? (<><Loader2 className="animate-spin" size={18} /> Adding…</>) : "Add Anime"}
        </button>
      </div>
    </form>
  );
}