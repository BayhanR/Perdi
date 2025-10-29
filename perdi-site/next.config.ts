import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  // Artık kök dizinde (/) çalışacak
  productionBrowserSourceMaps: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.VERCEL ? '1' : '0',
  },

  images: {
    // Prod'da image optimizer 400 veriyordu; doğrudan statik dosyaları kullan
    unoptimized: true,
  },

  async redirects() {
    // Hem dev hem prod: eski /portfolio adresini /galeri'ye yönlendir
    return [
      {
        source: '/portfolio',
        destination: '/galeri',
        permanent: false,
      },
    ]
  },

  webpack: (config) => {
    (config as any).devtool = false

    config.module.rules = config.module.rules.map((rule: any) => {
      if (rule && typeof rule === "object" && "oneOf" in rule) {
        rule.oneOf = (rule.oneOf as any[]).map((one) => {
          if (one && Array.isArray((one as any).use)) {
            ;(one as any).use = (one as any).use.filter((u: any) => {
              const loader = typeof u === "string" ? u : u?.loader
              return !(loader && loader.includes("source-map-loader"))
            })
          }
          if (!(one as any).exclude) {
            ;(one as any).exclude = [/node_modules\/lucide-react/]
          } else if (Array.isArray((one as any).exclude)) {
            ;(one as any).exclude.push(/node_modules\/lucide-react/)
          }
          return one
        })
      }
      return rule
    })

    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /node_modules\\lucide-react\\.*\.js$/, message: /source map/i },
      { module: /node_modules\\.*\.js$/, message: /Failed to parse source map/i },
    ]

    return config
  },
}

export default nextConfig
