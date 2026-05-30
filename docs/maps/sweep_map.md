# CMS Visibility Sweep Map
**Created:** 2026-05-30 | **Rule:** Titles, Paragraphs/Text, Images must never be hidden from editors. Only structural/technical fields (slugs, hrefs, breadcrumbs, hues, success states, legacy) may stay hidden.

---

## The 52 Routes

### Static (14)
| # | Route | Kind |
|---|---|---|
| 1 | `/` | home |
| 2 | `/procedures` | treatments-index |
| 3 | `/experts` | surgeons-index |
| 4 | `/results` | results |
| 5 | `/gallery` | gallery |
| 6 | `/stories` | stories |
| 7 | `/journey` | journey |
| 8 | `/pricing` | pricing |
| 9 | `/recovery-stays` | recovery-stays |
| 10 | `/press` | press |
| 11 | `/contact` | contact |
| 12 | `/video-consult` | video-consult |
| 13 | `/blog` | blog-index |
| 14 | `/privacy` | privacy |

### Discipline Pages (6)
| # | Route |
|---|---|
| 15 | `/procedures/surgical` |
| 16 | `/procedures/reconstructive` |
| 17 | `/procedures/non-surgical` |
| 18 | `/procedures/hair` |
| 19 | `/procedures/dental` |
| 20 | `/procedures/weight-loss` |

### Sub-Category Pages (21)
| # | Route |
|---|---|
| 21 | `/procedures/surgical/face-neck` |
| 22 | `/procedures/surgical/surgical-body` |
| 23 | `/procedures/surgical/surgical-breast` |
| 24 | `/procedures/surgical/surgical-eyelid` |
| 25 | `/procedures/surgical/surgical-arm` |
| 26 | `/procedures/surgical/rhinoplasty` |
| 27 | `/procedures/surgical/surgical-others` |
| 28 | `/procedures/reconstructive/reconstructive-breast` |
| 29 | `/procedures/reconstructive/reconstructive-trauma` |
| 30 | `/procedures/reconstructive/reconstructive-craniofacial` |
| 31 | `/procedures/non-surgical/injectable` |
| 32 | `/procedures/non-surgical/non-injectable` |
| 33 | `/procedures/non-surgical/nonsurgical-others` |
| 34 | `/procedures/hair/hair-fue` |
| 35 | `/procedures/hair/hair-therapy` |
| 36 | `/procedures/dental/dental-veneers` |
| 37 | `/procedures/dental/dental-alignment` |
| 38 | `/procedures/dental/dental-whitening` |
| 39 | `/procedures/weight-loss/weight-loss-medical` |
| 40 | `/procedures/weight-loss/weight-loss-endoscopic` |
| 41 | `/procedures/weight-loss/weight-loss-surgical` |

### Surgeon Detail Pages (8)
| # | Route |
|---|---|
| 42 | `/experts/suka` |
| 43 | `/experts/astri` |
| 44 | `/experts/indra` |
| 45 | `/experts/wara` |
| 46 | `/experts/sissy` |
| 47 | `/experts/rosa` |
| 48 | `/experts/risma` |
| 49 | `/experts/theresia` |

### Blog Post Pages (5 live + growing)
| # | Route |
|---|---|
| 50 | `/blog/the-quiet-rhinoplasty` |
| 51 | `/blog/before-you-fly` |
| 52 | `/blog/the-villa-protocol` |
| +  | `/blog/fillers-restraint` |
| +  | `/blog/achsi-what-it-means` |

---

## The 10 Sweep Levels

For every route, check each layer in order:

### L1 — Page Hero Global
The ChapterOpener at the top of every page.

