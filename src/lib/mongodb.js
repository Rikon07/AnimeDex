// src/lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Please set MONGODB_URI in .env.local");

let clientPromise;
if (!globalThis._mongoClientPromise) {
  const client = new MongoClient(uri);
  globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise;

export async function getDb() {
  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB || "animedex";
  return client.db(dbName);
}

export async function getUsersCollection() {
  const db = await getDb();
  return db.collection("users");
}

export async function getAnimeCollection() {
  const db = await getDb();
  return db.collection("anime");
}