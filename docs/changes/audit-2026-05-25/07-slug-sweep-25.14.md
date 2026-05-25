# 25.14 — Slug sweep audit (web + CMS)

**Status:** AUDIT-ONLY. Awaiting user sign-off. **No renames performed.**
**Date:** 2026-05-25
**Scope:** Every URL-bearing CMS slug + every web router-mapped slug. Procedures audited for hygiene only (not URL-bearing).

---

## Rule being applied

> Slugs must be single-word or minimal `x-y` form; never lengthy. URL slug must match CMS slug exactly.

## URL → slug mapping (what's actually URL-bearing)

| URL pattern | Source collection | Count | Router code |
|---|---|---|---|
| `/treatments/{slug}` (matches discipline OR sub-category) | `disciplines` + `sub-categories` | 6 + 17 = 23 | `router.ts:63` |
| `/surgeons/{slug}` | `surgeons` | 8 | `router.ts:71` |
| `/blog/{slug}` | `blog-posts` | 7 | `router.ts:78` |
| (none) | `procedures` | 233 | internal-only; surfaces in CMS admin row IDs + catalogue group keys |

Static routes (`/`, `/treatments`, `/pricing`, `/contact`, etc.) are not slug-derived — they live in `STATIC_ROUTES` literal.

---

## 1. Disciplines (6) — URL-bearing

| # | Current slug | Title | Length | Proposed | Reason |
|---|---|---|---|---|---|
| 1 | `surgical` | Plastic Surgery | 8 | **keep** | Single word, OK. (Title mismatch is editor-facing only.) |
| 2 | `reconstructive` | Reconstructive Surgery | 14 | **keep** | Single word, OK. |
| 3 | `non-surgical` | Non-surgical | 12 | **keep** | Minimal `x-y`. |
| 4 | `hair` | Hair Restoration | 4 | **keep** | Single word, OK. |
| 5 | `dental` | Dental Aesthetics | 6 | **keep** | Single word, OK. |
| 6 | `recovery` | Weight Loss | 8 | **? `weight-loss`** | **Slug ≠ title concept.** "Recovery" means stays/aftercare elsewhere on the site (`/recovery-stays`). Discipline is about bariatric/weight-loss treatments. Renaming to `weight-loss` aligns slug to title and avoids confusion with `/recovery-stays`. Cost: 1 URL change (`/treatments/recovery` → `/treatments/weight-loss`) — externally shared? Likely not yet (pre-launch). 301 needed if any external link exists. |

**Verdict:** 5/6 keep. **1 candidate rename: `recovery` → `weight-loss`** (decision needed).

---

## 2. Sub-categories (17) — URL-bearing

All current slugs are `{parent-prefix}-{name}` form. They were prefixed when the URL was kept flat (CR25May 25.15 asks whether to nest as `/treatments/surgical/face`).

**This audit decouples from 25.15** — proposals below assume **flat URL stays** (the conservative path). If 25.15 nests URLs, all prefixes get stripped automatically; current proposal would be re-evaluated then.

| # | Parent | Current slug | Title | Length | Proposed | Reason |
|---|---|---|---|---|---|---|
| 1 | surgical | `surgical-face` | Face | 13 | **keep** | `x-y` form, parent-discriminator clear. |
| 2 | surgical | `surgical-body` | Body | 13 | **keep** | Same. |
| 3 | surgical | `surgical-breast` | Breast | 15 | **keep** | Needs to disambiguate from `reconstructive-breast` — prefix is load-bearing. |
| 4 | reconstructive | `reconstructive-breast` | Breast Reconstruction | 21 | **keep** OR `breast-recon` | 21 chars — borderline lengthy but prefix is load-bearing (collides with `surgical-breast` if stripped). Shortening parent doesn't help unless we add a special shortcut. |
| 5 | reconstructive | `reconstructive-trauma` | Trauma & Scar | 21 | `recon-trauma` | 21 → 12 chars by abbreviating `reconstructive` → `recon`. Apply across all 3 reconstructive sub-cats for consistency. |
| 6 | reconstructive | `reconstructive-craniofacial` | Craniofacial | 27 | `recon-craniofacial` (18) OR `craniofacial` (12) | Strip parent: no collision (no other "craniofacial"). |
| 7 | non-surgical | `non-surgical-injectables` | Injectables | 24 | `injectables` | Strip parent: no collision. 24 → 11 chars. |
| 8 | non-surgical | `non-surgical-laser` | Laser & Resurfacing | 18 | `laser` | Strip parent: no collision. |
| 9 | non-surgical | `non-surgical-skin` | Skin Health | 17 | `skin` | Strip parent: no collision. |
| 10 | hair | `hair-fue` | FUE Surgical | 8 | **keep** | Already short. |
| 11 | hair | `hair-therapy` | Follicle Therapy | 12 | **keep** | Already short. |
| 12 | dental | `dental-veneers` | Veneers | 14 | `veneers` | Strip parent: no collision. (Or keep — borderline.) |
| 13 | dental | `dental-alignment` | Alignment | 16 | `alignment` | Strip parent: no collision. |
| 14 | dental | `dental-whitening` | Whitening | 16 | `whitening` | Strip parent: no collision. |
| 15 | recovery (Weight Loss) | `weight-loss-surgical` | Bariatric Surgery | 20 | `bariatric` | Strip parent + match title term. No collision. |
| 16 | recovery | `weight-loss-endoscopic` | Endoscopic | 22 | `endoscopic` | Strip parent: no collision. |
| 17 | recovery | `weight-loss-medical` | Medical | 19 | `weight-loss-medical` **keep** OR `glp-1` | `medical` alone is too generic. Keep prefix OR rename to `glp-1` (matches what the page actually covers — GLP-1 / Ozempic-class treatments). **Decision needed.** |

