"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ImageModalProps {
  images: string[];
  index: number;
  onClose: () => void;
}

export default function ImageModal({ images, index: initialIndex, onClose }: ImageModalProps) {
  const [index, setIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  const total = images.length;

  // ---------------------------
  // Keyboard Controls
  // ---------------------------
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [index]);

  // ---------------------------
  // Navigation
  // ---------------------------
  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  // ---------------------------
  // Fullscreen Toggle
  // ---------------------------
  const toggleFullscreen = () => {
    setIsFullscreen((f) => !f);
  };

  // ---------------------------
  // Swipe Gesture (mobile)
  // ---------------------------
  let touchStartX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 50) prev();
    if (diff < -50) next();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative max-w-[90vw] max-h-[90vh] w-full transition-all duration-300 
          ${isFullscreen ? "max-w-full max-h-full" : ""}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/60 text-white px-4 py-1 rounded-md z-50 hover:bg-black/80"
        >
          ✕ Close
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-3 left-3 bg-black/60 text-white px-4 py-1 rounded-md z-50 hover:bg-black/80"
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full text-lg z-50 hover:bg-black/80"
        >
          ←
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full text-lg z-50 hover:bg-black/80"
        >
          →
        </button>

        {/* Main Image */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex items-center justify-center"
        >
          <Image
            ref={imageRef}
            src={images[index]}
            alt="Preview"
            width={1600}
            height={1200}
            className="rounded-lg shadow-xl object-contain max-h-[80vh] transition-all duration-300"
          />
        </div>

        {/* Thumbnail Strip */}
        <div className="flex gap-2 overflow-x-auto py-3 mt-3 px-2 bg-black/40 rounded-lg">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`border rounded-md overflow-hidden flex-shrink-0 
                ${i === index ? "border-emerald-400" : "border-transparent"}`}
            >
              <Image
                src={img}
                alt="thumbnail"
                width={80}
                height={60}
                className="object-cover opacity-80 hover:opacity-100 transition"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
