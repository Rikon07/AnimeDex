# AnimeDex

Name:
- AnimeDex

Short Description:
- Discover, browse, and add your favorite anime — modern UI, smooth animations, and secure authentication with NextAuth. Public list, protected details and dashboard, MongoDB-backed data, seasons support, and 1–5 star ratings.

Live Link:
- https://anime-dex-eta-pied.vercel.app/

Tech Badges:
- ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
- ![App Router](https://img.shields.io/badge/App%20Router-✔-000000)
- ![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
- ![NextAuth.js](https://img.shields.io/badge/Auth-NextAuth.js-000000)
- ![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)
- ![Node](https://img.shields.io/badge/Node.js-%3E=18-339933?logo=nodedotjs&logoColor=white)
- ![Icons](https://img.shields.io/badge/Icons-lucide--react-111)

---

## ✨ Features

- Modern UI/UX
  - Animated, glassy Navbar/Hero/Footer with theme toggle (light/dark)
  - Responsive Anime cards with gradient borders, chips, and star ratings (1–5)
  - Shimmer skeleton loaders and friendly error (error.js) / 404 (not-found.js)
- Anime
  - Public list (/anime)
  - Protected details page (/anime/[id]) with seasons, episodes, genres, and 1–5 stars
  - Protected Add Anime dashboard (/dashboard/add-anime) with image preview and genre chip previews
- Data & API
  - MongoDB (Atlas/local), Route Handlers: GET list, GET by id, POST create
  - Server Components read from Mongo directly for SSR (no self-fetch flakiness)
- Auth
  - NextAuth v4: Credentials (register/login) + optional Google OAuth
  - Middleware + page guards + API guard (POST requires login)
- Deploy
  - Vercel-ready, environment-driven config

---

## 🧰 Tech Stack

- Frontend: Next.js (App Router), React, Tailwind CSS
- Backend: Next.js Route Handlers (Node runtime)
- Auth: NextAuth.js v4 (Credentials + Google)
- DB: MongoDB (mongodb driver)
- Icons: lucide-react
- Deployment: Vercel

---

## 📁 Folder Structure
```
.
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  │  ├─ anime/
│  │  │  │  ├─ route.js                # GET list, POST create (protected)
│  │  │  │  └─ [id]/route.js           # GET details (optionally protected)
│  │  │  └─ auth/
│  │  │     └─ [...nextauth]/route.js  # NextAuth v4 handler
│  │  ├─ anime/
│  │  │  ├─ page.js                    # Public list (direct DB read)
│  │  │  ├─ loading.js                 # Skeleton loader for list
│  │  │  └─ [id]/
│  │  │     ├─ page.js                 # Protected details page
│  │  │     └─ loading.js              # Skeleton loader for details
│  │  ├─ dashboard/
│  │  │  └─ add-anime/
│  │  │     ├─ page.js                 # Protected "Add Anime"
│  │  │     └─ loading.js
│  │  ├─ error.js                      # Global modern error UI
│  │  ├─ not-found.js                  # Global 404
│  │  ├─ layout.js                     # Theme init + SessionProvider + Navbar/Footer
│  │  └─ page.js                       # Landing (Hero)
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ Footer.jsx
│  │  ├─ ThemeToggle.jsx
│  │  ├─ HeroBanner.jsx
│  │  ├─ AnimeCard.jsx
│  │  ├─ AddAnimeForm.jsx
│  │  ├─ AuthProvider.jsx
│  │  └─ LoaderAurora.jsx
│  ├─ lib/
│  │  └─ mongodb.js                    # getDb(), getUsersCollection(), getAnimeCollection()
│  └─ auth.js                          # NextAuth v4 authOptions
├─ middleware.js                       # Protect /dashboard/* and /anime/[id]
├─ jsconfig.json                       # "@/..." → "./src/*"
├─ package.json
├─ .env.local                          # local secrets (not committed)
└─ README.md
```

Setup & installation:
1) Clone and install
- git clone YOUR_REPO
- cd YOUR_REPO
- npm i

2) Environment variables (create .env.local)
```
# App
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=REPLACE_WITH_A_RANDOM_BASE64_STRING

# MongoDB
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=animedex

# OAuth (optional Google)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
Tips:
- If your DB password has special characters (@ : / ? & % #), URL‑encode it (use: node -e "console.log(encodeURIComponent('YourPassword'))").
- In Atlas: add your IP in Network Access and create a Database User (not your Atlas login).

3) Alias config (jsconfig.json at repo root)
```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

4) Dev
- npm run dev
- http://localhost:3000

5) Build
- npm run build
- npm start

Auth (NextAuth v4) quickstart:
- Config: src/auth.js exports authOptions with Credentials + optional Google
- API handler: src/app/api/auth/[...nextauth]/route.js
- Middleware (root): middleware.js uses next-auth/middleware to protect routes
- SessionProvider: src/components/AuthProvider.jsx, injected in layout.js
- Register endpoint: POST /api/auth/register (creates users with bcrypt)
- Login page: /login uses next-auth/react signIn("credentials") or Google signIn("google")

Protecting routes:
- Middleware (root):
  - Protects /dashboard/* always
  - Protects only /anime/[id] (details). The list /anime stays public.
- Page-level guards:
  - add‑anime page and details page call getServerSession(authOptions) and redirect to /login?callbackUrl=...
- API guards:
  - POST /api/anime requires session (401 when logged out)

Route Summary:
- Pages
  - GET /              Landing (public)
  - GET /login         Login (public)
  - GET /register      Register (public)
  - GET /anime         Anime list (public)
  - GET /anime/[id]    Anime details (protected)
  - GET /dashboard/add-anime  Add anime form (protected)
- API
  - GET /api/anime              List anime (public)
  - POST /api/anime             Create anime (protected)
  - GET /api/anime/[id]         Get one anime (optionally protected)
  - GET/POST /api/auth/[...nextauth]  NextAuth (session, callbacks)
  - POST /api/auth/register     Create user (credentials)

Data model (MongoDB):
- Collection: anime
  - { title, description, genres: string[] | string, episodes: number, seasons: number, rating: 1–5, imageUrl?: string, createdAt: Date }
- Collection: users
  - { name, email (unique), passwordHash? (for credentials), image?, provider?, createdAt }

Design & UX:
- Animated Navbar/Hero/Footer with gradient aurora blobs and bg-grid overlays
- Theme toggle (light/dark) with view-transition ripple
- Add Anime form:
  - Seasons, Episodes, Star Rating (1–5), Image URL with live preview, Genre chip preview
  - Loading state and success/error messages
- Skeleton loaders:
  - src/app/anime/loading.js, src/app/anime/[id]/loading.js, src/app/dashboard/add-anime/loading.js
- Error handling:
  - Modern global error page: src/app/error.js
  - 404 page: src/app/not-found.js

Development tips:
- Server components read from Mongo directly (no self‑fetch); APIs are used for client actions (POST) and external access.
- Keep route handlers on Node runtime for Mongo:
  - export const runtime = "nodejs";
- Avoid matching /api in middleware (protect only pages).

Deploy (Vercel):
- Push to Git → Import in Vercel
- Set env vars in Vercel (Production + Preview): NEXTAUTH_SECRET, MONGODB_URI, MONGODB_DB, NEXTAUTH_URL, GOOGLE_CLIENT_ID/SECRET
- In Google Cloud, add:
  - Authorized origins: https://YOUR_PROJECT.vercel.app
  - Authorized redirect URI: https://YOUR_PROJECT.vercel.app/api/auth/callback/google
- Test /api/anime and /api/auth/session after deploy



License:
- MIT (or your choice)

Acknowledgements:
- Next.js, Tailwind, NextAuth.js, MongoDB
