"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  LuX,
  LuPrinter,
  LuCopy,
  LuCheck,
  LuMail,
  LuGlobe,
  LuExternalLink,
  LuDownload,
} from "react-icons/lu";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useAppPreferences, CONTACT_EMAIL } from "@/context/AppPreferencesContext";
import experience from "@/data/experience";
import projects from "@/data/projects";
import SKILL_CATEGORIES from "@/data/skills";

export default function ResumeModal() {
  const { resumeOpen, closeResume, locale, copyEmail, emailCopied } = useAppPreferences();
  const [hasPdfFile, setHasPdfFile] = useState(false);

  useEffect(() => {
    if (!resumeOpen) return;
    // Check if user placed a static /cv.pdf in public/
    fetch("/cv.pdf", { method: "HEAD" })
      .then((res) => {
        if (res.ok) setHasPdfFile(true);
      })
      .catch(() => {});

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
      className="fixed inset-0 z-[10020] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={closeResume}
    >
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-lg no-print" />

      <div
        className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl surface-modal shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar (hidden when printing) */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-sm font-bold theme-heading">
              {isId ? "Ringkasan Eksekutif & CV — Christian Jhon" : "Executive Resume / CV — Christian Jhon"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyEmail}
              className="btn-secondary px-3.5 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {emailCopied ? <LuCheck className="w-3.5 h-3.5 text-emerald-500" /> : <LuCopy className="w-3.5 h-3.5" />}
              {emailCopied
                ? isId
                  ? "Tersalin"
                  : "Copied"
                : isId
                ? "Salin Email"
                : "Copy Email"}
            </button>

            {hasPdfFile && (
              <a
                href="/cv.pdf"
                download
                className="btn-secondary px-3.5 py-2 text-xs flex items-center gap-1.5"
              >
                <LuDownload className="w-3.5 h-3.5" />
                PDF
              </a>
            )}

            <button
              onClick={() => window.print()}
              className="btn-primary px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <LuPrinter className="w-3.5 h-3.5" />
              {isId ? "Cetak / Simpan PDF" : "Print / Save as PDF"}
            </button>

            <button
              onClick={closeResume}
              aria-label="Close resume"
              className="w-8 h-8 rounded-xl surface-pill flex items-center justify-center theme-muted hover:theme-heading transition-colors cursor-pointer"
            >
              <LuX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-7" id="printable-resume">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-6 border-b border-[var(--border-strong)]">
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold theme-heading tracking-tight">
                Christian Jhon Pranata Panjaitan
              </h1>
              <p className="text-base font-semibold theme-cyan-text">
                {isId
                  ? "IT Engineer (Divisi Riset & Pengembangan) · Fullstack, Desktop & AI"
                  : "IT Engineer (R&D Division) · Fullstack, Desktop & Applied AI"}
              </p>
              <p className="text-xs theme-muted">
                {isId
                  ? "Aktif sebagai IT Engineer sejak Oktober 2025 · Terbuka untuk Peluang Baru (Onsite / Hybrid / Remote)"
                  : "IT Engineer in R&D since October 2025 · Open to New Opportunities (Onsite / Hybrid / Remote)"}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-xs theme-body md:text-right">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex md:justify-end items-center gap-1.5 hover:underline"
              >
                <LuMail className="w-3.5 h-3.5 theme-cyan-text" />
                {CONTACT_EMAIL}
              </a>
              <a
                href="https://www.linkedin.com/in/christian-jhon-pranata-panjaitan-513364267/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex md:justify-end items-center gap-1.5 hover:underline"
              >
                <FaLinkedin className="w-3.5 h-3.5 theme-cyan-text" />
                linkedin.com/in/christian-jhon-pranata-panjaitan
              </a>
              <a
                href="https://github.com/christian050104"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex md:justify-end items-center gap-1.5 hover:underline"
              >
                <FaGithub className="w-3.5 h-3.5 theme-cyan-text" />
                github.com/christian050104
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest theme-cyan-text">
              {isId ? "Profil Profesional" : "Executive Summary"}
            </h2>
            <p className="text-sm leading-relaxed theme-body">
              {isId
                ? "IT Engineer pada Divisi Riset dan Pengembangan (Oktober 2025 – Sekarang) dengan pengalaman praktis 3+ tahun merancang perangkat lunak end-to-end (Web, Desktop Electron, Mobile Flutter, & AI Face Recognition) sekaligus melakukan integrasi serta instalasi infrastruktur nyata di lapangan — termasuk instalasi Paperless Conference System & Video Wall di UPN Surabaya (dengan aplikasi SnapStream terinstal langsung di Video Wall) serta deployment sistem presensi wajah FaceLog pada perangkat IFP (Interactive Flat Panel)."
                : "IT Engineer in Research & Development (October 2025 – Present) with 3+ years of hands-on experience architecting end-to-end software (Web, Electron Desktop, Flutter Mobile, & AI Face Recognition) alongside real-world enterprise hardware deployment — including on-site Paperless Conference & Video Wall installation at UPN Surabaya (deploying SnapStream onto the Video Wall) and integrating FaceLog directly onto Interactive Flat Panel (IFP) hardware."}
            </p>
          </div>

          {/* Core Technical Stack */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest theme-cyan-text">
              {isId ? "Keahlian Teknis Utama" : "Core Technical Stack"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id} className="p-3.5 rounded-xl surface-subtle space-y-1">
                  <p className="text-xs font-bold theme-heading">{cat.label[locale]}</p>
                  <p className="text-xs theme-body leading-relaxed">
                    {cat.skills.map((s) => s.name).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience & Flagship Systems */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest theme-cyan-text">
              {isId ? "Pengalaman Kerja Profesional" : "Professional Work Experience"}
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1.5 pb-4 border-b border-[var(--border-subtle)] last:border-none last:pb-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold theme-heading">{exp.role[locale]}</h3>
                      <p className="text-xs font-medium theme-cyan-text">{exp.organization[locale]}</p>
                    </div>
                    <span className="text-xs font-mono-code theme-muted">{exp.period[locale]}</span>
                  </div>
                  <ul className="space-y-1 pt-1">
                    {exp.points[locale].map((pt, idx) => (
                      <li key={idx} className="text-xs theme-body leading-relaxed flex items-start gap-2">
                        <span className="theme-cyan-text mt-0.5">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Project Highlights */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest theme-cyan-text">
              {isId ? "Portofolio Sistem & Proyek Utama" : "Selected Systems & Project Portfolio"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {projects.map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl surface-subtle space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold theme-heading">{p.name}</span>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-print text-[11px] theme-cyan-text inline-flex items-center gap-1 hover:underline"
                    >
                      GitHub <LuExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs theme-body leading-relaxed">{p.shortDesc[locale]}</p>
                  <p className="text-[11px] theme-muted font-mono-code">{p.tech.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] theme-faint border-t border-[var(--border-subtle)]">
            <span className="inline-flex items-center gap-1.5">
              <LuGlobe className="w-3.5 h-3.5" />
              {isId
                ? "Portofolio interaktif lengkap dengan tangkapan layar tersedia secara online"
                : "Interactive portfolio with live screenshots available online"}
            </span>
            <span>Christian Jhon Pranata Panjaitan</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
