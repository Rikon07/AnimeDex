"use client";

import { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";

export default function AnimeListClient() {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/anime", { cache: "no-store" });
      const json = res.ok ? await res.json() : [];
      setAnime(json);
    })();
  }, []);

  return anime.length === 0 ? (
    <p className="opacity-80">No anime yet. Add one!</p>
  ) : (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
      {anime.map((a) => <AnimeCard key={a._id || a.id} anime={a} />)}
    </div>
  );
}