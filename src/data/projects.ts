export interface BilingualText {
  id: string;
  en: string;
}

export type ProjectCategory = "AI & ML" | "Desktop" | "Web & Mobile" | "Fullstack Web";

export interface ProjectItem {
  id: string;
  name: string;
  featured: boolean;
  category: ProjectCategory;
  accent: "violet" | "cyan" | "emerald" | "blue" | "amber" | "rose";
  year: string;
  imageFolder: string;
  role: BilingualText;
  impactBadge: BilingualText;
  shortDesc: BilingualText;
  description: BilingualText;
  challenge?: BilingualText;
  solution?: BilingualText;
  tech: string[];
  images: string[];
  github: string;
  highlights: {
    id: string[];
    en: string[];
  };
  previewModules?: {
    id: string[];
    en: string[];
  };
}

export function getScreenshotPlatform(src: string): "mobile" | "web" {
  const filename = (src.split("/").pop() || "").toLowerCase();
  if (
    filename.includes("mobile") ||
    filename.includes("flutter") ||
    filename.includes("android") ||
    filename.includes("ios")
  ) {
    return "mobile";
  }
  return "web";
}

const WORD_FIXES: Record<string, string> = {
  dasboard: "Dashboard",
  dashboard: "Dashboard",
  keseahatran: "Kesehatan",
  kesehatan: "Kesehatan",
  notikasi: "Notifikasi",
  notifikasi: "Notifikasi",
  ijin: "Izin",
  izin: "Izin",
  per: "per",
  di: "di",
  atau: "/",
  sapi: "Sapi",
  gejala: "Gejala",
  pemeriksaan: "Pemeriksaan",
  reproduksi: "Reproduksi",
  riwayat: "Riwayat",
  user: "User",
  web: "Web",
  website: "Web",
  mobile: "Mobile",
  ebook: "E-Book",
  kuis: "Kuis",
  prodi: "Prodi",
  absensi: "Absensi",
};

