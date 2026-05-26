import React, { useState } from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { useCms } from '@/lib/cms-context'
import { formatIDR, formatAUD, DEFAULT_AUD_TO_IDR, DEFAULT_ROUND_IDR_TO } from '@/lib/pricing'
import type { ClinicCatalogueItem } from '@/lib/cms'

/**
 * 25.13c — the clinic catalogue table reads from the dedicated
 * `ClinicCatalogueItems` collection (split out from `Procedures` so the
 * admin Bucket structure mirrors the rendered hierarchy). Layout unchanged:
 * 4 sheets (Surgical / Machine / Injection / BTL), grouped by mainCategory
 * inside each sheet.
 *
 * Machine rows are emitted as one item per audience tier (standard / kitas_ktp
 * / package). This renderer collapses them back to one row per machine + area,
 * showing the standard IDR price and listing the other tiers in notes / badge.
 */
type CatalogueGroup = ClinicCatalogueItem['catalogueGroup']

// 25.17: removed local fmtIdr/fmtAud. Use lib/pricing helpers which apply
// Settings.roundIdrTo for IDR + derive AUD from Settings.audToIdrRate.
// Helpers below stay synchronous + format-only — rate is read by caller and
// passed in so this stays a pure component.

const fmtIdr = (n: number | undefined | null, roundTo: number): string => {
  if (n == null) return '—'
  return formatIDR(n, roundTo)
}

const fmtAud = (idr: number | undefined | null, rate: number): string => {
  if (idr == null) return ''
  return formatAUD(idr / rate)
}

const DEFAULT_SHEET_LABEL: Record<CatalogueGroup, { title: string; subtitle: string }> = {
  surgical: { title: 'Surgical Procedures', subtitle: '2025 & 2026 pricing · IDR + AUD' },
  machine: { title: 'Machine Treatments', subtitle: 'Erbium · AFT · Q-switched · Pixel' },
  injection: { title: 'Injectable Catalogue', subtitle: 'Named brand pricing per ml / unit' },
  btl: { title: 'BTL Hair Removal', subtitle: 'Per area · per session' },
}

const DEFAULT_HAIR_ZONE_LABEL: Record<NonNullable<ClinicCatalogueItem['bodyZone']>, string> = {
  face: 'Face',
  'upper-body': 'Upper Body',
  'lower-body': 'Lower Body',
  package: 'Packages',
  other: 'Other BTL',
}

const DEFAULT_INJECTABLE_LABEL: Record<string, string> = {
  'botulinum-toxin': 'Botulinum Toxin',
  filler: 'Dermal Fillers',
  'skin-booster': 'Skin Boosters',
  'collagen-stimulator': 'Collagen Stimulators',
  'bio-remodeling': 'Bio-Remodeling',
  'thread-lift': 'Thread Lift',
  mesotherapy: 'Mesotherapy',
  hgh: 'HGH',
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
  priceRange?: { low: number; high: number }
  badge?: string
  featured?: boolean
  manufacturer?: string
  fdaApproved?: boolean
  rate: number
  roundTo: number
}> = ({ name, notes, priceIdr, priceRange, badge, featured, manufacturer, fdaApproved, rate, roundTo }) => (
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
          {fmtIdr(priceRange.low, roundTo)} – {fmtIdr(priceRange.high, roundTo)}
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
            {fmtIdr(priceIdr, roundTo)}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 13,
              color: 'var(--ink-60)',
            }}
          >
            ≈ {fmtAud(priceIdr, rate)}
          </span>
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

type SheetLabel = { title: string; subtitle: string }
type SheetLabelMap = Record<CatalogueGroup, SheetLabel>
type HairZoneLabelMap = Record<NonNullable<ClinicCatalogueItem['bodyZone']>, string>

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

const SheetSection: React.FC<{
  group: CatalogueGroup
  labels: SheetLabelMap
  children: React.ReactNode
}> = ({ group, labels, children }) => (
  <div style={{ marginBottom: 96 }}>
    <Reveal>
      <div
        style={{
          paddingBottom: 24,
          borderBottom: '1px solid var(--ink-20)',
          marginBottom: 28,
        }}
      >
        <Eyebrow>{labels[group].subtitle}</Eyebrow>
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
          {labels[group].title}
        </h2>
      </div>
    </Reveal>
    {children}
  </div>
)

const hasPrice = (p: ClinicCatalogueItem): boolean =>
  p.pricing?.priceIdr2026 != null ||
  p.pricing?.priceIdr2025 != null ||
  (p.pricing?.priceIdrRangeLow != null && p.pricing?.priceIdrRangeHigh != null)

