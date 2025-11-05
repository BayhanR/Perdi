"use client"

import dynamic from "next/dynamic"

const CurtainConfigurator = dynamic(() => import("@/components/konfigurator/curtain-configurator"), { ssr: false })

export default function FiyatTeklifPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pb-6">
        <CurtainConfigurator />
      </div>
    </div>
  )
}

