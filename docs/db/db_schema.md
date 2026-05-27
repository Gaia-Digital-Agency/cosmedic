# BIMC CosMedic — Database Schema

> Comprehensive Payload CMS schema. The contract for "every editorial surface on the public site is managed in the CMS." Source documents: `shared.jsx`, `pages/subcategory-data.jsx`, `docs/pricelist.xlsx`, `docs/brand-guidelines.pdf`.

> **Updated 2026-05-27 — live state:**
>
> - **18 live collections**: Analytics · Authors · Awards · BeforeAfterCases · BlogPosts · BlogTags · Disciplines · Enquiries · JourneySteps · Media · PressMentions · PrivacySections · Procedures · RecoveryStays · Stories · SubCategories · Surgeons · Users.
> - **Removed collections** (unregistered, orphan DB tables may remain): PricingTiers (q5) · InclusionItems · ExclusionItems (q19) · MachineTreatments · InjectableProducts · HairRemovalAreas (Phase 6 — merged into Procedures) · SurgicalItems · MachineItems · InjectionItems · BTLItems · ClinicCatalogueItems (changes08-B) · PriceListItems · Pages · NewsletterSubscribers · Redirects.
> - **Procedures is the single pricing source** — holds all surgical/machine/injection/btl line items via `catalogueGroup` field.
> - **No standalone Pricing bucket** in admin — 9 Pricing globals moved to Treatments bucket (changes08-A).
> - **About bucket** added — Blog/Press/Privacy items moved there.
> - Read [cms_structure.md](../cms/cms_structure.md) for the current CMS sidebar structure.

---

## Design principles

1. **Every textual string** on the public site (except UI primitives like "More", "Close") is a managed field.
2. **Every image** is in Payload Media or in `assets/` (no raw URLs in code).
3. **Every list** has a CMS-managed `sortOrder` field — editors can reorder.
4. **Every Media reference** requires `alt` text (a11y / SEO Green non-negotiable).
5. **Every collection** has an `seo` group for per-record overrides.
6. **Every page-bound collection** has `publishStatus` (draft/published/scheduled) + `publishedAt`.
7. **Every editorial field** is `localized: true` — both `en` and `id` content.
8. **Every collection** has `createdBy` / `updatedBy` (auto-tracked).
9. **Decoupled "editorial" vs "catalogue"** — the 41 curated Procedures are rich editorial records; the 80+ pricelist line items live in PriceListItems for transparency without forcing every item to have a procedure page.

---

## Catalogue collections (17)

### Surgeons (8 records)

Source: `shared.jsx` `SURGEON_LIST` + `pricelist.xlsx` Further Information.

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | URL slug (e.g. `suka`) |
| name | text · localized | Full formal name |
| commonName | text · localized | Short / familiar (e.g. "Suka") |
| title | text | e.g. "dr." |
| suffix | text | e.g. "SpBP-RE (K)" |
| spec | text · localized | Specialty headline |
| train | text · localized | Training narrative (e.g. "Indonesia · Japan") |
| proc | text | Memberships (e.g. "ISAPS Member") |
| yearsInPractice | number | |
| hue | number 0-5 | Brand colour token index |
| group | select | `Plastic Surgery` / `Aesthetic Medicine` |
| lead | checkbox | Featured lead surgeon flag |
| credLine | text | Compact credentials line for cards |
| bio | richtext · localized | Long-form biography |
| specAreas | array of text · localized | Chip-style specialty tags |
| portrait | relationship → Media | Required, alt required |
| portraitPosition | text | CSS `object-position` value (e.g. `center 30%`) |
| availabilitySchedule | array of group | Each: `{ day: enum(mon...sun), windowStart, windowEnd, byAppointment: bool }` |
| languages | array of select | `en` / `id` / `ja` / `fr` / etc. |
| credentialedProcedures | relationship → Procedures · hasMany | Procedures this surgeon performs |
| seo | group | title, description, ogImage, canonical |

### Disciplines (6 records)

