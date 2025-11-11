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

function getThumb(type: CurtainType): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ""
  switch (type) {
    case "Tül":
      return `${base}/tül.jpg`
    case "Güneşlik":
      return `${base}/guneslik1.jpg`
    case "Fon":
      return `${base}/fon1.jpg`
    case "Blackout":
      return `${base}/blackout-curtain-dark-fabric.jpg`
    case "Stor":
      return `${base}/roller-blind-sleek-design.jpg`
    case "Jaluzi":
      return `${base}/venetian-blind-aluminum-slats.jpg`
    case "Plise":
      return `${base}/plise.jpg`
    default:
      return `${base}/placeholder.svg`
  }
}

export default function ProductSelector({ products, selectedProduct, onSelectProduct }: ProductSelectorProps) {
  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200">
      <div className="text-center border-b pb-2 p-3 shrink-0 bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 rounded-t-2xl border-rose-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h2 className="text-lg lg:text-xl font-light text-slate-900 tracking-tight">Ürün Seçin</h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            %35 İndirim
          </span>
        </div>
        <p className="text-xs text-slate-600 mt-1 font-medium">
          {products.length} farklı seçenek • <span className="text-rose-600 font-semibold">Muhteşem Kasım İndirimi Aktif</span>
        </p>
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
                  src={getThumb(product.type) || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 text-left pt-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-sm lg:text-base text-slate-900">{product.name}</h3>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                    <span className="inline-block h-1 w-1 rounded-full bg-white" />
                    %35
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-tight">{product.description}</p>
                <p className="text-[10px] text-rose-600 font-semibold mt-1">Kasım İndirimi Aktif</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
