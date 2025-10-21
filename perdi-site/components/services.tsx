"use client"

import { useEffect, useState } from "react"
import type { SVGProps } from "react"

function TruckIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 17h4V5H2v12h3" />
      <path d="M14 17h2a2 2 0 0 0 2-2v-3h3l-3-4h-2" />
      <circle cx="5" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}

function WrenchIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a4 4 0 1 0-5.66 5.66l-.7.7a2 2 0 1 0 2.83 2.83l.7-.7A4 4 0 0 0 14.7 6.3Z" />
      <path d="M9 13l-4 4" />
    </svg>
  )
}

function RulerIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m16 2 6 6L8 22l-6-6Z" />
      <path d="M7 7l3 3" />
      <path d="M10 10l3 3" />
      <path d="M13 13l3 3" />
    </svg>
  )
}

function SparklesIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
      <path d="M5 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" />
      <path d="M19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" />
    </svg>
  )
}

function ClockIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

function ShieldIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  )
}

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
      icon: RulerIcon,
      title: "Ücretsiz Ölçüm",
      description: "Uzman ekibimiz mekanınıza gelerek profesyonel ölçüm hizmeti sunar.",
    },
    {
      icon: SparklesIcon,
      title: "Tasarım Danışmanlığı",
      description: "Mekanınıza en uygun perde ve kumaş seçiminde size rehberlik ederiz.",
    },
    {
      icon: WrenchIcon,
      title: "Profesyonel Montaj",
      description: "Deneyimli montaj ekibimiz ile kusursuz kurulum garantisi.",
    },
    {
      icon: TruckIcon,
      title: "Hızlı Teslimat",
      description: "Siparişlerinizi özenle hazırlayıp adresinize güvenle teslim ediyoruz.",
    },
    {
      icon: ClockIcon,
      title: "Zamanında Hizmet",
      description: "Belirlenen tarih ve saatte eksiksiz hizmet anlayışı.",
    },
    {
      icon: ShieldIcon,
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
