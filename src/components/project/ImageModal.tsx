"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ImageModalProps {
  images: string[];
  index: number;
  onClose: () => void;
}

export default function ImageModal({ images, index: initialIndex, onClose }: ImageModalProps) {
  const [index, setIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);

  const total = images.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard Navigation & Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e. key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };

    // Prevent body scroll
    document. body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKey);
    };
  }, [index]);

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  // Touch Swipe for Mobile
  let touchStartX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0]. clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 50) prev();
    if (diff < -50) next();
  };

  if (!mounted) return null;

  const modalContent = (
    <>
      {/* Backdrop with smooth fade */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/95 backdrop-blur-xl animate-fade-in"
        style={{ animation: "fadeIn 0.3s ease-out" }}
      />

      {/* Modal Container */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
        style={{ animation: "modalSlideIn 0.4s ease-out" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-[10001] bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-2xl pointer-events-auto hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Close (ESC)
        </button>

        {/* Image Counter */}
        <div className="fixed top-6 left-6 z-[10001] bg-black/80 text-white px-5 py-3 rounded-xl backdrop-blur-md border border-white/10 font-semibold pointer-events-auto">
          {index + 1} / {total}
        </div>

        {/* Main Content */}
        <div
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-7xl max-h-[90vh] flex items-center justify-center pointer-events-auto"
        >
          {/* Previous Arrow */}
          {total > 1 && (
            <button
              onClick={prev}
              className="absolute -left-4 md:left-4 top-1/2 -translate-y-1/2 z-[10001] bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full transition-all duration-300 hover:scale-125 shadow-2xl shadow-emerald-500/50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Large Image - CENTER OF SCREEN */}
          <div className="relative flex items-center justify-center bg-slate-900/50 rounded-2xl border-4 border-emerald-500/30 shadow-2xl overflow-hidden">
            <Image
              src={images[index]}
              alt={`Image ${index + 1}`}
              width={1920}
              height={1080}
              className="max-w-[85vw] max-h-[80vh] w-auto h-auto object-contain"
              priority
            />
          </div>

          {/* Next Arrow */}
          {total > 1 && (
            <button
              onClick={next}
              className="absolute -right-4 md:right-4 top-1/2 -translate-y-1/2 z-[10001] bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full transition-all duration-300 hover:scale-125 shadow-2xl shadow-emerald-500/50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Thumbnail Strip at Bottom */}
        {total > 1 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10001] max-w-[90vw] overflow-x-auto pointer-events-auto">
            <div className="flex gap-3 bg-black/80 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                    i === index
                      ? "ring-4 ring-emerald-400 scale-110 shadow-lg shadow-emerald-500/50"
                      : "opacity-50 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    width={100}
                    height={75}
                    className="w-24 h-18 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Instruction */}
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[10001] bg-black/80 text-white text-sm px-4 py-2 rounded-lg backdrop-blur-md border border-white/10 md:hidden pointer-events-auto">
          👈 Swipe to navigate 👉
        </div>
      </div>
    </>
  );

  // Use Portal to render at document body level
  return createPortal(modalContent, document.body);
}