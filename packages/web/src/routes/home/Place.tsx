import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Img } from '@/components/primitives/Img'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Btn } from '@/components/primitives/Btn'
import { IMG } from '@/content/seed'
import { useCms } from '@/lib/cms-context'
import { findPageBySlug } from '@/lib/cms-adapters'

const DEFAULT_ROWS: [string, string][] = [
  ['A.', 'Private recovery villas in Nusa Dua & Ubud'],
  ['B.', 'Daily nursing visits, dietitian on call'],
  ['C.', 'Drivers, security, and concierge — included'],
  ['D.', 'A short walk to the BIMC hospital'],
]

function parseRows(input?: string): [string, string][] {
  if (!input) return DEFAULT_ROWS
  const lines = input
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  if (lines.length === 0) return DEFAULT_ROWS
  return lines.map<[string, string]>((line) => {
    const m = line.match(/^([A-Z][.)]?)\s+(.*)$/)
    if (m) return [m[1].endsWith('.') ? m[1] : `${m[1]}.`, m[2]]
    return ['•', line]
  })
}

export const Place: React.FC = () => {
  const cms = useCms()
  const block = (cms ? findPageBySlug(cms, 'home') : undefined)?.placeBlock
  const eyebrow = block?.eyebrow || 'Recovery in Bali'
  const headingPart1 = block?.headingPart1 || 'Recover'
  const headingAccent = block?.headingAccent || 'in paradise.'
  const body =
    block?.body ||
    'Nusa Dua sits on the southernmost reach of Bali — quiet beaches, soft afternoons, and the kind of warm, careful hospitality that has made the island synonymous with rest. We work with a small portfolio of villas and resorts, hand-selected for privacy and post-operative comfort.'
  const rows = parseRows(block?.rowsText)
  const ctaLabel = block?.ctaLabel || 'View recovery stays'
  const ctaHref = block?.ctaHref || '/recovery-stays'

  return (
    <section className="place">
      <div className="place-grid">
        <Reveal>
          <div className="place-image">
            <Img src={IMG.bali} fallbackLabel="BALI · NUSA DUA" fallbackHue={4} alt="" />
          </div>
        </Reveal>
        <Reveal delay={140}>
          <div className="place-body">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="section-title">
              <span>{headingPart1}</span>
              <br />
              <span className="italic">{headingAccent}</span>
            </h2>
            <p>{body}</p>
            <div className="place-list">
              {rows.map(([k, t], i) => (
                <div key={i} className="place-row">
                  <Mono>{k}</Mono>
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <Btn kind="ghost" as="a" href={ctaHref}>
              {ctaLabel}
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
