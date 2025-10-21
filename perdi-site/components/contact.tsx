"use client"

import { useEffect, useState } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contact() {
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

    const element = document.getElementById("iletisim")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="iletisim" className="py-24 bg-background relative">
      {/* Background decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-0 w-full h-px bg-primary/20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 text-balance">İletişim</h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Adres</h3>
                  <p className="text-muted-foreground font-medium">
                    <a href="https://maps.app.goo.gl/AuMwU5w4Pz6sauXH7" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Soğukpınar, İnönü Cd. 36 A, 35730 Kemalpaşa/İzmir
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Telefon</h3>
                  <a href="tel:+905427740726" className="text-muted-foreground hover:text-primary transition-colors">
                    +90 542 774 07 26
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Erdi Tezer</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">E-posta</h3>
                  <a
                    href="mailto:erditezer@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    erditezer@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Çalışma Saatleri</h3>
                  <p className="text-muted-foreground">Pazartesi - Cumartesi: 08:30 - 20:00</p>
                  <p className="text-muted-foreground">Pazar: Kapalı</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-card rounded-lg overflow-hidden shadow-lg h-full min-h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252.84499942676837!2d27.422930294936744!3d38.42498228442342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b97196a20c52c5%3A0x7d4d12c208e3ee27!2sBy%20Tezer%20Perde!5e1!3m2!1str!2str!4v1761047897666!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
