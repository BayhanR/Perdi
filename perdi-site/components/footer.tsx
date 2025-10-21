"use client"

import Logo from "./logo"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-primary text-primary-foreground relative pt-8 pb-0 border-t border-primary-foreground/10 mt-10">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Sütun 1: Logo, açıklama, iletişim */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo size="large" />
            <p className="text-primary-foreground/90 text-sm text-center md:text-left max-w-xs md:max-w-none">
              Yılların deneyimi, kaliteli hizmet ve modern tasarımla alanınıza değer katıyoruz.
            </p>
            <div className="space-y-2 mt-2 w-full text-sm text-primary-foreground/90">
              <a href="https://maps.app.goo.gl/AuMwU5w4Pz6sauXH7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline max-w-full break-words">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 min-w-[20px] text-primary-foreground/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17.657 16.657L13.414 20.899C12.633 21.68 11.367 21.68 10.586 20.899L6.343 16.657C2.048 12.362 6.375 5.25 12 5.25C17.625 5.25 21.952 12.362 17.657 16.657ZM12 13A2 2 0 1 0 12 9a2 2 0 0 0 0 4Z"/></svg>
                Soğukpınar, İnönü Cd. 36 A, 35730 Kemalpaşa/İzmir
              </a>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 min-w-[20px] text-primary-foreground/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8a4 4 0 0 1 8 0c0 1.657-2 4-4 4s-4-2.343-4-4Zm0 0a4 4 0 0 0 8 0m6 8v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a6 6 0 0 1 12 0Z"/></svg>
                <a href="tel:+905427740726" className="hover:underline">+90 542 774 07 26 (Erdi Tezer)</a>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 min-w-[20px] text-primary-foreground/80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm2 6v1a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1"/></svg>
                <a href="mailto:erditezer@gmail.com" className="hover:underline">erditezer@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Sütun 2: Hızlı Linkler */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h4 className="font-semibold text-lg mb-3">Hızlı Linkler</h4>
            <ul className="space-y-1 w-full text-center md:text-left">
              <li><button onClick={() => { const el=document.getElementById('anasayfa'); el?.scrollIntoView({behavior:'smooth'});} } className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Ana Sayfa</button></li>
              <li><button onClick={() => { const el=document.getElementById('hizmetler'); el?.scrollIntoView({behavior:'smooth'});} } className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Hizmetler</button></li>
              <li><button onClick={() => { const el=document.getElementById('portfolyo'); el?.scrollIntoView({behavior:'smooth'});} } className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Portfolyo</button></li>
              <li><button onClick={() => { const el=document.getElementById('markalar'); el?.scrollIntoView({behavior:'smooth'});} } className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Markalar</button></li>
              <li><button onClick={() => { const el=document.getElementById('iletisim'); el?.scrollIntoView({behavior:'smooth'});} } className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">İletişim</button></li>
            </ul>
          </div>

          {/* Sütun 3: Hizmetler */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h4 className="font-semibold text-lg mb-3">Hizmetlerimiz</h4>
            <ul className="space-y-1 w-full text-center md:text-left text-primary-foreground/80">
              <li>Ücretsiz Ölçüm</li>
              <li>Tasarım Danışmanlığı</li>
              <li>Profesyonel Montaj</li>
              <li>Hızlı Teslimat</li>
              <li>Garanti Hizmeti</li>
            </ul>
          </div>

        </div>
      </div>
      {/* Bottom bar */}
      <div className="w-full border-t border-primary-foreground/20 py-4 flex flex-col md:flex-row md:justify-between md:items-center items-center gap-2 text-xs text-primary-foreground/80 bg-primary/80">
        <span>&copy; {currentYear} By Tezer Perde. Tüm hakları saklıdır.</span>
        <span className="md:border-l md:pl-4 border-primary-foreground/30 block">Powered by <a href="https://bayhan.tech" target="_blank" rel="noopener noreferrer" className="underline ml-1">BayhanTech</a></span>
      </div>
    </footer>
  )
}