| Routes | Global slug | Fields to check |
|---|---|---|
| `/` | `home-hero` | title.a, title.b, lede, heroImage, primaryCtaLabel |
| `/procedures` | `treatments-hero` | titleA, titleB, lede, heroImage |
| `/experts` | `surgeons-hero` | title.a, title.b, lede, heroImage |
| `/results` | `results-hero` | title.a, title.b, lede, heroImage |
| `/gallery` | `gallery-page` | imageLabel, breadcrumbLabel |
| `/stories` | `stories-page` | imageLabel, breadcrumbLabel |
| `/journey` | `journey-hero` | title.a, title.b, lede, heroImage |
| `/pricing` | `pricing-hero` | titleA, titleB, lede, heroImage |
| `/recovery-stays` | `recovery-stays-page` → hero group | title.a, title.b, lede, heroImage |
| `/press` | `press-page` | chapter_title, tagline, lede, heroImage |
| `/contact` | `contact-hero` | title.a, title.b, lede, heroImage |
| `/video-consult` | `vid-consult-pg` | chapter_title, tagline, lede |
| `/blog` | `blog-page` | chapter_title, tagline, lede |
| `/privacy` | `privacy-page` | chapter_title, tagline, lede |
| `/procedures/{discipline}` | `discipline` record | chapterTitle.a/b, tagline, lede, heroImage |
| `/procedures/{d}/{sub}` | `sub-category` record | chapterTitle.a/b, tagline, lede, heroImage |
| `/experts/{slug}` | `surgeon` record | portrait, name, spec |

---

### L2 — Page Section Globals
Named section globals that control specific content blocks.

| Page | Global slug | Heading | Paragraph | Image |
|---|---|---|---|---|
| `/` | `home-intro` | pullQuoteBefore/Accent/After | col1, col2 | — |
| `/` | `home-treatments-view` | heading.a/b | lede | — |
| `/` | `home-pricing-view` | heading.a/b | lede, footnote | — |
| `/` | `home-surgeons-view` | teamCaption | leadBody | groupPhoto |
| `/` | `home-gallery-view` | heading.a/b | lede | — |
| `/` | `home-lead-magnet` | heading.a/b | lede | coverImage |
| `/` | `home-journey-view` | heading.a/b | — | — |
| `/` | `home-stories-view` | heading.a/b | lede | — |
| `/` | `home-place` | heading.a/b | body | image |
| `/` | `brand-stats` | — | — | — |
| `/experts` | `surgeons-lead-view` | sectionEyebrow, blockEyebrow | — | — |
| `/experts` | `surgeons-plastic-view` | heading.a/b, headingItalic | lede | — |
| `/experts` | `surgeons-aesthetic-view` | heading.a/b, headingItalic | lede | — |
| `/results` | `results-featured-cases-view` | headingPre, headingItalic | lede | — |
| `/results` | `results-stories-view` | headingPre, headingItalic | lede | — |
| `/results`, `/gallery` | `library-cta` | headingPre/Italic | body | — |
| `/results`, `/stories` | `share-cta` (in library-cta) | headingPre/Italic | body | — |
| `/pricing` | `pricing-overview` | heading.a/b | body | — |
| `/pricing` | `pricing-footnote` | — | text | — |
| `/pricing` | `pricing-insurance` | headingRoman, headingItalic | body | — |
| `/pricing` | `pricing-payment` | headingRoman, headingItalic | termsText | — |
| `/pricing` | `pricing-discipline-list-view` | sectionEyebrow | — | — |
| `/pricing` | `pricing-catalogue-view` | headingRoman, headingItalic | introTemplate | — |
| `/journey` | `journey-stats` | — | stats.label | — |
| `/recovery-stays` | `recovery-stays-page` → portfolioSection | headingItalic, headingPost | lede | — |
| `/contact` | `contact-enquiry-section` | headingPre, headingItalic | intro, trustLine | — |
| `/contact` | `contact-visit-section` | headingPre, headingItalic | body, conciergeHoursValue | mapImage |

---

### L3 — Primary Collection Records
The collection rows that populate cards, grids, and page content.

