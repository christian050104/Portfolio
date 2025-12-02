"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/70 border-b border-white/5 backdrop-blur">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-bold text-emerald-300">
          CJ
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-6 text-sm">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-emerald-300">
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <span className="text-2xl">☰</span>
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 bg-slate-900 border-t border-white/5 p-4 flex flex-col gap-4 md:hidden">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-emerald-300">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
