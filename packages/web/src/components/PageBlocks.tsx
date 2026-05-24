import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Img } from '@/components/primitives/Img'
import { PriceTag } from '@/components/primitives/PriceTag'
import { useCms } from '@/lib/cms-context'
import { lexicalToParagraphs, mediaUrl, type PageBlock } from '@/lib/cms'
import {
  baCasesSorted,
  pressSorted,
  proceduresSorted,
  recoveryStaysSorted,
  storiesSorted,
  surgeonsSorted,
  surgeonPortraitUrl,
  baCompositeUrl,
  recoveryHeroUrl,
} from '@/lib/cms-adapters'

/**
 * Renderer for the Pages.sections block array. Every block kind defined in
 * `packages/cms/src/collections/Pages.ts` has a matching React element here.
 * Use anywhere a CMS Page record's editorial body needs to render.
 *
 * For pages that have a strict design layout (home, journey, contact,
 * pricing, etc.), keep the static layout but append the PageBlocks beneath
 * to render any extra editorial content the clinic adds via CMS.
 */
export const PageBlocks: React.FC<{ blocks?: PageBlock[] }> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null
  return (
    <>
      {blocks.map((block, idx) => (
        <BlockRouter key={idx} block={block} />
      ))}
    </>
  )
}

const BlockRouter: React.FC<{ block: PageBlock }> = ({ block }) => {
  switch (block.blockType) {
    case 'richText':
      return <RichTextBlock block={block} />
    case 'imageGrid':
      return <ImageGridBlock block={block} />
    case 'ctaBand':
      return <CtaBandBlock block={block} />
    case 'stats':
      return <StatsBlock block={block} />
    case 'faqAccordion':
      return <FaqAccordionBlock block={block} />
    case 'procedureList':
      return <ProcedureListBlock block={block} />
    case 'surgeonList':
      return <SurgeonListBlock block={block} />
    case 'baGrid':
      return <BaGridBlock block={block} />
    case 'testimonialList':
      return <TestimonialListBlock block={block} />
    case 'recoveryStayList':
      return <RecoveryStayListBlock block={block} />
    case 'pressMentionList':
      return <PressListBlock block={block} />
    case 'journeyStepList':
      return <JourneyStepListBlock block={block} />
    case 'externalEmbed':
      return <ExternalEmbedBlock block={block} />
    case 'notes':
      return <NotesBlock block={block} />
    default:
      return null
  }
}

const SectionWrap: React.FC<{
  heading?: string
  eyebrow?: string
  children: React.ReactNode
}> = ({ heading, eyebrow, children }) => (
  <section className="page-section">
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      {eyebrow ? (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      {heading ? (
        <Reveal>
          <h2 className="section-title" style={{ marginTop: 16, marginBottom: 28 }}>
            {heading}
          </h2>
        </Reveal>
      ) : null}
      {children}
    </div>
  </section>
)

const RichTextBlock: React.FC<{ block: Extract<PageBlock, { blockType: 'richText' }> }> = ({ block }) => {
  const paras = lexicalToParagraphs(block.body)
  return (
    <SectionWrap heading={block.heading} eyebrow={block.eyebrow}>
      {paras.map((p, i) => (
        <Reveal key={i} delay={i * 30}>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 18,
              lineHeight: 1.65,
              color: 'var(--ink-80)',
              maxWidth: 740,
              margin: '0 auto 18px',
            }}
          >
            {p}
          </p>
        </Reveal>
      ))}
    </SectionWrap>
  )
}

const ImageGridBlock: React.FC<{ block: Extract<PageBlock, { blockType: 'imageGrid' }> }> = ({ block }) => {
  const cols = Number(block.columns || '3')
  return (
    <SectionWrap heading={block.heading}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gap: 24,
        }}
      >
        {block.images.map((it, i) => (
          <Reveal key={i} delay={i * 40}>
            <figure style={{ margin: 0 }}>
              <Img src={mediaUrl(it.image) || ''} alt={it.caption || ''} fallbackLabel={it.caption || 'IMAGE'} />
              {it.caption ? (
                <figcaption style={{ marginTop: 10, fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--ink-60)', fontSize: 14 }}>
                  {it.caption}
                </figcaption>
              ) : null}
            </figure>
          </Reveal>
        ))}
      </div>
    </SectionWrap>
  )
}

