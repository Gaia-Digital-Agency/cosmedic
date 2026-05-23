# Cosmedic CMS — sidebar structure (source of truth)

## 1. Glossary

| Term | Meaning | Example |
|---|---|---|
| **Bucket** | Top-level sidebar group in the CMS admin. Mirrors a top-level site section. | `HOMEPAGE`, `PRICING`, `MEDIA` |
| **Entity** | One CMS data type. Either a **Collection** (many records) or a **Global** (singleton). | `Press Mentions` (Collection); `Home Page` (Global) |
| **Section Label** | Plain-English description of where on the site this Entity is rendered. Shown to the editor as a sidebar sub-label. | `Trust band`, `Hero (/)`, `Catalogue` |
| **Field** | One editable property inside an Entity. | `slug`, `priceIdr2026`, `chapterTitle.a` |
| **Type** | Data type of a Field. | `text`, `number`, `richText`, `upload`, `relationship`, `group`, `array`, `blocks`, `select`, `checkbox` |
| **PAGE_BASE** | Shared field set that every Page Global inherits (see §4). | All 14 Page Globals start from this; some add more fields. |

---

## 2. Buckets overview

| # | Bucket | Mirrors on the site | Collections in bucket | Globals in bucket |
|---|---|---|---|---|
| 0 | *(ungrouped)* | admin login only | 1 | 0 |
| 1 | **HOMEPAGE** | `/` + `/press` + `/privacy` + shell on every page | 2 | 10 |
| 2 | **TREATMENTS** | `/treatments` + `/treatment-<discipline>` + `/treatment-<sub-category>` | 5 | 1 |
| 3 | **DOCTORS** | `/surgeons` + `/surgeon-<slug>` | 1 | 1 |
| 4 | **RESULTS** | `/results` + `/gallery` | 1 | 2 |
| 5 | **PRICING** | `/pricing` top→bottom (catalogue rows actually live on Procedures in TREATMENTS — single-source) | 1 | 2 |
| 6 | **JOURNEY** | `/journey` + `/stories` + `/recovery-stays` + `/blog` + `/blog/<slug>` | 6 | 4 |
| 7 | **CONTACT** | `/contact` + `/video-consult` + outbound mail | 1 | 4 |
| 8 | **MEDIA** | Every image / video / PDF on the site | 1 | 0 |

---

## 3. Entities — full list, one row per Entity

