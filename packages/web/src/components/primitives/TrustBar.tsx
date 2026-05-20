import React from 'react'

type Props = {
  tone?: 'paper' | 'dark'
  compact?: boolean
}

const LABELS = [
  'ACHSI Accredited',
  'ISAPS Surgeons',
  'FICS Fellows',
  'ISO 9001:2015',
  '4.9★ Avg. rating',
  '3,400+ Procedures',
]

export const TrustBar: React.FC<Props> = ({ tone = 'paper', compact = false }) => {
  const dark = tone === 'dark'
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: compact ? 14 : 22,
        alignItems: 'center',
        justifyContent: 'center',
        padding: compact ? '14px 20px' : '22px 28px',
        background: dark ? 'rgba(255,255,255,0.04)' : 'var(--paper-warm)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'var(--ink-20)'}`,
        borderLeft: '3px solid var(--accent)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: dark ? 'rgba(255,255,255,0.55)' : 'var(--ink-60)',
          marginRight: 8,
        }}
      >
        Verified by
      </span>
      {LABELS.map((label, i) => (
        <span
          key={i}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: dark ? 'rgba(255,255,255,0.85)' : 'var(--ink-90)',
          }}
        >
          <span style={{ width: 18, height: 1, background: 'var(--accent)' }} />
          {label}
        </span>
      ))}
    </div>
  )
}
