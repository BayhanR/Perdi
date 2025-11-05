"use client"

import type React from "react"

import { motion } from "framer-motion"
import { X, Check, XCircle, Loader2 } from "lucide-react"
import { useState } from "react"
import type { CartItem } from "./curtain-configurator"

interface QuoteFormProps {
  cartItems: CartItem[]
  onClose: () => void
}

export default function QuoteForm({ cartItems, onClose }: QuoteFormProps) {
  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
  }

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    message: "", // Opsiyonel mesaj
  })
  const [submitted, setSubmitted] = useState(false)
  const [measurementRequest, setMeasurementRequest] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; phone?: string; address?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isValidPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, "")
    // +90 5xx xxx xx xx (11 hane) veya yerel 10 hane kabul
    return digits.length === 10 || digits.length === 11
  }

  const sanitize = (str: string) =>
    str
      .replace(/[\u0000-\u001F\u007F]/g, " ") // control chars
      .replace(/[<>]/g, " ")
      .trim()

  const validateForm = () => {
    const nextErrors: { name?: string; phone?: string; address?: string } = {}
    if (!formData.name || formData.name.trim().length < 2) nextErrors.name = "Lütfen adınızı girin"
    if (!isValidPhone(formData.phone)) nextErrors.phone = "Telefon numarasını 10-11 hane olarak girin"
    if (!formData.address || formData.address.trim().length < 5) nextErrors.address = "Adres çok kısa"
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const buildPayload = () => ({
    measurementRequest,
    customerInfo: {
      name: sanitize(formData.name),
      phone: formData.phone.replace(/\D/g, ""),
      address: sanitize(formData.address),
      message: formData.message ? sanitize(formData.message) : null,
    },
    products: cartItems.map((item) => ({
      productType: item.type,
      width: item.width,
      height: item.height,
      estimatedPrice: item.price,
    })),
    totalEstimatedPrice: cartItems.reduce((sum, item) => sum + item.price, 0),
    requestDate: new Date().toISOString(),
  })

  const submitToApi = async (payload: {
    measurementRequest: boolean
    customerInfo: {
      name: string
      phone: string
      address: string
      message: string | null
    }
    products: Array<{
      productType: string
      width: number
      height: number
      estimatedPrice: number
    }>
    totalEstimatedPrice: number
    requestDate: string
  }) => {
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } catch (error) {
      console.error("Quote submission error:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    await submitToApi(buildPayload())
    setSubmitted(true)
    setTimeout(() => {
      onClose()
      setSubmitted(false)
      setFormData({ name: "", phone: "", address: "", message: "" })
      setMeasurementRequest(false)
      setIsSubmitting(false)
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
              <p className="text-slate-500 mt-1">Mağazamıza kahvemizi içmeye bekleriz ☕</p>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-light text-slate-900">Teklif İsteyin</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Formu kapat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Seçili Ürünler */}
              {cartItems.length > 0 && (
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={containerVariants}
                  className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <h3 className="text-sm font-semibold text-slate-700 mb-2">Seçili Ürünler ({cartItems.length})</h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        className="text-xs text-slate-600 flex justify-between"
                      >
                        <span>
                          • {item.type} ({item.width}×{item.height} cm)
                        </span>
                        <span className="font-medium">{item.price.toLocaleString("tr-TR")} ₺</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-300 text-sm font-semibold text-slate-900 flex justify-between">
                    <span>Toplam Tahmini:</span>
                    <span>{cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString("tr-TR")} ₺</span>
                  </div>
                </motion.div>
              )}

              {/* Form */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4 mb-6"
                initial="hidden"
                animate="show"
                variants={containerVariants}
              >
                <div>
                  <motion.label variants={itemVariants} className="block text-sm font-medium text-slate-700 mb-1">
                    İsim <span className="text-red-500">*</span>
                  </motion.label>
                  <motion.input
                    variants={itemVariants}
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                    placeholder="Adınız Soyadınız"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <motion.label variants={itemVariants} className="block text-sm font-medium text-slate-700 mb-1">
                    Telefon <span className="text-red-500">*</span>
                  </motion.label>
                  <motion.input
                    variants={itemVariants}
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    inputMode="tel"
                    pattern="[0-9 +()-]{10,}"
                    maxLength={20}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                    placeholder="0(5XX) XXX XXXX"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                </div>

                <div>
                  <motion.label variants={itemVariants} className="block text-sm font-medium text-slate-700 mb-1">
                    Adres <span className="text-red-500">*</span>
                  </motion.label>
                  <motion.textarea
                    variants={itemVariants}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tam adresiniz"
                  />
                  {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
                </div>

                <div>
                  <motion.label variants={itemVariants} className="block text-sm font-medium text-slate-700 mb-1">
                    Mesaj <span className="text-slate-400">(Opsiyonel)</span>
                  </motion.label>
                  <motion.textarea
                    variants={itemVariants}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Ek bilgi veya sorularınız..."
                  />
                </div>

                <motion.label
                  variants={itemVariants}
                  htmlFor="measure-checkbox"
                  className={`flex items-center gap-2 p-2 rounded-lg border transition-all cursor-pointer select-none ${
                    measurementRequest ? "bg-green-50 border-green-300" : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    id="measure-checkbox"
                    type="checkbox"
                    checked={measurementRequest}
                    onChange={(e) => setMeasurementRequest(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-sm text-slate-700">Ölçü almanızı istiyorum</span>
                </motion.label>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-medium transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${
                    measurementRequest
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Gönderiliyor...
                    </span>
                  ) : measurementRequest ? (
                    "Teklif + Ölçü Talebi Gönder"
                  ) : (
                    "Teklif İsteği Gönder"
                  )}
                </motion.button>
                {/* Measurement status indicator */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-2 flex items-center justify-center gap-2 rounded-md px-3 py-2 border text-sm ${
                    measurementRequest
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  {measurementRequest ? <Check className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  <span>{measurementRequest ? "Ölçüye gidilecek" : "Ölçüye gidilmeyecek"}</span>
                </motion.div>

                {/* Ortalama fiyat notu */}
                <p className="mt-2 text-xs text-slate-600 text-center">
                  Not: Bu tutar ortalama bir tahmindir; mağazada yapılacak keşif ve ürün tercihlerine göre netleşir.
                </p>
              </motion.form>

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