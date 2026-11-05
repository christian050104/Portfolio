"use client";

import {
  LuMail,
  LuCopy,
  LuCheck,
  LuExternalLink,
  LuFileText,
  LuArrowUp,
} from "react-icons/lu";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useAppPreferences, CONTACT_EMAIL } from "@/context/AppPreferencesContext";

export default function ContactSection() {
  const { locale, copyEmail, emailCopied, openResume } = useAppPreferences();
  const isId = locale === "id";

  const socialProfiles = [
    {
      title: "LinkedIn",
      sub: isId ? "Koneksi & pesan profesional HRD" : "Professional recruiter messaging",
      value: "in/christian-jhon-pranata-panjaitan",
      href: "https://www.linkedin.com/in/christian-jhon-pranata-panjaitan-513364267/",
      icon: <FaLinkedin className="w-5 h-5 text-sky-500" />,
    },
    {
      title: "GitHub",
      sub: isId ? "Repositori kode & dokumentasi proyek" : "Source code & project repositories",
      value: "github.com/christian050104",
      href: "https://github.com/christian050104",
      icon: <FaGithub className="w-5 h-5 theme-heading" />,
    },
    {
      title: "Instagram",
      sub: isId ? "Media sosial personal" : "Personal social profile",
      value: "@rexorion__",
      href: "https://www.instagram.com/rexorion__/",
      icon: <FaInstagram className="w-5 h-5 text-pink-500" />,
    },
  ];

  return (
    <section id="contact" className="space-y-12 pb-16">
      {/* Header */}
      <div className="reveal text-center space-y-3">
        <p className="theme-cyan-text text-xs font-mono-code font-semibold tracking-widest uppercase">
          {isId ? "Mari Terhubung" : "Get in Touch"}
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold theme-heading">
          {isId ? (
            <>
              Tertarik Mengajak Saya{" "}
              <span className="gradient-text-cyan">Bergabung di Tim Anda?</span>
            </>
          ) : (
            <>
              Ready to <span className="gradient-text-cyan">Build Impactful Software</span> Together?
            </>
          )}
        </h2>
        <p className="theme-muted text-sm max-w-xl mx-auto">
          {isId
            ? "Silakan hubungi saya melalui email atau terhubung langsung di LinkedIn dan GitHub. Saya terbuka untuk peluang kerja Full-time, Remote, maupun kolaborasi proyek."
            : "Reach out directly via email or connect on LinkedIn and GitHub. Open to Full-time roles, Remote opportunities, and engineering collaborations."}
        </p>
        <div className="section-divider" />
      </div>

      {/* Centered Contact Showcase */}
      <div className="reveal max-w-4xl mx-auto space-y-5">
        {/* Primary Direct Email Card */}
        <div className="bento-card rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center theme-emerald-text flex-shrink-0">
              <LuMail className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-semibold theme-muted">
                  {isId ? "Email Resmi Rekrutmen & Kolaborasi" : "Primary Direct Email"}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 theme-emerald-text border border-emerald-500/25">
                  {isId ? "Aktif" : "Active"}
                </span>
              </div>
              <p className="text-lg sm:text-xl font-extrabold theme-heading break-all">
                {CONTACT_EMAIL}
              </p>
              <p className="text-xs theme-muted">
                {isId
                  ? "Klik salin untuk menyalin alamat email atau kirim pesan langsung."
                  : "Copy email address in one click or launch your mail client directly."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 flex-shrink-0">
            <button
              onClick={copyEmail}
              className="btn-primary py-3 px-5 text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer"
            >
              {emailCopied ? (
                <LuCheck className="w-4 h-4" />
              ) : (
                <LuCopy className="w-4 h-4" />
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

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn-secondary py-3 px-4 text-xs sm:text-sm inline-flex items-center gap-2"
            >
              <LuMail className="w-4 h-4 theme-cyan-text" />
              <span>{isId ? "Kirim Email" : "Send Email"}</span>
            </a>

            <button
              onClick={openResume}
              className="btn-secondary py-3 px-4 text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <LuFileText className="w-4 h-4 theme-cyan-text" />
              <span>{isId ? "Lihat CV" : "View CV"}</span>
            </button>
          </div>
        </div>

        {/* 3-Column Social & Code Channels */}
        <div className="grid sm:grid-cols-3 gap-4">
          {socialProfiles.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-card bento-card-interactive rounded-2xl p-5 flex flex-col justify-between gap-4 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl surface-pill flex items-center justify-center">
                  {item.icon}
                </div>
                <LuExternalLink className="w-4 h-4 theme-muted group-hover:theme-cyan-text transition-colors" />
              </div>

              <div className="space-y-1">
                <p className="text-base font-bold theme-heading group-hover:theme-cyan-text transition-colors">
                  {item.title}
                </p>
                <p className="text-xs theme-muted">{item.sub}</p>
                <p className="text-xs font-mono-code theme-cyan-text truncate pt-1">
                  {item.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="reveal pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left space-y-1">
          <p className="text-sm font-bold theme-heading">
            Christian Jhon Pranata Panjaitan
          </p>
          <p className="text-xs theme-muted">
            © {new Date().getFullYear()} ·{" "}
            {isId
              ? "Dirancang untuk kejelasan, kecepatan, dan kenyamanan eksplorasi."
              : "Engineered for clarity, speed, and effortless exploration."}
          </p>
        </div>

        <a
          href="#home"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl surface-pill text-xs font-semibold theme-body hover:theme-cyan-text transition-colors"
        >
          <span>{isId ? "Kembali ke Atas" : "Back to Top"}</span>
          <LuArrowUp className="w-3.5 h-3.5" />
        </a>
      </footer>
    </section>
  );
}
