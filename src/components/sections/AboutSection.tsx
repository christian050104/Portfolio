"use client";

import {
  LuScanFace,
  LuMonitor,
  LuRadio,
  LuLayers,
  LuBriefcase,
  LuMapPin,
  LuCircleCheck,
  LuCode,
} from "react-icons/lu";
import { useAppPreferences } from "@/context/AppPreferencesContext";

export default function AboutSection() {
  const { locale } = useAppPreferences();
  const isId = locale === "id";

  const pillars = [
    {
      icon: LuScanFace,
      title: isId ? "AI & Integrasi Perangkat IFP" : "Applied AI & IFP Integration",
      description: isId
        ? "Membangun FaceLog yang terinstal langsung pada perangkat IFP (Interactive Flat Panel) & Kiosk Scanner untuk presensi wajah real-time."
        : "Built FaceLog and deployed it directly onto Interactive Flat Panel (IFP) displays & Kiosk Scanners for real-time attendance.",
    },
    {
      icon: LuMonitor,
      title: isId ? "Arsitektur Desktop Lintas OS" : "Cross-Platform Desktop Suites",
      description: isId
        ? "Merancang EduSphere (34+ layar fitur) dengan Electron, komunikasi kelas real-time, monitoring ujian, dan kendali perangkat kelas."
        : "Engineered EduSphere (34+ screens) using Electron, uniting live classroom video, exam monitoring, and classroom device control.",
    },
    {
      icon: LuRadio,
      title: isId ? "Video Wall & Paperless System" : "Video Wall & Paperless Systems",
      description: isId
        ? "Terlibat dalam instalasi Paperless Conference & Video Wall di UPN Surabaya, termasuk deployment langsung aplikasi SnapStream di Video Wall."
        : "Installed Paperless Conference & Video Wall infrastructure at UPN Surabaya, deploying SnapStream live onto the Video Wall.",
    },
    {
      icon: LuLayers,
      title: isId ? "Fullstack Web & Mobile" : "Fullstack Web & Mobile Delivery",
      description: isId
        ? "Menyelesaikan e-commerce (Labverse, Labtek), portal korporat (AGS), dan DairyTrack berbasis Laravel, Django, React & Flutter."
        : "Shipped B2B/B2C e-commerce, corporate portals, and DairyTrack monitoring across Laravel, Django, React, and Flutter.",
    },
  ];

  const recruiterFacts = [
    {
      icon: LuBriefcase,
      label: isId ? "Jabatan Saat Ini (Okt 2025 – Sekarang)" : "Current Role (Oct 2025 – Present)",
      value: isId ? "IT Engineer · Divisi Riset & Pengembangan" : "IT Engineer · R&D Division",
    },
    {
      icon: LuCode,
      label: isId ? "Cakupan Rekayasa" : "Engineering Scope",
      value: "Backend, Fullstack Web, Desktop & AI",
    },
    {
      icon: LuMapPin,
      label: isId ? "Preferensi Kerja" : "Work Arrangement",
      value: "Onsite · Hybrid · Remote",
    },
    {
      icon: LuCircleCheck,
      label: isId ? "Status Karier" : "Career Status",
      value: isId ? "Terbuka untuk Peluang Strategis" : "Open to New Career Opportunities",
    },
  ];

  return (
    <section id="about" className="space-y-8 sm:space-y-10 w-full min-w-0">
      {/* Section Header */}
      <div className="reveal text-center space-y-3">
        <p className="theme-cyan-text text-xs font-mono-code font-semibold tracking-widest uppercase">
          {isId ? "Profil & Nilai Tambah" : "About & Value Proposition"}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold theme-heading">
          {isId
            ? "Mengapa Tim Anda Akan Nyaman Bekerja Bersama Saya"
            : "How I Bring Immediate Value to Your Team"}
        </h2>
        <div className="section-divider" />
      </div>

      {/* Bento Row 1: Story + Recruiter Fact Sheet */}
      <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Left: Personal Narrative */}
        <div className="lg:col-span-7 min-w-0 bento-card rounded-3xl p-5 sm:p-9 space-y-4 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold theme-cyan-text">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
            {isId ? "Tentang Christian Jhon" : "About Christian Jhon"}
          </div>

          <h3 className="text-lg sm:text-2xl font-bold theme-heading leading-snug">
            {isId
              ? "Engineer yang fokus menyelesaikan masalah nyata dari arsitektur backend hingga kenyamanan pengguna akhir."
              : "An ownership-driven engineer focused on shipping complete, reliable products from database schema to user interface."}
          </h3>

          <p className="theme-body text-sm sm:text-base leading-relaxed">
            {isId
              ? "Saya Christian Jhon Pranata Panjaitan, seorang IT Engineer di Divisi Riset dan Pengembangan (sejak Oktober 2025) sekaligus Fullstack Developer yang terbiasa memegang tanggung jawab penuh atas siklus rekayasa perangkat lunak. Saya tidak hanya menulis kode fitur, tetapi meriset dan merancang bagaimana sebuah sistem mudah dioperasikan pengguna, aman dalam mengelola data, serta mudah dikembangkan secara berkelanjutan."
              : "I'm Christian Jhon Pranata Panjaitan, an IT Engineer in Research & Development (since October 2025) and Fullstack Software Developer accustomed to owning the complete software lifecycle. Beyond shipping features, I research and architect systems that are intuitive for operators, reliable with data, and clean for engineering teams to scale."}
          </p>

          <p className="theme-muted text-sm leading-relaxed">
            {isId
              ? "Tidak hanya di sisi kode, saya juga berpengalaman terjun langsung dalam instalasi dan integrasi sistem di lapangan — termasuk instalasi Paperless Conference System & Video Wall di UPN Surabaya (dengan SnapStream terinstal di Video Wall) serta integrasi FaceLog pada perangkat IFP (Interactive Flat Panel)."
              : "Beyond writing code, I have hands-on field integration experience — including installing Paperless Conference & Video Wall infrastructure at UPN Surabaya (running SnapStream live on the Video Wall) and deploying FaceLog directly onto Interactive Flat Panel (IFP) hardware."}
          </p>
        </div>

        {/* Right: Quick Recruiter Fact Sheet */}
        <div className="lg:col-span-5 min-w-0 bento-card rounded-3xl p-5 sm:p-8 flex flex-col justify-between space-y-5">
          <div>
            <p className="text-xs font-mono-code uppercase tracking-wider theme-cyan-text font-semibold">
              {isId ? "Ringkasan Cepat HRD" : "Recruiter Quick Snapshot"}
            </p>
            <h3 className="text-lg font-bold theme-heading mt-1">
              {isId ? "Kesiapan Profesional" : "Role & Work Readiness"}
            </h3>
          </div>

          <div className="space-y-3">
            {recruiterFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.label}
                  className="p-3.5 rounded-2xl surface-subtle flex items-start sm:items-center gap-3.5 min-w-0"
                >
                  <div className="w-9 h-9 rounded-xl accent-soft flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] theme-muted font-medium leading-snug">{fact.label}</p>
                    <p className="text-xs sm:text-sm font-bold theme-heading leading-snug break-words mt-0.5">
                      {fact.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bento Row 2: 4 Core Capability Pillars */}
      <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bento-card bento-card-interactive rounded-2xl p-5 sm:p-6 space-y-3.5 flex flex-col min-w-0"
            >
              <div className="w-11 h-11 rounded-xl accent-soft flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold theme-heading text-base leading-snug">{item.title}</h3>
              <p className="theme-muted text-xs sm:text-sm leading-relaxed flex-1">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
