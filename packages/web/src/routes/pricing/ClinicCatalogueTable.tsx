import React from 'react'
import { Reveal } from '@/components/primitives/Reveal'
import { Mono, Eyebrow } from '@/components/primitives/Mono'
import { useCms } from '@/lib/cms-context'
import type { PriceListItem, MachineTreatment, InjectableProduct, HairRemovalArea } from '@/lib/cms'

/**
 * Renders the full clinic price catalogue from CMS — all 149 PriceListItems +
 * 24 MachineTreatments + 34 InjectableProducts + 43 HairRemovalAreas — sourced
 * from docs/pricelist.xlsx during Phase 6 seed. Every cell is editable in
 * Cosmedic CMS by the clinic team; this component re-fetches via /api/revalidate
 * on save.
 *
 * Visual approach matches the editorial pricing block above: hairline-divided
 * rows, serif headings, mono price labels. Subtle visual cue (eyebrow label)
 * differentiates this from the editorial procedures section.
 */

const fmtIdr = (n: number | undefined): string => {
  if (n == null) return '—'
  return 'Rp ' + n.toLocaleString('de-DE')
}

const fmtAud = (n: number | undefined): string => {
  if (n == null) return ''
  return 'AUD ' + n.toLocaleString('en-AU')
}

const SHEET_LABEL: Record<PriceListItem['sheet'], { title: string; subtitle: string }> = {
  'surgical': { title: 'Surgical Procedures', subtitle: '2025 & 2026 pricing · IDR + AUD' },
  'non-surgical': { title: 'Non-Surgical Treatments', subtitle: 'Injectables, lasers, skin' },
  'machine': { title: 'Machine Treatments', subtitle: 'Erbium · AFT · Q-switched · Pixel' },
  'injection': { title: 'Injectable Catalogue', subtitle: 'Named brand pricing per ml / unit' },
  'btl': { title: 'BTL Hair Removal', subtitle: 'Per area · per session' },
}

const HAIR_ZONE_LABEL: Record<HairRemovalArea['bodyZone'], string> = {
  'face': 'Face',
  'upper-body': 'Upper Body',
  'lower-body': 'Lower Body',
  'package': 'Packages',
  'other': 'Other BTL',
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
}> = ({ name, notes, priceIdr, priceAud, priceRange, badge, featured }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1.6fr 1.2fr 220px',
      gap: 24,
      padding: '16px 0',
      borderBottom: '1px solid var(--ink-20)',
      alignItems: 'baseline',
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
        <>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--accent-deep)', whiteSpace: 'nowrap' }}>
            {fmtIdr(priceRange.low)} – {fmtIdr(priceRange.high)}
          </span>
        </>
      ) : priceIdr != null ? (
        <>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--accent-deep)', whiteSpace: 'nowrap' }}>
            {fmtIdr(priceIdr)}
          </span>
          {priceAud != null ? (
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--ink-60)' }}>
              ≈ {fmtAud(priceAud)}
            </span>
          ) : null}
        </>
      ) : (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--ink-60)' }}>On request</span>
      )}
    </div>
  </div>
)

const CategoryGroup: React.FC<{ heading: string; children: React.ReactNode }> = ({ heading, children }) => (
  <div style={{ marginBottom: 32 }}>
    <Reveal delay={40}>
      <div style={{ padding: '20px 0 10px', borderBottom: '1px solid var(--ink-20)' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, fontSize: 26, margin: 0, letterSpacing: '-0.01em' }}>
          {heading}
        </h3>
      </div>
    </Reveal>
    <div>{children}</div>
  </div>
)

const SheetSection: React.FC<{ sheet: PriceListItem['sheet']; children: React.ReactNode }> = ({ sheet, children }) => (
  <div style={{ marginBottom: 96 }}>
    <Reveal>
      <div style={{ paddingBottom: 24, borderBottom: '1px solid var(--ink-20)', marginBottom: 28 }}>
        <Eyebrow>{SHEET_LABEL[sheet].subtitle}</Eyebrow>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 300, fontSize: 48, margin: '12px 0 0', letterSpacing: '-0.02em', lineHeight: 1 }}>
          {SHEET_LABEL[sheet].title}
        </h2>
      </div>
    </Reveal>
    {children}
  </div>
)

