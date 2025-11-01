"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

type CurtainType = "Tül" | "Güneşlik" | "Fon" | "Stor" | "Jaluzi" | "Blackout" | "Plise"

const productImages: Record<CurtainType, string[]> = {
  Tül: [
    "/sheer-curtain-elegant-white.jpg",
    "/sheer-curtain-light-flowing.jpg",
    "/sheer-curtain-translucent-delicate.jpg",
  ],
  Güneşlik: ["/sunscreen-modern-textured.jpg", "/sunscreen-fabric-detail.jpg", "/sunscreen-light-control.jpg"],
  Fon: ["/blackout-curtain-dark-fabric.jpg", "/blackout-premium-material.jpg", "/blackout-heavy-texture.jpg"],
  Blackout: ["/blackout-solids-dark.jpg", "/blackout-professional-finish.jpg", "/blackout-room-darkening.jpg"],
  Stor: ["/roller-blind-sleek-design.jpg", "/roller-blind-smooth-fabric.jpg", "/roller-blind-contemporary.jpg"],
  Jaluzi: [
    "/venetian-blind-aluminum-slats.jpg",
    "/venetian-blind-modern-style.jpg",
    "/venetian-blind-precision-slats.jpg",
  ],
  Plise: ["/plise-modern-fold.jpg", "/plise-elegant-pleats.jpg", "/plise-contemporary-style.jpg"],
}

interface ProductDisplayProps {
  selectedProduct: CurtainType
}

export default function ProductDisplay({ selectedProduct }: ProductDisplayProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const images = productImages[selectedProduct]
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
        setIsTransitioning(false)
      }, 800)
    }, 4000)
    return () => clearInterval(interval)
  }, [selectedProduct])

  useEffect(() => {
    setCurrentImageIndex(0)
    setIsTransitioning(false)
  }, [selectedProduct])

  const currentImage = productImages[selectedProduct][currentImageIndex]
  const imageCount = productImages[selectedProduct].length

  return (
    <div className="relative w-full h-full flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
      <style>{`
        @keyframes zoomOut {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        
        @keyframes zoomIn {
          0% {
            opacity: 0;
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .image-container {
          animation: zoomIn 0.8s ease-out forwards;
        }

        .image-container.transitioning {
          animation: zoomOut 0.8s ease-in forwards;
        }
      `}</style>

      <div className="relative w-full flex-1 overflow-hidden bg-slate-100">
        <div className={`image-container absolute inset-0 ${isTransitioning ? "transitioning" : ""}`}>
          <Image
            src={currentImage || "/placeholder.svg?height=600&width=800&query=perde"}
            alt={`${selectedProduct} - ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Ürün İsmi Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4 lg:p-6">
          <h3 className="text-white text-xl lg:text-2xl font-light tracking-wide">{selectedProduct}</h3>
        </div>
      </div>

      <div className="flex justify-center items-center gap-1.5 py-3 shrink-0 bg-white">
        {productImages[selectedProduct].map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentImageIndex(index)
              setIsTransitioning(false)
            }}
            className={`transition-all duration-300 ${
              index === currentImageIndex ? "bg-slate-900 w-6 lg:w-8" : "bg-slate-300 hover:bg-slate-400 w-2"
            } h-1.5 rounded-full hover:scale-110 active:scale-95`}
            aria-label={`Resim ${index + 1}`}
          />
        ))}
        <span className="text-xs text-slate-500 ml-2">
          {currentImageIndex + 1} / {imageCount}
        </span>
      </div>
    </div>
  )
}

