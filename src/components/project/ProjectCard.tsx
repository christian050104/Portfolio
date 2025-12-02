"use client";

import ImageCarousel from "./ImageCarousel";

interface ProjectProps {
  name: string;
  role: string;
  description: string;
  images: string[];
  github: string;
  category?: string;
  delay?: number;
}

const techStackMap: { [key: string]: string[] } = {
  "Sistem Monitoring Kesehatan Sapi": ["Django", "React", "Flutter", "PostgreSQL"],
  "Labverse": ["Laravel", "MySQL", "Bootstrap"],
  "Labtek": ["Laravel", "MySQL", "Tailwind"],
  "Compro AGS": ["Laravel", "MySQL", "JavaScript"],
  "EduSnap": ["Express", "React", "Electron", "Socket.IO"],
  "SnapStream": ["Express", "Electron", "WebRTC"],
  "Klasifikasi Kotoran Ayam": ["Python", "Flask", "TensorFlow", "CNN"],
};

const categoryColors: { [key: string]: string } = {
  "Web": "from-emerald-500 to-teal-500",
  "Mobile": "from-purple-500 to-pink-500",
  "Desktop": "from-indigo-500 to-purple-500",
  "AI/ML": "from-orange-500 to-red-500",
};

const categoryIcons: { [key: string]: string } = {
  "Web": "🌐",
  "Mobile": "📱",
  "Desktop": "🖥️",
  "AI/ML": "🤖",
};

export default function ProjectCard({
  name,
  role,
  description,
  images,
  github,
  category = "Web",
  delay = 0,
}: ProjectProps) {
  const techStack = techStackMap[name] || [];

  return (
    <div
      className="group glass-effect rounded-2xl overflow-hidden 
      hover:bg-gradient-to-br hover:from-slate-800/60 hover:to-slate-900/60 
      hover:border-emerald-500/40 transition-all duration-300 hover:scale-[1.02]
      hover:shadow-2xl hover:shadow-emerald-500/20 flex flex-col"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Image Carousel */}
      <div className="relative">
        <ImageCarousel images={images} />
        
        {/* Category Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-lg 
        bg-gradient-to-r ${categoryColors[category]} 
        text-white text-xs font-semibold shadow-lg backdrop-blur-sm
        flex items-center gap-1. 5`}>
          <span>{categoryIcons[category]}</span>
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        {/* Title & Role */}
        <div className="space-y-2">
          <h3 className="font-bold text-xl text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-sm text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {role}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed flex-1 line-clamp-3">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700/50">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2. 5 py-1 bg-slate-800/60 border border-slate-700/50 rounded-md text-xs text-slate-400 
              group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 group-hover:text-emerald-400 
              transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* GitHub Link */}
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 
          bg-slate-800/60 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-emerald-500 
          border border-slate-700/50 hover:border-emerald-500 
          rounded-xl text-sm font-semibold text-slate-300 hover:text-white 
          transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 mt-auto"
        >
          <svg
            xmlns="http://www.w3. org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 . 5C5.65. 5. 5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-. 3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1. 2-1.6-1.2-1.6-1-. 7.1-.7.1-.7 1.1. 1 1.7 1. 2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.6-.3-5.4-1.3-5.4-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-. 3 3.3 1.2 1-. 3 2-. 4 3-. 4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.7-5.5 6 .4.4.8 1.1. 8 2.2v3.3c0 . 3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.65 18.35.5 12 .5z" />
          </svg>
          View on GitHub
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
}