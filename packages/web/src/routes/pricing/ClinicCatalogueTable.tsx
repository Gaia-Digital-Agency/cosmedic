import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { useCms } from '@/lib/cms-context'
import type { Procedure } from '@/lib/cms'

/**
 * Phase C9c — the clinic catalogue table now reads from a single source:
 * the Procedures collection, filtered by `catalogueGroup`. The renderer
 * preserves the previous 4-section layout (Surgical / Machine / Injection /
 * BTL) but every row is now a Procedure, so editors edit pricing in ONE
 * place.
 *
 * Machine rows are emitted from C9b as one Procedure per audience tier
 * (standard / kitas_ktp / package). This renderer collapses them back to
 * one row per machine + area, showing the standard IDR price and listing
 * the other tiers in notes / badge — matching the prior visual shape.
 */
type CatalogueGroup = NonNullable<Procedure['catalogueGroup']>

const fmtIdr = (n: number | undefined | null): string => {
  if (n == null) return '—'
  return 'Rp ' + n.toLocaleString('de-DE')
}

const fmtAud = (n: number | undefined | null): string => {
  if (n == null) return ''
  return 'AUD ' + n.toLocaleString('en-AU')
}

const SHEET_LABEL: Record<CatalogueGroup, { title: string; subtitle: string }> = {
  surgical: { title: 'Surgical Procedures', subtitle: '2025 & 2026 pricing · IDR + AUD' },
  machine: { title: 'Machine Treatments', subtitle: 'Erbium · AFT · Q-switched · Pixel' },
  injection: { title: 'Injectable Catalogue', subtitle: 'Named brand pricing per ml / unit' },
  btl: { title: 'BTL Hair Removal', subtitle: 'Per area · per session' },
}

const HAIR_ZONE_LABEL: Record<NonNullable<Procedure['bodyZone']>, string> = {
  face: 'Face',
  'upper-body': 'Upper Body',
  'lower-body': 'Lower Body',
  package: 'Packages',
  other: 'Other BTL',
}

function labelInjectableCategory(c: string | undefined): string {
  switch (c) {
    case 'botulinum-toxin': return 'Botulinum Toxin'
    case 'filler': return 'Dermal Fillers'
    case 'skin-booster': return 'Skin Boosters'
    case 'collagen-stimulator': return 'Collagen Stimulators'
    case 'bio-remodeling': return 'Bio-Remodeling'
    case 'thread-lift': return 'Thread Lift'
    case 'mesotherapy': return 'Mesotherapy'
    case 'hgh': return 'HGH'
    default: return c || 'Other'
  }
}

function groupBy<T, K extends string>(items: T[], key: (t: T) => K): Record<K, T[]> {
  const out: Record<string, T[]> = {}
  for (const item of items) {
    const k = key(item) || 'Other'
    if (!out[k]) out[k] = []
    out[k].push(item)
  }
  return out as Record<K, T[]>
}

const TableRow: React.FC<{
  name: string
  notes?: string
  priceIdr?: number
  priceAud?: number
  priceRange?: { low: number; high: number }
  badge?: string
  featured?: boolean
  manufacturer?: string
  fdaApproved?: boolean
}> = ({ name, notes, priceIdr, priceAud, priceRange, badge, featured, manufacturer, fdaApproved }) => (
  <div
    className="pricing-row"
    style={{
      background: featured ? 'var(--accent-tint)' : undefined,
      paddingLeft: featured ? 12 : undefined,
      paddingRight: featured ? 12 : undefined,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
      <h4
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 400,
          fontSize: 19,
          margin: 0,
          letterSpacing: '-0.005em',
        }}
      >
        {name}
      </h4>
      {badge ? (
        <Mono style={{ fontSize: 10, color: 'var(--accent-deep)' }}>{badge}</Mono>
      ) : null}
      {fdaApproved ? (
        <Mono
          style={{
            fontSize: 9,
            color: 'var(--accent-deep)',
            border: '1px solid var(--accent)',
            padding: '1px 6px',
            borderRadius: 2,
          }}
        >
          FDA
        </Mono>
      ) : null}
      {manufacturer ? (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--ink-60)',
            letterSpacing: '0.08em',
          }}
        >
          {manufacturer}
        </span>
      ) : null}
    </div>
    <p
      style={{
        margin: 0,
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: 14,
        color: 'var(--ink-60)',
        lineHeight: 1.5,
      }}
    >
      {notes ?? '—'}
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
      {priceRange ? (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.18em',
            color: 'var(--accent-deep)',
            whiteSpace: 'nowrap',
          }}
        >
          {fmtIdr(priceRange.low)} – {fmtIdr(priceRange.high)}
        </span>
      ) : priceIdr != null ? (
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
            {fmtIdr(priceIdr)}
          </span>
          {priceAud != null ? (
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 13,
                color: 'var(--ink-60)',
              }}
            >
              ≈ {fmtAud(priceAud)}
            </span>
          ) : null}
        </>
      ) : (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.18em',
            color: 'var(--ink-60)',
          }}
        >
          On request
        </span>
      )}
    </div>
  </div>
)