| Bucket | Type | Section Label | Entity | Renders on |
|---|---|---|---|---|
| *(ungrouped)* | Collection | — | Users | admin login only |
| HOMEPAGE | Collection | Trust band | Press Mentions | `/press`, home trust strip |
| HOMEPAGE | Collection | Accreditations | Awards | `/press`, home BrandStats source |
| HOMEPAGE | Global | Hero + Intro + Treatments + PricingTeaser + Surgeons + Gallery + LeadMagnet + Journey + Stories + Place (/) | Home Page | `/` |
| HOMEPAGE | Global | TrustStrip | Brand Stats | every page |
| HOMEPAGE | Global | Hero (/press) | Press Page | `/press` |
| HOMEPAGE | Global | Hero (/privacy) | Privacy Page | `/privacy` |
| HOMEPAGE | Global | Top nav | Header | every page |
| HOMEPAGE | Global | Header endorsement | Endorsement Mark | every page |
| HOMEPAGE | Global | Footer | Footer | every page |
| HOMEPAGE | Global | Floating overlay | Floating Chrome | every page |
| HOMEPAGE | Global | Clinic info | Settings | every page |
| HOMEPAGE | Global | Meta defaults | Seo Defaults | every page meta head |
| TREATMENTS | Collection | Discipline grid | Disciplines | `/treatments` cards, `/treatment-<disc>` hero, mega-menu, footer |
| TREATMENTS | Collection | Sub-category pages | Sub Categories | `/treatment-<sub>`, mega-menu items |
| TREATMENTS | Collection | Procedure rows + **unified pricing catalogue** | Procedures | procedure detail pages, sub-cat lists, home pricing teaser, AND every row of `/pricing` Surgical / Machine / Injection / BTL tables |
| TREATMENTS | Collection | What's included | Inclusion Items | procedure detail |
| TREATMENTS | Collection | What's not | Exclusion Items | procedure detail |
| TREATMENTS | Global | Hero (/treatments) | Treatments Page | `/treatments` |
| DOCTORS | Collection | Surgeons | Surgeons | `/surgeons` (4 sections), `/surgeon-<slug>` (5 sections), home strip, mega-menu, footer |
| DOCTORS | Global | Hero (/surgeons) | Surgeons Page | `/surgeons` |
| RESULTS | Collection | Before/After | Before After Cases | `/gallery` grid, `/results` featured, home Gallery teaser |
| RESULTS | Global | Hero (/results) | Results Page | `/results` |
| RESULTS | Global | Hero (/gallery) | Gallery Page | `/gallery` |
| PRICING | Collection | Tier cards | Pricing Tiers | `/pricing` concierge tier cards |
| PRICING | (pointer) | Catalogue rows — Surgical / Machine / Injection / BTL | → Procedures (lives in TREATMENTS) | `/pricing` main tables, grouped by `Procedures.catalogueGroup → mainCategory → subCategory → name` |
| PRICING | Global | Hero + Overview + Footnote + Insurance + Payment | Pricing Page | `/pricing` editorial frame |
| PRICING | Global | Callout | Consultation Policy | `/pricing` + `/contact` + every procedure detail |
| JOURNEY | Collection | Journey Steps | Journey Steps | `/journey` 8-step list, procedure-detail recovery timeline |
| JOURNEY | Collection | Stories | Stories | `/stories`, home Stories teaser, surgeon-detail testimonials |
| JOURNEY | Collection | Recovery Stays | Recovery Stays | `/recovery-stays` villa cards, procedure-detail recovery suggestion |
| JOURNEY | Collection | Blog Posts | Blog Posts | `/blog` index, `/blog/<slug>` detail |
| JOURNEY | Collection | Blog Tags | Blog Tags | `/blog` filter chips |
| JOURNEY | Collection | Authors | Authors | `/blog/<slug>` byline |
| JOURNEY | Global | Hero (/journey) | Journey Page | `/journey` |
| JOURNEY | Global | Hero (/stories) | Stories Page | `/stories` |
| JOURNEY | Global | Hero (/recovery-stays) | Recovery Stays Page | `/recovery-stays` |
| JOURNEY | Global | Hero (/blog) | Blog Page | `/blog` index |
| CONTACT | Collection | Enquiries | Enquiries | form submissions only (admin-only view) |
| CONTACT | Global | Hero (/contact) | Contact Page | `/contact` |
| CONTACT | Global | Form copy | Form Defaults | every form on the site |
| CONTACT | Global | Outbound mail | Email Templates | clinic notify + autoresponder |
| CONTACT | Global | Hero (/video-consult) | Video Consult Page | `/video-consult` |
| MEDIA | Collection | Media library | Media | every image / video / PDF |

---

## 4. Page Global Base — all 14 Page Globals share these fields

Source: `packages/cms/src/globals/pages/_pageFields.ts`

| Field | Type | Notes |
|---|---|---|
| `title` | text | Admin label only (not rendered on site) |
| `slug` | text | Page slug, do not change once live |
| `route` | text | URL the page renders on, e.g. `/`, `/pricing` |
| `chapterTitle.a` | text | First line of the two-part hero title |
| `chapterTitle.b` | text | Second line (rendered italic accent) |
| `tagline` | text | Hero tagline below the chapter title |
| `lede` | textarea | Hero lede paragraph |
| `heroImage` | upload | Hero background image |
| `sections` | blocks (array) | Composable body. Block library: `richText`, `imageGrid`, `ctaBand`, `stats`, `faqAccordion`, `procedureList`, `surgeonList`, `baGrid`, `testimonialList`, `recoveryStayList`, `pressMentionList`, `contactForm`, `journeyStepList`, `externalEmbed`, `notes` |
| `publishStatus` | select | `draft` / `published` / `scheduled` |
| `seo.title` | text | Per-page `<title>` override |
| `seo.description` | textarea | Per-page meta description override |
| `seo.ogImage` | upload | Per-page social-share image |
| `seo.canonical` | text | Per-page canonical URL override |
| `seo.noindex` | checkbox | Per-page `noindex,nofollow` |

