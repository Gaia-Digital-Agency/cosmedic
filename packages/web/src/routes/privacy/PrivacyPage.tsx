import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { findPageBySlug, privacySectionsSorted } from '@/lib/cms-adapters'
import { mediaUrl } from '@/lib/cms'

export const PrivacyPage: React.FC = () => {
  const cms = useCms()
  const page = cms ? findPageBySlug(cms, 'privacy') : undefined
  const sections = cms ? privacySectionsSorted(cms) : []

  const chapter = page?.tagline || 'Chapter XI — Privacy & Terms'
  const titleA = page?.chapterTitle?.a || 'Plain'
  const titleB = page?.chapterTitle?.b || 'language.'
  const lede =
    page?.lede ||
    'Your medical record is the most sensitive document you will ever sign. Here is exactly what we do with it, how long we keep it, and who else sees it.'
  const heroImage = mediaUrl(page?.heroImage, '') || IMG.texture

  const lastUpdatedLine = page?.lastUpdatedDate || 'Last updated · 12 May 2026'
  const versionLine = page?.versionLine || 'Version 4.2 · Annual review cycle'
  const readingTimeLine = page?.readingTimeLine || 'Read in 6 minutes'
  const intro = page?.introParagraph
  const imageLabel = page?.imageLabel || 'PRIVACY'
  const tocHeading = page?.tocHeading || 'Contents'
  const dpo = page?.dpo ?? {}

  return (
    <PageShell activePage="privacy">
      <ChapterOpener
        chapter={chapter}
        title={[titleA, titleB]}
        lede={lede}
        image={heroImage}
        imageHue={5}
        imageLabel={imageLabel}
        breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: 'Privacy & Terms' }]}
      />

      <section
        style={{
          background: 'var(--paper-warm)',
          borderBottom: '1px solid var(--ink-20)',
          padding: '28px var(--page-x)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          <Mono>{lastUpdatedLine}</Mono>
          <Mono>{versionLine}</Mono>
          <Mono>{readingTimeLine}</Mono>
        </div>
      </section>

      {intro ? (
        <section className="page-section" style={{ paddingBottom: 0 }}>
          <Reveal>
            <p className="privacy-p" style={{ maxWidth: 720, fontSize: 18 }}>
              {intro}
            </p>
          </Reveal>
        </section>
      ) : null}

      <section className="page-section">
        <div className="privacy-layout">
          <aside className="privacy-toc">
            <Reveal>
              <Eyebrow>{tocHeading}</Eyebrow>
              <ol className="privacy-toc-list">
                {sections.map((s, i) => (
                  <li key={s.slug}>
                    <a href={`#${s.slug}`}>
                      <span className="privacy-toc-num">{String(i + 1).padStart(2, '0')}</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </Reveal>
          </aside>

          <div className="privacy-content">
            {sections.map((s, i) => (
              <Reveal key={s.slug} delay={Math.min(i, 6) * 40}>
                <article id={s.slug} className="privacy-section">
                  <div className="privacy-section-head">
                    <Mono>§ {String(i + 1).padStart(2, '0')}</Mono>
                    <h3 className="privacy-section-title">{s.title}</h3>
                  </div>
                  {s.paragraphs && s.paragraphs.length > 0
                    ? s.paragraphs.map((p, j) => (
                        <p key={j} className="privacy-p">
                          {p.text}
                        </p>
                      ))
                    : null}
                  {s.listItems && s.listItems.length > 0 ? (
                    <ul className="privacy-list">
                      {s.listItems.map((it, j) => (
                        <li key={j}>{it.text}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section tinted">
        <Reveal>
          <div className="privacy-contact">
            <div>
              <Eyebrow>{dpo.eyebrow || 'Data Protection Officer'}</Eyebrow>
              <h2 className="section-title" style={{ marginTop: 16 }}>
                {dpo.headingA || 'Questions?'}{' '}
                <span className="italic">{dpo.headingB || 'Write to us.'}</span>
              </h2>
              <p className="section-lede" style={{ maxWidth: 620 }}>
                {dpo.lede ||
                  'We answer within five working days. For urgent medical questions, please use the main contact form — it reaches the on-call concierge in minutes.'}
              </p>
            </div>
            <div className="privacy-contact-meta">
              <div>
                <Mono>{dpo.emailLabel || 'Email'}</Mono>
                <a href={`mailto:${dpo.email || 'privacy@bimcbali.com'}`} className="privacy-contact-link">
                  {dpo.email || 'privacy@bimcbali.com'}
                </a>
              </div>
              <div>
                <Mono>{dpo.postLabel || 'Post'}</Mono>
                <span className="privacy-contact-addr">
                  {dpo.addressLine1 || 'Data Protection Officer'}
                  <br />
                  {dpo.addressLine2 || 'BIMC CosMedic, Jl. Bypass Ngurah Rai 100X'}
                  <br />
                  {dpo.addressLine3 || 'Kuta, Bali 80361, Indonesia'}
                </span>
              </div>
              <div style={{ marginTop: 12 }}>
                <Btn kind="ghost" as="a" href="/contact">
                  {dpo.generalContactLabel || 'General contact'}
                </Btn>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
      <CmsExtraBlocks slug="privacy" />
    </PageShell>
  )
}
