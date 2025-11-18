This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Teknoloji Sürümleri ve Önemli Notlar

### Sürüm Bilgileri
- **Next.js**: 16.0.1
- **React**: 18.3.1
- **React-DOM**: 18.3.1
- **Tailwind CSS**: 4.1.9
- **TypeScript**: 5.x

### Önemli Notlar

#### Next.js 16 ve Turbopack
Next.js 16'da Turbopack varsayılan olarak etkin. Bu proje webpack yapılandırması kullanıyor, bu nedenle `next.config.ts` dosyasında `turbopack: {}` boş konfigürasyonu eklenmiştir. Bu sayede webpack yapılandırması korunur ve build başarıyla çalışır.

#### React 18.3.1 Uyumluluğu
Next.js 16 ile uyumlu olması için React ve React-DOM 18.3.1 sürümüne güncellenmiştir. Eski 18.2.0 sürümü build hatalarına neden olabilir.

#### Tailwind CSS 4
Proje Tailwind CSS 4 kullanmaktadır. Yeni sözdizimi için:
- `@import "tailwindcss"` kullanılır (eski `@tailwind` direktifleri yerine)
- PostCSS yapılandırması `@tailwindcss/postcss` plugin'ini kullanır

#### Build Sorunları Çözümü
Eğer build alırken "Unexpected end of JSON input" hatası alırsanız:
1. `node_modules` ve `package-lock.json` dosyalarını silin
2. `npm install` komutunu çalıştırın
3. `npm run build` ile tekrar deneyin

## Ortam Değişkenleri (.env)

Aşağıdaki değişkenleri `.env.local` dosyanıza ekleyin (veya barındırma ortamında Environment Variables olarak tanımlayın):

```
# Site URL'iniz (OG, canonical, sitemap, robots için kullanılır)
NEXT_PUBLIC_SITE_URL=https://tezerperde.com

# Site alt dizinde çalışacaksa (örn: /perdi). Kökteyse boş bırakın
NEXT_PUBLIC_BASE_PATH=

# Resend e-posta ayarları
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM="Teklif <onboarding@resend.dev>"
# Tek bir adres veya virgülle ayırarak birden fazla adres girebilirsiniz
RESEND_TO=info@alanadiniz.com

# Opsiyonel
NEXT_TELEMETRY_DISABLED=1

# BayhanTech Portal API Entegrasyonu (Portfolyo için)
# Portal'dan yüklenen fotoğrafları göstermek için:
BAYHAN_API_URL=https://bayhan.tech
BAYHAN_API_TOKEN=your-token-here  # Opsiyonel, token varsa ekleyin
USE_BAYHAN_API=true  # BayhanTech API'yi kullanmak için true yapın

# VEYA dosya sisteminden okumak için (fallback):
PORTFOLIO_IMAGE_DIR=D:\wwwroot\perdi-site\public\uploads\portfolio
NEXT_PUBLIC_PORTFOLIO_BASE_URL=/uploads/portfolio
```

Notlar:
- `app/api/quote/route.ts` endpoint'i bu değişkenleri kullanarak Resend üzerinden e-posta gönderir.
- `RESEND_FROM` için doğrulanmış bir domain kullanmanız önerilir (SPF/DKIM).
- Alt dizinle yayın yapacaksanız `next.config.ts` içindeki `basePath` otomatik olarak `NEXT_PUBLIC_BASE_PATH`'i kullanır.
- **Portfolyo Resimleri**: BayhanTech portal'ından yüklenen fotoğraflar otomatik olarak portfolyoda görünür. `USE_BAYHAN_API=true` yapın ve `BAYHAN_API_URL` ayarlayın.