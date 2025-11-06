import Header from "@/components/header"
import Hero from "@/components/hero"
import Portfolio from "@/components/portfolio"
import Brands from "@/components/brands"
import FAQ from "@/components/faq"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "Tezer Perde | Kemalpaşa & Ulucak Perdeci" },
  description:
    "Kemalpaşa ve Ulucak’ta stor, zebra, tül, fon, blackout ve jaluzi perde çözümleri. Ücretsiz keşif ve profesyonel montaj.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Portfolio />
      <Brands />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}
