"use server"

const BAYHAN_API_URL = process.env.BAYHAN_API_URL || "https://bayhan.tech"
const BAYHAN_API_TOKEN = process.env.BAYHAN_API_TOKEN
const TEZERPERDE_CATEGORY = "perdeci"

export interface BayhanProduct {
  id: string
  name: string
  description: string | null
  category: string
  createdAt: string
}

export interface PortfolioImage {
  name: string
  url: string
  size?: number
  uploadedAt: string
  productId?: string
  productName?: string
}

/**
 * BayhanTech API'den Tezerperde (perdeci) category'sindeki product'ları çek
 * 
 * Not: BayhanTech'de şu endpoint'lerden biri olmalı:
 * - GET /api/products?category=perdeci
 * - GET /api/public/products?category=perdeci
 * - GET /api/portal/products?category=perdeci
 */
export async function getTezerperdeProducts(): Promise<BayhanProduct[]> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (BAYHAN_API_TOKEN) {
      headers["Authorization"] = `Bearer ${BAYHAN_API_TOKEN}`
    }

    // Farklı endpoint'leri dene
    const endpoints = [
      `/api/products?category=${TEZERPERDE_CATEGORY}`,
      `/api/public/products?category=${TEZERPERDE_CATEGORY}`,
      `/api/portal/products?category=${TEZERPERDE_CATEGORY}`,
    ]

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${BAYHAN_API_URL}${endpoint}`, {
          headers,
          cache: "no-store",
        })

        if (response.ok) {
          const data = await response.json()
          const products = data.products || data || []
          if (Array.isArray(products) && products.length > 0) {
            return products
          }
        }
      } catch (err) {
        // Sonraki endpoint'i dene
        continue
      }
    }

    console.warn("BayhanTech products API: No working endpoint found. Products endpoint may need to be created.")
    return []
  } catch (error) {
    console.error("BayhanTech products fetch error:", error)
    return []
  }
}

/**
 * Bir product'un tüm resimlerini çek
 */
export async function getProductImages(productId: string): Promise<string[]> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (BAYHAN_API_TOKEN) {
      headers["Authorization"] = `Bearer ${BAYHAN_API_TOKEN}`
    }

    const response = await fetch(`${BAYHAN_API_URL}/api/images/public/products/${productId}`, {
      headers,
      cache: "no-store",
    })

    if (!response.ok) {
      console.error(`BayhanTech images API error for product ${productId}: ${response.status}`)
      return []
    }

    const data = await response.json()
    return data.images || []
  } catch (error) {
    console.error(`BayhanTech images fetch error for product ${productId}:`, error)
    return []
  }
}

/**
 * Tezerperde portfolyosu için tüm resimleri çek
 * Her product'un resimlerini birleştirir
 */
export async function getTezerperdePortfolioImages(): Promise<PortfolioImage[]> {
  try {
    const products = await getTezerperdeProducts()

    if (products.length === 0) {
      return []
    }

    // Her product'un resimlerini çek
    const allImages: PortfolioImage[] = []

    for (const product of products) {
      const imageUrls = await getProductImages(product.id)

      for (const imageUrl of imageUrls) {
        // URL'den dosya adını çıkar
        const fileName = imageUrl.split("/").pop() || `product-${product.id}.jpg`
        const name = fileName.replace(/\.[^/.]+$/, "")

        allImages.push({
          name,
          url: imageUrl.startsWith("http") ? imageUrl : `${BAYHAN_API_URL}${imageUrl}`,
          uploadedAt: product.createdAt || new Date().toISOString(),
          productId: product.id,
          productName: product.name,
        })
      }
    }

    // En yeni tarihe göre sırala
    return allImages.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
  } catch (error) {
    console.error("Tezerperde portfolio images fetch error:", error)
    return []
  }
}

