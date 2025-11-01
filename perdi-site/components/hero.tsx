"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="anasayfa" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-primary/10" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-primary/10" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-primary/10" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-primary/10" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-primary/10" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-primary/10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 text-balance transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Zarafet ve Kalite ile Mekanlarınızı Dönüştürün
          </h1>
          <p
            className={`text-xl md:text-2xl text-muted-foreground mb-8 text-pretty transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Profesyonel perde ve dekorasyon çözümleri ile hayalinizdeki mekanları yaratıyoruz
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <a
              href="/fiyat-teklifi"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 text-center"
            >
              Fiyat Teklifi Alın
            </a>
            <button
              onClick={() => {
                const element = document.getElementById("portfolyo")
                element?.scrollIntoView({ behavior: "smooth" })
              }}
              className="bg-background text-foreground border-2 border-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
            >
              Portfolyomuzu İnceleyin
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("iletisim")
                element?.scrollIntoView({ behavior: "smooth" })
              }}
              className="bg-background text-foreground border-2 border-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
            >
              İletişime Geçin
            </button>
          </div>
        </div>
      </div>

      {/* Decorative accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </section>
  )
}