Source: `shared.jsx` `TREATMENT_LIST`.

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | e.g. `surgical` |
| order | number | Display order (1-6) |
| title | text · localized | "Surgical" |
| subtitle | text · localized | "Rhinoplasty · Breast · Body" |
| displayCount | text · localized | "9 procedures" |
| hue | number | |
| body | richtext · localized | Card paragraph |
| chapterTitle | array `[string, string]` · localized | Two-part title with italic accent |
| tagline | text · localized | Editorial strap |
| lede | text · localized | Hero lede paragraph |
| overview | richtext · localized | Long-form overview |
| heroImage | relationship → Media | |
| procedures | relationship → Procedures · hasMany | |
| leadSurgeons | relationship → Surgeons · hasMany | |
| faqs | array of group `{ q, a }` · localized | |
| seo | group | |

### SubCategories (18 records)

Source: `SUBCATEGORIES_BY_DISCIPLINE` + `subcategory-data.jsx`.

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | e.g. `surgical-breast` |
| parent | relationship → Disciplines | |
| title | text · localized | "Breast" |
| chapterTitle | array `[string, string]` · localized | |
| tagline | text · localized | |
| lede | text · localized | |
| intro | richtext · localized | |
| overview | richtext · localized | |
| leadSurgeon | relationship → Surgeons | |
| sections | array of group `{ id, t, body }` · localized | Page body sections |
| faqs | array of group `{ q, a }` · localized | |
| procedures | relationship → Procedures · hasMany | |
| heroImage | relationship → Media | |
| seo | group | |

### Procedures (41+ records — the editorial set)

Source: `subcategory-data.jsx` per-procedure rich content + `pricelist.xlsx` row matching.

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | e.g. `rhinoplasty` |
| name | text · localized | "Rhinoplasty" |
| shortName | text · localized | For cards / nav |
| parentDiscipline | relationship → Disciplines | |
| parentSubCategory | relationship → SubCategories | |
| description | richtext · localized | Top-of-page description |
| sections | array of group `{ id, t, body }` · localized | Detail page sections |
| faqs | array of group `{ q, a }` · localized | |
| surgeonsCredentialed | relationship → Surgeons · hasMany | |
| heroImage | relationship → Media | |
| **pricing** | group | (see below) |
| featuredRank | number | Top-3 indicator from xlsx col 1 |
| includesImplant | checkbox | Flagged from `*` marker in xlsx |
| included | relationship → InclusionItems · hasMany | What surgery includes |
| excluded | relationship → ExclusionItems · hasMany | What's excluded |
| recoveryTimeline | relationship → JourneySteps · hasMany | Day 1-14 from xlsx |
| relatedBA | relationship → BeforeAfterCases · hasMany | |
| relatedProcedures | relationship → Procedures · hasMany | |
| seo | group | |

**`pricing` group fields**:
- `priceIdr2025` — number
- `priceAud2025` — number
- `priceIdr2026` — number
- `priceAud2026` — number
- `priceIdrRangeLow` — number, optional (for ranges)
- `priceIdrRangeHigh` — number, optional
- `priceNotes` — text · localized (e.g. "Local Anesthesia", "General Anesthesia")
- `displayYear` — select (`2025` / `2026`) — which year to display by default

### PriceListItems (~150 records — full clinic catalogue)

Source: `pricelist.xlsx` all 7 sheets, parsed row-by-row.

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | Auto-generated from name + sheet |
| sheet | select | `surgical` / `non-surgical` / `machine` / `injection` / `btl` |
| category | text · localized | E.g. "Face & Neck" |
| subCategory | text · localized | E.g. "Breast" |
| name | text · localized | E.g. "Breast Augmentation with Implant" |
| unit | text · localized | E.g. "1 ml", "per thread", "Face" |
| audienceTier | select | `standard` / `tourist` / `kitas_ktp` / `package` |
| notes | text · localized | Parenthetical notes |
| priceIdr2025 / priceAud2025 / priceIdr2026 / priceAud2026 | number | |
| priceIdrRangeLow / priceIdrRangeHigh | number | For range values |
| linkedProcedure | relationship → Procedures · optional | If row matches an editorial procedure |
| linkedInjectableProduct | relationship → InjectableProducts · optional | |
| linkedMachineTreatment | relationship → MachineTreatments · optional | |
| sortOrder | number | |