const CtaBandBlock: React.FC<{ block: Extract<PageBlock, { blockType: 'ctaBand' }> }> = ({ block }) => (
  <section className="page-section">
    <div className="cta-band-slim" style={{ maxWidth: 1280, margin: '0 auto' }}>
      <Reveal>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, margin: 0 }}>
          {block.heading}
        </h3>
        {block.lede ? (
          <p style={{ marginTop: 12, fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--ink-60)' }}>
            {block.lede}
          </p>
        ) : null}
        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {block.primaryLabel && block.primaryHref ? (
            <a href={block.primaryHref} className="btn btn-accent">
              <span>{block.primaryLabel}</span>
              <span className="btn-arrow">→</span>
            </a>
          ) : null}
          {block.secondaryLabel && block.secondaryHref ? (
            <a href={block.secondaryHref} className="btn btn-ghost">
              <span>{block.secondaryLabel}</span>
              <span className="btn-arrow">→</span>
            </a>
          ) : null}
        </div>
      </Reveal>
    </div>
  </section>
)

const StatsBlock: React.FC<{ block: Extract<PageBlock, { blockType: 'stats' }> }> = ({ block }) => (
  <SectionWrap heading={block.heading}>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.min(block.items.length, 4)}, minmax(0, 1fr))`,
        gap: 32,
        paddingTop: 24,
      }}
    >
      {block.items.map((it, i) => (
        <Reveal key={i} delay={i * 50}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 56, lineHeight: 1 }}>
              {it.number}
            </div>
            <Mono>{it.label}</Mono>
            {it.sourceNote ? <p style={{ fontStyle: 'italic', fontSize: 13, color: 'var(--ink-60)', marginTop: 6 }}>{it.sourceNote}</p> : null}
          </div>
        </Reveal>
      ))}
    </div>
  </SectionWrap>
)

const FaqAccordionBlock: React.FC<{ block: Extract<PageBlock, { blockType: 'faqAccordion' }> }> = ({ block }) => (
  <SectionWrap heading={block.heading}>
    <div>
      {block.items.map((it, i) => (
        <Reveal key={i} delay={i * 30}>
          <details style={{ padding: '20px 0', borderBottom: '1px solid var(--ink-20)' }}>
            <summary style={{ fontFamily: 'var(--font-serif)', fontSize: 20, cursor: 'pointer' }}>
              {it.q}
            </summary>
            <p style={{ marginTop: 12, fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-80)' }}>
              {it.a}
            </p>
          </details>
        </Reveal>
      ))}
    </div>
  </SectionWrap>
)

const ProcedureListBlock: React.FC<{ block: Extract<PageBlock, { blockType: 'procedureList' }> }> = ({ block }) => {
  const cms = useCms()
  if (!cms) return null
  let procs = proceduresSorted(cms)
  if (block.filterDiscipline)
    procs = procs.filter((p) => {
      const id = typeof p.parentDiscipline === 'number' ? p.parentDiscipline : p.parentDiscipline?.id
      return id === block.filterDiscipline
    })
  if (block.filterSubCategory)
    procs = procs.filter((p) => {
      const id = typeof p.parentSubCategory === 'number' ? p.parentSubCategory : p.parentSubCategory?.id
      return id === block.filterSubCategory
    })
  procs = procs.slice(0, block.limit ?? 6)
  return (
    <SectionWrap heading={block.heading || 'Procedures'}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 24 }}>
        {procs.map((p, i) => (
          <Reveal key={p.id} delay={i * 40}>
            <a href={`/treatments/${p.slug}`} style={{ display: 'block', padding: 20, border: '1px solid var(--ink-20)', color: 'inherit', textDecoration: 'none' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, margin: 0 }}>{p.name}</h4>
              {p.pricing?.priceIdr2026 || p.pricing?.priceIdr2025 ? (
                <div style={{ marginTop: 8 }}>
                  <PriceTag idr={p.pricing?.priceIdr2026 ?? p.pricing?.priceIdr2025} align="left" />
                </div>
              ) : null}
            </a>
          </Reveal>
        ))}
      </div>
    </SectionWrap>
  )
}

const SurgeonListBlock: React.FC<{ block: Extract<PageBlock, { blockType: 'surgeonList' }> }> = ({ block }) => {
  const cms = useCms()
  if (!cms) return null
  let surgeons = surgeonsSorted(cms)
  if (block.filterGroup && block.filterGroup !== 'all') {
    surgeons = surgeons.filter((s) => s.group === block.filterGroup)
  }
  return (
    <SectionWrap heading={block.heading || 'Surgeons'}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${block.layout === 'grid' ? 4 : 4}, minmax(0, 1fr))`, gap: 20 }}>
        {surgeons.map((s, i) => (
          <Reveal key={s.id} delay={i * 30}>
            <a href={`/surgeons/${s.slug}`} style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>
              <div style={{ aspectRatio: '4 / 5', overflow: 'hidden' }}>
                <Img src={surgeonPortraitUrl(s)} alt={s.name} fallbackLabel={`DR. ${(s.commonName || s.name).toUpperCase()}`} fallbackHue={s.hue} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, margin: '12px 0 4px' }}>{s.title || 'dr.'} {s.name}</h4>
              <Mono style={{ fontSize: 11 }}>{s.spec || ''}</Mono>
            </a>
          </Reveal>
        ))}
      </div>
    </SectionWrap>
  )
}

