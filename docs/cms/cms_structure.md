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

> Updated 2026-05-27: No standalone Pricing bucket — changes08-A merged 9 Pricing globals into Treatments. About bucket added (25.18) — Blog/Press/Privacy items live there.

| # | Bucket | Mirrors on the site | Collections | Globals |
|---|---|---|---|---|
| 0 | *(ungrouped)* | admin login only | 1 (Users) | 0 |
| 1 | **Homepage** | `/` + shell on every page | 0 | 18 (Home Page + 10 section globals + Brand Stats + Header + Footer + Floating Chrome + Endorsement Mark + Settings + SEO Defaults) |
| 2 | **Treatments** | `/treatments` + `/treatments/{disc}` + `/treatments/{disc}/{sub}` + `/pricing` | 3 (Disciplines · Sub-Categories · Procedures) | 15 (Treatments Page · Hero · Index · Stats · Discipline Template · Sub-Category Template · Pricing: Page · Pricing: Hero · Overview · Footnote · Insurance · Payment · Catalogue View · Discipline List View · Consultation) |
| 3 | **Doctors** | `/surgeons` + `/surgeons/{slug}` | 1 (Surgeons) | 6 (Surgeons Page · Hero · Lead View · Plastic Surgery View · Aesthetic Medicine View · Surgeon Detail Template) |
| 4 | **Results** | `/results` + `/gallery` + `/stories` | 2 (Before After Cases · Patient Stories) | 8 (Results Page · Results Hero · Gallery Page · Stories Page · Library CTA · Share CTA · Featured Cases View · Stories View) |
| 5 | **Journey** | `/journey` + `/recovery-stays` | 2 (Journey Steps · Recovery Stays) | 4 (Journey Page · Journey Hero · Journey Stats · Recovery Stays Page) |
| 6 | **Contact** | `/contact` + `/video-consult` + outbound mail + AI chat | 2 (Enquiries · Analytics) | 7 (Contact Page · Contact Hero · Enquiry Section · Visit Section · Form Defaults · Email Templates · Video Consult Page) |
| 7 | **About** | `/press` + `/blog` + `/blog/{slug}` + `/privacy` + 404 | 6 (Blog Posts · Blog Tags · Authors · Press Mentions · Awards · Privacy Sections) | 5 (Blog Page · Blog Post Template · Press Page · Privacy Page · Not Found Page) |
| 8 | **Media** | Every image / video / PDF | 1 (Media) | 0 |

---

## 3. Entities — full list, one row per Entity

