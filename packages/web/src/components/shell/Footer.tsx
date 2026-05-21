import React from 'react'
import { Mono } from '@/components/primitives/Mono'
import { TREATMENT_LIST, WHATSAPP_HREF } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { mediaUrl, mediaAlt } from '@/lib/cms'

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
  const footerLogoSrc = mediaUrl(fg?.logoLight, '/assets/logo-light.png') || '/assets/logo-light.png'
  const footerLogoAlt = mediaAlt(fg?.logoLight, settings?.siteName || 'BIMC CosMedic')
  // Endorsement Mark in footer — uses INVERSE lockup (white-on-dark variant)
  // because the footer background is dark. Falls back to inline endorsement
  // line text if no image lockup is uploaded.
  const endorsementInverse = mediaUrl(cms?.endorsementMark?.inverseLockup, '') || ''
  const endorsementInverseAlt = mediaAlt(cms?.endorsementMark?.inverseLockup, cms?.endorsementMark?.endorsementLine || '')
  const endorsementLine = cms?.endorsementMark?.endorsementLine

  // Footer Treatments column — derived directly from cms.disciplines so it
  // auto-updates whenever an editor adds / renames / reorders a Discipline.
  // Editors no longer have to maintain a duplicate list in Footer.linkColumns.
  const treatmentLinks = (cms?.disciplines || [])
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((d) => ({ label: d.title, href: `/treatment-${d.slug}` }))

  // Other columns (About / Connect) still come from Footer.linkColumns when set,
  // and fall back to the hardcoded defaults below otherwise.
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
            <img src={footerLogoSrc} alt={footerLogoAlt} />
            {endorsementInverse ? (
              <img src={endorsementInverse} alt={endorsementInverseAlt} className="footer-endorsement-mark" />
            ) : endorsementLine ? (
              <span className="footer-endorsement-line">{endorsementLine}</span>
            ) : null}
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

        {/* Treatments column — ALWAYS derived from cms.disciplines so the
            list auto-updates from a single source. Editor manages this list
            via Treatments & Pricing → Disciplines (NOT via Footer link columns). */}
        <div className="footer-col">
          <Mono>Treatments</Mono>
          <ul>
            {(treatmentLinks.length > 0 ? treatmentLinks : TREATMENT_LIST.map((t) => ({ label: t.t, href: `/treatment-${t.slug}` }))).map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* About + Connect columns — driven by Footer.linkColumns when the
            editor has populated them. Falls back to the hardcoded structure
            below otherwise. The Treatments column above is excluded here so
            the editor doesn't have two competing sources of Treatments. */}
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
