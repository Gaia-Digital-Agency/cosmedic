import React from 'react'
import { Mono } from '@/components/primitives/Mono'
import { TREATMENT_LIST, WHATSAPP_HREF } from '@/content/seed'
import { useCms } from '@/lib/cms-context'

/**
 * Site footer. Three CMS-driven columns (Treatments / About / Connect) on a
 * dark-brown ground. Treatments comes from cms.disciplines (q8). About +
 * Connect come from Footer.linkColumns when set, hardcoded fallbacks else.
 */
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
  const copyright = (fg?.copyrightTemplate || '© {year} BIMC CosMedic. All rights reserved.').replace('{year}', String(year))

  return (
    <footer className="site-footer">
      <div className="footer-top">
        {/* Treatments column — ALWAYS derived from cms.disciplines so the
            list auto-updates from a single source. Editor manages this list
            via Treatments & Pricing → Disciplines (NOT via Footer link columns). */}
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
