"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import {
  LuArrowRight,
  LuFileText,
  LuCopy,
  LuCheck,
  LuShieldCheck,
  LuLayers,
  LuCpu,
  LuSparkles,
} from "react-icons/lu";
import { useAppPreferences, CONTACT_EMAIL } from "@/context/AppPreferencesContext";
import TechIcon from "@/components/ui/TechIcon";

const ROLES_BY_LOCALE = {
  id: [
    "IT Engineer — Riset & Pengembangan",
    "Fullstack Software Engineer",
    "AI & Computer Vision Builder",
    "Cross-Platform Desktop Architect",
  ],
  en: [
    "IT Engineer — Research & Development",
    "Fullstack Software Engineer",
    "AI & Computer Vision Builder",
    "Cross-Platform Desktop Architect",
  ],
};

const CORE_BADGES = ["Laravel", "Django", "React.js", "Electron", "Flutter", "Python"];

export default function HeroSection() {
  const { locale, openResume, copyEmail, emailCopied } = useAppPreferences();
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const roles = ROLES_BY_LOCALE[locale];
    const current = roles[roleIdx % roles.length];
    const speed = isDeleting ? 35 : 70;

    typingRef.current = setTimeout(() => {
      if (!isDeleting) {
        const nextText = current.slice(0, displayed.length + 1);
        setDisplayed(nextText);
        if (nextText.length === current.length) {
          typingRef.current = setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        const nextText = current.slice(0, Math.max(0, displayed.length - 1));
        setDisplayed(nextText);
        if (nextText.length === 0) {
          setIsDeleting(false);
          setRoleIdx((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [displayed, isDeleting, roleIdx, locale]);

  const isId = locale === "id";

  const metrics = [
    {
      value: "3+",
      label: isId ? "Tahun Pengalaman" : "Years Coding & Building",
      sub: isId ? "Pengembangan End-to-End" : "End-to-End Software Delivery",
    },
    {
      value: "7+",
      label: isId ? "Sistem Terbangun" : "Production Systems",
      sub: isId ? "Dari AI hingga E-Commerce" : "Spanning AI to E-Commerce",
    },
    {
      value: "4",
      label: isId ? "Ekosistem Platform" : "Target Platforms",
      sub: "Web · Desktop · Mobile · AI",
    },
    {
      value: "80+",
      label: isId ? "Modul Fitur Nyata" : "Feature Modules Shipped",
      sub: isId ? "Terdokumentasi & Teruji" : "Documented & Verified",
    },
  ];

  return (
    <section
      id="home"
      className="relative pt-28 pb-12 md:pt-36 md:pb-20 overflow-hidden"
    >
      {/* Subtle Grid & Ambient Glows */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern pointer-events-none" />
      <div
        className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full opacity-20 blur-3xl -z-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/4 -right-24 w-[460px] h-[460px] rounded-full opacity-15 blur-3xl -z-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 2-Column Executive Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Pitch & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-hero-1">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold theme-emerald-text">
                {isId
                  ? "Aktif sebagai IT Engineer (R&D) · Terbuka untuk Peluang Baru"
                  : "IT Engineer (R&D) · Open to New Opportunities"}
              </span>
            </div>

            {/* Name & Dynamic Role */}
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-mono-code font-medium theme-cyan-text tracking-wide uppercase">
                {isId
                  ? "IT Engineer · Divisi Riset dan Pengembangan"
                  : "IT Engineer · Research & Development Division"}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold theme-heading leading-[1.12] tracking-tight">
                Christian Jhon{" "}
                <span className="block shimmer-text mt-1">Pranata Panjaitan</span>
              </h1>

              <div className="flex items-center justify-center lg:justify-start gap-2 text-base sm:text-xl font-semibold h-8">
                <span className="font-mono-code theme-cyan-text">&gt;</span>
                <span className="theme-body font-mono-code">
                  {displayed}
                  <span className="animate-blink theme-cyan-text ml-0.5">|</span>
                </span>
              </div>
            </div>

            {/* Value-Driven Recruiter Summary */}
            <p className="text-sm sm:text-base md:text-lg theme-body leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {isId ? (
                <>
                  Merancang perangkat lunak end-to-end dan mengintegrasikannya langsung ke{" "}
                  <span className="font-semibold theme-heading">
                    infrastruktur nyata di lapangan
                  </span>{" "}
                  — mulai dari AI pengenalan wajah pada perangkat{" "}
                  <span className="font-semibold theme-heading">IFP</span>, studio live streaming
                  pada <span className="font-semibold theme-heading">Video Wall & Paperless Conference</span>{" "}
                  (UPN Surabaya), hingga platform EdTech desktop dan aplikasi web/mobile.
                </>
              ) : (
                <>
                  Engineering end-to-end software and deploying it onto{" "}
                  <span className="font-semibold theme-heading">
                    real enterprise hardware in the field
                  </span>{" "}
                  — from AI face recognition on{" "}
                  <span className="font-semibold theme-heading">IFP displays</span> and live
                  broadcasting on{" "}
                  <span className="font-semibold theme-heading">
                    Video Wall & Paperless Conference
                  </span>{" "}
                  systems (UPN Surabaya) to EdTech desktop suites and web/mobile apps.
                </>
              )}
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href="#featured"
                className="btn-primary px-6 py-3.5 text-sm inline-flex items-center gap-2"
              >
                <span>{isId ? "Lihat Karya Unggulan" : "Explore Flagship Work"}</span>
                <LuArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={openResume}
                className="btn-secondary px-5 py-3.5 text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <LuFileText className="w-4 h-4 theme-cyan-text" />
                <span>{isId ? "Lihat / Unduh CV" : "View / Download CV"}</span>
              </button>

              <button
                onClick={copyEmail}
                title={CONTACT_EMAIL}
                className="surface-pill hover:border-cyan-500/40 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-medium theme-body hover:theme-heading inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                {emailCopied ? (
                  <LuCheck className="w-4 h-4 text-emerald-500" />
                ) : (
                  <LuCopy className="w-4 h-4 theme-cyan-text" />
                )}
                <span>
                  {emailCopied
                    ? isId
                      ? "Email Tersalin!"
                      : "Email Copied!"
                    : isId
                    ? "Salin Email"
                    : "Copy Email"}
                </span>
              </button>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
              <span className="text-xs theme-faint font-medium">
                {isId ? "Profil Resmi:" : "Connect:"}
              </span>
              {[
                {
                  href: "https://github.com/christian050104",
                  icon: <FaGithub className="w-4 h-4" />,
                  label: "GitHub",
                },
                {
                  href: "https://www.linkedin.com/in/christian-jhon-pranata-panjaitan-513364267/",
                  icon: <FaLinkedin className="w-4 h-4" />,
                  label: "LinkedIn",
                },
                {
                  href: "https://www.instagram.com/pranata_ex21/",
                  icon: <FaInstagram className="w-4 h-4" />,
                  label: "Instagram",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl surface-subtle text-xs font-medium theme-muted hover:theme-cyan-text hover:border-cyan-500/35 transition-all"
                >
                  {social.icon}
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Executive Bento Portrait & Tech Card */}
          <div className="lg:col-span-5 animate-hero-2">
            <div className="relative mx-auto max-w-md bento-card rounded-3xl p-5 sm:p-6 space-y-5">
              {/* Top Mini Status Header */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <LuShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-semibold theme-heading">
                    {isId ? "IT Engineer · Divisi R&D" : "IT Engineer · R&D Division"}
                  </span>
                </div>
                <span className="text-[11px] font-mono-code theme-cyan-text px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  {isId ? "Okt 2025 – Sekarang" : "Oct 2025 – Present"}
                </span>
              </div>

              {/* Portrait Container */}
              <div className="relative flex flex-col items-center">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl">
                  <Image
                    src="/jhon.jpeg"
                    alt="Christian Jhon Pranata Panjaitan"
                    fill
                    sizes="(max-width: 768px) 176px, 208px"
                    className="object-cover object-[center_15%]"
                    priority
                  />
                </div>

                {/* Floating Highlight Pill */}
                <div className="-mt-4 relative z-10 px-4 py-1.5 rounded-full surface-modal shadow-lg flex items-center gap-2">
                  <LuSparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold theme-heading">
                    {isId ? "Siap Kontribusi Cepat" : "Fast Onboarding & Delivery"}
                  </span>
                </div>
              </div>

              {/* Core Stack Icons Strip */}
              <div className="space-y-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider theme-muted text-center">
                  {isId ? "Teknologi Inti Produksi" : "Primary Production Stack"}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {CORE_BADGES.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl surface-subtle text-xs font-semibold theme-heading"
                    >
                      <TechIcon name={tech} className="w-3.5 h-3.5" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* End-to-End Scope Footnote */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-2xl surface-subtle flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/15 flex items-center justify-center theme-cyan-text flex-shrink-0">
                    <LuLayers className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold theme-heading truncate">Fullstack</p>
                    <p className="text-[11px] theme-muted truncate">UI · API · DB</p>
                  </div>
                </div>
                <div className="p-3 rounded-2xl surface-subtle flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-violet-500/15 flex items-center justify-center theme-violet-text flex-shrink-0">
                    <LuCpu className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold theme-heading truncate">Applied AI</p>
                    <p className="text-[11px] theme-muted truncate">Vision & Real-time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recruiter Impact Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-hero-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bento-card bento-card-interactive rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-1"
            >
              <span className="text-2xl sm:text-3xl font-extrabold font-display gradient-text-cyan">
                {m.value}
              </span>
              <p className="text-xs sm:text-sm font-bold theme-heading mt-1">{m.label}</p>
              <p className="text-[11px] sm:text-xs theme-muted">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