| Page(s) | Collection | Fields to check |
|---|---|---|
| `/procedures` | `disciplines` (6 records) | title, subtitle, body, heroImage |
| `/procedures/{d}` | `disciplines` record | title, tagline, lede, overview, chapterTitle, heroImage, faqs |
| `/procedures/{d}/{sub}` | `sub-categories` record | title, tagline, lede, intro, overview, sections, faqs, heroImage |
| `/procedures/{d}/{sub}` | `procedures` records | name, shortName, description, sections, faqs, detail.*, heroImage |
| `/experts` | `surgeons` (8 records) | name, spec, bio, specAreas, portrait |
| `/experts/{slug}` | `surgeon` record | name, spec, train, proc, bio, specAreas, portrait |
| `/results`, `/gallery` | `before-after-cases` | caseLabel, beforeAlt, afterAlt, description, composite |
| `/results`, `/stories` | `stories` | patientLabel, quote, body, portrait |
| `/journey` | `journey-steps` | title, body, bullets, image |
| `/recovery-stays` | `recovery-stays` | name, body, amenities, heroImage |
| `/press` | `press-mentions` | headline, summary, logo |
| `/press` | `awards` | name, issuer, summary, logo |
| `/blog` | `blog-posts` | title, lede, heroImage |
| `/blog/{slug}` | `blog-posts` record | title, lede, body, heroImage |

---

### L4 — Array Fields within Collections
Sub-tables that render as lists/accordions on the page.

| Collection | Array | Fields inside |
|---|---|---|
| `disciplines` | `faqs[]` | q (question), a (answer) |
| `sub-categories` | `sections[]` | t (heading), body (richText) |
| `sub-categories` | `faqs[]` | q, a |
| `procedures` | `sections[]` | t (heading), body (richText) |
| `procedures` | `faqs[]` | q, a |
| `procedures` | `detail.included[]` | value (bullet text) |
| `surgeons` | `specAreas[]` | value (chip text) |
| `journey-steps` | `bullets[]` | text |
| `recovery-stays` | `amenities[]` | value |
| `brand-stats` | `stats[]` | number, label |
| `journey-stats` | `stats[]` | number, label |

---

### L5 — Template Globals
Shared chrome strings used across multiple similar pages.

| Pages | Global slug | Key editorial fields |
|---|---|---|
| All 6 `/procedures/{d}` | `discipline-detail-template` | toc labels, overview heading, chooseAFocus heading/body, procedures heading/intro, faqs heading, related heading/lede |
| All 21 `/procedures/{d}/{sub}` | `sub-category-detail-template` | toc labels, takeAStep heading/CTAs/replyLine, overview heading, treatments heading/intro, faqs heading |
| All 8 `/experts/{slug}` | `surgeon-detail-template` | heroLeadLabel, statLabels, sidebarLabels, facultyHeading, specialtyHeading, trainingLabels, biographyEyebrow, secondaryBioParagraph |
| All `/blog/{slug}` | `blog-post-template` | (labels and chrome for blog detail) |

---

### L6 — Section Globals Hidden at Global Level
These entire globals are `hidden: true` — editors cannot reach them.

| Global slug | Label | Controls | Status |
|---|---|---|---|
| `surgeons-aesthetic-view` | Aesthetic Medicine View | "Quiet non-surgical." + lede on /experts | ❌ hidden |
| `surgeons-plastic-view` | Plastic Surgery View | Plastic Surgery heading + lede on /experts | ❌ hidden |
| `surgeons-lead-view` | Lead View | Lead Surgeon section eyebrows on /experts | ❌ hidden |
| `home-intro` | Intro | "Our Approach" pull-quote + col1/col2 paragraphs on / | ❌ hidden |
| `home-journey-view` | Journey View | "From enquiry to homecoming" heading on / | ❌ hidden |
| `treatments-index-section` | Index | "Browse by discipline" heading + lede on /procedures | ❌ hidden |
| `treatments-stats` | Stats | Stat strip labels on /procedures | ❌ hidden |
| `endorsement-mark` | Endorsement | "Managed by BIMC Hospital" text on every page | ❌ hidden |
| `floating-chrome` | Floating CTA | "Plan your treatment" pill on every page | ❌ hidden |
| `consultation-policy` | Consultation | Waiver text on /pricing | ❌ hidden |
| `seo-defaults` | SEO Defaults | titlePattern, robots.txt | OK to keep hidden |
| `form-defaults` | Form | All form label defaults | OK to keep hidden |

