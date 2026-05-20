# BIMC CosMedic — Site Map

> Every page · subpage · link · sublink · button. Source of truth for navigation IA, routing, and Pixel-Fidelity Gate sign-off (Phase 11). Keep in sync with `Header` + `Footer` Payload globals.

---

## Route summary

| Tier | Count | Notes |
|---|---|---|
| Top-level pages | 15 | Home, treatments index, surgeons index, journey, gallery, stories, press, pricing, recovery-stays, contact, video-consult, funnel-assessment, blog index, blog post, privacy |
| Discipline pages | 6 | One per Disciplines record |
| Sub-category pages | 18 | One per SubCategories record |
| Procedure pages | 41+ | One per editorial Procedures record (more may be added from pricelist) |
| Surgeon pages | 8 | One per Surgeons record |
| Localised mirrors (`/id/*`) | ×2 | Every route above also under `/id/` |
| **Total unique routes (EN)** | ~88 | |
| **Total with ID** | ~176 | |

---

## Header navigation

| Label | Route | Has mega-menu? |
|---|---|---|
| Treatments | `/treatments` | YES → 6 disciplines × N sub-categories |
| Surgeons | `/surgeons` | YES → 8 surgeons grouped (Plastic Surgery / Aesthetic Medicine) |
| Your Journey | `/journey` | no |
| Gallery | `/gallery` | no |
| Stories | `/stories` | no |
| Contact | `/contact` | no |
| **EN \| ID** | (locale switcher) | — |

### Treatments mega-menu

Columns of `[Discipline title] → [sub-category list]`:

| Discipline | Sub-categories |
|---|---|
| **Surgical** | Face · Body · Breast |
| **Reconstructive** | Breast Reconstruction · Trauma & Scar · Craniofacial |
| **Non-surgical** | Injectables · Laser & Resurfacing · Skin Health |
| **Hair** | FUE Surgical · Follicle Therapy |
| **Dental** | Veneers · Alignment · Whitening |
| **Weight Loss** | Medical · Endoscopic · Bariatric Surgery |

### Surgeons mega-menu

Columns of `[Group] → [surgeon list]`:

| Group | Surgeons |
|---|---|
| **Plastic Surgery** | Suka · Astri · Indra · Wara |
| **Aesthetic Medicine** | Sissy · Rosa · Risma · Theresia |

---

## All routes (full enumeration)

### Top-level (15 routes)

- `/`               → Homepage
- `/treatments`     → Treatments index (6 discipline cards)
- `/surgeons`       → Surgeons index (grouped: Plastic Surgery / Aesthetic Medicine)
- `/journey`        → 8-step journey
- `/gallery`        → 29 B&A cases with filters
- `/stories`        → Patient testimonials
- `/press`          → Editorial mentions + awards
- `/pricing`        → Tier packages + per-treatment table + full price list
- `/recovery-stays` → Villa partners for post-op
- `/contact`        → Enquiry form + practical info
- `/video-consult`  → Video consultation flow
- `/funnel-assessment` → Treatment assessment form
- `/blog`           → Blog index
- `/blog/:slug`     → Blog post
- `/privacy`        → Privacy policy

### Discipline pages (6 routes)

- `/treatments/surgical`
- `/treatments/reconstructive`
- `/treatments/non-surgical`
- `/treatments/hair`
- `/treatments/dental`
- `/treatments/recovery` (Weight Loss — slug retained from design)

### Sub-category pages (18 routes)

Under each discipline:

- `/treatments/surgical/{face, body, breast}`
- `/treatments/reconstructive/{breast, trauma, craniofacial}`
- `/treatments/non-surgical/{injectables, laser, skin}`
- `/treatments/hair/{fue, therapy}`
- `/treatments/dental/{veneers, alignment, whitening}`
- `/treatments/recovery/{medical, endoscopic, surgical}`

### Procedure pages (41+ routes)

