import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christian Jhon Pranata Panjaitan | Fullstack Developer",
  description:
    "Portfolio of Christian Jhon Pranata Panjaitan — Fullstack Developer specializing in Face Recognition, EdTech, Live Streaming, Web, Mobile & Desktop applications. Laravel, Django, React, Flutter, Express, Electron.",
  keywords: "Fullstack Developer, Laravel, Django, React, Flutter, Electron, Face Recognition, Portfolio",
  openGraph: {
    title: "Christian Jhon Pranata Panjaitan | Fullstack Developer",
    description: "Building modern applications across Web, Mobile, Desktop & AI",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050810] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