export const ClinicCatalogueTable: React.FC = () => {
  const cms = useCms()
  const [hideUnpriced, setHideUnpriced] = useState(true)
  if (!cms || !cms.loaded) return null

  const rate = cms.settings?.audToIdrRate || DEFAULT_AUD_TO_IDR
  const roundTo = cms.settings?.roundIdrTo || DEFAULT_ROUND_IDR_TO

  const view = cms.pricingCatalogueView ?? {}
  const sheetLabels: SheetLabelMap = {
    surgical: {
      title: view.sheetLabels?.surgicalTitle || DEFAULT_SHEET_LABEL.surgical.title,
      subtitle: view.sheetLabels?.surgicalSubtitle || DEFAULT_SHEET_LABEL.surgical.subtitle,
    },
    machine: {
      title: view.sheetLabels?.machineTitle || DEFAULT_SHEET_LABEL.machine.title,
      subtitle: view.sheetLabels?.machineSubtitle || DEFAULT_SHEET_LABEL.machine.subtitle,
    },
    injection: {
      title: view.sheetLabels?.injectionTitle || DEFAULT_SHEET_LABEL.injection.title,
      subtitle: view.sheetLabels?.injectionSubtitle || DEFAULT_SHEET_LABEL.injection.subtitle,
    },
    btl: {
      title: view.sheetLabels?.btlTitle || DEFAULT_SHEET_LABEL.btl.title,
      subtitle: view.sheetLabels?.btlSubtitle || DEFAULT_SHEET_LABEL.btl.subtitle,
    },
  }
  const hairZoneLabels: HairZoneLabelMap = {
    face: view.hairZoneLabels?.face || DEFAULT_HAIR_ZONE_LABEL.face,
    'upper-body': view.hairZoneLabels?.upperBody || DEFAULT_HAIR_ZONE_LABEL['upper-body'],
    'lower-body': view.hairZoneLabels?.lowerBody || DEFAULT_HAIR_ZONE_LABEL['lower-body'],
    package: view.hairZoneLabels?.packageZone || DEFAULT_HAIR_ZONE_LABEL.package,
    other: view.hairZoneLabels?.other || DEFAULT_HAIR_ZONE_LABEL.other,
  }
  const injectableOtherLabel = view.injectableCategoryLabels?.other || 'Other'
  const labelInjectableCategory = (c: string | undefined): string => {
    if (!c) return injectableOtherLabel
    const map: Record<string, string | undefined> = {
      'botulinum-toxin': view.injectableCategoryLabels?.botulinumToxin,
      filler: view.injectableCategoryLabels?.filler,
      'skin-booster': view.injectableCategoryLabels?.skinBooster,
      'collagen-stimulator': view.injectableCategoryLabels?.collagenStimulator,
      'bio-remodeling': view.injectableCategoryLabels?.bioRemodeling,
      'thread-lift': view.injectableCategoryLabels?.threadLift,
      mesotherapy: view.injectableCategoryLabels?.mesotherapy,
      hgh: view.injectableCategoryLabels?.hgh,
    }
    return map[c] || DEFAULT_INJECTABLE_LABEL[c] || c
  }

  const procs = [...cms.clinicCatalogueItems].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

  // ── Surgical: group by mainCategory (xlsx legacy) or parentSubCategory name
  const surgical = procs.filter(
    (p) => p.catalogueGroup === 'surgical' && (!hideUnpriced || hasPrice(p)),
  )
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
  const machineByKey = new Map<string, ClinicCatalogueItem[]>()
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
  const collapsedMachineVisible = collapsedMachine.filter(
    (m) => !hideUnpriced || m.standardIdr != null || m.kitasKtpIdr != null || m.packageIdr != null,
  )
  const machineByMachine = groupBy(collapsedMachineVisible, (m) => m.mainCategory || 'Other')

  // ── Injection
  const injection = procs.filter(
    (p) => p.catalogueGroup === 'injection' && (!hideUnpriced || hasPrice(p)),
  )
  const injectionByCategory = groupBy(injection, (p) => labelInjectableCategory(p.mainCategory))

  // ── BTL
  const btl = procs.filter(
    (p) => p.catalogueGroup === 'btl' && (!hideUnpriced || hasPrice(p)),
  )
  const btlByZone = groupBy(btl, (p) =>
    p.bodyZone ? hairZoneLabels[p.bodyZone] : (hairZoneLabels.other || 'Other BTL'),
  )

  const totalCatalogueRows =
    surgical.length + collapsedMachineVisible.length + injection.length + btl.length
  const totalUnpriced = cms.clinicCatalogueItems.filter((p) => !hasPrice(p)).length

  // ── Section chrome (eyebrow / heading / intro)
  const sectionEyebrow = view.sectionEyebrow || 'Clinic catalogue · CMS-managed'
  const headingRoman = view.headingRoman || 'The full'
  const headingItalic = view.headingItalic || 'clinic catalogue.'
  const introTemplate =
    view.introTemplate ||
    'Every line item below is edited in Cosmedic CMS by the clinic team and sourced from our 2025/2026 price list. Surgical, machine, injection, and BTL hair-removal services — {n}+ items in total.'
  const introText = introTemplate.replace('{n}', String(totalCatalogueRows))

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
            <Eyebrow>{sectionEyebrow}</Eyebrow>
            <h2 className="section-title" style={{ marginTop: 16, marginBottom: 12 }}>
              {headingRoman} <span className="italic">{headingItalic}</span>
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
              {introText}
            </p>
            {totalUnpriced > 0 ? (
              <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => setHideUnpriced((v) => !v)}
                  aria-pressed={hideUnpriced}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: hideUnpriced ? 'var(--bg-cream, #F4EFE6)' : 'var(--accent-deep)',
                    background: hideUnpriced ? 'var(--accent-deep)' : 'transparent',
                    border: '1px solid var(--accent-deep)',
                    padding: '10px 20px',
                    borderRadius: 999,
                    cursor: 'pointer',
                    transition: 'background 160ms ease, color 160ms ease',
                  }}
                >
                  {hideUnpriced
                    ? `Show all (${totalUnpriced} on request)`
                    : `Hide ${totalUnpriced} on-request`}
                </button>
              </div>
            ) : null}
          </div>
        </Reveal>

        {/* Surgical */}
        <SheetSection group="surgical" labels={sheetLabels}>
          {Object.entries(surgicalByCategory).map(([cat, rows]) => (
            <CategoryGroup key={cat} heading={cat}>
              {rows.map((p) => {
                const priceIdr = p.pricing?.priceIdr2026 ?? p.pricing?.priceIdr2025
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
                    priceRange={range}
                    badge={
                      p.featuredRank
                        ? `Top ${p.featuredRank}`
                        : p.includesImplant
                        ? 'Includes implant'
                        : undefined
                    }
                    featured={Boolean(p.featuredRank)}
                    rate={rate}
                    roundTo={roundTo}
                  />
                )
              })}
            </CategoryGroup>
          ))}
        </SheetSection>

        {/* Machine */}
        <SheetSection group="machine" labels={sheetLabels}>
          {Object.entries(machineByMachine).map(([machine, rows]) => (
            <CategoryGroup key={machine} heading={machine}>
              {(rows as CollapsedMachine[]).map((m, i) => (
                <TableRow
                  key={`${m.mainCategory}-${m.subCategory}-${i}`}
                  name={m.subCategory || m.name}
                  notes={m.kitasKtpIdr ? `Kitas + KTP: ${fmtIdr(m.kitasKtpIdr, roundTo)}` : undefined}
                  priceIdr={m.standardIdr}
                  badge={m.packageIdr ? `Package: ${fmtIdr(m.packageIdr, roundTo)}` : undefined}
                  rate={rate}
                  roundTo={roundTo}
                />
              ))}
            </CategoryGroup>
          ))}
        </SheetSection>

        {/* Injectables */}
        <SheetSection group="injection" labels={sheetLabels}>
          {Object.entries(injectionByCategory).map(([cat, prods]) => (
            <CategoryGroup key={cat} heading={cat}>
              {(prods as ClinicCatalogueItem[]).map((p) => (
                <TableRow
                  key={p.id}
                  name={p.name}
                  notes={[p.unit, p.productLine, p.pricing?.priceNotes].filter(Boolean).join(' · ')}
                  priceIdr={p.pricing?.priceIdr2026 ?? p.pricing?.priceIdr2025}
                  badge={p.brand}
                  manufacturer={p.manufacturer}
                  fdaApproved={p.fdaApproved}
                  rate={rate}
                  roundTo={roundTo}
                />
              ))}
            </CategoryGroup>
          ))}
        </SheetSection>

        {/* BTL */}
        <SheetSection group="btl" labels={sheetLabels}>
          {Object.entries(btlByZone).map(([zone, rows]) => (
            <CategoryGroup key={zone} heading={zone}>
              {(rows as ClinicCatalogueItem[]).map((p) => (
                <TableRow
                  key={p.id}
                  name={p.name}
                  notes={p.pricing?.priceNotes}
                  priceIdr={p.pricing?.priceIdr2026 ?? p.pricing?.priceIdr2025}
                  rate={rate}
                  roundTo={roundTo}
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
                Consultation fee: <strong>{fmtIdr(cms.consultationPolicy.feeIdr, roundTo)}</strong>
                {' '}(≈ {fmtAud(cms.consultationPolicy.feeIdr, rate)})
                . {cms.consultationPolicy.waiverConditionText}
              </p>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
