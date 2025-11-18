import { NextResponse } from "next/server"

import { readPortfolioImages } from "@/lib/portfolio-images"

export async function GET() {
  try {
    const images = await readPortfolioImages()
    return NextResponse.json({ images })
  } catch (error) {
    console.error("[portfolio-images]", error)
    return NextResponse.json({ error: "Portfolyo görselleri okunamadı." }, { status: 500 })
  }
}

