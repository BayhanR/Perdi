"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

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

      {/* Kasım İndirimleri Banner */}
      <div className="absolute top-20 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 rounded-2xl shadow-2xl p-4 border-4 border-white/20 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-white">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-white animate-pulse" />
                  <span className="text-lg sm:text-xl font-bold uppercase tracking-wider">
                    Muhteşem Kasım İndirimleri
                  </span>
                  <span className="inline-block h-3 w-3 rounded-full bg-white animate-pulse" />
                </div>
                <div className="text-sm sm:text-base font-semibold bg-white/20 px-4 py-1.5 rounded-full">
                  Kasım İndirimlerini Kaçırmayın! 🎉
                </div>
              </div>
              <p className="text-center text-white/90 text-sm sm:text-base mt-2 font-medium">
                Tüm ürünlerde özel Kasım fiyatları geçerli. Stoklarla sınırlı fırsat!
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 text-balance transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Kemalpaşa & Ulucak’ta Profesyonel Perde Çözümleri
          </h1>
          <p
            className={`text-xl md:text-2xl text-muted-foreground mb-8 text-pretty transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Ücretsiz keşif, yerinde ölçü ve özenli montaj ile aynı gün teklif alın
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Link
              href="/fiyat-teklifi"
              className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-rose-600 hover:via-orange-600 hover:to-amber-600 transition-all hover:scale-105 text-center focus:outline-none focus-visible:outline-none focus:ring-0 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <span className="flex flex-col items-center gap-1">
                <span>Fiyat Teklifi Alın</span>
                <span className="text-xs font-normal opacity-90">Kasım İndirimleri Aktif</span>
              </span>
            </Link>
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

          {/* Taç Kalitesi Rozeti */}
          <div className={`mt-6 flex items-center justify-center gap-2 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              Ürünlerimiz
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/brands/tac-logo.png`}
                alt="Taç"
                className="object-contain h-5 inline-block"
                loading="lazy"
              />
              kalitesindedir
            </span>
          </div>
        </div>
      </div>

      {/* Decorative accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </section>
  )
}
