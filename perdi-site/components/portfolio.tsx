"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

interface PortfolioImage {
  name: string
  url: string
  uploadedAt: string
}

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [images, setImages] = useState<PortfolioImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("portfolyo")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    fetchImages()
  }, [])

  const duplicatedItems = images.length > 0 ? [...images, ...images, ...images] : []

  const fetchImages = async () => {
    try {
      setIsLoading(true)
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
      const response = await fetch(`${basePath}/api/portfolio-images`, { cache: "no-store" })
      if (!response.ok) throw new Error("Görseller alınamadı")
      const data = await response.json()
      setImages(data.images || [])
    } catch (err) {
      console.error(err)
      setError("Portfolyo görselleri yüklenemedi. Lütfen daha sonra tekrar deneyin.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="portfolyo" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-0 left-1/3 w-px h-full bg-primary/5" />
        <div className="absolute top-0 left-2/3 w-px h-full bg-primary/5" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">Portfolyomuz</h2>
          <p className="text-xl text-muted-foreground text-pretty">Gerçekleştirdiğimiz projelerden örnekler</p>
        </div>
        <div className="relative">
          <div className="overflow-hidden">
            {isLoading ? (
              <div className="flex gap-6 animate-pulse">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="w-80 h-80 rounded-lg bg-slate-200" />
                ))}
              </div>
            ) : duplicatedItems.length > 0 ? (
              <div className="flex gap-6 animate-scroll hover:pause-animation">
                {duplicatedItems.map((item, index) => (
                  <Link
                    key={`${item.url}-${index}`}
                    href="/galeri"
                    className="group relative flex-shrink-0 w-80 h-80 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
                  >
                    <Image
                      src={item.url}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center py-12">
                <p className="text-sm text-slate-500 text-center max-w-lg">
                  Henüz portfolyo görseli yüklenmemiş. Yönetim panelinden <code>public/uploads/portfolio</code> klasörüne fotoğraf
                  eklediğinizde burada otomatik olarak görünecek.
                </p>
              </div>
            )}
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
        <div className="text-center mt-12">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg disabled:opacity-50"
            aria-disabled={images.length === 0}
          >
            Tüm Projeleri Görüntüle
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
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