### InjectableProducts

Source: `pricelist.xlsx` Injection + Non-Surgical Treatments sheets.

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | E.g. `juvederm-volux` |
| name | text · localized | E.g. "Juvederm Volux" |
| brand | text | "Juvederm" |
| productLine | text | "Volux" |
| category | select | `filler` / `botulinum-toxin` / `skin-booster` / `collagen-stimulator` / `bio-remodeling` / `hgh` / `thread-lift` |
| unit | text | "1 ml" / "per unit" / "per thread" |
| priceIdr | number | |
| priceAud | number | |
| notes | text · localized | |
| manufacturer | text | |
| fdaApproved | checkbox | |
| seo | group | |

### MachineTreatments

Source: `pricelist.xlsx` Machine sheet.

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | E.g. `laser-erbium-face` |
| machineName | text · localized | "Laser Erbium Resurfacing" |
| area | text · localized | "Face" / "Neck" / "Half Arm" / etc. |
| pricing | group | (see below) |
| notes | text · localized | |
| linkedProcedure | relationship → Procedures · optional | |
| sortOrder | number | |

**`pricing` group fields** (three-tier):
- `standardIdr` — number — base BIMC Tourist price
- `kitasKtpIdr` — number — Kitas + KTP holder price
- `packageIdr` — number — package price (optional)

### HairRemovalAreas

Source: `pricelist.xlsx` BTL sheet.

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | E.g. `upper-lip` |
| area | text · localized | "Upper Lip" |
| bodyZone | select | `face` / `upper-body` / `lower-body` / `package` |
| priceIdr | number | |
| notes | text · localized | |
| sortOrder | number | |

### BeforeAfterCases (29 records)

Source: `BA_PAIRS`.

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | |
| caseLabel | text · localized | Anonymous label |
| procedure | relationship → Procedures | |
| composite | relationship → Media | Single image, left=before / right=after |
| beforeAlt | text · localized | Required for a11y |
| afterAlt | text · localized | Required for a11y |
| surgeon | relationship → Surgeons | |
| tags | array of text · localized | |
| description | richtext · localized | |
| year | number | |
| isFeatured | checkbox | For home teaser |
| sortOrder | number | |

### Stories

Source: `STORY_PORTRAITS` + clinic content.

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | |
| patientLabel | text · localized | Anonymous (e.g. "Sarah, 42, Sydney") |
| country | text | ISO country code |
| procedure | relationship → Procedures | |
| portrait | relationship → Media | |
| quote | text · localized | Pullquote |
| body | richtext · localized | Full testimonial |
| videoUrl | text · optional | Video testimonial |
| year | number | |
| surgeon | relationship → Surgeons | |
| isFeatured | checkbox | |
| sortOrder | number | |
| seo | group | |

### PressMentions

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | |
| publication | text | "Tatler", "Vogue", etc. |
| logo | relationship → Media | |
| headline | text · localized | |
| url | text | Outbound link |
| publishedDate | date | |
| summary | text · localized | |
| isFeatured | checkbox | |
| sortOrder | number | |

### Awards

Source: brand.pdf §IV ("#1 hospital 2026") + future entries.

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | |
| name | text · localized | "#1 Hospital" |
| year | number | |
| issuer | text · localized | |
| logo | relationship → Media | |
| summary | text · localized | |
| sortOrder | number | |

### RecoveryStays

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | |
| name | text · localized | Villa name |
| location | text · localized | "Seminyak", etc. |
| heroImage | relationship → Media | |
| gallery | array of Media · hasMany | |
| descriptor | richtext · localized | |
| amenities | array of text · localized | |
| priceFromAudPerNight | number | |
| priceFromIdrPerNight | number | |
| partnerUrl | text | |
| geo | group `{ lat, lng }` | For map embed |
| sortOrder | number | |

