"use client";

import SectionTitle from "@/components/ui/SectionTitle";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Message sent!  (This is a demo - integrate with backend)");
    setTimeout(() => setStatus(""), 3000);
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      value: "christianjppanjaitan@gmail.com",
      link: "mailto:christianjppanjaitan@gmail.com",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "Connect with me",
      link: "https://www.linkedin.com/in/christian-jhon-pranata-panjaitan-513364267/",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "🐙",
      title: "GitHub",
      value: "@christian050104",
      link: "https://github.com/christian050104",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: "📸",
      title: "Instagram",
      value: "@pranata_ex21",
      link: "https://www.instagram.com/pranata_ex21/",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section id="contact" className="space-y-10 pb-20">
      <SectionTitle title="Get In Touch" subtitle="Let's work together" />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Contact Info */}
        <div className="space-y-6">
          {/* Intro */}
          <div className="glass-effect rounded-2xl p-8 space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">👋</span>
              Let&apos;s Connect! 
            </h3>
            <p className="text-slate-300 leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
              Feel free to reach out through any of the channels below! 
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactMethods. map((method, idx) => (
              <a
                key={method.title}
                href={method.link}
                target={method.link. startsWith("http") ? "_blank" : undefined}
                rel={method.link. startsWith("http") ? "noopener noreferrer" : undefined}
                className="group glass-effect rounded-xl p-6 hover:bg-gradient-to-br hover:from-slate-800/60 hover:to-slate-900/60 hover:border-emerald-500/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}
                  >
                    {method.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {method.title}
                    </h4>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors truncate">
                      {method. value}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Availability */}
          <div className="glass-effect rounded-2xl p-6 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 border-emerald-500/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <p className="font-semibold text-white">Available for Freelance</p>
                <p className="text-sm text-slate-400">Open to new opportunities and collaborations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="glass-effect rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">✉️</span>
            Send a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Your Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e. target.value })}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Your Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
              />
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Your Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target. value })}
                placeholder="Tell me about your project..."
                required
                rows={5}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 resize-none focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/60 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Send Message
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>

            {/* Status Message */}
            {status && (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400 text-sm text-center">
                {status}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-10 border-t border-slate-800">
        <p className="text-slate-400">
          Made with <span className="text-red-500">❤️</span> by{" "}
          <span className="text-emerald-400 font-semibold">Christian Jhon Pranata Panjaitan</span>
        </p>
        <p className="text-sm text-slate-500 mt-2">© 2025 All rights reserved</p>
      </div>
    </section>
  );
}