import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  webpack: (config) => {
    // Kaynak haritaları tamamen kapat (bozuk .map kaynaklı hataları önler)
    ;(config as any).devtool = false

    // source-map-loader kullanan kuralları devre dışı bırak / filtrele
    // Özellikle node_modules içindeki paketlerin .map dosyalarını okumasını engelle
    config.module.rules = config.module.rules.map((rule: any) => {
      if (rule && typeof rule === "object" && "oneOf" in rule) {
        rule.oneOf = (rule.oneOf as any[]).map((one) => {
          if (one && Array.isArray((one as any).use)) {
            ;(one as any).use = (one as any).use.filter((u: any) => {
              const loader = typeof u === "string" ? u : u?.loader
              return !(loader && loader.includes("source-map-loader"))
            })
          }
          // Ayrıca lucide-react gibi paketleri source map işleminden hariç tut
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

    // Source map uyarılarını yok say (bazı ortamlarda hata olarak değerlendirilebiliyor)
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /node_modules\\lucide-react\\.*\.js$/, message: /source map/i },
      { module: /node_modules\\.*\.js$/, message: /Failed to parse source map/i },
    ]

    return config
  },
}

export default nextConfig;
