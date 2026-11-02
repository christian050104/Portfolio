# Christian Jhon Pranata Panjaitan — Software Engineering Portfolio

Modern, recruiter-focused interactive portfolio showcasing end-to-end systems across **AI & Computer Vision**, **Cross-Platform Desktop (Electron)**, **Real-time Live Streaming**, **Fullstack Web**, and **Mobile (Flutter)**.

## Key Highlights

- **Bilingual Experience (`ID` / `EN`)**: Instant language toggle in the navigation bar tailored for both Indonesian HRD teams and international recruiters.
- **Dual Comfort Theme (`Dark Bento` & `Light Comfort`)**: Smooth theme switching engineered with semantic CSS variables for high contrast and zero eye strain.
- **Built-in Executive CV / Resume Preview**: Interactive 1-page structured resume modal with print-to-PDF support (`@media print`) and optional `/public/cv.pdf` direct download.
- **Flagship Case Studies & Filterable Archive**:
  - **FaceLog** — Real-time AI Face Recognition Attendance System deployed on **IFP (Interactive Flat Panel)** & Kiosk Scanner units (Python, Django, OpenCV, FaceNet, React, PostgreSQL)
  - **EduSphere (LabBahasa)** — 34-Screen Cross-Platform EdTech Desktop Suite with Classroom Device Control (Electron, React, Express, Socket.IO, SQLite)
  - **SnapStream** — Multi-RTMP Live Broadcasting & FFmpeg Recording Studio deployed live on the **Video Wall** infrastructure alongside **Paperless Conference System** installation at **UPN Surabaya** (Electron, Express, WebRTC, FFmpeg, HLS)
  - Plus B2B/B2C E-Commerce (Labverse, Labtek), Corporate Portals (Compro AGS), and DairyTrack Livestock Health Monitoring (Web + Flutter).
- **Recruiter Fast-Actions**: 1-click Copy Email with toast feedback, pre-formatted Gmail Web inquiry composer, and direct LinkedIn/GitHub integration.

## Tech Stack

- **Framework**: Next.js 16 (App Router) & React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + Semantic CSS Custom Properties
- **Icons**: `react-icons` (Lucide UI & Simple Icons Brand Marks)

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

> **Optional Static PDF CV**: Place a PDF file named `cv.pdf` inside `public/cv.pdf` to automatically enable direct PDF file downloads alongside the interactive print-ready CV modal.