### PricingTiers (concierge packages)

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | |
| name | text · localized | E.g. "Sanctuary" |
| descriptor | richtext · localized | |
| priceFromAud / priceFromIdr | number | |
| inclusions | array of text · localized | |
| isFeatured | checkbox | |
| sortOrder | number | |

### BlogPosts

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | |
| title | text · localized | |
| lede | text · localized | |
| body | richtext · localized | |
| heroImage | relationship → Media | |
| author | relationship → Authors | |
| publishedAt | date | |
| tags | relationship → BlogTags · hasMany | |
| seo | group | |
| readingTimeMinutes | number · auto | |
| publishStatus | select | `draft` / `published` / `scheduled` |

### BlogTags

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | |
| name | text · localized | |
| description | text · localized | |

### Authors

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | |
| name | text · localized | |
| role | text · localized | |
| bio | richtext · localized | |
| portrait | relationship → Media | |
| surgeonProfile | relationship → Surgeons · optional | If author is one of the surgeons |

---

## Editorial-override collections (4)

### Pages

One record per route that needs hand-crafted hero + body. Routes covered: `/`, `/journey`, `/gallery`, `/stories`, `/press`, `/privacy`, `/contact`, `/video-consult`, `/funnel-assessment`.

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | |
| route | text · unique | E.g. `/journey` |
| chapterTitle | array `[string, string]` · localized | |
| tagline | text · localized | |
| lede | text · localized | |
| heroImage | relationship → Media | |
| sections | array of blocks · localized | Composable content (see below) |
| seo | group | |
| publishStatus | select | `draft` / `published` |

**`sections` block array** — each item is one of:
- `ChapterOpener` — title + lede + hero image
- `RichText` — paragraph block
- `ImageGrid` — N images in a grid
- `CTABand` — `{ title, lede, primary CTA, secondary CTA }`
- `Stats` — array of `{ number, label, sourceNote }`
- `FAQAccordion` — `{ heading, items: [{q, a}] }`
- `ProcedureList` — `{ filter, layout }` → renders linked Procedures
- `SurgeonList` — `{ filter, layout }` → renders linked Surgeons
- `BAGrid` — `{ filter, layout }` → renders BeforeAfterCases
- `TestimonialList` — `{ filter, count }` → renders Stories
- `RecoveryStayList` — renders RecoveryStays
- `PressMentionList` — renders PressMentions
- `ContactForm` — embed enquiry form with `{ formId, defaultsOverride }`
- `JourneyStepList` — `{ filter }` → renders JourneySteps
- `ExternalEmbed` — `{ html | iframeUrl }` for video etc.

### JourneySteps

One record per step of patient journey. Reused on `/journey` page and as `recoveryTimeline` on procedures.

| Field | Type | Notes |
|---|---|---|
| slug | text · unique | |
| order | number | |
| dayLabel | text · localized | "Day 1" / "Week 1" |
| title | text · localized | |
| body | richtext · localized | |
| icon | relationship → Media · optional | |
| category | select | `consult` / `medical` / `surgical` / `recovery` / `follow-up` |

Seeded from `pricelist.xlsx` Further Information sheet (Day 1, 2, 4, 7, 10, 14) plus design's 8-step journey.

### InclusionItems

Universal "what surgery includes" — seeded from xlsx Further Info `Include` list. Linked from Procedures.included.

| Field | Type | Notes |
|---|---|---|
| order | number | |
| text | text · localized | E.g. "Surgeon, anesthesiologist, team fee" |
| scope | select | `surgical-procedure` / `consultation` / `general` |

### ExclusionItems

Same structure as InclusionItems. Seeded from xlsx Further Info `Exclude` list.

---

## Dynamic data collections (3)

### Enquiries

Form submissions. Read-only for editors; create-only for public.

| Field | Type | Notes |
|---|---|---|
| name | text | |
| email | text | |
| phone | text | |
| country | text | |
| treatmentInterest | relationship → Procedures · optional OR text fallback | |
| preferredDate | date · optional | |
| message | textarea | |
| sourcePage | text | URL where form was submitted |
| sourceCta | text | Button label that triggered submit |
| status | select | `new` / `contacted` / `scheduled` / `converted` / `closed` / `spam` |
| assignedTo | relationship → Users · optional | |
| notes | array of group `{ at, by, text }` | Internal timeline |
| submittedAt | date · auto | |
| ip | text | |
| userAgent | text | |
| honeypot | text · hidden | If non-empty, silently reject |

