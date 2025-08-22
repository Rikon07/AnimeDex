// src/app/api/anime/[id]/route.js
export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getAnimeCollection } from "../../../../lib/mongodb.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth.js";
// GET /api/anime/:id
export async function GET(_req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = params;
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const col = await getAnimeCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ ...doc, id: doc._id.toString(), _id: doc._id.toString() });
  } catch (err) {
    console.error("GET /api/anime/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}