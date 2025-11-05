"use client"

import CurtainConfigurator from "@/components/konfigurator/curtain-configurator"
import Link from "next/link"

export default function FiyatTeklifPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: '/' },
              { '@type': 'ListItem', position: 2, name: 'Fiyat Teklifi', item: '/fiyat-teklifi' },
            ],
          }),
        }}
      />
      <div className="container mx-auto px-4 pb-6">
        <CurtainConfigurator />
      </div>
    </div>
  )
}

