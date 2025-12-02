"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { icon: "💼", label: "Years Experience", value: "3+" },
    { icon: "🚀", label: "Projects Completed", value: "15+" },
    { icon: "⚡", label: "Technologies", value: "15+" },
    { icon: "🎯", label: "Success Rate", value: "100%" },
  ];

  const highlights = [
    {
      icon: "🎨",
      title: "Fullstack Development",
      description: "Building complete web applications from backend APIs to responsive frontends with modern frameworks.",
    },
    {
      icon: "📱",
      title: "Mobile Development",
      description: "Creating cross-platform mobile apps with Flutter for iOS and Android platforms.",
    },
    {
      icon: "🖥️",
      title: "Desktop Applications",
      description: "Developing desktop applications using Electron with real-time communication features.",
    },
    {
      icon: "🤖",
      title: "AI & Machine Learning",
      description: "Implementing CNN models for image classification and data analysis applications.",
    },
  ];

  return (
    <section id="about" className="space-y-10">
      <SectionTitle title="About Me" subtitle="Who I am" />

      {/* Intro Text */}
      <div className="glass-effect rounded-2xl p-8 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-2xl flex-shrink-0">
            👋
          </div>
          <div className="space-y-4">
            <p className="text-slate-200 text-lg leading-relaxed">
              My name is <span className="text-emerald-400 font-semibold">Christian Jhon Pranata Panjaitan</span>, 
              a passionate <span className="text-blue-400 font-semibold">Fullstack Developer</span> with expertise 
              in backend, frontend, mobile, and desktop development.
            </p>

            <p className="text-slate-300 leading-relaxed">
              I have built diverse systems ranging from <span className="text-white font-medium">e-commerce platforms</span>, 
              <span className="text-white font-medium"> company profile websites</span>, 
              <span className="text-white font-medium"> livestock health monitoring systems</span>, 
              <span className="text-white font-medium"> real-time communication apps</span>, 
              and <span className="text-white font-medium">machine learning applications</span>.
            </p>

            <p className="text-slate-300 leading-relaxed">
              I enjoy solving complex problems, writing clean and maintainable code, and building products 
              that genuinely help users achieve their goals.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className={`group relative glass-effect rounded-xl p-6 text-center 
            hover:bg-gradient-to-br hover:from-emerald-500/10 hover:to-blue-500/10 
            hover:border-emerald-500/30 transition-all duration-300 hover:scale-105
            ${mounted ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="text-4xl mb-2">{stat.icon}</div>
            <div className="text-3xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
              {stat.value}
            </div>
            <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
              {stat.label}
            </div>
            
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>

      {/* Highlights Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {highlights. map((item, idx) => (
          <div
            key={item.title}
            className={`group glass-effect rounded-2xl p-6 
            hover:bg-gradient-to-br hover:from-slate-800/60 hover:to-slate-900/60 
            hover:border-emerald-500/30 transition-all duration-300 hover:scale-[1.02]
            ${mounted ? "animate-slide-in-left" : "opacity-0"}`}
            style={{ animationDelay: `${idx * 0.15}s` }}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 
              flex items-center justify-center text-3xl flex-shrink-0 
              group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {item. icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="glass-effect rounded-2xl p-8 text-center bg-gradient-to-r from-emerald-500/5 to-blue-500/5 border-emerald-500/20">
        <p className="text-lg text-slate-300 mb-4">
          Interested in working together? Let's create something amazing! 
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 
          hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-xl
          shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/50
          transition-all duration-300 hover:scale-105"
        >
          Get In Touch
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </section>
  );
}