"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  LuX,
  LuChevronLeft,
  LuChevronRight,
  LuMonitor,
  LuSmartphone,
  LuLayers,
} from "react-icons/lu";
import {
  encodeAssetPath,
  formatScreenshotCaption,
  getScreenshotPlatform,
} from "@/data/projects";
import { useAppPreferences } from "@/context/AppPreferencesContext";

interface LightboxModalProps {
  images: string[];
  projectName: string;
  startIndex?: number;
  initialPlatform?: "all" | "web" | "mobile";
  onClose: () => void;
}

export default function LightboxModal({
  images,
  projectName,
  startIndex = 0,
  initialPlatform = "all",
  onClose,
}: LightboxModalProps) {
  const { locale } = useAppPreferences();
  const isId = locale === "id";

  const webImages = useMemo(
    () => images.filter((src) => getScreenshotPlatform(src) === "web"),
    [images]
  );
  const mobileImages = useMemo(
    () => images.filter((src) => getScreenshotPlatform(src) === "mobile"),
    [images]
  );
  const isDualPlatform = webImages.length > 0 && mobileImages.length > 0;

  const [platformFilter, setPlatformFilter] = useState<"all" | "web" | "mobile">(
    isDualPlatform ? initialPlatform : "all"
  );
  const [idx, setIdx] = useState(startIndex);
  const touchStartX = useRef(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeList = useMemo(() => {
    if (!isDualPlatform || platformFilter === "all") return images;
    return platformFilter === "web" ? webImages : mobileImages;
  }, [images, webImages, mobileImages, isDualPlatform, platformFilter]);

  const total = activeList.length;
  const safeIdx = idx < total ? idx : 0;

  const prev = useCallback(() => {
    if (total === 0) return;
    setIdx((current) => (current - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    if (total === 0) return;
    setIdx((current) => (current + 1) % total);
  }, [total]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, prev, next]);

  useEffect(() => {
    const activeThumb = thumbRefs.current[safeIdx];
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [safeIdx, platformFilter]);

  if (typeof document === "undefined" || total === 0) return null;

  const currentSrc = activeList[safeIdx];
  const caption = formatScreenshotCaption(currentSrc);
  const currentPlatform = getScreenshotPlatform(currentSrc);

  const handleSelectPlatform = (nextPlatform: "all" | "web" | "mobile") => {
    setPlatformFilter(nextPlatform);
    setIdx(0);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 md:p-8 no-print"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-xl" />

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-6xl h-full max-h-[92vh] flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-1">
          <div className="min-w-0 flex items-center gap-2.5 flex-wrap">
            <span className="text-white font-bold text-base md:text-lg truncate">
              {projectName}
            </span>

            {isDualPlatform && (
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  currentPlatform === "mobile"
                    ? "bg-violet-500/20 text-violet-300 border-violet-500/35"
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/35"
                }`}
              >
                {currentPlatform === "mobile" ? (
                  <LuSmartphone className="w-3 h-3" />
                ) : (
                  <LuMonitor className="w-3 h-3" />
                )}
                {currentPlatform === "mobile" ? "Mobile App" : "Website"}
              </span>
            )}

            <span className="text-cyan-400 text-xs font-mono-code px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30">
              {caption}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto">
            {/* Dual-Platform Filter Switcher inside Lightbox */}
            {isDualPlatform && (
              <div className="flex items-center p-1 rounded-xl bg-white/10 border border-white/15 text-xs">
                <button
                  onClick={() => handleSelectPlatform("all")}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    platformFilter === "all"
                      ? "bg-cyan-500 text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <LuLayers className="w-3 h-3" />
                  <span className="hidden sm:inline">{isId ? "Semua" : "All"}</span>
                  <span className="font-mono-code text-[10px]">({images.length})</span>
                </button>
                <button
                  onClick={() => handleSelectPlatform("web")}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    platformFilter === "web"
                      ? "bg-cyan-500 text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <LuMonitor className="w-3 h-3" />
                  <span>Web</span>
                  <span className="font-mono-code text-[10px]">({webImages.length})</span>
                </button>
                <button
                  onClick={() => handleSelectPlatform("mobile")}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    platformFilter === "mobile"
                      ? "bg-cyan-500 text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <LuSmartphone className="w-3 h-3" />
                  <span>Mobile</span>
                  <span className="font-mono-code text-[10px]">({mobileImages.length})</span>
                </button>
              </div>
            )}

            <span className="text-slate-300 text-xs sm:text-sm font-mono-code tabular-nums px-2.5 py-1 rounded-lg bg-white/10">
              {safeIdx + 1} / {total}
            </span>
            <button
              onClick={onClose}
              aria-label="Close gallery"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <LuX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Image Viewport */}
        <div
          className="flex-1 min-h-0 relative w-full rounded-2xl overflow-hidden border border-white/15 bg-slate-950/85 shadow-2xl flex items-center justify-center select-none"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const diff = e.changedTouches[0].clientX - touchStartX.current;
            if (diff > 45) prev();
            if (diff < -45) next();
          }}
        >
          {activeList.map((src, i) => {
            const isNear =
              i === safeIdx ||
              i === (safeIdx - 1 + total) % total ||
              i === (safeIdx + 1) % total;
            if (!isNear) return null;

            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={encodeAssetPath(src)}
                alt={`${projectName} — ${formatScreenshotCaption(src)}`}
                className={`absolute inset-0 w-full h-full object-contain p-2 sm:p-4 transition-opacity duration-250 ${
                  i === safeIdx ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />
            );
          })}

          {total > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900/80 hover:bg-cyan-600 border border-white/15 text-white flex items-center justify-center transition-all shadow-xl cursor-pointer z-10"
              >
                <LuChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900/80 hover:bg-cyan-600 border border-white/15 text-white flex items-center justify-center transition-all shadow-xl cursor-pointer z-10"
              >
                <LuChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Adaptive Thumbnail Strip (Portrait thumbnails for Mobile, Landscape for Web!) */}
        {total > 1 && (
          <div className="flex-none flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 px-1 hide-scrollbar">
            {activeList.map((src, i) => {
              const isMob = getScreenshotPlatform(src) === "mobile";
              return (
                <button
                  key={src}
                  ref={(el) => {
                    thumbRefs.current[i] = el;
                  }}
                  onClick={() => setIdx(i)}
                  title={formatScreenshotCaption(src)}
                  className={`relative flex-shrink-0 rounded-xl overflow-hidden border-2 bg-slate-900 transition-all cursor-pointer ${
                    isMob ? "w-10 h-16 sm:w-11 sm:h-16" : "w-20 h-12 sm:w-24 sm:h-14"
                  } ${
                    i === safeIdx
                      ? "border-cyan-400 opacity-100 scale-105 shadow-lg shadow-cyan-500/30"
                      : "border-white/10 opacity-45 hover:opacity-85 hover:border-white/30"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={encodeAssetPath(src)}
                    alt={formatScreenshotCaption(src)}
                    loading="lazy"
                    className={`w-full h-full ${isMob ? "object-contain p-0.5" : "object-cover"}`}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
