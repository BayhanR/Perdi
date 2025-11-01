"use client"

import type React from "react"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useState } from "react"
import type { CartItem } from "./curtain-configurator"

interface QuoteFormProps {
  cartItems: CartItem[]
  onClose: () => void
}

export default function QuoteForm({ cartItems, onClose }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    message: "", // Opsiyonel mesaj
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Gönderilecek tüm veri
    const quoteData = {
      customerInfo: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        message: formData.message || null, // Boşsa null
      },
      products: cartItems.map(item => ({
        productType: item.type,
        width: item.width,
        height: item.height,
        estimatedPrice: item.price,
      })),
      totalEstimatedPrice: cartItems.reduce((sum, item) => sum + item.price, 0),
      requestDate: new Date().toISOString(),
    }

    // Şu an console'a yazdırıyorum - Backend hazır olunca buraya API call yapılır
    console.log("📋 Teklif İsteği Gönderiliyor:", quoteData)
    
    // TODO: Backend'e gönder
    // fetch('/api/quote', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(quoteData)
    // })

    setSubmitted(true)
    setTimeout(() => {
      onClose()
      setSubmitted(false)
      setFormData({ name: "", phone: "", address: "", message: "" })
    }, 2000)
  }

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

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
      >
        <motion.div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
          {submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center"
              >
                <span className="text-3xl">✓</span>
              </motion.div>
              <h3 className="text-xl font-medium text-slate-900 mb-2">Başarılı!</h3>
              <p className="text-slate-600">Teklifiniz başarıyla gönderildi!</p>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-light text-slate-900">Teklif İsteyin</h2>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" aria-label="Formu kapat">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Seçili Ürünler */}
              {cartItems.length > 0 && (
                <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">
                    Seçili Ürünler ({cartItems.length})
                  </h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="text-xs text-slate-600 flex justify-between">
                        <span>• {item.type} ({item.width}×{item.height} cm)</span>
                        <span className="font-medium">{item.price.toLocaleString("tr-TR")} ₺</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-300 text-sm font-semibold text-slate-900 flex justify-between">
                    <span>Toplam Tahmini:</span>
                    <span>{cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString("tr-TR")} ₺</span>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    İsim <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                    placeholder="Adınız Soyadınız"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Telefon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                    placeholder="0(5XX) XXX XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Adres <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tam adresiniz"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mesaj <span className="text-slate-400">(Opsiyonel)</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Ek bilgi veya sorularınız..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  Teklif İsteği Gönder
                </motion.button>
              </form>

              {/* Info */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                <p className="text-sm text-blue-900">
                  Ölçü konusunda emin değilseniz, <span className="font-medium">ücretsiz keşif</span> için gelebiliriz.
                </p>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}

