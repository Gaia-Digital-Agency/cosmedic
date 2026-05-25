import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { PriceTag } from '@/components/primitives/PriceTag'
import { IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { recoveryStaysSorted } from '@/lib/cms-adapters'
import { mediaUrl, type CmsMedia } from '@/lib/cms'

type Villa = {
  name: string
  loc: string
  br: string
  pool: string
  fromIdr: number
  img: string
  hue: number
  body: string
  driveTime: string
  nursingNote: string
  media?: number | CmsMedia | null
}

const FALLBACK_VILLAS: Villa[] = [
  {
    name: 'Villa Sembilan', loc: 'Nusa Dua', br: '2 BR', pool: 'Private', fromIdr: 2_940_000, img: IMG.villa1, hue: 0,
    body: 'A quiet two-bedroom villa within the ITDC compound — five minutes from the BIMC hospital and a short walk to the beach. Our most-chosen villa for solo and couple recovery.',
    driveTime: '5 min', nursingNote: 'Available daily',
  },
  {
    name: 'Villa Damai', loc: 'Ubud', br: '3 BR', pool: 'Private', fromIdr: 4_410_000, img: IMG.villa2, hue: 1,
    body: 'A three-bedroom villa in the rice paddies above Ubud, for patients who prefer cooler air and slower mornings. Forty-five-minute drive to the hospital; daily nursing visits arranged.',
    driveTime: '45 min', nursingNote: 'Available daily',
  },
  {
    name: 'Villa Kelapa', loc: 'Jimbaran', br: '2 BR', pool: 'Private', fromIdr: 3_360_000, img: IMG.villa3, hue: 2,
    body: 'A beachfront villa in Jimbaran with sunset views and direct sand access. Suited to non-surgical and short-recovery patients who want to swim earlier.',
    driveTime: '15 min', nursingNote: 'Available daily',
  },
  {
    name: 'Villa Tirta', loc: 'Nusa Dua', br: '4 BR', pool: 'Private', fromIdr: 6_090_000, img: IMG.villa4, hue: 3,
    body: 'A four-bedroom villa for families travelling together, or for patients who want extra space. Six-minute drive to the hospital.',
    driveTime: '5 min', nursingNote: 'Available daily',
  },
  {
    name: 'The Apurva Suite', loc: 'Nusa Dua', br: '1 BR', pool: 'Resort', fromIdr: 5_460_000, img: IMG.villa5, hue: 4,
    body: 'A one-bedroom suite at The Apurva Kempinski for patients who prefer hotel service over villa living. Full nursing visits arranged in-room.',
    driveTime: '5 min', nursingNote: 'Available daily',
  },
  {
    name: 'Villa Sereno', loc: 'Sanur', br: '3 BR', pool: 'Private', fromIdr: 3_990_000, img: IMG.villa6, hue: 5,
    body: 'A traditional Balinese-style three-bedroom villa in the quiet of Sanur — twenty-five minutes from the hospital, well-suited to longer recoveries.',
    driveTime: '25 min', nursingNote: 'Available daily',
  },
]

const FALLBACK_TOP_STATS: Array<{ number: string; label: string; italic?: boolean }> = [
  { number: '6', label: 'Curated villas' },
  { number: '4', label: 'Locations across Bali' },
  { number: '5–21', label: 'Nights, typical stay', italic: true },
  { number: 'All', label: 'Provisioned by us', italic: true },
]

const FALLBACK_INCLUSIONS: Array<{ letter: string; title: string; body: string }> = [
  { letter: 'A', title: 'Welcome provisioning', body: 'Fresh linens, groceries for two days, your favourite tea waiting.' },
  { letter: 'B', title: 'Daily housekeeping', body: 'Twice-daily turndown, laundry on request.' },
  { letter: 'C', title: 'Driver on call', body: '24-hour driver service, included for you and your party.' },
  { letter: 'D', title: 'Twenty-four-hour security', body: 'Every villa is staffed continuously.' },
  { letter: 'E', title: 'Full kitchen', body: 'We will stock it with what you ask us to stock it with.' },
  { letter: 'F', title: 'Wifi & telecoms', body: 'Local SIM with data, ready in your room.' },
  { letter: 'G', title: 'Daily nursing visits', body: 'By arrangement — included in surgical packages.' },
  { letter: 'H', title: 'Aftercare provisioning', body: 'Pharmacy, dressings, and post-op food restocked daily.' },
]

const computeDriveTime = (loc: string): string =>
  loc === 'Nusa Dua' ? '5 min' : loc === 'Jimbaran' ? '15 min' : loc === 'Sanur' ? '25 min' : '45 min'

export const RecoveryStaysPage: React.FC = () => {
  const cms = useCms()

  // Hero.
  const page = cms?.recoveryStaysPage
  const hero = page?.hero
  const chapter = hero?.chapter || 'Chapter VII — Recovery Stays'
  const titleA = hero?.title?.a || 'A villa, a'
  const titleB = hero?.title?.b || 'quiet recovery.'
  const lede =
    hero?.lede ||
    'A small, hand-selected portfolio of villas and resort suites in Nusa Dua, Ubud, Sanur, and Jimbaran. Every stay includes provisioning, drivers, and the option of daily nursing.'
  const heroImage = hero?.heroImage ? mediaUrl(hero.heroImage, '') : ''
  const heroImg = heroImage || IMG.villa1
  const heroHue = hero?.imageHue ?? 4
  const heroLabel = hero?.imageLabel || 'RECOVERY STAYS'
  const breadcrumbLabel = hero?.breadcrumbLabel || 'Recovery Stays'

  // Top stats.
  const topStats =
    page?.topStats && page.topStats.length > 0 ? page.topStats : FALLBACK_TOP_STATS

  // Portfolio section.
  const portfolio = page?.portfolioSection
  const portfolioEyebrow = portfolio?.eyebrow || 'The portfolio'
  const portfolioHeadingPre = portfolio?.headingPre ?? ''
  const portfolioHeadingItalic = portfolio?.headingItalic ?? 'Six'
  const portfolioHeadingPost = portfolio?.headingPost ?? ' places to recover.'
  const portfolioLede =
    portfolio?.lede ||
    'We work directly with each property — every villa is inspected by our concierge team quarterly, and we provision them ourselves so they are ready for you the moment you arrive.'

  // Villas — CMS-backed when present, otherwise hardcoded fallback (visual invariance).
  const cmsVillas = cms ? recoveryStaysSorted(cms) : []
  const villas: Villa[] =
    cmsVillas.length > 0
      ? cmsVillas.map((v, i) => {
          const imageUrl = v.heroImage ? mediaUrl(v.heroImage, '') : ''
          const fallback = FALLBACK_VILLAS[i]
          const loc = v.location || fallback?.loc || ''
          return {
            name: v.name || fallback?.name || 'Villa',
            loc,
            br: v.bedrooms || fallback?.br || '',
            pool: v.poolType || fallback?.pool || 'Private',
            fromIdr: v.priceFromIdrPerNight ?? fallback?.fromIdr ?? 0,
            img: imageUrl || fallback?.img || IMG.villa1,
            hue: v.imageHue ?? fallback?.hue ?? 0,
            body: v.body || fallback?.body || '',
            driveTime: v.driveTime || computeDriveTime(loc),
            nursingNote: v.nursingNote || fallback?.nursingNote || 'Available daily',
            media: v.heroImage,
          }
        })
      : FALLBACK_VILLAS

  // Inclusions section.
  const inclusionsSec = page?.inclusionsSection
  const inclusionsEyebrow = inclusionsSec?.eyebrow || "What's included"
  const inclusionsHeadingPre = inclusionsSec?.headingPre ?? 'Every stay, '
  const inclusionsHeadingItalic = inclusionsSec?.headingItalic ?? 'considered.'
  const inclusionsHeadingPost = inclusionsSec?.headingPost ?? ''
  const inclusionsLede =
    inclusionsSec?.lede ||
    'All villa stays include the small kindnesses that make recovery feel less clinical. Add-ons are available; few are necessary.'

  const inclusions =
    page?.inclusions && page.inclusions.length > 0 ? page.inclusions : FALLBACK_INCLUSIONS

  return (
    <PageShell activePage="recovery-stays">
      <ChapterOpener
        chapter={chapter}
        title={[titleA, titleB]}
        lede={lede}
        image={heroImg}
        imageHue={heroHue}
        imageLabel={heroLabel}
        breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: breadcrumbLabel }]}
      />

      <div className="stats-row">
        {topStats.map((stat, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="stat-block">
              <span className={`stat-num${stat.italic ? ' italic' : ''}`}>{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="page-section">
        <Reveal>
          <div className="section-head">
            <Eyebrow>{portfolioEyebrow}</Eyebrow>
            <div>
              <h2 className="section-title">
                {portfolioHeadingPre}
                <span className="italic">{portfolioHeadingItalic}</span>
                {portfolioHeadingPost}
              </h2>
              <p className="section-lede">{portfolioLede}</p>
            </div>
          </div>
        </Reveal>
        <div className="villa-grid">
          {villas.map((v, i) => (
            <Reveal key={i} delay={(i % 2) * 100} y={28}>
              <article className="villa-card">
                <div className="villa-img">
                  <Img media={v.media} src={v.img} fallbackLabel={v.name.toUpperCase()} fallbackHue={v.hue} alt="" />
                </div>
                <Mono>0{i + 1}</Mono>
                <h3 style={{ marginTop: 10 }}>{v.name}</h3>
                <span className="villa-loc">
                  {v.loc} · {v.br} · {v.pool} pool
                </span>
                <p>{v.body}</p>
                <div className="villa-meta">
                  <div>
                    <Mono>From</Mono>
                    <PriceTag idr={v.fromIdr} suffix=" / night" align="left" />
                  </div>
                  <div>
                    <Mono>Drive to clinic</Mono>
                    <span>{v.driveTime}</span>
                  </div>
                  <div>
                    <Mono>Nursing</Mono>
                    <span>{v.nursingNote}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-section tinted">
        <Reveal>
          <div className="section-head">
            <Eyebrow>{inclusionsEyebrow}</Eyebrow>
            <div>
              <h2 className="section-title">
                {inclusionsHeadingPre}
                <span className="italic">{inclusionsHeadingItalic}</span>
                {inclusionsHeadingPost}
              </h2>
              <p className="section-lede">{inclusionsLede}</p>
            </div>
          </div>
        </Reveal>
        <div className="recovery-inclusions-grid">
          {inclusions.map((inc, i) => (
            <Reveal key={i} delay={i * 40}>
              <div
                style={{
                  padding: '32px 36px',
                  borderBottom: '1px solid var(--ink-20)',
                  borderRight: i % 2 === 0 ? '1px solid var(--ink-20)' : 'none',
                  background: 'var(--paper)',
                }}
              >
                <Mono>{inc.letter}.</Mono>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 26,
                    fontWeight: 400,
                    margin: '10px 0 8px',
                    letterSpacing: '-0.005em',
                  }}
                >
                  {inc.title}
                </h4>
                <p style={{ margin: 0, fontSize: 16, color: 'var(--ink-80)', lineHeight: 1.55 }}>
                  {inc.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CmsExtraBlocks slug="recovery-stays" />
    </PageShell>
  )
}
