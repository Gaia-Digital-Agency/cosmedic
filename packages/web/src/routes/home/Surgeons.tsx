import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { SURGEON_LIST, SURGEON_IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { mediaUrl } from '@/lib/cms.media'

const TEAM_PLACEHOLDER = '/assets/surgeons/team-placeholder.webp'

export const Surgeons: React.FC = () => {
  const cms = useCms()
  const g = cms?.homeSurgeonsView
  const eyebrow = g?.eyebrow || 'Meet the Surgeons'
  const leadSurgeonEyebrow = g?.leadSurgeonEyebrow || 'Lead Surgeon'
  const leadBodyDefault = (
    <>
      ISAPS-member plastic surgeon with seven years of practice in Bali, fellowship-trained in
      maxillofacial surgery in Japan, specializing in{' '}
      <em>facial aesthetics, body contouring and breast surgery</em>. Cited by patients for a
      conservative, natural-result approach.
    </>
  )
  const leadStat1Label = g?.leadStat1Label || 'Trained'
  const leadStat1Value = g?.leadStat1Value || 'Indonesia · Japan'
  const leadStat2Label = g?.leadStat2Label || 'Specialty'
  const leadStat2Value = g?.leadStat2Value || 'Facial Aesthetics'
  const leadStat3Label = g?.leadStat3Label || 'Society'
  const leadStat3Value = g?.leadStat3Value || 'ISAPS Member'
  const leadCtaLabel = g?.leadCtaLabel || 'Read the full profile'
  const associatesEyebrow = g?.associatesEyebrow || 'Associate Surgeons & Aestheticians'
  const teamCaption = g?.teamCaption || 'The Cosmedic Team'

  const groupPhotoSrc = mediaUrl(g?.groupPhoto, TEAM_PLACEHOLDER) || TEAM_PLACEHOLDER
  const groupPhotoAlt =
    g?.groupPhotoAlt ||
    (g?.groupPhoto && typeof g.groupPhoto === 'object' ? g.groupPhoto.alt : undefined) ||
    associatesEyebrow

  const lead = SURGEON_LIST[0]
  const leadFirstNames = lead.name.split(' ').slice(0, -1).join(' ')
  const leadLastName = lead.name.split(' ').slice(-1)[0]

  return (
    <section className="surgeons" id="surgeons">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <div className="surgeons-feature">
        <Reveal delay={120}>
          <div className="surgeons-feature-img" data-surgeon={lead.slug}>
            <Img
              media={lead.portrait}
              src={SURGEON_IMG(lead.slug)}
              fallbackLabel={`DR. ${lead.common.toUpperCase()}`}
              fallbackHue={lead.hue}
              alt={`Portrait of ${lead.title} ${lead.common}`}
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 600px"
            />
          </div>
        </Reveal>
        <Reveal delay={240} style={{ paddingTop: 32 }}>
          <Mono>{leadSurgeonEyebrow}</Mono>
          <h2 className="surgeon-name">
            <span>
              {lead.title} {leadFirstNames}
            </span>
            <br />
            <span className="italic">{leadLastName}</span>
          </h2>
          <p className="surgeon-credentials">{lead.cred}</p>
          <p className="surgeon-body">
            {g?.leadBody ?? leadBodyDefault}
          </p>
          <div className="surgeon-stats">
            <div>
              <Mono>{leadStat1Label}</Mono>
              <span>{leadStat1Value}</span>
            </div>
            <div>
              <Mono>{leadStat2Label}</Mono>
              <span>{leadStat2Value}</span>
            </div>
            <div>
              <Mono>{leadStat3Label}</Mono>
              <span>{leadStat3Value}</span>
            </div>
          </div>
          <Btn kind="ghost" as="a" href={`/surgeons/${lead.slug}`}>
            {leadCtaLabel}
          </Btn>
        </Reveal>
      </div>

      <div
        style={{
          marginTop: 80,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: '1px solid var(--ink-20)',
          paddingBottom: 18,
        }}
      >
        <Mono>{associatesEyebrow}</Mono>
        <Mono>{teamCaption}</Mono>
      </div>
      <Reveal delay={80}>
        <div className="surgeons-team-photo" style={{ marginTop: 32 }}>
          <Img
            src={groupPhotoSrc}
            alt={groupPhotoAlt}
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 92vw, 1200px"
          />
        </div>
      </Reveal>
    </section>
  )
}
