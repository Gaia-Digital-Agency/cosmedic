import React from 'react'
import { Img } from '@/components/primitives/Img'
import { Mono } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import type { Surgeon } from '@/content/seed'
import { SURGEON_IMG } from '@/content/seed'

type Props = { surgeon: Surgeon }

export const SurgeonMini: React.FC<Props> = ({ surgeon }) => (
  <div className="surgeon-mini" data-surgeon={surgeon.slug}>
    <div className="surgeon-mini-img">
      <Img
        src={SURGEON_IMG(surgeon.slug)}
        fallbackLabel={`DR. ${surgeon.common.toUpperCase()}`}
        fallbackHue={surgeon.hue}
        alt=""
      />
    </div>
    <div className="surgeon-mini-meta">
      <Mono>{surgeon.lead ? 'Lead Surgeon' : 'Specialist'}</Mono>
      <h4>
        {surgeon.title} {surgeon.name}
      </h4>
      <span className="smm-spec">{surgeon.cred}</span>
    </div>
    <Btn kind="ghost" as="a" href={`/surgeon-${surgeon.slug}`}>
      Read profile
    </Btn>
  </div>
)
