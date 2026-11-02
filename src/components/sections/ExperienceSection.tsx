"use client";

import {
  LuCpu,
  LuBriefcase,
  LuCalendar,
  LuCircleCheck,
} from "react-icons/lu";
import experience, { type ExperienceItem } from "@/data/experience";
import TechIcon from "@/components/ui/TechIcon";
import { useAppPreferences } from "@/context/AppPreferencesContext";

const ICON_MAP: Record<
  ExperienceItem["iconKey"],
  React.ComponentType<{ className?: string }>
> = {
  rnd: LuCpu,
  freelance: LuBriefcase,
};

const ACCENT_STYLES: Record<
  ExperienceItem["accent"],
  { dot: string; iconBox: string; badge: string }
> = {
  cyan: {
    dot: "bg-cyan-500",
    iconBox: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    badge: "bg-emerald-500/12 theme-emerald-text border-emerald-500/25",
  },
  violet: {
    dot: "bg-violet-500",
    iconBox: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    badge: "bg-violet-500/12 theme-violet-text border-violet-500/25",
  },
};

export default function ExperienceSection() {
  const { locale } = useAppPreferences();
  const isId = locale === "id";

  return (
    <section id="experience" className="space-y-10">
      {/* Header */}
      <div className="reveal text-center space-y-3">
        <p className="theme-cyan-text text-xs font-mono-code font-semibold tracking-widest uppercase">
          {isId ? "Perjalanan Karier" : "Career & Engineering Journey"}
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold theme-heading">
          {isId ? (
            <>
              Pengalaman Kerja &{" "}
              <span className="gradient-text-cyan">Rekam Jejak Profesional</span>
            </>
          ) : (
            <>
              Professional <span className="gradient-text-cyan">Work Experience</span>
            </>
          )}
        </h2>
        <p className="theme-muted text-sm max-w-2xl mx-auto">
          {isId
            ? "Berperan aktif sebagai IT Engineer di Divisi Riset & Pengembangan (R&D) sejak Oktober 2025 setelah lebih dari 3 tahun membangun sistem fullstack."
            : "Serving as an IT Engineer in Research & Development (R&D) since October 2025, backed by 3+ years of end-to-end software delivery."}
        </p>
        <div className="section-divider" />
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Guide Line */}
        <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-cyan-500/60 via-indigo-500/50 to-violet-500/40 hidden md:block" />

        <div className="space-y-6">
          {experience.map((exp) => {
            const Icon = ICON_MAP[exp.iconKey];
            const styles = ACCENT_STYLES[exp.accent];

            return (
              <div key={exp.id} className="reveal relative md:pl-16">
                {/* Timeline Node */}
                <div className="absolute left-6 top-8 -translate-x-1/2 hidden md:flex items-center justify-center">
                  <span className={`w-3.5 h-3.5 rounded-full ${styles.dot} z-10`} />
                  <span
                    className={`absolute w-7 h-7 rounded-full ${styles.dot} opacity-20 animate-ping-slow`}
                  />
                </div>

                {/* Card */}
                <div className="bento-card bento-card-interactive rounded-3xl p-6 sm:p-8 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0 ${styles.iconBox}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span
                          className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${styles.badge}`}
                        >
                          {exp.badge[locale]}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold theme-heading leading-snug">
                          {exp.role[locale]}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold theme-cyan-text">
                          {exp.organization[locale]}
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-mono-code theme-muted px-3 py-1.5 rounded-xl surface-subtle self-start whitespace-nowrap">
                      <LuCalendar className="w-3.5 h-3.5 theme-cyan-text" />
                      <span>{exp.period[locale]}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm theme-body leading-relaxed">
                    {exp.summary[locale]}
                  </p>

                  {/* Contributions */}
                  <ul className="space-y-2">
                    {exp.points[locale].map((pt, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm theme-body"
                      >
                        <LuCircleCheck className="w-4 h-4 theme-emerald-text flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-subtle)]">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg surface-subtle text-xs font-medium theme-heading"
                      >
                        <TechIcon name={t} className="w-3.5 h-3.5" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
