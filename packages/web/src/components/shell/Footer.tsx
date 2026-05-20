import React from 'react'
import { Mono } from '@/components/primitives/Mono'
import { TREATMENT_LIST, WHATSAPP_HREF } from '@/content/seed'
import { useCms } from '@/lib/cms-context'

/**
 * Site footer.
 *
 * Reads link columns + address + copyright from the `footer` global, and
 * site address/contact lines from `settings`. Falls back to the legacy
 * hard-coded structure when the CMS hasn't loaded.
 */
export const Footer: React.FC = () => {
  const cms = useCms()
  const fg = cms?.footer
  const settings = cms?.settings

  const cmsCols = Array.isArray(fg?.linkColumns) ? fg!.linkColumns : []
  const useCmsCols = cmsCols.length > 0
  const wa = settings?.whatsappNumber
  const waHref = wa
    ? wa.startsWith('http') ? wa : `https://wa.me/${wa.replace(/[^0-9]/g, '')}`
    : WHATSAPP_HREF

  const year = new Date().getFullYear()
  const copyright = (fg?.copyrightTemplate || '© {year} BIMC CosMedic. All rights reserved.').replace('{year}', String(year))

  return (
    <footer className="site-footer" style={{ backgroundColor: 'rgb(30, 26, 20)' }}>
      <div className="footer-top">
        <div className="footer-brand">
          <a href="/" className="logo logo-dark">
            <img src="/assets/logo-light.png" alt={settings?.siteName || 'BIMC CosMedic'} />
          </a>
          <p>
            {settings?.addressLine1 ? <>{settings.addressLine1}<br /></> : <>BIMC Hospital Nusa Dua<br /></>}
            {settings?.addressLine2 ? <>{settings.addressLine2}<br /></> : <>Kawasan ITDC Blok D<br /></>}
            {settings?.city ? <>{settings.city}{settings.postalCode ? ' ' + settings.postalCode : ''}{settings.country ? ', ' + settings.country : ''}</> : <>Nusa Dua 80363, Bali, Indonesia</>}
          </p>
          <p className="footer-newsletter-label">Receive our quarterly journal</p>
          <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" />
            <button type="submit">→</button>
          </form>
        </div>

        {useCmsCols ? (
          cmsCols.map((col) => (
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
              <Mono>Treatments</Mono>
              <ul>
                {TREATMENT_LIST.map((t) => (
                  <li key={t.slug}>
                    <a href={`/treatment-${t.slug}`}>{t.t}</a>
                  </li>
                ))}
              </ul>
            </div>
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
