"use client"

import { useState } from "react"
import ProductSelector from "./product-selector"
import ProductDisplay from "./product-display"
import MeasurementSection from "./measurement-section"
import CartSummary from "./cart-summary"
import QuoteForm from "./quote-form"

type CurtainType = "Tül" | "Güneşlik" | "Fon" | "Stor" | "Jaluzi" | "Blackout" | "Plise"

export interface CartItem {
  id: string
  type: CurtainType
  width: number
  height: number
  price: number
}

const PRODUCTS: { type: CurtainType; name: string; description: string }[] = [
  { type: "Tül", name: "Tül", description: "Hafif ve transparan" },
  { type: "Güneşlik", name: "Güneşlik", description: "Güneş kontrolü" },
  { type: "Blackout", name: "Blackout", description: "Tam karartma - güneş geçirmez" },
  { type: "Fon", name: "Fon", description: "Kalın karartma" },
  { type: "Stor", name: "Stor", description: "Rulo jaluzi" },
  { type: "Jaluzi", name: "Jaluzi", description: "Alüminyum jaluzi" },
  { type: "Plise", name: "Plise", description: "Katlanabilir perde" },
]

export default function CurtainConfigurator() {
  const [selectedProduct, setSelectedProduct] = useState<CurtainType>("Tül")
  const [width, setWidth] = useState(100)
  const [height, setHeight] = useState(150)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showQuoteForm, setShowQuoteForm] = useState(false)

  const calculatePrice = () => {
    const widthInMeters = width / 100
    const heightInMeters = height / 100
    const squareMeters = widthInMeters * heightInMeters

    switch (selectedProduct) {
      case "Tül":
        return squareMeters * 300
      case "Güneşlik":
        return squareMeters * 200
      case "Blackout":
        return squareMeters * 400
      case "Fon":
        return squareMeters * 350
      case "Stor":
        return squareMeters * 300
      case "Jaluzi":
        return squareMeters * 2000
      case "Plise":
        return squareMeters * 700
      default:
        return 0
    }
  }

  const handleAddToCart = () => {
    const newItem: CartItem = {
      id: `${Date.now()}`,
      type: selectedProduct,
      width,
      height,
      price: Math.round(calculatePrice()),
    }
    setCartItems([...cartItems, newItem])
    setShowCart(true)
  }

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light tracking-tight text-slate-900">Perde Konfigüratörü</h1>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Sepet
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <ProductDisplay selectedProduct={selectedProduct} />
          </div>

          <div className="lg:col-span-1">
            <ProductSelector
              products={PRODUCTS}
              selectedProduct={selectedProduct}
              onSelectProduct={setSelectedProduct}
            />
          </div>
        </div>

        <MeasurementSection
          width={width}
          height={height}
          onWidthChange={setWidth}
          onHeightChange={setHeight}
          selectedProduct={selectedProduct}
          price={Math.round(calculatePrice())}
          onAddToCart={handleAddToCart}
          onQuoteClick={() => setShowQuoteForm(true)}
        />
      </div>

      {showCart && <CartSummary items={cartItems} onClose={() => setShowCart(false)} onRemove={handleRemoveFromCart} />}

      {showQuoteForm && <QuoteForm cartItems={cartItems} onClose={() => setShowQuoteForm(false)} />}
    </div>
  )
}