const BaGridBlock: React.FC<{ block: Extract<PageBlock, { blockType: 'baGrid' }> }> = ({ block }) => {
  const cms = useCms()
  if (!cms) return null
  let cases = baCasesSorted(cms)
  if (block.filterProcedure)
    cases = cases.filter((c) => {
      const id = typeof c.procedure === 'number' ? c.procedure : c.procedure?.id
      return id === block.filterProcedure
    })
  if (block.featuredOnly) cases = cases.filter((c) => c.isFeatured)
  cases = cases.slice(0, block.limit ?? 6)
  return (
    <SectionWrap heading={block.heading || 'Before & After'}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
        {cases.map((c, i) => (
          <Reveal key={c.id} delay={i * 40}>
            <figure style={{ margin: 0 }}>
              <Img src={baCompositeUrl(c, '') || ''} alt={c.beforeAlt || c.caseLabel} fallbackLabel={c.caseLabel} />
              <figcaption style={{ marginTop: 8, fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 14 }}>
                {c.caseLabel}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </SectionWrap>
  )
}

const TestimonialListBlock: React.FC<{ block: Extract<PageBlock, { blockType: 'testimonialList' }> }> = ({ block }) => {
  const cms = useCms()
  if (!cms) return null
  let stories = storiesSorted(cms)
  if (block.featuredOnly) stories = stories.filter((s) => s.isFeatured)
  stories = stories.slice(0, block.count ?? 3)
  return (
    <SectionWrap heading={block.heading || 'Stories'}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(stories.length, 3)}, minmax(0, 1fr))`, gap: 24 }}>
        {stories.map((s, i) => (
          <Reveal key={s.id} delay={i * 50}>
            <div style={{ padding: 28, background: 'var(--paper)' }}>
              {s.quote ? (
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.5, margin: 0 }}>
                  "{s.quote}"
                </p>
              ) : null}
              <Mono style={{ display: 'block', marginTop: 20 }}>{s.patientLabel}</Mono>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionWrap>
  )
}

const RecoveryStayListBlock: React.FC<{ block: Extract<PageBlock, { blockType: 'recoveryStayList' }> }> = ({ block }) => {
  const cms = useCms()
  if (!cms) return null
  const villas = recoveryStaysSorted(cms).slice(0, block.limit ?? 6)
  return (
    <SectionWrap heading={block.heading || 'Recovery Stays'}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 20 }}>
        {villas.map((v, i) => (
          <Reveal key={v.id} delay={i * 40}>
            <article>
              <Img src={recoveryHeroUrl(v, '') || ''} alt={v.name} fallbackLabel={v.name.toUpperCase()} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, margin: '12px 0 4px' }}>{v.name}</h4>
              <Mono>{v.location || ''}</Mono>
              {v.priceFromIdrPerNight != null ? (
                <div style={{ marginTop: 6 }}>
                  <PriceTag idr={v.priceFromIdrPerNight} suffix=" / night" align="left" />
                </div>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </SectionWrap>
  )
}

const PressListBlock: React.FC<{ block: Extract<PageBlock, { blockType: 'pressMentionList' }> }> = ({ block }) => {
  const cms = useCms()
  if (!cms) return null
  const items = pressSorted(cms).slice(0, block.limit ?? 8)
  return (
    <SectionWrap heading={block.heading || 'Press'}>
      <div>
        {items.map((m, i) => (
          <Reveal key={m.id} delay={i * 30}>
            <article style={{ padding: '20px 0', borderBottom: '1px solid var(--ink-20)', display: 'grid', gridTemplateColumns: '200px 1fr 100px', gap: 20, alignItems: 'baseline' }}>
              <Mono>{m.publication}</Mono>
              <a href={m.url || '#'} target={m.url ? '_blank' : undefined} rel={m.url ? 'noopener' : undefined} style={{ color: 'inherit', textDecoration: 'none' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, margin: 0 }}>{m.headline || m.publication}</h4>
                {m.summary ? (
                  <p style={{ fontStyle: 'italic', fontSize: 14, color: 'var(--ink-60)', marginTop: 6 }}>{m.summary}</p>
                ) : null}
              </a>
              <Mono style={{ textAlign: 'right' }}>{m.publishedDate ? new Date(m.publishedDate).getFullYear() : ''}</Mono>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionWrap>
  )
}

const JourneyStepListBlock: React.FC<{ block: Extract<PageBlock, { blockType: 'journeyStepList' }> }> = ({ block }) => {
  const cms = useCms()
  if (!cms) return null
  let steps = [...cms.journeySteps].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  if (block.filterCategory && block.filterCategory !== 'all') {
    steps = steps.filter((s) => s.category === block.filterCategory)
  }
  return (
    <SectionWrap heading={block.heading || 'Your Journey'}>
      <ol style={{ listStyle: 'none', padding: 0, counterReset: 'step', margin: 0 }}>
        {steps.map((s, i) => (
          <Reveal key={s.id} delay={i * 30}>
            <li style={{ padding: '24px 0', borderBottom: '1px solid var(--ink-20)' }}>
              <Mono>{s.dayLabel || `Step ${i + 1}`}</Mono>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, margin: '8px 0 12px' }}>{s.title}</h4>
              {lexicalToParagraphs(s.body).map((p, j) => (
                <p key={j} style={{ fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.6, color: 'var(--ink-80)', margin: '0 0 10px' }}>
                  {p}
                </p>
              ))}
            </li>
          </Reveal>
        ))}
      </ol>
    </SectionWrap>
  )
}

const ExternalEmbedBlock: React.FC<{ block: Extract<PageBlock, { blockType: 'externalEmbed' }> }> = ({ block }) => (
  <SectionWrap heading={block.heading}>
    {block.iframeUrl ? (
      <iframe src={block.iframeUrl} style={{ width: '100%', minHeight: 480, border: 'none' }} title={block.heading || 'Embed'} />
    ) : block.html ? (
      <div dangerouslySetInnerHTML={{ __html: block.html }} />
    ) : null}
  </SectionWrap>
)

const NotesBlock: React.FC<{ block: Extract<PageBlock, { blockType: 'notes' }> }> = ({ block }) => {
  const tones: Record<string, { bg: string; border: string }> = {
    info: { bg: 'var(--cream)', border: 'var(--ink-20)' },
    warning: { bg: '#FBE9D9', border: '#C28E66' },
    tip: { bg: 'var(--accent-tint)', border: 'var(--accent)' },
    disclaimer: { bg: '#F5F2EB', border: 'var(--ink-40)' },
  }
  const tone = tones[block.kind || 'info']
  return (
    <SectionWrap>
      <Reveal>
        <div style={{ padding: '24px 32px', background: tone.bg, borderLeft: `3px solid ${tone.border}` }}>
          {block.heading ? (
            <Mono style={{ display: 'block', marginBottom: 8 }}>{block.heading}</Mono>
          ) : null}
          {lexicalToParagraphs(block.body).map((p, i) => (
            <p key={i} style={{ margin: '0 0 8px', fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.6 }}>
              {p}
            </p>
          ))}
        </div>
      </Reveal>
    </SectionWrap>
  )
}