---

## 5. Per-entity field tables

### 5.0 (ungrouped) — Users

| Field | Type | Notes |
|---|---|---|
| `email` | text (auth) | Login email |
| `password` | text (auth) | Hashed by Payload auth |

### 5.1 HOMEPAGE

#### Press Mentions  (Collection · "Trust band")

| Field | Type | Notes |
|---|---|---|
| `slug` | text | unique, indexed |
| `publication` | text | e.g. "Vogue Australia" |
| `logo` | upload | publication mark |
| `headline` | text | the press piece headline |
| `url` | text | external link |
| `publishedDate` | date | |
| `summary` | textarea | excerpt |
| `isFeatured` | checkbox | promote on home trust strip |
| `sortOrder` | number | lower = earlier |

#### Awards  (Collection · "Accreditations")

| Field | Type | Notes |
|---|---|---|
| `slug` | text | unique, indexed |
| `name` | text | e.g. "Hospital of the Year" |
| `year` | number | |
| `issuer` | text | issuing body |
| `logo` | upload | |
| `summary` | textarea | |
| `sortOrder` | number | |

#### Home Page  (Global · "Hero + Intro + Treatments + PricingTeaser + Surgeons + Gallery + LeadMagnet + Journey + Stories + Place (/)")

Inherits **PAGE_BASE** (see §4) and adds:

| Field | Type | Notes |
|---|---|---|
| `introBlock.eyebrow` | text | "Our Approach" |
| `introBlock.pullQuote` | text | italic pull quote |
| `introBlock.columns[].body` | array (richText) | 2-column body |
| `treatmentsBlock.eyebrow` | text | |
| `treatmentsBlock.heading` | text | section H2 |
| `treatmentsBlock.lede` | text | |
| `pricingTeaserBlock.eyebrow` | text | "Starting From" |
| `pricingTeaserBlock.heading` | text | |
| `pricingTeaserBlock.lede` | text | |
| `pricingTeaserBlock.footnote` | text | |
| `surgeonsBlock.eyebrow` | text | |
| `surgeonsBlock.heading` | text | |
| `surgeonsBlock.lede` | text | |
| `galleryBlock.eyebrow` | text | "Before & After Results" |
| `galleryBlock.heading` | text | |
| `galleryBlock.lede` | text | |
| `galleryBlock.ctaLabel` | text | "View the full gallery" |
| `galleryBlock.ctaHref` | text | |
| `leadMagnetBlock.cover.eyebrow` | text | |
| `leadMagnetBlock.cover.titleLines[]` | array (text) | "The Bali Recovery Guide." |
| `leadMagnetBlock.cover.foot[]` | array (text) | "BIMC CosMedic / MMXXVI" |
| `leadMagnetBlock.body.eyebrow` | text | "Free Guide" |
| `leadMagnetBlock.body.heading` | text | |
| `leadMagnetBlock.body.lede` | text | |
| `leadMagnetBlock.form.placeholder` | text | |
| `leadMagnetBlock.form.submitLabel` | text | |
| `leadMagnetBlock.form.fineprint` | text | |
| `journeyBlock.eyebrow` | text | |
| `journeyBlock.heading` | text | |
| `journeyBlock.lede` | text | |
| `journeyBlock.ctaLabel` | text | |
| `journeyBlock.ctaHref` | text | |
| `storiesBlock.eyebrow` | text | |
| `storiesBlock.heading` | text | |
| `storiesBlock.lede` | text | |
| `storiesBlock.ctaLabel` | text | |
| `storiesBlock.ctaHref` | text | |
| `placeBlock.eyebrow` | text | |
| `placeBlock.heading` | text | |
| `placeBlock.body` | richText | |
| `placeBlock.images[]` | array (upload) | |

