"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col items-center text-center pt-32 pb-20 px-4 space-y-8 overflow-hidden min-h-screen justify-center"
    >
      {/* Animated Background Gradient Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Profile Photo with Animated Glow */}
      <div
        className={`relative w-48 h-48 transition-all duration-1000 ${
          mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-full blur-2xl opacity-60 animate-pulse"></div>
        <div className="relative w-full h-full">
          <Image
            src="/jhon.jpg"
            alt="Christian Jhon Pranata Panjaitan"
            fill
            className="rounded-full object-cover shadow-2xl border-4 border-emerald-500/40 relative z-10"
            priority
          />
        </div>
      </div>

      {/* Name with Staggered Animation */}
      <div
        className={`space-y-3 transition-all duration-1000 delay-200 ${
          mounted ?  "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Christian Jhon Pranata Panjaitan
        </h1>

        {/* Animated Role Badges */}
        <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base">
          <span className="px-5 py-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/40 rounded-full text-emerald-300 font-medium hover:scale-110 transition-transform duration-300 cursor-default">
            💻 Fullstack Developer
          </span>
          <span className="px-5 py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/40 rounded-full text-blue-300 font-medium hover:scale-110 transition-transform duration-300 cursor-default">
            📱 Mobile Developer
          </span>
          <span className="px-5 py-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/40 rounded-full text-purple-300 font-medium hover:scale-110 transition-transform duration-300 cursor-default">
            🖥️ Desktop Developer
          </span>
        </div>
      </div>

      {/* Bio with Better Typography */}
      <p
        className={`max-w-3xl text-slate-300 text-base md:text-lg leading-relaxed transition-all duration-1000 delay-400 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        Building modern, scalable applications across{" "}
        <span className="text-emerald-400 font-semibold">Web</span>,{" "}
        <span className="text-blue-400 font-semibold">Mobile</span>, and{" "}
        <span className="text-purple-400 font-semibold">Desktop</span>. 
        <br className="hidden md:block" />
        Experienced with{" "}
        <span className="font-semibold text-white">
          Laravel • Django • Express • React • Flutter • Electron
        </span>
        , WebRTC, Machine Learning, and Cloud Architecture.
      </p>

      {/* Social Icons - MENGGUNAKAN REACT ICONS */}
      <div
        className={`flex gap-4 transition-all duration-1000 delay-600 ${
          mounted ?  "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* GitHub */}
        <a
          href="https://github.com/christian050104"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
          aria-label="GitHub"
        >
          <FaGithub className="w-7 h-7 text-slate-300 group-hover:text-emerald-300 transition-colors" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/christian-jhon-pranata-panjaitan-513364267/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-7 h-7 text-slate-300 group-hover:text-blue-300 transition-colors" />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/pranata_ex21/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-pink-400 hover:shadow-xl hover:shadow-pink-500/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
          aria-label="Instagram"
        >
          <FaInstagram className="w-7 h-7 text-slate-300 group-hover:text-pink-300 transition-colors" />
        </a>
      </div>

      {/* CTA Buttons */}
      <div
        className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-1000 delay-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <a
          href="#projects"
          className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-lg shadow-lg shadow-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/60 transition-all duration-300 hover:scale-105 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            View My Projects
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </a>

        <a
          href="#contact"
          className="group relative px-8 py-4 rounded-xl border-2 border-emerald-400/50 text-emerald-300 hover:bg-emerald-400 hover:text-slate-950 hover:border-emerald-400 font-semibold text-lg transition-all duration-300 hover:scale-105"
        >
          <span className="flex items-center gap-2">
            Contact Me
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002. 22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
        </a>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-emerald-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}