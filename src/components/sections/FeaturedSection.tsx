"use client";

import { useState } from "react";
import projects from "@/data/projects";

const FEATURED = projects.filter((p) => p.featured);

const projectColors: Record<string, { gradient: string; border: string; badge: string; glow: string }> = {
  Facel: {
    gradient: "from-violet-500/10 to-purple-900/20",
    border: "border-violet-500/30",
    badge: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    glow: "shadow-violet-500/20",
  },
  EduSphere: {
    gradient: "from-cyan-500/10 to-blue-900/20",
    border: "border-cyan-500/30",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    glow: "shadow-cyan-500/20",
  },
  SnapStream: {
    gradient: "from-emerald-500/10 to-teal-900/20",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    glow: "shadow-emerald-500/20",
  },
};

function ProjectIcon({ name }: { name: string }) {
  if (name === "Facel") return <span>🤖</span>;
  if (name === "EduSphere") return <span>🎓</span>;
  if (name === "SnapStream") return <span>📡</span>;
  return <span>💻</span>;
}

/** Safe image using plain <img> to avoid Next.js crash on 404 */
function SafeImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [errored, setErrored] = useState(false);
  if (errored) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}

function ImagePreview({ project, colors }: { project: (typeof FEATURED)[0]; colors: typeof projectColors[string] }) {
  const [primary404, setPrimary404] = useState(false);

  const icon = (
    <div className="text-center space-y-3">
      <div className="text-7xl opacity-40">
        <ProjectIcon name={project.name} />
      </div>
      <p className="text-slate-500 text-sm">Screenshot coming soon</p>
    </div>
  );

  return (
    <div className="space-y-3 w-full">
      {/* Main image */}
      <div className={`relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}>
        {!primary404 && project.images?.[0] ? (
          <SafeImg
            src={project.images[0]}
            alt={project.name}
            className="w-full h-full object-cover absolute inset-0"
          />
        ) : null}
        {/* Always render icon as background - hidden when image loads */}
        {icon}
      </div>

      {/* Thumbnails */}
      {project.images && project.images.length > 1 && (
        <div className="grid grid-cols-2 gap-3">
          {project.images.slice(1, 3).map((img, i) => (
            <div
              key={i}
              className={`relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}
            >
              <SafeImg
                src={img}
                alt={`${project.name} ${i + 2}`}
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="text-3xl opacity-20">
                <ProjectIcon name={project.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FeaturedSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = FEATURED[activeIdx];
  const colors = projectColors[active.name] ?? projectColors["Facel"];

  return (
    <section id="featured" className="space-y-14">
      {/* Header */}
      <div className="reveal text-center space-y-3">
        <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Flagship Projects</p>
        <h2 className="text-3xl md:text-5xl font-black text-white">
          Projects That{" "}
          <span className="gradient-text-cyan">Define Me</span>
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Three production-grade systems I architected and built end-to-end — each solving real-world problems.
        </p>
        <div className="section-divider" />
      </div>

      {/* Tab Switcher */}
      <div className="reveal flex flex-wrap justify-center gap-3">
        {FEATURED.map((p, i) => {
          const c = projectColors[p.name] ?? projectColors["Facel"];
          const isActive = i === activeIdx;
          return (
            <button
              key={p.name}
              onClick={() => setActiveIdx(i)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                isActive
                  ? `${c.badge} border scale-105 shadow-lg ${c.glow}`
                  : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600"
              }`}
            >
              <ProjectIcon name={p.name} />
              {p.name}
              {isActive && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${c.badge} border`}>Featured</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Card */}
      <div
        className={`glass-card rounded-3xl overflow-hidden border bg-gradient-to-br ${colors.gradient} ${colors.border} transition-all duration-300`}
      >
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left: Info */}
          <div className="p-8 md:p-10 space-y-6">
            {/* Tags */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${colors.badge}`}>
                Flagship Project
              </span>
              <span className="text-xs text-slate-500 border border-slate-700/50 px-3 py-1 rounded-full">
                {active.category}
              </span>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{active.name}</h3>
              <p className="text-slate-400 font-medium flex items-center gap-2">
                <span>👤</span> {active.role}
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">{active.description}</p>

            {/* Key Features */}
            {active.highlights && active.highlights.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Features</h4>
                <ul className="space-y-2">
                  {active.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${colors.badge} border text-xs`}>
                        ✓
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {active.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-all duration-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <a
                href={active.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

          {/* Right: Images */}
          <div className="relative bg-slate-900/40 min-h-[280px] flex items-center justify-center p-6 border-l border-white/5">
            <ImagePreview project={active} colors={colors} />
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2">
        {FEATURED.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIdx ? "w-8 bg-cyan-400" : "w-1.5 bg-slate-700 hover:bg-slate-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