#### Brand Stats  (Global · "TrustStrip")

| Field | Type | Notes |
|---|---|---|
| `stats[].number` | array → text | e.g. "28", "#1" |
| `stats[].label` | array → text | e.g. "years" |
| `stats[].sourceNote` | array → text | citation/footnote |

#### Press Page  (Global · "Hero (/press)")

Inherits **PAGE_BASE** only. No additional fields.

#### Privacy Page  (Global · "Hero (/privacy)")

Inherits **PAGE_BASE** only. No additional fields.

#### Header  (Global · "Top nav")

| Field | Type | Notes |
|---|---|---|
| `logoLight` | upload | cream-bg variant |
| `logoDark` | upload | dark-bg variant |
| `navItems[].label` | array → text | |
| `navItems[].href` | array → text | |
| `navItems[].activePattern` | array → text | regex for active state |
| `navItems[].megaMenu.heading` | array → text | per-item mega-menu heading |
| `navItems[].megaMenu.items[].label` | nested array → text | |
| `navItems[].megaMenu.items[].href` | nested array → text | |
| `navItems[].megaMenu.items[].enabled` | nested array → checkbox | |
| `localeSwitcher.labelEn` | text | "EN" |
| `localeSwitcher.labelId` | text | "ID" |

#### Endorsement Mark  (Global · "Header endorsement")

| Field | Type | Notes |
|---|---|---|
| `endorsementLine` | text | "Managed by BIMC Hospital" |
| `primaryLockup` | upload | main lockup variant |
| `inverseLockup` | upload | inverse lockup variant |
| `clearspaceUnit` | text | e.g. "1x" |
| `minScreenWidthPx` | number | minimum screen width to show |
| `minPrintMmWidth` | number | minimum print width |

#### Footer  (Global · "Footer")

| Field | Type | Notes |
|---|---|---|
| `logoLight` | upload | |
| `linkColumns[].heading` | array → text | column headings |
| `linkColumns[].items[].label` | nested array → text | link labels |
| `linkColumns[].items[].href` | nested array → text | link hrefs |
| `enquirySummary` | richText | bottom-left blurb |
| `addressBlock` | richText | clinic address |
| `copyrightTemplate` | text | `{year}` token substituted |

#### Floating Chrome  (Global · "Floating overlay")

| Field | Type | Notes |
|---|---|---|
| `ctaPill.label` | text | "Plan your treatment" |
| `ctaPill.href` | text | |
| `ctaPill.enabled` | checkbox | |
| `chat.enabled` | checkbox | |
| `chat.provider` | select | chat provider |
| `chat.embedScript` | textarea | provider embed |
| `chat.openOnLoad` | checkbox | |

#### Settings  (Global · "Clinic info")

| Field | Type | Notes |
|---|---|---|
| `siteName` | text | |
| `siteTagline` | text | |
| `defaultOgImage` | upload | global OG fallback |
| `defaultMetaDescription` | textarea | |
| `audToIdrRate` | number | conversion rate |
| `roundIdrTo` | number | rounding granularity for `<PriceTag>` |
| `contactEmail` | text | |
| `contactPhone` | text | |
| `whatsappNumber` | text | |
| `addressLine1` | text | |
| `addressLine2` | text | |
| `city` | text | |
| `postalCode` | text | |
| `country` | text | |
| `hoursMonFri` | text | |
| `hoursSatSun` | text | |
| `googleMapsUrl` | text | embed URL |
| `socialLinks[].platform` | array → select | platform name |
| `socialLinks[].url` | array → text | profile URL |
| `defaultLocale` | select | `en` / `id` |
| `currencyDisplayMode` | select | `idr-only`, `idr-with-aud` |

#### Seo Defaults  (Global · "Meta defaults")

