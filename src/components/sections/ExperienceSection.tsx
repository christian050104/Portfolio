"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import experience from "@/data/experience";

export default function ExperienceSection() {
  return (
    <section id="experience" className="space-y-10">
      <SectionTitle title="Experience" subtitle="Where I've worked" />

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 hidden md:block"></div>

        {/* Experience Items */}
        <div className="space-y-8">
          {experience.map((exp, idx) => (
            <div
              key={exp.company}
              className="relative group"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 top-8 w-4 h-4 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 border-4 border-slate-950 z-10 hidden md:block group-hover:scale-150 transition-transform duration-300"></div>

              {/* Card */}
              <div className="md:ml-20 glass-effect rounded-2xl p-6 md:p-8 
              hover:bg-gradient-to-br hover:from-slate-800/60 hover:to-slate-900/60 
              hover:border-emerald-500/40 transition-all duration-300 hover:scale-[1.02]
              hover:shadow-2xl hover:shadow-emerald-500/20">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-lg text-slate-400 flex items-center gap-2 mt-1">
                      <span className="text-emerald-400">🏢</span>
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {exp. period}
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-3">
                  {exp.points.map((point, pointIdx) => (
                    <li
                      key={pointIdx}
                      className="flex items-start gap-3 text-slate-300 group-hover:text-slate-200 transition-colors"
                    >
                      <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-700/50">
                  {["Laravel", "Django", "React", "Flutter", "Express", "Socket.IO", "CNN", "Python"]. map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-800/60 border border-slate-700/50 rounded-full text-xs text-slate-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Summary */}
      <div className="glass-effect rounded-2xl p-8 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 border-emerald-500/20">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold text-emerald-400 mb-2">15+</div>
            <div className="text-slate-400">Projects Delivered</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">8+</div>
            <div className="text-slate-400">Technologies Mastered</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
            <div className="text-slate-400">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}