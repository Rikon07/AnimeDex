// src/app/api/auth/register/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUsersCollection } from "../../../../lib/mongodb.js";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

    const name = String(body.name || "").trim();
    const email = String(body.email || "").toLowerCase().trim();
    const password = String(body.password || "");

    const errors = [];
    if (!name) errors.push("name");
    if (!email || !email.includes("@")) errors.push("email");
    if (password.length < 6) errors.push("password(>=6)");
    if (errors.length) return NextResponse.json({ error: "Invalid: " + errors.join(", ") }, { status: 400 });

    const users = await getUsersCollection();
    await users.createIndex({ email: 1 }, { unique: true });

    const existing = await users.findOne({ email });
    if (existing) return NextResponse.json({ error: "Email already in use" }, { status: 409 });

    const passwordHash = await bcrypt.hash(password, 10);
    const doc = { name, email, passwordHash, image: null, createdAt: new Date() };
    const { insertedId } = await users.insertOne(doc);

    return NextResponse.json({ ok: true, id: insertedId.toString() }, { status: 201 });
  } catch (err) {
    if (err?.code === 11000) return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    console.error("POST /api/auth/register error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}