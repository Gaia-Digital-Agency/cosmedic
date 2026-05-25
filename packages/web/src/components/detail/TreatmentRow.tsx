import React, { useState } from 'react'
import { Mono } from '@/components/primitives/Mono'
import { priceParts } from '@/lib/pricing'
import type { SubCategoryEntry } from '@/content/subcategory-data'

type Treatment = SubCategoryEntry['treatments'][number]

type Props = {
  t: Treatment
  subTitle: string
}

function formatPrice(val: Treatment['priceFromIdr']): {
  idr: string | null
  aud: string | null
  label: string | null
} {
  if (val == null) {
    return { idr: null, aud: null, label: 'On request' }
  }
  if (val === 'included' || val === 'complimentary') {
    return { idr: null, aud: null, label: val.charAt(0).toUpperCase() + val.slice(1) }
  }
  const idrNum = typeof val === 'number' ? val : parseInt(val, 10)
  const parts = priceParts(idrNum)
  if (!parts) return { idr: null, aud: null, label: 'On request' }
  return { idr: parts.idr, aud: parts.aud, label: null }
}

export const TreatmentRow: React.FC<Props> = ({ t, subTitle }) => {
  const [open, setOpen] = useState(false)
  const price = formatPrice(t.priceFromIdr)
  const procParam = encodeURIComponent(`${subTitle} — ${t.name}`)

  return (
    <div
      style={{
        borderBottom: '1px solid var(--ink-20)',
        background: open ? 'rgba(166,124,82,0.04)' : 'transparent',
        transition: 'background .25s ease',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="treatment-row-button"
      >
        <h4
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 24,
            margin: 0,
            letterSpacing: '-0.01em',
            color: 'var(--ink-100)',
          }}
        >
          {t.name}
        </h4>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 15,
            color: 'var(--ink-80)',
            lineHeight: 1.55,
          }}
        >
          {t.short}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
          {price.label ? (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.18em',
                color: 'var(--accent-deep)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {price.label}
            </span>
          ) : (
            <>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  color: 'var(--accent-deep)',
                  whiteSpace: 'nowrap',
                }}
              >
                {price.idr}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 13,
                  color: 'var(--ink-60)',
                }}
              >
                ≈ {price.aud}
              </span>
            </>
          )}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 26,
            color: 'var(--accent-deep)',
            textAlign: 'right',
            transition: 'transform .3s ease',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? 1200 : 0,
          overflow: 'hidden',
          transition: 'max-height .45s cubic-bezier(.2,.7,.2,1)',
        }}
      >
        <div style={{ padding: '4px 28px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <p
            style={{
              margin: 0,
              paddingRight: 24,
              fontSize: 16,
              color: 'var(--ink-80)',
              lineHeight: 1.65,
            }}
          >
            {t.detail.description}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
              paddingTop: 16,
              borderTop: '1px solid var(--ink-20)',
            }}
          >
            <div>
              <Mono style={{ color: 'var(--accent-deep)' }}>Duration</Mono>
              <p
                style={{
                  margin: '6px 0 0',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 16,
                  lineHeight: 1.5,
                }}
              >
                {t.detail.duration}
              </p>
            </div>
            <div>
              <Mono style={{ color: 'var(--accent-deep)' }}>Recovery</Mono>
              <p
                style={{
                  margin: '6px 0 0',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 16,
                  lineHeight: 1.5,
                }}
              >
                {t.detail.recovery}
              </p>
            </div>
          </div>

          <div>
            <Mono style={{ color: 'var(--accent-deep)' }}>What's included</Mono>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '12px 0 0',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px 24px',
              }}
            >
              {t.detail.included.map((it, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 15,
                    color: 'var(--ink-80)',
                    paddingLeft: 18,
                    position: 'relative',
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 9,
                      width: 10,
                      height: 1,
                      background: 'var(--accent)',
                    }}
                  />
                  {it}
                </li>
              ))}
            </ul>
          </div>

          <div className="treatment-row-ctas">
            <a
              href={`/contact?intent=estimate&procedure=${procParam}`}
              className="btn btn-accent"
            >
              <span>Plan your journey</span>
              <span className="btn-arrow">→</span>
            </a>
            <a
              href={`/video-consult?procedure=${procParam}`}
              className="btn btn-ghost"
            >
              <span>Book a video consult</span>
              <span className="btn-arrow">→</span>
            </a>
            <a
              href={`https://wa.me/6281339001911?text=${encodeURIComponent(
                "Hello — I'd like to ask about " + t.name + '.',
              )}`}
              target="_blank"
              rel="noopener"
              className="btn btn-ghost"
            >
              <span>WhatsApp concierge</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
