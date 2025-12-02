"use client";

import { useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";

export default function ImageCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      {/* Carousel */}
      <div className="relative w-full h-48 md:h-56 lg:h-60 overflow-hidden rounded-lg border border-white/10 bg-slate-900">
        
        {/* Click image to open modal */}
        <Image
          src={images[index]}
          alt="Project Image"
          fill
          onClick={() => setOpenModal(true)}
          className="object-cover transition-all duration-300 cursor-pointer hover:scale-105"
        />

        {/* Prev Button */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-800/60 p-2 rounded-full text-xs hover:bg-slate-700"
        >
          ←
        </button>

        {/* Next Button */}
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-800/60 p-2 rounded-full text-xs hover:bg-slate-700"
        >
          →
        </button>

        {/* Dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-emerald-400" : "bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>

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
