import React from 'react'
import { Mono } from '@/components/primitives/Mono'
import { TREATMENT_LIST, WHATSAPP_HREF } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { mediaUrl } from '@/lib/cms.media'

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

  // Resolve a social-platform key (instagram / facebook / whatsapp / …) to
  // its URL via Settings.socialLinks. Returns undefined if not found, so
  // the caller can fall back to the manual href in linkColumns.items[].href.
  const resolveSocialUrl = (platform: string | undefined): string | undefined => {
    if (!platform || platform === 'none') return undefined
    const entry = (settings?.socialLinks || []).find((s) => s.platform === platform)
    return entry?.url
  }

  const treatmentLinks = (cms?.disciplines || [])
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((d) => ({ label: d.title, href: `/procedures/${d.slug}` }))

  const cmsCols = Array.isArray(fg?.linkColumns) ? fg!.linkColumns : []
  const useCmsCols = cmsCols.length > 0
  const wa = settings?.whatsappNumber
  const waHref = wa
    ? wa.startsWith('http') ? wa : `https://wa.me/${wa.replace(/[^0-9]/g, '')}`
    : WHATSAPP_HREF

  const year = new Date().getFullYear()
  const yearRoman = toRomanYear(year)

  // Footer-bottom: prefer footerBottomLines array (post-11b CMS coverage);
  // fall back to legacy copyrightTemplate + hardcoded sibling lines.
  const bottomLines: string[] = (() => {
    const arr = fg?.footerBottomLines
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.map((row) => (row.text || '').replace('{year}', yearRoman))
    }
    const copyright = (fg?.copyrightTemplate || '© {year} BIMC CosMedic Centre').replace('{year}', yearRoman)
    return [copyright, 'PT Trisaka Reksa Waluya', 'Designed in Bali']
  })()

  const addr1 = settings?.addressLine1 || 'BIMC Hospital Nusa Dua'
  const addr2 = settings?.addressLine2 || 'Kawasan ITDC Blok D'
  const cityLine = `${settings?.city || 'Nusa Dua'} ${settings?.postalCode || '80363'}, ${settings?.country || 'Bali, Indonesia'}`

  const footerLogoSrc = mediaUrl(fg?.logoLight, '/assets/logo-light.svg') || '/assets/logo-light.svg'
  const treatmentsHeading = fg?.treatmentsHeading ?? 'Treatments'
  const newsletterLabel = fg?.newsletter?.label ?? 'Receive our quarterly journal'
  const newsletterPlaceholder = fg?.newsletter?.placeholder ?? 'Your email address'
  const newsletterButtonLabel = fg?.newsletter?.buttonLabel ?? '→'

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="/" className="logo logo-dark" aria-label="BIMC CosMedic — home">
            <img src={footerLogoSrc} alt="BIMC CosMedic" />
          </a>
          <p>
            {addr1}<br />
            {addr2}<br />
            {cityLine}
          </p>
          <p className="footer-newsletter-label">{newsletterLabel}</p>
          <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={newsletterPlaceholder} aria-label="Email address" />
            <button type="submit" aria-label="Subscribe">{newsletterButtonLabel}</button>
          </form>
        </div>

        <div className="footer-col">
          <Mono>{treatmentsHeading}</Mono>
          <ul>
            {(treatmentLinks.length > 0 ? treatmentLinks : TREATMENT_LIST.map((t) => ({ label: t.t, href: `/procedures/${t.slug}` }))).map((link) => (
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
                  {col.items.map((item) => {
                    // Resolve URL: prefer Settings.socialLinks via item.social
                    // flag (so the clinic edits one place); fall back to manual
                    // href on the item; WhatsApp also has the legacy
                    // wa.me-from-whatsappNumber path.
                    const socialUrl = resolveSocialUrl(item.social)
                    const isWa = item.social === 'whatsapp'
                    const href = socialUrl || (isWa ? waHref : item.href)
                    const external = href.startsWith('http')
                    return (
                      <li key={`${col.heading}-${item.label}`}>
                        <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener' : undefined}>
                          {item.label}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))
        ) : (
          // Fallback path — preserved for resilience if linkColumns is ever
          // emptied in admin. Mirrors the design/shared.jsx canonical structure.
          // Will be removed in a future commit once linkColumns is locked in.
          <>
            <div className="footer-col">
              <Mono>About</Mono>
              <ul>
                <li><a href="/experts">Experts</a></li>
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
        {bottomLines.map((line, i) => (
          <Mono key={i}>{line}</Mono>
        ))}
      </div>
    </footer>
  )
}