**Hard collision if all prefixes stripped:** `breast` (surgical-breast vs reconstructive-breast). The recommendation keeps `surgical-breast` + renames `reconstructive-breast` → `breast-recon`, OR keeps both prefixed.

**Verdict:** Most sub-categories can shorten by stripping the parent prefix when no collision exists. **9 candidate renames** (rows 5, 6, 7, 8, 9, 12, 13, 14, 15, 16) + 1 collision decision (row 17) + 1 disambiguation decision (rows 3 vs 4). **No safe single-pass rename** — needs row-by-row sign-off because the breast disambiguation cascades.

---

## 3. Surgeons (8) — URL-bearing

| # | Current slug | Name | Length | Proposed | Reason |
|---|---|---|---|---|---|
| 1 | `theresia` | Theresia Indri Indrawati Setiadi | 8 | **keep** | First-name single-word. |
| 2 | `risma` | I Gusti Ayu Risma Pramita | 5 | **keep** | |
| 3 | `rosa` | Rosalina Silvia Dewi | 4 | **keep** | |
| 4 | `sissy` | Sissy Yunita Surya | 5 | **keep** | |
| 5 | `wara` | Gede Wara Samsarga | 4 | **keep** | |
| 6 | `indra` | Ida Bagus Agung Indra Pramana | 5 | **keep** | |
| 7 | `astri` | Astrinita Lestari Suyata | 5 | **keep** | |
| 8 | `suka` | I Made Suka Adnyana | 4 | **keep** | |

**Verdict:** all 8 are already minimal single-word. ✅ No renames.

---

## 4. Blog posts (7) — URL-bearing

| # | Current slug | Title | Length | Proposed | Reason |
|---|---|---|---|---|---|
| 1 | `dental-veneers-honesty` | Veneers: what we say no to. | 22 | **keep** | Editorial slug; SEO-readable. |
| 2 | `crani-bali` | Craniomaxillofacial surgery in Bali, in 2026. | 10 | **keep** | Compact. |
| 3 | `achsi-what-it-means` | What ACHSI accreditation actually means. | 19 | **keep** OR `what-achsi-means` | Stylistic only. |
| 4 | `fillers-restraint` | On fillers, restraint, and the long view. | 17 | **keep** | OK. |
| 5 | `the-villa-protocol` | The villa protocol. | 18 | **keep** | OK. |
| 6 | `before-you-fly` | Before you fly: a six-week pre-op letter. | 14 | **keep** | OK. |
| 7 | `the-quiet-rhinoplasty` | The quiet rhinoplasty | 21 | **keep** | Editorial. |

**Verdict:** Blog slugs are SEO-readable phrases — standard practice. No renames recommended. (Question only `achsi-what-it-means` if user wants tighter.)

---

## 5. Procedures (233) — **NOT URL-bearing**

Procedure slugs do not appear in any URL. They are admin-row identifiers + catalogue grouping keys. They will not match a "URL slug = CMS slug" rule because procedures have no URL.

**Hygiene observations** (informational, not URL-blocking):

- **87 of 233 procedure slugs exceed 30 chars.** Almost all come from the C9b machine pattern: 1 procedure name × 3 audience tiers (`-standard`, `-kitas_ktp`, `-package`) × N body areas. Length is structural, not careless.
- **`kitas_ktp` uses underscore** — every other slug across CMS uses hyphens. This is the only underscore-using slug pattern in the database.
  - **Recommended:** rename suffix `-kitas_ktp` → `-kitas-ktp` across **27 procedures** for hygiene parity. (Catalogue renderer reads `audienceTier === 'kitas_ktp'` from a separate field — slug rename won't break logic.)
- One typo in two slugs: `injection-mesotheraphy-brightening` + `injection-mesotheraphy-salmon-dna` — "**mesotheraphy**" → should be "**mesotherapy**". Title typo too? **Decision needed.**
- One redundant doubling: `injection-restylanerestylane-vital` — repeats "restylane". Should be `injection-restylane-vital`. **Decision needed.**

**Verdict:** No URL-driven renames needed (procedures aren't URL-bearing). 3 hygiene candidates: (a) underscore → hyphen on 27 rows, (b) mesotheraphy typo on 2 rows, (c) restylanerestylane on 1 row.

---

## Summary count

| Collection | Total | Keep | Candidate renames | Decisions needed |
|---|---|---|---|---|
| Disciplines | 6 | 5 | 0 | 1 (`recovery` → `weight-loss`) |
| Sub-categories | 17 | 5 | 9 | 3 (breast disambiguation + `weight-loss-medical` direction + reconstructive abbreviation) |
| Surgeons | 8 | 8 | 0 | 0 |
| Blog posts | 7 | 7 | 0 | 0 (1 optional) |
| Procedures | 233 | 230 | 0 URL | 3 hygiene (underscore, mesotheraphy typo, restylane double) |

**Total decisions needed from user: 4 URL-level + 3 procedure-hygiene = 7.**

---

## What happens after sign-off

Per CR25May 25.14 spec: "After sign-off: rename + add 301s if any externally-shared URLs change."

For each approved rename:
1. Update CMS slug field via Local API (idempotent UPDATE — won't overwrite other fields, Rule 5 safe).
2. Re-run web build (slug consumed via `cms.subCategories[*].slug` at SSR — no code change).
3. If URL externally shared, add nginx `location` 301 rewrite or web router rewrite in `router.ts`.
4. Verify all 51 routes still 200; verify `/admin` still shows the row.

**No code change happens in this commit.** This file is the proposal.
