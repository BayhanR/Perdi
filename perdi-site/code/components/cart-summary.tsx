"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import type { CartItem } from "./curtain-configurator"

interface CartSummaryProps {
  items: CartItem[]
  onClose: () => void
  onRemove: (id: string) => void
}

export default function CartSummary({ items, onClose, onRemove }: CartSummaryProps) {
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
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-xl font-light text-slate-900">Sepet Özeti</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
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
                <div>
                  <p className="font-medium text-slate-900">{item.type}</p>
                  <p className="text-sm text-slate-600 mt-1">
                    {item.width}cm × {item.height}cm
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-2">{item.price.toLocaleString("tr-TR")} ₺</p>
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
          <div className="border-t border-slate-200 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-light text-slate-900">Toplam:</span>
              <span className="text-2xl font-light text-slate-900">{totalPrice.toLocaleString("tr-TR")} ₺</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Siparişi Tamamla
            </motion.button>
          </div>
        )}
      </motion.div>
    </>
  )
}