| Bucket | Type | Section Label | Entity | Renders on |
|---|---|---|---|---|
| *(ungrouped)* | Collection | — | Users | admin login only |
| Homepage | Global | Hero + 10 sections (/) | Home Page | `/` |
| Homepage | Global | TrustStrip | Brand Stats | every page |
| Homepage | Global | Top nav | Header | every page |
| Homepage | Global | Footer | Footer | every page |
| Homepage | Global | Floating overlay | Floating Chrome | every page |
| Homepage | Global | Header endorsement | Endorsement Mark | every page |
| Homepage | Global | Clinic info | Settings | every page |
| Homepage | Global | Meta defaults | SEO Defaults | every page meta head |
| Treatments | Collection | Discipline grid | Disciplines | `/treatments` cards, discipline detail pages, mega-menu, footer |
| Treatments | Collection | Sub-category pages | Sub-Categories | `/treatments/{disc}/{sub}`, mega-menu items |
| Treatments | Collection | Procedure rows + **unified pricing catalogue** | Procedures | procedure detail pages, sub-cat lists, home pricing teaser, every `/pricing` table row |
| Treatments | Global | Hero (/treatments) | Treatments Page | `/treatments` |
| Treatments | Global | Pricing page frame | Pricing: Page | `/pricing` |
| Treatments | Global | Pricing hero | Pricing: Hero | `/pricing` |
| Treatments | Global | Pricing overview | Overview | `/pricing` |
| Treatments | Global | Pricing footnote | Footnote | `/pricing` |
| Treatments | Global | Insurance info | Insurance | `/pricing` |
| Treatments | Global | Payment info | Payment | `/pricing` |
| Treatments | Global | Catalogue display | Catalogue View | `/pricing` |
| Treatments | Global | Discipline list display | Discipline List View | `/pricing` |
| Treatments | Global | Consultation fee callout | Consultation | `/pricing` + `/contact` + every procedure detail |
| Doctors | Collection | Surgeons/Experts | Surgeons | `/surgeons` (nav: Experts), `/surgeons/{slug}`, home strip, mega-menu, footer |
| Doctors | Global | Hero (/surgeons) | Surgeons Page | `/surgeons` |
| Doctors | Global | Surgeons lead view | Lead View | `/surgeons` |
| Doctors | Global | Plastic Surgery section | Plastic Surgery View | `/surgeons` |
| Doctors | Global | Aesthetic Medicine section | Aesthetic Medicine View | `/surgeons` |
| Doctors | Global | Surgeon detail template | Surgeon Detail Template | `/surgeons/{slug}` |
| Results | Collection | Before/After | Before After Cases | `/gallery`, `/results` featured, home Gallery teaser |
| Results | Collection | Patient testimonials | Patient Stories | `/stories`, home Stories teaser |
| Results | Global | Hero (/results) | Results Page | `/results` |
| Results | Global | Hero (/gallery) | Gallery Page | `/gallery` |
| Results | Global | Hero (/stories) | Stories Page | `/stories` |
| Journey | Collection | Journey steps | Journey Steps | `/journey` step list |
| Journey | Collection | Recovery villas | Recovery Stays | `/recovery-stays` villa cards |
| Journey | Global | Hero (/journey) | Journey Page | `/journey` |
| Journey | Global | Recovery stays page | Recovery Stays Page | `/recovery-stays` |
| Contact | Collection | Form submissions | Enquiries | admin-only view |
| Contact | Collection | Ask The Doctor log | Analytics | admin-only view |
| Contact | Global | Hero (/contact) | Contact Page | `/contact` |
| Contact | Global | Enquiry section | Enquiry Section | `/contact` |
| Contact | Global | Visit + map section | Visit Section | `/contact` |
| Contact | Global | Form copy | Form Defaults | every form on the site |
| Contact | Global | Outbound mail | Email Templates | clinic notify + autoresponder |
| Contact | Global | Hero (/video-consult) | Video Consult Page | `/video-consult` |
| About | Collection | Blog posts | Blog Posts | `/blog` index, `/blog/{slug}` detail |
| About | Collection | Blog tags | Blog Tags | `/blog` filter chips |
| About | Collection | Blog authors | Authors | `/blog/{slug}` byline |
| About | Collection | Press mentions | Press Mentions | `/press` |
| About | Collection | Awards / accreditations | Awards | `/press` awards section |
| About | Collection | Privacy sections | Privacy Sections | `/privacy` |
| About | Global | Hero (/blog) | Blog Page | `/blog` |
| About | Global | Blog post template | Blog Post Template | `/blog/{slug}` |
| About | Global | Hero (/press) | Press Page | `/press` |
| About | Global | Hero (/privacy) | Privacy Page | `/privacy` |
| About | Global | 404 page | Not Found Page | `/404` and unknown routes |
| Media | Collection | Media library | Media | every image / video / PDF |

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

### 5.5 TREATMENTS (Pricing globals — formerly PRICING bucket)

> **Note (changes08-A, 2026-05-27):** The standalone Pricing bucket was eliminated. All 9 pricing-related globals were moved to the Treatments bucket with "Pricing: " prefixes where needed to avoid collisions. The `PricingTiers` collection was removed in q5. All price data lives on **Procedures** (see §5.2).

#### Pricing: Page  (Global · now in Treatments · "Pricing page frame")

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

> **Note:** Stories collection moved to Results bucket (2026-05-27). Blog Posts/Tags/Authors moved to About bucket.

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

#### Journey Page / Recovery Stays Page  (Globals)

Each inherits **PAGE_BASE** only.

> Stories Page and Blog Page have moved to Results and About buckets respectively.

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

### 5.7b ABOUT (new bucket, 2026-05-27)

> Contains Blog Posts/Tags/Authors, Press Mentions, Awards, and Privacy Sections — all previously scattered across Journey and Homepage buckets.

#### Blog Posts / Blog Tags / Authors — see §5.6 (fields unchanged, bucket changed to About)

#### Press Mentions — see §5.1 fields (bucket changed from Homepage to About)

#### Awards — see §5.1 fields (bucket changed from Homepage to About)

#### Privacy Sections  (Collection)

| Field | Type | Notes |
|---|---|---|
| `slug` | text | unique, indexed |
| `title` | text | section heading |
| `paragraphs[].body` | array → richText | body paragraphs |
| `listItems[].text` | array → text | optional bullet list |
| `sortOrder` | number | |

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