| Field | Type | Notes |
|---|---|---|
| `titlePattern` | text | e.g. `{page} — Cosmedic` |
| `robotsTxt` | textarea | served at `/robots.txt` |
| `sitemapBaseUrl` | text | absolute base for sitemap URLs |
| `organizationSchema` | json | JSON-LD for the Organization |

---

### 5.2 TREATMENTS

#### Disciplines  (Collection · "Discipline grid")

| Field | Type | Notes |
|---|---|---|
| `slug` | text | unique, indexed |
| `title` | text | e.g. "Surgical" |
| `subtitle` | text | |
| `displayCount` | text | e.g. "12 procedures" |
| `hue` | number | brand-palette hue index |
| `body` | richText | overview paragraph |
| `chapterTitle.a` | text | hero line 1 |
| `chapterTitle.b` | text | hero line 2 (italic) |
| `tagline` | text | |
| `lede` | textarea | |
| `overview` | richText | full body |
| `heroImage` | upload | |
| `leadSurgeons[]` | relationship → Surgeons | featured surgeons for this discipline |
| `faqs[].q` | array → text | question |
| `faqs[].a` | array → textarea | answer |
| `seo.*` | group | per-record SEO override |
| `sortOrder` | number | |

#### Sub Categories  (Collection · "Sub-category pages")

| Field | Type | Notes |
|---|---|---|
| `slug` | text | unique, indexed |
| `parent` | relationship → Disciplines | |
| `title` | text | |
| `chapterTitle.a` | text | |
| `chapterTitle.b` | text | |
| `tagline` | text | |
| `lede` | textarea | |
| `intro` | richText | |
| `overview` | richText | |
| `leadSurgeon` | relationship → Surgeons | |
| `sections[].anchorId` | array → text | section anchor |
| `sections[].t` | array → text | section title |
| `sections[].body` | array → richText | section body |
| `faqs[].q` | array → text | |
| `faqs[].a` | array → textarea | |
| `heroImage` | upload | |
| `seo.*` | group | |
| `sortOrder` | number | |

#### Procedures  (Collection · "Procedure rows + unified pricing catalogue")

**Single source of truth for ALL pricing** (your option (a) pick). Holds both the 41 existing editorial surgical procedures AND the ~100 machine/injectable/BTL line items that used to live in separate collections (MachineTreatments / InjectableProducts / HairRemovalAreas). Lightweight items have catalogue fields filled but editorial fields empty.

**Catalogue hierarchy fields** (your "Group / Main Cat / Sub Cat / Description / Price"):

| Field | Type | Notes |
|---|---|---|
| `catalogueGroup` | select | **Group** — `surgical` / `machine` / `injection` / `btl`. Drives which `/pricing` table this row appears in. |
| `mainCategory` | text | **Main Category** — e.g. "Face & Neck" (surgical), "Laser AFT Rejuvenation" (machine), "DERMAL FILLER" (injection), "Upper Body" (btl) |
| `subCategory` | text | **Sub Category** — optional 3rd-level grouping inside Main Category |
| `name` | text | **Description** — line item name (e.g. "Breast Augmentation", "Botox — Forehead", "Half Arm") |
| `shortName` | text | card display variant of name |
| `unit` | text | optional (e.g. "1 ml", "per session", "Face") |
| `priceNotes` | text | parentheticals (e.g. "Local Anesthesia") |
| `pricing.priceIdr2025` | number | historical IDR |
| `pricing.priceAud2025` | number | historical AUD |
| `pricing.priceIdr2026` | number | **Price (current IDR)** |
| `pricing.priceAud2026` | number | **Price (current AUD)** |
| `pricing.priceIdrRangeLow` | number | optional range lower bound |
| `pricing.priceIdrRangeHigh` | number | optional range upper bound |
| `pricing.displayYear` | select | `2025` / `2026` — which price set to display |
| `audienceTier` | select | optional — `standard` / `tourist` / `kitas-ktp` / `package` (Machine 3-tier rows) |
| `featuredRank` | number | optional 1/2/3 "Top 3" highlight |
| `includesImplant` | checkbox | surgical-only flag |
| `brand` | text | injection-only — e.g. "Juvederm" |
| `productLine` | text | injection-only — e.g. "Volux" |
| `manufacturer` | text | injection-only |
| `fdaApproved` | checkbox | injection-only |
| `bodyZone` | select | btl-only — `face` / `upper-body` / `lower-body` / `package` / `other` |

