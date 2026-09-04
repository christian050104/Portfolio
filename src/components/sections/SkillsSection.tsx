"use client";

import { useState, useEffect, useRef } from "react";

type SkillCategory = {
  icon: string;
  gradient: string;
  border: string;
  skills: { name: string; level: number }[];
};

const skillCategories: Record<string, SkillCategory> = {
  Backend: {
    icon: "⚙️",
    gradient: "from-emerald-500 to-teal-500",
    border: "border-emerald-500/20",
    skills: [
      { name: "Laravel (PHP)", level: 90 },
      { name: "Django (Python)", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "REST API Design", level: 92 },
    ],
  },
  Frontend: {
    icon: "🎨",
    gradient: "from-cyan-500 to-blue-500",
    border: "border-cyan-500/20",
    skills: [
      { name: "React.js", level: 88 },
      { name: "Next.js", level: 82 },
      { name: "Tailwind CSS", level: 90 },
      { name: "TypeScript", level: 78 },
    ],
  },
  "AI / ML": {
    icon: "🤖",
    gradient: "from-violet-500 to-purple-600",
    border: "border-violet-500/20",
    skills: [
      { name: "Python", level: 88 },
      { name: "CNN / Deep Learning", level: 80 },
      { name: "Face Recognition", level: 82 },
      { name: "TensorFlow / OpenCV", level: 78 },
    ],
  },
  Desktop: {
    icon: "🖥️",
    gradient: "from-indigo-500 to-violet-500",
    border: "border-indigo-500/20",
    skills: [
      { name: "Electron.js", level: 85 },
      { name: "Cross-Platform Apps", level: 83 },
      { name: "WebRTC / RTMP", level: 78 },
      { name: "FFmpeg", level: 72 },
    ],
  },
  Mobile: {
    icon: "📱",
    gradient: "from-pink-500 to-rose-500",
    border: "border-pink-500/20",
    skills: [
      { name: "Flutter", level: 80 },
      { name: "Dart", level: 78 },
      { name: "iOS & Android", level: 75 },
    ],
  },
  "Real-time": {
    icon: "⚡",
    gradient: "from-yellow-500 to-orange-500",
    border: "border-yellow-500/20",
    skills: [
      { name: "Socket.IO", level: 85 },
      { name: "WebRTC", level: 78 },
      { name: "Live Streaming", level: 80 },
    ],
  },
};

function ProgressBar({ level, gradient }: { level: number; gradient: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => setWidth(level), 200);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="progress-bar">
      <div
        className={`progress-fill bg-gradient-to-r ${gradient}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default function SkillsSection() {
  const [active, setActive] = useState("Backend");
  const current = skillCategories[active];

  return (
    <section id="skills" className="space-y-14">
      {/* Header */}
      <div className="reveal text-center space-y-3">
        <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Technical Skills</p>
        <h2 className="text-3xl md:text-5xl font-black text-white">
          My <span className="gradient-text-cyan">Toolkit</span>
        </h2>
        <div className="section-divider" />
      </div>

      {/* Category Tabs */}
      <div className="reveal flex flex-wrap justify-center gap-2">
        {Object.entries(skillCategories).map(([cat, data]) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              active === cat
                ? `bg-gradient-to-r ${data.gradient} text-white shadow-lg scale-105`
                : "glass-card text-slate-400 hover:text-white"
            }`}
          >
            <span>{data.icon}</span>
            {cat}
          </button>
        ))}
      </div>

      {/* Active Category Detail */}
      <div className="reveal grid md:grid-cols-2 gap-8 items-center">
        {/* Skills Progress */}
        <div className={`glass-card rounded-2xl p-7 border ${current.border} space-y-5`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${current.gradient} flex items-center justify-center text-xl shadow-lg`}>
              {current.icon}
            </div>
            <h3 className="text-xl font-bold text-white">{active}</h3>
          </div>
          {current.skills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300 font-medium">{skill.name}</span>
                <span className={`font-bold bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent`}>
                  {skill.level}%
                </span>
              </div>
              <ProgressBar level={skill.level} gradient={current.gradient} />
            </div>
          ))}
        </div>

        {/* All Skills Grid */}
        <div className="glass-card rounded-2xl p-7 space-y-5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>✨</span> All Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.values(skillCategories)
              .flatMap((cat) => cat.skills.map((s) => s.name))
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/80 border border-slate-700/50 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Core Competency Summary */}
      <div className="reveal glass-card rounded-2xl p-8 space-y-6">
        <h3 className="text-lg font-bold text-white text-center flex items-center justify-center gap-2">
          <span>📊</span> Core Competencies
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { name: "Fullstack Development", level: 92, gradient: "from-cyan-500 to-blue-500" },
            { name: "Backend Engineering", level: 90, gradient: "from-emerald-500 to-teal-500" },
            { name: "AI & Face Recognition", level: 82, gradient: "from-violet-500 to-purple-600" },
            { name: "Desktop Development", level: 85, gradient: "from-indigo-500 to-violet-500" },
            { name: "Mobile (Flutter)", level: 80, gradient: "from-pink-500 to-rose-500" },
            { name: "Real-time Systems", level: 83, gradient: "from-yellow-500 to-orange-500" },
          ].map((s) => (
            <div key={s.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">{s.name}</span>
                <span className={`font-bold bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>
                  {s.level}%
                </span>
              </div>
              <ProgressBar level={s.level} gradient={s.gradient} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}