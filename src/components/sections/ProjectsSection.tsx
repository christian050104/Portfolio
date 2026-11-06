"use client";

import { useState, useEffect } from "react";
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
  LuGlobe,
  LuShieldCheck,
} from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import projects, {
  type ProjectItem,
  encodeAssetPath,
  formatScreenshotCaption,
  getScreenshotPlatform,
  getWebPortalRole,
} from "@/data/projects";
import TechIcon from "@/components/ui/TechIcon";
import LightboxModal, { type LightboxFilterMode } from "@/components/ui/LightboxModal";
import { useAppPreferences } from "@/context/AppPreferencesContext";

const FILTERS = ["All", "AI & ML", "Desktop", "Web & Mobile", "Fullstack Web"] as const;
type FilterValue = (typeof FILTERS)[number];

const ACCENT_GRADIENTS: Record<ProjectItem["accent"], string> = {
  violet: "from-slate-900/90 via-slate-900/50 to-transparent",
  cyan: "from-blue-950/60 via-slate-900/40 to-transparent",
  emerald: "from-slate-900/90 via-slate-900/50 to-transparent",
  blue: "from-blue-950/60 via-slate-900/40 to-transparent",
  amber: "from-slate-900/90 via-slate-900/50 to-transparent",
  rose: "from-slate-900/90 via-slate-900/50 to-transparent",
};

