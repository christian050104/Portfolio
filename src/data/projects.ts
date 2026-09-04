const projects = [
  // ===== FEATURED / FLAGSHIP PROJECTS =====
  {
    name: "Facel",
    featured: true,
    role: "Fullstack & AI Developer",
    shortDesc: "Real-time face recognition system with AI-powered attendance & access control.",
    description:
      "Facel is a comprehensive face recognition platform built for attendance management and access control. It leverages deep learning models for accurate real-time face detection and recognition through a live camera feed. The system features a React-based admin dashboard for managing identities, reviewing attendance logs, and controlling access rules. The backend, powered by Django and Python, handles model inference, REST API endpoints, and database management.",
    tech: ["Python", "Django", "React.js", "OpenCV", "DeepFace / FaceNet", "PostgreSQL", "REST API", "TailwindCSS"],
    images: [
      "/projects/facel/facel1.png",
      "/projects/facel/facel2.png",
      "/projects/facel/facel3.png",
    ],
    github: "https://github.com/christian050104",
    category: "AI/ML",
    highlights: [
      "Real-time face detection & recognition via webcam",
      "AI model integration (DeepFace / FaceNet) for high accuracy",
      "Admin dashboard for identity management & attendance logs",
      "Access control rules & reporting system",
      "Django REST API backend with PostgreSQL",
    ],
  },
  {
    name: "EduSphere",
    featured: true,
    role: "Fullstack Desktop Developer",
    shortDesc: "Cross-platform EdTech desktop app delivering interactive learning with real-time features.",
    description:
      "EduSphere is a full-featured EdTech desktop application built with Electron, React, and Express.js. It provides an immersive learning environment with video-based content, interactive quizzes, progress tracking, and real-time communication between students and instructors. The app works completely offline after initial sync, making it accessible in low-connectivity environments.",
    tech: ["Electron", "React.js", "Express.js", "Node.js", "Socket.IO", "SQLite", "TailwindCSS"],
    images: [
      "/projects/edusphere/edusphere1.png",
      "/projects/edusphere/edusphere2.png",
      "/projects/edusphere/edusphere3.png",
    ],
    github: "https://github.com/christian050104",
    category: "Desktop",
    highlights: [
      "Cross-platform desktop app (Windows, macOS, Linux) via Electron",
      "Video-based learning with progress tracking",
      "Real-time student-instructor communication with Socket.IO",
      "Offline-capable with local SQLite database",
      "Interactive quizzes & certification system",
    ],
  },
  {
    name: "SnapStream",
    featured: true,
    role: "Desktop & Backend Developer",
    shortDesc: "Professional live streaming & recording desktop app with real-time broadcasting.",
    description:
      "SnapStream is a powerful live streaming and screen recording desktop application built with Electron and Express.js. It enables users to broadcast live video to multiple platforms simultaneously, record sessions locally, and manage stream settings — all from a single clean interface. The backend handles RTMP stream routing, HLS output generation, and real-time stream health monitoring.",
    tech: ["Electron", "Express.js", "Node.js", "WebRTC", "RTMP", "HLS", "Socket.IO", "FFmpeg"],
    images: [
      "/projects/snapstream/snap1.png",
      "/projects/snapstream/snap2.png",
      "/projects/snapstream/snap3.png",
    ],
    github: "https://github.com/christian050104",
    category: "Desktop",
    highlights: [
      "Live streaming to multiple platforms simultaneously (RTMP)",
      "Screen & webcam recording with FFmpeg",
      "Real-time stream health monitoring via Socket.IO",
      "HLS output for web-compatible playback",
      "Clean Electron-based desktop UI",
    ],
  },

  // ===== OTHER PROJECTS =====
  {
    name: "Sistem Monitoring Kesehatan Sapi",
    featured: false,
    role: "Fullstack Developer",
    shortDesc: "Livestock health monitoring system with Django backend, React frontend & Flutter mobile app.",
    description:
      "A comprehensive livestock health monitoring platform combining web and mobile applications. The system tracks cattle health indicators, generates alerts for abnormal conditions, and provides analytics for farm managers.",
    tech: ["Django", "React.js", "Flutter", "PostgreSQL", "REST API"],
    images: [
      "/projects/monitoring/monitoring1.png",
      "/projects/monitoring/monitoring2.png",
      "/projects/monitoring/monitoring3.png",
    ],
    github: "https://github.com/christian050104/Klasifikasi-Kotoran-Ayam",
    category: "Web",
    highlights: [],
  },
  {
    name: "Labverse",
    featured: false,
    role: "Web Developer",
    shortDesc: "E-commerce platform for laboratory products built with Laravel.",
    description:
      "A full-featured e-commerce platform for laboratory equipment and supplies. Built with Laravel, it includes product catalog, cart, checkout, and order management.",
    tech: ["Laravel", "MySQL", "TailwindCSS", "PHP"],
    images: ["/projects/labverse/labverse1.png", "/projects/labverse/labverse2.png"],
    github: "https://github.com/christian050104",
    category: "Web",
    highlights: [],
  },
  {
    name: "Labtek",
    featured: false,
    role: "Web Developer",
    shortDesc: "Industrial e-commerce platform built with Laravel.",
    description:
      "An industrial e-commerce platform for technical equipment and services, featuring product management, inquiry system, and admin panel.",
    tech: ["Laravel", "MySQL", "Bootstrap", "PHP"],
    images: ["/projects/labtek/labtek1.png", "/projects/labtek/labtek2.png"],
    github: "https://github.com/christian050104",
    category: "Web",
    highlights: [],
  },
  {
    name: "Compro AGS",
    featured: false,
    role: "Fullstack Developer",
    shortDesc: "Company profile website for AGS, built with Laravel.",
    description:
      "A professional company profile website for AGS featuring services showcase, portfolio, team members, and contact management.",
    tech: ["Laravel", "MySQL", "TailwindCSS", "PHP"],
    images: ["/projects/ags/ags1.png", "/projects/ags/ags2.png"],
    github: "https://github.com/christian050104",
    category: "Web",
    highlights: [],
  },
  {
    name: "Klasifikasi Kotoran Ayam",
    featured: false,
    role: "Machine Learning Developer",
    shortDesc: "CNN-based image classification for chicken feces health analysis.",
    description:
      "A machine learning application using Convolutional Neural Networks to classify chicken feces images for poultry health monitoring. Flask backend serves the model predictions via REST API.",
    tech: ["Python", "TensorFlow", "CNN", "Flask", "OpenCV"],
    images: ["/projects/chicken/chicken1.png", "/projects/chicken/chicken2.png"],
    github: "https://github.com/christian050104/Klasifikasi-Kotoran-Ayam",
    category: "AI/ML",
    highlights: [],
  },
];

export default projects;
