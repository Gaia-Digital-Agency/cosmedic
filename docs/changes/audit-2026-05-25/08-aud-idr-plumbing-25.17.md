# 25.17 — AUD ↔ IDR plumbing audit

**Status:** AUDIT-ONLY. Awaiting user sign-off on fixes.
**Date:** 2026-05-25

## Single source of truth (intended)

`Settings.audToIdrRate` (currently **12,500**) + `Settings.roundIdrTo` (50,000) + `Settings.currencyDisplayMode` (`idr-with-aud`). Editing those three values should re-peg every displayed AUD across the entire site. Defaults (10,500 / 50,000) only apply when the CMS cache is cold (first SSR request).

## Canonical path (works correctly)

| Layer | File | Role |
|---|---|---|
| Rate read | `packages/web/src/lib/pricing.ts:15` — `readRate()` | Reads `Settings.audToIdrRate` + `roundIdrTo` from `getCmsCacheSync()` |
| Format | `pricing.ts:38` — `priceParts(idr)` | Single function: `idr / rate → AUD`, formats both |
| Primitive | `packages/web/src/components/primitives/PriceTag.tsx` | Calls `priceParts(idr)`, renders IDR + (≈ AUD) |
| TreatmentRow | `packages/web/src/components/detail/TreatmentRow.tsx:25` | Calls `priceParts(idrNum)` directly |

**4 consumers of `<PriceTag>`** — all correct:
- `routes/detail/DisciplineDetail.tsx:289`
- `routes/pricing/PricingPage.tsx:304`
- `routes/recovery-stays/RecoveryStaysPage.tsx:204`
- `components/PageBlocks.tsx:251, 358`

## Bypasses found — 4

### Bypass #1 — `PricingTeaser.tsx` hardcodes the wrong rate (CRITICAL, user-visible)

| Line | What |
|---|---|
| 7–16 | `PRICE_TEASER = [{name, aud: 4200, parent, slug}, …]` — 8 entries, prices stored as **literal AUD** |
| 18–19 | `const fmtIDR = (aud) => 'Rp ' + Math.round((aud * 10500) / 50000) * 50000 …` — **hardcoded `10500` rate** |
| 32 | Footnote text claims "AUD shown at 1 AUD ≈ Rp 12,500 (May 2026)" — **inconsistent with code** |
| 73 | Renders `fmtIDR(p.aud)` — computed at 10,500, not the live Settings rate (12,500) |

**Impact:** The home page pricing teaser is **the most-seen pricing surface on the site**. Every IDR figure is **~19% too low** because rate=10,500 vs live 12,500. Editing `Settings.audToIdrRate` has zero effect on this widget. Two further problems:
- Direction-flipped: rest of site is IDR→AUD; this widget is AUD→IDR.
- Source data lives in component code, not CMS — editors can't change which 8 procedures appear in the teaser.

### Bypass #2 — `Procedures.priceAud2025` / `priceAud2026` stored separately from IDR (MAJOR)

`packages/cms/src/collections/Procedures.ts:151,153` — Procedures store both `priceIdr2025/2026` AND `priceAud2025/2026` as independent number fields.

`ClinicCatalogueTable.tsx:163–174` reads both fields and renders them side-by-side:
```ts
priceIdr = p.pricing?.priceIdr2026 ?? p.pricing?.priceIdr2025
priceAud = p.pricing?.priceAud2026 ?? p.pricing?.priceAud2025
…
{fmtIdr(priceIdr)}  ≈ {fmtAud(priceAud)}
```

**Impact:** When clinic edits `Settings.audToIdrRate`, the AUD column in the clinic catalogue (149 line items) does NOT change. Whatever was seeded from `pricelist.xlsx` is frozen. The two fields can drift apart — editor updates IDR but forgets AUD, AUD becomes stale.

### Bypass #3 — `ConsultationPolicy.feeAud` stored separately (MAJOR — single row but same pattern)

`packages/cms/src/globals/ConsultationPolicy.ts:19` — `feeAud` is its own number field. `ClinicCatalogueTable.tsx:561–562` reads it directly.

**Impact:** Same as Bypass #2 — 1 row instead of 149, but identical decoupling problem.

### Bypass #4 — `ClinicCatalogueTable.tsx` defines its own `fmtIdr` / `fmtAud` (MINOR, no functional bug)

