import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono } from '@/components/primitives/Mono'
import { FAQItem } from '@/components/detail/FAQItem'
import { TreatmentRow } from '@/components/detail/TreatmentRow'
import { SurgeonMini } from '@/components/detail/SurgeonMini'
import { ProcedureFactsPanel } from '@/components/detail/ProcedureFactsPanel'
import { TREATMENT_LIST, SURGEON_LIST, TREATMENT_IMG, IMG } from '@/content/seed'
import { SUBCATEGORY_DATA } from '@/content/subcategory-data'
import { useCms } from '@/lib/cms-context'
import { mediaUrl } from '@/lib/cms'

type Props = { disciplineSlug: string; slug: string }

/* ─── R3 defensive fallbacks ───────────────────────────────────────────── */
/* Verbatim copies of the template strings that lived in this file pre-R3.*/
/* Used only when the CMS cache is cold / sub-category-detail-template    */
/* global has no value. After seed runs the cache supplies the same       */
/* strings — render stays byte-identical (Rule 3 / no-data-loss).         */
const FB = {
  chapterSeparator: ' · ',
  toc: {
    onThisPageLabel: 'On this page',
    overviewLabel: 'Overview',
    treatmentsLabel: 'Treatments',
    faqsLabel: 'FAQs',
  },
  takeAStep: {
    eyebrow: 'Take a step',
    videoConsultLabel: 'Book a video consult →',
    estimateLabel: 'Get a written estimate →',
    whatsappLabel: 'WhatsApp the concierge →',
    replyLine: 'Replies within 24 hours. No obligation.',
  },
  overview: { heading: 'Overview' },
  treatments: {
    heading: 'Treatments',
    intro:
      'The full list, with our typical price-from. Tap any treatment to expand details. Final quote is tailored after consultation.',
  },
  faqs: { heading: 'Frequently asked' },
}