Access:
- public: `create` only
- editor / admin: `read`, `update`
- never: `delete` from UI (preserve audit trail)

### NewsletterSubscribers

(Optional — only if newsletter feature is added.)

| Field | Type | Notes |
|---|---|---|
| email | text · unique | |
| locale | select | `en` / `id` |
| consentedAt | date | |
| source | text | |
| status | select | `active` / `unsubscribed` |

### Redirects

(Optional — for future URL changes.)

| Field | Type | Notes |
|---|---|---|
| from | text · unique | E.g. `/old-page` |
| to | text | E.g. `/treatments/surgical/breast/augmentation` |
| statusCode | select | `301` / `302` |

---

## Globals (10)

### Settings

| Field | Type | Notes |
|---|---|---|
| siteName | text · localized | |
| siteTagline | text · localized | |
| defaultOgImage | relationship → Media | |
| defaultMetaDescription | text · localized | |
| audToIdrRate | number | Default 10500 (brand.pdf May 2026 rate) |
| roundIdrTo | number | Default 50000 |
| contactEmail | text | |
| contactPhone | text | |
| whatsappNumber | text | |
| addressLine1 / addressLine2 / city / postalCode / country | text · localized | |
| hoursMonFri / hoursSatSun | text · localized | |
| googleMapsUrl | text | |
| socialLinks | array of group `{ platform, url }` | |
| defaultLocale | select | `en` / `id` |
| currencyDisplayMode | select | `idr-only` / `idr-with-aud` |

### Header

| Field | Type | Notes |
|---|---|---|
| logoLight | relationship → Media | Used on cream background |
| logoDark | relationship → Media | Used on dark sections |
| navItems | array of group | Each: `{ label, href, megaMenu (optional), activePattern }` |
| megaMenu (per nav item) | array of group | `{ heading, items: [{label, href}] }` columns |
| localeSwitcher | group | `{ enabled, labels: { en, id } }` |

### Footer

| Field | Type | Notes |
|---|---|---|
| logoLight | relationship → Media | White-on-dark variant |
| linkColumns | array of group | `{ heading, items: [{label, href}] }` |
| enquirySummary | richtext · localized | |
| addressBlock | richtext · localized | |
| copyrightTemplate | text · localized | E.g. `© {year} BIMC CosMedic. All rights reserved.` |

### FloatingChrome

| Field | Type | Notes |
|---|---|---|
| ctaPill | group | `{ label, href, enabled }` |
| chat | group | `{ enabled, provider, embedScript, openOnLoad }` |

### BrandStats

Source: brand.pdf §IV.

| Field | Type | Notes |
|---|---|---|
| stats | array of group | Each: `{ number, label, sourceNote }` |

Seed: `28 / YEARS IN PRACTICE`, `8 / ISAPS-FICS SURGEONS`, `3,400+ / PROCEDURES PERFORMED`, `#1 / HOSPITAL 2026`.

### EndorsementMark

Source: brand.pdf §I.

| Field | Type | Notes |
|---|---|---|
| endorsementLine | text · localized | "Managed by BIMC Hospital" |
| primaryLockup | relationship → Media | Ink on light-beige variant |
| inverseLockup | relationship → Media | Inverse for dark |
| clearspaceUnit | text | "1X (height of medical cross)" |
| minScreenWidthPx | number | 96 |
| minPrintMmWidth | number | 24 |

### ConsultationPolicy

Source: xlsx Further Info ("CONSULTATION FEE : 150.000 — WILL BE FREE IF THE TREATMENT DONE THE SAME DAY").

| Field | Type | Notes |
|---|---|---|
| feeIdr | number | 150000 |
| feeAud | number | |
| waiverConditionText | text · localized | |
| displayOn | array of select | `contact` / `procedure-detail` / `pricing` / `hero` |

### FormDefaults

