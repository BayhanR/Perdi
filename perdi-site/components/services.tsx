"use client"

import { useEffect, useState } from "react"
import { Truck, Wrench, Ruler, Sparkles, Clock, Shield } from "lucide-react"

export default function Services() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("hizmetler")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      icon: Ruler,
      title: "Ücretsiz Ölçüm",
      description: "Uzman ekibimiz mekanınıza gelerek profesyonel ölçüm hizmeti sunar.",
    },
    {
      icon: Sparkles,
      title: "Tasarım Danışmanlığı",
      description: "Mekanınıza en uygun perde ve kumaş seçiminde size rehberlik ederiz.",
    },
    {
      icon: Wrench,
      title: "Profesyonel Montaj",
      description: "Deneyimli montaj ekibimiz ile kusursuz kurulum garantisi.",
    },
    {
      icon: Truck,
      title: "Hızlı Teslimat",
      description: "Siparişlerinizi özenle hazırlayıp adresinize güvenle teslim ediyoruz.",
    },
    {
      icon: Clock,
      title: "Zamanında Hizmet",
      description: "Belirlenen tarih ve saatte eksiksiz hizmet anlayışı.",
    },
    {
      icon: Shield,
      title: "Garanti",
      description: "Tüm ürün ve hizmetlerimizde kapsamlı garanti güvencesi.",
    },
  ]

  return (
    <section id="hizmetler" className="py-24 bg-secondary/30 relative">
      {/* Background decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-0 w-full h-px bg-primary/20" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-primary/20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">Hizmetlerimiz</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Profesyonel ekibimiz ve kaliteli hizmet anlayışımızla yanınızdayız
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-card rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground text-pretty">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
