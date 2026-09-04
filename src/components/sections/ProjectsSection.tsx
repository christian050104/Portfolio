"use client";

import { useState, useEffect, useCallback } from "react";
import projects from "@/data/projects";

/* ── color map ── */
const projectColors: Record<string, { gradient: string; border: string; badge: string; accent: string }> = {
  Facel:      { gradient: "from-violet-500/10 to-purple-900/20", border: "border-violet-500/30", badge: "bg-violet-500/20 text-violet-300 border-violet-500/30", accent: "bg-violet-500" },
  EduSphere:  { gradient: "from-cyan-500/10   to-blue-900/20",   border: "border-cyan-500/30",   badge: "bg-cyan-500/20   text-cyan-300   border-cyan-500/30",   accent: "bg-cyan-500"   },
  SnapStream: { gradient: "from-emerald-500/10 to-teal-900/20",  border: "border-emerald-500/30", badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", accent: "bg-emerald-500" },
  "Sistem Monitoring Kesehatan Sapi": { gradient: "from-green-500/10 to-emerald-900/20", border: "border-green-500/30", badge: "bg-green-500/20 text-green-300 border-green-500/30", accent: "bg-green-500" },
  Labverse:   { gradient: "from-blue-500/10 to-indigo-900/20",   border: "border-blue-500/30",   badge: "bg-blue-500/20   text-blue-300   border-blue-500/30",   accent: "bg-blue-500"   },
  Labtek:     { gradient: "from-orange-500/10 to-amber-900/20",  border: "border-orange-500/30", badge: "bg-orange-500/20 text-orange-300 border-orange-500/30", accent: "bg-orange-500" },
  "Compro AGS": { gradient: "from-pink-500/10 to-rose-900/20",  border: "border-pink-500/30",   badge: "bg-pink-500/20   text-pink-300   border-pink-500/30",   accent: "bg-pink-500"   },
  "Klasifikasi Kotoran Ayam": { gradient: "from-yellow-500/10 to-orange-900/20", border: "border-yellow-500/30", badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30", accent: "bg-yellow-500" },
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

/* ── Lightbox Modal ── */
function Lightbox({ images, name, startIdx, onClose }: {
  images: string[]; name: string; startIdx: number; onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIdx);
  const [visible, setVisible] = useState(false);
  const total = images.length;

  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);

  /* Fade-in on mount */
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    // Lock body scroll so the background doesn't move when swiping/scrolling images
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      {/* Blurred Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Content wrapper: strict max height to fit on screen, flex column */}
      <div
        className={`relative z-10 w-full max-w-6xl h-full max-h-[90vh] flex flex-col transition-transform duration-300 ${visible ? "scale-100" : "scale-95"}`}
        onClick={(e) => e.stopPropagation()}
        style={{ isolation: "isolate" }}
      >
        {/* Header */}
        <div className="flex-none flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm md:text-base">{name}</span>
            <span className="text-slate-400 text-xs md:text-sm">— Screenshot</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-300 text-xs md:text-sm font-medium tabular-nums">{idx + 1} / {total}</span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Main image area: flex-1 to take remaining space, min-h-0 prevents overflow */}
        <div className="flex-1 min-h-0 relative w-full rounded-xl md:rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl flex items-center justify-center">
          {images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={`${name} screenshot ${i + 1}`}
              style={{ imageRendering: "auto" }}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                i === idx ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            />
          ))}

          {/* Arrows */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full md:rounded-xl bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 hover:border-white/40 transition-all z-10 shadow-xl backdrop-blur-sm"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button
                onClick={next}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full md:rounded-xl bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 hover:border-white/40 transition-all z-10 shadow-xl backdrop-blur-sm"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {total > 1 && (
          <div className="flex-none flex justify-center gap-2 mt-4 px-2 overflow-x-auto overflow-y-hidden pb-2 snap-x hide-scrollbar">
            {images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`flex-shrink-0 w-16 h-10 md:w-20 md:h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 snap-center ${
                  i === idx
                    ? "border-cyan-400 opacity-100 scale-105 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                    : "border-white/10 opacity-40 hover:opacity-100 hover:border-white/30"
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Image Slider (in card) ── */
function ImageSlider({ images, name, gradient }: { images: string[]; name: string; gradient: string }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const total = images.length;

  const prevImg = (e: React.MouseEvent) => { e.stopPropagation(); setImgIdx((i) => (i - 1 + total) % total); };
  const nextImg = (e: React.MouseEvent) => { e.stopPropagation(); setImgIdx((i) => (i + 1) % total); };

  return (
    <>
      <div
        className={`relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br ${gradient} flex items-center justify-center group/img ${total > 0 ? "cursor-zoom-in" : ""}`}
        onClick={() => total > 0 && setLightbox(true)}
      >
        {/* Placeholder icon */}
        <div className="text-center space-y-2 z-0">
          <div className="text-6xl opacity-20"><ProjectIcon name={name} /></div>
          {total === 0 && <p className="text-slate-600 text-xs">Screenshot coming soon</p>}
        </div>

        {/* Images */}
        {images.map((src, i) => (
          <SafeImg
            key={src}
            src={src}
            alt={`${name} screenshot ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
              i === imgIdx ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />
        ))}

        {/* Expand hint */}
        {total > 0 && (
          <div className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/img:opacity-100 transition-opacity z-10">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
          </div>
        )}

        {/* Arrows — only if multiple images */}
        {total > 1 && (
          <>
            <button
              onClick={prevImg}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-black/70 z-10"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              onClick={nextImg}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-black/70 z-10"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            </button>

            {/* Dots + counter */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              <div className="flex gap-1">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === imgIdx ? "w-4 bg-white" : "w-1 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-white/60 bg-black/40 px-1.5 py-0.5 rounded">
                {imgIdx + 1}/{total}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={images}
          name={name}
          startIdx={imgIdx}
          onClose={() => setLightbox(false)}
        />
      )}
    </>
  );
}

function ProjectsCarousel() {
  const [idx, setIdx] = useState(0);
  const p = projects[idx];
  const c = projectColors[p.name] ?? defaultColors;
  const total = projects.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <div className="space-y-5">
      {/* Nav header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          {idx + 1} / {total} Projects
        </p>
        <div className="flex items-center gap-3">
          {/* Dots */}
          <div className="flex gap-1.5 flex-wrap max-w-[200px]">
            {projects.map((_, i) => (
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
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${c.badge}`}>{p.category}</span>
              {p.featured && (
                <span className="text-xs text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 rounded-full">⭐ Featured</span>
              )}
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

          {/* Right: Image Slider */}
          <div className="relative bg-slate-900/40 min-h-[240px] flex items-center justify-center p-6 border-l border-white/5">
            <div className="w-full">
              <ImageSlider
                images={p.images ?? []}
                name={p.name}
                gradient={c.gradient}
              />
            </div>
          </div>
        </div>
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

      {/* All projects carousel */}
      <div className="reveal">
        <ProjectsCarousel />
      </div>
    </section>
  );
}