---

### L7 — Shared Chrome Globals (every page)
| Global | Controls | Status |
|---|---|---|
| `floating-chrome` | "Plan your treatment" CTA pill | ❌ hidden |
| `endorsement-mark` | "Managed by BIMC Hospital" line | ❌ hidden |
| `brand-stats` | Trust strip on / | hidden at global level |

---

### L8 — Settings Global (every page)
| Field | Renders on web |
|---|---|
| `siteName` | `<title>` tags, footer copyright |
| `contactEmail` | /contact Direct lines |
| `contactPhone` | /contact Direct lines |
| `whatsappNumber` | Floating WhatsApp + /contact |
| `addressLine1/2`, `city` | /contact Visit section, footer |
| `hoursMonFri`, `hoursSatSun` | /contact Hours |
| `googleMapsUrl` | /contact map CTAs |
| `audToIdrRate` | Every pricing figure on every page |

---

### L9 — Web Hardcoded Fallbacks
Values in `.tsx` files used when the CMS field is empty. These **bypass the CMS entirely** — editors cannot change them.

| Route | File | Hardcoded text |
|---|---|---|
| `/experts` | `SurgeonsIndex.tsx:42-44` | "Quiet non-surgical." + lede (overridden by SurgeonsAestheticView if populated) |
| `/experts` | `SurgeonsIndex.tsx` | Plastic Surgery heading (overridden by SurgeonsPlasticView if populated) |
| `/results` | `ResultsPage.tsx:20` | `{ title: { a: 'Quietly', b: 'transformative.' } }` |
| `/gallery` | `GalleryPage.tsx:17` | `{ titleA: 'Quietly', ... }` |
| Various | Multiple `.tsx` | defaultValue strings throughout |

---

### L10 — Header / Footer (every page)
| Global | Status | Editorial fields |
|---|---|---|
| `header` | ❌ hidden at global level | `navItems[].label`, mega-menu headings/labels |
| `footer` | ❌ hidden at global level | `brandTagline`, `newsletter.label`, `linkColumns[].heading`, `linkColumns[].items[].label` |

---

## Violation Summary (pre-sweep)

| Level | Global / Collection | Field | Status |
|---|---|---|---|
| L2 | `surgeons-aesthetic-view` | lede, heading | ❌ global hidden |
| L2 | `surgeons-plastic-view` | lede, heading | ❌ global hidden |
| L2 | `surgeons-lead-view` | sectionEyebrow, blockEyebrow | ❌ global hidden |
| L2 | `home-intro` | pullQuote, col1, col2 | ❌ global hidden |
| L2 | `home-journey-view` | heading, ctaLabel | ❌ global hidden |
| L2 | `treatments-index-section` | heading, lede | ❌ global hidden |
| L2 | `treatments-stats` | stats.label | ❌ global hidden |
| L2 | `endorsement-mark` | endorsementLine | ❌ global hidden |
| L2 | `floating-chrome` | ctaPill.label | ❌ global hidden |
| L2 | `consultation-policy` | waiverConditionText | ❌ global hidden |
| L10 | `header` | navItems[].label, megaMenu headings | ❌ global hidden |
| L10 | `footer` | brandTagline, newsletter, linkColumns | ❌ global hidden |

---

## Already Fixed (this session)

| Global / Collection | Fields fixed |
|---|---|
| HomeHero | lede unhidden |
| HomeTreatmentsView | global unhidden, renamed |
| HomePricingView | global unhidden, renamed |
| HomeStoriesView | global unhidden, renamed |
| HomeGalleryView | global unhidden, renamed |
| HomePlace | rows unhidden |
| TreatmentsHero | lede unhidden |
| PricingHero | lede unhidden |
| ResultsHero | lede unhidden |
| SurgeonsHero | lede unhidden |
| JourneyHero | lede unhidden |
| ContactHero | lede unhidden |
| Sub-Categories | intro, overview, sections, faqs unhidden |
| (MIB) Procedures | description, sections, faqs unhidden |
| Blog Posts | lede unhidden |
