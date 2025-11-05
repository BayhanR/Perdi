"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

type CurtainType = "Tül" | "Güneşlik" | "Fon" | "Stor" | "Jaluzi" | "Blackout" | "Plise"

interface MeasurementSectionProps {
  width: number
  height: number
  onWidthChange: (width: number) => void
  onHeightChange: (height: number) => void
  selectedProduct: CurtainType
  priceRange: { min: number; max: number }
  unitPrice: string
  hasRange: boolean
  onAddToCart: () => void
  onQuoteClick: () => void
  isFonProduct?: boolean
  isWidthBasedProduct?: boolean
}

export default function MeasurementSection({
  width,
  height,
  onWidthChange,
  onHeightChange,
  selectedProduct,
  priceRange,
  unitPrice,
  hasRange,
  onAddToCart,
  onQuoteClick,
  isFonProduct = false,
  isWidthBasedProduct = false,
}: MeasurementSectionProps) {
  const [displayMinPrice, setDisplayMinPrice] = useState(priceRange.min)
  const [displayMaxPrice, setDisplayMaxPrice] = useState(priceRange.max)
  const [unit, setUnit] = useState<"cm" | "m">("cm")

  // Helpers for unit conversion (state upstream is always cm)
  const toDisplay = (valueCm: number) => (unit === "cm" ? valueCm : Number((valueCm / 100).toFixed(2)))
  const fromDisplay = (value: number) => {
    if (Number.isNaN(value)) return
    const cm = unit === "cm" ? value : value * 100
    const rounded = Math.max(1, Math.round(cm))
    return rounded
  }
  const widthStep = unit === "cm" ? 5 : 0.1
  const heightStep = unit === "cm" ? 5 : 0.1
  const minVal = unit === "cm" ? 1 : 0.01
  const maxVal = unit === "cm" ? 3000 : 30

  useEffect(() => {
    // Animate price change for min
    const intervalMin = setInterval(() => {
      setDisplayMinPrice((prev) => {
        if (prev < priceRange.min) return Math.min(prev + Math.ceil((priceRange.min - prev) / 10), priceRange.min)
        if (prev > priceRange.min) return Math.max(prev - Math.ceil((prev - priceRange.min) / 10), priceRange.min)
        return prev
      })
    }, 30)

    // Animate price change for max
    const intervalMax = setInterval(() => {
      setDisplayMaxPrice((prev) => {
        if (prev < priceRange.max) return Math.min(prev + Math.ceil((priceRange.max - prev) / 10), priceRange.max)
        if (prev > priceRange.max) return Math.max(prev - Math.ceil((prev - priceRange.max) / 10), priceRange.max)
        return prev
      })
    }, 30)

    return () => {
      clearInterval(intervalMin)
      clearInterval(intervalMax)
    }
  }, [priceRange])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-2xl p-4 lg:p-5 border border-slate-200 h-full flex flex-col justify-between"
    >
      {/* Başlık */}
      <div className="text-center border-b pb-3 shrink-0">
        <h2 className="text-xl lg:text-2xl font-light text-slate-900 tracking-tight">
          {isFonProduct ? "Fiyat Bilgisi" : "Fiyat Hesaplayın"}
        </h2>
        <p className="text-xs lg:text-sm text-slate-500 mt-1">
          {isFonProduct
            ? "2 kanat fon perde sabit fiyat"
            : isWidthBasedProduct
              ? "Genişlik ölçüsünü girin"
              : "Ölçülerinizi girin, anlık fiyat alın"}
        </p>
      </div>

      {/* Orta İçerik - Flex grow ile doldur */}
      <div className="flex-1 flex flex-col justify-center space-y-4">
        {/* Unit switch */}
        {!isFonProduct && (
          <div className="flex items-center gap-2 self-end mt-2 lg:mt-0">
            <span className="text-xs text-slate-500">Birim</span>
            <div className="inline-flex p-1 rounded-full border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => setUnit("cm")}
                className={`px-3 py-1 rounded-full text-sm transition-all ${unit === "cm" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}
              >
                cm
              </button>
              <button
                type="button"
                onClick={() => setUnit("m")}
                className={`px-3 py-1 rounded-full text-sm transition-all ${unit === "m" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}`}
              >
                m
              </button>
            </div>
          </div>
        )}

        {/* Fon için ölçü yok, direkt fiyat göster */}
        {isFonProduct ? (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">2 Kanat Fon Perde</span>
                <br />
                Standart ölçülerde hazır fiyat
              </p>
            </div>
          </div>
        ) : (
          /* Normal ölçü inputları */
          <div className="space-y-3">
            <div>
              <label htmlFor="width-input" className="block text-sm font-semibold text-slate-700 mb-2">
                Genişlik ({unit}){" "}
                {selectedProduct === "Tül" && <span className="text-xs text-blue-600">(×3 kumaş)</span>}
              </label>
              <input
                id="width-input"
                type="number"
                value={toDisplay(width)}
                onChange={(e) => {
                  const v = Number.parseFloat(e.target.value)
                  const cm = fromDisplay(v)
                  if (typeof cm === "number") onWidthChange(cm)
                }}
                min={minVal}
                max={maxVal}
                step={widthStep}
                aria-label={`Perde genişliği (${unit})`}
                className="w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
              />
              {selectedProduct === "Tül" && (
                <p className="text-xs text-slate-500 mt-1">💡 1 metre genişlikte 3 metre kumaş kullanılır</p>
              )}
            </div>

            {/* Boy inputu: tüm ürünlerde göster (Fon hariç). Tül/Güneşlik/Blackout için fiyat sadece genişlikten hesaplanır */}
            {!isFonProduct && (
              <div>
                <label htmlFor="height-input" className="block text-sm font-semibold text-slate-700 mb-2">
                  Yükseklik ({unit})
                </label>
                <input
                  id="height-input"
                  type="number"
                  value={toDisplay(height)}
                  onChange={(e) => {
                    const v = Number.parseFloat(e.target.value)
                    const cm = fromDisplay(v)
                    if (typeof cm === "number") onHeightChange(cm)
                  }}
                  min={minVal}
                  max={maxVal}
                  step={heightStep}
                  aria-label={`Perde yüksekliği (${unit})`}
                  className="w-full px-4 py-3 text-lg border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all"
                />
              </div>
            )}
          </div>
        )}

        {/* Fiyat Display - Büyük ve Göze Çarpan */}
        <motion.div
          initial={false}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.3 }}
          key={`${displayMinPrice}-${displayMaxPrice}`}
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-5 lg:p-6 text-white text-center shadow-xl"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              {isFonProduct ? "Sabit Fiyat Aralığı" : "Tahmini Fiyat"}
            </p>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{unitPrice}</span>
          </div>

          {hasRange ? (
            <div className="space-y-1">
              <p className="text-3xl lg:text-4xl font-bold tracking-tight">
                {Math.round(displayMinPrice).toLocaleString("tr-TR")} -{" "}
                {Math.round(displayMaxPrice).toLocaleString("tr-TR")} ₺
              </p>
            </div>
          ) : (
            <p className="text-4xl lg:text-5xl font-bold tracking-tight mb-1">
              {Math.round(displayMinPrice).toLocaleString("tr-TR")} ₺
            </p>
          )}

          {!isFonProduct && !isWidthBasedProduct && (
            <p className="text-xs text-slate-400 mt-2">Alan: {((width * height) / 10000).toFixed(2)} m²</p>
          )}
          {isWidthBasedProduct && selectedProduct !== "Fon" && (
            <p className="text-xs text-slate-400 mt-2">
              {selectedProduct === "Tül" ? `${width} cm × 3 = ${width * 3} cm kumaş` : `Genişlik: ${width} cm`}
            </p>
          )}
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAddToCart}
            className="w-full px-4 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-lg text-base lg:text-lg"
          >
            🛒 Sepete Ekle
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onQuoteClick}
            className="w-full px-4 py-3 border-2 border-slate-900 text-slate-900 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-base lg:text-lg"
          >
            📋 Teklif İste
          </motion.button>
        </div>
      </div>

      {/* Alt Info Note - Flex shrink-0 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-3 bg-blue-50 border border-blue-200 rounded-xl shrink-0"
      >
        <p className="text-xs text-blue-900 text-center leading-tight">
          💡 Ölçü konusunda emin değilseniz, <span className="font-semibold">ücretsiz keşif</span> için gelebiliriz.
        </p>
      </motion.div>
    </motion.div>
  )
}
