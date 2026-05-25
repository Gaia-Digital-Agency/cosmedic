import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { useCms } from '@/lib/cms-context'

const PRICE_TEASER = [
  { name: 'Rhinoplasty', aud: 4200, slug: 'surgical-face' },
  { name: 'Breast Augmentation', aud: 5800, slug: 'surgical-breast' },
  { name: 'Facelift & Necklift', aud: 8500, slug: 'surgical-face' },
  { name: 'Sapphire FUE Hair', aud: 3400, slug: 'hair-fue' },
  { name: 'Liposculpture', aud: 4800, slug: 'surgical-body' },
  { name: 'Blepharoplasty', aud: 2200, slug: 'surgical-face' },
  { name: 'Botulinum Toxin', aud: 320, slug: 'non-surgical-injectables' },
  { name: 'Dermal Fillers', aud: 480, slug: 'non-surgical-injectables' },
]

const fmtIDR = (aud: number) =>
  'Rp ' + (Math.round((aud * 10500) / 50000) * 50000).toLocaleString('de-DE')

export const PricingTeaser: React.FC = () => {
  const cms = useCms()
  const g = cms?.homePricingView
  const eyebrow = g?.eyebrow || 'Pricing · Starting From'
  const headingPart1 = g?.headingPart1 || 'Transparent'
  const headingPart2 = g?.headingPart2 || 'pricing.'
  const lede =
    g?.lede ||
    'Indicative starting prices in IDR (with AUD equivalent). Final quotes are tailored after consultation. Travel, accommodation and concierge can be packaged.'
  const footnote =
    g?.footnote ||
    'Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 12,500 (May 2026). Recovery stays, transfers and 12-month telehealth follow-up included on most surgical packages.'
  const viewAllLabel = g?.viewAllLabel || 'View full pricing'
  const viewAllHref = g?.viewAllHref || '/pricing'

  return (
    <section className="price-teaser" id="pricing">
      <div className="price-teaser-head">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <h2 className="section-title">
              <span>{headingPart1}</span>
              <br />
              <span className="italic">{headingPart2}</span>
            </h2>
            <p className="section-lede" style={{ marginTop: 18 }}>
              {lede}
            </p>
          </div>
        </Reveal>
      </div>
      <div className="price-teaser-grid">
        {PRICE_TEASER.map((p, i) => (
          <Reveal key={p.name + i} delay={i * 50} y={20}>
            <a
              href={`/treatments/${p.slug}`}
              className="price-row"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <h4 className="pr-name">{p.name}</h4>
              <span className="pr-from">From</span>
              <span className="pr-amount">
                {fmtIDR(p.aud)}{' '}
                <span className="pr-aud" style={{ marginLeft: 6 }}>
                  ≈ AUD {p.aud.toLocaleString('en-AU')}
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
      <div className="price-teaser-foot">
        <p>{footnote}</p>
        <Btn kind="ghost" as="a" href={viewAllHref}>
          {viewAllLabel}
        </Btn>
      </div>
    </section>
  )
}
