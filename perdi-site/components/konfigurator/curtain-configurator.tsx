"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import ProductSelector from "@/components/konfigurator/product-selector"
import ProductDisplay from "@/components/konfigurator/product-display"
import MeasurementSection from "@/components/konfigurator/measurement-section"
import CartSummary from "@/components/konfigurator/cart-summary"
import QuoteForm from "@/components/konfigurator/quote-form"
import { Toaster, toast } from "sonner"

type CurtainType = "Tül" | "Güneşlik" | "Fon" | "Stor" | "Jaluzi" | "Blackout" | "Plise"

export interface CartItem {
  id: string
  type: CurtainType
  width: number
  height: number
  price: number
}

const PRODUCTS: { type: CurtainType; name: string; description: string }[] = [
  { type: "Tül", name: "Tül", description: "130-350 ₺/m (×3 kumaş)" },
  { type: "Güneşlik", name: "Güneşlik", description: "200 ₺/m - Güneş kontrolü" },
  { type: "Blackout", name: "Blackout", description: "350 ₺/m - Tam karartma" },
  { type: "Fon", name: "Fon", description: "2.500-3.500 ₺ (2 kanat)" },
  { type: "Stor", name: "Stor", description: "280 ₺/m² - Rulo jaluzi" },
  { type: "Jaluzi", name: "Jaluzi", description: "1.800 ₺/m² - Alüminyum" },
  { type: "Plise", name: "Plise", description: "650 ₺/m² - Katlanabilir" },
]

export default function CurtainConfigurator() {
  const [selectedProduct, setSelectedProduct] = useState<CurtainType>("Tül")
  const [width, setWidth] = useState(100)
  const [height, setHeight] = useState(150)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  // Fiyat aralığı hesaplama (min-max)
  const calculatePriceRange = () => {
    const widthInMeters = width / 100
    const heightInMeters = height / 100
    const squareMeters = widthInMeters * heightInMeters

    switch (selectedProduct) {
      case "Tül":
        // En üzerinden, 1 metrede 3 metre kumaş kullanılır (130-350 TL arası)
        const tulFabricLength = widthInMeters * 3
        return { min: tulFabricLength * 130, max: tulFabricLength * 350 }
      case "Güneşlik":
        // En üzerinden fiyatlandırma - sabit fiyat
        const guneslikPrice = widthInMeters * 200
        return { min: guneslikPrice, max: guneslikPrice }
      case "Blackout":
        // En üzerinden fiyatlandırma - sabit fiyat
        const blackoutPrice = widthInMeters * 350
        return { min: blackoutPrice, max: blackoutPrice }
      case "Fon":
        // Sabit fiyat aralığı - 2 kanat (2500-3500 TL arası)
        return { min: 2500, max: 3500 }
      case "Stor":
        const storPrice = squareMeters * 280
        return { min: storPrice, max: storPrice }
      case "Jaluzi":
        const jaluziPrice = squareMeters * 1800
        return { min: jaluziPrice, max: jaluziPrice }
      case "Plise":
        const plisePrice = squareMeters * 650
        return { min: plisePrice, max: plisePrice }
      default:
        return { min: 0, max: 0 }
    }
  }

  // Birim fiyat bilgisi
  const getUnitPriceInfo = () => {
    switch (selectedProduct) {
      case "Tül":
        return "130-350 ₺/m"
      case "Güneşlik":
        return "200 ₺/m"
      case "Blackout":
        return "350 ₺/m"
      case "Fon":
        return "2.500-3.500 ₺"
      case "Stor":
        return "280 ₺/m²"
      case "Jaluzi":
        return "1.800 ₺/m²"
      case "Plise":
        return "650 ₺/m²"
      default:
        return ""
    }
  }

  // Tek bir fiyat mı yoksa aralık mı?
  const hasRange = selectedProduct === "Tül" || selectedProduct === "Fon"

  // Ürün tipi kontrolü
  const isFonProduct = selectedProduct === "Fon"
  const isWidthBasedProduct = ["Tül", "Güneşlik", "Blackout"].includes(selectedProduct)

  const handleAddToCart = () => {
    const priceRange = calculatePriceRange()
    const averagePrice = (priceRange.min + priceRange.max) / 2
    const newItem: CartItem = {
      id: `${Date.now()}`,
      type: selectedProduct,
      width,
      height,
      price: Math.round(averagePrice),
    }
    setCartItems([...cartItems, newItem])
    toast.success("Sepete eklendi", {
      description: `${selectedProduct} — ${width}×${height} cm`,
      duration: 1600,
    })
  }

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <header className="fixed top-0 left-0 right-0 border-b border-slate-200 bg-white text-slate-900 z-40">
        <div className="w-full px-2 lg:px-3 py-2 flex justify-between items-center relative h-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-medium transition-all hover:gap-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana Sayfa
          </Link>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Sepet
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Orta: Taç logosu + kalitesiyle */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2">
              <Image src="/brands/tac-logo.png" alt="Taç" width={72} height={24} className="h-6 w-auto" priority />
              <span className="text-slate-900 font-semibold tracking-wide">kalitesiyle</span>
            </div>
          </div>
        </div>
      </header>

      {/* Header yüksekliği kadar boşluk bırak */}
      <div className="h-14" />

      <div className="w-full px-2 lg:px-4 py-2">
        {/* Tek Sayfa Layout - Resim Sol, Seçenekler Sağ, Fiyat Orta */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-3 h-[calc(100vh-5rem)]">
          {/* Sol: Resim - Mobilde üstte, masaüstünde solda */}
          <div className="lg:col-span-6 h-[35vh] lg:h-full order-1 flex flex-col">
            <ProductDisplay selectedProduct={selectedProduct} />
          </div>

          {/* Orta: Fiyat ve Ölçüler - Mobilde ortada, masaüstünde ortada */}
          <div className="lg:col-span-3 h-auto lg:h-full flex flex-col order-2">
            <MeasurementSection
              width={width}
              height={height}
              onWidthChange={setWidth}
              onHeightChange={setHeight}
              selectedProduct={selectedProduct}
              priceRange={calculatePriceRange()}
              unitPrice={getUnitPriceInfo()}
              hasRange={hasRange}
              onAddToCart={handleAddToCart}
              onQuoteClick={() => setShowQuoteForm(true)}
              isFonProduct={isFonProduct}
              isWidthBasedProduct={isWidthBasedProduct}
            />
          </div>

          {/* Sağ: Ürün Seçenekleri - Mobilde en altta, masaüstünde sağda */}
          <div className="lg:col-span-3 h-[35vh] lg:h-full overflow-y-auto order-3 flex flex-col">
            <ProductSelector
              products={PRODUCTS}
              selectedProduct={selectedProduct}
              onSelectProduct={setSelectedProduct}
            />
          </div>
        </div>
      </div>

      {showCart && (
        <CartSummary
          items={cartItems}
          onClose={() => setShowCart(false)}
          onRemove={handleRemoveFromCart}
          onRequestQuote={() => setShowQuoteForm(true)}
        />
      )}

      {showQuoteForm && <QuoteForm cartItems={cartItems} onClose={() => setShowQuoteForm(false)} />}
      {/* Toast container */}
      <Toaster richColors position="top-center" />
    </div>
  )
}
