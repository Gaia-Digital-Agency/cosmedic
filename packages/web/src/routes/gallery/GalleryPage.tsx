import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { BA_PAIRS, IMG } from '@/content/seed'

export const GalleryPage: React.FC = () => {
  const visible = BA_PAIRS
  return (
    <PageShell activePage="gallery">
      <ChapterOpener
        chapter="Chapter IV — Selected Results"
        title={['Quietly', 'transformative.']}
        lede="Four signature results from our facial repertoire, presented with patient permission. Our complete library — over two hundred consented cases — is shared during private consultation."
        image={IMG.texture}
        imageHue={1}
        imageLabel="GALLERY"
        breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: 'Gallery' }]}
      />

      <section className="page-section">
        <div className="filter-bar">
          <Mono>Featured cases</Mono>
          <span style={{ marginLeft: 'auto' }} className="mono">
            {visible.length} cases · facial
          </span>
        </div>

        <div className="gallery-grid-4">
          {visible.map((c, i) => {
            const alt = c.beforeAlt && c.afterAlt
              ? `${c.beforeAlt} / ${c.afterAlt}`
              : c.beforeAlt || c.afterAlt || `${c.label} — before and after`
            return (
              <Reveal key={c.num} delay={i * 40} y={20}>
                <figure className="ba-card">
                  <div className="ba-single">
                    <Img
                      src={c.image}
                      fallbackLabel={`${c.label.toUpperCase()} · ${c.num}`}
                      fallbackHue={i % 6}
                      alt={alt}
                    />
                    <span className="ba-tag">
                      <Mono>Before</Mono>
                    </span>
                    <span className="ba-tag accent" style={{ left: 'auto', right: 14 }}>
                      <Mono>After</Mono>
                    </span>
                  </div>
                  <figcaption>
                    <div>
                      <Mono>{c.num}</Mono>
                      <h4>{c.label}</h4>
                    </div>
                    <span className="ba-time">{c.time}</span>
                  </figcaption>
                  {c.surgeonName && (
                    <Mono style={{ marginTop: 8, display: 'block', color: 'var(--ink-60)' }}>
                      Surgeon · {c.surgeonName}
                    </Mono>
                  )}
                  {c.description && (
                    <p
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        fontSize: 14,
                        color: 'var(--ink-60)',
                        margin: '8px 0 0',
                        lineHeight: 1.55,
                      }}
                    >
                      {c.description}
                    </p>
                  )}
                </figure>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <div
            style={{
              marginTop: 80,
              padding: '60px 40px',
              textAlign: 'center',
              background: 'var(--paper-warm)',
              border: '1px solid var(--ink-20)',
            }}
          >
            <Mono>Private gallery</Mono>
            <h2 className="section-title" style={{ margin: '16px 0 16px' }}>
              Want to see <span className="italic">more?</span>
            </h2>
            <p
              style={{
                margin: '0 auto 24px',
                maxWidth: 540,
                color: 'var(--ink-80)',
                fontSize: 17,
              }}
            >
              Our complete library — over two hundred consented cases — is shared during private
              consultation. We will match the cases we show you to the work you are considering.
            </p>
            <Btn kind="primary" as="a" href="/contact">
              Request the full library
            </Btn>
          </div>
        </Reveal>
      </section>
      <CmsExtraBlocks slug="gallery" />
    </PageShell>
  )
}
