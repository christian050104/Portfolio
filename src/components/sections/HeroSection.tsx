"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const ROLES = [
  "Fullstack Developer",
  "AI & ML Engineer",
  "Desktop Developer",
  "Mobile Developer",
  "Problem Solver",
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typing effect
  useEffect(() => {
    const current = ROLES[roleIdx];
    const speed = isDeleting ? 40 : 80;

    typingRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIdx((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [displayed, isDeleting, roleIdx]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Background Gradient Blobs */}
      <div className="absolute inset-0 -z-20 pointer-events-none">
        <div
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            animation: "floatSlow 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
            animation: "floatSlow 12s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
            animation: "floatSlow 8s ease-in-out infinite 2s",
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 pt-24">
        
        {/* Open to Work Badge */}
        <div
          className={`transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for new opportunities
          </div>
        </div>

        {/* Profile Photo */}
        <div
          className={`relative transition-all duration-1000 delay-100 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          {/* Rotating Ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, #06b6d4, #8b5cf6, #10b981, #06b6d4)",
              padding: "3px",
              borderRadius: "9999px",
              animation: "rotate360 6s linear infinite",
            }}
          >
            <div className="w-full h-full rounded-full bg-[#050810]" />
          </div>

          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 blur-2xl opacity-30 scale-110" />

          {/* Photo */}
          <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-white/10">
            <Image
              src="/jhon.jpeg"
              alt="Christian Jhon Pranata Panjaitan"
              fill
              sizes="(max-width: 768px) 176px, 208px"
              className="object-cover object-[center_15%]"
              priority
            />
          </div>
        </div>

        {/* Name & Role */}
        <div
          className={`space-y-4 transition-all duration-1000 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
            Christian Jhon
            <br />
            <span className="shimmer-text">Pranata Panjaitan</span>
          </h1>

          {/* Typing Role */}
          <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-semibold text-slate-300 h-8">
            <span className="text-cyan-400">&lt;</span>
            <span className="gradient-text-cyan min-w-[240px] text-left">
              {displayed}
              <span className="animate-blink text-cyan-400 ml-0.5">|</span>
            </span>
            <span className="text-cyan-400">/&gt;</span>
          </div>
        </div>

        {/* Bio */}
        <p
          className={`max-w-2xl text-slate-400 text-base md:text-lg leading-relaxed transition-all duration-1000 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Building{" "}
          <span className="text-cyan-300 font-semibold">intelligent systems</span> — from face recognition AI to
          live streaming platforms and cross-platform desktop apps. 3+ years crafting production-grade software.
        </p>

        {/* Tech Pills */}
        <div
          className={`flex flex-wrap justify-center gap-2 max-w-xl transition-all duration-1000 delay-400 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {["🤖 AI & Face Recognition", "🌐 Fullstack Web", "🖥️ Desktop (Electron)", "📱 Mobile (Flutter)"].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-slate-800/70 border border-slate-700/60 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-all duration-300 cursor-default"
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* Social + CTA */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Social Icons */}
          <div className="flex gap-3">
            {[
              {
                href: "https://github.com/christian050104",
                icon: <FaGithub className="w-5 h-5" />,
                label: "GitHub",
                hover: "hover:border-slate-400 hover:text-white hover:shadow-slate-500/20",
              },
              {
                href: "https://www.linkedin.com/in/christian-jhon-pranata-panjaitan-513364267/",
                icon: <FaLinkedin className="w-5 h-5" />,
                label: "LinkedIn",
                hover: "hover:border-blue-400 hover:text-blue-300 hover:shadow-blue-500/20",
              },
              {
                href: "https://www.instagram.com/pranata_ex21/",
                icon: <FaInstagram className="w-5 h-5" />,
                label: "Instagram",
                hover: "hover:border-pink-400 hover:text-pink-300 hover:shadow-pink-500/20",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg ${s.hover}`}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <a
              href="#featured"
              className="btn-primary px-6 py-3 text-sm font-semibold flex items-center gap-2"
            >
              View My Work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#contact"
              className="btn-outline px-6 py-3 text-sm font-semibold"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <a href="#about" className="flex flex-col items-center gap-2 group">
          <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-slate-700 flex items-start justify-center p-1 group-hover:border-cyan-500/40 transition-colors">
            <div
              className="w-1 h-1.5 rounded-full bg-cyan-400"
              style={{ animation: "float 1.5s ease-in-out infinite" }}
            />
          </div>
        </a>
      </div>
    </section>
  );
}