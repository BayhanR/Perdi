"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface PortfolioImage {
  name: string;
  url: string;
  uploadedAt: string;
}

export default function GaleriPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
        const response = await fetch(`${basePath}/api/portfolio-images`, { cache: "no-store" });
        if (!response.ok) throw new Error("Görseller alınamadı");
        const data = await response.json();
        setImages(data.images || []);
      } catch (err) {
        console.error(err);
        setError("Görseller yüklenemedi. Lütfen daha sonra tekrar deneyin.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: '/' },
              { '@type': 'ListItem', position: 2, name: 'Galeri', item: '/galeri' },
            ],
          }),
        }}
      />
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
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div key={idx} className="aspect-square rounded-lg bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Henüz fotoğraf yüklenmedi. Yönetim panelinden <code>public/uploads/portfolio</code> klasörüne görsel eklendiğinde bu
            bölüm otomatik güncellenecek.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((item, idx) => (
              <div
                key={item.url}
                className="group relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
                onClick={() => setSelectedImage(item.url)}
              >
                <Image
                  src={item.url}
                  alt={`Tezer Perde Galeri – Kemalpaşa perde örnekleri ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={idx < 6}
                />
              </div>
            ))}
          </div>
        )}
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
            <Image src={selectedImage} alt={"Galeri Görseli"} fill className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
