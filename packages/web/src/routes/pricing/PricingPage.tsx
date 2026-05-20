import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { TREATMENT_LIST, SUBCATEGORIES_BY_DISCIPLINE, IMG } from '@/content/seed'
import { SUBCATEGORY_DATA } from '@/content/subcategory-data'

const fmtIDR = (aud: number) =>
  'Rp ' + (Math.round((aud * 10500) / 50000) * 50000).toLocaleString('de-DE')

const PAYMENT_TERMS: [string, string][] = [
  ['Deposit', '20% on confirmation'],
  ['Balance', 'On admission, by transfer'],
  ['Currencies', 'IDR, AUD, USD, EUR'],
  ['Cards', 'Accepted, 1.8% surcharge'],
  ['Refunds', 'Full, until 14 days before'],
  ['Finance', 'Available via partner lender'],
]

export const PricingPage: React.FC = () => (
  <PageShell activePage="pricing">
    <ChapterOpener
      chapter="Chapter X — Pricing"
      title={['Every treatment,', 'every price.']}
      lede="The complete pricing index, organised by discipline. Prices are starting figures in IDR with an Australian-dollar equivalent. Every plan is quoted precisely after a private consultation; what we quote is what you pay."
      image={IMG.texture}
      imageHue={2}
      imageLabel="PRICING"
      breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: 'Pricing' }]}
    />

    <section className="page-section">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {TREATMENT_LIST.map((discipline, dIdx) => {
          const subs = SUBCATEGORIES_BY_DISCIPLINE[discipline.slug] || []
          if (subs.length === 0) return null

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

              {subs.map(([subSlug, subTitle]) => {
                const sub = SUBCATEGORY_DATA[subSlug]
                if (!sub || !sub.treatments || sub.treatments.length === 0) return null

                return (
                  <div key={subSlug} style={{ marginBottom: 48 }}>
                    <Reveal delay={60}>
                      <div
                        style={{
                          padding: '24px 0 12px',
                          borderBottom: '1px solid var(--ink-20)',
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
                      </div>
                    </Reveal>
                    <div>
                      {sub.treatments.map((t, tIdx) => {
                        const isNumber = typeof t.priceFromAud === 'number'
                        const isIncluded =
                          t.priceFromAud === 'included' || t.priceFromAud === 'complimentary'
                        return (
                          <Reveal key={tIdx} delay={tIdx * 20}>
                            <a
                              href={`/treatment-${subSlug}`}
                              style={{
                                display: 'grid',
                                gridTemplateColumns: '1.1fr 1.6fr 220px 36px',
                                gap: 28,
                                padding: '20px 0',
                                borderBottom: '1px solid var(--ink-20)',
                                alignItems: 'center',
                                color: 'inherit',
                                textDecoration: 'none',
                                transition: 'padding-left .25s ease',
                              }}
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
                                    Included
                                  </span>
                                ) : isNumber ? (
                                  <>
                                    <span
                                      style={{
                                        fontFamily: 'var(--font-mono)',
                                        fontSize: 11,
                                        letterSpacing: '0.18em',
                                        color: 'var(--accent-deep)',
                                        whiteSpace: 'nowrap',
                                      }}
                                    >
                                      {fmtIDR(t.priceFromAud as number)}
                                    </span>
                                    <span
                                      style={{
                                        fontFamily: 'var(--font-serif)',
                                        fontStyle: 'italic',
                                        fontSize: 13,
                                        color: 'var(--ink-60)',
                                      }}
                                    >
                                      ≈ AUD {(t.priceFromAud as number).toLocaleString('en-AU')}
                                    </span>
                                  </>
                                ) : (
                                  <span
                                    style={{
                                      fontFamily: 'var(--font-mono)',
                                      fontSize: 11,
                                      letterSpacing: '0.18em',
                                      color: 'var(--ink-60)',
                                    }}
                                  >
                                    On request
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
                                →
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
          Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 10,500 (May 2026).
          Final quotes are tailored after consultation. Recovery stays, transfers, and twelve
          months of telehealth follow-up included on most surgical packages.
        </p>
      </div>
    </section>

    <section className="page-section tinted">
      <div className="two-col">
        <Reveal>
          <div>
            <Eyebrow>Insurance</Eyebrow>
            <h2 className="section-title" style={{ marginTop: 16, marginBottom: 24 }}>
              Working <span className="italic">with insurers.</span>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink-80)', margin: '0 0 16px' }}>
              Cosmetic surgery is rarely covered by health insurance. Reconstructive procedures
              may be — and where they are, we are happy to support your claim with full
              documentation, surgeon's reports, and itemised invoicing.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--ink-80)', margin: '0 0 16px' }}>
              Travel insurance is recommended for every patient, and we work with two specialist
              medical-travel insurers — details supplied during consultation.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <Eyebrow>Payment</Eyebrow>
            <h2 className="section-title" style={{ marginTop: 16, marginBottom: 24 }}>
              Quiet, <span className="italic">considered terms.</span>
            </h2>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                borderTop: '1px solid var(--ink-20)',
              }}
            >
              {PAYMENT_TERMS.map(([k, v], i) => (
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
