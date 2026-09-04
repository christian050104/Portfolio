"use client";

export default function ContactSection() {
  const contacts = [
    {
      icon: "📧",
      title: "Email",
      value: "christianjppanjaitan@gmail.com",
      link: "mailto:christianjppanjaitan@gmail.com",
      gradient: "from-emerald-500 to-teal-500",
      border: "border-emerald-500/25",
      desc: "Drop me an email anytime",
    },
    {
      icon: "💼",
      title: "LinkedIn",
      value: "christian-jhon-pranata-panjaitan",
      link: "https://www.linkedin.com/in/christian-jhon-pranata-panjaitan-513364267/",
      gradient: "from-blue-500 to-cyan-500",
      border: "border-blue-500/25",
      desc: "Let's connect professionally",
    },
    {
      icon: "🐙",
      title: "GitHub",
      value: "github.com/christian050104",
      link: "https://github.com/christian050104",
      gradient: "from-slate-500 to-slate-600",
      border: "border-slate-500/25",
      desc: "Check out my repositories",
    },
  ];

  return (
    <section id="contact" className="space-y-12 pb-20">
      {/* Header */}
      <div className="reveal text-center space-y-3">
        <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Contact</p>
        <h2 className="text-3xl md:text-5xl font-black text-white">
          Let&apos;s <span className="gradient-text-cyan">Connect</span>
        </h2>
        <p className="text-slate-400 max-w-md mx-auto text-sm">
          I&apos;m open to new opportunities. Reach out via email or check my work on GitHub.
        </p>
        <div className="section-divider" />
      </div>

      {/* Availability Badge */}
      <div className="reveal flex justify-center">
        <div className="flex items-center gap-3 px-6 py-3 rounded-full glass-card border border-emerald-500/25 bg-emerald-500/5">
          <div className="relative flex-shrink-0">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping-slow" />
          </div>
          <p className="text-sm font-semibold text-white">Open to new opportunities</p>
          <span className="text-slate-400 text-xs">· Full-time & Freelance</span>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="reveal flex flex-col sm:flex-row justify-center gap-5 max-w-2xl mx-auto">
        {contacts.map((c) => (
          <a
            key={c.title}
            href={c.link}
            target={c.link.startsWith("http") ? "_blank" : undefined}
            rel={c.link.startsWith("http") ? "noopener noreferrer" : undefined}
            className={`group flex-1 glass-card rounded-2xl p-7 border ${c.border} flex flex-col items-center text-center gap-4`}
          >
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              {c.icon}
            </div>
            <div className="space-y-1">
              <p className="font-bold text-white text-lg group-hover:text-cyan-300 transition-colors">
                {c.title}
              </p>
              <p className="text-xs text-slate-500">{c.desc}</p>
              <p className="text-sm text-slate-300 font-medium break-all">{c.value}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 group-hover:text-cyan-400 transition-colors mt-auto">
              <span>Open</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="reveal border-t border-slate-800 pt-8 text-center space-y-1.5">
        <p className="text-slate-400 text-sm">
          Crafted with <span className="text-red-400">❤️</span> by{" "}
          <span className="gradient-text-cyan font-semibold">Christian Jhon Pranata Panjaitan</span>
        </p>
        <p className="text-slate-600 text-xs">© 2025 · All rights reserved</p>
      </div>
    </section>
  );
}