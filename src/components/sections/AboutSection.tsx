"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const highlights = [
  {
    icon: "🤖",
    title: "AI & Face Recognition",
    description: "Built Facel — a real-time face recognition system for attendance & access control using deep learning.",
    gradient: "from-violet-500/20 to-purple-600/10",
    border: "border-violet-500/20",
    iconBg: "from-violet-500 to-purple-600",
  },
  {
    icon: "🎓",
    title: "EdTech Desktop Platform",
    description: "Developed EduSphere — a full-featured cross-platform learning app with offline support & real-time comms.",
    gradient: "from-cyan-500/20 to-blue-600/10",
    border: "border-cyan-500/20",
    iconBg: "from-cyan-500 to-blue-600",
  },
  {
    icon: "📡",
    title: "Live Streaming App",
    description: "Created SnapStream — a professional broadcasting & recording desktop app with RTMP & HLS support.",
    gradient: "from-emerald-500/20 to-teal-600/10",
    border: "border-emerald-500/20",
    iconBg: "from-emerald-500 to-teal-600",
  },
  {
    icon: "🌐",
    title: "Fullstack Web & Mobile",
    description: "Delivered e-commerce, company profiles, health monitoring, and mobile apps across multiple tech stacks.",
    gradient: "from-orange-500/20 to-amber-600/10",
    border: "border-orange-500/20",
    iconBg: "from-orange-500 to-amber-600",
  },
];

const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 15, suffix: "+", label: "Projects Completed" },
  { value: 15, suffix: "+", label: "Technologies" },
  { value: 100, suffix: "%", label: "Commitment" },
];

export default function AboutSection() {
  return (
    <section id="about" className="space-y-14">
      {/* Section Header */}
      <div className="reveal text-center space-y-3">
        <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">About Me</p>
        <h2 className="text-3xl md:text-5xl font-black text-white">
          Who I <span className="gradient-text-cyan">Am</span>
        </h2>
        <div className="section-divider" />
      </div>

      {/* Intro Card */}
      <div className="reveal glass-card rounded-3xl p-8 md:p-10 space-y-5">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg shadow-cyan-500/25">
            👋
          </div>
          <div className="space-y-4">
            <p className="text-slate-100 text-lg leading-relaxed font-medium">
              I&apos;m{" "}
              <span className="gradient-text-cyan font-bold">Christian Jhon Pranata Panjaitan</span>, a
              passionate{" "}
              <span className="text-white font-bold">Fullstack Developer</span> who loves turning complex
              ideas into real, working software.
            </p>
            <p className="text-slate-400 leading-relaxed">
              From building a{" "}
              <span className="text-violet-300 font-semibold">Face Recognition AI system (Facel)</span> to
              crafting a cross-platform{" "}
              <span className="text-cyan-300 font-semibold">EdTech desktop app (EduSphere)</span> and a{" "}
              <span className="text-emerald-300 font-semibold">
                professional live streaming platform (SnapStream)
              </span>{" "}
              — I&apos;ve handled end-to-end development across Web, Mobile, Desktop, and AI.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I write clean, maintainable code and thrive on solving hard engineering challenges. Currently
              open to full-time roles and exciting collaborations.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="glass-card rounded-2xl p-6 text-center group"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="text-3xl md:text-4xl font-black gradient-text-cyan mb-1">
              <AnimatedCounter target={s.value} suffix={s.suffix} />
            </div>
            <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <div className="grid md:grid-cols-2 gap-5">
        {highlights.map((item, i) => (
          <div
            key={item.title}
            className={`reveal glass-card rounded-2xl p-6 border bg-gradient-to-br ${item.gradient} ${item.border}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center text-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-white text-base">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}