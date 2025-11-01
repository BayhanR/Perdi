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
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200">
      <div className="text-center border-b pb-2 p-3 shrink-0 bg-white rounded-t-2xl">
        <h2 className="text-lg lg:text-xl font-light text-slate-900 tracking-tight">Ürün Seçin</h2>
        <p className="text-xs text-slate-500 mt-1">{products.length} farklı seçenek</p>
      </div>
      
      <div className="space-y-2 flex-1 overflow-y-auto overflow-x-hidden p-3">
        {products.map((product) => (
          <button
            key={product.type}
            onClick={() => onSelectProduct(product.type)}
            className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ${
              selectedProduct === product.type 
                ? "ring-2 ring-slate-900 shadow-xl bg-slate-50" 
                : "ring-1 ring-slate-200 hover:ring-slate-400 hover:shadow-md"
            } active:scale-98`}
          >
            <div className="flex items-start gap-2 p-2 bg-white relative">
              {selectedProduct === product.type && (
                <div className="absolute top-0 right-0 w-10 h-10 bg-slate-900 rounded-bl-full flex items-start justify-end p-1">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              
              <div className="relative w-16 h-16 lg:w-20 lg:h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100 shadow-md">
                <Image
                  src={productImages[product.type] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <div className="flex-1 text-left pt-1">
                <h3 className="font-semibold text-sm lg:text-base text-slate-900">{product.name}</h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-tight">{product.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

