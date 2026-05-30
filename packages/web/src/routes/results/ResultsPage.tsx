import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { BA_PAIRS, STORY_PORTRAITS, IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { mediaUrl } from '@/lib/cms'

/* ─── R5 defensive fallbacks ───────────────────────────────────────────── */
/* Verbatim copies of the strings that lived in this file pre-R5. Used   */
/* only when the CMS cache is cold / the global has no value. After the   */
/* seed runs (`seed-results-section-globals.ts`), the cache supplies the  */
/* same strings — render stays byte-identical (Rule 3 / no-data-loss).    */
const FB = {
  hero: {
    chapter: 'Chapter IV — Results & Stories',
    title: { a: 'Quietly', b: 'transformative.' },
    lede:
      'A small selection of consented results paired with the stories behind them. Our complete library — over two hundred cases — is shared during private consultation.',
    imageHue: 1,
    imageLabel: 'RESULTS & STORIES',
    breadcrumbLabel: 'Results & Stories',
  },
  featured: {
    headingPre: 'Four signature cases,',
    headingItalic: 'shared with permission.',
    lede:
      'Each case represents a typical outcome, photographed at consistent angles and lighting, three to six months post-procedure.',
    filterBarLabel: 'Featured cases',
    countFormat: '{n} cases · facial',
  },
  storiesView: {
    headingPre: 'Stories,',
    headingItalic: 'not slogans.',
    lede:
      "Eight stories from the last two years of patients, shared with their permission. Editorial restraint over marketing copy — these are the patients we're proudest to have served.",
  },
  library: {
    eyebrow: 'Private gallery',
    headingPre: 'Want to see ',
    headingItalic: 'more?',
    body:
      'Our complete library — over two hundred consented cases across every discipline — is shared during private consultation. We will match what we show you to the work you are considering.',
    buttonLabel: 'Request the full library',
    buttonHref: '/contact',
  },
  share: {
    eyebrow: 'Sharing your story',
    headingPre: 'Have a ',
    headingItalic: 'story',
    headingPost: ' to share?',
    body:
      "We never solicit testimonials — every story we publish is shared at the patient's instigation, in their own words, with their consent. If you'd like to share, we would be honoured to read it.",
    buttonLabel: 'Write to us',
    buttonHref: '/contact',
  },
  stories: [
    { q: 'I came expecting a procedure. I left having had something closer to a retreat — handled, cared for, and quietly returned to myself. The villa, the daily nursing, the slow afternoons — all of it felt like the opposite of medical tourism. It felt like being looked after.', n: 'Sarah K.', c: 'Sydney, Australia', p: 'Rhinoplasty · 2025', hue: 1 },
    { q: "dr. Suka talked me out of two of the three things I'd asked for. The result is the most natural I've ever looked. I'm grateful — and a little stunned that anyone would turn down work in a market like this. They are different here.", n: 'Margaux D.', c: 'Paris, France', p: 'Mid-face · 2024', hue: 3 },
    { q: "The villa, the nursing, the follow-ups — it felt less like medical tourism and more like being looked after by family. My concierge still texts me on the anniversary of my surgery. That's the part you don't see in the brochure.", n: 'James W.', c: 'Melbourne, Australia', p: 'Hair restoration · 2025', hue: 5 },
    { q: 'I had a complication on day three. The nurse was at my villa within twenty minutes; my surgeon was there within the hour. Nothing was hidden, nothing was rushed. They handled it with the kind of calm I associate with the very best hospitals at home.', n: 'Rachel T.', c: 'Auckland, New Zealand', p: 'Abdominoplasty · 2024', hue: 2 },
    { q: 'I am a slow decision-maker. My initial consultation was in March; my procedure was in November. They never rushed me, never tried to upsell, never made me feel anything other than welcome. By the time I arrived, I had no anxiety left at all.', n: 'Chen Y.', c: 'Singapore', p: 'Eyelid surgery · 2024', hue: 0 },
    { q: 'The Bali part of it was almost incidental in the end — I came for the surgeon, not the location. But by week two of recovery, watching the ocean from the villa, I understood why everyone insists on saying it. Recovery here is not the same as recovery at home.', n: 'Daniel R.', c: 'Los Angeles, USA', p: 'Facelift · 2025', hue: 4 },
    { q: 'My partner was nervous about flying somewhere for surgery. The concierge spoke to him directly, sent him photos of the villa, walked him through the safety record of the hospital. By the time we landed, he was the calm one. They thought of everything.', n: 'Aisha M.', c: 'London, UK', p: 'Liposculpture · 2025', hue: 1 },
    { q: "I had veneers fitted in three visits over fourteen days. The on-site ceramicist refined the shade twice — once between try-in and final placement, once after I'd lived with the smile for a day. It is the most considered piece of dental work I've ever had.", n: 'Hiroko S.', c: 'Tokyo, Japan', p: 'Smile design · 2024', hue: 3 },
  ],
}

export const ResultsPage: React.FC = () => {
  const cms = useCms()
  const heroCms = cms?.resultsHero
  const featuredCms = (cms?.resultsHero as any)?.featuredCases
  const storiesViewCms = (cms?.resultsHero as any)?.storiesView
  const libraryCms = (cms?.resultsHero as any)?.libraryCta
  const shareCms = (cms?.resultsHero as any)?.share

  const hero = {
    chapter: heroCms?.chapter || FB.hero.chapter,
    titleA: heroCms?.titleA || FB.hero.title.a,
    titleB: heroCms?.titleB || FB.hero.title.b,
    lede: heroCms?.lede || FB.hero.lede,
    image: mediaUrl(heroCms?.heroImage) || IMG.texture,
    imageHue: heroCms?.imageHue ?? FB.hero.imageHue,
    imageLabel: heroCms?.imageLabel || FB.hero.imageLabel,
    breadcrumbLabel: heroCms?.breadcrumbLabel || FB.hero.breadcrumbLabel,
  }

  const featured = {
    headingPre: featuredCms?.headingPre || FB.featured.headingPre,
    headingItalic: featuredCms?.headingItalic || FB.featured.headingItalic,
    lede: featuredCms?.lede || FB.featured.lede,
    filterBarLabel: featuredCms?.filterBarLabel || FB.featured.filterBarLabel,
    countFormat: featuredCms?.countFormat || FB.featured.countFormat,
  }

  const storiesView = {
    headingPre: storiesViewCms?.headingPre || FB.storiesView.headingPre,
    headingItalic: storiesViewCms?.headingItalic || FB.storiesView.headingItalic,
    lede: storiesViewCms?.lede || FB.storiesView.lede,
  }

  const library = {
    eyebrow: libraryCms?.eyebrow || FB.library.eyebrow,
    headingPre: libraryCms?.headingPre || FB.library.headingPre,
    headingItalic: libraryCms?.headingItalic || FB.library.headingItalic,
    body: libraryCms?.body || FB.library.body,
    buttonLabel: libraryCms?.buttonLabel || FB.library.buttonLabel,
    buttonHref: libraryCms?.buttonHref || FB.library.buttonHref,
  }

  const share = {
    eyebrow: shareCms?.eyebrow || FB.share.eyebrow,
    headingPre: shareCms?.headingPre || FB.share.headingPre,
    headingItalic: shareCms?.headingItalic || FB.share.headingItalic,
    headingPost: shareCms?.headingPost || FB.share.headingPost,
    body: shareCms?.body || FB.share.body,
    buttonLabel: shareCms?.buttonLabel || FB.share.buttonLabel,
    buttonHref: shareCms?.buttonHref || FB.share.buttonHref,
  }

  // Patient stories — sorted by sortOrder; falls back to the hardcoded
  // array on cold cache so /results never renders an empty Stories row.
  const cmsStories = (cms?.stories ?? [])
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  const STORIES = cmsStories.length
    ? cmsStories.map((s) => ({
        q: s.quote || '',
        n: s.patientLabel,
        c: s.country || '',
        p: s.procedureLabel || '',
        hue: s.hue ?? 0,
        portrait: mediaUrl(s.portrait) || '',
      }))
    : FB.stories.map((s) => ({ ...s, portrait: '' }))

  return (
  <PageShell activePage="results">
    <ChapterOpener
      chapter={hero.chapter}
      title={[hero.titleA, hero.titleB]}
      lede={hero.lede}
      image={hero.image}
      imageHue={hero.imageHue}
      imageLabel={hero.imageLabel}
      breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: hero.breadcrumbLabel }]}
    />

    <section className="page-section" id="results">
      <div className="section-anchor-head">
        <h2 className="section-title" style={{ marginTop: 0 }}>
          <span>{featured.headingPre}</span>
          <br />
          <span className="italic">{featured.headingItalic}</span>
        </h2>
        <p className="section-lede" style={{ maxWidth: 640 }}>{featured.lede}</p>
      </div>

      <div className="filter-bar" style={{ marginBottom: 40 }}>
        <Mono>{featured.filterBarLabel}</Mono>
        <span style={{ marginLeft: 'auto' }} className="mono">
          {featured.countFormat.replace('{n}', String(BA_PAIRS.length))}
        </span>
      </div>

      <div className="gallery-grid">
        {BA_PAIRS.map((c, i) => {
          const alt = c.beforeAlt && c.afterAlt
            ? `${c.beforeAlt} / ${c.afterAlt}`
            : c.beforeAlt || c.afterAlt || `${c.label} — before and after`
          return (
            <Reveal key={c.num} delay={i * 80} y={24}>
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
            marginTop: 60,
            padding: '44px 40px',
            textAlign: 'center',
            background: 'var(--paper-warm)',
            border: '1px solid var(--ink-20)',
          }}
        >
          <Mono>{library.eyebrow}</Mono>
          <h3
            className="section-title"
            style={{ margin: '14px 0 14px', fontSize: 'clamp(32px, 4vw, 48px)' }}
          >
            {library.headingPre}<span className="italic">{library.headingItalic}</span>
          </h3>
          <p
            style={{
              margin: '0 auto 22px',
              maxWidth: 560,
              color: 'var(--ink-80)',
              fontSize: 16.5,
              lineHeight: 1.65,
            }}
          >{library.body}</p>
          <Btn kind="primary" as="a" href={library.buttonHref}>{library.buttonLabel}</Btn>
        </div>
      </Reveal>
    </section>

    <div className="results-stories-divider" aria-hidden="true">
      <span className="rule" />
      <span className="mark">§</span>
      <span className="rule" />
    </div>

    <section className="page-section tinted" id="stories">
      <div className="section-anchor-head">
        <h2 className="section-title" style={{ marginTop: 0 }}>
          <span>{storiesView.headingPre}</span> <span className="italic">{storiesView.headingItalic}</span>
        </h2>
        <p className="section-lede" style={{ maxWidth: 640 }}>{storiesView.lede}</p>
      </div>

      <div className="stories-index">
        {STORIES.map((s, i) => (
          <Reveal key={i} delay={0} y={24}>
            <article className="story-row">
              <div className="story-row-img">
                <Img
                  src={s.portrait || STORY_PORTRAITS[i % STORY_PORTRAITS.length]}
                  fallbackLabel={s.n.toUpperCase()}
                  fallbackHue={s.hue}
                  alt=""
                />
              </div>
              <blockquote>"{s.q}"</blockquote>
              <div className="story-row-meta">
                <Mono>
                  0{i + 1} of 0{STORIES.length}
                </Mono>
                <span className="name">{s.n}</span>
                <span className="city">{s.c}</span>
                <Mono style={{ marginTop: 8 }}>{s.p}</Mono>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '48px auto 0' }}>
          <Mono>{share.eyebrow}</Mono>
          <h3
            className="section-title"
            style={{ margin: '14px 0', fontSize: 'clamp(32px, 4vw, 48px)' }}
          >
            {share.headingPre}<span className="italic">{share.headingItalic}</span>{share.headingPost}
          </h3>
          <p
            style={{
              margin: '0 auto 28px',
              color: 'var(--ink-80)',
              fontSize: 17,
              lineHeight: 1.65,
            }}
          >{share.body}</p>
          <Btn kind="primary" as="a" href={share.buttonHref}>{share.buttonLabel}</Btn>
        </div>
      </Reveal>
    </section>
  </PageShell>
  )
}
