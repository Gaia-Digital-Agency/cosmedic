import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { BA_PAIRS, IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { mediaUrl } from '@/lib/cms'

/* ─── R5 defensive fallbacks ───────────────────────────────────────────── */
const FB = {
  hero: {
    chapter: 'Chapter IV — Selected Results',
    titleA: 'Quietly',
    titleB: 'transformative.',
    lede:
      'Four signature results from our facial repertoire, presented with patient permission. Our complete library — over two hundred consented cases — is shared during private consultation.',
    imageHue: 1,
    imageLabel: 'GALLERY',
    breadcrumbLabel: 'Gallery',
  },
  filterBarLabel: 'Featured cases',
  countFormat: '{n} cases · facial',
  library: {
    eyebrow: 'Private gallery',
    headingPre: 'Want to see ',
    headingItalic: 'more?',
    body:
      'Our complete library — over two hundred consented cases — is shared during private consultation. We will match the cases we show you to the work you are considering.',
    buttonLabel: 'Request the full library',
    buttonHref: '/contact',
  },
}

export const GalleryPage: React.FC = () => {
  const visible = BA_PAIRS
  const cms = useCms()
  const galleryPage = cms?.pages.find((p) => p?.slug === 'gallery')
  const libraryCms = cms?.libraryCta

  const hero = {
    chapter: galleryPage?.tagline || FB.hero.chapter,
    titleA: galleryPage?.chapterTitle?.a || FB.hero.titleA,
    titleB: galleryPage?.chapterTitle?.b || FB.hero.titleB,
    lede: galleryPage?.lede || FB.hero.lede,
    image: mediaUrl(galleryPage?.heroImage) || IMG.texture,
    imageHue: galleryPage?.imageHue ?? FB.hero.imageHue,
    imageLabel: galleryPage?.imageLabel || FB.hero.imageLabel,
    breadcrumbLabel: galleryPage?.breadcrumbLabel || FB.hero.breadcrumbLabel,
  }

  const filterBarLabel = galleryPage?.filterBarLabel || FB.filterBarLabel
  const countFormat = galleryPage?.countFormat || FB.countFormat

  const library = {
    eyebrow: libraryCms?.eyebrow || FB.library.eyebrow,
    headingPre: libraryCms?.headingPre || FB.library.headingPre,
    headingItalic: libraryCms?.headingItalic || FB.library.headingItalic,
    body: libraryCms?.body || FB.library.body,
    buttonLabel: libraryCms?.buttonLabel || FB.library.buttonLabel,
    buttonHref: libraryCms?.buttonHref || FB.library.buttonHref,
  }

  return (
    <PageShell activePage="gallery">
      <ChapterOpener
        chapter={hero.chapter}
        title={[hero.titleA, hero.titleB]}
        lede={hero.lede}
        image={hero.image}
        imageHue={hero.imageHue}
        imageLabel={hero.imageLabel}
        breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: hero.breadcrumbLabel }]}
      />

      <section className="page-section">
        <div className="filter-bar">
          <Mono>{filterBarLabel}</Mono>
          <span style={{ marginLeft: 'auto' }} className="mono">
            {countFormat.replace('{n}', String(visible.length))}
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
                  {(c.patientAge != null || c.recoveryDuration) && (
                    <Mono style={{ marginTop: 8, display: 'block', color: 'var(--ink-60)' }}>
                      {c.patientAge != null && <>Age · {c.patientAge}</>}
                      {c.patientAge != null && c.recoveryDuration && ' · '}
                      {c.recoveryDuration && <>Recovery · {c.recoveryDuration}</>}
                    </Mono>
                  )}
                  {c.surgeonName && (
                    <Mono style={{ marginTop: 8, display: 'block', color: 'var(--ink-60)' }}>
                      Surgeon ·{' '}
                      {c.surgeonSlug ? (
                        <a
                          href={`/experts/${c.surgeonSlug}`}
                          style={{ color: 'var(--accent-deep)', textDecoration: 'underline' }}
                        >
                          {c.surgeonName}
                        </a>
                      ) : (
                        c.surgeonName
                      )}
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
            <Mono>{library.eyebrow}</Mono>
            <h2 className="section-title" style={{ margin: '16px 0 16px' }}>
              {library.headingPre}<span className="italic">{library.headingItalic}</span>
            </h2>
            <p
              style={{
                margin: '0 auto 24px',
                maxWidth: 540,
                color: 'var(--ink-80)',
                fontSize: 17,
              }}
            >{library.body}</p>
            <Btn kind="primary" as="a" href={library.buttonHref}>{library.buttonLabel}</Btn>
          </div>
        </Reveal>
      </section>
      <CmsExtraBlocks slug="gallery" />
    </PageShell>
  )
}
