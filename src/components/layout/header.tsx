"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-neutral-950/60 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12 lg:px-24">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-white transition-colors hover:text-indigo-400"
        >
          TH
          <span className="text-indigo-500">.</span>
        </Link>

        <ul className="flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm transition-all",
                  pathname === item.href
                    ? "bg-white/5 text-white"
                    : "text-neutral-500 hover:bg-white/5 hover:text-neutral-300"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
