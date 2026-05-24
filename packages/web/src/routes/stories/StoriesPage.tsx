import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { CmsExtraBlocks } from '@/components/CmsExtraBlocks'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { STORY_PORTRAITS, IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { mediaUrl } from '@/lib/cms'

/* ─── R5 defensive fallbacks ───────────────────────────────────────────── */
const FB = {
  hero: {
    chapter: 'Chapter VI — Stories',
    titleA: 'In their',
    titleB: 'own words.',
    lede:
      "Eight stories from the last two years of patients, shared with their permission. Editorial restraint over marketing copy — these are the patients we're proudest to have served.",
    imageHue: 5,
    imageLabel: 'STORIES',
    breadcrumbLabel: 'Stories',
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

export const StoriesPage: React.FC = () => {
  const cms = useCms()
  const storiesPage = cms?.pages.find((p) => p?.slug === 'stories')
  const shareCms = cms?.shareCta

  const hero = {
    chapter: storiesPage?.tagline || FB.hero.chapter,
    titleA: storiesPage?.chapterTitle?.a || FB.hero.titleA,
    titleB: storiesPage?.chapterTitle?.b || FB.hero.titleB,
    lede: storiesPage?.lede || FB.hero.lede,
    image: mediaUrl(storiesPage?.heroImage) || IMG.texture,
    imageHue: storiesPage?.imageHue ?? FB.hero.imageHue,
    imageLabel: storiesPage?.imageLabel || FB.hero.imageLabel,
    breadcrumbLabel: storiesPage?.breadcrumbLabel || FB.hero.breadcrumbLabel,
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
  <PageShell activePage="stories">
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
      <div className="stories-index" style={{ maxWidth: 1280, margin: '0 auto' }}>
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
    </section>

    <section className="page-section tinted">
      <Reveal>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <Mono>{share.eyebrow}</Mono>
          <h2 className="section-title" style={{ margin: '16px 0' }}>
            {share.headingPre}<span className="italic">{share.headingItalic}</span>{share.headingPost}
          </h2>
          <p style={{ margin: '0 auto 32px', color: 'var(--ink-80)', fontSize: 17, lineHeight: 1.65 }}>
            {share.body}
          </p>
          <Btn kind="primary" as="a" href={share.buttonHref}>{share.buttonLabel}</Btn>
        </div>
      </Reveal>
    </section>
    <CmsExtraBlocks slug="stories" />
  </PageShell>
  )
}
