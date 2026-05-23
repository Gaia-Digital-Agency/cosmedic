import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { PriceTag } from '@/components/primitives/PriceTag'
import { IMG } from '@/content/seed'

const VILLAS = [
  {
    name: 'Villa Sembilan',
    loc: 'Nusa Dua',
    br: '2 BR',
    pool: 'Private',
    from: 'AUD 280 / night',
    img: IMG.villa1,
    hue: 0,
    body:
      'A quiet two-bedroom villa within the ITDC compound — five minutes from the BIMC hospital and a short walk to the beach. Our most-chosen villa for solo and couple recovery.',
  },
  {
    name: 'Villa Damai',
    loc: 'Ubud',
    br: '3 BR',
    pool: 'Private',
    from: 'AUD 420 / night',
    img: IMG.villa2,
    hue: 1,
    body:
      'A three-bedroom villa in the rice paddies above Ubud, for patients who prefer cooler air and slower mornings. Forty-five-minute drive to the hospital; daily nursing visits arranged.',
  },
  {
    name: 'Villa Kelapa',
    loc: 'Jimbaran',
    br: '2 BR',
    pool: 'Private',
    from: 'AUD 320 / night',
    img: IMG.villa3,
    hue: 2,
    body:
      'A beachfront villa in Jimbaran with sunset views and direct sand access. Suited to non-surgical and short-recovery patients who want to swim earlier.',
  },
  {
    name: 'Villa Tirta',
    loc: 'Nusa Dua',
    br: '4 BR',
    pool: 'Private',
    from: 'AUD 580 / night',
    img: IMG.villa4,
    hue: 3,
    body:
      'A four-bedroom villa for families travelling together, or for patients who want extra space. Six-minute drive to the hospital.',
  },
  {
    name: 'The Apurva Suite',
    loc: 'Nusa Dua',
    br: '1 BR',
    pool: 'Resort',
    from: 'AUD 520 / night',
    img: IMG.villa5,
    hue: 4,
    body:
      'A one-bedroom suite at The Apurva Kempinski for patients who prefer hotel service over villa living. Full nursing visits arranged in-room.',
  },
  {
    name: 'Villa Sereno',
    loc: 'Sanur',
    br: '3 BR',
    pool: 'Private',
    from: 'AUD 380 / night',
    img: IMG.villa6,
    hue: 5,
    body:
      'A traditional Balinese-style three-bedroom villa in the quiet of Sanur — twenty-five minutes from the hospital, well-suited to longer recoveries.',
  },
]

const INCLUSIONS: [string, string, string][] = [
  ['A', 'Welcome provisioning', 'Fresh linens, groceries for two days, your favourite tea waiting.'],
  ['B', 'Daily housekeeping', 'Twice-daily turndown, laundry on request.'],
  ['C', 'Driver on call', '24-hour driver service, included for you and your party.'],
  ['D', 'Twenty-four-hour security', 'Every villa is staffed continuously.'],
  ['E', 'Full kitchen', 'We will stock it with what you ask us to stock it with.'],
  ['F', 'Wifi & telecoms', 'Local SIM with data, ready in your room.'],
  ['G', 'Daily nursing visits', 'By arrangement — included in surgical packages.'],
  ['H', 'Aftercare provisioning', 'Pharmacy, dressings, and post-op food restocked daily.'],
]

const driveTime = (loc: string) =>
  loc === 'Nusa Dua' ? '5 min' : loc === 'Jimbaran' ? '15 min' : loc === 'Sanur' ? '25 min' : '45 min'

export const RecoveryStaysPage: React.FC = () => (
  <PageShell activePage="recovery-stays">
    <ChapterOpener
      chapter="Chapter VII — Recovery Stays"
      title={['A villa, a', 'quiet recovery.']}
      lede="A small, hand-selected portfolio of villas and resort suites in Nusa Dua, Ubud, Sanur, and Jimbaran. Every stay includes provisioning, drivers, and the option of daily nursing."
      image={IMG.villa1}
      imageHue={4}
      imageLabel="RECOVERY STAYS"
      breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: 'Recovery Stays' }]}
    />

    <div className="stats-row">
      <Reveal>
        <div className="stat-block">
          <span className="stat-num">6</span>
          <span className="stat-label">Curated villas</span>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <div className="stat-block">
          <span className="stat-num">4</span>
          <span className="stat-label">Locations across Bali</span>
        </div>
      </Reveal>
      <Reveal delay={160}>
        <div className="stat-block">
          <span className="stat-num italic">5–21</span>
          <span className="stat-label">Nights, typical stay</span>
        </div>
      </Reveal>
      <Reveal delay={240}>
        <div className="stat-block">
          <span className="stat-num italic">All</span>
          <span className="stat-label">Provisioned by us</span>
        </div>
      </Reveal>
    </div>

    <section className="page-section">
      <Reveal>
        <div className="section-head">
          <Eyebrow>The portfolio</Eyebrow>
          <div>
            <h2 className="section-title">
              <span className="italic">Six</span> places to recover.
            </h2>
            <p className="section-lede">
              We work directly with each property — every villa is inspected by our concierge team
              quarterly, and we provision them ourselves so they are ready for you the moment you
              arrive.
            </p>
          </div>
        </div>
      </Reveal>
      <div className="villa-grid">
        {VILLAS.map((v, i) => (
          <Reveal key={i} delay={(i % 2) * 100} y={28}>
            <article className="villa-card">
              <div className="villa-img">
                <Img src={v.img} fallbackLabel={v.name.toUpperCase()} fallbackHue={v.hue} alt="" />
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
                  <PriceTag aud={v.from} align="left" />
                </div>
                <div>
                  <Mono>Drive to clinic</Mono>
                  <span>{driveTime(v.loc)}</span>
                </div>
                <div>
                  <Mono>Nursing</Mono>
                  <span>Available daily</span>
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
          <Eyebrow>What's included</Eyebrow>
          <div>
            <h2 className="section-title">
              Every stay, <span className="italic">considered.</span>
            </h2>
            <p className="section-lede">
              All villa stays include the small kindnesses that make recovery feel less clinical.
              Add-ons are available; few are necessary.
            </p>
          </div>
        </div>
      </Reveal>
      <div className="recovery-inclusions-grid">
        {INCLUSIONS.map(([k, t, body], i) => (
          <Reveal key={i} delay={i * 40}>
            <div
              style={{
                padding: '32px 36px',
                borderBottom: '1px solid var(--ink-20)',
                borderRight: i % 2 === 0 ? '1px solid var(--ink-20)' : 'none',
                background: 'var(--paper)',
              }}
            >
              <Mono>{k}.</Mono>
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
                {t}
              </h4>
              <p style={{ margin: 0, fontSize: 16, color: 'var(--ink-80)', lineHeight: 1.55 }}>
                {body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
    <CmsExtraBlocks slug="recovery-stays" />
  </PageShell>
)
