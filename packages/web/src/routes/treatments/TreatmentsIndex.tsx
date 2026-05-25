import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Eyebrow } from '@/components/primitives/Mono'
import { StatsRow } from '@/components/primitives/StatsRow'
import { TREATMENT_LIST, TREATMENT_IMG, IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { mediaUrl } from '@/lib/cms'

/* ─── R3 defensive fallbacks ───────────────────────────────────────────── */
/* Verbatim copies of the strings that lived in this file pre-R3. Used    */
/* only when the CMS cache is cold / the global has no value. After the   */
/* seed runs (`seed-treatments-section-globals.ts`), the cache supplies   */
/* the same strings — render stays byte-identical (Rule 3).               */
const FB = {
  hero: {
    chapter: 'Chapter II — The Repertoire',
    titleA: 'Six disciplines,',
    titleB: 'one sanctuary.',
    lede:
      'A complete repertoire of cosmetic medicine practiced under one roof — surgical, non-surgical, restorative, and the careful coordination that holds it all together.',
    imageHue: 1,
    imageLabel: 'THE REPERTOIRE',
    breadcrumbLabel: 'Treatments',
  },
  index: {
    eyebrow: 'An Index',
    heading: 'Browse by discipline.',
    lede:
      'Each discipline is led by a specialist surgeon and supported by the full clinical, recovery, and concierge team. Treatments may be combined across disciplines on a single visit.',
    readMoreLabel: 'Read more',
    readMoreArrow: '→',
  },
  stats: [
    { number: '28', label: 'Years in Bali' },
    { number: '2,400+', label: 'Procedures yearly' },
    { number: '8', label: 'Specialists on faculty' },
    { number: '96%', label: 'Patient satisfaction' },
  ],
}

export const TreatmentsIndex: React.FC = () => {
  const cms = useCms()
  const heroCms = cms?.treatmentsHero
  const indexCms = cms?.treatmentsIndexSection
  const statsCms = cms?.treatmentsStats

  const hero = {
    chapter: heroCms?.chapter || FB.hero.chapter,
    titleA: heroCms?.titleA || FB.hero.titleA,
    titleB: heroCms?.titleB || FB.hero.titleB,
    lede: heroCms?.lede || FB.hero.lede,
    image: mediaUrl(heroCms?.heroImage) || IMG.surgical,
    imageHue: heroCms?.imageHue ?? FB.hero.imageHue,
    imageLabel: heroCms?.imageLabel || FB.hero.imageLabel,
    breadcrumbLabel: heroCms?.breadcrumbLabel || FB.hero.breadcrumbLabel,
  }

  const idx = {
    eyebrow: indexCms?.eyebrow || FB.index.eyebrow,
    heading: indexCms?.heading || FB.index.heading,
    lede: indexCms?.lede || FB.index.lede,
    readMoreLabel: indexCms?.readMoreLabel || FB.index.readMoreLabel,
    readMoreArrow: indexCms?.readMoreArrow || FB.index.readMoreArrow,
  }

  const stats =
    statsCms?.stats && statsCms.stats.length > 0 ? statsCms.stats : FB.stats

  return (
    <PageShell activePage="treatments">
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
        <Reveal>
          <div className="section-head">
            <Eyebrow>{idx.eyebrow}</Eyebrow>
            <div>
              <h2 className="section-title">{idx.heading}</h2>
              <p className="section-lede">{idx.lede}</p>
            </div>
          </div>
        </Reveal>

        <div className="treatment-index">
          {TREATMENT_LIST.map((t, i) => (
            <Reveal key={t.slug} delay={i * 60} y={20}>
              <a href={`/treatments/${t.slug}`} className="treatment-row" style={{ color: 'inherit' }}>
                <div className="ti-image">
                  <Img media={t.heroImage} src={TREATMENT_IMG(t.slug)} fallbackLabel={t.t.toUpperCase()} fallbackHue={t.hue} alt="" />
                </div>
                <div className="ti-body">
                  <div>
                    <h3>{t.t}</h3>
                    <p className="ti-italic">{t.sub}</p>
                    <p>{t.body}</p>
                  </div>
                  <div className="ti-foot">
                    <span className="treatment-link">
                      {idx.readMoreLabel} <span>{idx.readMoreArrow}</span>
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <StatsRow stats={stats} variant="page-row" />
    </PageShell>
  )
}
