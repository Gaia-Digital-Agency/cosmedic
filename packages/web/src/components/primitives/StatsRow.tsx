import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'

export type StatItem = { number: string; label: string }

export type StatsRowVariant = 'trust-strip' | 'page-row'

type StatsRowProps = {
  stats: StatItem[]
  variant?: StatsRowVariant
}

export const StatsRow: React.FC<StatsRowProps> = ({ stats, variant = 'trust-strip' }) => {
  if (variant === 'trust-strip') {
    return (
      <section className="trust-strip trust-strip-stats">
        {stats.map((s, i) => (
          <div key={i} className="ts-stat">
            <span className="ts-num">{s.number}</span>
            <span className="mono">{s.label}</span>
          </div>
        ))}
      </section>
    )
  }
  return (
    <div className="stats-row">
      {stats.map((s, i) => (
        <Reveal key={i} delay={i * 80}>
          <div className="stat-block">
            <span className="stat-num">{s.number}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