export function formatScreenshotCaption(src: string): string {
  const filename = src.split("/").pop() || "";
  const withoutExt = filename.replace(/\.(jpg|jpeg|png|webp|avif|svg)$/i, "");
  const cleaned = withoutExt.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();

  // Strip trailing WEBSITE / MOBILE tag if present so we can format cleanly
  const platform = getScreenshotPlatform(src);
  const words = cleaned.split(" ");

  const formattedWords = words
    .map((raw) => {
      const lower = raw.toLowerCase();
      if (WORD_FIXES[lower]) return WORD_FIXES[lower];
      if (/^\d+$/.test(raw)) return `#${raw}`;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .filter((w, idx, arr) => {
      // Remove redundant "Web" / "Mobile" word in middle/end when there are other descriptive words
      if (arr.length > 2 && (w === "Web" || w === "Mobile")) {
        // Keep "Web Login" as "Login Web" -> handled nicely if we strip and append badge in UI, or keep concise
        if (arr.some((other) => other.toLowerCase() === "login")) return true;
        return false;
      }
      return true;
    });

  const baseTitle = formattedWords.join(" ").trim();
  if (!baseTitle) return platform === "mobile" ? "Mobile Screen" : "Web Screen";
  return baseTitle;
}

export function encodeAssetPath(src: string): string {
  return encodeURI(src);
}

const projects: ProjectItem[] = [
  {
    id: "facelog",
    name: "FaceLog",
    featured: true,
    category: "AI & ML",
    accent: "violet",
    year: "2025 – 2026",
    imageFolder: "FaceRecognition",
    role: {
      id: "IT Engineer (R&D) · Fullstack & AI",
      en: "IT Engineer (R&D) · Fullstack & AI",
    },
    impactBadge: {
      id: "Terinstal di Perangkat IFP · 18 Modul Real-time",
      en: "Deployed on IFP Hardware · 18 Real-time Modules",
    },
    shortDesc: {
      id: "Sistem pengenalan wajah real-time berbasis AI yang terinstal di perangkat IFP (Interactive Flat Panel) & Kiosk Scanner untuk presensi akademik otomatis.",
      en: "Real-time AI face recognition platform deployed on Interactive Flat Panel (IFP) hardware & Kiosk Scanners for automated academic attendance.",
    },
    description: {
      id: "FaceLog adalah ekosistem presensi pintar dan kontrol akses berbasis pengenalan wajah real-time yang telah terinstal langsung pada perangkat IFP (Interactive Flat Panel) maupun terminal Kiosk Scanner. Dirancang end-to-end menggunakan model deep learning (FaceNet / DeepFace) serta dashboard terpusat berbasis React dan Django REST API untuk memantau kehadiran per jadwal, status perangkat scanner, dan perizinan secara akurat.",
      en: "FaceLog is an end-to-end smart attendance and access control ecosystem powered by real-time facial recognition, deployed directly on Interactive Flat Panel (IFP) displays and Kiosk Scanner terminals. Combining deep learning inference (FaceNet / DeepFace) with React portals and a Django REST API + PostgreSQL backend, it automates attendance verification, leave workflows, and live device telemetry.",
    },
    challenge: {
      id: "Presensi manual rentan manipulasi titip absen, lambat saat pergantian kelas, dan membutuhkan integrasi langsung dengan perangkat kelas interaktif (IFP).",
      en: "Manual attendance is prone to proxy fraud, slows down class transitions, and requires seamless integration with classroom Interactive Flat Panels (IFP).",
    },
    solution: {
      id: "Membangun pipeline inferensi wajah real-time yang terinstal langsung di perangkat IFP & Kiosk Scanner, tersinkronisasi dengan jadwal kelas dan rekap otomatis.",
      en: "Engineered a real-time recognition pipeline deployed directly onto IFP & Kiosk Scanner units, synced with class schedules, scanner health monitoring, and automated reporting.",
    },
    tech: [
      "Python",
      "Django",
      "React.js",
      "OpenCV",
      "DeepFace / FaceNet",
      "PostgreSQL",
      "REST API",
      "TailwindCSS",
    ],
    images: [
      "/FaceRecognition/dashboard.jpg",
      "/FaceRecognition/live absensi.jpg",
      "/FaceRecognition/kiosk scanner.jpg",
      "/FaceRecognition/monitoring scanner.jpg",
      "/FaceRecognition/monitoring per scanner.png",
      "/FaceRecognition/rekap kehadiran.jpg",
      "/FaceRecognition/log kehadiran per jadwal.jpg",
      "/FaceRecognition/dashboard siswa.jpg",
      "/FaceRecognition/jadwal.jpg",
      "/FaceRecognition/jadwal per kelas.jpg",
      "/FaceRecognition/ijin.jpg",
      "/FaceRecognition/detail pengajuan ijin atau sakit.jpg",
      "/FaceRecognition/daftar kelas.jpg",
      "/FaceRecognition/daftar prodi.jpg",
      "/FaceRecognition/mata kuliah.jpg",
      "/FaceRecognition/manajemen akun.jpg",
      "/FaceRecognition/data pendidikan.png",
      "/FaceRecognition/login.jpg",
    ],
    github: "https://github.com/christian050104/FaceLog",
    highlights: {
      id: [
        "Terinstal dan berjalan langsung pada perangkat IFP (Interactive Flat Panel) & Kiosk Scanner",
        "Verifikasi wajah real-time berbasis DeepFace / FaceNet dengan akurasi tinggi",
        "Monitoring status dan aktivitas setiap unit scanner secara langsung",
        "Dashboard khusus Admin & Mahasiswa lengkap dengan pengajuan izin/sakit digital",
        "Sinkronisasi jadwal kelas, program studi, mata kuliah, dan rekapitulasi otomatis",
      ],
      en: [
        "Deployed and running directly on Interactive Flat Panel (IFP) hardware & Kiosk Scanners",
        "High-accuracy real-time face detection & verification via DeepFace / FaceNet",
        "Live device telemetry and per-scanner activity monitoring",
        "Dedicated Admin & Student portals with digital leave/sick-note approval workflows",
        "Automated class schedule matching, program management, and attendance analytics",
      ],
    },
  },
  {
    id: "edusphere",
    name: "EduSphere",
    featured: true,
    category: "Desktop",
    accent: "cyan",
    year: "2025 – 2026",
    imageFolder: "EduSphere",
    role: {
      id: "IT Engineer (R&D) · Desktop Architect",
      en: "IT Engineer (R&D) · Desktop Architect",
    },
    impactBadge: {
      id: "34 Layar Fitur · Offline-First & Live Classroom",
      en: "34 Feature Screens · Offline-First & Live Classroom",
    },
    shortDesc: {
      id: "Platform EdTech desktop lintas platform dengan video conference, live streaming, ujian terpantau, dan kontrol perangkat kelas.",
      en: "Cross-platform EdTech desktop suite featuring video conferencing, live streaming, proctored quizzes, offline sync, and classroom device control.",
    },
    description: {
      id: "EduSphere adalah aplikasi desktop pembelajaran terpadu berbasis Electron, React.js, dan Express.js. Menggabungkan manajemen akademik, materi & e-book, Learning Tube, ujian interaktif dengan live monitoring peserta, video conference multi-user, live streaming, perekaman sesi, hingga kendali perangkat kelas jarak jauh — tetap andal bahkan pada jaringan terbatas berkat penyimpanan lokal SQLite.",
      en: "EduSphere is an all-in-one desktop learning ecosystem built with Electron, React.js, and Express.js. It unifies academic management, e-books, Learning Tube video modules, live-monitored exams, multi-party video conferencing, screen sharing, live streaming, session recording, and classroom device control — engineered to work reliably even in low-connectivity environments via SQLite.",
    },
    challenge: {
      id: "Institusi pendidikan membutuhkan satu aplikasi terpusat untuk kuliah interaktif, ujian yang diawasi, dan kontrol perangkat ruang kelas tanpa bergantung pada banyak aplikasi terpisah.",
      en: "Educational institutions needed a unified platform for interactive lectures, monitored exams, and lab device control without juggling disconnected third-party tools.",
    },
    solution: {
      id: "Merancang arsitektur desktop Electron + Express + Socket.IO yang menyatukan komunikasi real-time, evaluasi ujian, arsip rekaman, dan mode offline SQLite dalam satu aplikasi.",
      en: "Architected an Electron + Express + Socket.IO desktop suite combining real-time A/V collaboration, exam monitoring, recording archives, and SQLite offline persistence.",
    },
    tech: [
      "Electron",
      "React.js",
      "Express.js",
      "Node.js",
      "Socket.IO",
      "SQLite",
      "TailwindCSS",
    ],
    images: [
      "/EduSphere/dashboard.jpg",
      "/EduSphere/video conference.jpg",
      "/EduSphere/meeting di video conference.jpg",
      "/EduSphere/live stream berlangsung.jpg",
      "/EduSphere/pengerjaan ujian.jpg",
      "/EduSphere/monitoring  kuis.jpg",
      "/EduSphere/control device.jpg",
      "/EduSphere/monitoring device.jpg",
      "/EduSphere/learning tube.jpg",
      "/EduSphere/ebook.jpg",
      "/EduSphere/materi.jpg",
      "/EduSphere/share screen .jpg",
      "/EduSphere/message exchange.jpg",
      "/EduSphere/hasil kuis.jpg",
      "/EduSphere/detail hasil kuis.jpg",
      "/EduSphere/manajemen kuis.jpg",
      "/EduSphere/kelola peserta kuis.jpg",
      "/EduSphere/daftar ujian.jpg",
      "/EduSphere/live stream.jpg",
      "/EduSphere/riwayat live stream.jpg",
      "/EduSphere/detail riwayat live stream.jpg",
      "/EduSphere/recording.jpg",
      "/EduSphere/recording berlangsung.jpg",
      "/EduSphere/arsip recording.jpg",
      "/EduSphere/riwayat meeting.jpg",
      "/EduSphere/control device 2.jpg",
      "/EduSphere/manajemen user.jpg",
      "/EduSphere/manajemen role.jpg",
      "/EduSphere/manajemen program studi.jpg",
      "/EduSphere/manajemen mata kuliah.jpg",
      "/EduSphere/manajemen ruangan.jpg",
      "/EduSphere/manajemen profile siswa.jpg",
      "/EduSphere/daftar mahasiswa per prodi.jpg",
      "/EduSphere/login.jpg",
    ],
    github: "https://github.com/christian050104/LabBahasa",
    highlights: {
      id: [
        "Aplikasi desktop lintas OS (Windows, macOS, Linux) menggunakan Electron",
        "Video conference, share screen, message exchange, dan live streaming kelas",
        "Sistem kuis & ujian interaktif dengan monitoring peserta secara real-time",
        "Monitoring dan remote control perangkat ruang kelas dari satu panel",
        "Mode offline-ready dengan sinkronisasi database SQLite lokal",
      ],
      en: [
        "Cross-platform desktop application (Windows, macOS, Linux) powered by Electron",
        "Built-in video conferencing, screen sharing, real-time chat, and live streaming",
        "Interactive exam & quiz engine with live participant monitoring and analytics",
        "Remote classroom device monitoring and control dashboard",
        "Offline-capable workflow backed by local SQLite persistence",
      ],
    },
  },
  {
    id: "snapstream",
    name: "SnapStream",
    featured: true,
    category: "Desktop",
    accent: "emerald",
    year: "2025 – 2026",
    imageFolder: "SnapStream",
    role: {
      id: "IT Engineer (R&D) · Streaming & Desktop",
      en: "IT Engineer (R&D) · Streaming & Desktop",
    },
    impactBadge: {
      id: "Terinstal di Video Wall UPN Surabaya · Multi-RTMP",
      en: "Deployed on UPN Surabaya Video Wall · Multi-RTMP",
    },
    shortDesc: {
      id: "Aplikasi desktop live streaming & perekaman layar profesional yang telah terinstal langsung pada infrastruktur Video Wall di UPN Surabaya.",
      en: "Professional live broadcasting & recording desktop studio deployed in production on the Video Wall infrastructure at UPN Surabaya.",
    },
    description: {
      id: "SnapStream adalah studio penyiaran langsung (live streaming) dan perekaman layar berbasis desktop (Electron, Express.js, FFmpeg) yang telah terinstal dan digunakan langsung pada sistem Video Wall di UPN Surabaya. Memungkinkan institusi menyiarkan video multi-platform secara simultan (RTMP/HLS), merekam sesi berkualitas tinggi secara lokal, serta memantau kesehatan siaran dari satu antarmuka terpusat.",
      en: "SnapStream is a desktop broadcasting and screen-recording studio engineered with Electron, Express.js, and FFmpeg — deployed live on the Video Wall system at UPN Surabaya. It enables simultaneous multi-platform RTMP streaming, local high-definition session recording, HLS playback packaging, and real-time stream health telemetry.",
    },
    challenge: {
      id: "Infrastruktur ruang konferensi dan Video Wall skala institusi membutuhkan sistem penyiaran & perekaman yang stabil namun tetap mudah dioperasikan oleh staf.",
      en: "Institutional conference rooms and large-scale Video Wall installations require stable, low-overhead broadcasting & recording without complex manual setup.",
    },
    solution: {
      id: "Merancang studio desktop Electron + FFmpeg yang terintegrasi langsung pada sistem Video Wall UPN Surabaya dengan pemantauan status real-time via Socket.IO.",
      en: "Engineered a streamlined Electron + FFmpeg studio deployed directly onto UPN Surabaya's Video Wall infrastructure with real-time Socket.IO stream telemetry.",
    },
    tech: [
      "Electron",
      "Express.js",
      "Node.js",
      "WebRTC",
      "RTMP",
      "HLS",
      "Socket.IO",
      "FFmpeg",
    ],
    images: [
      "/SnapStream/dashboard.jpg",
      "/SnapStream/live berlangsung.jpg",
      "/SnapStream/livestream.jpg",
      "/SnapStream/recording.jpg",
      "/SnapStream/ringkasan recording.jpg",
      "/SnapStream/history live.jpg",
      "/SnapStream/history recording.jpg",
      "/SnapStream/login.jpg",
    ],
    github: "https://github.com/christian050104/SnapStream",
    highlights: {
      id: [
        "Terinstal dan beroperasi langsung pada sistem Video Wall di UPN Surabaya",
        "Distribusi siaran langsung ke banyak platform sekaligus melalui protokol RTMP",
        "Pipeline perekaman layar & kamera menggunakan FFmpeg dengan ringkasan sesi otomatis",
        "Pemantauan kualitas dan status siaran real-time menggunakan Socket.IO & output HLS",
        "Manajemen riwayat live stream dan arsip rekaman terstruktur",
      ],
      en: [
        "Deployed and operating live on the Video Wall infrastructure at UPN Surabaya",
        "Simultaneous multi-platform RTMP live broadcasting pipeline",
        "Hardware-friendly FFmpeg screen & camera recording with automatic session summaries",
        "Real-time stream telemetry via Socket.IO with web-ready HLS output",
        "Organized broadcast history and local recording archive management",
      ],
    },
  },
  {
    id: "cattle-monitoring",
    name: "DairyTrack — Monitoring Kesehatan Sapi",
    featured: true,
    category: "Web & Mobile",
    accent: "blue",
    year: "2024 – 2025",
    imageFolder: "DairyTrack",
    role: {
      id: "Fullstack Web & Mobile Developer",
      en: "Fullstack Web & Mobile Developer",
    },
    impactBadge: {
      id: "Dual Platform: 11 Layar Web + 12 Layar Mobile Flutter",
      en: "Dual Platform: 11 Web + 12 Flutter Mobile Screens",
    },
    shortDesc: {
      id: "Ekosistem pemantauan kesehatan sapi lintas platform yang menyatukan Dashboard Web (React) untuk manajer dan Aplikasi Mobile (Flutter) untuk petugas kandang.",
      en: "Cross-platform cattle health ecosystem uniting a React Web Dashboard for farm managers with a Flutter Mobile App for field staff, backed by Django REST API.",
    },
    description: {
      id: "DairyTrack adalah sistem pemantauan kesehatan dan reproduksi sapi terpadu yang hadir dalam dua versi terintegrasi: Website Dashboard (React.js) untuk analisis statistik manajemen dan Aplikasi Mobile (Flutter) untuk pencatatan langsung di lapangan. Terhubung ke backend terpusat Django REST Framework & PostgreSQL untuk melacak pemeriksaan kesehatan, gejala penyakit, riwayat medis, siklus reproduksi, serta notifikasi peringatan dini secara real-time.",
      en: "DairyTrack is a dual-platform livestock health and reproduction management ecosystem comprising a React.js Web Dashboard for farm analytics and a native-feel Flutter Mobile App for on-site cattle inspections. Powered by a unified Django REST API and PostgreSQL database, it synchronizes health checks, symptom diagnostics, disease history, reproduction records, and early-warning alerts.",
    },
    challenge: {
      id: "Petugas lapangan membutuhkan pencatatan pemeriksaan dan gejala sapi yang praktis lewat ponsel di kandang, sementara pengelola membutuhkan analitik menyeluruh di layar web.",
      en: "Field workers need fast mobile data entry inside cattle barns, while farm managers require comprehensive disease & health analytics on desktop web.",
    },
    solution: {
      id: "Membangun satu REST API Django + PostgreSQL yang melayani sinkronisasi data seketika antara Dashboard Web React.js dan Aplikasi Mobile Flutter.",
      en: "Architected a unified Django + PostgreSQL backend synchronizing real-time health, symptom, and reproduction data across React Web and Flutter Mobile.",
    },
    tech: ["Django", "React.js", "Flutter", "Dart", "PostgreSQL", "REST API", "TailwindCSS"],
    images: [
      // Website Version (ordered logically from Dashboard -> Master Data -> Health Workflows -> Notifications -> Auth)
      "/DairyTrack/DASHBOARD WEBSITE.jpg",
      "/DairyTrack/DATA SAPI WEBSITE.jpeg",
      "/DairyTrack/DATA KESEHATAN WEBSITE 1.jpg",
      "/DairyTrack/DATA KESEHATAN WEBSITE 2.jpg",
      "/DairyTrack/DATA PEMERIKSAAN WEBSITE.jpg",
      "/DairyTrack/DATA GEJALA WEBSITE.jpg",
      "/DairyTrack/DATA REPRODUKSI WEBSITE.jpg",
      "/DairyTrack/DATA RIWAYAT WEBSITE.jpg",
      "/DairyTrack/NOTIFIKASI WEBSITE.jpg",
      "/DairyTrack/DATA USER WEBSITE.jpg",
      "/DairyTrack/Web Login.jpeg",
      // Mobile Flutter Version (matching logical workflow sequence)
      "/DairyTrack/DASHBOARD KESEHATAN MOBILE.jpg",
      "/DairyTrack/DASBOARD KESEAHATRAN MOBILE 2.jpg",
      "/DairyTrack/DASHBOARD KESEHATAN MOBILE 3.jpg",
      "/DairyTrack/DATA SAPI MOBILE.jpg",
      "/DairyTrack/DATA SAPI MOBILE 2.jpg",
      "/DairyTrack/DATA PEMERIKSAAN MOBILE.jpg",
      "/DairyTrack/DATA GEJALA MOBILE.jpg",
      "/DairyTrack/DATA REPRODUKSI MOBILE.jpg",
      "/DairyTrack/DATA RIWAYAT MOBILE.jpg",
      "/DairyTrack/NOTIKASI MOBILE.jpg",
      "/DairyTrack/DATA USER MOBILE.jpg",
      "/DairyTrack/DATA USER MOBILE 2.jpg",
    ],
    github: "https://github.com/christian050104/development_of_dairyTrack_platform",
    highlights: {
      id: [
        "Arsitektur Dual-Platform: Dashboard Website (React.js) & Aplikasi Mobile (Flutter)",
        "Pemantauan statistik penyakit terkonfirmasi, pemeriksaan rutin, dan gejala ternak",
        "Pencatatan siklus reproduksi, riwayat penanganan medis, dan profil individu sapi",
        "Sistem notifikasi peringatan dini lintas Web dan Mobile untuk kondisi abnormal",
        "Backend terpusat Django REST Framework dengan database relasional PostgreSQL",
      ],
      en: [
        "Synchronized Dual-Platform Architecture: React.js Web Portal & Flutter Mobile App",
        "Confirmed disease statistics, routine health check tracking, and symptom logging",
        "Reproduction cycle tracking, medical treatment history, and per-cattle profiles",
        "Cross-platform early-warning notification system on both Web and Mobile",
        "Centralized Django REST API backed by relational PostgreSQL storage",
      ],
    },
    previewModules: {
      id: ["Dashboard Kesehatan Sapi", "Aplikasi Mobile Flutter", "Peringatan Gejala Dini", "Analitik Peternakan"],
      en: ["Cattle Health Dashboard", "Flutter Field App", "Early Anomaly Alerts", "Herd Analytics"],
    },
  },
  {
    id: "labverse",
    name: "Labverse",
    featured: false,
    category: "Fullstack Web",
    accent: "blue",
    year: "2023",
    imageFolder: "Labverse",
    role: {
      id: "Fullstack Web Developer",
      en: "Fullstack Web Developer",
    },
    impactBadge: {
      id: "E-Commerce B2B/B2C · Katalog & Checkout",
      en: "B2B/B2C E-Commerce · Catalog & Order Flow",
    },
    shortDesc: {
      id: "Platform e-commerce peralatan dan perlengkapan laboratorium lengkap dengan katalog dinamis, keranjang belanja, dan manajemen pesanan.",
      en: "Full-featured e-commerce platform for laboratory equipment featuring product catalog, cart, checkout, and order management.",
    },
    description: {
      id: "Platform e-commerce khusus peralatan dan instrumen laboratorium yang dibangun menggunakan Laravel, MySQL, dan Tailwind CSS. Mencakup pencarian katalog berbasis kategori spesifikasi, manajemen keranjang belanja, alur checkout terstruktur, serta panel admin untuk pengelolaan stok dan pesanan pelanggan.",
      en: "A specialized e-commerce web application for laboratory equipment and scientific supplies built with Laravel, MySQL, and Tailwind CSS. Features searchable product catalogs, shopping cart workflows, order tracking, and an inventory admin dashboard.",
    },
    tech: ["Laravel", "MySQL", "TailwindCSS", "PHP"],
    images: [],
    github: "https://github.com/christian050104/Labverse",
    highlights: {
      id: [
        "Katalog produk laboratorium terstruktur dengan filter kategori dan pencarian",
        "Alur keranjang belanja, checkout, dan pelacakan status pesanan end-to-end",
        "Panel administrasi pengelolaan inventaris produk dan transaksi di Laravel",
      ],
      en: [
        "Structured scientific catalog with category filtering and fast search",
        "End-to-end shopping cart, checkout workflow, and order status tracking",
        "Comprehensive Laravel admin panel for inventory and transaction management",
      ],
    },
    previewModules: {
      id: ["Katalog Alat Lab", "Keranjang & Checkout", "Pelacakan Pesanan", "Admin Inventaris"],
      en: ["Lab Supply Catalog", "Cart & Checkout", "Order Tracking", "Inventory Admin"],
    },
  },
  {
    id: "labtek",
    name: "Labtek",
    featured: false,
    category: "Fullstack Web",
    accent: "amber",
    year: "2023",
    imageFolder: "Labtek",
    role: {
      id: "Fullstack Web Developer",
      en: "Fullstack Web Developer",
    },
    impactBadge: {
      id: "Platform Industri · Sistem Penawaran B2B",
      en: "Industrial Commerce · B2B Inquiry System",
    },
    shortDesc: {
      id: "Platform komersial peralatan teknik & industri berbasis Laravel dengan sistem permintaan penawaran (inquiry) dan panel manajemen produk.",
      en: "Industrial equipment commerce & B2B inquiry platform built with Laravel and MySQL.",
    },
    description: {
      id: "Platform web komersial untuk penyediaan peralatan teknik dan layanan industri. Dibangun dengan Laravel dan MySQL untuk memudahkan klien korporasi menelusuri spesifikasi alat teknik, mengajukan permintaan penawaran (quotation/inquiry), serta memudahkan tim internal mengelola katalog produk.",
      en: "An industrial commerce and product showcase platform built with Laravel and MySQL, enabling corporate clients to browse technical specifications, submit B2B quotation inquiries, and manage equipment listings.",
    },
    tech: ["Laravel", "MySQL", "Bootstrap", "PHP"],
    images: [],
    github: "https://github.com/christian050104/Labtek",
    highlights: {
      id: [
        "Manajemen spesifikasi peralatan industri & katalog layanan teknis",
        "Alur permintaan penawaran (B2B Inquiry) terintegrasi untuk klien perusahaan",
        "Dashboard CMS internal berbasis Laravel & MySQL",
      ],
      en: [
        "Detailed industrial equipment catalog and technical specification management",
        "Integrated B2B quotation & customer inquiry workflow",
        "Role-protected Laravel & MySQL administration dashboard",
      ],
    },
    previewModules: {
      id: ["Katalog Teknik", "Spesifikasi Industri", "Form Penawaran B2B", "Dashboard CMS"],
      en: ["Technical Catalog", "Industrial Specs", "B2B Quote Inquiry", "Admin CMS"],
    },
  },
  {
    id: "compro-ags",
    name: "Compro AGS",
    featured: false,
    category: "Fullstack Web",
    accent: "rose",
    year: "2023",
    imageFolder: "ComproAGS",
    role: {
      id: "Fullstack Web Developer",
      en: "Fullstack Web Developer",
    },
    impactBadge: {
      id: "Digital Branding · CMS Dinamis",
      en: "Corporate Branding · Dynamic CMS",
    },
    shortDesc: {
      id: "Website profil perusahaan (Company Profile) modern untuk AGS dengan manajemen konten layanan, portofolio, dan kontak bisnis.",
      en: "Modern corporate profile website with dynamic service showcase, portfolio management, and lead capture.",
    },
    description: {
      id: "Website Company Profile profesional untuk memperkuat kredibilitas digital AGS. Dilengkapi halaman showcase layanan unggulan, rekam jejak proyek perusahaan, profil tim manajemen, dan sistem pengelolaan pesan klien yang mudah diperbarui oleh tim internal tanpa menyentuh kode.",
      en: "A responsive corporate profile website designed for AGS to showcase core business services, project track records, leadership profiles, and client inquiries — backed by a clean Laravel content management panel.",
    },
    tech: ["Laravel", "MySQL", "TailwindCSS", "PHP"],
    images: [],
    github: "https://github.com/christian050104",
    highlights: {
      id: [
        "Desain responsif berorientasi kredibilitas bisnis dan kecepatan akses",
        "CMS kustom untuk pembaruan portofolio, layanan, dan anggota tim secara mandiri",
        "Manajemen pesan masuk calon mitra & klien langsung dari dashboard",
      ],
      en: [
        "Responsive, credibility-focused corporate presentation and fast page loads",
        "Custom CMS for self-service updates to services, portfolio, and team members",
        "Built-in lead capture and client inquiry management",
      ],
    },
    previewModules: {
      id: ["Profil & Layanan", "Galeri Portofolio", "Manajemen Tim", "Kotak Masuk Klien"],
      en: ["Services Showcase", "Project Portfolio", "Team Directory", "Client Lead Inbox"],
    },
  },
];

export default projects;
