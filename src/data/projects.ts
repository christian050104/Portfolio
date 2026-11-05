export interface BilingualText {
  id: string;
  en: string;
}

export type ProjectCategory = "AI & ML" | "Desktop" | "Web & Mobile" | "Fullstack Web";

export interface ProjectItem {
  id: string;
  name: string;
  featured: boolean;
  dualPortal?: boolean;
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
  if (/(^|[\s_-])(mobile|flutter|android|ios)([\s_.-]|$)/i.test(filename)) {
    return "mobile";
  }
  return "web";
}

export function getWebPortalRole(src: string): "storefront" | "admin" {
  const filename = (src.split("/").pop() || "").toLowerCase();
  const withoutExt = filename.replace(/\.(jpg|jpeg|png|webp|avif|svg)$/i, "").trim();
  if (
    withoutExt.includes("admin") ||
    withoutExt.startsWith("kelola ") ||
    withoutExt.includes("statistik kunjungan") ||
    withoutExt.startsWith("daftar pengunjung") ||
    withoutExt.startsWith("parameter")
  ) {
    return "admin";
  }
  return "storefront";
}

const WORD_FIXES: Record<string, string> = {
  dasboard: "Dashboard",
  dashboard: "Dashboard",
  keseahatran: "Kesehatan",
  kesehatan: "Kesehatan",
  notikasi: "Notifikasi",
  notifikasi: "Notifikasi",
  acitivitas: "Aktivitas",
  aktivitas: "Aktivitas",
  ijin: "Izin",
  izin: "Izin",
  po: "PO",
  faq: "FAQ",
  meta: "SEO Meta",
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
  let cleaned = withoutExt.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();

  // Strip redundant role/project suffixes cleanly while preserving core titles
  cleaned = cleaned
    .replace(/\s+di\s+admin$/i, "")
    .replace(/\s+labtek(?=\s+\d+$|$)/i, "")
    .replace(/^halaman\s+(?=\S+\s+\S+)/i, "");

  if (/^(kelola|statistik|parameter)\b/i.test(cleaned)) {
    cleaned = cleaned.replace(/\s+admin$/i, "");
  }

  const platform = getScreenshotPlatform(src);
  const words = cleaned.split(" ");

  const formattedWords = words
    .map((raw) => {
      const lower = raw.toLowerCase();
      if (WORD_FIXES[lower]) return WORD_FIXES[lower];
      if (/^\d+$/.test(raw)) return `#${raw}`;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .filter((w, _idx, arr) => {
      if (arr.length > 2 && (w === "Web" || w === "Mobile")) {
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
    dualPortal: true,
    category: "Fullstack Web",
    accent: "blue",
    year: "2024",
    imageFolder: "Labverse",
    role: {
      id: "Fullstack Web Developer",
      en: "Fullstack Web Developer",
    },
    impactBadge: {
      id: "20 Layar Sistem · Storefront Pelanggan & Backoffice Admin",
      en: "20 System Screens · Customer Storefront & E-Commerce Admin",
    },
    shortDesc: {
      id: "Ekosistem e-commerce instrumen laboratorium & pendidikan yang memadukan Storefront Pelanggan (filter harga/kategori & keranjang) dengan Panel Admin lengkap.",
      en: "End-to-end laboratory & educational equipment e-commerce uniting a Customer Storefront with a full revenue, order, and promo Admin Backoffice.",
    },
    description: {
      id: "Labverse adalah platform e-commerce B2B/B2C khusus peralatan pendidikan dan instrumen laboratorium berbasis Laravel, MySQL, dan Tailwind CSS. Hadir dengan dua portal terintegrasi: Portal Pelanggan untuk penelusuran katalog multi-filter (rentang harga, kategori/subkategori SMK hingga Perguruan Tinggi) serta keranjang belanja, dan Panel Admin komprehensif untuk memantau pendapatan (income), verifikasi pembayaran, status pesanan, kampanye Big Sales, layanan kurir pengiriman, serta statistik kunjungan.",
      en: "Labverse is a B2B/B2C e-commerce platform for scientific and educational laboratory equipment built with Laravel, MySQL, and Tailwind CSS. It features two integrated portals: a Customer Storefront with price-range & multi-tier category filtering and cart checkout, paired with an Admin Backoffice tracking total revenue, payment verifications, order fulfillment, Big Sales campaigns, shipping services, and visitor analytics.",
    },
    challenge: {
      id: "Pengadaan alat laboratorium pendidikan memiliki rentang spesifikasi serta nominal transaksi besar yang menuntut transparansi stok, verifikasi pembayaran, dan pelacakan pengiriman.",
      en: "Educational and scientific equipment procurement involves high-value orders requiring multi-tier catalog filtering, payment verification, and structured fulfillment.",
    },
    solution: {
      id: "Membangun arsitektur dua portal (Storefront Pelanggan + Backoffice Admin) di Laravel & MySQL yang menyatukan katalog terfilter, promo Big Sales, konfirmasi pembayaran, dan analitik penjualan.",
      en: "Engineered a dual-portal Laravel & MySQL platform uniting a filtered customer storefront with an admin backoffice for payment approval, shipping config, and live revenue analytics.",
    },
    tech: ["Laravel", "MySQL", "TailwindCSS", "PHP"],
    images: [
      // Portal Pelanggan / Storefront (6 Layar)
      "/Labverse/dashboard labverse.png",
      "/Labverse/halaman dashboard user terdaftar.png",
      "/Labverse/product labverse.png",
      "/Labverse/belanja produk.png",
      "/Labverse/keranjang.png",
      "/Labverse/login.png",
      // Panel Admin E-Commerce (14 Layar)
      "/Labverse/dashboard admin 2.png",
      "/Labverse/dashboard admin 1.png",
      "/Labverse/statistik kunjungan admin.png",
      "/Labverse/kelola pesanan admin.png",
      "/Labverse/kelola pembayaran admin.png",
      "/Labverse/kelola produk admin.png",
      "/Labverse/kelola kategori admin.png",
      "/Labverse/kelola subkategori admin.png",
      "/Labverse/kelola big sales.png",
      "/Labverse/kelola shipping service admin.png",
      "/Labverse/kelola user admin.png",
      "/Labverse/kelola sliders.png",
      "/Labverse/kelola faq admin.png",
      "/Labverse/parameter admin.png",
    ],
    github: "https://github.com/christian050104/Labverse",
    highlights: {
      id: [
        "Portal Pelanggan responsif dengan filter rentang harga, kategori/subkategori, dan keranjang belanja",
        "Dashboard Admin real-time yang merangkum total pendapatan (income), status pembayaran, dan antrean pesanan",
        "Manajemen kampanye promosi Big Sales, banner slider dinamis, dan pengaturan layanan kurir pengiriman",
        "Pemantauan statistik kunjungan website serta pengelolaan pengguna, FAQ, dan parameter sistem",
      ],
      en: [
        "Customer Storefront featuring price-range filters, multi-level categories, and cart workflows",
        "Real-time Admin Dashboard tracking total income, payment verifications, and order queues",
        "Built-in Big Sales campaign manager, dynamic hero sliders, and shipping service configuration",
        "Visitor traffic analytics alongside customer management, FAQ CMS, and system parameters",
      ],
    },
    previewModules: {
      id: ["Storefront Alat Lab", "Dashboard Income & Order", "Promo Big Sales", "Statistik Kunjungan"],
      en: ["Lab Storefront", "Income & Order Admin", "Big Sales Engine", "Visitor Analytics"],
    },
  },
  {
    id: "labtek",
    name: "Labtek",
    featured: false,
    dualPortal: true,
    category: "Fullstack Web",
    accent: "amber",
    year: "2024",
    imageFolder: "Labtek",
    role: {
      id: "Fullstack Web Developer",
      en: "Fullstack Web Developer",
    },
    impactBadge: {
      id: "18 Layar Sistem · E-Commerce Industri, Flash Sale & Backoffice",
      en: "18 System Screens · Industrial Commerce, Flash Sale & Admin",
    },
    shortDesc: {
      id: "Platform komersial peralatan teknik & industri dengan fitur Flash Sale di sisi pelanggan serta dashboard kendali transaksi, pembayaran, dan analitik di sisi Admin.",
      en: "Industrial equipment commerce platform pairing a Flash Sale customer portal with a complete transaction, payment, and analytics Admin Backoffice.",
    },
    description: {
      id: "Labtek adalah platform e-commerce peralatan teknik dan solusi industri berbasis Laravel dan MySQL yang dirancang untuk transaksi skala ritel maupun institusi. Mencakup Portal Pelanggan Terdaftar (pencarian katalog teknik, hitung mundur Flash Sale, wishlist, dan keranjang belanja) serta Panel Admin menyeluruh dengan peringatan antrean pesanan otomatis, rekapitulasi pendapatan, verifikasi pembayaran, manajemen Big Sales, kurir pengiriman, dan analitik pengunjung.",
      en: "Labtek is an industrial equipment commerce platform built with Laravel and MySQL for institutional and corporate buyers. It combines a Registered Customer Portal (technical catalog search, Flash Sale countdowns, wishlist, and cart) with a comprehensive Admin Dashboard featuring automated order-approval alerts, revenue & payment tracking, Big Sales promotions, shipping management, and traffic statistics.",
    },
    challenge: {
      id: "Penjualan peralatan teknik bernilai tinggi membutuhkan pemantauan status pesanan yang ketat mulai dari persetujuan order, konfirmasi pembayaran, hingga pengiriman.",
      en: "High-value engineering equipment commerce demands strict visibility across order approval, payment confirmation, and shipping stages.",
    },
    solution: {
      id: "Merancang sistem notifikasi antrean pesanan berwarna di Dashboard Admin yang terhubung langsung dengan portal belanja pelanggan, modul pembayaran, dan manajemen stok.",
      en: "Built an alert-driven Admin Backoffice tightly synchronized with the customer storefront, payment verification logs, and multi-category product master data.",
    },
    tech: ["Laravel", "MySQL", "Bootstrap", "PHP"],
    images: [
      // Portal Pelanggan / Storefront (4 Layar)
      "/Labtek/dashboard user terdaftar.png",
      "/Labtek/produk di user.png",
      "/Labtek/keranjang user.png",
      "/Labtek/Login Labtek.png",
      // Panel Admin E-Commerce (14 Layar)
      "/Labtek/dashboard admin labtek 2.png",
      "/Labtek/dashboard admin labtek 1.png",
      "/Labtek/statistik kunjungan.png",
      "/Labtek/kelola pesanan admin labtek.png",
      "/Labtek/kelola pembayaran admin labtek.png",
      "/Labtek/kelola produk admin labtek.png",
      "/Labtek/kelola kategori.png",
      "/Labtek/kelola subkategori.png",
      "/Labtek/kelola big sales admin labtek.png",
      "/Labtek/kelola shipping services.png",
      "/Labtek/kelola user management admin labtek.png",
      "/Labtek/kelola sliders admin labtek.png",
      "/Labtek/kelola faq.png",
      "/Labtek/kelola parameter.png",
    ],
    github: "https://github.com/christian050104/Labtek",
    highlights: {
      id: [
        "Portal Pelanggan Terdaftar dengan fitur pencarian produk teknik, Flash Sale, dan keranjang belanja",
        "Dashboard Admin ganda: kartu peringatan status pesanan mendesak serta rekapitulasi pendapatan & pembayaran",
        "Pengelolaan katalog produk, kategori, subkategori, promo Big Sales, dan layanan pengiriman",
        "Modul manajemen pengguna (user management), statistik kunjungan harian, slider promosi, dan FAQ",
      ],
      en: [
        "Registered Customer Portal with technical catalog filtering, Flash Sale promos, and cart checkout",
        "Dual-view Admin Dashboard featuring actionable order-queue alerts and live income/payment logs",
        "End-to-end management for products, categories, subcategories, Big Sales, and shipping carriers",
        "Built-in user management, visitor traffic analytics, promotional sliders, and FAQ CMS",
      ],
    },
    previewModules: {
      id: ["Storefront & Flash Sale", "Monitor Antrean Order", "Verifikasi Pembayaran", "Analitik Kunjungan"],
      en: ["Flash Sale Storefront", "Order Queue Monitor", "Payment Verification", "Traffic Analytics"],
    },
  },
  {
    id: "compro-ags",
    name: "Compro AGS",
    featured: false,
    dualPortal: true,
    category: "Fullstack Web",
    accent: "rose",
    year: "2024",
    imageFolder: "ComproAGS",
    role: {
      id: "Fullstack Web Developer",
      en: "Fullstack Web Developer",
    },
    impactBadge: {
      id: "27 Layar Sistem · Portal Korporasi & Alur Pengadaan B2B",
      en: "27 System Screens · Corporate Portal & B2B Procurement ERP",
    },
    shortDesc: {
      id: "Portal korporasi PT Arkamaya Guna Saharsa yang terintegrasi dengan sistem pengadaan B2B lengkap (Quotation, Negosiasi, PO, Proforma Invoice, hingga Tiket Layanan).",
      en: "Corporate portal for PT Arkamaya Guna Saharsa integrated with a full B2B procurement backoffice (Quotation, Negotiation, PO, Proforma Invoice, & Service Ticketing).",
    },
    description: {
      id: "Compro AGS adalah ekosistem web korporasi dan manajemen bisnis B2B untuk PT Arkamaya Guna Saharsa. Di sisi depan, menyajikan Portal Publik modern multibahasa untuk profil perusahaan, katalog peralatan uji laboratorium, dan aktivitas korporasi. Di sisi belakang, dilengkapi 22 modul Panel Admin B2B untuk menangani siklus pengadaan end-to-end: Permintaan Quotation, Negosiasi Harga, Purchase Order (PO), Proforma Invoice, Invoice, Tiket Layanan purnajual, manajemen Distributor & Member, hingga optimasi SEO Meta.",
      en: "Compro AGS is a dual-portal corporate showcase and B2B procurement system built for PT Arkamaya Guna Saharsa. Its public portal presents multilingual company credentials, laboratory testing equipment catalogs, and corporate activities, while its 22-screen Admin Backoffice powers the complete B2B deal lifecycle: Quotation Requests, Price Negotiation, Purchase Orders (PO), Proforma Invoices, Final Invoices, Service Ticketing, Distributor/Member directories, and SEO Meta CMS.",
    },
    challenge: {
      id: "Perusahaan penyedia alat laboratorium & rekayasa teknik membutuhkan website korporasi yang kredibel sekaligus mampu mengelola alur negosiasi dan dokumen pengadaan B2B yang kompleks.",
      en: "B2B engineering & lab equipment suppliers need both a credible public corporate presence and a structured backoffice for multi-step quotation, negotiation, PO, and invoicing.",
    },
    solution: {
      id: "Mengintegrasikan Company Profile dinamis dengan Backoffice Pengadaan B2B 22 modul di Laravel & MySQL — mencakup alur Quotation hingga Invoice, Tiketing Layanan, dan analitik pengunjung.",
      en: "Unified a dynamic corporate web portal with a 22-module Laravel & MySQL B2B backoffice covering Quotations, Negotiations, POs, Proforma/Final Invoices, Service Tickets, and SEO CMS.",
    },
    tech: ["Laravel", "MySQL", "TailwindCSS", "PHP"],
    images: [
      // Portal Publik & Pelanggan (5 Layar)
      "/ComproAGS/dashboard user.png",
      "/ComproAGS/about user.png",
      "/ComproAGS/product user.png",
      "/ComproAGS/acitivitas user.png",
      "/ComproAGS/login.png",
      // Panel Admin B2B & CMS (22 Layar)
      "/ComproAGS/dashboard admin.png",
      "/ComproAGS/kelola permintaan quotation di admin.png",
      "/ComproAGS/kelola negosiasi di admin.png",
      "/ComproAGS/kelola po di admin.png",
      "/ComproAGS/kelola proforma invoice di admin.png",
      "/ComproAGS/kelola daftar invoice di admin.png",
      "/ComproAGS/kelola tiket layanan di admin.png",
      "/ComproAGS/kelola daftar produk di admin.png",
      "/ComproAGS/kelola kategori di admin.png",
      "/ComproAGS/kelola merek di admin.png",
      "/ComproAGS/kelola distributor di admin.png",
      "/ComproAGS/kelola member di admin.png",
      "/ComproAGS/daftar pengunjung di admin.png",
      "/ComproAGS/kelola guest messages di admin.png",
      "/ComproAGS/kelola pertanyaan di admin.png",
      "/ComproAGS/kelola aktivitas di admin.png",
      "/ComproAGS/kelola semua slider di admin.png",
      "/ComproAGS/kelola bidang perusahaan di admin.png",
      "/ComproAGS/kelola lokasi di admin.png",
      "/ComproAGS/kelola parameter perusahaan di admin.png",
      "/ComproAGS/kelola daftar meta di admin.png",
      "/ComproAGS/kelola admin di admin.png",
    ],
    github: "https://github.com/christian050104/Compro_Arkamaya_Guna_Saharsa",
    highlights: {
      id: [
        "Siklus pengadaan B2B terpadu: Permintaan Quotation → Negosiasi → Purchase Order (PO) → Proforma Invoice → Invoice",
        "Portal Publik korporasi multibahasa dengan katalog produk, aktivitas perusahaan, dan integrasi kontak cepat",
        "Sistem Tiket Layanan (Service Ticketing), pengelolaan jaringan Distributor, Member, dan kotak masuk pesan klien",
        "CMS mandiri lengkap: manajemen banner slider, profil & lokasi perusahaan, analitik pengunjung harian, serta SEO Meta",
      ],
      en: [
        "End-to-end B2B procurement pipeline: Quotation Requests → Price Negotiation → Purchase Orders (PO) → Proforma & Final Invoices",
        "Multilingual corporate public portal showcasing products, company activities, and instant lead capture",
        "Built-in Service Ticketing system, Distributor & Member management, and guest inquiry inbox",
        "Full self-service CMS with hero sliders, company parameters, daily visitor charts, and custom SEO Meta controls",
      ],
    },
    previewModules: {
      id: ["Portal Korporasi", "Quotation & Negosiasi B2B", "PO & Proforma Invoice", "Tiket Layanan & CMS"],
      en: ["Corporate Portal", "B2B Quote & Negotiation", "PO & Proforma Invoice", "Service Tickets & CMS"],
    },
  },
];

export default projects;
