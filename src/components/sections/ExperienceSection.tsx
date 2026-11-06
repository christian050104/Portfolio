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
  { dot: string; iconBox: string; badge: string; showPing?: boolean }
> = {
  cyan: {
    dot: "bg-[var(--accent-cyan)]",
    iconBox: "accent-soft",
    badge: "accent-soft",
    showPing: true,
  },
  violet: {
    dot: "bg-slate-400 dark:bg-slate-500",
    iconBox: "surface-subtle theme-heading",
    badge: "surface-subtle theme-muted",
    showPing: false,
  },
};

export default function ExperienceSection() {
  const { locale } = useAppPreferences();
  const isId = locale === "id";

  return (
    <section id="experience" className="space-y-8 sm:space-y-10 w-full min-w-0">
      {/* Header */}
      <div className="reveal text-center space-y-3">
        <p className="theme-cyan-text text-xs font-mono-code font-semibold tracking-widest uppercase">
          {isId ? "Perjalanan Karier" : "Career & Engineering Journey"}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold theme-heading">
          {isId
            ? "Pengalaman Kerja & Rekam Jejak Profesional"
            : "Professional Work Experience"}
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
        {/* Clean Subtle Vertical Guide Line */}
        <div className="absolute left-6 top-4 bottom-4 w-px bg-[var(--border-strong)] hidden md:block" />

        <div className="space-y-5 sm:space-y-6">
          {experience.map((exp) => {
            const Icon = ICON_MAP[exp.iconKey];
            const styles = ACCENT_STYLES[exp.accent];

            return (
              <div key={exp.id} className="reveal relative md:pl-16 min-w-0">
                {/* Timeline Node */}
                <div className="absolute left-6 top-8 -translate-x-1/2 hidden md:flex items-center justify-center">
                  <span className={`w-3 h-3 rounded-full ${styles.dot} z-10`} />
                  {styles.showPing && (
                    <span
                      className={`absolute w-6 h-6 rounded-full ${styles.dot} opacity-20 animate-ping-slow`}
                    />
                  )}
                </div>

                {/* Card */}
                <div className="bento-card bento-card-interactive rounded-3xl p-5 sm:p-8 space-y-5 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3.5 sm:gap-4 min-w-0">
                    <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${styles.iconBox}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <span
                          className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full ${styles.badge}`}
                        >
                          {exp.badge[locale]}
                        </span>
                        <h3 className="text-lg sm:text-2xl font-extrabold theme-heading leading-snug break-words">
                          {exp.role[locale]}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium theme-muted break-words">
                          {exp.organization[locale]}
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-mono-code theme-muted px-3 py-1.5 rounded-xl surface-subtle self-start sm:whitespace-nowrap">
                      <LuCalendar className="w-3.5 h-3.5 theme-cyan-text flex-shrink-0" />
                      <span>{exp.period[locale]}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm theme-body leading-relaxed break-words">
                    {exp.summary[locale]}
                  </p>

                  {/* Contributions */}
                  <ul className="space-y-2">
                    {exp.points[locale].map((pt, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm theme-body"
                      >
                        <LuCircleCheck className="w-4 h-4 theme-cyan-text flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed break-words">{pt}</span>
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
                        <TechIcon name={t} className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{t}</span>
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
