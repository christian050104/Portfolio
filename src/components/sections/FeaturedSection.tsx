"use client";

import { useState } from "react";
import {
  LuScanFace,
  LuGraduationCap,
  LuRadio,
  LuSmartphone,
  LuMonitor,
  LuMaximize2,
  LuChevronLeft,
  LuChevronRight,
  LuCircleCheck,
  LuExternalLink,
} from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import projects, {
  type ProjectItem,
  encodeAssetPath,
  formatScreenshotCaption,
  getScreenshotPlatform,
} from "@/data/projects";
import TechIcon from "@/components/ui/TechIcon";
import LightboxModal from "@/components/ui/LightboxModal";
import { useAppPreferences } from "@/context/AppPreferencesContext";

const PROJECT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  facelog: LuScanFace,
  edusphere: LuGraduationCap,
  snapstream: LuRadio,
  "cattle-monitoring": LuSmartphone,
};

export default function FeaturedSection({
  projectsData = projects,
}: {
  projectsData?: ProjectItem[];
}) {
  const featuredList = projectsData.filter((p) => p.featured);
  const { locale } = useAppPreferences();
  const [activeIdx, setActiveIdx] = useState(0);
  const [platformMode, setPlatformMode] = useState<"web" | "mobile">("web");
  const [screenIdx, setScreenIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const isId = locale === "id";
  const active = featuredList[activeIdx] ?? featuredList[0];

  const webImages = active.images.filter((src) => getScreenshotPlatform(src) === "web");
  const mobileImages = active.images.filter((src) => getScreenshotPlatform(src) === "mobile");
  const isDualPlatform = webImages.length > 0 && mobileImages.length > 0;

  const displayedImages = !isDualPlatform
    ? active.images
    : platformMode === "mobile"
    ? mobileImages
    : webImages;

  const totalScreens = displayedImages.length;
  const safeScreenIdx = screenIdx < totalScreens ? screenIdx : 0;
  const currentSrc = displayedImages[safeScreenIdx];
  const nextMobileSrc =
    isDualPlatform && platformMode === "mobile" && totalScreens > 1
      ? displayedImages[(safeScreenIdx + 1) % totalScreens]
      : null;

  const handleSelectProject = (index: number) => {
    setActiveIdx(index);
    setPlatformMode("web");
    setScreenIdx(0);
  };

  const handleSelectPlatform = (mode: "web" | "mobile") => {
    setPlatformMode(mode);
    setScreenIdx(0);
  };

  const prevScreen = () => {
    setScreenIdx((curr) => (curr - 1 + totalScreens) % totalScreens);
  };

  const nextScreen = () => {
    setScreenIdx((curr) => (curr + 1) % totalScreens);
  };

  return (
    <section id="featured" className="space-y-10">
      {/* Header */}
      <div className="reveal text-center space-y-3">
        <p className="theme-cyan-text text-xs font-mono-code font-semibold tracking-widest uppercase">
          {isId ? "Studi Kasus Utama" : "Flagship Case Studies"}
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold theme-heading">
          {isId ? (
            <>
              Sistem Produksi Unggulan yang{" "}
              <span className="gradient-text-cyan">Mewakili Kualitas Rekayasa</span> Saya
            </>
          ) : (
            <>
              Flagship Systems <span className="gradient-text-cyan">Architected End-to-End</span>
            </>
          )}
        </h2>
        <p className="theme-muted text-sm max-w-2xl mx-auto">
          {isId
            ? "Telusuri masalah operasional, solusi arsitektur, serta puluhan layar fitur nyata lintas AI, Desktop, Streaming, serta Web & Mobile."
            : "Explore the real operational challenges, system architecture, and live feature screens across AI, Desktop, Streaming, and Web + Mobile."}
        </p>
        <div className="section-divider" />
      </div>

      {/* Flagship Selector Tabs */}
      <div className="reveal flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {featuredList.map((proj, i) => {
          const Icon = PROJECT_ICONS[proj.id] ?? LuScanFace;
          const isSelected = i === activeIdx;
          const shortTabName = proj.id === "cattle-monitoring" ? "DairyTrack" : proj.name;
          return (
            <button
              key={proj.id}
              onClick={() => handleSelectProject(i)}
              className={`inline-flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isSelected
                  ? "btn-primary shadow-xl scale-[1.02]"
                  : "bento-card theme-body hover:theme-heading"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{shortTabName}</span>
              <span
                className={`text-[11px] font-mono-code px-2 py-0.5 rounded-full ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "surface-subtle theme-muted"
                }`}
              >
                {proj.images.length} {isId ? "Layar" : "Screens"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Case Study Bento Card */}
      <div className="reveal bento-card rounded-3xl overflow-hidden">
        <div className="grid lg:grid-cols-12">
          {/* Left 6 Cols: Narrative, Challenge/Solution, Features & Stack */}
          <div className="lg:col-span-6 p-6 sm:p-8 md:p-9 space-y-5 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Top Meta Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/12 theme-cyan-text border border-cyan-500/25">
                  {active.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium surface-subtle theme-body">
                  {active.impactBadge[locale]}
                </span>
                <span className="text-xs font-mono-code theme-muted ml-auto">
                  {active.year}
                </span>
              </div>

              {/* Title & Role */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold theme-heading">
                  {active.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold theme-cyan-text mt-1">
                  {active.role[locale]}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm theme-body leading-relaxed">
                {active.description[locale]}
              </p>

              {/* Challenge & Solution Boxes */}
              {active.challenge && active.solution && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl surface-subtle space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-amber-500">
                      {isId ? "Tantangan" : "The Challenge"}
                    </p>
                    <p className="text-xs theme-body leading-relaxed">
                      {active.challenge[locale]}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-2xl surface-subtle space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider theme-emerald-text">
                      {isId ? "Solusi Arsitektur" : "Engineering Solution"}
                    </p>
                    <p className="text-xs theme-body leading-relaxed">
                      {active.solution[locale]}
                    </p>
                  </div>
                </div>
              )}

              {/* Key Capabilities */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider theme-muted">
                  {isId ? "Kapabilitas Utama" : "Key Capabilities"}
                </h4>
                <ul className="space-y-1.5">
                  {active.highlights[locale].map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-xs sm:text-sm theme-body">
                      <LuCircleCheck className="w-4 h-4 theme-emerald-text flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider theme-muted">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {active.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl surface-subtle text-xs font-semibold theme-heading"
                    >
                      <TechIcon name={t} className="w-3.5 h-3.5" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
              <button
                onClick={() => setLightboxOpen(true)}
                className="btn-primary px-5 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <LuMaximize2 className="w-4 h-4" />
                <span>
                  {isId
                    ? `Buka Galeri Penuh (${active.images.length} Layar)`
                    : `Inspect Full Gallery (${active.images.length} Screens)`}
                </span>
              </button>

              <a
                href={active.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-4 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2"
              >
                <FaGithub className="w-4 h-4" />
                <span>GitHub</span>
                <LuExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right 6 Cols: Adaptive Web / Mobile Screenshot Explorer */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[var(--bg-secondary)] border-t lg:border-t-0 lg:border-l border-[var(--border-subtle)] flex flex-col justify-between gap-4">
            {/* Dual-Platform Mode Switcher (Shown when project has both Website & Mobile screens!) */}
            <div className="space-y-3">
              {isDualPlatform && (
                <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl surface-subtle">
                  <button
                    onClick={() => handleSelectPlatform("web")}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      platformMode === "web"
                        ? "btn-primary shadow-md"
                        : "theme-muted hover:theme-heading"
                    }`}
                  >
                    <LuMonitor className="w-4 h-4" />
                    <span>{isId ? "Versi Website" : "Website Version"}</span>
                    <span className="font-mono-code text-[11px] opacity-85">
                      ({webImages.length})
                    </span>
                  </button>

                  <button
                    onClick={() => handleSelectPlatform("mobile")}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      platformMode === "mobile"
                        ? "btn-primary shadow-md"
                        : "theme-muted hover:theme-heading"
                    }`}
                  >
                    <LuSmartphone className="w-4 h-4" />
                    <span>{isId ? "Versi Mobile (Flutter)" : "Mobile App (Flutter)"}</span>
                    <span className="font-mono-code text-[11px] opacity-85">
                      ({mobileImages.length})
                    </span>
                  </button>
                </div>
              )}

              {/* Window / Device Bar */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 flex-shrink-0" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 flex-shrink-0" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 flex-shrink-0" />
                  <span className="ml-2 text-xs font-semibold theme-heading truncate">
                    {currentSrc ? formatScreenshotCaption(currentSrc) : active.name}
                  </span>
                </div>
                <span className="text-xs font-mono-code theme-muted tabular-nums flex-shrink-0">
                  {safeScreenIdx + 1} / {totalScreens}
                </span>
              </div>
            </div>

            {/* Adaptive Viewport: Portrait Mobile Studio Stage vs Landscape Web Browser */}
            {isDualPlatform && platformMode === "mobile" ? (
              <div
                onClick={() => setLightboxOpen(true)}
                className="group relative w-full h-[360px] sm:h-[390px] rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-gradient-to-br from-slate-950 via-indigo-950/50 to-slate-900 shadow-xl cursor-zoom-in flex items-center justify-center gap-5 px-6 py-4"
              >
                {/* Primary Active Mobile Phone */}
                <div className="relative h-full flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-[1.03]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={encodeAssetPath(currentSrc)}
                    alt={`${active.name} — ${formatScreenshotCaption(currentSrc)}`}
                    className="h-full w-auto object-contain drop-shadow-[0_18px_35px_rgba(6,182,212,0.28)]"
                  />
                </div>

                {/* Secondary Next Mobile Preview (Side-by-Side Context on Desktop/Tablet) */}
                {nextMobileSrc && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      nextScreen();
                    }}
                    title={formatScreenshotCaption(nextMobileSrc)}
                    className="hidden sm:flex relative h-[84%] items-center justify-center opacity-50 hover:opacity-85 transition-all cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={encodeAssetPath(nextMobileSrc)}
                      alt={`${active.name} — ${formatScreenshotCaption(nextMobileSrc)}`}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                )}

                {/* Hover Zoom Pill */}
                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/15 text-white text-xs font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <LuMaximize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isId ? "Perbesar Mobile" : "Zoom Mobile"}</span>
                </div>

                {/* Prev / Next Controls */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevScreen();
                  }}
                  aria-label="Previous mobile screen"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-slate-950/80 hover:bg-cyan-600 text-white border border-white/15 flex items-center justify-center transition-colors cursor-pointer z-20"
                >
                  <LuChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextScreen();
                  }}
                  aria-label="Next mobile screen"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-slate-950/80 hover:bg-cyan-600 text-white border border-white/15 flex items-center justify-center transition-colors cursor-pointer z-20"
                >
                  <LuChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => setLightboxOpen(true)}
                className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-slate-950 shadow-xl cursor-zoom-in"
              >
                {displayedImages.map((src, i) => {
                  const isNear =
                    i === safeScreenIdx ||
                    i === (safeScreenIdx - 1 + totalScreens) % totalScreens ||
                    i === (safeScreenIdx + 1) % totalScreens;
                  if (!isNear) return null;

                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={encodeAssetPath(src)}
                      alt={`${active.name} — ${formatScreenshotCaption(src)}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.02] ${
                        i === safeScreenIdx ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    />
                  );
                })}

                {/* Hover Zoom Badge */}
                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/75 backdrop-blur-md border border-white/15 text-white text-xs font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <LuMaximize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isId ? "Perbesar Layar" : "View Fullscreen"}</span>
                </div>

                {/* Prev / Next Controls */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevScreen();
                  }}
                  aria-label="Previous screen"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-slate-950/75 hover:bg-cyan-600 text-white border border-white/15 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <LuChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextScreen();
                  }}
                  aria-label="Next screen"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-slate-950/75 hover:bg-cyan-600 text-white border border-white/15 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <LuChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Quick Feature Screen Selector Pills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] theme-muted">
                <span>
                  {isId
                    ? "Pilih modul layar untuk pratinjau cepat:"
                    : "Jump directly to a feature screen:"}
                </span>
                <span className="font-mono-code theme-cyan-text">
                  {isId ? "Geser →" : "Scroll →"}
                </span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
                {displayedImages.map((src, i) => {
                  const selected = i === safeScreenIdx;
                  return (
                    <button
                      key={src}
                      onClick={() => setScreenIdx(i)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        selected
                          ? "bg-cyan-500/15 theme-cyan-text border border-cyan-500/35 font-semibold"
                          : "surface-pill theme-muted hover:theme-heading"
                      }`}
                    >
                      {formatScreenshotCaption(src)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <LightboxModal
          images={active.images}
          projectName={active.name}
          startIndex={safeScreenIdx}
          initialPlatform={isDualPlatform ? platformMode : "all"}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
}