**Editorial fields** (optional — only the 41 full-detail Procedures use these):

| Field | Type | Notes |
|---|---|---|
| `slug` | text | unique, indexed |
| `parentDiscipline` | relationship → Disciplines | editorial site nav (`/treatment-<discipline>`) |
| `parentSubCategory` | relationship → Sub Categories | editorial site nav (`/treatment-<sub>`) |
| `description` | richText | full editorial body |
| `sections[].anchorId` | array → text | |
| `sections[].t` | array → text | |
| `sections[].body` | array → richText | |
| `faqs[].q` | array → text | |
| `faqs[].a` | array → textarea | |
| `surgeonsCredentialed[]` | relationship → Surgeons | |
| `heroImage` | upload | |
| `detail.duration` | text | e.g. "2-3 hrs" |
| `detail.recovery` | text | e.g. "10-14 days" |
| `included[]` | relationship → Inclusion Items | |
| `excluded[]` | relationship → Exclusion Items | |
| `recoveryTimeline[]` | relationship → Journey Steps | |
| `relatedBA[]` | relationship → Before After Cases | |
| `relatedProcedures[]` | relationship → Procedures | |
| `seo.*` | group | per-record SEO override |
| `sortOrder` | number | |

Group-specific fields (`audienceTier`, `brand`, `productLine`, `manufacturer`, `fdaApproved`, `bodyZone`) are conditionally shown in the admin form based on `catalogueGroup`.

#### Inclusion Items  (Collection · "What's included")

| Field | Type | Notes |
|---|---|---|
| `text` | text | inclusion line |
| `scope` | select | which type of procedure this applies to |
| `sortOrder` | number | |

#### Exclusion Items  (Collection · "What's not")

| Field | Type | Notes |
|---|---|---|
| `text` | text | exclusion line |
| `scope` | select | applies to which procedure type |
| `sortOrder` | number | |

#### Treatments Page  (Global · "Hero (/treatments)")

Inherits **PAGE_BASE** only.

---

### 5.3 DOCTORS

#### Surgeons  (Collection · "Surgeons")

| Field | Type | Notes |
|---|---|---|
| `slug` | text | unique, indexed |
| `name` | text | full formal name |
| `commonName` | text | display name |
| `title` | text | e.g. "Dr." |
| `suffix` | text | e.g. "FRACS" |
| `spec` | text | speciality summary |
| `train` | text | training summary |
| `proc` | text | procedure focus |
| `credLine` | text | credentials line |
| `yearsInPractice` | number | |
| `hue` | number | palette hue |
| `group` | select | `plastic-surgery` / `aesthetic-medicine` |
| `lead` | checkbox | featured lead surgeon |
| `bio` | richText | long-form bio |
| `specAreas[].value` | array → text | speciality chips |
| `portrait` | upload | |
| `portraitPosition` | text | CSS object-position |
| `availabilitySchedule[].day` | array → select | |
| `availabilitySchedule[].windowStart` | array → text | |
| `availabilitySchedule[].windowEnd` | array → text | |
| `availabilitySchedule[].byAppointment` | array → checkbox | |
| `languages[].value` | array → text | spoken languages |
| `credentialedProcedures[]` | relationship → Procedures | |
| `seo.*` | group | |
| `sortOrder` | number | |

#### Surgeons Page  (Global · "Hero (/surgeons)")

Inherits **PAGE_BASE** only.

---

### 5.4 RESULTS

#### Before After Cases  (Collection · "Before/After")

