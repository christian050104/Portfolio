import type { BilingualText } from "./projects";

export interface ExperienceItem {
  id: string;
  role: BilingualText;
  organization: BilingualText;
  period: BilingualText;
  badge: BilingualText;
  iconKey: "rnd" | "freelance";
  accent: "cyan" | "violet";
  summary: BilingualText;
  points: {
    id: string[];
    en: string[];
  };
  tech: string[];
}

const experience: ExperienceItem[] = [
  {
    id: "it-engineer-rnd",
    role: {
      id: "IT Engineer",
      en: "IT Engineer",
    },
    organization: {
      id: "Divisi Riset dan Pengembangan (R&D)",
      en: "Research & Development (R&D) Division",
    },
    period: {
      id: "Oktober 2025 – Sekarang",
      en: "October 2025 – Present",
    },
    badge: {
      id: "Posisi Saat Ini · Full-time R&D",
      en: "Current Role · Full-time R&D",
    },
    iconKey: "rnd",
    accent: "cyan",
    summary: {
      id: "Bertanggung jawab atas riset teknologi, perancangan arsitektur perangkat lunak end-to-end (AI & Desktop lintas OS), hingga integrasi dan instalasi sistem infrastruktur visual langsung di lapangan.",
      en: "Leading technology research, end-to-end software architecture (Applied AI & Cross-Platform Desktop), and on-site enterprise AV/hardware system integration.",
    },
    points: {
      id: [
        "Merancang dan mengembangkan FaceLog — ekosistem presensi pintar berbasis pengenalan wajah real-time (Python, Django REST API, OpenCV, FaceNet, React.js, PostgreSQL) yang terinstal langsung pada perangkat IFP (Interactive Flat Panel) serta terminal Kiosk Scanner.",
        "Mengembangkan SnapStream — studio live streaming (multi-RTMP) dan perekaman layar berbasis Electron, Express.js, WebRTC, HLS, serta FFmpeg, sekaligus terlibat langsung dalam instalasi sistem Video Wall di UPN Surabaya tempat aplikasi SnapStream terinstal.",
        "Membangun arsitektur EduSphere (LabBahasa) — platform pembelajaran digital desktop lintas OS (34+ modul layar) berbasis Electron, React.js, Express.js, Socket.IO, dan SQLite offline-ready yang mencakup video conference, ujian terpantau, serta kendali perangkat ruang kelas.",
      ],
      en: [
        "Architected and built FaceLog — an end-to-end AI facial recognition attendance platform (Python, Django REST API, OpenCV, FaceNet, React.js, PostgreSQL) deployed directly on Interactive Flat Panel (IFP) hardware and Kiosk Scanner terminals.",
        "Developed SnapStream — an Electron, Express.js, WebRTC, HLS, and FFmpeg live broadcasting & recording studio, alongside executing on-site Video Wall installation at UPN Surabaya with SnapStream deployed live on the Video Wall.",
        "Engineered EduSphere (LabBahasa) — a 34+ screen cross-platform Electron desktop suite integrating real-time video conferencing, live-monitored exams, remote classroom device control, and offline SQLite persistence.",
      ],
    },
    tech: [
      "Python",
      "Django",
      "React.js",
      "Electron",
      "Express.js",
      "OpenCV",
      "DeepFace / FaceNet",
      "Socket.IO",
      "FFmpeg",
      "WebRTC",
      "PostgreSQL",
      "SQLite",
    ],
  },
  {
    id: "internship-2024",
    role: {
      id: "Fullstack Web Developer & IT Intern",
      en: "Fullstack Web Developer & IT Intern",
    },
    organization: {
      id: "Program Magang Industri (Internship)",
      en: "Industrial Internship Program",
    },
    period: {
      id: "2024",
      en: "2024",
    },
    badge: {
      id: "Magang · Fullstack Web & Infrastruktur",
      en: "Internship · Fullstack Web & On-Site IT",
    },
    iconKey: "freelance",
    accent: "violet",
    summary: {
      id: "Menangani pengembangan berbagai platform web korporasi dan e-commerce B2B/B2C berbasis Laravel & MySQL, serta terjun langsung membantu instalasi sistem ruang konferensi modern di lingkungan kampus.",
      en: "Developed corporate B2B portals and fullstack e-commerce web platforms using Laravel & MySQL while participating in on-site enterprise conference infrastructure deployments.",
    },
    points: {
      id: [
        "Mengembangkan Compro AGS — portal korporasi dan sistem pengadaan B2B 27 layar (alur Quotation, Negosiasi, Purchase Order, Proforma/Final Invoice, Tiket Layanan, & SEO Meta CMS) menggunakan Laravel, MySQL, dan Tailwind CSS.",
        "Membangun platform e-commerce peralatan laboratorium & teknik industri Labverse (20 layar) dan Labtek (18 layar) lengkap dengan storefront pelanggan, promo Flash/Big Sales, verifikasi pembayaran, dan analitik pendapatan Admin.",
        "Terlibat langsung di lapangan dalam instalasi dan konfigurasi infrastruktur Paperless Conference System di UPN Surabaya.",
      ],
      en: [
        "Developed Compro AGS — a 27-screen corporate portal and B2B procurement ERP (Quotation, Negotiation, PO, Proforma/Final Invoice, Service Ticketing, & SEO CMS) built with Laravel, MySQL, and Tailwind CSS.",
        "Built specialized laboratory and industrial equipment e-commerce platforms Labverse (20 screens) and Labtek (18 screens) featuring customer storefronts, Flash/Big Sales, payment verification, and admin analytics.",
        "Participated on-site in the hardware/system installation and setup of the Paperless Conference System at UPN Surabaya.",
      ],
    },
    tech: ["Laravel", "PHP", "MySQL", "TailwindCSS", "Bootstrap"],
  },
  {
    id: "fullstack-projects",
    role: {
      id: "Fullstack Web & Mobile Developer",
      en: "Fullstack Web & Mobile Developer",
    },
    organization: {
      id: "Pengembangan Sistem Web & Mobile",
      en: "Cross-Platform Web & Mobile Engineering",
    },
    period: {
      id: "2024 – 2025",
      en: "2024 – 2025",
    },
    badge: {
      id: "Dual-Platform · Web & Flutter Mobile",
      en: "Dual-Platform · Web & Flutter Mobile",
    },
    iconKey: "freelance",
    accent: "violet",
    summary: {
      id: "Merancang sistem pemantauan terintegrasi lintas platform yang menghubungkan dashboard analitik manajemen berbasis Web dengan aplikasi pencatatan lapangan berbasis Mobile.",
      en: "Architected cross-platform monitoring software connecting web-based management analytics with field-ready mobile data collection.",
    },
    points: {
      id: [
        "Membangun ekosistem DairyTrack (Monitoring Kesehatan & Reproduksi Sapi) sebanyak 23 layar yang menyinkronkan Dashboard Web (React.js) dan Aplikasi Mobile (Flutter) melalui backend terpusat Django REST Framework & PostgreSQL.",
        "Mengimplementasikan pencatatan pemeriksaan rutin, diagnosis gejala penyakit, riwayat medis, siklus reproduksi, serta notifikasi peringatan dini lintas perangkat.",
      ],
      en: [
        "Engineered the 23-screen DairyTrack Livestock Health & Reproduction ecosystem synchronizing a React.js Web Dashboard with a Flutter Mobile App via Django REST Framework & PostgreSQL.",
        "Implemented routine health inspections, symptom tracking, reproduction records, and cross-platform early-warning notifications.",
      ],
    },
    tech: ["Django", "React.js", "Flutter", "Dart", "PostgreSQL", "REST API", "TailwindCSS"],
  },
];

export default experience;
