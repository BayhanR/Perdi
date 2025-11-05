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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tezerperde.com"
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ""
const BUSINESS_PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+90 542 774 07 26"
const BUSINESS_ADDRESS = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "İzmir, Türkiye"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  title: {
    default: "Tezer Perde | Kemalpaşa & Ulucak Perde Modelleri",
    template: "%s | Tezer Perde",
  },
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
    title: "Tezer Perde | İzmir Kemalpaşa & Ulucak Perde Modelleri",
    description:
      "İzmir, Kemalpaşa ve Ulucak bölgesinde stor, zebra, tül, fon, blackout, dikey ve jaluzi perde modellerinde ücretsiz keşif ve montaj.",
    url: "/",
    siteName: "Tezer Perde",
    images: [
      {
        url: "/icon.png",
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
    images: ["/icon.png"],
  },
  alternates: {
    canonical: "/",
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
        <link rel="icon" href={`${BASE_PATH}/favicon.ico`} sizes="any" />
        <link rel="icon" href={`${BASE_PATH}/favicon-32x32.png`} type="image/png" sizes="32x32" />
        <link rel="icon" href={`${BASE_PATH}/icon.png`} type="image/png" />
        <link rel="apple-touch-icon" href={`${BASE_PATH}/apple-icon.png`} />
        <meta name="theme-color" content="#b90e2a" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Tezer Perde',
              url: SITE_URL,
              logo: new URL('/icon.png', SITE_URL).toString(),
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Tezer Perde',
              url: SITE_URL,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Tezer Perde',
              url: SITE_URL,
              telephone: BUSINESS_PHONE,
              image: new URL('/icon.png', SITE_URL).toString(),
              address: {
                '@type': 'PostalAddress',
                streetAddress: BUSINESS_ADDRESS,
                addressLocality: 'İzmir',
                addressCountry: 'TR',
              },
              areaServed: [
                { '@type': 'City', name: 'Kemalpaşa' },
                { '@type': 'City', name: 'Ulucak' },
                { '@type': 'City', name: 'İzmir' }
              ],
              priceRange: '₺₺',
            }),
          }}
        />
      </head>
      <body className={`${lato.variable} font-sans antialiased`}>
        {children}
        {process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === '1' && <Analytics />}
      </body>
    </html>
  )
}
