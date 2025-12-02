"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { useState } from "react";

const skillCategories = {
  Backend: {
    icon: "⚙️",
    color: "from-emerald-500 to-teal-500",
    skills: ["Laravel", "Django", "Express.js", "REST API"],
  },
  Frontend: {
    icon: "🎨",
    color: "from-blue-500 to-cyan-500",
    skills: ["React. js", "Next.js", "Tailwind CSS"],
  },
  Mobile: {
    icon: "📱",
    color: "from-purple-500 to-pink-500",
    skills: ["Flutter", "Cross-Platform Development"],
  },
  Desktop: {
    icon: "🖥️",
    color: "from-indigo-500 to-purple-500",
    skills: ["Electron", "Desktop Apps"],
  },
  Database: {
    icon: "💾",
    color: "from-orange-500 to-red-500",
    skills: ["PostgreSQL", "MySQL"],
  },
  "Real-time": {
    icon: "⚡",
    color: "from-yellow-500 to-orange-500",
    skills: ["Socket.IO", "WebRTC"],
  },
  "AI/ML": {
    icon: "🤖",
    color: "from-green-500 to-emerald-500",
    skills: ["CNN (Deep Learning)", "Python", "TensorFlow"],
  },
  Tools: {
    icon: "🛠️",
    color: "from-slate-500 to-gray-500",
    skills: ["Git & GitHub", "Docker", "CI/CD"],
  },
};

export default function SkillsSection() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="space-y-10">
      <SectionTitle title="Skills & Technologies" subtitle="What I work with" />

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(skillCategories). map(([category, data], idx) => (
          <div
            key={category}
            className="group relative glass-effect rounded-2xl p-6 
            hover:bg-gradient-to-br hover:from-slate-800/60 hover:to-slate-900/60 
            hover:border-emerald-500/40 transition-all duration-300 hover:scale-105
            cursor-pointer overflow-hidden"
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {/* Animated Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

            {/* Content */}
            <div className="relative z-10 space-y-4">
              {/* Icon & Title */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${data.color} 
                flex items-center justify-center text-2xl shadow-lg
                group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                  {data.icon}
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                  {category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-2">
                {data.skills.map((skill, skillIdx) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 text-sm text-slate-300 
                    group-hover:text-white transition-all duration-300"
                    style={{ transitionDelay: `${skillIdx * 50}ms` }}
                  >
                    <div className={`w-1. 5 h-1.5 rounded-full bg-gradient-to-r ${data.color}`}></div>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-emerald-500/30 transition-all duration-300"></div>
          </div>
        ))}
      </div>

      {/* All Skills as Animated Tags */}
      <div className="glass-effect rounded-2xl p-8 bg-gradient-to-br from-slate-900/40 to-slate-800/40">
        <h3 className="text-xl font-semibold mb-6 text-emerald-400 flex items-center gap-2">
          <span className="text-2xl">✨</span>
          Complete Tech Stack
        </h3>
        <div className="flex flex-wrap gap-3">
          {Object.values(skillCategories).flatMap(cat => cat.skills).map((skill, idx) => (
            <span
              key={skill}
              className="px-4 py-2 bg-slate-800/60 border border-slate-700/50 rounded-lg 
              text-sm text-slate-200 hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-blue-500/20 
              hover:border-emerald-500/50 hover:text-white hover:scale-110 
              transition-all duration-300 cursor-default shadow-sm hover:shadow-lg"
              style={{ animationDelay: `${idx * 0.03}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Proficiency Indicators */}
      <div className="glass-effect rounded-2xl p-8">
        <h3 className="text-xl font-semibold mb-6 text-blue-400 flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Core Competencies
        </h3>
        <div className="space-y-4">
          {[
            { name: "Fullstack Development", level: 95 },
            { name: "Backend Development", level: 90 },
            { name: "Frontend Development", level: 85 },
            { name: "Mobile Development", level: 80 },
            { name: "Desktop Development", level: 75 },
            { name: "Machine Learning", level: 70 },
          ].map((skill, idx) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300 font-medium">{skill.name}</span>
                <span className="text-emerald-400 font-semibold">{skill.level}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${skill.level}%`,
                    transitionDelay: `${idx * 0.1}s` 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}