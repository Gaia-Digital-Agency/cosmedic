import React from 'react'
import { priceParts } from '@/lib/pricing'
import { useLocale } from '@/i18n'

type Props = {
  idr: number | null | undefined
  align?: 'left' | 'right'
  invert?: boolean
  suffix?: string
}

export const PriceTag: React.FC<Props> = ({ idr, align = 'right', invert = false, suffix }) => {
  const p = priceParts(idr, { suffix })
  const locale = useLocale()
  if (!p) return null
  const showAud = locale === 'en' && Boolean(p.aud)
  if (!showAud) {
    return (
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          color: invert ? 'rgba(255,255,255,0.7)' : 'var(--accent-deep)',
          textAlign: align,
        }}
      >
        {p.idr}
      </span>
    )
  }
  return (
    <span
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'right' ? 'flex-end' : 'flex-start',
        gap: 4,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.18em',
          color: invert ? 'white' : 'var(--accent-deep)',
          whiteSpace: 'nowrap',
        }}
      >
        {p.idr}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 13,
          color: invert ? 'rgba(255,255,255,0.6)' : 'var(--ink-60)',
          whiteSpace: 'nowrap',
        }}
      >
        ≈ {p.aud}
      </span>
    </span>
  )
}
