import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { useCms } from '@/lib/cms-context'
import { formatIDR, DEFAULT_AUD_TO_IDR, DEFAULT_ROUND_IDR_TO } from '@/lib/pricing'

const PRICE_TEASER = [
  { name: 'Rhinoplasty', aud: 4200, parent: 'surgical', slug: 'face' },
  { name: 'Breast Augmentation', aud: 5800, parent: 'surgical', slug: 'breast' },
  { name: 'Facelift & Necklift', aud: 8500, parent: 'surgical', slug: 'face' },
  { name: 'Sapphire FUE Hair', aud: 3400, parent: 'hair', slug: 'fue' },
  { name: 'Liposculpture', aud: 4800, parent: 'surgical', slug: 'body' },
  { name: 'Blepharoplasty', aud: 2200, parent: 'surgical', slug: 'face' },
  { name: 'Botulinum Toxin', aud: 320, parent: 'non-surgical', slug: 'injectables' },
  { name: 'Dermal Fillers', aud: 480, parent: 'non-surgical', slug: 'injectables' },
]

export const PricingTeaser: React.FC = () => {
  const cms = useCms()
  const g = cms?.homePricingView
  const rate = cms?.settings?.audToIdrRate || DEFAULT_AUD_TO_IDR
  const roundTo = cms?.settings?.roundIdrTo || DEFAULT_ROUND_IDR_TO
  const eyebrow = g?.eyebrow || 'Pricing · Starting From'
  const headingPart1 = g?.headingPart1 || 'Transparent'
  const headingPart2 = g?.headingPart2 || 'pricing.'
  const lede =
    g?.lede ||
    'Indicative starting prices in IDR (with AUD equivalent). Final quotes are tailored after consultation. Travel, accommodation and concierge can be packaged.'
  const footnote =
    g?.footnote ||
    `Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp ${rate.toLocaleString('en-AU')} (live rate). Recovery stays, transfers and 12-month telehealth follow-up included on most surgical packages.`
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
              href={`/treatments/${p.parent}/${p.slug}`}
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
                {formatIDR(p.aud * rate, roundTo)}{' '}
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