| Field | Type | Notes |
|---|---|---|
| labels | group of text · localized | name, email, phone, country, treatment, message |
| placeholders | group of text · localized | Same fields |
| successMessage | text · localized | |
| errorMessage | text · localized | |
| rateLimitMessage | text · localized | |
| submitLabel | text · localized | |

### EmailTemplates

| Field | Type | Notes |
|---|---|---|
| templates | array of group | Each: `{ id, subject, bodyMjml, locale }` |

Initial templates: `enquiry-autoresponder`, `enquiry-clinic-notify`, `newsletter-confirm`, `admin-password-reset`.

### SeoDefaults

| Field | Type | Notes |
|---|---|---|
| titlePattern | text | `{page} — BIMC CosMedic` |
| robotsTxt | textarea | |
| sitemapBaseUrl | text | `https://cosmedic.gaiada.online` |
| organizationSchema | json | LD-JSON for `MedicalClinic` |

---

## Sufficiency-check checklist

Validate before Phase 11 sign-off — every item below must trace to a Payload field:

- [ ] Every textual string on the public site (except UI primitives like "More") is editable in CMS.
- [ ] Every image on the public site is from Payload Media or `assets/` (no raw URLs in code).
- [ ] Every CTA label + destination is editable per page (via Pages.sections blocks or globals).
- [ ] Every navigation item (header, footer, mega-menu) is editable (Header / Footer globals).
- [ ] Every price displayed on the site sources from PriceListItems or Procedures.pricing.
- [ ] Every FAQ is editable (in Disciplines / SubCategories / Procedures / Pages).
- [ ] Every stat (28 years, 8 surgeons, etc.) is editable (BrandStats global).
- [ ] Every endorsement / brand line (e.g. "Managed by BIMC Hospital") is editable (EndorsementMark global).
- [ ] Every form field (label, placeholder, error message) is editable (FormDefaults global).
- [ ] Every email template (autoresponder, notification) is editable (EmailTemplates).
- [ ] Every page has a per-record SEO override.
- [ ] Both EN and ID content present for every editorial field.
- [ ] Every Media has a non-empty `alt` text.

---

## Seed mapping summary

| Source | Target |
|---|---|
| `shared.jsx` SURGEON_LIST | Surgeons collection (8 records, rich bios) |
| `shared.jsx` TREATMENT_LIST | Disciplines (6) |
| `shared.jsx` SUBCATEGORIES_BY_DISCIPLINE + subcategory-data.jsx | SubCategories (18) + Procedures (41) |
| `shared.jsx` BA_PAIRS | BeforeAfterCases (29) |
| `shared.jsx` STORY_PORTRAITS + clinic content | Stories |
| `pricelist.xlsx` Surgical sheet | PriceListItems + cross-link to Procedures |
| `pricelist.xlsx` Non-Surgical sheet | PriceListItems + InjectableProducts |
| `pricelist.xlsx` Machine sheet | MachineTreatments + PriceListItems |
| `pricelist.xlsx` Injection sheet | InjectableProducts |
| `pricelist.xlsx` BTL sheet | HairRemovalAreas |
| `pricelist.xlsx` Further Information | InclusionItems + ExclusionItems + JourneySteps |
| `brand-guidelines.pdf` §IV | BrandStats global |
| `brand-guidelines.pdf` §I | EndorsementMark global |
| Clinic content (to be provided) | PressMentions, Awards, RecoveryStays, PricingTiers, BlogPosts/Authors/Tags |

---

## Access control summary

| Role | Read | Create | Update | Delete |
|---|---|---|---|---|
| `public` (unauthenticated) | published records via web | Enquiries only | — | — |
| `editor` | all | all except Users/Settings | all editorial | none |
| `admin` | all | all | all | all (but cannot delete Enquiries from UI) |

Users collection has a `roles` array — `editor`, `admin`. Bootstrap super-admin via env (Phase 1):
- `PAYLOAD_SEED_ADMIN_EMAIL=super_admin@email.com`
- `PAYLOAD_SEED_ADMIN_PASSWORD=Teameditor@123` (rotate before launch — Phase 12).