const PORTAL_STUDIO_BG: Record<ProjectItem["accent"], string> = {
  violet: "from-slate-950 via-slate-900 to-slate-950",
  cyan: "from-slate-950 via-slate-900 to-slate-950",
  emerald: "from-slate-950 via-slate-900 to-slate-950",
  blue: "from-slate-950 via-slate-900 to-slate-950",
  amber: "from-slate-950 via-slate-900 to-slate-950",
  rose: "from-slate-950 via-slate-900 to-slate-950",
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
        <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-md bg-white/10 text-blue-300 border border-white/10">
          {project.tech[0]}
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-2 my-auto py-2">
        {modules.slice(0, 4).map((mod, idx) => (
          <div
            key={mod}
            className="px-2.5 py-2 rounded-xl bg-slate-900/85 border border-white/10 flex items-center gap-2 min-w-0"
          >
            <span className="w-4 h-4 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-mono-code font-bold flex items-center justify-center flex-shrink-0">
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
          <LuLayers className="w-3 h-3 text-blue-400" />
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
    <div className="relative w-full aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden p-3 flex items-center">
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
      <div className="absolute bottom-2.5 left-3 px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/15 text-[10px] font-mono-code text-slate-200 flex items-center gap-2 z-20">
        <span className="inline-flex items-center gap-1 text-blue-300">
          <LuMonitor className="w-3 h-3" /> {webCount} Web
        </span>
        <span className="text-slate-500">·</span>
        <span className="inline-flex items-center gap-1 text-slate-200">
          <LuSmartphone className="w-3 h-3" /> {mobileCount} {isId ? "Mobile" : "App"}
        </span>
      </div>
    </div>
  );
}

/** Layered Dual-Browser Cover for Two-Sided Web Systems (Storefront / Public Portal + Admin Backoffice) */
function DualPortalCardCover({
  storefrontCover,
  adminCover,
  projectName,
  accent,
  storefrontCount,
  adminCount,
}: {
  storefrontCover: string;
  adminCover: string;
  projectName: string;
  accent: ProjectItem["accent"];
  storefrontCount: number;
  adminCount: number;
}) {
  const studioGrad = PORTAL_STUDIO_BG[accent];

  return (
    <div
      className={`relative w-full aspect-video bg-gradient-to-br ${studioGrad} overflow-hidden p-3 select-none`}
    >
      {/* Subtle Ambient Dot Pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148, 163, 184, 0.35) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      {/* Primary Browser Window: Customer / Public Storefront */}
      <div className="relative z-10 w-[80%] mt-5 rounded-xl overflow-hidden border border-white/20 bg-slate-900 shadow-xl group-hover:scale-[1.015] transition-transform duration-500">
        <div className="h-4 px-2 bg-slate-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400/85" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/85" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/85" />
          </div>
          <span className="text-[8px] font-mono-code text-slate-300 tracking-tight">
            portal.user
          </span>
        </div>
        <div className="w-full aspect-[21/10] bg-white overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={encodeAssetPath(storefrontCover)}
            alt={`${projectName} User Portal`}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* Secondary Elevated Browser Window: Admin Backoffice */}
      <div className="absolute right-2.5 bottom-2.5 w-[58%] rounded-xl overflow-hidden border border-white/25 bg-slate-900 shadow-[0_14px_32px_rgba(0,0,0,0.88)] group-hover:-translate-y-1 group-hover:scale-[1.03] transition-all duration-500 z-20">
        <div className="h-3.5 px-2 bg-slate-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="text-[8px] font-mono-code text-blue-300 tracking-tight">
            admin.backoffice
          </span>
        </div>
        <div className="w-full aspect-[21/10] bg-white overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={encodeAssetPath(adminCover)}
            alt={`${projectName} Admin Panel`}
            loading="lazy"
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none z-15" />

      {/* Dual Portal Count Pill */}
      <div className="absolute bottom-2.5 left-3 px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md border border-white/15 text-[10px] font-mono-code text-slate-200 flex items-center gap-1.5 z-30 shadow-lg">
        <span className="inline-flex items-center gap-1 text-blue-300">
          <LuGlobe className="w-3 h-3" /> {storefrontCount} User
        </span>
        <span className="text-slate-500">·</span>
        <span className="inline-flex items-center gap-1 text-slate-200">
          <LuShieldCheck className="w-3 h-3" /> {adminCount} Admin
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
  onOpenLightbox: (startIdx: number, filterMode: LightboxFilterMode) => void;
}) {
  const isId = locale === "id";
  const [detailPlatformTab, setDetailPlatformTab] = useState<"web" | "mobile">("web");
  const [detailPortalTab, setDetailPortalTab] = useState<"storefront" | "admin">("storefront");
  const [previewIdx, setPreviewIdx] = useState(0);

  const webImages = project.images.filter((src) => getScreenshotPlatform(src) === "web");
  const mobileImages = project.images.filter((src) => getScreenshotPlatform(src) === "mobile");
  const isDualPlatform = webImages.length > 0 && mobileImages.length > 0;

  const storefrontImages = project.dualPortal
    ? project.images.filter((src) => getWebPortalRole(src) === "storefront")
    : [];
  const adminImages = project.dualPortal
    ? project.images.filter((src) => getWebPortalRole(src) === "admin")
    : [];
  const isDualPortal =
    !isDualPlatform &&
    Boolean(project.dualPortal) &&
    storefrontImages.length > 0 &&
    adminImages.length > 0;

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
        className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-3xl surface-modal shadow-2xl p-4 sm:p-8 space-y-5 sm:space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 sm:gap-4 min-w-0">
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold accent-soft">
                {project.category}
              </span>
              <span className="text-xs font-mono-code theme-muted">{project.year}</span>
              <span className="text-xs font-medium theme-muted break-words">
                • {project.impactBadge[locale]}
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold theme-heading break-words">
              {project.name}
            </h3>
            <p className="text-xs sm:text-sm font-medium theme-cyan-text">
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

        {/* Visual Preview (Dual-Platform & Dual-Portal Aware!) */}
        {project.images.length > 0 ? (
          <div className="space-y-3 min-w-0">
            {/* Switcher 1: Website vs Flutter Mobile */}
            {isDualPlatform && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 p-1.5 rounded-2xl surface-subtle">
                <button
                  onClick={() => {
                    setDetailPlatformTab("web");
                    setPreviewIdx(0);
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    detailPlatformTab === "web"
                      ? "btn-primary"
                      : "theme-muted hover:theme-heading"
                  }`}
                >
                  <LuMonitor className="w-4 h-4 flex-shrink-0" />
                  <span>{isId ? `Versi Website (${webImages.length})` : `Website (${webImages.length})`}</span>
                </button>
                <button
                  onClick={() => {
                    setDetailPlatformTab("mobile");
                    setPreviewIdx(0);
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    detailPlatformTab === "mobile"
                      ? "btn-primary"
                      : "theme-muted hover:theme-heading"
                  }`}
                >
                  <LuSmartphone className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {isId ? `Versi Mobile Flutter (${mobileImages.length})` : `Flutter Mobile (${mobileImages.length})`}
                  </span>
                </button>
              </div>
            )}

            {/* Switcher 2: Customer/Public Portal vs Admin Backoffice */}
            {isDualPortal && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 p-1.5 rounded-2xl surface-subtle">
                <button
                  onClick={() => {
                    setDetailPortalTab("storefront");
                    setPreviewIdx(0);
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    detailPortalTab === "storefront"
                      ? "btn-primary"
                      : "theme-muted hover:theme-heading"
                  }`}
                >
                  <LuGlobe className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {isId
                      ? `Portal Pelanggan / Publik (${storefrontImages.length})`
                      : `Customer / Public Portal (${storefrontImages.length})`}
                  </span>
                </button>
                <button
                  onClick={() => {
                    setDetailPortalTab("admin");
                    setPreviewIdx(0);
                  }}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    detailPortalTab === "admin"
                      ? "btn-primary"
                      : "theme-muted hover:theme-heading"
                  }`}
                >
                  <LuShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {isId
                      ? `Panel Admin & Backoffice (${adminImages.length})`
                      : `Admin & Backoffice (${adminImages.length})`}
                  </span>
                </button>
              </div>
            )}

            {isDualPlatform && detailPlatformTab === "mobile" ? (
              <div className="space-y-3 min-w-0">
                {/* 3-Up Portrait Mobile Showcase Stage */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 p-2.5 sm:p-4 rounded-2xl border border-[var(--border-strong)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                  {mobileImages.slice(0, 3).map((src, i) => (
                    <button
                      key={src}
                      onClick={() => onOpenLightbox(i, "mobile")}
                      className="group relative h-40 sm:h-64 flex flex-col items-center justify-center gap-1.5 sm:gap-2 cursor-zoom-in min-w-0"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={encodeAssetPath(src)}
                        alt={formatScreenshotCaption(src)}
                        className="h-32 sm:h-56 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xl"
                      />
                      <span className="text-[10px] font-medium text-slate-300 truncate max-w-full px-1">
                        {formatScreenshotCaption(src)}
                      </span>
                    </button>
                  ))}
                </div>

                {mobileImages.length > 3 && (
                  <div className="flex items-center gap-2 w-full overflow-x-auto pb-1 hide-scrollbar">
                    {mobileImages.map((img, i) => (
                      <button
                        key={img}
                        onClick={() => onOpenLightbox(i, "mobile")}
                        className="flex-shrink-0 px-3 py-1.5 rounded-xl surface-pill hover:border-[var(--border-accent)] text-xs font-medium theme-body hover:theme-cyan-text transition-all cursor-pointer"
                      >
                        {formatScreenshotCaption(img)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3 min-w-0">
                {(() => {
                  const list = isDualPlatform
                    ? webImages
                    : isDualPortal
                    ? detailPortalTab === "admin"
                      ? adminImages
                      : storefrontImages
                    : project.images;
                  const filterArg: LightboxFilterMode = isDualPlatform
                    ? "web"
                    : isDualPortal
                    ? detailPortalTab
                    : "all";
                  const safePreviewIdx = previewIdx < list.length ? previewIdx : 0;
                  const activePreviewSrc = list[safePreviewIdx];

                  return (
                    <>
                      {/* Browser-Framed Interactive Stage */}
                      <div className="rounded-2xl overflow-hidden border border-[var(--border-strong)] bg-slate-950 shadow-xl">
                        <div className="px-3 py-2 bg-slate-900 border-b border-white/10 flex items-center justify-between gap-2 min-w-0">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80 flex-shrink-0" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 flex-shrink-0" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 flex-shrink-0" />
                            <span className="ml-1.5 text-xs font-mono-code text-slate-200 truncate">
                              {formatScreenshotCaption(activePreviewSrc)}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono-code text-slate-400 flex-shrink-0">
                            {safePreviewIdx + 1} / {list.length}
                          </span>
                        </div>

                        <div
                          onClick={() => onOpenLightbox(safePreviewIdx, filterArg)}
                          className={`group relative w-full ${
                            isDualPortal ? "aspect-[21/10]" : "aspect-video"
                          } bg-slate-950 overflow-hidden cursor-zoom-in`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={encodeAssetPath(activePreviewSrc)}
                            alt={`${project.name} — ${formatScreenshotCaption(activePreviewSrc)}`}
                            className="w-full h-full object-cover object-top group-hover:scale-[1.015] transition-transform duration-300"
                          />
                          <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 border border-white/15 shadow-lg">
                            <LuMaximize2 className="w-3.5 h-3.5 text-blue-400" />
                            <span>
                              {isId
                                ? `Perbesar (${list.length})`
                                : `Fullscreen (${list.length})`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Module Selector Strip */}
                      {list.length > 1 && (
                        <div className="flex items-center gap-2 w-full overflow-x-auto pb-1.5 hide-scrollbar">
                          {list.map((img, i) => {
                            const selected = i === safePreviewIdx;
                            return (
                              <button
                                key={img}
                                onClick={() => setPreviewIdx(i)}
                                title={formatScreenshotCaption(img)}
                                className={`flex-shrink-0 flex items-center gap-2 p-1.5 pr-3 rounded-xl border transition-all cursor-pointer ${
                                  selected
                                    ? "accent-soft shadow-sm"
                                    : "surface-subtle hover:border-[var(--border-accent)] opacity-85 hover:opacity-100"
                                }`}
                              >
                                <div className="w-11 h-7 sm:w-12 sm:h-8 rounded-lg overflow-hidden bg-slate-900 border border-white/10 flex-shrink-0">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={encodeAssetPath(img)}
                                    alt={formatScreenshotCaption(img)}
                                    loading="lazy"
                                    className="w-full h-full object-cover object-top"
                                  />
                                </div>
                                <span
                                  className={`text-xs font-medium whitespace-nowrap ${
                                    selected ? "theme-cyan-text font-bold" : "theme-body"
                                  }`}
                                >
                                  {formatScreenshotCaption(img)}
                                </span>
                              </button>
                            );
                          })}
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
        <p className="text-sm sm:text-base theme-body leading-relaxed break-words">
          {project.description[locale]}
        </p>

        {/* Challenge & Solution Executive Summary (when available) */}
        {project.challenge && project.solution && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl surface-subtle border-l-2 border-l-slate-400 space-y-1.5 min-w-0">
              <p className="text-[11px] font-mono-code font-bold uppercase tracking-wider theme-muted">
                {isId ? "Tantangan Bisnis" : "Problem & Context"}
              </p>
              <p className="text-xs sm:text-sm theme-body leading-relaxed break-words">
                {project.challenge[locale]}
              </p>
            </div>
            <div className="p-4 rounded-2xl surface-subtle border-l-2 border-l-[var(--accent-cyan)] space-y-1.5 min-w-0">
              <p className="text-[11px] font-mono-code font-bold uppercase tracking-wider theme-cyan-text">
                {isId ? "Solusi Arsitektur" : "Engineered Solution"}
              </p>
              <p className="text-xs sm:text-sm theme-body leading-relaxed break-words">
                {project.solution[locale]}
              </p>
            </div>
          </div>
        )}

        {/* Highlights */}
        {project.highlights[locale].length > 0 && (
          <div className="space-y-2.5 min-w-0">
            <h4 className="text-xs font-bold uppercase tracking-wider theme-muted">
              {isId ? "Sorotan Teknis & Fitur" : "Technical Highlights"}
            </h4>
            <ul className="space-y-2">
              {project.highlights[locale].map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-xs sm:text-sm theme-body">
                  <LuCircleCheck className="w-4 h-4 theme-cyan-text flex-shrink-0 mt-0.5" />
                  <span className="break-words">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className="space-y-2 min-w-0">
          <h4 className="text-xs font-bold uppercase tracking-wider theme-muted">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl surface-subtle text-xs font-semibold theme-heading"
              >
                <TechIcon name={t} className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{t}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row flex-wrap items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-[var(--border-subtle)]">
          {project.images.length > 0 && (
            <button
              onClick={() =>
                onOpenLightbox(
                  previewIdx,
                  isDualPlatform
                    ? detailPlatformTab
                    : isDualPortal
                    ? detailPortalTab
                    : "all"
                )
              }
              className="btn-secondary px-4 py-2.5 text-xs sm:text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <LuMaximize2 className="w-4 h-4 theme-cyan-text flex-shrink-0" />
              <span>{isId ? "Galeri Layar Penuh" : "Fullscreen Gallery"}</span>
            </button>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-5 py-2.5 text-xs sm:text-sm inline-flex items-center justify-center gap-2"
          >
            <FaGithub className="w-4 h-4 flex-shrink-0" />
            <span>{isId ? "Lihat Kode di GitHub" : "View on GitHub"}</span>
            <LuExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
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
    platform: LightboxFilterMode;
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
    <section id="projects" className="space-y-8 sm:space-y-10 w-full min-w-0">
      {/* Header */}
      <div className="reveal text-center space-y-3">
        <p className="theme-cyan-text text-xs font-mono-code font-semibold tracking-widest uppercase">
          {isId ? "Katalog Portofolio" : "Project Archive"}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold theme-heading">
          {isId
            ? "Eksplorasi Seluruh Karya & Sistem Saya"
            : "Complete Engineering Portfolio"}
        </h2>
        <p className="theme-muted text-sm max-w-xl mx-auto">
          {isId
            ? "Filter berdasarkan domain teknologi atau klik proyek mana pun untuk menelusuri Portal Pelanggan, Panel Admin, hingga aplikasi Mobile."
            : "Filter by domain or inspect any project to explore Customer Storefronts, Admin Backoffices, and Flutter Mobile screens."}
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
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredProjects.map((proj) => {
          const hasImages = proj.images.length > 0;
          const webImgs = proj.images.filter((s) => getScreenshotPlatform(s) === "web");
          const mobImgs = proj.images.filter((s) => getScreenshotPlatform(s) === "mobile");
          const isDual = webImgs.length > 0 && mobImgs.length > 0;

          const storefrontImgs = proj.dualPortal
            ? proj.images.filter((s) => getWebPortalRole(s) === "storefront")
            : [];
          const adminImgs = proj.dualPortal
            ? proj.images.filter((s) => getWebPortalRole(s) === "admin")
            : [];
          const isDualPortalCard =
            !isDual &&
            Boolean(proj.dualPortal) &&
            storefrontImgs.length > 0 &&
            adminImgs.length > 0;

          return (
            <article
              key={proj.id}
              className="bento-card bento-card-interactive rounded-3xl overflow-hidden flex flex-col justify-between group min-w-0"
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
                  ) : isDualPortalCard ? (
                    <DualPortalCardCover
                      storefrontCover={storefrontImgs[0]}
                      adminCover={adminImgs[0]}
                      projectName={proj.name}
                      accent={proj.accent}
                      storefrontCount={storefrontImgs.length}
                      adminCount={adminImgs.length}
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
                        <LuMaximize2 className="w-3 h-3 text-blue-400" />
                        <span>
                          {proj.images.length} {isId ? "Layar" : "Screens"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <ArchitectureBlueprint project={proj} locale={locale} />
                  )}

                  {/* Top-left Category Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-30">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white shadow-md">
                      {proj.category}
                    </span>
                    {proj.featured && (
                      <span className="px-2 py-1 rounded-lg bg-[var(--accent-cyan)] text-[10px] font-extrabold text-white uppercase tracking-wider shadow-md">
                        Flagship
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-2.5 sm:space-y-3 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 min-w-0">
                    <h3 className="text-lg font-extrabold theme-heading leading-snug group-hover:theme-cyan-text transition-colors break-words">
                      {proj.name}
                    </h3>
                    <span className="text-[11px] font-mono-code theme-faint flex-shrink-0">
                      {proj.year}
                    </span>
                  </div>

                  <p className="text-xs font-medium theme-cyan-text leading-snug break-words">
                    {proj.impactBadge[locale]}
                  </p>

                  <p className="text-xs sm:text-sm theme-muted leading-relaxed line-clamp-3">
                    {proj.shortDesc[locale]}
                  </p>
                </div>
              </div>

              {/* Card Footer: Tech + Actions */}
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4 min-w-0">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg surface-subtle text-[11px] font-medium theme-body"
                    >
                      <TechIcon name={t} className="w-3 h-3 flex-shrink-0" />
                      <span>{t}</span>
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
                    <LuEye className="w-3.5 h-3.5 theme-cyan-text flex-shrink-0" />
                    <span>{isId ? "Detail Proyek" : "Case Details"}</span>
                  </button>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${proj.name} GitHub`}
                    className="py-2 px-3 rounded-xl surface-pill hover:border-[var(--border-accent)] text-xs font-semibold theme-body hover:theme-heading inline-flex items-center gap-1.5 transition-all"
                  >
                    <FaGithub className="w-3.5 h-3.5 flex-shrink-0" />
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
          onOpenLightbox={(startIdx, filterMode) => {
            const target = selectedProject;
            setSelectedProject(null);
            setLightboxState({ project: target, startIdx, platform: filterMode });
          }}
        />
      )}

      {/* Lightbox Modal */}
      {lightboxState && (
        <LightboxModal
          images={lightboxState.project.images}
          projectName={lightboxState.project.name}
          dualPortal={lightboxState.project.dualPortal}
          startIndex={lightboxState.startIdx}
          initialPlatform={lightboxState.platform}
          onClose={() => setLightboxState(null)}
        />
      )}
    </section>
  );
}
