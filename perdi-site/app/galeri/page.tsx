"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    id: 1,
    name: "WhatsApp Image 2025 10 21 at 16.45.45",
    src: "/portfolio/WhatsApp Image 2025-10-21 at 16.45.45.jpeg",
  },
  {
    id: 2,
    name: "WhatsApp Image 2025 10 21 at 16.45.47(1)",
    src: "/portfolio/WhatsApp Image 2025-10-21 at 16.45.47(1).jpeg",
  },
  {
    id: 3,
    name: "WhatsApp Image 2025 10 21 at 16.45.47(2)",
    src: "/portfolio/WhatsApp Image 2025-10-21 at 16.45.47(2).jpeg",
  },
  {
    id: 4,
    name: "WhatsApp Image 2025 10 21 at 16.45.47",
    src: "/portfolio/WhatsApp Image 2025-10-21 at 16.45.47.jpeg",
  },
  {
    id: 5,
    name: "WhatsApp Image 2025 10 21 at 16.45.48(1)",
    src: "/portfolio/WhatsApp Image 2025-10-21 at 16.45.48(1).jpeg",
  },
  {
    id: 6,
    name: "WhatsApp Image 2025 10 21 at 16.45.48(2)",
    src: "/portfolio/WhatsApp Image 2025-10-21 at 16.45.48(2).jpeg",
  },
  {
    id: 7,
    name: "WhatsApp Image 2025 10 21 at 16.45.48",
    src: "/portfolio/WhatsApp Image 2025-10-21 at 16.45.48.jpeg",
  },
];

export default function GaleriPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-14">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Ana Sayfaya Dön
          </Link>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-balance">Proje Galerimiz</h1>
          <p className="text-xl text-primary-foreground/90 text-pretty">
            Gerçekleştirdiğimiz projelerden fotoğraflar
          </p>
        </div>
      </div>
      {/* Gallery Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${idx * 50}ms` }}
              onClick={() => setSelectedImage(item.id)}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${item.src}`}
                alt={"Galeri Görseli"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={idx < 6}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-5xl aspect-video">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${items.find((item) => item.id === selectedImage)?.src || ""}`}
              alt={"Galeri Görseli"}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
