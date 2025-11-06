"use client"

import { useState } from "react"

const faqs = [
  {
    q: "Ölçü alıyor musunuz?",
    a: "Evet. Ücretsiz keşif ile yerinde ölçü alıyoruz ve aynı gün teklif sunuyoruz.",
  },
  {
    q: "Yıkama sonrası ütü gerekir mi?",
    a: "Genellikle gerekmez; perdeyi ıslakken asmanız yeterlidir, kırışıklıklar kendiliğinden açılır.",
  },
  {
    q: "Satış sonrası hizmet veriyor musunuz?",
    a: "Evet. Montaj sonrası bakım, ayar ve destek süreçleriyle hizmetimiz devam eder.",
  },
  {
    q: "Ürünleriniz hangi markalara ait?",
    a: "Taç kalitesinde ürünler sunuyoruz; mekanizma ve kumaşlarda güvenilir tedarikçilerle çalışıyoruz.",
  },
  {
    q: "Danışmanlık veriyor musunuz?",
    a: "Evet. Mekân, ışık, kumaş ve kullanım alışkanlıklarınıza uygun en doğru perdeyi birlikte seçiyoruz.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">Sıkça Sorulan Sorular</h2>
          <p className="text-muted-foreground text-lg">Ölçü, kurulum ve marka bilgileri hakkında merak ettikleriniz</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="border border-slate-200 rounded-xl bg-white overflow-hidden">
              <button
                className="w-full text-left px-4 py-3 font-medium text-slate-900 hover:bg-slate-50 flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{f.q}</span>
                <span className="text-slate-500">{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-slate-700 text-sm">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


