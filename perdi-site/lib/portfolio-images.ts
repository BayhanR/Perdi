"use server"

import { promises as fs } from "fs"
import path from "path"
import { getTezerperdePortfolioImages } from "./bayhan-portfolio"

export interface PortfolioImage {
  name: string
  url: string
  size?: number
  uploadedAt: string
  productId?: string
  productName?: string
}

const FALLBACK_DIR = path.join(process.cwd(), "public", "uploads", "portfolio")
const FALLBACK_PUBLIC_PREFIX = "/uploads/portfolio"

const directoryFromEnv = process.env.PORTFOLIO_IMAGE_DIR
const publicPrefixFromEnv = process.env.NEXT_PUBLIC_PORTFOLIO_BASE_URL
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

const imageDir = directoryFromEnv ? path.resolve(directoryFromEnv) : FALLBACK_DIR
const publicPrefix = (publicPrefixFromEnv || FALLBACK_PUBLIC_PREFIX).replace(/\/$/, "")

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]

/**
 * Portfolyo resimlerini çek
 * Önce BayhanTech API'den çeker, yoksa dosya sisteminden okur
 */
export async function readPortfolioImages(): Promise<PortfolioImage[]> {
  // Önce BayhanTech API'den çekmeyi dene
  const useBayhanApi = process.env.USE_BAYHAN_API === "true" || process.env.BAYHAN_API_URL

  if (useBayhanApi) {
    try {
      const bayhanImages = await getTezerperdePortfolioImages()
      if (bayhanImages.length > 0) {
        return bayhanImages
      }
    } catch (error) {
      console.error("BayhanTech API error, falling back to file system:", error)
    }
  }

  // Fallback: Dosya sisteminden oku
  return readPortfolioImagesFromFileSystem()
}

/**
 * Dosya sisteminden portfolyo resimlerini oku
 */
async function readPortfolioImagesFromFileSystem(): Promise<PortfolioImage[]> {
  try {
    await ensureDirectory()
    const entries = await fs.readdir(imageDir, { withFileTypes: true })

    const files = entries.filter((entry) => entry.isFile() && isImage(entry.name))

    const stats = await Promise.all(
      files.map(async (file) => {
        const fullPath = path.join(imageDir, file.name)
        const stat = await fs.stat(fullPath)
        return {
          name: file.name,
          size: stat.size,
          uploadedAt: stat.mtime.toISOString(),
        }
      }),
    )

    return stats
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
      .map((file) => ({
        ...file,
        url: buildPublicUrl(file.name),
      }))
  } catch (error) {
    console.error("File system read error:", error)
    return []
  }
}

function isImage(fileName: string) {
  const lower = fileName.toLowerCase()
  return IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext))
}

function buildPublicUrl(fileName: string) {
  const encoded = fileName
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")
  return `${basePath}${publicPrefix}/${encoded}`
}

async function ensureDirectory() {
  await fs.mkdir(imageDir, { recursive: true })
}

