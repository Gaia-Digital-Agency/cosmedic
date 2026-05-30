import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { useCms } from '@/lib/cms-context'
import { mediaUrl } from '@/lib/cms.media'

const TEAM_PLACEHOLDER = '/assets/experts/team-placeholder.webp'

export const Surgeons: React.FC = () => {
  const cms = useCms()
  const g = cms?.homeHero?.surgeons

  const eyebrow = g?.eyebrow || '8 Specialists'
  const teamCaption = g?.team?.caption || 'One team, one standard.'
  const leadBody = typeof g?.lead?.body === 'string'
    ? g.lead?.body
    : 'Our plastic and aesthetic doctors work side by side under one ACHSI-accredited roof.'
  const leadCtaLabel = g?.lead?.ctaLabel || 'Meet all the doctors'

  const groupPhotoSrc = mediaUrl(g?.group?.photo, TEAM_PLACEHOLDER) || TEAM_PLACEHOLDER
  const groupPhotoAlt =
    (g?.group?.photo && typeof g.group?.photo === 'object' ? g.group?.photo.alt : undefined) ||
    g?.group?.photoAlt ||
    'The Cosmedic surgical team'

  // Split teamCaption into two lines on comma if present
  const captionParts = teamCaption.split(',')
  const captionLine1 = captionParts[0] ? captionParts[0].trim() + ',' : teamCaption
  const captionLine2 = captionParts[1] ? captionParts[1].trim() : null

  return (
    <section className="surgeons-banner" id="surgeons">
      <Reveal>
        <div className="surgeons-banner-img-wrap">
          {/* Image */}
          <Img
            src={groupPhotoSrc}
            alt={groupPhotoAlt}
            sizes="(max-width: 700px) 100vw, (max-width: 1200px) 92vw, 1400px"
          />
          {/* Tile — text overlay */}
          <div className="surgeons-banner-tile">
            {/* Eyebrow */}
            <Mono className="surgeons-banner-eyebrow">{eyebrow}</Mono>
            {/* Heading */}
            <h2 className="surgeons-banner-heading">
              {captionLine2 ? (
                <>
                  {captionLine1}
                  <br />
                  <em>{captionLine2}</em>
                </>
              ) : (
                teamCaption
              )}
            </h2>
            {/* Body text */}
            <p className="surgeons-banner-body">{leadBody}</p>
            {/* CTA */}
            <div>
              <Btn kind="accent" as="a" href="/experts">
                {leadCtaLabel}
              </Btn>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
