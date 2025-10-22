"use client"

import Image from "next/image"

const brands = [
  {
    id: 1,
    name: "brillant logo",
    src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/brands/brillant-logo.png`
  },
  {
    id: 2,
    name: "linens logo removebg preview",
    src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/brands/linens-logo-removebg-preview.png`
  },
  {
    id: 3,
    name: "tac logo",
    src: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/brands/tac-logo.png`
  }
]

export default function Brands() {
  return (
    <section id="markalar" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">
            Çalıştığımız Markalar
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">Kaliteli ve güvenilir markalarla çalışıyoruz</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-card rounded-lg p-8 flex items-center justify-center hover:shadow-xl transition-all duration-500 hover:scale-105 group"
            >
              <div className="relative w-full aspect-video">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  fill
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
