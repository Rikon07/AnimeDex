// middleware.js (NextAuth v4 middleware)

import { withAuth } from "next-auth/middleware";

export default withAuth(
  // You can inspect the request if you want, but not needed here
  function middleware() {},
  {
    pages: { signIn: "/login" },
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        // Always protect /dashboard/*
        if (pathname.startsWith("/dashboard")) return !!token;

        // Protect only /anime/[id] (NOT /anime list)
        const segments = pathname.split("/").filter(Boolean);
        // "/anime" => ["anime"] -> public
        // "/anime/123" => ["anime","123"] -> protected
        if (segments[0] === "anime" && segments.length === 2) return !!token;

        // Everything else public
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/anime/:path*"],
};