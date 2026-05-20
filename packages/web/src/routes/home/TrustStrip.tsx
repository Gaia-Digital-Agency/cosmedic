import React from 'react'
import { useCms } from '@/lib/cms-context'

const FALLBACK_STATS = [
  { number: '28', label: 'Years in practice' },
  { number: '8', label: 'ISAPS / FICS surgeons' },
  { number: '3,400+', label: 'Procedures performed' },
  { number: '#1', label: 'Medical Tourism Hospital 2026' },
]

export const TrustStrip: React.FC = () => {
  const cms = useCms()
  const stats = cms?.brandStats?.stats?.length ? cms.brandStats.stats : FALLBACK_STATS
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
