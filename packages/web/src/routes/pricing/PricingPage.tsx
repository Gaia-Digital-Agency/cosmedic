import React, { useState } from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { PriceTag } from '@/components/primitives/PriceTag'
import { TREATMENT_LIST, SUBCATEGORIES_BY_DISCIPLINE, IMG } from '@/content/seed'
import { SUBCATEGORY_DATA } from '@/content/subcategory-data'
import { ClinicCatalogueTable } from './ClinicCatalogueTable'
import { useCms } from '@/lib/cms-context'
import { DEFAULT_AUD_TO_IDR } from '@/lib/pricing'

const DEFAULT_PAYMENT_TERMS: [string, string][] = [
  ['Deposit', '20% on confirmation'],
  ['Balance', 'On admission, by transfer'],
  ['Currencies', 'IDR, AUD, USD, EUR'],
  ['Cards', 'Accepted, 1.8% surcharge'],
  ['Refunds', 'Full, until 14 days before'],
  ['Finance', 'Available via partner lender'],
]

function parsePaymentTerms(input?: string): [string, string][] {
  if (!input) return DEFAULT_PAYMENT_TERMS
  const lines = input
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  if (lines.length === 0) return DEFAULT_PAYMENT_TERMS
  return lines.map<[string, string]>((line) => {
    const [k, ...rest] = line.split('|').map((s) => s.trim())
    return [k || '•', rest.join(' | ') || '']
  })
}

