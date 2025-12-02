"use client";

import { useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";

export default function ImageCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images. length);
  };

  return (
    <>
      {/* Carousel */}
      <div className="relative w-full h-48 md:h-56 lg:h-60 overflow-hidden rounded-t-2xl bg-slate-900 border border-slate-700/50 group">
        
        {/* Image - Click to Open Modal */}
        <div 
          onClick={() => setOpenModal(true)}
          className="relative w-full h-full cursor-pointer"
        >
          <Image
            src={images[index]}
            alt="Project Image"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Hover Overlay with Smooth Fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div className="bg-emerald-600 px-6 py-3 rounded-full shadow-lg shadow-emerald-500/50">
                <span className="text-white font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  View Full Size
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-emerald-600 p-2 rounded-full text-white transition-all duration-300 z-20 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-emerald-600 p-2 rounded-full text-white transition-all duration-300 z-20 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`transition-all duration-300 rounded-full ${
                  i === index 
                    ? "w-8 h-2 bg-emerald-400 shadow-lg shadow-emerald-500/50" 
                    : "w-2 h-2 bg-white/50 hover:bg-white/80 hover:scale-125"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Render Modal with Portal */}
      {openModal && (
        <ImageModal
          images={images}
          index={index}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}