| Field | Type | Notes |
|---|---|---|
| `slug` | text | unique, indexed |
| `caseLabel` | text | e.g. "Case 014 — Rhinoplasty" |
| `procedure` | relationship → Procedures | |
| `composite` | upload | single image, left=before, right=after |
| `beforeAlt` | text | a11y |
| `afterAlt` | text | a11y |
| `surgeon` | relationship → Surgeons | |
| `tags[].value` | array → text | category tags |
| `description` | richText | per-case paragraph |
| `year` | number | |
| `isFeatured` | checkbox | promote on home + curated /results set |
| `seo.*` | group | |
| `sortOrder` | number | |

#### Results Page  (Global · "Hero (/results)")

Inherits **PAGE_BASE** only. B&A section frame copy on `/results` lives in `chapterTitle` + `sections[]`.

#### Gallery Page  (Global · "Hero (/gallery)")

Inherits **PAGE_BASE** only. Filter-chip + section copy on `/gallery` lives in `chapterTitle` + `sections[]`.

---

### 5.5 PRICING

> **Note:** All line-item pricing (Surgical / Machine / Injection / BTL) lives on **Procedures** (see §5.2). Procedures is the single source of truth — editor changes any price in one place. PRICING bucket holds only the concierge tier cards + the editorial page frame + the consultation-fee callout.

#### Pricing Tiers  (Collection · "Tier cards")

Concierge packages live separately because they have a different shape (richText descriptor + inclusions[]) and don't fit the line-item hierarchy.

| Field | Type | Notes |
|---|---|---|
| `slug` | text | unique, indexed |
| `name` | text | tier name |
| `descriptor` | richText | tier blurb |
| `priceFromAud` | number | |
| `priceFromIdr` | number | |
| `inclusions[].value` | array → text | included items list |
| `isFeatured` | checkbox | highlight on /pricing |
| `sortOrder` | number | |

#### Pricing Page  (Global · "Hero + Overview + Footnote + Insurance + Payment")

Inherits **PAGE_BASE** and adds:

| Field | Type | Notes |
|---|---|---|
| `overviewBlock.heading` | text | |
| `overviewBlock.body` | richText | |
| `footnoteBlock.text` | richText | |
| `insurancePaymentBlock.heading` | text | |
| `insurancePaymentBlock.body` | richText | |

#### Consultation Policy  (Global · "Callout")

| Field | Type | Notes |
|---|---|---|
| `feeIdr` | number | |
| `feeAud` | number | |
| `waiverConditionText` | textarea | "Waived when booking a procedure" etc. |

---

### 5.6 JOURNEY

#### Journey Steps  (Collection)

| Field | Type | Notes |
|---|---|---|
| `slug` | text | unique, indexed |
| `order` | number | step order |
| `dayLabel` | text | e.g. "Day 1" |
| `title` | text | step title |
| `body` | richText | step body |
| `icon` | upload | step icon |
| `sortOrder` | number | |

#### Stories  (Collection)

| Field | Type | Notes |
|---|---|---|
| `slug` | text | |
| `patientLabel` | text | anonymous label |
| `country` | text | |
| `procedure` | relationship → Procedures | |
| `portrait` | upload | |
| `quote` | text | pull quote |
| `body` | richText | full story |
| `videoUrl` | text | optional video embed |
| `year` | number | |
| `surgeon` | relationship → Surgeons | |
| `isFeatured` | checkbox | promote on home Stories teaser |
| `seo.*` | group | |
| `sortOrder` | number | |

#### Recovery Stays  (Collection)

| Field | Type | Notes |
|---|---|---|
| `slug` | text | |
| `name` | text | villa name |
| `location` | text | e.g. "Seminyak" |
| `heroImage` | upload | |
| `gallery[].image` | array → upload | |
| `descriptor` | richText | |
| `amenities[].value` | array → text | amenity list |
| `priceFromAudPerNight` | number | |
| `priceFromIdrPerNight` | number | |
| `partnerUrl` | text | external booking link |
| `geo.lat` | number | |
| `geo.lng` | number | |
| `seo.*` | group | |
| `sortOrder` | number | |

#### Blog Posts  (Collection)

