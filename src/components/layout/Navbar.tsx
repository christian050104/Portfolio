"use client";

import { useState, useEffect } from "react";
import { LuSun, LuMoon, LuFileText, LuMenu, LuX, LuArrowUpRight } from "react-icons/lu";
import { useAppPreferences } from "@/context/AppPreferencesContext";

const NAV_ITEMS = [
  { id: "home", label: { id: "Beranda", en: "Home" } },
  { id: "about", label: { id: "Profil", en: "About" } },
  { id: "skills", label: { id: "Keahlian", en: "Skills" } },
  { id: "featured", label: { id: "Unggulan", en: "Featured" } },
  { id: "projects", label: { id: "Proyek", en: "Projects" } },
  { id: "experience", label: { id: "Pengalaman", en: "Experience" } },
  { id: "contact", label: { id: "Kontak", en: "Contact" } },
];

export default function Navbar() {
  const { locale, setLocale, theme, toggleTheme, openResume } = useAppPreferences();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(100, (y / docHeight) * 100) : 0);

      let current = "home";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            current = item.id;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isId = locale === "id";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 no-print">
      {/* Clean Solid Reading Progress Bar */}
      <div className="h-[2px] w-full bg-transparent overflow-hidden">
        <div
          className="h-full bg-[var(--accent-cyan)] transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className={`px-3 sm:px-6 transition-all duration-300 ${scrolled ? "pt-2" : "pt-3 sm:pt-4"}`}>
        <div
          className={`mx-auto max-w-6xl rounded-2xl transition-all duration-300 ${
            scrolled ? "surface-nav shadow-lg px-3.5 sm:px-4 py-2.5" : "surface-nav px-3.5 sm:px-4 py-2.5 sm:py-3"
          }`}
        >
          <nav className="flex items-center justify-between gap-2 sm:gap-3">
            {/* Brand */}
            <a href="#home" className="group flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[var(--text-heading)] text-[var(--bg-primary)] flex items-center justify-center font-extrabold text-xs sm:text-sm tracking-tight flex-shrink-0 group-hover:opacity-90 transition-opacity">
                CJ
              </div>
              <div className="flex flex-col leading-none min-w-0">
                <span className="font-display font-bold text-xs sm:text-sm theme-heading truncate">
                  Christian Jhon
                </span>
                <span className="text-[10px] theme-muted font-medium mt-0.5 hidden xs:inline sm:inline">
                  IT Engineer · R&D
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`relative px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                      isActive
                        ? "theme-heading surface-subtle font-bold"
                        : "theme-muted hover:theme-heading"
                    }`}
                  >
                    {item.label[locale]}
                  </a>
                );
              })}
            </div>

            {/* Right Controls: Language, Theme, CV, Hire CTA */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Bilingual Segmented Pill */}
              <div
                className="flex items-center p-0.5 rounded-xl surface-pill text-[11px] font-semibold"
                role="group"
                aria-label="Language switcher"
              >
                <button
                  onClick={() => setLocale("id")}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    locale === "id"
                      ? "bg-[var(--accent-cyan)] text-white"
                      : "theme-muted hover:theme-heading"
                  }`}
                >
                  ID
                </button>
                <button
                  onClick={() => setLocale("en")}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    locale === "en"
                      ? "bg-[var(--accent-cyan)] text-white"
                      : "theme-muted hover:theme-heading"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Light / Dark Toggle */}
              <button
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                title={
                  theme === "dark"
                    ? isId
                      ? "Mode Terang"
                      : "Light Mode"
                    : isId
                    ? "Mode Gelap"
                    : "Dark Mode"
                }
                className="w-8 h-8 rounded-xl surface-pill flex items-center justify-center theme-body hover:theme-heading transition-colors cursor-pointer"
              >
                {theme === "dark" ? (
                  <LuSun className="w-4 h-4 text-amber-400" />
                ) : (
                  <LuMoon className="w-4 h-4 text-slate-700" />
                )}
              </button>

              {/* CV / Resume Button */}
              <button
                onClick={openResume}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl btn-secondary cursor-pointer"
              >
                <LuFileText className="w-3.5 h-3.5 theme-cyan-text" />
                <span>CV</span>
              </button>

              {/* Primary Hire CTA */}
              <a
                href="#contact"
                className="hidden md:inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded-xl btn-primary"
              >
                <span>{isId ? "Hubungi Saya" : "Contact"}</span>
                <LuArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="lg:hidden w-8 h-8 rounded-xl surface-pill flex items-center justify-center theme-heading cursor-pointer"
              >
                {open ? <LuX className="w-4 h-4" /> : <LuMenu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="lg:hidden px-3 sm:px-6 mt-2 animate-slide-down">
          <div className="mx-auto max-w-6xl p-4 rounded-2xl surface-modal shadow-2xl space-y-3">
            <div className="grid grid-cols-2 gap-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-colors ${
                      isActive
                        ? "bg-[var(--accent-cyan)] text-white"
                        : "surface-subtle theme-body"
                    }`}
                  >
                    {item.label[locale]}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => {
                  setOpen(false);
                  openResume();
                }}
                className="flex-1 py-2.5 text-xs font-semibold rounded-xl btn-secondary flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LuFileText className="w-4 h-4 theme-cyan-text" />
                {isId ? "Lihat CV" : "View CV"}
              </button>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex-1 py-2.5 text-xs font-semibold rounded-xl btn-primary flex items-center justify-center gap-1"
              >
                {isId ? "Hubungi Saya" : "Contact"}
                <LuArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