`ClinicCatalogueTable.tsx:21–29` — duplicate of `pricing.ts:formatIDR/formatAUD`. **No rate involved** — these only format already-computed numbers. But it's an unnecessary duplication of code. The `roundIdrTo` from Settings is NOT applied here (the local `fmtIdr` uses raw `toLocaleString('de-DE')` with no rounding).

**Impact:** IDR figures in the clinic catalogue are NOT rounded per `Settings.roundIdrTo` (e.g. `Rp 56,450,000` may be `Rp 56,430,000` while the same procedure on a discipline page would round to `Rp 56,450,000`). Cosmetic inconsistency.

## Other observations

- `pricing.ts:12` constant `DEFAULT_AUD_TO_IDR = 10500` matches `Settings.audToIdrRate.defaultValue = 10500`. Both are stale relative to the live 12,500 value. **Recommend updating both defaults to 12,500** so cold-cache renders match live.
- `lib/cms.types.ts:333` enum `'idr-only' | 'idr-with-aud'` — but **no consumer reads `currencyDisplayMode`**. The locale-based switch in PriceTag (line 16: `locale === 'en'`) effectively forces `idr-with-aud` for English and `idr-only` for ID — `currencyDisplayMode` is a **dead Settings field**.
- WhatsApp number hardcoded twice (line `6281339001911` in `TreatmentRow.tsx:241` + `SubCategoryDetail.tsx:159`). Already tracked as **25.30**, not part of 25.17.

## Proposed fixes (10 work items)

| # | What | Where | Effort |
|---|---|---|---|
| F1 | **PricingTeaser: stop hardcoding the rate.** Replace `fmtIDR(aud)` with `priceParts(audToIdr(p.aud))` from `pricing.ts`. Either (a) keep AUD literals + compute IDR live, or (b) move the 8 entries into a CMS global. **Recommended: (a) for now** — minimal change, fixes the wrong-rate bug. 25.26 will migrate to CMS. | `routes/home/PricingTeaser.tsx` | 30 min |
| F2 | Update `pricing.ts:12` `DEFAULT_AUD_TO_IDR = 10500` → `12500` to match live. | `lib/pricing.ts` | 1 min |
| F3 | Update `Settings.ts:25` `defaultValue: 10500` → `12500` + admin description rate-figure. | `cms/src/globals/Settings.ts` | 1 min |
| F4 | Update `PricingTeaser.tsx:32` footnote default — already says 12,500, but the rate now lives in Settings, so make this CMS-driven via `Settings` global (use the `priceTeaserFootnote` field if one exists or reuse). | `routes/home/PricingTeaser.tsx` | 10 min |
| F5 | **Procedures.priceAud2025/2026: derive at render-time, not store.** Remove the two `priceAud` fields from `Procedures.ts`; update `ClinicCatalogueTable.tsx` to compute `priceAud = priceIdr / Settings.audToIdrRate`. Migration: zero risk (data was a stale snapshot anyway). | `cms/src/collections/Procedures.ts`, `routes/pricing/ClinicCatalogueTable.tsx`, DB | 1 hr |
| F6 | **ConsultationPolicy.feeAud: same.** Drop the field, derive from `feeIdr / rate`. | `cms/src/globals/ConsultationPolicy.ts`, `routes/pricing/ClinicCatalogueTable.tsx` | 15 min |
| F7 | **ClinicCatalogueTable: delete its local `fmtIdr`/`fmtAud`** and use `priceParts` / `formatIDR` / `formatAUD` from `lib/pricing.ts` (which applies `roundIdrTo`). | `routes/pricing/ClinicCatalogueTable.tsx` | 20 min |
| F8 | **Remove dead `currencyDisplayMode` from Settings** — no consumer reads it, locale-driven switch in PriceTag is the actual control. | `cms/src/globals/Settings.ts`, DB | 10 min |
| F9 | (Optional) Add `audToIdrRate` change → `Settings.afterChange` revalidation hook (already wired site-wide via `revalidationHooks()`, so this likely already works). Verify the home page IDR figure updates within 60s after a Settings edit. | verify only | 5 min |
| F10 | (Optional) Add a regression test: snapshot the home page IDR figures after F1 with rate=12,500 and after Settings change to 13,000 → expect figures to scale. | `tests/visual/pricing-rate.spec.ts` | 30 min |

**Recommended bundle for this commit:** F1 + F2 + F3 (fixes the wrong-rate bug). F5/F6/F7 are larger refactors — separate commit. F4/F8/F9/F10 optional.
