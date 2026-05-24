import React from 'react'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { Reveal } from '@/components/primitives/Reveal'
import { useCms } from '@/lib/cms-context'
import { mediaUrl } from '@/lib/cms'
import type { Procedure, Surgeon, BeforeAfterCase } from '@/lib/cms'

type Props = { subCategorySlug: string }

/**
 * Renders the CMS Procedure-record fields that don't otherwise surface in
 * the SubCategoryDetail UI: surgeonsCredentialed, excluded, recoveryTimeline,
 * relatedBA, relatedProcedures. Filters cms.procedures by parentSubCategory
 * == this sub-category slug.
 *
 * Compact card layout — one card per procedure, with each sub-section only
 * rendered when the underlying CMS field has data. Hidden entirely when no
 * procedures match.
 */
export const ProcedureFactsPanel: React.FC<Props> = ({ subCategorySlug }) => {
  const cms = useCms()
  if (!cms || !cms.loaded) return null

  // Match procedures whose parentSubCategory slug equals ours.
  const matches = cms.procedures.filter((p) => {
    const psc = p.parentSubCategory
    if (!psc || typeof psc === 'number') return false
    return psc.slug === subCategorySlug
  })
  if (matches.length === 0) return null

  return (
    <section id="procedure-detail" style={{ marginTop: 80 }}>
      <Reveal>
        <Eyebrow>Procedure facts · CMS-managed</Eyebrow>
        <h2 style={{ marginTop: 8 }}>What's covered, who performs it.</h2>
      </Reveal>
      <div style={{ display: 'grid', gap: 32, marginTop: 32 }}>
        {matches.map((p) => (
          <ProcedureCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  )
}

const ProcedureCard: React.FC<{ p: Procedure }> = ({ p }) => {
  const surgeons = (p.surgeonsCredentialed || []).filter((s) => typeof s !== 'number') as Surgeon[]
  const excluded = (p.excluded || []).filter((x) => typeof x !== 'number') as Array<{ id: number; label?: string }>
  const recovery = (p.recoveryTimeline || []).filter((x) => typeof x !== 'number') as Array<{ id: number; title?: string; body?: string }>
  const relatedBA = (p.relatedBA || []).filter((x) => typeof x !== 'number') as BeforeAfterCase[]
  const relatedProc = (p.relatedProcedures || []).filter(
    (x) => typeof x !== 'number',
  ) as Array<{ id: number; slug?: string; name?: string }>

  const hasAnyDetail =
    surgeons.length > 0 ||
    excluded.length > 0 ||
    recovery.length > 0 ||
    relatedBA.length > 0 ||
    relatedProc.length > 0

  return (
    <div style={{ borderTop: '1px solid var(--ink-20)', paddingTop: 28 }}>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 24, margin: '0 0 16px' }}>
        {p.name}
      </h3>
      {!hasAnyDetail ? (
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--ink-60)', fontSize: 14 }}>
          (No additional CMS facts populated yet — editors can add surgeons, exclusions, recovery,
          and cross-links on the Procedure record.)
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {surgeons.length > 0 ? (
            <div>
              <Mono style={{ color: 'var(--accent-deep)' }}>Performed by</Mono>
              <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0' }}>
                {surgeons.map((s) => {
                  const portraitUrl = mediaUrl(s.portrait, '') || ''
                  return (
                    <li key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
                      {portraitUrl ? (
                        <img src={portraitUrl} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                      ) : null}
                      <a href={`/surgeons/${s.slug}`} style={{ color: 'var(--ink-100)', textDecoration: 'none', fontFamily: 'var(--font-serif)', fontSize: 14 }}>
                        {s.title || 'dr.'} {s.commonName || s.name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}

          {excluded.length > 0 ? (
            <div>
              <Mono style={{ color: 'var(--accent-deep)' }}>Not included</Mono>
              <ul style={{ paddingLeft: 18, margin: '8px 0 0', fontFamily: 'var(--font-serif)', fontSize: 14, color: 'var(--ink-80)' }}>
                {excluded.map((x) => (
                  <li key={x.id} style={{ marginBottom: 4 }}>
                    {x.label || `(item #${x.id})`}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {recovery.length > 0 ? (
            <div>
              <Mono style={{ color: 'var(--accent-deep)' }}>Recovery timeline</Mono>
              <ol style={{ paddingLeft: 18, margin: '8px 0 0', fontFamily: 'var(--font-serif)', fontSize: 14, color: 'var(--ink-80)' }}>
                {recovery.map((r) => (
                  <li key={r.id} style={{ marginBottom: 6 }}>
                    <strong>{r.title || `Step ${r.id}`}</strong>
                    {r.body ? <span style={{ color: 'var(--ink-60)' }}> — {r.body}</span> : null}
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          {relatedBA.length > 0 ? (
            <div>
              <Mono style={{ color: 'var(--accent-deep)' }}>Related results</Mono>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6, marginTop: 8 }}>
                {relatedBA.slice(0, 4).map((ba) => {
                  const url = mediaUrl(ba.composite, '') || ''
                  return url ? (
                    <a key={ba.id} href="/gallery" style={{ display: 'block', aspectRatio: '1', overflow: 'hidden' }}>
                      <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </a>
                  ) : null
                })}
              </div>
            </div>
          ) : null}

          {relatedProc.length > 0 ? (
            <div>
              <Mono style={{ color: 'var(--accent-deep)' }}>Related procedures</Mono>
              <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0' }}>
                {relatedProc.map((rp) => (
                  <li key={rp.id} style={{ padding: '4px 0', fontFamily: 'var(--font-serif)', fontSize: 14 }}>
                    {/* No /procedure-X route yet — surface as a styled name so the
                        relation is visible to readers + editors. */}
                    → {rp.name || `(procedure #${rp.id})`}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