export const PricingPage: React.FC = () => {
  const cms = useCms()
  const [hideUnpricedWellbeing, setHideUnpricedWellbeing] = useState(true)
  const [openSubs, setOpenSubs] = useState<Set<string>>(new Set())
  const toggleSub = (k: string) =>
    setOpenSubs((prev) => {
      const s = new Set(prev)
      s.has(k) ? s.delete(k) : s.add(k)
      return s
    })

  const hero = cms?.pricingHero ?? {}
  const overview = cms?.pricingOverview ?? {}
  const overviewHasContent = Boolean(
    overview.headingPart1 || overview.headingPart2 || overview.body,
  )

  const liveRate = cms?.settings?.audToIdrRate || DEFAULT_AUD_TO_IDR
  const footnote =
    cms?.pricingFootnote?.text ||
    `Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp ${liveRate.toLocaleString('de-DE')} (live rate). Final quotes are tailored after consultation. Recovery stays, transfers, and twelve months of telehealth follow-up included on most surgical packages.`

  const ins = cms?.pricingInsurance ?? {}
  const insuranceEyebrow = ins.eyebrow || 'Insurance'
  const insuranceHeadingRoman = ins.headingRoman || 'Working'
  const insuranceHeadingItalic = ins.headingItalic || 'with insurers.'
  const insuranceBodyParas = ins.body
    ? ins.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    : [
        'Cosmetic surgery is rarely covered by health insurance. Reconstructive procedures may be — and where they are, we are happy to support your claim with full documentation, surgeon\'s reports, and itemised invoicing.',
        'Travel insurance is recommended for every patient, and we work with two specialist medical-travel insurers — details supplied during consultation.',
      ]

  const pay = cms?.pricingPayment ?? {}
  const paymentEyebrow = pay.eyebrow || 'Payment'
  const paymentHeadingRoman = pay.headingRoman || 'Quiet,'
  const paymentHeadingItalic = pay.headingItalic || 'considered terms.'
  const paymentTerms = parsePaymentTerms(pay.termsText)

  const list = cms?.pricingDisciplineListView ?? {}
  const onRequestLabel = list.onRequestLabel || 'On request'
  const includedLabel = list.includedLabel || 'Included'
  const arrowChar = list.arrowChar || '→'

  const heroImageUrl =
    (hero.heroImage && typeof hero.heroImage === 'object' ? hero.heroImage.url : undefined) ||
    IMG.texture

  return (
  <PageShell activePage="pricing">
    <ChapterOpener
      chapter={hero.chapter || 'Chapter X — Pricing'}
      title={[hero.titleA || 'Every treatment,', hero.titleB || 'every price.']}
      lede={
        hero.lede ||
        'The complete pricing index, organised by discipline. Prices are starting figures in IDR with an Australian-dollar equivalent. Every plan is quoted precisely after a private consultation; what we quote is what you pay.'
      }
      image={heroImageUrl}
      imageHue={hero.imageHue ?? 2}
      imageLabel={hero.imageLabel || 'PRICING'}
      breadcrumbs={[
        { label: 'BIMC CosMedic', href: '/' },
        { label: hero.breadcrumbLabel || 'Pricing' },
      ]}
    />

    {overviewHasContent && (
      <section className="page-section">
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            {overview.eyebrow && <Eyebrow>{overview.eyebrow}</Eyebrow>}
            {(overview.headingPart1 || overview.headingPart2) && (
              <h2 className="section-title" style={{ marginTop: 16, marginBottom: 24 }}>
                {overview.headingPart1 && <span>{overview.headingPart1}</span>}
                {overview.headingPart1 && overview.headingPart2 && ' '}
                {overview.headingPart2 && (
                  <span className="italic">{overview.headingPart2}</span>
                )}
              </h2>
            )}
            {overview.body && (
              <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink-80)', margin: 0 }}>
                {overview.body}
              </p>
            )}
          </Reveal>
        </div>
      </section>
    )}

    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 var(--page-gutter, 24px)' }}>
      <div style={{ paddingBottom: 12 }}>
        <Eyebrow>Clinic</Eyebrow>
      </div>
    </div>

    <ClinicCatalogueTable />

    <section className="page-section">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ paddingBottom: 12, borderTop: '1px solid var(--ink-20)', paddingTop: 32, marginBottom: 32 }}>
          <Eyebrow>Wellness</Eyebrow>
        </div>
        {(() => {
          let totalUnpricedWellbeing = 0
          for (const d of TREATMENT_LIST) {
            for (const [subSlug] of SUBCATEGORIES_BY_DISCIPLINE[d.slug] || []) {
              const sub = SUBCATEGORY_DATA[`${d.slug}/${subSlug}`]
              if (!sub?.treatments) continue
              for (const t of sub.treatments) {
                if (typeof t.priceFromIdr !== 'number' && t.priceFromIdr !== 'included' && t.priceFromIdr !== 'complimentary') {
                  totalUnpricedWellbeing++
                }
              }
            }
          }
          return (
            <Reveal>
              <div
                style={{
                  paddingBottom: 24,
                  borderBottom: '1px solid var(--ink-20)',
                  marginBottom: 48,
                  textAlign: 'center',
                }}
              >
                <h2 className="section-title" style={{ margin: 0 }}>
                  The full <span className="italic">well-being catalogue.</span>
                </h2>
                {totalUnpricedWellbeing > 0 ? (
                  <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => setHideUnpricedWellbeing((v) => !v)}
                      aria-pressed={hideUnpricedWellbeing}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: hideUnpricedWellbeing ? 'var(--bg-cream, #F4EFE6)' : 'var(--accent-deep)',
                        background: hideUnpricedWellbeing ? 'var(--accent-deep)' : 'transparent',
                        border: '1px solid var(--accent-deep)',
                        padding: '10px 20px',
                        borderRadius: 999,
                        cursor: 'pointer',
                        transition: 'background 160ms ease, color 160ms ease',
                      }}
                    >
                      {hideUnpricedWellbeing
                        ? `Show all (${totalUnpricedWellbeing} on request)`
                        : `Hide ${totalUnpricedWellbeing} on-request`}
                    </button>
                  </div>
                ) : null}
              </div>
            </Reveal>
          )
        })()}
        {TREATMENT_LIST.map((discipline, dIdx) => {
          const subs = SUBCATEGORIES_BY_DISCIPLINE[discipline.slug] || []
          if (subs.length === 0) return null

          const subsWithVisibleRows = subs
            .map(([subSlug, subTitle]) => {
              const sub = SUBCATEGORY_DATA[`${discipline.slug}/${subSlug}`]
              if (!sub || !sub.treatments || sub.treatments.length === 0) return null
              const visibleTreatments = sub.treatments.filter((t) => {
                if (!hideUnpricedWellbeing) return true
                return (
                  typeof t.priceFromIdr === 'number' ||
                  t.priceFromIdr === 'included' ||
                  t.priceFromIdr === 'complimentary'
                )
              })
              if (visibleTreatments.length === 0) return null
              return { subSlug, subTitle, sub, visibleTreatments }
            })
            .filter(<T,>(x: T | null): x is T => x !== null)

          if (subsWithVisibleRows.length === 0) return null

          return (
            <div
              key={discipline.slug}
              style={{ marginBottom: dIdx < TREATMENT_LIST.length - 1 ? 96 : 0 }}
            >
              <Reveal>
                <div
                  style={{
                    paddingBottom: 24,
                    borderBottom: '1px solid var(--ink-20)',
                    marginBottom: 32,
                  }}
                >
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 300,
                      fontSize: 56,
                      margin: 0,
                      letterSpacing: '-0.02em',
                      lineHeight: 1,
                    }}
                  >
                    {discipline.t}
                  </h2>
                </div>
              </Reveal>

              {subsWithVisibleRows.map(({ subSlug, subTitle, visibleTreatments }) => {
                const k = `${discipline.slug}__${subSlug}`
                const isSubOpen = openSubs.has(k)
                return (
                  <div key={subSlug} style={{ marginBottom: 4 }}>
                    <Reveal delay={60}>
                      <button
                        type="button"
                        onClick={() => toggleSub(k)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '24px 0 12px',
                          background: 'none',
                          border: 'none',
                          borderBottom: '1px solid var(--ink-20)',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontStyle: 'italic',
                            fontWeight: 400,
                            fontSize: 30,
                            margin: 0,
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {subTitle}
                        </h3>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 20,
                            color: 'var(--ink-60)',
                            flexShrink: 0,
                            marginLeft: 16,
                            lineHeight: 1,
                          }}
                        >
                          {isSubOpen ? '−' : '+'}
                        </span>
                      </button>
                    </Reveal>
                    <div
                      style={{
                        overflow: 'hidden',
                        maxHeight: isSubOpen ? 9999 : 0,
                        transition: 'max-height 220ms ease',
                      }}
                    >
                      {visibleTreatments.map((t, tIdx) => {
                        const isNumber = typeof t.priceFromIdr === 'number'
                        const isIncluded =
                          t.priceFromIdr === 'included' || t.priceFromIdr === 'complimentary'
                        return (
                          <Reveal key={tIdx} delay={tIdx * 20}>
                            <a
                              href={`/treatments/${discipline.slug}/${subSlug}`}
                              className="pricing-overview-row"
                            >
                              <h4
                                style={{
                                  fontFamily: 'var(--font-serif)',
                                  fontWeight: 400,
                                  fontSize: 22,
                                  margin: 0,
                                  letterSpacing: '-0.005em',
                                }}
                              >
                                {t.name}
                              </h4>
                              <p
                                style={{
                                  margin: 0,
                                  fontFamily: 'var(--font-serif)',
                                  fontStyle: 'italic',
                                  fontSize: 15,
                                  color: 'var(--ink-60)',
                                  lineHeight: 1.5,
                                }}
                              >
                                {t.short}
                              </p>
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'flex-end',
                                  gap: 3,
                                }}
                              >
                                {isIncluded ? (
                                  <span
                                    style={{
                                      fontFamily: 'var(--font-mono)',
                                      fontSize: 11,
                                      letterSpacing: '0.18em',
                                      color: 'var(--accent-deep)',
                                      textTransform: 'uppercase',
                                    }}
                                  >
                                    {includedLabel}
                                  </span>
                                ) : isNumber ? (
                                  <PriceTag idr={t.priceFromIdr as number} align="right" />
                                ) : (
                                  <span
                                    style={{
                                      fontFamily: 'var(--font-mono)',
                                      fontSize: 11,
                                      letterSpacing: '0.18em',
                                      color: 'var(--ink-60)',
                                    }}
                                  >
                                    {onRequestLabel}
                                  </span>
                                )}
                              </div>
                              <span
                                style={{
                                  textAlign: 'right',
                                  color: 'var(--accent-deep)',
                                  fontFamily: 'var(--font-serif)',
                                  fontSize: 22,
                                }}
                              >
                                {arrowChar}
                              </span>
                            </a>
                          </Reveal>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </section>

    <section className="page-section" style={{ paddingTop: 0 }}>
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '32px 0',
          borderTop: '1px solid var(--ink-20)',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 14,
            color: 'var(--ink-60)',
            textAlign: 'center',
            lineHeight: 1.55,
          }}
        >
          {footnote}
        </p>
      </div>
    </section>

    <section className="page-section tinted">
      <div className="two-col">
        <Reveal>
          <div>
            <Eyebrow>{insuranceEyebrow}</Eyebrow>
            <h2 className="section-title" style={{ marginTop: 16, marginBottom: 24 }}>
              {insuranceHeadingRoman} <span className="italic">{insuranceHeadingItalic}</span>
            </h2>
            {insuranceBodyParas.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: 'var(--ink-80)',
                  margin: '0 0 16px',
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <Eyebrow>{paymentEyebrow}</Eyebrow>
            <h2 className="section-title" style={{ marginTop: 16, marginBottom: 24 }}>
              {paymentHeadingRoman} <span className="italic">{paymentHeadingItalic}</span>
            </h2>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                borderTop: '1px solid var(--ink-20)',
              }}
            >
              {paymentTerms.map(([k, v], i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '16px 0',
                    borderBottom: '1px solid var(--ink-20)',
                  }}
                >
                  <Mono>{k}</Mono>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 17,
                      color: 'var(--ink-100)',
                    }}
                  >
                    {v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  </PageShell>
  )
}
