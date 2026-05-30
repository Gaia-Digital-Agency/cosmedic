import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { mediaUrl } from '@/lib/cms'

const DEFAULT_ROWS: [string, string][] = [
  ['A.', 'Private recovery villas in Nusa Dua & Ubud'],
  ['B.', 'Daily nursing visits, dietitian on call'],
  ['C.', 'Drivers, security, and concierge — included'],
  ['D.', 'A short walk to the BIMC hospital'],
]

export const Place: React.FC = () => {
  const cms = useCms()
  const g = cms?.homeHero?.place
  const eyebrow = g?.eyebrow || 'Recovery in Bali'
  const headingPart1 = g?.heading?.a || 'Recover'
  const headingAccent = g?.heading?.b || 'in paradise.'
  const body =
    g?.body ||
    'Nusa Dua sits on the southernmost reach of Bali — quiet beaches, soft afternoons, and the kind of warm, careful hospitality that has made the island synonymous with rest. We work with a small portfolio of villas and resorts, hand-selected for privacy and post-operative comfort.'
  const rows: [string, string][] =
    g?.rows && g.rows.length > 0
      ? g.rows.map<[string, string]>((r) => [r.letter, r.text])
      : DEFAULT_ROWS
  const ctaLabel = g?.ctaLabel || 'View recovery stays'
  const ctaHref = g?.ctaHref || '/journey'
  const placeImageSrc =
    g?.image && typeof g.image === 'object' ? mediaUrl(g.image, '') || IMG.bali : IMG.bali

  return (
    <section className="place">
      <div className="place-grid">
        <Reveal>
          <div className="place-image">
            <Img media={g?.image} src={placeImageSrc} fallbackLabel="BALI · NUSA DUA" fallbackHue={4} alt="" />
          </div>
        </Reveal>
        <Reveal delay={140}>
          <div className="place-body">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="section-title">
              <span>{headingPart1}</span>
              <br />
              <span className="italic">{headingAccent}</span>
            </h2>
            <p>{body}</p>
            <div className="place-list">
              {rows.map(([k, t], i) => (
                <div key={i} className="place-row">
                  <Mono>{k}</Mono>
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <Btn kind="ghost" as="a" href={ctaHref}>
              {ctaLabel}
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
