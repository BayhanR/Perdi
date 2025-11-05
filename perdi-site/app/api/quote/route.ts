import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const data = await req.json()
    // Prefer customer key; fall back to generic. Dev key ayrı tutulur
    const apiKeyCus = (process.env.RESEND_API_KEY_CUS || process.env.RESEND_API_KEY || '').trim()
    const apiKeyDev = (process.env.RESEND_API_KEY_DEV || apiKeyCus).trim()

    // Resolve recipients from either new or legacy envs
    const cusEnvRaw = (process.env.RESEND_TO_CUS || process.env.RESEND_TO || process.env.EMAIL_TO || "info@example.com").trim()
    const cusList = cusEnvRaw.includes(',') ? cusEnvRaw.split(',').map((s) => s.trim()).filter(Boolean) : [cusEnvRaw]

    const rawFrom = (process.env.RESEND_FROM || "Bayhan.Tech Bildirim <onboarding@resend.dev>").trim()
    // normalize quotes coming from .env
    const unquoted = rawFrom.replace(/^"|"$/g, '').replace(/^'|'$/g, '')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const nameEmailRegex = /^.+<\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*>$/
    let from = ''
    if (nameEmailRegex.test(unquoted) || emailRegex.test(unquoted)) {
      from = unquoted
    } else if (unquoted) {
      // If only a name is provided, attach a default sender address
      from = `${unquoted} <onboarding@resend.dev>`
    } else {
      from = 'Teklif <onboarding@resend.dev>'
    }

    // Optionally add developer recipient(s) as extra emails
    const legacyDevRaw = (process.env.RESEND_DEV_EMAIL || process.env.DEV_EMAIL || '').trim()
    const newDevRaw = (process.env.RESEND_TO_DEV || legacyDevRaw).trim()
    const devName = (process.env.RESEND_DEV_NAME || 'Developer').trim()
    let devRecipient: string | null = null
    const devList: string[] = []
    if (newDevRaw) {
      const parts = newDevRaw.includes(',') ? newDevRaw.split(',').map((s) => s.trim()).filter(Boolean) : [newDevRaw]
      for (const p of parts) {
        if (!p) continue
        if (nameEmailRegex.test(p)) devList.push(p)
        else if (emailRegex.test(p)) devList.push(`${devName} <${p}>`)
      }
      if (devList.length === 1) devRecipient = devList[0]
    }

    // Build final recipients list without duplicates (by email address)
    const extractEmail = (s: string) => {
      const m = s.match(/<\s*([^>]+)\s*>$/)
      return m ? m[1].toLowerCase() : s.toLowerCase()
    }
    const toSet = new Map<string, string>()
    for (const r of cusList) {
      const key = extractEmail(r)
      if (!toSet.has(key)) toSet.set(key, r)
    }
    if (devList.length > 0) {
      for (const r of devList) {
        const key = extractEmail(r)
        if (!toSet.has(key)) toSet.set(key, r)
      }
    } else if (devRecipient) {
      const key = extractEmail(devRecipient)
      if (!toSet.has(key)) toSet.set(key, devRecipient)
    }
    // Split back into customer/dev lists (deduped)
    const cusSet = new Map<string, string>()
    for (const r of cusList) {
      const key = extractEmail(r)
      if (!cusSet.has(key)) cusSet.set(key, r)
    }
    const devOnlySet = new Map<string, string>()
    for (const r of (devList.length > 0 ? devList : (devRecipient ? [devRecipient] : []))) {
      const key = extractEmail(r)
      if (!cusSet.has(key) && !devOnlySet.has(key)) devOnlySet.set(key, r)
    }
    const toCustomers: string[] = Array.from(cusSet.values())
    const toDevelopers: string[] = Array.from(devOnlySet.values())

    if (!apiKeyCus) {
      return NextResponse.json({ ok: false, error: "RESEND_API_KEY missing" }, { status: 500 })
    }

    const ascii = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\x00-\x7F]/g, '')
    const base = data?.measurementRequest ? "Olcu Alma Talebi" : "Yeni Teklif Talebi"
    const subject = ascii(`[Bayhan.Tech] Musteri Bildirimi - ${base}`)

    // Build HTML summary
    const escapeHtml = (str: string) =>
      (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/'/g, '&#39;')

    const customer = data?.customerInfo || {}
    const items: any[] = Array.isArray(data?.products) ? data.products : []
    const total = Number(data?.totalEstimatedPrice || 0)

    const formatMeters = (cm: number) => {
      const meters = Number(cm || 0) / 100
      return `${meters.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} m`
    }

    const listHtml = items
      .map((it) => {
        const w = formatMeters(Number(it.width || 0))
        const h = formatMeters(Number(it.height || 0))
        const price = Number(it.estimatedPrice || 0).toLocaleString("tr-TR")
        return `<li>${it.productType} - ${w} × ${h} — ~${price} ₺</li>`
      })
      .join("")

    const measurementHtml = data?.measurementRequest
      ? `<div style="margin:12px 0;padding:10px;border-radius:8px;background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;font-weight:700;letter-spacing:.5px;text-transform:uppercase">ÖLÇÜ DURUMU: EVET – ÖLÇÜYE GİDİLECEK</div>`
      : `<div style="margin:12px 0;padding:10px;border-radius:8px;background:#fef2f2;color:#991b1b;border:1px solid #fecaca;font-weight:700;letter-spacing:.5px;text-transform:uppercase">ÖLÇÜ DURUMU: HAYIR – ÖLÇÜYE GİDİLMEYECEK</div>`

    const html = `
      <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:14px;color:#0f172a">
        <div style="margin:0 0 10px 0;padding:10px;border-radius:8px;background:#111827;color:#fff;font-weight:700">Bayhan.Tech Müşteri Bildirimi</div>
        <h2 style="margin:0 0 8px 0">${subject}</h2>
        <p style="margin:0 0 8px 0">Tarih: ${new Date().toLocaleString("tr-TR")}</p>
        ${measurementHtml}
        <h3 style="margin:16px 0 6px 0">Müşteri Bilgileri</h3>
        <p style="margin:0">Ad: <b>${escapeHtml(customer.name)}</b></p>
        <p style="margin:0">Telefon: <b>${escapeHtml(String(customer.phone || ''))}</b></p>
        <p style="margin:0 0 8px 0">Adres: ${escapeHtml(customer.address)}</p>
        ${customer.message ? `<p style="margin:0 0 12px 0"><i>Mesaj:</i> ${escapeHtml(customer.message)}</p>` : ""}
        <h3 style="margin:16px 0 6px 0">Ürünler</h3>
        <ul style="margin:0 0 12px 20px; padding:0">${listHtml}</ul>
        <p style="margin:8px 0 0 0">Toplam Tahmini: <b>${total.toLocaleString("tr-TR")} ₺</b></p>
        <p style="margin:4px 0 0 0;color:#6b7280;font-size:12px">Not: Bu tutar ortalama bir tahmindir; keşif ve ürün tercihlerine göre netleşir.</p>
        <p style="margin:16px 0 0 0;color:#6b7280;font-size:12px">Bu e-posta Bayhan.Tech altyapısı üzerinden otomatik oluşturulmuştur.</p>
      </div>`

    const text = [
      'Bayhan.Tech Müşteri Bildirimi',
      subject,
      `Tarih: ${new Date().toLocaleString('tr-TR')}`,
      data?.measurementRequest ? 'ÖLÇÜ DURUMU: EVET' : 'ÖLÇÜ DURUMU: HAYIR',
      'Müşteri Bilgileri:',
      `Ad: ${customer.name || ''}`,
      `Telefon: ${String(customer.phone || '')}`,
      `Adres: ${customer.address || ''}`,
      customer.message ? `Mesaj: ${customer.message}` : '',
      'Ürünler:',
      ...items.map((it) => `${it.productType} - ${(Number(it.width||0)/100).toFixed(2)} m x ${(Number(it.height||0)/100).toFixed(2)} m — ~${Number(it.estimatedPrice||0).toLocaleString('tr-TR')} ₺`),
      `Toplam Tahmini: ${total.toLocaleString('tr-TR')} ₺`,
      'Not: Bu tutar ortalama bir tahmindir; keşif ve ürün tercihlerine göre netleşir.',
    ].filter(Boolean).join('\n')

    // Önce geliştirici kopyasını gönder
    let devId: string | null = null
    let devError: string | null = null
    if (toDevelopers.length > 0) {
      const devResp = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKeyDev}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to: toDevelopers, subject: `[DEV] ${subject}`, html, text }),
      })
      if (devResp.ok) {
        const dj = await devResp.json()
        devId = dj?.id || null
      } else {
        const txt = await devResp.text().catch(() => '')
        console.error('DEV email send failed', devResp.status, txt)
        devError = `status=${devResp.status} body=${txt}`
      }
    }

    // Sonra müşteri/alıcı kopyası
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKeyCus}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: toCustomers, subject, html, text }),
    })

    if (!resp.ok) {
      const err = await resp.text()
      return NextResponse.json({ ok: false, error: err }, { status: 502 })
    }

    const json = await resp.json()

    return NextResponse.json({ ok: true, id: json?.id || null, devId, devError })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "unknown" }, { status: 500 })
  }
}

