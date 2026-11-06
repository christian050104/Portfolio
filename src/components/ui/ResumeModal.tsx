"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  LuX,
  LuCopy,
  LuCheck,
  LuExternalLink,
  LuDownload,
  LuFileText,
} from "react-icons/lu";
import { useAppPreferences } from "@/context/AppPreferencesContext";

export default function ResumeModal() {
  const { resumeOpen, closeResume, locale, copyEmail, emailCopied } = useAppPreferences();

  useEffect(() => {
    if (!resumeOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeResume();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [resumeOpen, closeResume]);

  if (typeof document === "undefined" || !resumeOpen) return null;

  const isId = locale === "id";

  return createPortal(
    <div
      className="fixed inset-0 z-[10020] flex items-center justify-center p-2 sm:p-5"
      onClick={closeResume}
    >
      <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-lg" />

      <div
        className="relative z-10 w-full max-w-5xl h-[92vh] flex flex-col rounded-3xl surface-modal shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold theme-heading truncate">
              {isId
                ? "Curriculum Vitae — Christian Jhon Pranata Panjaitan"
                : "Curriculum Vitae — Christian Jhon Pranata Panjaitan"}
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={copyEmail}
              className="btn-secondary px-3 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {emailCopied ? (
                <LuCheck className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <LuCopy className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">
                {emailCopied
                  ? isId
                    ? "Tersalin"
                    : "Copied"
                  : isId
                  ? "Salin Email"
                  : "Copy Email"}
              </span>
            </button>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              title={isId ? "Buka di tab baru" : "Open in new tab"}
              className="btn-secondary px-3 py-2 text-xs inline-flex items-center gap-1.5"
            >
              <LuExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {isId ? "Tab Baru" : "New Tab"}
              </span>
            </a>

            {/* Single Primary PDF Download Button */}
            <a
              href="/cv.pdf"
              download="CV_Christian_Jhon_Pranata_Panjaitan.pdf"
              className="btn-primary px-4 py-2 text-xs inline-flex items-center gap-1.5"
            >
              <LuDownload className="w-3.5 h-3.5" />
              <span>{isId ? "Unduh CV (PDF)" : "Download CV (PDF)"}</span>
            </a>

            <button
              onClick={closeResume}
              aria-label="Close resume"
              className="w-8 h-8 rounded-xl surface-pill flex items-center justify-center theme-muted hover:theme-heading transition-colors cursor-pointer"
            >
              <LuX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Direct Embedded cv.pdf Viewer */}
        <div className="flex-1 w-full bg-slate-900 relative overflow-hidden">
          <object
            data="/cv.pdf#view=FitH"
            type="application/pdf"
            className="w-full h-full"
          >
            {/* Fallback for mobile browsers that block inline PDF embeds */}
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-400">
                <LuFileText className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-sm">
                <p className="text-base font-bold text-white">
                  CV — Christian Jhon Pranata Panjaitan
                </p>
                <p className="text-xs text-slate-400">
                  {isId
                    ? "Browser perangkat seluler Anda tidak menampilkan PDF secara langsung. Silakan buka atau unduh file PDF asli di bawah ini."
                    : "Your mobile browser does not preview PDFs inline. Open or download the full PDF resume below."}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-4 py-2.5 text-xs inline-flex items-center gap-2"
                >
                  <LuExternalLink className="w-4 h-4" />
                  <span>{isId ? "Buka PDF" : "Open PDF"}</span>
                </a>
                <a
                  href="/cv.pdf"
                  download="CV_Christian_Jhon_Pranata_Panjaitan.pdf"
                  className="btn-primary px-5 py-2.5 text-xs inline-flex items-center gap-2"
                >
                  <LuDownload className="w-4 h-4" />
                  <span>{isId ? "Unduh CV (PDF)" : "Download CV (PDF)"}</span>
                </a>
              </div>
            </div>
          </object>
        </div>
      </div>
    </div>,
    document.body
  );
}
