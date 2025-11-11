"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import type { CartItem } from "./curtain-configurator"

interface CartSummaryProps {
  items: CartItem[]
  onClose: () => void
  onRemove: (id: string) => void
  onRequestQuote?: () => void
}

export default function CartSummary({ items, onClose, onRemove, onRequestQuote }: CartSummaryProps) {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-40"
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ type: "spring", damping: 30 }}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50">
          <div>
            <h2 className="text-xl font-light text-slate-900">Sepet Özeti</h2>
            <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-600">
              <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />
              Muhteşem Kasım İndirimi Aktif
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Sepeti kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-slate-500 py-8">Sepetiniz boş</p>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex justify-between items-start p-4 bg-slate-50 rounded-lg"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-900">{item.type}</p>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-700">
                      Kasım Fırsatı
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    {item.width}cm × {item.height}cm
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-400 line-through">
                      Liste: {Math.round(item.price * 1.5385).toLocaleString("tr-TR")} ₺
                    </span>
                    <p className="text-sm font-semibold text-rose-600">
                      Kasım Fiyatı: {item.price.toLocaleString("tr-TR")} ₺
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Sil
                </button>
              </motion.div>
            ))
          )}
        </div>

        {/* Total and Checkout */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 p-6 space-y-4 bg-gradient-to-br from-amber-50 via-white to-rose-50">
            <div className="flex items-center justify-between">
              <span className="text-lg font-light text-slate-900">Toplam:</span>
              <div className="text-right">
                <span className="block text-xs text-slate-400 line-through">
                  Standart Fiyat: {Math.round(totalPrice * 1.5385).toLocaleString("tr-TR")} ₺
                </span>
                <span className="text-2xl font-semibold text-rose-600">
                  Kasım Fiyatı: {totalPrice.toLocaleString("tr-TR")} ₺
                </span>
              </div>
            </div>
            <p className="text-xs text-rose-600 font-medium uppercase tracking-wide">
              Muhteşem Kasım İndirimi ile fiyatınız sabitlendi! Stoklarla sınırlı.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onRequestQuote && onRequestQuote()}
              className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Teklif Gönder
            </motion.button>
          </div>
        )}
      </motion.div>
    </>
  )
}
