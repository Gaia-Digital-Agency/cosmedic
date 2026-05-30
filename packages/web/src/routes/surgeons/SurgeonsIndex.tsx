import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { ChapterOpener } from '@/components/primitives/ChapterOpener'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { SURGEON_LIST, SURGEON_IMG, IMG, type Surgeon } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { mediaUrl } from '@/lib/cms'

/* ─── R4 defensive fallbacks ───────────────────────────────────────────── */
/* Verbatim copies of the strings that lived in this file pre-R4. Used  */
/* only when the CMS cache is cold / the global has no value. After the  */
/* seed runs (`seed-doctors-section-globals.ts`), the cache supplies the */
/* same strings — render stays byte-identical (Rule 3 / no-data-loss).   */
const FB = {
  hero: {
    chapter: 'Chapter III — The Practitioners',
    title: { a: 'Hands you', b: 'can trust.' },
    lede: 'Eight specialists across plastic surgery and aesthetic medicine — ISAPS members, fellowship-trained in Korea, Japan, and Singapore, and rooted in Bali.',
    imageHue: 2,
    imageLabel: 'THE PRACTITIONERS',
    breadcrumbLabel: 'Surgeons',
  },
  lead: {
    sectionEyebrow: 'Lead Plastic Surgeon',
    blockEyebrow: 'Lead Surgeon',
    statLabelTrained: 'Trained',
    statLabelSpecialty: 'Specialty',
    statLabelDistinction: 'Distinction',
    ctaLabel: 'Read the full profile',
  },
  plastic: {
    eyebrow: 'Plastic Surgery',
    heading: { a: '', b: ' & aesthetic.' },
    headingItalic: 'Reconstructive',
    lede: 'Our plastic surgery team holds combined fellowships from Korea, Japan, Singapore, and Indonesia — and ISAPS, FICS, and craniomaxillofacial subspecialty credentials.',
  },
  aesthetic: {
    eyebrow: 'Aesthetic Medicine',
    heading: { a: '', b: ' non-surgical.' },
    headingItalic: 'Quiet',
    lede: 'Anti-aging, dermatology, venereology and aesthetics — for the considered, everyday refinements between bigger decisions.',
  },
}

const SurgeonCard: React.FC<{ s: Surgeon; idx: number }> = ({ s, idx }) => (
  <Reveal delay={idx * 60} y={20}>
    <a href={`/experts/${s.slug}`} style={{ color: 'inherit', display: 'block' }}>
      <div className="surgeon-card" data-surgeon={s.slug}>
        <div className="surgeon-card-img" style={{ aspectRatio: '4 / 5' }}>
          <Img
            media={s.portrait}
            src={SURGEON_IMG(s.slug)}
            fallbackLabel={`DR. ${s.common.toUpperCase()}`}
            fallbackHue={s.hue}
            alt=""
            sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 280px"
          />
        </div>
        <div className="surgeon-card-meta" style={{ paddingTop: 20 }}>
          <h4 style={{ fontSize: 22, marginTop: 6 }}>
            {s.name}
          </h4>
          {s.suffix && (
            <span className="surgeon-train" style={{ fontSize: 14, marginTop: 2 }}>
              {s.suffix}
            </span>
          )}
          <span
            className="surgeon-train"
            style={{ fontSize: 14, marginTop: 6, color: 'var(--ink-80)' }}
          >
            {s.spec}
          </span>
          <span className="mono" style={{ marginTop: 12, color: 'var(--accent-deep)' }}>
            {s.proc}
          </span>
        </div>
      </div>
    </a>
  </Reveal>
)

