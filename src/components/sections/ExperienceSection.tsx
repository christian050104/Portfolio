"use client";

import experience from "@/data/experience";

const iconColors: Record<string, string> = {
  "🤖": "from-violet-500 to-purple-600",
  "🎓": "from-cyan-500 to-blue-600",
  "📡": "from-emerald-500 to-teal-600",
  "💼": "from-slate-500 to-slate-600",
};

const lineColors: Record<string, string> = {
  "🤖": "bg-violet-500",
  "🎓": "bg-cyan-500",
  "📡": "bg-emerald-500",
  "💼": "bg-slate-500",
};

const borderColors: Record<string, string> = {
  "🤖": "border-violet-500/25 hover:border-violet-500/50",
  "🎓": "border-cyan-500/25 hover:border-cyan-500/50",
  "📡": "border-emerald-500/25 hover:border-emerald-500/50",
  "💼": "border-slate-600/25 hover:border-slate-500/50",
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="space-y-14">
      {/* Header */}
      <div className="reveal text-center space-y-3">
        <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Journey</p>
        <h2 className="text-3xl md:text-5xl font-black text-white">
          My <span className="gradient-text-cyan">Experience</span>
        </h2>
        <div className="section-divider" />
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-cyan-500 via-emerald-500 to-slate-600 hidden md:block opacity-40" />

        <div className="space-y-6">
          {experience.map((exp, idx) => {
            const iconGrad = iconColors[exp.icon] || "from-slate-500 to-slate-600";
            const dotColor = lineColors[exp.icon] || "bg-slate-500";
            const borderStyle = borderColors[exp.icon] || "border-slate-600/25";
            const isFeatured = exp.type === "project";

            return (
              <div
                key={exp.company}
                className="reveal relative md:pl-24"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-8 top-8 -translate-x-1/2 hidden md:flex items-center justify-center">
                  <div className={`w-4 h-4 rounded-full ${dotColor} shadow-lg z-10`} />
                  <div className={`absolute w-8 h-8 rounded-full ${dotColor} opacity-20 animate-ping-slow`} />
                </div>

                {/* Card */}
                <div
                  className={`glass-card rounded-2xl p-6 md:p-8 border ${borderStyle} transition-all duration-300 ${
                    isFeatured ? "ring-1 ring-white/5" : ""
                  }`}
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconGrad} flex items-center justify-center text-xl shadow-lg flex-shrink-0`}
                      >
                        {exp.icon}
                      </div>
                      <div>
                        {isFeatured && (
                          <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 mb-1">
                            Flagship Project
                          </span>
                        )}
                        <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                          {exp.role}
                        </h3>
                        <p className="text-slate-400 text-sm mt-0.5 flex items-center gap-1.5">
                          <span>🏢</span> {exp.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/60 border border-slate-700/50 px-3 py-1.5 rounded-lg self-start md:self-auto whitespace-nowrap">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {exp.period}
                    </div>
                  </div>

                  {/* Points */}
                  <ul className="space-y-2.5">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                        <span
                          className={`mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br ${iconGrad} flex items-center justify-center text-white text-xs flex-shrink-0 shadow-sm`}
                        >
                          ✓
                        </span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}