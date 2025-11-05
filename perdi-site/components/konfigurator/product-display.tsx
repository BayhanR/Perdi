"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

type CurtainType = "Tül" | "Güneşlik" | "Fon" | "Stor" | "Jaluzi" | "Blackout" | "Plise"

interface ProductDisplayProps {
  selectedProduct: CurtainType
}

function getImagesForType(type: CurtainType): string[] {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ""
  switch (type) {
    case "Tül":
      return [
        `${base}/tül.jpg`,
        `${base}/tül2.jpg`,
        `${base}/tül3.jpg`,
        `${base}/tül4.jpg`,
        `${base}/tül5.jpg`,
        `${base}/tül6.jpg`,
        `${base}/tüldesenli.jpg`,
        `${base}/sheer-curtain-elegant-white.jpg`,
        `${base}/sheer-curtain-light-flowing.jpg`,
        `${base}/sheer-curtain-translucent-delicate.jpg`,
      ]
    case "Güneşlik":
      return [
        `${base}/guneslik1.jpg`,
        `${base}/guneslik2.webp`,
        `${base}/guneslik3.webp`,
        `${base}/sunscreen-light-control.jpg`,
      ]
    case "Fon":
      return [
        `${base}/fon1.jpg`,
        `${base}/fon2.jpg`,
        `${base}/fon3.jpg`,
      ]
    case "Blackout":
      return [
        `${base}/blackout-curtain-dark-fabric.jpg`,
        `${base}/blackout-professional-finish.jpg`,
        `${base}/blackout-solids-dark.jpg`,
        `${base}/blackout1.jpg`,
        `${base}/blackout2.jpg`,
        `${base}/blackout-top.jpg`,
      ]
    case "Stor":
      return [
        `${base}/roller-blind-sleek-design.jpg`,
        `${base}/roller-blind-window-shade.jpg`,
        `${base}/contemporary-roller-blind-window-treatment.jpg`,
        `${base}/sunscreen-roller-shade.jpg`,
        `${base}/sunscreen-light-control.jpg`,
        `${base}/stor2.jpg`,
        `${base}/stor3.jpg`,
        `${base}/stor4.jpg`,
        `${base}/stor5.jpg`,
        `${base}/stor6.jpg`,
      ]
    case "Jaluzi":
      return [
        `${base}/venetian-blind-aluminum-slats.jpg`,
        `${base}/venetian-blind-modern-style.jpg`,
        `${base}/venetian-blind-precision-slats.jpg`,
        `${base}/sleek-aluminum-venetian-blind-modern.jpg`,
        `${base}/aluminum-venetian-blind-slats.jpg`,
        `${base}/jaluzi.jpg`,
        `${base}/jaluzi1.jpg`,
        `${base}/jaluzi2.jpg`,
      ]
    case "Plise":
      return [
        `${base}/plise.jpg`,
        `${base}/plise2.jpg`,
        `${base}/plise3.jpg`,
      ]
    default:
      return [
        `${base}/placeholder.svg?height=600&width=800&query=perde`,
      ]
  }
}

export default function ProductDisplay({ selectedProduct }: ProductDisplayProps) {
  const images = getImagesForType(selectedProduct)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
        setIsTransitioning(false)
      }, 800)
    }, 4000)
    return () => clearInterval(interval)
  }, [selectedProduct, images.length])

  useEffect(() => {
    setCurrentImageIndex(0)
    setIsTransitioning(false)
  }, [selectedProduct])

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
        <div className={`image-container absolute inset-0 ${isTransitioning ? 'transitioning' : ''}`}>
          <Image
            src={images[currentImageIndex]}
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
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentImageIndex(idx)
              setIsTransitioning(false)
            }}
            className={`transition-all duration-300 ${idx === currentImageIndex ? 'bg-slate-900 w-6 lg:w-8' : 'bg-slate-300 hover:bg-slate-400 w-2'} h-1.5 rounded-full hover:scale-110 active:scale-95`}
            aria-label={`Resim ${idx + 1}`}
          />
        ))}
        <span className="text-xs text-slate-500 ml-2">{currentImageIndex + 1} / {images.length}</span>
      </div>
    </div>
  )
}

