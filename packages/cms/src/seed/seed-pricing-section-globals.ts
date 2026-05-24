/**
 * Phase R6 — seed the 7 new e. Pricing Bucket section globals.
 *
 * Every string below is a VERBATIM copy of what the live /pricing route
 * currently renders (PricingPage.tsx + ClinicCatalogueTable.tsx). Do NOT
 * paraphrase, "fix", or normalize whitespace — Rule 3 (visual invariance)
 * + the standing "no frontend data loss" feedback rule require byte-
 * identical output after the route rewire reads from these globals.
 *
 * Source files:
 *   - packages/web/src/routes/pricing/PricingPage.tsx           (hero L65-73, footnote fallback, insurance/payment fallbacks, list labels)
 *   - packages/web/src/routes/pricing/ClinicCatalogueTable.tsx  (SHEET_LABEL × 4, HAIR_ZONE_LABEL × 5, labelInjectableCategory × 9, section eyebrow/heading/intro template)
 *
 * Re-runnable: writes via updateGlobal, idempotent.
 *
 * Note on pricing-overview: it is INTENTIONALLY seeded blank — the live
 * /pricing route only renders the overview section when at least one
 * field is populated. Leaving it blank preserves visual invariance with
 * the current site.
 *
 * Run:
 *   NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx \
 *     src/seed/seed-pricing-section-globals.ts
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const PRICING_GLOBALS: Array<{ slug: string; data: Record<string, unknown> }> = [
  {
    slug: 'pricing-hero',
    data: {
      chapter: 'Chapter X — Pricing',
      titleA: 'Every treatment,',
      titleB: 'every price.',
      lede:
        'The complete pricing index, organised by discipline. Prices are starting figures in IDR with an Australian-dollar equivalent. Every plan is quoted precisely after a private consultation; what we quote is what you pay.',
      imageHue: 2,
      imageLabel: 'PRICING',
      breadcrumbLabel: 'Pricing',
    },
  },
  // pricing-overview is intentionally seeded with no content — the overview
  // section only renders when an editor populates at least one field.
  {
    slug: 'pricing-overview',
    data: {},
  },
  {
    slug: 'pricing-footnote',
    data: {
      text:
        'Prices indicative for international patients. AUD shown at 1 AUD ≈ Rp 10,500 (May 2026). Final quotes are tailored after consultation. Recovery stays, transfers, and twelve months of telehealth follow-up included on most surgical packages.',
    },
  },
  {
    slug: 'pricing-insurance',
    data: {
      eyebrow: 'Insurance',
      headingRoman: 'Working',
      headingItalic: 'with insurers.',
      body:
        "Cosmetic surgery is rarely covered by health insurance. Reconstructive procedures may be — and where they are, we are happy to support your claim with full documentation, surgeon's reports, and itemised invoicing.\n\nTravel insurance is recommended for every patient, and we work with two specialist medical-travel insurers — details supplied during consultation.",
    },
  },
  {
    slug: 'pricing-payment',
    data: {
      eyebrow: 'Payment',
      headingRoman: 'Quiet,',
      headingItalic: 'considered terms.',
      termsText:
        'Deposit | 20% on confirmation\nBalance | On admission, by transfer\nCurrencies | IDR, AUD, USD, EUR\nCards | Accepted, 1.8% surcharge\nRefunds | Full, until 14 days before\nFinance | Available via partner lender',
    },
  },
  {
    slug: 'pricing-discipline-list-view',
    data: {
      onRequestLabel: 'On request',
      includedLabel: 'Included',
      arrowChar: '→',
    },
  },
  {
    slug: 'pricing-catalogue-view',
    data: {
      sectionEyebrow: 'Clinic catalogue · CMS-managed',
      headingRoman: 'The full',
      headingItalic: 'clinic catalogue.',
      introTemplate:
        'Every line item below is edited in Cosmedic CMS by the clinic team and sourced from our 2025/2026 price list. Surgical, machine, injection, and BTL hair-removal services — {n}+ items in total.',
      sheetLabels: {
        surgicalTitle: 'Surgical Procedures',
        surgicalSubtitle: '2025 & 2026 pricing · IDR + AUD',
        machineTitle: 'Machine Treatments',
        machineSubtitle: 'Erbium · AFT · Q-switched · Pixel',
        injectionTitle: 'Injectable Catalogue',
        injectionSubtitle: 'Named brand pricing per ml / unit',
        btlTitle: 'BTL Hair Removal',
        btlSubtitle: 'Per area · per session',
      },
      hairZoneLabels: {
        face: 'Face',
        upperBody: 'Upper Body',
        lowerBody: 'Lower Body',
        packageZone: 'Packages',
        other: 'Other BTL',
      },
      injectableCategoryLabels: {
        botulinumToxin: 'Botulinum Toxin',
        filler: 'Dermal Fillers',
        skinBooster: 'Skin Boosters',
        collagenStimulator: 'Collagen Stimulators',
        bioRemodeling: 'Bio-Remodeling',
        threadLift: 'Thread Lift',
        mesotherapy: 'Mesotherapy',
        hgh: 'HGH',
        other: 'Other',
      },
    },
  },
]

async function main(): Promise<void> {
  const payload = await getPayload({ config })
  try {
    for (const g of PRICING_GLOBALS) {
      await (payload as unknown as {
        updateGlobal: (args: { slug: string; data: Record<string, unknown> }) => Promise<unknown>
      }).updateGlobal({
        slug: g.slug,
        data: g.data,
      })
      payload.logger.info(`[seed-pricing] ${g.slug} ← seeded`)
    }
    payload.logger.info(`[seed-pricing] done — ${PRICING_GLOBALS.length} globals`)
  } catch (err) {
    payload.logger.error({ err }, '[seed-pricing] failed')
    process.exitCode = 1
  } finally {
    const db = payload.db as { destroy?: () => Promise<void> }
    if (typeof db.destroy === 'function') await db.destroy()
    process.exit(process.exitCode ?? 0)
  }
}

main()
