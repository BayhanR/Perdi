"use client"

import dynamic from "next/dynamic"

const CurtainConfigurator = dynamic(() => import("@/components/konfigurator/curtain-configurator"), { ssr: false })

export default function FiyatTeklifPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Kasım İndirimleri Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white shadow-lg pt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 min-h-[3rem]">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse" />
              <span className="text-lg sm:text-xl font-bold uppercase tracking-wider whitespace-nowrap leading-none">
                Muhteşem Kasım İndirimleri
              </span>
              <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse" />
            </div>
            <div className="flex items-center text-sm sm:text-base font-semibold bg-white/20 px-3 py-1 rounded-full whitespace-nowrap leading-none">
              Kasım İndirimlerini Kaçırmayın! 🎉
            </div>
            <span className="flex items-center text-base sm:text-lg md:text-xl font-semibold whitespace-nowrap leading-none">
              Tüm ürünlerde özel Kasım fiyatları geçerli. Stoklarla sınırlı fırsat!
            </span>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pb-6">
        <CurtainConfigurator />
      </div>
    </div>
  )
}

