import { MetadataRoute } from 'next'

export async function GET() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tezerperde.com'
  const paths = ['', 'galeri', 'fiyat-teklifi', 'portfolio', 'kemalpasa-perdeci', 'ulucak-perdeci']
  const now = new Date()
  const sitemap = paths.map((p) => ({
    url: `${SITE_URL}${p ? `/${p}` : ''}`,
    lastModified: now,
    changeFrequency: p ? 'weekly' : 'monthly',
    priority: p ? 0.8 : 1,
  }))

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemap.map((item) => `
        <url>
          <loc>${item.url}</loc>
          <lastmod>${item.lastModified.toISOString()}</lastmod>
          <changefreq>${item.changeFrequency}</changefreq>
          <priority>${item.priority}</priority>
        </url>
      `).join('')}
    </urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
