import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Christian Jhon Pranata Panjaitan | Fullstack Developer",
  description:
    "Portfolio of Christian Jhon Pranata Panjaitan — Fullstack Developer specializing in Laravel, Django, React, Flutter, Express, and Electron.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
