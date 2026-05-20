import React from 'react'
import { Mono } from './Mono'

type Props = {
  title?: string | string[]
  lede?: string
  primary?: string
  primaryHref?: string
  secondary?: string
  secondaryHref?: string
}

export const CTABandSlim: React.FC<Props> = ({
  title = ['Begin your', 'journey.'],
  lede,
  primary = 'Plan Your Treatment',
  primaryHref = '/contact',
  secondary = 'Speak with a Concierge',
  secondaryHref = '/contact',
}) => {
  const lines = Array.isArray(title) ? title : [title]
  return (
    <section className="cta-band-slim" style={{ backgroundColor: 'rgb(30, 26, 20)' }}>
      <Mono style={{ color: 'rgba(255,255,255,0.6)', position: 'relative' }}>An Invitation</Mono>
      <h2>
        {lines.map((l, i) => (
          <React.Fragment key={i}>
            <span className={i % 2 === 1 ? 'italic' : ''}>{l}</span>
            {i < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>
      <p>
        {lede ||
          'A private consultation, treatment plan, and stay — coordinated as one. A concierge will reply within twenty-four hours.'}
      </p>
      <div className="cta-buttons-row">
        <a href={primaryHref} className="btn btn-accent">
          <span>{primary}</span>
          <span className="btn-arrow">→</span>
        </a>
        <a href={secondaryHref} className="btn btn-ghost-light">
          <span>{secondary}</span>
          <span className="btn-arrow">→</span>
        </a>
      </div>
    </section>
  )
}
