export async function GET() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tezerperde.com'
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}


