import { MetadataRoute } from 'next'

export async function GET() {
  const sitemap = [
    {
      url: 'https://tezerperde.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://tezerperde.com/portfolio',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://tezerperde.com/galeri',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

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
