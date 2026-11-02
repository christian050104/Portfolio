import type { Metadata } from "next";
import "./globals.css";
import { AppPreferencesProvider } from "@/context/AppPreferencesContext";

export const metadata: Metadata = {
  title: "Christian Jhon Pranata Panjaitan | Fullstack, Desktop & AI Engineer",
  description:
    "Portfolio of Christian Jhon Pranata Panjaitan — Fullstack Software Engineer specializing in AI Face Recognition (FaceLog), Cross-Platform Desktop EdTech (EduSphere), Live Streaming Systems (SnapStream), Web & Mobile Applications.",
  keywords: [
    "Christian Jhon Pranata Panjaitan",
    "Fullstack Developer Indonesia",
    "Software Engineer",
    "Laravel Developer",
    "Django Developer",
    "React Developer",
    "Electron Desktop Developer",
    "Flutter Developer",
    "AI Face Recognition Engineer",
  ],
  openGraph: {
    title: "Christian Jhon Pranata Panjaitan | Fullstack, Desktop & AI Engineer",
    description:
      "End-to-end Software Engineer building AI systems, cross-platform desktop suites, real-time streaming apps, and fullstack web/mobile solutions.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AppPreferencesProvider>{children}</AppPreferencesProvider>
      </body>
    </html>
  );
}