Under each sub-category — these are the **editorial** procedures from `pages/subcategory-data.jsx`. (Additional pricelist line items from `docs/pricelist.xlsx` live in `PriceListItems` and surface on `/pricing` but don't get their own page.)

| Sub-category | Procedure slugs |
|---|---|
| `surgical/face` | rhinoplasty · facelifting · mini-facelifting · necklifting · foreheadlifting · neck-liposuction · blepharoplasty-upper · blepharoplasty-lower · double-eyelid |
| `surgical/body` | abdominoplasty · mini-abdominoplasty · liposculpture · brachioplasty · thigh-lift |
| `surgical/breast` | breast-augmentation · breast-augmentation-with-nipple-reduction · breast-reduction · breast-lifting · breast-uplifting-with-implant · breast-implant-removal · nipple-reduction |
| `reconstructive/breast` | breast-reconstruction · diep-flap |
| `reconstructive/trauma` | scar-revision · burn-reconstruction |
| `reconstructive/craniofacial` | cleft-lip-palate · maxillofacial-trauma |
| `non-surgical/injectables` | botulinum-toxin · dermal-fillers · profhilo · polynucleotides · skin-boosters |
| `non-surgical/laser` | fractional-laser · ipl |
| `non-surgical/skin` | chemical-peel · hydrafacial · microneedling-rf · prp-skin · medical-facial |
| `hair/fue` | sapphire-fue · dhi-choi |
| `hair/therapy` | prp-scalp |
| `dental/veneers` | porcelain-veneers · composite-veneers |
| `dental/alignment` | clear-alignment |
| `dental/whitening` | professional-whitening · smile-design |
| `recovery/medical` | glp1 · tirzepatide |
| `recovery/endoscopic` | intragastric-balloon · esg |
| `recovery/surgical` | sleeve · gastric-bypass |

### Surgeon pages (8 routes)

- `/surgeons/suka`
- `/surgeons/astri`
- `/surgeons/indra`
- `/surgeons/wara`
- `/surgeons/sissy`
- `/surgeons/rosa`
- `/surgeons/risma`
- `/surgeons/theresia`

### Localised mirrors

Every route above also available under `/id/` prefix (Phase 9).

### API routes (proxied via nginx)

- `GET /api/page-data?path=...` — page-level data hydration cache (web SSR)
- `GET /api/preview` + `GET /api/exit-preview` — Payload draft preview
- `POST /api/revalidate` — Payload afterChange triggers web cache bust
- `POST /api/enquiry` — form submission endpoint
- `GET /api/media/*` → Payload (CMS port 4007)
- `GET /api/{collection}` → Payload (CMS port 4007)
- `GET /admin` + `GET /_next/*` → Payload admin (CMS port 4007)

---

## CTA / button inventory

| CTA label | Lives on | Destination | Component | Notes |
|---|---|---|---|---|
| **Plan your treatment** | Floating chrome (every page) | `/contact` | `<FloatingChrome>` | Fixed bottom-right pill; from `FloatingChrome` Global |
| **Plan Your Treatment** | Homepage hero | `/contact` | `<Btn kind="primary">` | Primary CTA |
| **Speak with a Concierge** | Homepage, CTA bands | `/contact` | `<Btn kind="ghost">` | Secondary CTA |
| **Begin your journey** | CTA band (most pages) | `/contact` | `<CTABandSlim>` | End-of-page CTA |
| **READ →** | Procedure rows on sub-category pages | sub/procedure | row hover affordance | Slide-right on hover |
| **Send enquiry** | Hero form + `/contact` form | POST `/api/enquiry` | `<Btn>` (form submit) | Form CTA |
| **Book a consultation** | Inverse CTA band (brand.pdf §IV) | `/contact` | `<Btn kind="primary">` | Brand-book CTA pattern |
| **View Pricing** | Various | `/pricing` | `<Btn kind="ghost">` | Secondary, hero stats |
| **EN \| ID switcher** | Header right | toggles `/id/` prefix | `<LocaleSwitcher>` | Preserves path |
| **Chat** | Floating chrome (every page) | opens chat overlay | `<FloatingChrome>` chat config | From `FloatingChrome` Global |
| **View all** | Treatments / Gallery / Stories teasers on home | corresponding index | `<Btn kind="ghost">` | Teaser-to-index pattern |
| **Forgot password?** | Admin login | Payload reset flow | Payload built-in | Admin-only |
| **Login** | Admin login | Payload auth | Payload built-in | Admin-only |

---

## Footer

| Column | Items |
|---|---|
| **Treatments** | Links to each of 6 discipline pages |
| **Surgeons** | Links to each of 8 surgeon pages |
| **Information** | Journey · Gallery · Stories · Press · Pricing · Recovery Stays · Contact · Privacy |
| **Social** | Instagram · WhatsApp · Email (icons) |
| **Copyright** | © {year} BIMC CosMedic. Logo (white-on-dark variant). Address line. |

Footer is fully managed by the `Footer` Payload global (see `docs/db_schema.md`).

---

## Floating chrome (present on every page)

- **CTA pill** — bottom-right, fixed. Label + href from `FloatingChrome.ctaPill` global. Default: "Plan your treatment" → `/contact`.
- **Chat affordance** — bottom-right (above CTA pill). Provider + embed from `FloatingChrome.chat` global.

---

## Active-state nav rules

- Current top-level section in `--accent-deep` (dark brown) with permanent underline.
- Detail pages highlight their parent section:
  - `/surgeons/suka` → "Surgeons" highlighted.
  - `/treatments/surgical/breast/breast-augmentation` → "Treatments" highlighted + "Breast" mega-menu row also active.
- Mega-menu rows highlight their specific sub-item when on that sub-page.

---

## Mega-menu hover behaviour (critical detail)

The mega-menu panel uses a `padding-top: 12px` bridge so the cursor never hits dead space when crossing from the nav item to the dropdown. Without this bridge, the dropdown flickers closed on hover transition. Preserve this in the production `<Header>` component.

---

## Notes

- This file is the **source of truth for the navigation IA**. Any change to nav structure must be reflected here AND in the corresponding Payload globals (Header / Footer).
- The Pixel-Fidelity Gate (Phase 11) uses this file as the route matrix for visual regression baselines.
- The procedure list above (41+ editorial procedures) is the **editorial set** — what gets a dedicated page. The full pricelist (~150 line items including injectable products, machine treatments, hair removal areas) lives in `PriceListItems` and is rendered on `/pricing` as a structured table.
