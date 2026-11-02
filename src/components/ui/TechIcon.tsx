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
} from "react-icons/si";
import {
  LuCpu,
  LuGlobe,
  LuRadio,
  LuScanFace,
  LuServer,
  LuCode,
  LuLayers,
} from "react-icons/lu";

export interface TechMeta {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const TECH_MAP: Record<string, TechMeta> = {
  Laravel: { icon: SiLaravel, color: "text-red-500" },
  "Laravel (PHP)": { icon: SiLaravel, color: "text-red-500" },
  Django: { icon: SiDjango, color: "text-emerald-500" },
  "Django (Python)": { icon: SiDjango, color: "text-emerald-500" },
  "Express.js": { icon: SiExpress, color: "text-amber-400" },
  Express: { icon: SiExpress, color: "text-amber-400" },
  "Node.js": { icon: SiNodedotjs, color: "text-green-500" },
  "React.js": { icon: SiReact, color: "text-cyan-400" },
  React: { icon: SiReact, color: "text-cyan-400" },
  "Next.js": { icon: SiNextdotjs, color: "text-sky-400" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "text-cyan-400" },
  TailwindCSS: { icon: SiTailwindcss, color: "text-cyan-400" },
  TypeScript: { icon: SiTypescript, color: "text-blue-500" },
  Python: { icon: SiPython, color: "text-yellow-400" },
  TensorFlow: { icon: SiTensorflow, color: "text-orange-500" },
  "TensorFlow / OpenCV": { icon: SiTensorflow, color: "text-orange-500" },
  OpenCV: { icon: SiOpencv, color: "text-rose-400" },
  "DeepFace / FaceNet": { icon: LuScanFace, color: "text-violet-400" },
  "Face Recognition": { icon: LuScanFace, color: "text-violet-400" },
  CNN: { icon: LuCpu, color: "text-purple-400" },
  "CNN / Deep Learning": { icon: LuCpu, color: "text-purple-400" },
  Electron: { icon: SiElectron, color: "text-cyan-300" },
  "Electron.js": { icon: SiElectron, color: "text-cyan-300" },
  Flutter: { icon: SiFlutter, color: "text-sky-400" },
  Dart: { icon: SiDart, color: "text-blue-400" },
  "Socket.IO": { icon: SiSocketdotio, color: "text-emerald-400" },
  FFmpeg: { icon: SiFfmpeg, color: "text-green-500" },
  WebRTC: { icon: SiWebrtc, color: "text-amber-400" },
  "WebRTC / RTMP": { icon: SiWebrtc, color: "text-amber-400" },
  RTMP: { icon: LuRadio, color: "text-rose-400" },
  HLS: { icon: LuGlobe, color: "text-teal-400" },
  PostgreSQL: { icon: SiPostgresql, color: "text-sky-500" },
  MySQL: { icon: SiMysql, color: "text-blue-400" },
  SQLite: { icon: SiSqlite, color: "text-sky-400" },
  PHP: { icon: SiPhp, color: "text-indigo-400" },
  Flask: { icon: SiFlask, color: "text-teal-400" },
  Bootstrap: { icon: SiBootstrap, color: "text-purple-500" },
  "REST API": { icon: LuServer, color: "text-cyan-400" },
  "REST API Design": { icon: LuServer, color: "text-cyan-400" },
  "Git & GitHub": { icon: SiGit, color: "text-orange-500" },
  GitHub: { icon: SiGithub, color: "text-slate-400" },
  "Cross-Platform Apps": { icon: LuLayers, color: "text-indigo-400" },
};

export function getTechMeta(name: string): TechMeta {
  return TECH_MAP[name] ?? { icon: LuCode, color: "text-cyan-400" };
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

