import type React from "react"
import type { Metadata } from "next"
import { Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Perde Mağazası - Portfolyo",
  description: "Profesyonel perde ve dekorasyon çözümleri",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/favicon.png`} type="image/png" />
      </head>
      <body className={`${lato.variable} font-sans antialiased`}>
        {children}
        {process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === '1' && <Analytics />}
      </body>
    </html>
  )
}
