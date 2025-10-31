import type React from "react"
import { Metadata } from "next"
import { Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  title:
    "Tezer Perde | Kemalpaşa & Ulucak Perde Modelleri | İzmir Stor, Zebra, Tül, Fon Perde",
  description:
    "Tezer Perde, Kemalpaşa ve Ulucak'ta perde dekorasyonunun güvenilir adresi. Stor perde, zebra perde, tül perde, fon perde, blackout, jaluzi ve dikey perde modellerinde ücretsiz keşif ve profesyonel montaj.",
  keywords: [
    "tezer perde",
    "kemalpaşa perdeci",
    "ulucak perdeci",
    "izmir perdeci",
    "stor perde",
    "zebra perde",
    "tül perde",
    "fon perde",
    "blackout perde",
    "dikey perde",
    "çocuk odası perdesi",
    "motorlu perde",
    "ofis perdesi",
    "jaluzi perde",
    "perde montajı",
    "perde dekorasyonu",
    "perde mağazası kemalpaşa",
    "perde mağazası ulucak",
  ],
  authors: [{ name: "Tezer Perde" }],
  robots: "index, follow",
  openGraph: {
    title:
      "Tezer Perde | İzmir Kemalpaşa & Ulucak Perde Modelleri | Stor, Zebra, Tül, Fon Perde",
    description:
      "İzmir, Kemalpaşa ve Ulucak bölgesinde stor, zebra, tül, fon, blackout, dikey ve jaluzi perde modellerinde ücretsiz keşif ve montaj.",
    url: "https://tezerperde.com",
    siteName: "Tezer Perde",
    images: [
      {
        url: "https://www.tezerperde.com/favicon.png",
        width: 1200,
        height: 630,
        alt: "Tezer Perde Kemalpaşa İzmir Mağazası",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tezer Perde | İzmir Kemalpaşa & Ulucak Perde Modelleri",
    description:
      "Stor, zebra, tül, fon, blackout, jaluzi ve dikey perde modellerinde profesyonel hizmet.",
    images: ["https://www.tezerperde.com/favicon.png"],
  },
  alternates: {
    canonical: "https://tezerperde.com/",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={`${lato.variable} font-sans antialiased`}>
        {children}
        {process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === '1' && <Analytics />}
      </body>
    </html>
  )
}
