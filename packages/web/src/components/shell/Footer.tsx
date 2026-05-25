import React from 'react'
import { Mono } from '@/components/primitives/Mono'
import { TREATMENT_LIST, WHATSAPP_HREF } from '@/content/seed'
import { useCms } from '@/lib/cms-context'

function toRomanYear(n: number): string {
  if (n <= 0 || n >= 4000) return String(n)
  const M = ['', 'M', 'MM', 'MMM']
  const C = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
  const X = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC']
  const I = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
  return (
    M[Math.floor(n / 1000)] +
    C[Math.floor((n % 1000) / 100)] +
    X[Math.floor((n % 100) / 10)] +
    I[n % 10]
  )
}

export const Footer: React.FC = () => {
  const cms = useCms()
  const fg = cms?.footer
  const settings = cms?.settings

  const treatmentLinks = (cms?.disciplines || [])
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((d) => ({ label: d.title, href: `/treatments/${d.slug}` }))

  const cmsCols = Array.isArray(fg?.linkColumns) ? fg!.linkColumns : []
  const useCmsCols = cmsCols.length > 0
  const wa = settings?.whatsappNumber
  const waHref = wa
    ? wa.startsWith('http') ? wa : `https://wa.me/${wa.replace(/[^0-9]/g, '')}`
    : WHATSAPP_HREF

  const year = new Date().getFullYear()
  const yearRoman = toRomanYear(year)
  const copyright = (fg?.copyrightTemplate || '© {year} BIMC CosMedic Centre').replace('{year}', yearRoman)

  const addr1 = settings?.addressLine1 || 'BIMC Hospital Nusa Dua'
  const addr2 = settings?.addressLine2 || 'Kawasan ITDC Blok D'
  const cityLine = `${settings?.city || 'Nusa Dua'} ${settings?.postalCode || '80363'}, ${settings?.country || 'Bali, Indonesia'}`

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="/" className="logo logo-dark" aria-label="BIMC CosMedic — home">
            <img src="/assets/logo-light.png" alt="BIMC CosMedic" />
          </a>
          <p className="footer-brand-tagline">Managed by BIMC Hospital</p>
          <p>
            {addr1}<br />
            {addr2}<br />
            {cityLine}
          </p>
          <p className="footer-newsletter-label">Receive our quarterly journal</p>
          <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" aria-label="Email address" />
            <button type="submit" aria-label="Subscribe">→</button>
          </form>
        </div>

        <div className="footer-col">
          <Mono>Treatments</Mono>
          <ul>
            {(treatmentLinks.length > 0 ? treatmentLinks : TREATMENT_LIST.map((t) => ({ label: t.t, href: `/treatments/${t.slug}` }))).map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {useCmsCols ? (
          cmsCols
            .filter((col) => col.heading.toLowerCase() !== 'treatments')
            .map((col) => (
              <div key={col.heading} className="footer-col">
                <Mono>{col.heading}</Mono>
                <ul>
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener' : undefined}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
        ) : (
          <>
            <div className="footer-col">
              <Mono>About</Mono>
              <ul>
                <li><a href="/surgeons">Doctors</a></li>
                <li><a href="/journey">Your Journey</a></li>
                <li><a href="/results">Results</a></li>
                <li><a href="/pricing">Pricing</a></li>
                <li><a href="/press">Press</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/privacy">Privacy &amp; Terms</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <Mono>Connect</Mono>
              <ul>
                <li><a href="/contact">Contact</a></li>
                <li><a href={waHref} target="_blank" rel="noopener">WhatsApp</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Facebook</a></li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="footer-bottom">
        <Mono>{copyright}</Mono>
        <Mono>PT Trisaka Reksa Waluya</Mono>
        <Mono>Designed in Bali</Mono>
      </div>
    </footer>
  )
}
