"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

const items = [
  {
    id: 1,
    name: "WhatsApp Image 2025 10 21 at 16.45.45",
    src: "/portfolio/WhatsApp Image 2025-10-21 at 16.45.45.jpeg"
  },
  {
    id: 2,
    name: "WhatsApp Image 2025 10 21 at 16.45.47(1)",
    src: "/portfolio/WhatsApp Image 2025-10-21 at 16.45.47(1).jpeg"
  },
  {
    id: 3,
    name: "WhatsApp Image 2025 10 21 at 16.45.47(2)",
    src: "/portfolio/WhatsApp Image 2025-10-21 at 16.45.47(2).jpeg"
  },
  {
    id: 4,
    name: "WhatsApp Image 2025 10 21 at 16.45.47",
    src: "/portfolio/WhatsApp Image 2025-10-21 at 16.45.47.jpeg"
  },
  {
    id: 5,
    name: "WhatsApp Image 2025 10 21 at 16.45.48(1)",
    src: "/portfolio/WhatsApp Image 2025-10-21 at 16.45.48(1).jpeg"
  },
  {
    id: 6,
    name: "WhatsApp Image 2025 10 21 at 16.45.48(2)",
    src: "/portfolio/WhatsApp Image 2025-10-21 at 16.45.48(2).jpeg"
  },
  {
    id: 7,
    name: "WhatsApp Image 2025 10 21 at 16.45.48",
    src: "/portfolio/WhatsApp Image 2025-10-21 at 16.45.48.jpeg"
  }
]

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)

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

  const duplicatedItems = [...items, ...items, ...items]

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
            <div className="flex gap-6 animate-scroll hover:pause-animation">
              {duplicatedItems.map((item, index) => (
                <Link
                  key={`${item.id}-${index}`}
                  href="/galeri"
                  className="group relative flex-shrink-0 w-80 h-80 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${item.src}`}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ))}
            </div>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
        <div className="text-center mt-12">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
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