export const ClinicCatalogueTable: React.FC = () => {
  const cms = useCms()
  if (!cms || !cms.loaded) {
    return null
  }

  const surgical = cms.priceListItems
    .filter((p) => p.sheet === 'surgical')
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  const surgicalByCategory = groupBy(surgical, (p) => (p.category || 'Other') as string)

  const machineByMachine = groupBy(cms.machineTreatments, (m) => m.machineName)
  const injectionByCategory = groupBy(cms.injectableProducts, (i) => labelInjectableCategory(i.category))
  const btlByZone = groupBy(cms.hairRemovalAreas, (h) => HAIR_ZONE_LABEL[h.bodyZone])

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
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--ink-60)', margin: 0, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.55 }}>
              Every line item below is edited in Cosmedic CMS by the clinic team and sourced from
              our 2025/2026 price list. Surgical, non-surgical, machine, injection, and BTL hair-removal
              services — {cms.priceListItems.length}+ items in total.
            </p>
          </div>
        </Reveal>

        {/* Surgical (already shown above editorially; included for parity + clinic-truth) */}
        <SheetSection sheet="surgical">
          {Object.entries(surgicalByCategory).map(([cat, rows]) => (
            <CategoryGroup key={cat} heading={cat}>
              {rows.map((p) => (
                <TableRow
                  key={p.id}
                  name={p.name}
                  notes={p.notes}
                  priceIdr={p.priceIdr2026 ?? p.priceIdr2025}
                  priceAud={p.priceAud2026 ?? p.priceAud2025}
                  badge={p.featuredRank ? `Top ${p.featuredRank}` : p.includesImplant ? 'Includes implant' : undefined}
                  featured={Boolean(p.featuredRank)}
                />
              ))}
            </CategoryGroup>
          ))}
        </SheetSection>

        {/* Machine Treatments — three-tier pricing flattened here to standard tier */}
        <SheetSection sheet="machine">
          {Object.entries(machineByMachine).map(([machine, areas]) => (
            <CategoryGroup key={machine} heading={machine}>
              {(areas as MachineTreatment[]).map((m) => (
                <TableRow
                  key={m.id}
                  name={m.area}
                  notes={m.pricing?.kitasKtpIdr ? `Kitas + KTP: ${fmtIdr(m.pricing.kitasKtpIdr)}` : undefined}
                  priceIdr={m.pricing?.standardIdr}
                  badge={m.pricing?.packageIdr ? `Package: ${fmtIdr(m.pricing.packageIdr)}` : undefined}
                />
              ))}
            </CategoryGroup>
          ))}
        </SheetSection>

        {/* Injectables — products grouped by category */}
        <SheetSection sheet="injection">
          {Object.entries(injectionByCategory).map(([cat, prods]) => (
            <CategoryGroup key={cat} heading={cat}>
              {(prods as InjectableProduct[]).map((p) => (
                <TableRow
                  key={p.id}
                  name={p.name}
                  notes={[p.unit, p.notes].filter(Boolean).join(' · ')}
                  priceIdr={p.priceIdr}
                  badge={p.brand}
                />
              ))}
            </CategoryGroup>
          ))}
        </SheetSection>

        {/* BTL Hair Removal */}
        <SheetSection sheet="btl">
          {Object.entries(btlByZone).map(([zone, areas]) => (
            <CategoryGroup key={zone} heading={zone}>
              {(areas as HairRemovalArea[]).map((h) => (
                <TableRow key={h.id} name={h.area} notes={h.notes} priceIdr={h.priceIdr} />
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
                {cms.consultationPolicy.feeAud ? ` (≈ ${fmtAud(cms.consultationPolicy.feeAud)})` : ''}.{' '}
                {cms.consultationPolicy.waiverConditionText}
              </p>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}

function labelInjectableCategory(c: string): string {
  switch (c) {
    case 'botulinum-toxin': return 'Botulinum Toxin'
    case 'filler': return 'Dermal Fillers'
    case 'skin-booster': return 'Skin Boosters'
    case 'collagen-stimulator': return 'Collagen Stimulators'
    case 'bio-remodeling': return 'Bio-Remodeling'
    case 'thread-lift': return 'Thread Lift'
    case 'mesotherapy': return 'Mesotherapy'
    case 'hgh': return 'HGH'
    default: return c
  }
}
