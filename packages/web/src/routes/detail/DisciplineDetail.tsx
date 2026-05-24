import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { PriceTag } from '@/components/primitives/PriceTag'
import { FAQItem } from '@/components/detail/FAQItem'
import { SurgeonMini } from '@/components/detail/SurgeonMini'
import { TREATMENT_LIST, SURGEON_LIST, TREATMENT_IMG } from '@/content/seed'
import { TREATMENT_CONTENT } from '@/content/treatment-content'

type Props = { slug: string }

export const DisciplineDetail: React.FC<Props> = ({ slug }) => {
  const t = TREATMENT_LIST.find((x) => x.slug === slug)
  const c = TREATMENT_CONTENT[slug]
  if (!t || !c) return null
  const surgeon = SURGEON_LIST.find((s) => s.slug === c.leadSurgeon)
  const heroImg = TREATMENT_IMG(slug)

  return (
    <PageShell activePage={`treatment-${slug}`}>
      <ChapterOpener
        chapter={c.chapter}
        title={c.title}
        lede={c.lede}
        image={heroImg}
        imageHue={t.hue}
        imageLabel={t.t.toUpperCase()}
        breadcrumbs={[
          { label: 'BIMC CosMedic', href: '/' },
          { label: 'Treatments', href: '/treatments' },
          { label: t.t },
        ]}
      />

      <div className="detail-layout">
        <aside className="detail-toc">
          <Mono>On this page</Mono>
          <ol>
            <li>
              <a href="#overview">Overview</a>
            </li>
            {c.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.t}</a>
              </li>
            ))}
            {c.subcategories ? (
              <li>
                <a href="#subcategories">Sub-categories</a>
              </li>
            ) : (
              <li>
                <a href="#procedures">Procedures</a>
              </li>
            )}
            <li>
              <a href="#faqs">FAQs</a>
            </li>
          </ol>
        </aside>

        <div className="detail-body">
          <section id="overview">
            <Reveal>
              <h2>Overview</h2>
              <p className="lede" style={{ fontSize: 18 }}>
                {c.overview}
              </p>
            </Reveal>
            {surgeon && (
              <Reveal delay={120}>
                <SurgeonMini surgeon={surgeon} />
              </Reveal>
            )}
          </section>

          {c.sections.map((s) => (
            <section key={s.id} id={s.id}>
              <Reveal>
                <h2>{s.t}</h2>
                <p>{s.body}</p>
              </Reveal>
            </section>
          ))}

          {c.subcategories && (
            <section id="subcategories">
              <Reveal>
                <h2>Choose a focus</h2>
                <p>
                  This discipline is organised into{' '}
                  {c.subcategories.length === 2
                    ? 'two'
                    : c.subcategories.length === 3
                      ? 'three'
                      : c.subcategories.length}{' '}
                  areas. Each page lists every treatment we offer with its starting price.
                </p>
              </Reveal>
              <div style={{ marginTop: 40, borderTop: '1px solid var(--ink-20)' }}>
                {c.subcategories.map((sc, i) => {
                  const inner = (
                    <div className="subcategory-row">
                      <div
                        style={{
                          aspectRatio: '4/3',
                          overflow: 'hidden',
                          background: 'var(--cream)',
                        }}
                      >
                        <Img
                          src={heroImg}
                          fallbackLabel={sc.title.toUpperCase()}
                          fallbackHue={(t.hue || 0) + i}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <h3
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontStyle: 'italic',
                            fontWeight: 400,
                            fontSize: 32,
                            margin: 0,
                            letterSpacing: '-0.01em',
                            color: 'var(--ink-100)',
                          }}
                        >
                          {sc.title}
                        </h3>
                        <p
                          style={{
                            margin: '4px 0 0',
                            fontSize: 15,
                            color: 'var(--ink-80)',
                            lineHeight: 1.55,
                            maxWidth: 640,
                          }}
                        >
                          {sc.short}
                        </p>
                        <span
                          style={{
                            marginTop: 6,
                            fontFamily: 'var(--font-mono)',
                            fontSize: 10,
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
                            color: sc.available ? 'var(--accent-deep)' : 'var(--ink-40)',
                          }}
                        >
                          {sc.available ? 'Read more →' : 'Coming v1.4'}
                        </span>
                      </div>
                      <span
                        className="sc-arrow"
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 26,
                          textAlign: 'right',
                          color: sc.available ? 'var(--accent-deep)' : 'var(--ink-20)',
                          transition: 'transform .25s ease',
                        }}
                      >
                        {sc.available ? '→' : ''}
                      </span>
                    </div>
                  )
                  return (
                    <Reveal key={sc.slug} delay={i * 60} y={20}>
                      {sc.available ? (
                        <a
                          href={`/treatment-${sc.slug}`}
                          style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div style={{ opacity: 0.55, cursor: 'default' }}>{inner}</div>
                      )}
                    </Reveal>
                  )
                })}
              </div>
            </section>
          )}

          {!c.subcategories && c.procedures && (
            <section id="procedures">
              <Reveal>
                <h2>Procedures</h2>
                <p>
                  The full list, with our typical price-from. We will give you a precise quote
                  during consultation.
                </p>
              </Reveal>
              <div style={{ marginTop: 32, borderTop: '1px solid var(--ink-20)' }}>
                {c.procedures.map((p, i) => (
                  <Reveal key={i} delay={i * 30}>
                    <div className="procedure-row">
                      <h4
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 22,
                          fontWeight: 400,
                          margin: 0,
                          letterSpacing: '-0.005em',
                        }}
                      >
                        {p.n}
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 15,
                          color: 'var(--ink-80)',
                          lineHeight: 1.55,
                        }}
                      >
                        {p.d}
                      </p>
                      <PriceTag idr={p.priceFromIdr} align="right" />
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          fontFamily: 'var(--font-serif)',
                          fontSize: 26,
                          color: 'var(--ink-20)',
                        }}
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          <section id="faqs">
            <Reveal>
              <h2>Frequently asked</h2>
            </Reveal>
            <div className="faq-list">
              {c.faqs.map((f, i) => (
                <FAQItem key={i} q={f.q} a={f.a} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="page-section tinted">
        <Reveal>
          <div className="section-head">
            <Eyebrow>Related</Eyebrow>
            <div>
              <h2 className="section-title">
                <span className="italic">Often considered</span> alongside.
              </h2>
              <p className="section-lede">
                Many of our patients combine treatments across disciplines. These pair particularly
                well with {t.t.toLowerCase()}.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="related-grid">
          {TREATMENT_LIST.filter((x) => x.slug !== slug)
            .slice(0, 3)
            .map((rel, i) => (
              <Reveal key={rel.slug} delay={i * 80}>
                <a
                  href={`/treatment-${rel.slug}`}
                  className="related-card"
                  style={{ color: 'inherit' }}
                >
                  <div className="related-card-img">
                    <Img
                      src={TREATMENT_IMG(rel.slug)}
                      fallbackLabel={rel.t.toUpperCase()}
                      fallbackHue={rel.hue}
                      alt=""
                    />
                  </div>
                  <Mono>{rel.n}</Mono>
                  <h4>{rel.t}</h4>
                  <p>{rel.sub}</p>
                </a>
              </Reveal>
            ))}
        </div>
      </section>
    </PageShell>
  )
}
