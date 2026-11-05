"use client";

import { useState } from "react";
import {
  LuServer,
  LuLayoutGrid,
  LuCpu,
  LuMonitor,
  LuDatabase,
  LuSparkles,
} from "react-icons/lu";
import SKILL_CATEGORIES from "@/data/skills";
import TechIcon from "@/components/ui/TechIcon";
import { useAppPreferences } from "@/context/AppPreferencesContext";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  backend: LuServer,
  frontend: LuLayoutGrid,
  ai: LuCpu,
  "desktop-realtime": LuMonitor,
  "mobile-db": LuDatabase,
};

export default function SkillsSection() {
  const { locale } = useAppPreferences();
  const [selectedId, setSelectedId] = useState<string>("all");
  const isId = locale === "id";

  const visibleCategories =
    selectedId === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedId);

  return (
    <section id="skills" className="space-y-10">
      {/* Header */}
      <div className="reveal text-center space-y-3">
        <p className="theme-cyan-text text-xs font-mono-code font-semibold tracking-widest uppercase">
          {isId ? "Ekosistem Teknologi" : "Technical Ecosystem"}
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold theme-heading">
          {isId ? (
            <>
              Keahlian Teknis yang{" "}
              <span className="gradient-text-cyan">Terbukti di Proyek Nyata</span>
            </>
          ) : (
            <>
              Production-Tested <span className="gradient-text-cyan">Engineering Toolkit</span>
            </>
          )}
        </h2>
        <p className="theme-muted text-sm max-w-2xl mx-auto">
          {isId
            ? "Setiap teknologi di bawah ini telah diimplementasikan langsung ke dalam sistem yang berjalan — bukan sekadar daftar teori."
            : "Every technology below is backed by real shipped modules — giving engineering teams confidence from day one."}
        </p>
        <div className="section-divider" />
      </div>

      {/* Filter Pills */}
      <div className="reveal flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setSelectedId("all")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            selectedId === "all"
              ? "btn-primary"
              : "surface-pill theme-muted hover:theme-heading"
          }`}
        >
          <LuSparkles className="w-3.5 h-3.5" />
          <span>{isId ? "Semua Domain" : "All Domains"}</span>
        </button>

        {SKILL_CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.id] ?? LuServer;
          const active = selectedId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedId(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                active ? "btn-primary" : "surface-pill theme-muted hover:theme-heading"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label[locale]}</span>
            </button>
          );
        })}
      </div>

      {/* Category Bento Cards */}
      <div className="reveal">
        <div
          className={`grid gap-5 ${
            visibleCategories.length === 1 ? "grid-cols-1 max-w-4xl mx-auto" : "lg:grid-cols-2"
          }`}
        >
        {visibleCategories.map((cat, idx) => {
          const Icon = CATEGORY_ICONS[cat.id] ?? LuServer;
          const isWide =
            visibleCategories.length > 1 &&
            idx === visibleCategories.length - 1 &&
            visibleCategories.length % 2 === 1;

          return (
            <div
              key={cat.id}
              className={`bento-card rounded-3xl p-6 sm:p-7 space-y-5 ${
                isWide ? "lg:col-span-2" : ""
              }`}
            >
              {/* Category Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/12 border border-cyan-500/25 flex items-center justify-center theme-cyan-text flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold theme-heading">{cat.label[locale]}</h3>
                    <p className="text-xs theme-muted leading-relaxed mt-0.5">
                      {cat.description[locale]}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono-code theme-cyan-text px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex-shrink-0">
                  {cat.skills.length} Tech
                </span>
              </div>

              {/* Skills Grid Inside Category */}
              <div
                className={`grid gap-3 ${
                  isWide ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
                }`}
              >
                {cat.skills.map((skill) => {
                  const isCore =
                    skill.tier.en === "Core Stack" || skill.tier.id === "Stack Utama";
                  return (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-2xl surface-subtle hover:border-cyan-500/35 transition-all flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg surface-pill flex items-center justify-center flex-shrink-0">
                            <TechIcon name={skill.name} className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold theme-heading truncate">
                            {skill.name}
                          </span>
                        </div>

                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                            isCore
                              ? "bg-emerald-500/12 theme-emerald-text border border-emerald-500/25"
                              : "bg-cyan-500/10 theme-cyan-text border border-cyan-500/20"
                          }`}
                        >
                          {skill.tier[locale]}
                        </span>
                      </div>

                      <p className="text-[11px] theme-muted truncate">
                        <span className="theme-faint">
                          {isId ? "Digunakan:" : "Proven in:"}
                        </span>{" "}
                        {skill.usedIn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
