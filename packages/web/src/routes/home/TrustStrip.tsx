import React from 'react'

const STATS = [
  { num: '28', lab: 'Years in practice' },
  { num: '8', lab: 'ISAPS / FICS surgeons' },
  { num: '3,400+', lab: 'Procedures performed' },
  { num: '#1', lab: 'Medical Tourism Hospital 2026' },
]

export const TrustStrip: React.FC = () => (
  <section className="trust-strip trust-strip-stats">
    {STATS.map((s, i) => (
      <div key={i} className="ts-stat">
        <span className="ts-num">{s.num}</span>
        <span className="mono">{s.lab}</span>
      </div>
    ))}
  </section>
)
