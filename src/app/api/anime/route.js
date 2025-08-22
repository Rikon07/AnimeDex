// src/app/api/anime/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getAnimeCollection } from "../../../lib/mongodb.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth.js";
function toNumber(n) {
  const v = Number(n);
  return Number.isFinite(v) ? v : NaN;
}

function cleanDoc(b) {
  const title = String(b.title || "").trim();
  const description = String(b.description || "").trim();
  const genresStr = String(b.genres || "").trim();
  const episodes = toNumber(b.episodes);
  const seasons = toNumber(b.seasons);
  const ratingRaw = toNumber(b.rating);
  const rating = Math.round(ratingRaw); // force int
  const imageUrl = b.imageUrl ? String(b.imageUrl).trim() : null;

  const errors = [];
  if (!title) errors.push("title");
  if (!description) errors.push("description");
  if (!genresStr) errors.push("genres");
  if (!episodes || episodes < 1) errors.push("episodes");
  if (!seasons || seasons < 1) errors.push("seasons");
  if (!rating || rating < 1 || rating > 5) errors.push("rating(1-5)");

  return {
    ok: errors.length === 0,
    errors,
    doc: {
      title,
      description,
      genres: genresStr.split(",").map((g) => g.trim()).filter(Boolean),
      episodes,
      seasons,
      rating, // 1–5
      imageUrl: imageUrl || null,
      createdAt: new Date(),
    },
  };
}

export async function GET() {
  try {
    const col = await getAnimeCollection();
    const items = await col.find({}).sort({ createdAt: -1 }).toArray();
    const json = items.map((d) => ({ ...d, id: d._id.toString(), _id: d._id.toString() }));
    return NextResponse.json(json);
  } catch (err) {
    console.error("GET /api/anime error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  // Require login for creating anime
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

    const { ok, errors, doc } = cleanDoc(body);
    if (!ok) return NextResponse.json({ error: "Invalid fields: " + errors.join(", ") }, { status: 400 });

    const col = await getAnimeCollection();
    const { insertedId } = await col.insertOne(doc);
    return NextResponse.json({ ...doc, id: insertedId.toString(), _id: insertedId.toString() }, { status: 201 });
  } catch (err) {
    console.error("POST /api/anime error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: { Allow: "GET, POST, OPTIONS" } });
}
export async function HEAD() {
  return new Response(null, { status: 200 });
}