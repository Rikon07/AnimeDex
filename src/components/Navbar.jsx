// src/components/Navbar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, LogOut, UserPlus, LogIn, Plus } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/anime", label: "Anime" },
  { href: "/dashboard/add-anime", label: "Add Anime" },
];

function NavItem({ href, label, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative px-3 py-2 rounded-md text-sm font-medium transition-colors
        hover:text-[var(--accent)]
        ${isActive ? "text-[var(--accent)]" : "opacity-90"}`}
    >
      {label}
      <span className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-1 h-[2px] rounded
        bg-[var(--accent)] transition-all duration-300
        ${isActive ? "w-4/5 opacity-100" : "w-0 opacity-0 group-hover:w-4/5 group-hover:opacity-100"}`} />
    </Link>
  );
}

function Avatar({ user }) {
  const name = user?.name || user?.email || "User";
  const letter = name?.[0]?.toUpperCase() || "U";
  return (
    <div className="inline-flex items-center gap-2">
      <div className="size-8 rounded-full overflow-hidden grid place-items-center
                      bg-gradient-to-br from-[var(--accent)]/80 via-fuchsia-500/80 to-amber-400/80 text-white
                      border border-white/20">
        {user?.image ? <img src={user.image} alt={name} className="h-full w-full object-cover" /> : <span className="font-semibold">{letter}</span>}
      </div>
      <span className="hidden sm:block text-sm opacity-90 max-w-[12ch] truncate">{name}</span>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <nav className="relative border-b border-black/10 dark:border-white/10
        bg-white/60 dark:bg-black/30 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
        <div className="mx-auto max-w-7xl h-14 px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-semibold bg-gradient-to-r from-sky-500 via-fuchsia-500 to-amber-400
              bg-[length:200%_auto] bg-clip-text text-transparent animate-[bg-pan_8s_linear_infinite]">
              AnimeDex
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => <NavItem key={l.href} href={l.href} label={l.label} />)}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {session?.user ? (
              <>
                {/* <Link
                  href="/dashboard/add-anime"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r
                    from-[var(--accent)] via-fuchsia-500 to-amber-400 text-white
                    bg-[length:200%_auto] animate-[bg-pan_12s_linear_infinite] hover:opacity-95 transition"
                >
                  <Plus size={16} /> Add Anime
                </Link> */}
                <Avatar user={session.user} />
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--accent)] text-white hover:opacity-90 transition">
                  <LogIn size={16} /> Login
                </Link>
                <Link href="/register" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition">
                  <UserPlus size={16} /> Register
                </Link>
              </>
            )}
          </div>

          <button aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(v => !v)}
            className="md:hidden p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile panel */}
        <div className={`md:hidden absolute left-0 right-0 top-14 origin-top border-b border-black/10 dark:border-white/10
          bg-white/80 dark:bg-[#0a171f]/80 backdrop-blur transition-all duration-300
          ${open ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95 pointer-events-none"}`}
          style={{ transformOrigin: "top" }}>
          <div className="px-4 py-4 grid gap-2">
            {links.map((l) => <NavItem key={l.href} href={l.href} label={l.label} onClick={() => setOpen(false)} />)}
            <div className="flex items-center justify-between pt-2">
              <ThemeToggle />
              {session?.user ? (
                <button onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition">
                  <LogOut size={16} className="inline-block mr-1" /> Sign out
                </button>
              ) : (
                <div className="flex items-center gap-2 ml-auto">
                  <Link href="/login" onClick={() => setOpen(false)}
                    className="px-3 py-1.5 rounded-md bg-[var(--accent)] text-white hover:opacity-90 transition">
                    <LogIn size={16} className="inline-block mr-1" /> Login
                  </Link>
                  <Link href="/register" onClick={() => setOpen(false)}
                    className="px-3 py-1.5 rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition">
                    <UserPlus size={16} className="inline-block mr-1" /> Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}