| Field | Type | Notes |
|---|---|---|
| `slug` | text | |
| `title` | text | |
| `lede` | textarea | |
| `body` | richText | |
| `heroImage` | upload | |
| `author` | relationship → Authors | |
| `publishedAt` | date | |
| `tags[]` | relationship → Blog Tags | |
| `readingTimeMinutes` | number | auto-computed |
| `seo.*` | group | |
| `publishStatus` | select | draft/published/scheduled |
| `sortOrder` | number | |

#### Blog Tags  (Collection)

| Field | Type | Notes |
|---|---|---|
| `slug` | text | |
| `name` | text | |
| `description` | textarea | |

#### Authors  (Collection)

| Field | Type | Notes |
|---|---|---|
| `slug` | text | |
| `name` | text | |
| `role` | text | |
| `bio` | richText | |
| `portrait` | upload | |
| `surgeonProfile` | relationship → Surgeons | optional link if author is also a surgeon |

#### Journey Page / Stories Page / Recovery Stays Page / Blog Page  (Globals)

Each inherits **PAGE_BASE** only.

---

### 5.7 CONTACT

#### Enquiries  (Collection)

| Field | Type | Notes |
|---|---|---|
| `name` | text | required |
| `email` | text | required |
| `phone` | text | |
| `country` | text | |
| `treatmentInterest` | relationship → Procedures | |
| `treatmentInterestText` | text | free-text fallback |
| `preferredDate` | date | |
| `message` | textarea | |
| `sourcePage` | text | where the form was submitted |
| `sourceCta` | text | which CTA fed the submission |
| `status` | select | `new` / `contacted` / `scheduled` / `converted` / `closed` / `spam` |
| `assignedTo` | relationship → Users | |
| `internalNotes[].at` | array → date | auto-stamped |
| `internalNotes[].by` | array → relationship → Users | |
| `internalNotes[].text` | array → textarea | |
| `submittedAt` | date | readOnly |
| `ip` | text | readOnly |
| `userAgent` | text | readOnly |
| `honeypot` | text | hidden — bot trap |

#### Contact Page  (Global · "Hero (/contact)")

Inherits **PAGE_BASE** only.

#### Form Defaults  (Global · "Form copy")

| Field | Type | Notes |
|---|---|---|
| `labels.name` | text | |
| `labels.email` | text | |
| `labels.phone` | text | |
| `labels.country` | text | |
| `labels.treatment` | text | |
| `labels.message` | text | |
| `placeholders.name` | text | |
| `placeholders.email` | text | |
| `placeholders.phone` | text | |
| `placeholders.country` | text | |
| `placeholders.treatment` | text | |
| `placeholders.message` | text | |
| `submitLabel` | text | |
| `successMessage` | textarea | |
| `errorMessage` | textarea | |
| `rateLimitMessage` | textarea | |

#### Email Templates  (Global · "Outbound mail")

| Field | Type | Notes |
|---|---|---|
| `templates[].id` | array → text | template key |
| `templates[].subject` | array → text | email subject |
| `templates[].bodyMjml` | array → textarea | MJML body |
| `templates[].locale` | array → select | en / id |

#### Video Consult Page  (Global · "Hero (/video-consult)")

Inherits **PAGE_BASE** only.

---

### 5.8 MEDIA

#### Media  (Collection · "Media library")

| Field | Type | Notes |
|---|---|---|
| `filename` | text | auto-generated on upload |
| `url` | text | auto-generated |
| `alt` | text | **required** by `media.beforeValidate` hook (a11y / SEO) |
| `caption` | text | |
| `mimeType` | text | auto-detected |
| `sizes.sm` | auto-variant | 480w webp |
| `sizes.md` | auto-variant | 768w webp |
| `sizes.lg` | auto-variant | 1280w webp |
| `sizes.xl` | auto-variant | 1920w webp |
| `sizes.xxl` | auto-variant | 2560w webp |
| `folder` | folder | media-library folder |
| `category` | select | `homepage` / `treatments` / `doctors` / `results` / `pricing` / `journey` / `contact` / `blog` / `uncategorised` |
