"use client"

import dynamic from "next/dynamic"

const CurtainConfigurator = dynamic(() => import("@/components/konfigurator/curtain-configurator"), { ssr: false })

export default function FiyatTeklifPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-amber-50 border-b border-amber-200 text-amber-900">
        <div className="container mx-auto px-4 py-3 text-sm text-center">
          Ölçü talebi isteğe bağlıdır. Formda "Ölçü almanızı istiyorum" seçeneğini işaretlerseniz
          teklifle birlikte keşif talebiniz bize ulaşır.
        </div>
      </div>
      <div className="container mx-auto px-4 pb-6">
        <CurtainConfigurator />
      </div>
    </div>
  )
}

