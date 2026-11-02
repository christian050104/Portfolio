"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

interface ImageModalProps {
  images: string[];
  index: number;
  onClose: () => void;
}

export default function ImageModal({ images, index: initialIndex, onClose }: ImageModalProps) {
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef(0);
  const total = images.length;

  const next = useCallback(() => setIndex((prev) => (prev + 1) % total), [total]);
  const prev = useCallback(() => setIndex((prev) => (prev - 1 + total) % total), [total]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKey);
    };
  }, [next, prev, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) prev();
    if (diff < -50) next();
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <div onClick={(e) => e.stopPropagation()} className="relative max-w-6xl max-h-[85vh]">
        <Image
          src={images[index]}
          alt={`Image ${index + 1}`}
          width={1920}
          height={1080}
          className="max-w-[85vw] max-h-[80vh] w-auto h-auto object-contain rounded-2xl"
        />
      </div>
    </div>,
    document.body
  );
}