const CategoryGroup: React.FC<{ heading: string; children: React.ReactNode }> = ({
  heading,
  children,
}) => (
  <div style={{ marginBottom: 32 }}>
    <Reveal delay={40}>
      <div style={{ padding: '20px 0 10px', borderBottom: '1px solid var(--ink-20)' }}>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 26,
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          {heading}
        </h3>
      </div>
    </Reveal>
    <div>{children}</div>
  </div>
)

const SheetSection: React.FC<{ group: CatalogueGroup; children: React.ReactNode }> = ({
  group,
  children,
}) => (
  <div style={{ marginBottom: 96 }}>
    <Reveal>
      <div
        style={{
          paddingBottom: 24,
          borderBottom: '1px solid var(--ink-20)',
          marginBottom: 28,
        }}
      >
        <Eyebrow>{SHEET_LABEL[group].subtitle}</Eyebrow>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 300,
            fontSize: 48,
            margin: '12px 0 0',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          {SHEET_LABEL[group].title}
        </h2>
      </div>
    </Reveal>
    {children}
  </div>
)

export const ClinicCatalogueTable: React.FC = () => {
  const cms = useCms()
  if (!cms || !cms.loaded) return null

  const procs = [...cms.procedures].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

  // ── Surgical: group by mainCategory (xlsx legacy) or parentSubCategory name
  const surgical = procs.filter((p) => p.catalogueGroup === 'surgical')
  const surgicalByCategory = groupBy(surgical, (p) => {
    if (p.mainCategory) return p.mainCategory
    const ps = p.parentSubCategory
    if (ps && typeof ps !== 'number' && ps.title) return ps.title
    return 'Other'
  })

  // ── Machine: collapse audience-tier rows back to one row per machine+area.
  // Key by mainCategory + subCategory + name. Each group picks the standard
  // tier as the displayed row; non-standard tiers populate notes / badge.
  const machineRows = procs.filter((p) => p.catalogueGroup === 'machine')
  const machineByKey = new Map<string, Procedure[]>()
  for (const m of machineRows) {
    const k = `${m.mainCategory || ''}::${m.subCategory || ''}::${m.name}`
    const arr = machineByKey.get(k) || []
    arr.push(m)
    machineByKey.set(k, arr)
  }
  type CollapsedMachine = {
    mainCategory: string
    subCategory: string
    name: string
    standardIdr?: number
    kitasKtpIdr?: number
    packageIdr?: number
    sortOrder?: number
  }
  const collapsedMachine: CollapsedMachine[] = []
  for (const arr of machineByKey.values()) {
    const first = arr[0]
    const out: CollapsedMachine = {
      mainCategory: first.mainCategory || '',
      subCategory: first.subCategory || '',
      name: first.name,
      sortOrder: first.sortOrder,
    }
    for (const r of arr) {
      const price = r.pricing?.priceIdr2026 ?? r.pricing?.priceIdr2025
      if (r.audienceTier === 'standard') out.standardIdr = price ?? out.standardIdr
      else if (r.audienceTier === 'kitas_ktp') out.kitasKtpIdr = price ?? out.kitasKtpIdr
      else if (r.audienceTier === 'package') out.packageIdr = price ?? out.packageIdr
      else if (out.standardIdr == null) out.standardIdr = price ?? undefined
    }
    collapsedMachine.push(out)
  }
  const machineByMachine = groupBy(collapsedMachine, (m) => m.mainCategory || 'Other')

  // ── Injection
  const injection = procs.filter((p) => p.catalogueGroup === 'injection')
  const injectionByCategory = groupBy(injection, (p) => labelInjectableCategory(p.mainCategory))

  // ── BTL
  const btl = procs.filter((p) => p.catalogueGroup === 'btl')
  const btlByZone = groupBy(btl, (p) =>
    p.bodyZone ? HAIR_ZONE_LABEL[p.bodyZone] : 'Other BTL',
  )

  const totalCatalogueRows = surgical.length + collapsedMachine.length + injection.length + btl.length

  return (
    <section className="page-section" style={{ paddingTop: 0, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div
            style={{
              padding: '36px 0',
              borderTop: '1px solid var(--ink-20)',
              borderBottom: '1px solid var(--ink-20)',
              margin: '32px 0 64px',
              textAlign: 'center',
            }}
          >
            <Eyebrow>Clinic catalogue · CMS-managed</Eyebrow>
            <h2 className="section-title" style={{ marginTop: 16, marginBottom: 12 }}>
              The full <span className="italic">clinic catalogue.</span>
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 16,
                color: 'var(--ink-60)',
                margin: 0,
                maxWidth: 720,
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: 1.55,
              }}
            >
              Every line item below is edited in Cosmedic CMS by the clinic team and sourced from
              our 2025/2026 price list. Surgical, machine, injection, and BTL hair-removal services
              — {totalCatalogueRows}+ items in total.
            </p>
          </div>
        </Reveal>

        {/* Surgical */}
        <SheetSection group="surgical">
          {Object.entries(surgicalByCategory).map(([cat, rows]) => (
            <CategoryGroup key={cat} heading={cat}>
              {rows.map((p) => {
                const priceIdr = p.pricing?.priceIdr2026 ?? p.pricing?.priceIdr2025
                const priceAud = p.pricing?.priceAud2026 ?? p.pricing?.priceAud2025
                const range =
                  p.pricing?.priceIdrRangeLow && p.pricing?.priceIdrRangeHigh
                    ? { low: p.pricing.priceIdrRangeLow, high: p.pricing.priceIdrRangeHigh }
                    : undefined
                return (
                  <TableRow
                    key={p.id}
                    name={p.name}
                    notes={p.pricing?.priceNotes || p.unit}
                    priceIdr={priceIdr}
                    priceAud={priceAud}
                    priceRange={range}
                    badge={
                      p.featuredRank
                        ? `Top ${p.featuredRank}`
                        : p.includesImplant
                        ? 'Includes implant'
                        : undefined
                    }
                    featured={Boolean(p.featuredRank)}
                  />
                )
              })}
            </CategoryGroup>
          ))}
        </SheetSection>

        {/* Machine */}
        <SheetSection group="machine">
          {Object.entries(machineByMachine).map(([machine, rows]) => (
            <CategoryGroup key={machine} heading={machine}>
              {(rows as CollapsedMachine[]).map((m, i) => (
                <TableRow
                  key={`${m.mainCategory}-${m.subCategory}-${i}`}
                  name={m.subCategory || m.name}
                  notes={m.kitasKtpIdr ? `Kitas + KTP: ${fmtIdr(m.kitasKtpIdr)}` : undefined}
                  priceIdr={m.standardIdr}
                  badge={m.packageIdr ? `Package: ${fmtIdr(m.packageIdr)}` : undefined}
                />
              ))}
            </CategoryGroup>
          ))}
        </SheetSection>

        {/* Injectables */}
        <SheetSection group="injection">
          {Object.entries(injectionByCategory).map(([cat, prods]) => (
            <CategoryGroup key={cat} heading={cat}>
              {(prods as Procedure[]).map((p) => (
                <TableRow
                  key={p.id}
                  name={p.name}
                  notes={[p.unit, p.productLine, p.pricing?.priceNotes].filter(Boolean).join(' · ')}
                  priceIdr={p.pricing?.priceIdr2026 ?? p.pricing?.priceIdr2025}
                  badge={p.brand}
                  manufacturer={p.manufacturer}
                  fdaApproved={p.fdaApproved}
                />
              ))}
            </CategoryGroup>
          ))}
        </SheetSection>

        {/* BTL */}
        <SheetSection group="btl">
          {Object.entries(btlByZone).map(([zone, rows]) => (
            <CategoryGroup key={zone} heading={zone}>
              {(rows as Procedure[]).map((p) => (
                <TableRow
                  key={p.id}
                  name={p.name}
                  notes={p.pricing?.priceNotes}
                  priceIdr={p.pricing?.priceIdr2026 ?? p.pricing?.priceIdr2025}
                />
              ))}
            </CategoryGroup>
          ))}
        </SheetSection>

        {cms.consultationPolicy.feeIdr ? (
          <Reveal>
            <div
              style={{
                padding: '28px 32px',
                background: 'var(--cream)',
                borderTop: '2px solid var(--accent)',
                borderBottom: '2px solid var(--accent)',
                marginTop: 40,
              }}
            >
              <Eyebrow>Consultation policy</Eyebrow>
              <p
                style={{
                  margin: '12px 0 0',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: 'var(--ink-100)',
                }}
              >
                Consultation fee: <strong>{fmtIdr(cms.consultationPolicy.feeIdr)}</strong>
                {cms.consultationPolicy.feeAud
                  ? ` (≈ ${fmtAud(cms.consultationPolicy.feeAud)})`
                  : ''}
                . {cms.consultationPolicy.waiverConditionText}
              </p>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
