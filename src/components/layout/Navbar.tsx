"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      let current = "home";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-2"
          : "py-3"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-4 transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(5,8,16,0.85)] backdrop-blur-2xl border border-white/[0.06] rounded-2xl shadow-2xl shadow-black/40"
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between py-3 px-1">
          {/* Logo */}
          <a
            href="#home"
            className="relative group flex items-center gap-2"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
              CJ
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
            </div>
            <span className="font-bold text-white hidden sm:block">
              Christian<span className="text-cyan-400">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    isActive
                      ? "text-cyan-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <span className="absolute inset-0 bg-cyan-500/10 rounded-lg border border-cyan-500/20" />
                  )}
                  {!isActive && (
                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-colors duration-300" />
                  )}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Hire Me
            </a>

            {/* Mobile Toggle */}
            <button
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-slate-800/60 border border-white/10 hover:border-cyan-500/40 transition-all duration-300"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span className={`w-4 h-0.5 bg-cyan-400 transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-4 h-0.5 bg-cyan-400 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`w-4 h-0.5 bg-cyan-400 transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mt-2 p-4 rounded-2xl bg-[rgba(5,8,16,0.95)] backdrop-blur-2xl border border-white/[0.08] shadow-2xl animate-slide-down">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/25"
                      : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 text-sm font-semibold text-white text-center rounded-xl bg-gradient-to-r from-cyan-600 to-violet-600"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}