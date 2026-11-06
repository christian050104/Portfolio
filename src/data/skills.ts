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
      id: "Merancang layanan server yang scalable, aman, dan testable — mencakup integrasi RESTful API, analisis sistem, optimasi performa, serta debugging.",
      en: "Designing scalable, testable, and secure server-side applications — covering RESTful API integration, software analysis, performance optimization, and debugging.",
    },
    accent: "emerald",
    skills: [
      {
        name: "Java",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "OOP & Enterprise Backend",
      },
      {
        name: "Spring Boot",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "RESTful API & Backend Services",
      },
      {
        name: "Laravel",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "Labverse, Labtek, Compro AGS",
      },
      {
        name: "Django",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "FaceLog AI, DairyTrack",
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
        name: "RESTful API",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "System Integration & Auth",
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
      id: "Database (SQL/NoSQL), CI/CD & Mobile",
      en: "SQL/NoSQL Databases, CI/CD & Mobile",
    },
    description: {
      id: "Pengelolaan database relasional (SQL) & dokumen/in-memory (NoSQL), otomatisasi pipeline CI/CD (Jenkins & Git), metodologi Agile/Scrum, serta aplikasi mobile.",
      en: "Relational (SQL) & document/in-memory (NoSQL) databases, CI/CD pipeline automation (Jenkins & Git), Agile/Scrum workflows, and cross-platform mobile apps.",
    },
    accent: "rose",
    skills: [
      {
        name: "PostgreSQL",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "SQL · FaceLog, DairyTrack",
      },
      {
        name: "MySQL",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "SQL · Labverse, Labtek, AGS",
      },
      {
        name: "MongoDB",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "NoSQL Document Database",
      },
      {
        name: "Redis",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "NoSQL Caching & Performance",
      },
      {
        name: "SQLite",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "SQL · EduSphere Offline Mode",
      },
      {
        name: "Jenkins (CI/CD)",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "CI/CD Build & Release Pipeline",
      },
      {
        name: "Git & GitHub",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "Version Control & Code Review",
      },
      {
        name: "Agile / Scrum",
        tier: { id: "Stack Utama", en: "Core Stack" },
        usedIn: "Sprint Lifecycle & Team Collab",
      },
      {
        name: "Flutter",
        tier: { id: "Siap Produksi", en: "Production" },
        usedIn: "DairyTrack Mobile (Dart)",
      },
    ],
  },
];

export default SKILL_CATEGORIES;