export const SurgeonsIndex: React.FC = () => {
  const PLASTIC = SURGEON_LIST.filter((s) => s.group === 'Plastic Surgery')
  const AESTHETIC = SURGEON_LIST.filter((s) => s.group === 'Aesthetic Medicine')
  const lead = SURGEON_LIST[0]

  const cms = useCms()
  const heroCms = cms?.surgeonsHero
  const leadCms = (cms?.surgeonsPlasticView as any)?.lead ?? cms?.surgeonsLeadView
  const plasticCms = (cms?.surgeonsPlasticView as any)?.plasticSurgery ?? cms?.surgeonsPlasticView
  const aestheticCms = (cms?.surgeonsPlasticView as any)?.aestheticMedicine ?? cms?.surgeonsAestheticView

  // Resolved values (CMS-or-fallback). Each line is "global || fallback string"
  // so a partially-empty global degrades to a literal — never undefined.
  const hero = {
    chapter: heroCms?.chapter || FB.hero.chapter,
    titleA: heroCms?.title?.a || FB.hero.title.a,
    titleB: heroCms?.title?.b || FB.hero.title.b,
    lede: heroCms?.lede || FB.hero.lede,
    image: mediaUrl(heroCms?.heroImage) || IMG.clinic,
    imageHue: heroCms?.imageHue ?? FB.hero.imageHue,
    imageLabel: heroCms?.imageLabel || FB.hero.imageLabel,
    breadcrumbLabel: heroCms?.breadcrumbLabel || FB.hero.breadcrumbLabel,
  }

  // Defensive: during a CMS cache cold-start the lazy proxy can briefly
  // hand back an empty array. Return a minimal placeholder instead of
  // crashing the SSR render — the next request (after cache warm) renders
  // the full page.
  if (!lead) {
    return (
      <PageShell activePage="surgeons">
        <ChapterOpener
          chapter={hero.chapter}
          title={[hero.titleA, hero.titleB]}
          lede="Loading surgeon roster…"
          image={hero.image}
          imageHue={hero.imageHue}
          imageLabel={hero.imageLabel}
          breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: hero.breadcrumbLabel }]}
        />
      </PageShell>
    )
  }
  return (
  <PageShell activePage="surgeons">
    <ChapterOpener
      chapter={hero.chapter}
      title={[hero.titleA, hero.titleB]}
      lede={hero.lede}
      image={hero.image}
      imageHue={hero.imageHue}
      imageLabel={hero.imageLabel}
      breadcrumbs={[{ label: 'BIMC CosMedic', href: '/' }, { label: hero.breadcrumbLabel }]}
    />

    <section id="surgical" className="page-section" style={{ scrollMarginTop: 100 }}>
      <Reveal>
        <Eyebrow>{leadCms?.sectionEyebrow || FB.lead.sectionEyebrow}</Eyebrow>
      </Reveal>
      <div
        className="surgeons-feature"
        style={{ marginTop: 40, paddingBottom: 0, borderBottom: 'none' }}
      >
        <Reveal delay={120}>
          <div className="surgeons-feature-img" data-surgeon={lead.slug}>
            <Img
              media={lead.portrait}
              src={SURGEON_IMG(lead.slug)}
              fallbackLabel={`DR. ${lead.common.toUpperCase()}`}
              fallbackHue={lead.hue}
              alt=""
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 600px"
            />
          </div>
        </Reveal>
        <Reveal delay={240} style={{ paddingTop: 32 }}>
          <Mono>{leadCms?.blockEyebrow || FB.lead.blockEyebrow}</Mono>
          <h2 className="surgeon-name">
            <span>
              {lead.name.split(' ').slice(0, -1).join(' ')}
            </span>
            <br />
            <span className="italic">{lead.name.split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="surgeon-credentials">{lead.cred}</p>
          <p className="surgeon-body">{lead.bio}</p>
          <div className="surgeon-stats">
            <div>
              <Mono>{leadCms?.statLabelTrained || FB.lead.statLabelTrained}</Mono>
              <span>{lead.train}</span>
            </div>
            <div>
              <Mono>{leadCms?.statLabelSpecialty || FB.lead.statLabelSpecialty}</Mono>
              <span>{lead.spec_areas[0]}</span>
            </div>
            <div>
              <Mono>{leadCms?.statLabelDistinction || FB.lead.statLabelDistinction}</Mono>
              <span>{lead.proc}</span>
            </div>
          </div>
          <Btn kind="ghost" as="a" href={`/experts/${lead.slug}`}>
            {leadCms?.ctaLabel || FB.lead.ctaLabel}
          </Btn>
        </Reveal>
      </div>
    </section>

    <section className="page-section tinted">
      <Reveal>
        <div className="section-head">
          <Eyebrow>{plasticCms?.eyebrow || FB.plastic.eyebrow}</Eyebrow>
          <div>
            <h2 className="section-title">
              {plasticCms?.heading?.a ?? FB.plastic.heading.a}
              <span className="italic">{plasticCms?.headingItalic || FB.plastic.headingItalic}</span>
              {plasticCms?.heading?.b ?? FB.plastic.heading.b}
            </h2>
            <p className="section-lede">{plasticCms?.lede || FB.plastic.lede}</p>
          </div>
        </div>
      </Reveal>
      <div className="surgeons-section-grid">
        {PLASTIC.slice(1).map((s, i) => (
          <SurgeonCard key={s.slug} s={s} idx={i + 1} />
        ))}
      </div>
    </section>

    <section id="aesthetic" className="page-section" style={{ scrollMarginTop: 100 }}>
      <Reveal>
        <div className="section-head">
          <Eyebrow>{aestheticCms?.eyebrow || FB.aesthetic.eyebrow}</Eyebrow>
          <div>
            <h2 className="section-title">
              {aestheticCms?.heading?.a ?? FB.aesthetic.heading.a}
              <span className="italic">{aestheticCms?.headingItalic || FB.aesthetic.headingItalic}</span>
              {aestheticCms?.heading?.b ?? FB.aesthetic.heading.b}
            </h2>
            <p className="section-lede">{aestheticCms?.lede || FB.aesthetic.lede}</p>
          </div>
        </div>
      </Reveal>
      <div className="surgeons-section-grid-4">
        {AESTHETIC.map((s, i) => (
          <SurgeonCard key={s.slug} s={s} idx={PLASTIC.length + i} />
        ))}
      </div>
    </section>
  </PageShell>
  )
}
