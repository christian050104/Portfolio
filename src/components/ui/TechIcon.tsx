"use client";

import React from "react";
import {
  SiLaravel,
  SiDjango,
  SiExpress,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPython,
  SiTensorflow,
  SiOpencv,
  SiElectron,
  SiFlutter,
  SiDart,
  SiSocketdotio,
  SiFfmpeg,
  SiWebrtc,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiPhp,
  SiFlask,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiBootstrap,
  SiSpringboot,
  SiMongodb,
  SiRedis,
  SiJenkins,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import {
  LuCpu,
  LuGlobe,
  LuRadio,
  LuScanFace,
  LuServer,
  LuCode,
  LuLayers,
  LuRefreshCw,
} from "react-icons/lu";

export interface TechMeta {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const TECH_MAP: Record<string, TechMeta> = {
  Java: { icon: FaJava, color: "text-red-600 dark:text-orange-400" },
  "Spring Boot": { icon: SiSpringboot, color: "text-green-600 dark:text-green-500" },
  "Java Spring Boot": { icon: SiSpringboot, color: "text-green-600 dark:text-green-500" },
  Laravel: { icon: SiLaravel, color: "text-red-500" },
  "Laravel (PHP)": { icon: SiLaravel, color: "text-red-500" },
  Django: { icon: SiDjango, color: "text-emerald-500" },
  "Django (Python)": { icon: SiDjango, color: "text-emerald-500" },
  "Express.js": { icon: SiExpress, color: "theme-heading" },
  Express: { icon: SiExpress, color: "theme-heading" },
  "Node.js": { icon: SiNodedotjs, color: "text-green-600 dark:text-green-500" },
  "React.js": { icon: SiReact, color: "text-sky-500" },
  React: { icon: SiReact, color: "text-sky-500" },
  "Next.js": { icon: SiNextdotjs, color: "theme-heading" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "text-sky-500" },
  TailwindCSS: { icon: SiTailwindcss, color: "text-sky-500" },
  TypeScript: { icon: SiTypescript, color: "text-blue-600 dark:text-blue-500" },
  Python: { icon: SiPython, color: "text-amber-500" },
  TensorFlow: { icon: SiTensorflow, color: "text-orange-500" },
  "TensorFlow / OpenCV": { icon: SiTensorflow, color: "text-orange-500" },
  OpenCV: { icon: SiOpencv, color: "text-blue-600 dark:text-blue-400" },
  "DeepFace / FaceNet": { icon: LuScanFace, color: "theme-cyan-text" },
  "Face Recognition": { icon: LuScanFace, color: "theme-cyan-text" },
  CNN: { icon: LuCpu, color: "theme-cyan-text" },
  "CNN / Deep Learning": { icon: LuCpu, color: "theme-cyan-text" },
  Electron: { icon: SiElectron, color: "text-sky-600 dark:text-sky-400" },
  "Electron.js": { icon: SiElectron, color: "text-sky-600 dark:text-sky-400" },
  Flutter: { icon: SiFlutter, color: "text-sky-500" },
  Dart: { icon: SiDart, color: "text-blue-500" },
  "Socket.IO": { icon: SiSocketdotio, color: "theme-heading" },
  FFmpeg: { icon: SiFfmpeg, color: "text-green-600 dark:text-green-500" },
  WebRTC: { icon: SiWebrtc, color: "text-amber-500" },
  "WebRTC / RTMP": { icon: SiWebrtc, color: "text-amber-500" },
  RTMP: { icon: LuRadio, color: "theme-cyan-text" },
  HLS: { icon: LuGlobe, color: "theme-cyan-text" },
  PostgreSQL: { icon: SiPostgresql, color: "text-blue-600 dark:text-sky-500" },
  MySQL: { icon: SiMysql, color: "text-blue-600 dark:text-blue-400" },
  MongoDB: { icon: SiMongodb, color: "text-emerald-600 dark:text-emerald-500" },
  Redis: { icon: SiRedis, color: "text-red-600 dark:text-red-500" },
  SQLite: { icon: SiSqlite, color: "text-sky-600 dark:text-sky-400" },
  PHP: { icon: SiPhp, color: "text-indigo-600 dark:text-indigo-400" },
  Flask: { icon: SiFlask, color: "theme-heading" },
  Bootstrap: { icon: SiBootstrap, color: "text-purple-600 dark:text-purple-500" },
  "REST API": { icon: LuServer, color: "theme-cyan-text" },
  "RESTful API": { icon: LuServer, color: "theme-cyan-text" },
  "REST API Design": { icon: LuServer, color: "theme-cyan-text" },
  "Jenkins (CI/CD)": { icon: SiJenkins, color: "text-rose-600 dark:text-rose-400" },
  Jenkins: { icon: SiJenkins, color: "text-rose-600 dark:text-rose-400" },
  "Agile / Scrum": { icon: LuRefreshCw, color: "theme-cyan-text" },
  "Git & GitHub": { icon: SiGit, color: "text-orange-500" },
  GitHub: { icon: SiGithub, color: "theme-heading" },
  "Cross-Platform Apps": { icon: LuLayers, color: "theme-cyan-text" },
};

export function getTechMeta(name: string): TechMeta {
  return TECH_MAP[name] ?? { icon: LuCode, color: "theme-cyan-text" };
}

export default function TechIcon({
  name,
  className = "w-4 h-4",
  colored = true,
}: {
  name: string;
  className?: string;
  colored?: boolean;
}) {
  const meta = getTechMeta(name);
  const Icon = meta.icon;
  return <Icon className={`${className} ${colored ? meta.color : ""}`} />;
}

