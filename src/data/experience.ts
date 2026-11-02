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
      id: "Bertanggung jawab atas riset teknologi, perancangan arsitektur perangkat lunak end-to-end (AI, Desktop & Web), hingga implementasi dan instalasi sistem infrastruktur digital langsung di lapangan.",
      en: "Leading technology research, end-to-end software architecture (Applied AI, Desktop & Web), and on-site enterprise hardware/AV system integration.",
    },
    points: {
      id: [
        "Terlibat langsung dalam instalasi & integrasi infrastruktur Paperless Conference System serta sistem Video Wall di UPN Surabaya, di mana aplikasi SnapStream diinstal dan dijalankan langsung pada sistem Video Wall tersebut.",
        "Merancang dan mengembangkan FaceLog — ekosistem presensi pintar berbasis pengenalan wajah real-time (Python, Django REST API, OpenCV, FaceNet, React.js, PostgreSQL) yang terinstal langsung pada perangkat IFP (Interactive Flat Panel) serta terminal Kiosk Scanner.",
        "Mengembangkan SnapStream — studio live streaming (multi-RTMP) dan perekaman layar berbasis Electron, Express.js, WebRTC, HLS, serta FFmpeg yang teruji berjalan pada infrastruktur Video Wall.",
        "Membangun arsitektur EduSphere (LabBahasa) — platform pembelajaran digital desktop lintas OS (34+ modul layar) berbasis Electron, React.js, Express.js, Socket.IO, dan SQLite offline-ready termasuk video conference, ujian terpantau, serta kendali perangkat ruang kelas.",
      ],
      en: [
        "Executed on-site installation and integration of the Paperless Conference System and Video Wall infrastructure at UPN Surabaya, deploying SnapStream directly onto the live Video Wall environment.",
        "Architected and built FaceLog — an end-to-end AI facial recognition attendance platform (Python, Django REST API, OpenCV, FaceNet, React.js, PostgreSQL) deployed directly on Interactive Flat Panel (IFP) hardware and Kiosk Scanner terminals.",
        "Developed SnapStream — an Electron, Express.js, WebRTC, HLS, and FFmpeg live broadcasting & recording studio engineered to run reliably on large-scale Video Wall displays.",
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
    id: "freelance-fullstack",
    role: {
      id: "Fullstack Web & Mobile Developer",
      en: "Fullstack Web & Mobile Developer",
    },
    organization: {
      id: "Pengembangan Proyek Klien & Mandiri",
      en: "Client Projects & Independent Engineering",
    },
    period: {
      id: "2022 – Oktober 2025",
      en: "2022 – October 2025",
    },
    badge: {
      id: "Fullstack Delivery · Web & Mobile",
      en: "Fullstack Delivery · Web & Mobile",
    },
    iconKey: "freelance",
    accent: "violet",
    summary: {
      id: "Menangani pengembangan aplikasi web korporasi, platform e-commerce B2B/B2C, serta sistem pemantauan terintegrasi berbasis Web dan Mobile.",
      en: "Delivered end-to-end corporate web portals, specialized B2B/B2C e-commerce platforms, and cross-platform Web + Mobile monitoring systems.",
    },
    points: {
      id: [
        "Membangun DairyTrack (Sistem Monitoring Kesehatan Sapi) yang mengintegrasikan backend Django REST API, dashboard analitik React.js, dan aplikasi lapangan mobile Flutter.",
        "Mengembangkan platform e-commerce peralatan laboratorium & industri (Labverse, Labtek) lengkap dengan katalog spesifikasi, keranjang, alur penawaran B2B, dan panel inventaris berbasis Laravel & MySQL.",
        "Merancang website profil perusahaan (Compro AGS) dengan sistem manajemen konten (CMS) mandiri berbasis Laravel dan Tailwind CSS.",
        "Mengelola siklus penuh pengerjaan proyek: analisis kebutuhan klien, perancangan database relasional, implementasi REST API, hingga antarmuka responsif.",
      ],
      en: [
        "Built the DairyTrack Livestock Health Monitoring platform uniting a Django REST backend, React.js web analytics dashboard, and Flutter mobile application.",
        "Developed specialized laboratory and industrial e-commerce platforms (Labverse, Labtek) with catalog filtering, checkout, B2B inquiry workflows, and Laravel + MySQL admin panels.",
        "Delivered a responsive corporate profile portal (Compro AGS) backed by a custom self-service Laravel & Tailwind CSS CMS.",
        "Owned the full delivery lifecycle from client requirement gathering and relational schema design to API development and responsive frontend implementation.",
      ],
    },
    tech: ["Laravel", "Django", "React.js", "Flutter", "PHP", "TailwindCSS", "MySQL", "PostgreSQL"],
  },
];

export default experience;
