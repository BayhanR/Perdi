"use client"

import Link from 'next/link'

export default function UlucakPerdeciPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">Ulucak Perdeci</h1>
          <p className="text-primary-foreground/90 text-lg">
            Stor, Zebra, Tül, Fon, Blackout, Jaluzi ve Plise perdelerde ücretsiz keşif, ölçü ve montaj.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Tül Perde', desc: 'Şık ve zarif tül perde çözümleri', slug: 'tul' },
            { title: 'Güneşlik', desc: 'Güneş kontrolü ve mahremiyet', slug: 'guneslik' },
            { title: 'Fon Perde', desc: 'Odaya derinlik katan fon perdeler', slug: 'fon' },
            { title: 'Stor Perde', desc: 'Modern ve kullanışlı stor sistemleri', slug: 'stor' },
            { title: 'Jaluzi', desc: 'Alüminyum ve ahşap jaluzi seçenekleri', slug: 'jaluzi' },
            { title: 'Blackout', desc: 'Tam karartma sağlayan blackout kumaşlar', slug: 'blackout' },
          ].map((s) => (
            <div key={s.slug} className="rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{s.title}</h2>
              <p className="text-slate-600 mt-1 text-sm">{s.desc} — Ulucak & Kemalpaşa</p>
              <div className="mt-4 flex gap-3">
                <Link href="/fiyat-teklifi" className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">
                  Fiyat Al
                </Link>
                <a href="#sss" className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50">
                  SSS
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div id="sss" className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Sık Sorulan Sorular</h2>
          <div className="space-y-3">
            {[
              {
                q: 'Keşif ve ölçü ücretsiz mi?',
                a: 'Evet, Ulucak ve çevresinde ücretsiz keşif/ölçü hizmeti veriyoruz.',
              },
              {
                q: 'Montaj süresi ne kadar?',
                a: 'Ürün tipine bağlı olarak ortalama 2-5 iş günü içinde montaj yapılır.',
              },
              {
                q: 'Hangi markalarla çalışıyorsunuz?',
                a: 'Sektörün önde gelen tül, stor ve mekanizma tedarikçileri ile çalışıyoruz.',
              },
            ].map((f, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200">
                <p className="font-medium text-slate-900">{f.q}</p>
                <p className="text-slate-600 mt-1 text-sm">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Keşif ve ölçü ücretsiz mi?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Evet, Ulucak ve çevresinde ücretsiz keşif/ölçü hizmeti veriyoruz.',
                },
              },
              {
                '@type': 'Question',
                name: 'Montaj süresi ne kadar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ürün tipine bağlı olarak ortalama 2-5 iş günü içinde montaj yapılır.',
                },
              },
              {
                '@type': 'Question',
                name: 'Hangi markalarla çalışıyorsunuz?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Sektörün önde gelen tül, stor ve mekanizma tedarikçileri ile çalışıyoruz.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  )
}


