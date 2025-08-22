
// src/auth.js (NextAuth v4 options)
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getUsersCollection } from "./lib/mongodb.js";

export const authOptions = {
  providers: [
    // Credentials provider (keeps working)
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      authorize: async (creds) => {
        const email = String(creds?.email || "").toLowerCase().trim();
        const password = String(creds?.password || "");
        if (!email || !password) return null;

        const users = await getUsersCollection();
        const user = await users.findOne({ email });
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return { id: user._id.toString(), name: user.name || email, email, image: user.image || null };
      },
    }),

    // Google OAuth (make sure GOOGLE_CLIENT_ID/SECRET are in .env.local)
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: { signIn: "/login" },
  session: { strategy: "jwt" },

  callbacks: {
    // Optional: upsert Google users into your Mongo "users" collection
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const email = (user?.email || "").toLowerCase().trim();
        if (!email) return false;

        const users = await getUsersCollection();
        await users.createIndex({ email: 1 }, { unique: true });

        const existing = await users.findOne({ email });

        if (!existing) {
          await users.insertOne({
            name: user.name || profile?.name || email,
            email,
            image: user.image || profile?.picture || null,
            provider: "google",
            createdAt: new Date(),
          });
        } else {
          // Optionally refresh name/image if missing
          const patch = {};
          if (!existing.name && user.name) patch.name = user.name;
          if (!existing.image && user.image) patch.image = user.image;
          if (Object.keys(patch).length) {
            await users.updateOne({ _id: existing._id }, { $set: patch });
          }
        }
      }
      return true;
    },

    // Put our Mongo user id into the JWT on first sign-in
    async jwt({ token, user, account }) {
      if (account) {
        const email = (user?.email || token?.email || "").toLowerCase().trim();
        if (email) {
          const users = await getUsersCollection();
          const dbUser = await users.findOne({ email });
          if (dbUser) token.uid = dbUser._id.toString();
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (!session.user) session.user = {};
      if (token?.uid) session.user.id = token.uid;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
};