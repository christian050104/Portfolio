import type { BilingualText } from "./projects";

export interface SkillEntry {
  name: string;
  tier: {
    id: string;
    en: string;
  };
  usedIn: string;
}

export interface SkillCategoryItem {
  id: string;
  label: BilingualText;
  description: BilingualText;
  accent: "emerald" | "cyan" | "violet" | "indigo" | "rose";
  skills: SkillEntry[];
}

export const SKILL_CATEGORIES: SkillCategoryItem[] = [
  {
    id: "backend",
    label: {
      id: "Backend & Arsitektur API",
      en: "Backend & API Architecture",
    },
    description: {
      id: "Membangun layanan server yang aman, terstruktur, dan siap menangani data relasional maupun komunikasi layanan.",
      en: "Designing structured, secure server architectures, relational schemas, and clean RESTful APIs.",
    },
    accent: "emerald",
    skills: [
      {
        name: "Laravel",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "Labverse, Labtek, Compro AGS",
      },
      {
        name: "Django",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "FaceLog AI, Monitoring Sapi",
      },
      {
        name: "Express.js",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "EduSphere, SnapStream",
      },
      {
        name: "Node.js",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "EduSphere, SnapStream",
      },
      {
        name: "Flask",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "Python ML & Micro-APIs",
      },
      {
        name: "REST API",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "Semua Proyek Fullstack",
      },
    ],
  },
  {
    id: "frontend",
    label: {
      id: "Frontend & Antarmuka Modern",
      en: "Frontend & Modern UI",
    },
    description: {
      id: "Merancang antarmuka responsif, cepat, dan nyaman digunakan dengan komponen modular dan tipografi bersih.",
      en: "Crafting responsive, accessible, high-clarity interfaces with component-driven architecture.",
    },
    accent: "cyan",
    skills: [
      {
        name: "React.js",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "FaceLog, EduSphere, Monitoring Sapi",
      },
      {
        name: "Next.js",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "Web Apps & Portfolio",
      },
      {
        name: "TypeScript",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "Modern React & Next.js",
      },
      {
        name: "Tailwind CSS",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "FaceLog, EduSphere, Labverse",
      },
      {
        name: "Bootstrap",
        tier: { id: "Mahir", en: "Proficient" },
        usedIn: "Labtek Enterprise UI",
      },
    ],
  },
  {
    id: "ai",
    label: {
      id: "AI & Computer Vision",
      en: "AI & Computer Vision",
    },
    description: {
      id: "Mengintegrasikan model deep learning dan pemrosesan citra ke dalam aplikasi nyata yang digunakan end-user.",
      en: "Integrating deep learning inference and real-time image processing directly into user-facing software.",
    },
    accent: "violet",
    skills: [
      {
        name: "Python",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "FaceLog, DairyTrack, AI Backend",
      },
      {
        name: "OpenCV",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "FaceLog Kiosk Scanner",
      },
      {
        name: "DeepFace / FaceNet",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "FaceLog Live Attendance",
      },
      {
        name: "TensorFlow",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "Deep Learning & Computer Vision",
      },
      {
        name: "CNN",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "Visual Feature Extraction",
      },
    ],
  },
  {
    id: "desktop-realtime",
    label: {
      id: "Desktop & Sistem Real-time",
      en: "Desktop & Real-time Media",
    },
    description: {
      id: "Pengembangan aplikasi desktop lintas OS, streaming audio/video rendah latensi, dan komunikasi dua arah.",
      en: "Cross-platform desktop engineering, low-latency media pipelines, and bi-directional event streaming.",
    },
    accent: "indigo",
    skills: [
      {
        name: "Electron",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "EduSphere, SnapStream",
      },
      {
        name: "Socket.IO",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "EduSphere, SnapStream",
      },
      {
        name: "WebRTC",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "EduSphere Video Conf, SnapStream",
      },
      {
        name: "FFmpeg",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "SnapStream Encoding & Recording",
      },
      {
        name: "RTMP",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "SnapStream Multi-Broadcast",
      },
    ],
  },
  {
    id: "mobile-db",
    label: {
      id: "Mobile, Database & Workflow",
      en: "Mobile, Databases & Tooling",
    },
    description: {
      id: "Aplikasi mobile lintas platform serta perancangan skema database relasional untuk online maupun offline.",
      en: "Cross-platform mobile apps and reliable relational data storage across cloud and offline environments.",
    },
    accent: "rose",
    skills: [
      {
        name: "Flutter",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "Monitoring Kesehatan Sapi",
      },
      {
        name: "Dart",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "Flutter Mobile Apps",
      },
      {
        name: "PostgreSQL",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "FaceLog, Monitoring Sapi",
      },
      {
        name: "MySQL",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "Labverse, Labtek, Compro AGS",
      },
      {
        name: "SQLite",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "EduSphere Offline Mode",
      },
      {
        name: "Git & GitHub",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "Version Control & Collaboration",
      },
    ],
  },
];

export default SKILL_CATEGORIES;
