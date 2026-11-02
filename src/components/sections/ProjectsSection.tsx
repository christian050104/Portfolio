"use client";

import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  LuEye,
  LuExternalLink,
  LuMaximize2,
  LuX,
  LuCircleCheck,
  LuLayers,
  LuMonitor,
  LuSmartphone,
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

const FILTERS = ["All", "AI & ML", "Desktop", "Web & Mobile", "Fullstack Web"] as const;
type FilterValue = (typeof FILTERS)[number];

const ACCENT_GRADIENTS: Record<ProjectItem["accent"], string> = {
  violet: "from-violet-600/25 via-indigo-600/15 to-transparent",
  cyan: "from-cyan-600/25 via-sky-600/15 to-transparent",
  emerald: "from-emerald-600/25 via-teal-600/15 to-transparent",
  blue: "from-blue-600/25 via-indigo-600/15 to-transparent",
  amber: "from-amber-500/25 via-orange-600/15 to-transparent",
  rose: "from-rose-500/25 via-pink-600/15 to-transparent",
};

function ArchitectureBlueprint({
  project,
  locale,
}: {
  project: ProjectItem;
  locale: "id" | "en";
}) {
  const modules = project.previewModules?.[locale] ?? project.tech.slice(0, 4);
  const grad = ACCENT_GRADIENTS[project.accent];

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden bg-gradient-to-br ${grad} bg-slate-950 p-4 flex flex-col justify-between select-none`}
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148, 163, 184, 0.35) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-400/80" />
          <span className="w-2 h-2 rounded-full bg-amber-400/80" />
          <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
          <span className="ml-1.5 text-[10px] font-mono-code text-slate-400">
            {project.id}.architecture
          </span>
        </div>
        <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-md bg-white/10 text-cyan-300 border border-white/10">
          {project.tech[0]}
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-2 my-auto py-2">
        {modules.slice(0, 4).map((mod, idx) => (
          <div
            key={mod}
            className="px-2.5 py-2 rounded-xl bg-slate-900/85 border border-white/10 flex items-center gap-2"
          >
            <span className="w-4 h-4 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-mono-code font-bold flex items-center justify-center flex-shrink-0">
              0{idx + 1}
            </span>
            <span className="text-[11px] font-medium text-slate-200 truncate">
              {mod}
            </span>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400">
        <span className="inline-flex items-center gap-1">
          <LuLayers className="w-3 h-3 text-cyan-400" />
          {locale === "id" ? "Arsitektur Modul" : "System Modules"}
        </span>
        <div className="flex items-center gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <TechIcon key={t} name={t} className="w-3.5 h-3.5" />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Composite Cover for Projects that have BOTH Website (Landscape) & Mobile (Portrait) screenshots */
function DualPlatformCardCover({
  webCover,
  mobileCover,
  projectName,
  webCount,
  mobileCount,
  isId,
}: {
  webCover: string;
  mobileCover: string;
  projectName: string;
  webCount: number;
  mobileCount: number;
  isId: boolean;
}) {
  return (
    <div className="relative w-full aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden p-3 flex items-center">
      {/* Website Screen (Left / Main Frame) */}
      <div className="relative w-[76%] h-[88%] rounded-xl overflow-hidden border border-white/15 shadow-xl bg-slate-900 group-hover:scale-[1.02] transition-transform duration-500">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={encodeAssetPath(webCover)}
          alt={`${projectName} Web`}
          loading="lazy"
          className="w-full h-full object-cover object-left-top"
        />
      </div>

      {/* Floating Mobile App Screen (Right Foreground Overlap) */}
      <div className="absolute right-3.5 bottom-2.5 top-3 w-[27%] flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-500 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={encodeAssetPath(mobileCover)}
          alt={`${projectName} Mobile`}
          loading="lazy"
          className="h-full w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent pointer-events-none" />

      {/* Dual Count Pill */}
      <div className="absolute bottom-2.5 left-3 px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/15 text-[10px] font-mono-code text-white flex items-center gap-2 z-20">
        <span className="inline-flex items-center gap-1 text-cyan-300">
          <LuMonitor className="w-3 h-3" /> {webCount} Web
        </span>
        <span className="text-slate-500">·</span>
        <span className="inline-flex items-center gap-1 text-violet-300">
          <LuSmartphone className="w-3 h-3" /> {mobileCount} {isId ? "Mobile" : "App"}
        </span>
      </div>
    </div>
  );
}

function ProjectDetailModal({
  project,
  locale,
  onClose,
  onOpenLightbox,
}: {
  project: ProjectItem;
  locale: "id" | "en";
  onClose: () => void;
  onOpenLightbox: (startIdx: number, platform: "all" | "web" | "mobile") => void;
}) {
  const isId = locale === "id";
  const [detailTab, setDetailTab] = useState<"web" | "mobile">("web");

  const webImages = useMemo(
    () => project.images.filter((src) => getScreenshotPlatform(src) === "web"),
    [project.images]
  );
  const mobileImages = useMemo(
    () => project.images.filter((src) => getScreenshotPlatform(src) === "mobile"),
    [project.images]
  );
  const isDualPlatform = webImages.length > 0 && mobileImages.length > 0;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-lg" />

      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl surface-modal shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/12 theme-cyan-text border border-cyan-500/25">
                {project.category}
              </span>
              <span className="text-xs font-mono-code theme-muted">{project.year}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold theme-heading">
              {project.name}
            </h3>
            <p className="text-xs sm:text-sm font-semibold theme-cyan-text">
              {project.role[locale]}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-xl surface-pill flex items-center justify-center theme-muted hover:theme-heading transition-colors cursor-pointer flex-shrink-0"
          >
            <LuX className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Preview (Dual-Platform Aware!) */}
        {project.images.length > 0 ? (
          <div className="space-y-3">
            {isDualPlatform && (
              <div className="flex items-center gap-2 p-1.5 rounded-2xl surface-subtle">
                <button
                  onClick={() => setDetailTab("web")}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    detailTab === "web"
                      ? "btn-primary"
                      : "theme-muted hover:theme-heading"
                  }`}
                >
                  <LuMonitor className="w-4 h-4" />
                  <span>{isId ? `Versi Website (${webImages.length})` : `Website (${webImages.length})`}</span>
                </button>
                <button
                  onClick={() => setDetailTab("mobile")}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    detailTab === "mobile"
                      ? "btn-primary"
                      : "theme-muted hover:theme-heading"
                  }`}
                >
                  <LuSmartphone className="w-4 h-4" />
                  <span>
                    {isId ? `Versi Mobile Flutter (${mobileImages.length})` : `Flutter Mobile (${mobileImages.length})`}
                  </span>
                </button>
              </div>
            )}

            {isDualPlatform && detailTab === "mobile" ? (
              <div className="space-y-3">
                {/* 3-Up Portrait Mobile Showcase Stage */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl border border-[var(--border-strong)] bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-900">
                  {mobileImages.slice(0, 3).map((src, i) => (
                    <button
                      key={src}
                      onClick={() => onOpenLightbox(i, "mobile")}
                      className="group relative h-52 sm:h-64 flex flex-col items-center justify-center gap-2 cursor-zoom-in"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={encodeAssetPath(src)}
                        alt={formatScreenshotCaption(src)}
                        className="h-44 sm:h-56 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xl"
                      />
                      <span className="text-[10px] font-medium text-slate-300 truncate max-w-full px-1">
                        {formatScreenshotCaption(src)}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Remaining Mobile Thumbnails */}
                {mobileImages.length > 3 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
                    {mobileImages.map((img, i) => (
                      <button
                        key={img}
                        onClick={() => onOpenLightbox(i, "mobile")}
                        className="flex-shrink-0 px-3 py-1.5 rounded-xl surface-pill hover:border-cyan-400 text-xs font-medium theme-body hover:theme-cyan-text transition-all cursor-pointer"
                      >
                        {formatScreenshotCaption(img)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {(() => {
                  const list = isDualPlatform ? webImages : project.images;
                  const plat = isDualPlatform ? "web" : "all";
                  return (
                    <>
                      <div
                        onClick={() => onOpenLightbox(0, plat)}
                        className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-slate-950 cursor-zoom-in"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={encodeAssetPath(list[0])}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        />
                        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/15">
                          <LuMaximize2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>
                            {isId
                              ? `Buka ${list.length} Layar ${isDualPlatform ? "Website" : ""}`
                              : `View ${list.length} ${isDualPlatform ? "Web" : ""} Screenshots`}
                          </span>
                        </div>
                      </div>

                      {list.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
                          {list.slice(0, 10).map((img, i) => (
                            <button
                              key={img}
                              onClick={() => onOpenLightbox(i, plat)}
                              className="flex-shrink-0 w-24 h-14 rounded-xl overflow-hidden border border-[var(--border-subtle)] hover:border-cyan-400 transition-all cursor-pointer"
                              title={formatScreenshotCaption(img)}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={encodeAssetPath(img)}
                                alt={formatScreenshotCaption(img)}
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden border border-[var(--border-strong)]">
            <ArchitectureBlueprint project={project} locale={locale} />
          </div>
        )}

        {/* Full Description */}
        <p className="text-sm sm:text-base theme-body leading-relaxed">
          {project.description[locale]}
        </p>

        {/* Highlights */}
        {project.highlights[locale].length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider theme-muted">
              {isId ? "Sorotan Teknis & Fitur" : "Technical Highlights"}
            </h4>
            <ul className="space-y-2">
              {project.highlights[locale].map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm theme-body">
                  <LuCircleCheck className="w-4 h-4 theme-emerald-text flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider theme-muted">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl surface-subtle text-xs font-semibold theme-heading"
              >
                <TechIcon name={t} className="w-3.5 h-3.5" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
          {project.images.length > 0 && (
            <button
              onClick={() =>
                onOpenLightbox(0, isDualPlatform ? detailTab : "all")
              }
              className="btn-secondary px-4 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <LuMaximize2 className="w-4 h-4 theme-cyan-text" />
              <span>{isId ? "Layar Penuh" : "Fullscreen Gallery"}</span>
            </button>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-5 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2"
          >
            <FaGithub className="w-4 h-4" />
            <span>{isId ? "Lihat Kode di GitHub" : "View on GitHub"}</span>
            <LuExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function ProjectsSection({
  projectsData = projects,
}: {
  projectsData?: ProjectItem[];
}) {
  const { locale } = useAppPreferences();
  const [filter, setFilter] = useState<FilterValue>("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [lightboxState, setLightboxState] = useState<{
    project: ProjectItem;
    startIdx: number;
    platform: "all" | "web" | "mobile";
  } | null>(null);

  const isId = locale === "id";

  const filteredProjects =
    filter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  const getFilterLabel = (f: FilterValue) => {
    if (f === "All") return isId ? "Semua Proyek" : "All Projects";
    return f;
  };

  const getCount = (f: FilterValue) =>
    f === "All"
      ? projectsData.length
      : projectsData.filter((p) => p.category === f).length;

  return (
    <section id="projects" className="space-y-10">
      {/* Header */}
      <div className="reveal text-center space-y-3">
        <p className="theme-cyan-text text-xs font-mono-code font-semibold tracking-widest uppercase">
          {isId ? "Katalog Portofolio" : "Project Archive"}
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold theme-heading">
          {isId ? (
            <>
              Eksplorasi Seluruh{" "}
              <span className="gradient-text-cyan">Karya & Sistem</span> Saya
            </>
          ) : (
            <>
              Complete <span className="gradient-text-cyan">Engineering Portfolio</span>
            </>
          )}
        </h2>
        <p className="theme-muted text-sm max-w-xl mx-auto">
          {isId
            ? "Filter berdasarkan domain teknologi atau klik proyek mana pun untuk menelusuri versi Website, Mobile, maupun arsitekturnya."
            : "Filter by domain or inspect any card to explore Website portals, Flutter Mobile screens, and system architecture."}
        </p>
        <div className="section-divider" />
      </div>

      {/* Category Filter Bar */}
      <div className="reveal flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                active
                  ? "btn-primary"
                  : "surface-pill theme-muted hover:theme-heading"
              }`}
            >
              <span>{getFilterLabel(f)}</span>
              <span
                className={`text-[11px] font-mono-code px-1.5 py-0.5 rounded-md ${
                  active ? "bg-white/20 text-white" : "surface-subtle theme-muted"
                }`}
              >
                {getCount(f)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Responsive Bento Project Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((proj) => {
          const hasImages = proj.images.length > 0;
          const webImgs = proj.images.filter((s) => getScreenshotPlatform(s) === "web");
          const mobImgs = proj.images.filter((s) => getScreenshotPlatform(s) === "mobile");
          const isDual = webImgs.length > 0 && mobImgs.length > 0;

          return (
            <article
              key={proj.id}
              className="bento-card bento-card-interactive rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Visual Top */}
                <div
                  onClick={() =>
                    hasImages
                      ? setLightboxState({ project: proj, startIdx: 0, platform: "all" })
                      : setSelectedProject(proj)
                  }
                  className="relative border-b border-[var(--border-subtle)] cursor-pointer overflow-hidden"
                >
                  {isDual ? (
                    <DualPlatformCardCover
                      webCover={webImgs[0]}
                      mobileCover={mobImgs[0]}
                      projectName={proj.name}
                      webCount={webImgs.length}
                      mobileCount={mobImgs.length}
                      isId={isId}
                    />
                  ) : hasImages ? (
                    <div className="relative w-full aspect-video bg-slate-950 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={encodeAssetPath(proj.images[0])}
                        alt={proj.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/15 text-[11px] font-mono-code text-white flex items-center gap-1.5">
                        <LuMaximize2 className="w-3 h-3 text-cyan-400" />
                        <span>
                          {proj.images.length} {isId ? "Layar" : "Screens"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <ArchitectureBlueprint project={proj} locale={locale} />
                  )}

                  {/* Top-left Category Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white">
                      {proj.category}
                    </span>
                    {proj.featured && (
                      <span className="px-2 py-1 rounded-lg bg-cyan-500/90 text-[10px] font-extrabold text-white uppercase tracking-wider">
                        Flagship
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-lg font-extrabold theme-heading leading-snug group-hover:theme-cyan-text transition-colors">
                      {proj.name}
                    </h3>
                    <span className="text-[11px] font-mono-code theme-faint flex-shrink-0">
                      {proj.year}
                    </span>
                  </div>

                  <p className="text-xs font-semibold theme-cyan-text">
                    {proj.impactBadge[locale]}
                  </p>

                  <p className="text-xs sm:text-sm theme-muted leading-relaxed line-clamp-3">
                    {proj.shortDesc[locale]}
                  </p>
                </div>
              </div>

              {/* Card Footer: Tech + Actions */}
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg surface-subtle text-[11px] font-medium theme-body"
                    >
                      <TechIcon name={t} className="w-3 h-3" />
                      {t}
                    </span>
                  ))}
                  {proj.tech.length > 4 && (
                    <span className="px-2 py-1 rounded-lg surface-subtle text-[11px] font-mono-code theme-muted">
                      +{proj.tech.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-[var(--border-subtle)]">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="flex-1 py-2 px-3 rounded-xl btn-secondary text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LuEye className="w-3.5 h-3.5 theme-cyan-text" />
                    <span>{isId ? "Detail Proyek" : "Case Details"}</span>
                  </button>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${proj.name} GitHub`}
                    className="py-2 px-3 rounded-xl surface-pill hover:border-cyan-500/40 text-xs font-semibold theme-body hover:theme-heading inline-flex items-center gap-1.5 transition-all"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          locale={locale}
          onClose={() => setSelectedProject(null)}
          onOpenLightbox={(startIdx, platform) => {
            const target = selectedProject;
            setSelectedProject(null);
            setLightboxState({ project: target, startIdx, platform });
          }}
        />
      )}

      {/* Lightbox Modal */}
      {lightboxState && (
        <LightboxModal
          images={lightboxState.project.images}
          projectName={lightboxState.project.name}
          startIndex={lightboxState.startIdx}
          initialPlatform={lightboxState.platform}
          onClose={() => setLightboxState(null)}
        />
      )}
    </section>
  );
}
