import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono } from '@/components/primitives/Mono'
import { FAQItem } from '@/components/detail/FAQItem'
import { TreatmentRow } from '@/components/detail/TreatmentRow'
import { SurgeonMini } from '@/components/detail/SurgeonMini'
import { TREATMENT_LIST, SURGEON_LIST, TREATMENT_IMG, IMG } from '@/content/seed'
import { SUBCATEGORY_DATA } from '@/content/subcategory-data'

type Props = { slug: string }

export const SubCategoryDetail: React.FC<Props> = ({ slug }) => {
  const s = SUBCATEGORY_DATA[slug]
  if (!s) return null

  const parent = TREATMENT_LIST.find((t) => t.slug === s.parent)
  const surgeon = SURGEON_LIST.find((x) => x.slug === s.leadSurgeon)
  const heroImg = parent ? TREATMENT_IMG(parent.slug) : IMG.hero

  return (
    <PageShell activePage={`treatment-${s.parent}`}>
      <ChapterOpener
        chapter={`${parent?.t || 'Treatment'} · ${s.title}`}
        title={s.chapterTitle}
        lede={s.lede}
        image={heroImg}
        imageHue={parent?.hue || 0}
        imageLabel={s.title.toUpperCase()}
        breadcrumbs={[
          { label: 'BIMC CosMedic', href: '/' },
          { label: 'Treatments', href: '/treatments' },
          { label: parent?.t || 'Treatments', href: `/treatment-${s.parent}` },
          { label: s.title },
        ]}
      />

      <div className="detail-layout">
        <aside className="detail-toc">
          <Mono>On this page</Mono>
          <ol>
            <li>
              <a href="#overview">Overview</a>
            </li>
            {s.sections.map((sec) => (
              <li key={sec.id}>
                <a href={`#${sec.id}`}>{sec.t}</a>
              </li>
            ))}
            <li>
              <a href="#treatments">Treatments</a>
            </li>
            <li>
              <a href="#faqs">FAQs</a>
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
            <Mono style={{ color: 'var(--accent-deep)' }}>Take a step</Mono>
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
              Book a video consult →
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
              Get a written estimate →
            </a>
            <a
              href={`https://wa.me/6281339001911?text=${encodeURIComponent(
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
              WhatsApp the concierge →
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
              Replies within 24 hours. No obligation.
            </p>
          </div>
        </aside>

        <div className="detail-body">
          <section id="overview">
            <Reveal>
              <h2>Overview</h2>
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
              <h2>Treatments</h2>
              <p>
                The full list, with our typical price-from. Tap any treatment to expand details.
                Final quote is tailored after consultation.
              </p>
            </Reveal>
            <div style={{ marginTop: 32, borderTop: '1px solid var(--ink-20)' }}>
              {s.treatments.map((t, i) => (
                <Reveal key={i} delay={i * 30}>
                  <TreatmentRow t={t} subTitle={s.title} />
                </Reveal>
              ))}
            </div>
          </section>

          {s.faqs && s.faqs.length > 0 && (
            <section id="faqs">
              <Reveal>
                <h2>Frequently asked</h2>
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