export const SubCategoryDetail: React.FC<Props> = ({ disciplineSlug, slug }) => {
  const s = SUBCATEGORY_DATA[`${disciplineSlug}/${slug}`]
  if (!s) return null

  const parent = TREATMENT_LIST.find((t) => t.slug === s.parent)
  const surgeon = SURGEON_LIST.find((x) => x.slug === s.leadSurgeon)

  const cms = useCms()
  // CMS heroImage on SubCategory record takes priority; falls back to the
  // parent discipline's static asset so existing pages stay unchanged when
  // no CMS image has been uploaded.
  const cmsSub = cms?.subCategories?.find((sc) => sc.slug === slug && sc.parent)
  const cmsHeroImg = cmsSub?.heroImage ? mediaUrl(cmsSub.heroImage) : undefined
  const heroImg = cmsHeroImg || (parent ? TREATMENT_IMG(parent.slug) : IMG.hero)
  const tpl = cms?.subCategoryDetailTemplate
  // 25.30 — single-source WhatsApp number from CMS Settings; strip non-digits for wa.me URL
  const waNumber = (cms?.settings?.whatsappNumber || '').replace(/\D/g, '') || '6281339001911'
  const sep = tpl?.chapterSeparator || FB.chapterSeparator
  const toc = {
    onThisPageLabel: tpl?.toc?.onThisPageLabel || FB.toc.onThisPageLabel,
    overviewLabel: tpl?.toc?.overviewLabel || FB.toc.overviewLabel,
    treatmentsLabel: tpl?.toc?.treatmentsLabel || FB.toc.treatmentsLabel,
    faqsLabel: tpl?.toc?.faqsLabel || FB.toc.faqsLabel,
  }
  const takeAStep = {
    eyebrow: tpl?.takeAStep?.eyebrow || FB.takeAStep.eyebrow,
    videoConsultLabel: tpl?.takeAStep?.videoConsultLabel || FB.takeAStep.videoConsultLabel,
    estimateLabel: tpl?.takeAStep?.estimateLabel || FB.takeAStep.estimateLabel,
    whatsappLabel: tpl?.takeAStep?.whatsappLabel || FB.takeAStep.whatsappLabel,
    replyLine: tpl?.takeAStep?.replyLine || FB.takeAStep.replyLine,
  }
  const overview = { heading: tpl?.overview?.heading || FB.overview.heading }
  const treatments = {
    heading: tpl?.treatments?.heading || FB.treatments.heading,
    intro: tpl?.treatments?.intro || FB.treatments.intro,
  }
  const faqsBlock = { heading: tpl?.faqs?.heading || FB.faqs.heading }

  return (
    <PageShell activePage={`treatment-${s.parent}`}>
      <ChapterOpener
        chapter={`${parent?.t || 'Treatment'}${sep}${s.title}`}
        title={s.chapterTitle}
        lede={s.lede}
        image={heroImg}
        imageHue={parent?.hue || 0}
        imageLabel={s.title.toUpperCase()}
        breadcrumbs={[
          { label: 'BIMC CosMedic', href: '/' },
          { label: 'Treatments', href: '/treatments' },
          { label: parent?.t || 'Treatments', href: `/treatments/${s.parent}` },
          { label: s.title },
        ]}
      />

      <div className="detail-layout">
        <aside className="detail-toc">
          <Mono>{toc.onThisPageLabel}</Mono>
          <ol>
            <li>
              <a href="#overview">{toc.overviewLabel}</a>
            </li>
            {s.sections.map((sec) => (
              <li key={sec.id}>
                <a href={`#${sec.id}`}>{sec.t}</a>
              </li>
            ))}
            <li>
              <a href="#treatments">{toc.treatmentsLabel}</a>
            </li>
            <li>
              <a href="#faqs">{toc.faqsLabel}</a>
            </li>
          </ol>

          <div
            style={{
              marginTop: 32,
              paddingTop: 28,
              borderTop: '1px solid var(--ink-20)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <Mono style={{ color: 'var(--accent-deep)' }}>{takeAStep.eyebrow}</Mono>
            <a
              href={`/video-consult?procedure=${encodeURIComponent(s.title)}`}
              style={{
                display: 'block',
                padding: '14px 16px',
                background: 'var(--accent)',
                color: 'var(--paper)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              {takeAStep.videoConsultLabel}
            </a>
            <a
              href={`/contact?intent=estimate&procedure=${encodeURIComponent(s.title)}`}
              style={{
                display: 'block',
                padding: '14px 16px',
                border: '1px solid var(--ink-100)',
                color: 'var(--ink-100)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              {takeAStep.estimateLabel}
            </a>
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                "Hello — I'd like to ask about " + s.title + '.',
              )}`}
              target="_blank"
              rel="noopener"
              style={{
                display: 'block',
                padding: '14px 16px',
                border: '1px solid var(--ink-20)',
                color: 'var(--ink-80)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              {takeAStep.whatsappLabel}
            </a>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 13,
                color: 'var(--ink-60)',
                margin: '8px 0 0',
                lineHeight: 1.45,
              }}
            >
              {takeAStep.replyLine}
            </p>
          </div>
        </aside>

        <div className="detail-body">
          <section id="overview">
            <Reveal>
              <h2>{overview.heading}</h2>
              <p className="lede" style={{ fontSize: 18 }}>
                {s.overview}
              </p>
            </Reveal>
            {surgeon && (
              <Reveal delay={120}>
                <SurgeonMini surgeon={surgeon} />
              </Reveal>
            )}
          </section>

          {s.sections.map((sec) => (
            <section key={sec.id} id={sec.id}>
              <Reveal>
                <h2>{sec.t}</h2>
                <p>{sec.body}</p>
              </Reveal>
            </section>
          ))}

          <section id="treatments">
            <Reveal>
              <h2 style={{ margin: 0 }}>{treatments.heading}</h2>
              <p>{treatments.intro}</p>
            </Reveal>
            <div style={{ marginTop: 32, borderTop: '1px solid var(--ink-20)' }}>
              {s.treatments.map((t, i) => (
                <Reveal key={i} delay={i * 30}>
                  <TreatmentRow t={t} subTitle={s.title} waNumber={waNumber} />
                </Reveal>
              ))}
            </div>
          </section>

          <ProcedureFactsPanel subCategorySlug={slug} />

          {s.faqs && s.faqs.length > 0 && (
            <section id="faqs">
              <Reveal>
                <h2>{faqsBlock.heading}</h2>
              </Reveal>
              <div className="faq-list">
                {s.faqs.map((f, i) => (
                  <FAQItem key={i} q={f.q} a={f.a} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </PageShell>
  )
}
