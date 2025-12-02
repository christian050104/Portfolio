import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center text-center py-16 space-y-6"
    >
      {/* Profile Photo */}
      <div className="relative w-40 h-40">
        <Image
          src="/jhon.jpg"
          alt="Christian Jhon Pranata Panjaitan"
          fill
          className="rounded-full object-cover shadow-xl border-4 border-emerald-500/40"
        />
      </div>

      {/* Name */}
      <h1 className="text-3xl font-bold text-white">
        Christian Jhon Pranata Panjaitan
      </h1>

      {/* Role */}
      <p className="text-emerald-300 text-lg">
        Fullstack Developer • Mobile Developer • Desktop Developer
      </p>

      {/* Short Bio */}
      <p className="max-w-2xl text-slate-300 leading-relaxed px-4">
        I build modern, scalable applications across Web, Mobile, and Desktop.
        Experienced with Laravel, Django, Express, React, Flutter, Electron,
        WebRTC, Machine Learning, and Cloud Architecture.
      </p>

      {/* Social Icons */}
      <div className="flex gap-4 pt-2">
        {/* GitHub */}
        <a
          href="https://github.com/christian050104"
          target="_blank"
          className="p-3 rounded-full bg-slate-800 border border-slate-700 hover:border-emerald-400 
          hover:text-emerald-300 transition shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.6 1.8 2.8 2.6.7-.7.9-1.2.9-1.2-2.6-.3-5.4-1.3-5.4-6 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 1.1.9-.3 1.9-.5 3-.5s2.1.2 3 .5c2.1-1.4 3-1.1 3-1.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.7 1.1 2.9 0 4.7-2.8 5.7-5.4 6 0 .5.2 1 .9 1.2 2.2-.8 2.8-2.5 2.8-2.6 0 0 .6-1.1 1.7-1.2 0 0 1.1 0 .1.7 0 0-.7.4-1.2 1.6 0 0-.7 2.2-3.9 1.5v2c0 .3.2.7.8.6A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/christian-jhon-pranata-panjaitan-513364267/"
          target="_blank"
          className="p-3 rounded-full bg-slate-800 border border-slate-700 hover:border-emerald-400 
          hover:text-emerald-300 transition shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-.9 1.9-2.2 4-2.2 4.3 0 5.1 2.8 5.1 6.5V24h-4v-8.3c0-2-.1-4.7-2.8-4.7-2.8 0-3.2 2.1-3.2 4.6V24h-4V8z" />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/pranata_ex21/"
          target="_blank"
          className="p-3 rounded-full bg-slate-800 border border-slate-700 hover:border-emerald-400 
          hover:text-emerald-300 transition shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 2 .2 2.5.4a4.9 4.9 0 0 1 1.8 1.1 4.9 4.9 0 0 1 1.1 1.8c.2.5.3 1.3.4 2.5.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 2-.4 2.5a4.9 4.9 0 0 1-1.1 1.8 4.9 4.9 0 0 1-1.8 1.1c-.5.2-1.3.3-2.5.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-2-.2-2.5-.4a4.9 4.9 0 0 1-1.8-1.1 4.9 4.9 0 0 1-1.1-1.8c-.2-.5-.3-1.3-.4-2.5C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-2 .4-2.5a4.9 4.9 0 0 1 1.1-1.8A4.9 4.9 0 0 1 5.6 1c.5-.2 1.3-.3 2.5-.4C9.3.5 9.8.5 12 .5zm0 2.2c-3.1 0-3.4 0-4.6.1-1 .1-1.5.2-1.8.3-.5.2-.8.4-1.2.8-.4.4-.7.7-.8 1.2-.1.3-.2.8-.3 1.8-.1 1.2-.1 1.5-.1 4.6s0 3.4.1 4.6c.1 1 .2 1.5.3 1.8.2.5.4.8.8 1.2.4.4.7.7 1.2.8.3.1.8.2 1.8.3 1.2.1 1.5.1 4.6.1s3.4 0 4.6-.1c1-.1 1.5-.2 1.8-.3.5-.2.8-.4 1.2-.8.4-.4.7-.7.8-1.2.1-.3.2-.8.3-1.8.1-1.2.1-1.5.1-4.6s0-3.4-.1-4.6c-.1-1-.2-1.5-.3-1.8-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.7-1.2-.8-.3-.1-.8-.2-1.8-.3-1.2-.1-1.5-.1-4.6-.1zm0 4.3A5.3 5.3 0 1 1 6.7 12 5.3 5.3 0 0 1 12 8.7zm0 8.7a3.3 3.3 0 1 0-3.3-3.3A3.3 3.3 0 0 0 12 17.4zm5-9.9a1.2 1.2 0 1 1-1.2-1.2A1.2 1.2 0 0 1 17 7.5z" />
          </svg>
        </a>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <a
          href="#projects"
          className="px-5 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition"
        >
          View My Projects
        </a>

        <a
          href="mailto:christian050104@gmail.com"
          className="px-5 py-2 rounded-md border border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-black transition"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}
