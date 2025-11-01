"use client"

import Image from "next/image"

type CurtainType = "Tül" | "Güneşlik" | "Fon" | "Stor" | "Jaluzi" | "Blackout" | "Plise"

interface Product {
  type: CurtainType
  name: string
  description: string
}

interface ProductSelectorProps {
  products: Product[]
  selectedProduct: CurtainType
  onSelectProduct: (product: CurtainType) => void
}

const productImages: Record<CurtainType, string> = {
  Tül: "/sheer-curtain-elegant-white.jpg",
  Güneşlik: "/sunscreen-modern-textured.jpg",
  Fon: "/blackout-curtain-dark-fabric.jpg",
  Blackout: "/blackout-solids-dark.jpg",
  Stor: "/roller-blind-sleek-design.jpg",
  Jaluzi: "/venetian-blind-aluminum-slats.jpg",
  Plise: "/plise-modern-fold.jpg",
}

export default function ProductSelector({ products, selectedProduct, onSelectProduct }: ProductSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-light text-slate-900 tracking-tight">Ürün Seçin</h2>
      <div className="space-y-3">
        {products.map((product) => (
          <button
            key={product.type}
            onClick={() => onSelectProduct(product.type)}
            className={`w-full group relative overflow-hidden rounded-lg transition-all duration-300 ${
              selectedProduct === product.type ? "ring-2 ring-slate-900" : "ring-1 ring-slate-200 hover:ring-slate-300"
            } hover:translate-x-1 active:scale-98`}
          >
            <div className="flex items-start gap-3 p-3 bg-white">
              <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-slate-100">
                <Image
                  src={productImages[product.type] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-sm text-slate-900">{product.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{product.description}</p>
              </div>
              {selectedProduct === product.type && <div className="w-2 h-2 rounded-full bg-slate-900 mt-2" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
