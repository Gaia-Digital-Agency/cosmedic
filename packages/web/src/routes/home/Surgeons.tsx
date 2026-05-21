import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { SURGEON_LIST, SURGEON_IMG } from '@/content/seed'

export const Surgeons: React.FC = () => {
  const lead = SURGEON_LIST[0]
  const associates = SURGEON_LIST.slice(1, 7)
  const leadFirstNames = lead.name.split(' ').slice(0, -1).join(' ')
  const leadLastName = lead.name.split(' ').slice(-1)[0]

  return (
    <section className="surgeons" id="surgeons">
      <Reveal>
        <Eyebrow>Meet the Surgeons</Eyebrow>
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
          <Mono>Lead Surgeon</Mono>
          <h2 className="surgeon-name">
            <span>
              {lead.title} {leadFirstNames}
            </span>
            <br />
            <span className="italic">{leadLastName}</span>
          </h2>
          <p className="surgeon-credentials">{lead.cred}</p>
          <p className="surgeon-body">
            ISAPS-member plastic surgeon with seven years of practice in Bali, fellowship-trained in
            maxillofacial surgery in Japan, specializing in{' '}
            <em>facial aesthetics, body contouring and breast surgery</em>. Cited by patients for a
            conservative, natural-result approach.
          </p>
          <div className="surgeon-stats">
            <div>
              <Mono>Trained</Mono>
              <span>Indonesia · Japan</span>
            </div>
            <div>
              <Mono>Specialty</Mono>
              <span>Facial Aesthetics</span>
            </div>
            <div>
              <Mono>Society</Mono>
              <span>ISAPS Member</span>
            </div>
          </div>
          <Btn kind="ghost" as="a" href={`/surgeon-${lead.slug}`}>
            Read the full profile
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
        <Mono>Associate Surgeons & Aestheticians</Mono>
        <Mono>{associates.length} practitioners</Mono>
      </div>
      <div className="surgeons-grid" style={{ marginTop: 32 }}>
        {associates.map((s, i) => (
          <Reveal key={s.slug} delay={i * 60} y={20}>
            <a href={`/surgeon-${s.slug}`} style={{ color: 'inherit' }}>
              <div className="surgeon-card" data-surgeon={s.slug}>
                <div className="surgeon-card-img">
                  <Img
                    media={s.portrait}
                    src={SURGEON_IMG(s.slug)}
                    fallbackLabel={`DR. ${s.common.toUpperCase()}`}
                    fallbackHue={s.hue}
                    alt={`Portrait of ${s.title} ${s.common}`}
                    sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 280px"
                  />
                </div>
                <div className="surgeon-card-meta">
                  <h4>
                    {s.title} {s.common}
                  </h4>
                  <Mono>{s.spec.split(' — ')[0].split(',')[0]}</Mono>
                  <span className="surgeon-train">
                    {s.years} yrs · {s.train.split(' · ')[0]}
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
