"use client"

import { useState, useEffect } from "react"
import type { SVGProps } from "react"

function MenuIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="3" x2="21" y1="6" y2="6" />
      <line x1="3" x2="21" y1="12" y2="12" />
      <line x1="3" x2="21" y1="18" y2="18" />
    </svg>
  )
}

function XIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
// Basit button kullanımı, ek bağımlılıkları azaltmak için
import Logo from "@/components/logo" // Fixed logo import path

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary shadow-lg" : "bg-primary/95"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo className="text-primary-foreground animate-fade-in" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("anasayfa")}
              className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium"
            >
              Ana Sayfa
            </button>
            <button
              onClick={() => scrollToSection("hizmetler")}
              className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium"
            >
              Hizmetler
            </button>
            <button
              onClick={() => scrollToSection("portfolyo")}
              className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium"
            >
              Portfolyo
            </button>
            <button
              onClick={() => scrollToSection("markalar")}
              className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium"
            >
              Markalar
            </button>
            <button
              onClick={() => scrollToSection("iletisim")}
              className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium"
            >
              İletişim
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground hover:bg-primary-foreground/10 inline-flex items-center justify-center h-9 w-9 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menüyü Aç/Kapat"
          >
            {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("anasayfa")}
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium text-left"
              >
                Ana Sayfa
              </button>
              <button
                onClick={() => scrollToSection("hizmetler")}
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium text-left"
              >
                Hizmetler
              </button>
              <button
                onClick={() => scrollToSection("portfolyo")}
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium text-left"
              >
                Portfolyo
              </button>
              <button
                onClick={() => scrollToSection("markalar")}
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium text-left"
              >
                Markalar
              </button>
              <button
                onClick={() => scrollToSection("iletisim")}
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium text-left"
              >
                İletişim
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
