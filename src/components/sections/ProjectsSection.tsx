"use client";

import { useState, useRef } from "react";
import projects from "@/data/projects";

const FEATURED = projects.filter((p) => p.featured);
const OTHERS   = projects.filter((p) => !p.featured);

/* ── color map ── */
const featuredColors: Record<string, { gradient: string; border: string; badge: string; accent: string }> = {
  Facel:      { gradient: "from-violet-500/10 to-purple-900/20", border: "border-violet-500/30", badge: "bg-violet-500/20 text-violet-300 border-violet-500/30", accent: "bg-violet-500" },
  EduSphere:  { gradient: "from-cyan-500/10   to-blue-900/20",   border: "border-cyan-500/30",   badge: "bg-cyan-500/20   text-cyan-300   border-cyan-500/30",   accent: "bg-cyan-500"   },
  SnapStream: { gradient: "from-emerald-500/10 to-teal-900/20",  border: "border-emerald-500/30",badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",accent: "bg-emerald-500"},
};
const defaultColors = { gradient: "from-slate-800/30 to-slate-900/30", border: "border-slate-700/40", badge: "bg-slate-700/30 text-slate-300 border-slate-600/40", accent: "bg-slate-500" };

function ProjectIcon({ name }: { name: string }) {
  const map: Record<string, string> = {
    Facel:"🤖", EduSphere:"🎓", SnapStream:"📡",
    "Sistem Monitoring Kesehatan Sapi":"🐄", Labverse:"🔬",
    Labtek:"🏭", "Compro AGS":"🏢", "Klasifikasi Kotoran Ayam":"🐔",
  };
  return <>{map[name] ?? "💻"}</>;
}

function SafeImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [err, setErr] = useState(false);
  if (err) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} onError={() => setErr(true)} />;
}

/* ── Flagship carousel ── */
function FlagshipCarousel() {
  const [idx, setIdx] = useState(0);
  const p = FEATURED[idx];
  const c = featuredColors[p.name] ?? defaultColors;
  const total = FEATURED.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <div className="space-y-5">
      {/* Nav header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">⭐ Flagship Projects</p>
        <div className="flex items-center gap-3">
          {/* Dots */}
          <div className="flex gap-1.5">
            {FEATURED.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? `w-6 ${c.accent}` : "w-1.5 bg-slate-700 hover:bg-slate-500"}`}
              />
            ))}
          </div>
          {/* Arrows */}
          <div className="flex gap-1">
            <button onClick={prev} className="w-8 h-8 rounded-lg glass-card border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={next} className="w-8 h-8 rounded-lg glass-card border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className={`glass-card rounded-3xl overflow-hidden border bg-gradient-to-br ${c.gradient} ${c.border} transition-all duration-500`}>
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left: Info */}
          <div className="p-7 md:p-9 space-y-5">
            <div className="flex gap-2 flex-wrap">
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${c.badge}`}>Flagship</span>
              <span className="text-xs text-slate-500 border border-slate-700/50 px-3 py-1 rounded-full">{p.category}</span>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{p.name}</h3>
              <p className="text-slate-400 text-sm flex items-center gap-1.5"><span>👤</span>{p.role}</p>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{p.description}</p>

            {p.highlights && p.highlights.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Features</h4>
                <ul className="space-y-1.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${c.badge} border text-[10px]`}>✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tech Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors">{t}</span>
                ))}
              </div>
            </div>

            <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>

          {/* Right: Image */}
          <div className={`relative bg-slate-900/40 min-h-[240px] flex items-center justify-center p-6 border-l border-white/5`}>
            <div className="w-full">
              <div className={`relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br ${c.gradient} flex items-center justify-center`}>
                {p.images?.[0] && <SafeImg src={p.images[0]} alt={p.name} className="w-full h-full object-cover absolute inset-0" />}
                <div className="text-center space-y-2">
                  <div className="text-6xl opacity-30"><ProjectIcon name={p.name} /></div>
                  <p className="text-slate-600 text-xs">Screenshot coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Counter */}
      <p className="text-center text-xs text-slate-600">{idx + 1} / {total}</p>
    </div>
  );
}

/* ── Other Projects horizontal scroll ── */
function OtherCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">📁 Other Projects</p>
        <div className="flex gap-1">
          <button onClick={() => scroll("left")} className="w-8 h-8 rounded-lg glass-card border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button onClick={() => scroll("right")} className="w-8 h-8 rounded-lg glass-card border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {OTHERS.map((p) => (
          <div
            key={p.name}
            className="flex-shrink-0 w-72 glass-card rounded-2xl overflow-hidden border border-slate-700/30 hover:border-slate-500/40 group flex flex-col"
          >
            {/* Image */}
            <div className="relative aspect-video bg-slate-900/70 overflow-hidden flex items-center justify-center">
              {p.images?.[0] && <SafeImg src={p.images[0]} alt={p.name} className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700" />}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="text-4xl opacity-20 group-hover:opacity-30 transition-opacity"><ProjectIcon name={p.name} /></div>
            </div>
            {/* Content */}
            <div className="p-4 flex flex-col gap-2.5 flex-1">
              <div>
                <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">{p.name}</h3>
                <p className="text-xs text-slate-500">{p.role}</p>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 flex-1">{p.shortDesc ?? p.description}</p>
              <div className="flex flex-wrap gap-1">
                {p.tech.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[11px] rounded bg-slate-800/80 border border-slate-700/50 text-slate-400">{t}</span>
                ))}
                {p.tech.length > 3 && <span className="px-2 py-0.5 text-[11px] rounded bg-slate-800/80 border border-slate-700/50 text-slate-500">+{p.tech.length - 3}</span>}
              </div>
              <a href={p.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors pt-2 border-t border-slate-700/40 mt-auto group/link">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
                <svg className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function ProjectsSection() {
  return (
    <section id="projects" className="space-y-12">
      {/* Header */}
      <div className="reveal text-center space-y-3">
        <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Portfolio</p>
        <h2 className="text-3xl md:text-5xl font-black text-white">
          All My <span className="gradient-text-cyan">Projects</span>
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto text-sm">
          From AI-powered systems to full-stack web apps — everything I&apos;ve built.
        </p>
        <div className="section-divider" />
      </div>

      {/* Flagship carousel */}
      <div className="reveal">
        <FlagshipCarousel />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-slate-800" />
        <div className="flex-1 h-px bg-slate-800" />
      </div>

      {/* Other projects horizontal scroll */}
      <div className="reveal">
        <OtherCarousel />
      </div>
    </section>
  );
}