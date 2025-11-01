"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

type CurtainType = "Tül" | "Güneşlik" | "Fon" | "Stor" | "Jaluzi" | "Blackout"

interface MeasurementSectionProps {
  width: number
  height: number
  onWidthChange: (width: number) => void
  onHeightChange: (height: number) => void
  selectedProduct: CurtainType
  price: number
  onAddToCart: () => void
  onQuoteClick: () => void
}

export default function MeasurementSection({
  width,
  height,
  onWidthChange,
  onHeightChange,
  selectedProduct,
  price,
  onAddToCart,
  onQuoteClick,
}: MeasurementSectionProps) {
  const [displayPrice, setDisplayPrice] = useState(price)

  useEffect(() => {
    // Animate price change
    const interval = setInterval(() => {
      setDisplayPrice((prev) => {
        if (prev < price) return Math.min(prev + Math.ceil((price - prev) / 10), price)
        if (prev > price) return Math.max(prev - Math.ceil((prev - price) / 10), price)
        return prev
      })
    }, 30)

    return () => clearInterval(interval)
  }, [price])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-lg p-8 border border-slate-200"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
        {/* Width Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">En (cm)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => onWidthChange(Math.max(1, Number.parseInt(e.target.value) || 1))}
            min="1"
            max="500"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Height Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Boy (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => onHeightChange(Math.max(1, Number.parseInt(e.target.value) || 1))}
            min="1"
            max="500"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Price Display */}
        <motion.div initial={false} className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg p-4 text-white">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Fiyat</p>
          <p className="text-3xl font-light tracking-tight">{displayPrice.toLocaleString("tr-TR")} ₺</p>
        </motion.div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddToCart}
          className="h-full px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg"
        >
          Sepete Ekle
        </motion.button>

        {/* Quote Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onQuoteClick}
          className="h-full px-6 py-2 border-2 border-slate-900 text-slate-900 rounded-lg font-medium hover:bg-slate-50 transition-colors"
        >
          Teklif Gönder
        </motion.button>
      </div>

      {/* Info Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
      >
        <p className="text-sm text-blue-900">
          💡 <span className="font-medium">İpucu:</span> Ölçü konusunda emin değilseniz, ücretsiz keşif için
          gelebiliriz.
        </p>
      </motion.div>
    </motion.div>
  )
}
