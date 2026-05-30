# EN / ID Translation Audit — cosmedic.gaiada.online
**Date:** 2026-05-30 | **Auditor:** Claude Code (live HTTP fetch, HTML text extraction)
**Method:** Fetched all 56 EN + 56 ID routes, stripped scripts/styles, compared h1/h2/h3/h4/p/button text nodes positionally. "Translated" = ID text differs from EN text.

---

## Summary

| | Count | Fields | Translated | Coverage |
|---|:---:|:---:|:---:|:---:|
| Static pages | 14 | 930 | 339 | **36.5%** |
| Discipline pages | 6 | 201 | 0 | **0%** |
| Sub-category pages | 21 | 983 | 0 | **0%** |
| Surgeon profiles | 8 | 176 | 0 | **0%** |
| Blog posts | 7 | 127 | 0 | **0%** |
| **GRAND TOTAL** | **56** | **2,417** | **339** | **14%** |

**51 of 56 routes: 0% translated.**
**5 of 56 routes: partially translated.**

---

## Route-by-Route Table

| # | Route | H1 | H2 | H3/H4 | P | BTN | % | Notes |
|---|---|:---:|:---:|:---:|:---:|:---:|:---:|---|
| 1 | / | 1/1 ✓ | 0/9 | 0/7 | 2/36 | 1/5 | 7% | Hero H1 + 2 paras + 1 button translated; 9 section H2s, all H3 discipline names, 34 paras untranslated |
| 2 | /procedures | 0/1 | 0/2 | 0/6 | 0/18 | 0/2 | 0% | Fully untranslated |
| 3 | /experts | 0/1 | 0/4 | 0/0 | 0/9 | 0/2 | 0% | Fully untranslated |
| 4 | /results | 0/1 | 0/3 | 0/2 | 0/9 | 0/2 | 0% | Fully untranslated |
| 5 | /gallery | 0/1 | 0/2 | 0/0 | 0/6 | 0/2 | 0% | Fully untranslated |
| 6 | /stories | 0/1 | 0/2 | 0/0 | 0/6 | 0/2 | 0% | Fully untranslated |
| 7 | /journey | 0/1 | 7/8 | 0/0 | 7/12 | 0/2 | 61% | 7 step labels + bodies translated; H1 + footer CTAs untranslated |
| 8 | /pricing | 0/1 | 0/15 | 17/48 | 4/152 | 17/50 | 56% | 261/269 procedure H4 names translated; section H2s, sub-group H3s, paras untranslated |
| 9 | /recovery-stays | 0/1 | 0/3 | 0/6 | 6/21 | 0/2 | 15% | 6 villa descriptions translated; H1/H2/H3, villa names, amenities untranslated |
| 10 | /press | 0/1 | 0/3 | 0/0 | 8/15 | 0/3 | 42% | Award/credential full names translated; H1/H2, acronyms, section labels untranslated |
| 11 | /contact | 0/1 | 0/2 | 0/0 | 0/10 | 0/10 | 0% | Fully untranslated |
| 12 | /video-consult | 0/1 | 0/1 | 0/0 | 0/10 | 0/19 | 0% | Fully untranslated |
| 13 | /blog | 0/1 | 0/3 | 0/6 | 0/13 | 0/9 | 0% | Fully untranslated |
| 14 | /privacy | 0/1 | 0/2 | 0/10 | 0/18 | 0/2 | 0% | Fully untranslated |
| 15 | /procedures/surgical | 0/1 | 0/5 | 0/7 | 0/18 | 0/6 | 0% | |
| 16 | /procedures/reconstructive | 0/1 | 0/5 | 0/3 | 0/14 | 0/6 | 0% | |
| 17 | /procedures/non-surgical | 0/1 | 0/5 | 0/3 | 0/14 | 0/6 | 0% | |
| 18 | /procedures/hair | 0/1 | 0/5 | 0/2 | 0/13 | 0/5 | 0% | |
| 19 | /procedures/dental | 0/1 | 0/5 | 0/3 | 0/14 | 0/5 | 0% | |
| 20 | /procedures/weight-loss | 0/1 | 0/5 | 0/3 | 0/14 | 0/5 | 0% | |
| 21 | /procedures/surgical/face-neck | 0/1 | 0/7 | 0/0 | 0/35 | 0/11 | 0% | |
| 22 | /procedures/surgical/rhinoplasty | 0/1 | 0/3 | 0/0 | 0/7 | 0/2 | 0% | |
| 23 | /procedures/surgical/surgical-arm | 0/1 | 0/3 | 0/0 | 0/7 | 0/2 | 0% | |
| 24 | /procedures/surgical/surgical-body | 0/1 | 0/7 | 0/0 | 0/31 | 0/10 | 0% | |
| 25 | /procedures/surgical/surgical-breast | 0/1 | 0/8 | 0/0 | 0/40 | 0/13 | 0% | |
| 26 | /procedures/surgical/surgical-eyelid | 0/1 | 0/3 | 0/0 | 0/7 | 0/2 | 0% | |
| 27 | /procedures/surgical/surgical-others | 0/1 | 0/3 | 0/0 | 0/7 | 0/2 | 0% | |
| 28 | /procedures/reconstructive/reconstructive-breast | 0/1 | 0/7 | 0/0 | 0/35 | 0/11 | 0% | |
| 29 | /procedures/reconstructive/reconstructive-craniofacial | 0/1 | 0/7 | 0/0 | 0/35 | 0/11 | 0% | |
| 30 | /procedures/reconstructive/reconstructive-trauma | 0/1 | 0/7 | 0/0 | 0/31 | 0/10 | 0% | |
| 31 | /procedures/non-surgical/injectable | 0/1 | 0/7 | 0/0 | 0/35 | 0/11 | 0% | |
| 32 | /procedures/non-surgical/non-injectable | 0/1 | 0/7 | 0/0 | 0/31 | 0/10 | 0% | |
| 33 | /procedures/non-surgical/nonsurgical-others | 0/1 | 0/7 | 0/0 | 0/27 | 0/9 | 0% | |
| 34 | /procedures/hair/hair-fue | 0/1 | 0/7 | 0/0 | 0/31 | 0/10 | 0% | |
| 35 | /procedures/hair/hair-therapy | 0/1 | 0/7 | 0/0 | 0/27 | 0/9 | 0% | |
| 36 | /procedures/dental/dental-alignment | 0/1 | 0/7 | 0/0 | 0/27 | 0/9 | 0% | |
| 37 | /procedures/dental/dental-veneers | 0/1 | 0/7 | 0/0 | 0/27 | 0/9 | 0% | |
| 38 | /procedures/dental/dental-whitening | 0/1 | 0/7 | 0/0 | 0/27 | 0/9 | 0% | |
| 39 | /procedures/weight-loss/weight-loss-endoscopic | 0/1 | 0/7 | 0/0 | 0/27 | 0/9 | 0% | |
| 40 | /procedures/weight-loss/weight-loss-medical | 0/1 | 0/7 | 0/0 | 0/26 | 0/10 | 0% | |
| 41 | /procedures/weight-loss/weight-loss-surgical | 0/1 | 0/7 | 0/0 | 0/27 | 0/9 | 0% | |
| 42 | /experts/suka | 0/1 | 0/3 | 0/0 | 0/8 | 0/2 | 0% | |
| 43 | /experts/astri | 0/1 | 0/3 | 0/0 | 0/8 | 0/2 | 0% | |
| 44 | /experts/indra | 0/1 | 0/3 | 0/0 | 0/8 | 0/2 | 0% | |
| 45 | /experts/wara | 0/1 | 0/3 | 0/0 | 0/8 | 0/2 | 0% | |
| 46 | /experts/sissy | 0/1 | 0/3 | 0/0 | 0/8 | 0/2 | 0% | |
| 47 | /experts/rosa | 0/1 | 0/3 | 0/0 | 0/8 | 0/2 | 0% | |
| 48 | /experts/risma | 0/1 | 0/3 | 0/0 | 0/8 | 0/2 | 0% | |
| 49 | /experts/theresia | 0/1 | 0/3 | 0/0 | 0/8 | 0/2 | 0% | |
| 50 | /blog/the-quiet-rhinoplasty | 0/1 | 0/2 | 0/9 | 0/17 | 0/2 | 0% | |
| 51 | /blog/before-you-fly | 0/1 | 0/2 | 0/3 | 0/8 | 0/2 | 0% | |
| 52 | /blog/the-villa-protocol | 0/1 | 0/2 | 0/3 | 0/8 | 0/2 | 0% | |
| 53 | /blog/fillers-restraint | 0/1 | 0/2 | 0/3 | 0/8 | 0/2 | 0% | |
| 54 | /blog/achsi-what-it-means | 0/1 | 0/2 | 0/3 | 0/8 | 0/2 | 0% | |
| 55 | /blog/crani-bali | 0/1 | 0/2 | 0/3 | 0/8 | 0/2 | 0% | |
| 56 | /blog/dental-veneers-honesty | 0/1 | 0/2 | 0/3 | 0/8 | 0/2 | 0% | |

---

## Untranslated strings present on EVERY page (global chrome)

These appear identically in EN and ID on all 56 routes:

**Navigation (Header):**
- Nav labels: Procedures · Experts · Results · Pricing · Your Journey · Contact
- Dropdown discipline names: Surgical · Reconstructive Surgery · Non-surgical · Hair Restoration · Dental Aesthetics · Weight Loss
- All sub-category names in nav dropdown (e.g. Face & Neck · Body · Breast · Injectable · Laser & Resurfacing…)
- All surgeon names in nav dropdown
- "Plan your treatment →" CTA pill

**Footer:**
- "Begin your journey." heading
- "A private consultation, treatment plan, and stay — coordinated as one." subline
- Clinic address (4 lines)
- "Receive our quarterly journal" + email form label
- "Send Guide →" button
- All footer navigation labels (Treatments · Surgeons · Information section)
- Copyright line

**Source:** These are either CMS globals (Header, Footer, FloatingChrome) with no ID locale content entered, or hardcoded strings in React components.

---

## What has partial translation (and where it comes from)

| Page | Source of translated content | Source of untranslated content |
|---|---|---|
| / (Homepage) | Hero H1/lede from `homeHero` CMS global (ID locale filled) | Section H2/H3/P from `homeIntro`, `homeTreatmentsView`, `homeSurgeonsView` etc globals (ID empty) |
| /journey | Step labels/bodies from `journeySteps` collection (ID locale filled for 7 steps) | H1 from `journeyHero` global (ID empty); footer from Footer global (ID empty) |
| /pricing | Procedure names from `procedures` collection (ID locale filled) | Section headers from `pricingHero`, `pricingOverview` globals (ID empty); paragraphs from procedure `description` field (ID empty) |
| /press | Award names from `pressMentions` collection (ID locale partially filled) | Section H1/H2 from `surgeonsHero` or press-page global (ID empty) |
| /recovery-stays | Villa short descriptions from `recoveryStays` collection (ID partially filled) | H1/H2/H3 from `recoveryStaysPage` global (ID empty) |

---

## Fields needed per content type (what needs ID content entered in CMS)

### Collections (per-document, need ID locale for each record)

| Collection | Records | Fields per record needing ID | Total fields |
|---|:---:|---|:---:|
| Disciplines | 6 | title, lede, intro, overview, 5×section body | ~42 |
| SubCategories | 21 | title, tagline, lede, intro, overview, 5×section body, FAQs | ~200 |
| Procedures | ~150 | name, short, description | ~450 |
| Surgeons | 8 | name, tagline, bio, 3×credential labels | ~40 |
| Stories | varies | title, excerpt, body | varies |
| BlogPosts | 7 | title, excerpt, body (long-form) | ~21 |
| JourneySteps | 7 | label, body | 14 ✓ (done) |
| RecoveryStays | varies | name, short, description | varies |
| PressMentions | varies | name, description | varies |

### Globals (single record, need ID locale version)

| Global | Fields needing ID | Priority |
|---|---|:---:|
| Header | nav labels, localeSwitcher labels | HIGH |
| Footer | all text fields | HIGH |
| FloatingChrome | CTA label | HIGH |
| HomeHero | title, lede (partially done) | HIGH |
| HomeIntro | heading, body, stats | HIGH |
| HomeLeadMagnet | heading, body | HIGH |
| HomePlace | heading, body | HIGH |
| HomeTreatmentsView | section headings, body | HIGH |
| HomeSurgeonsView | heading, body | HIGH |
| JourneyHero | title, lede | HIGH |
| JourneyStats | all labels | HIGH |
| TreatmentsHero | title, lede | HIGH |
| TreatmentsIndexSection | heading, body | MEDIUM |
| DisciplineDetailTemplate | all UI labels | MEDIUM |
| SubCategoryDetailTemplate | all UI labels | MEDIUM |
| SurgeonsHero | title, lede | MEDIUM |
| SurgeonDetailTemplate | all UI labels | MEDIUM |
| ContactHero | title, lede, address | MEDIUM |
| ContactEnquirySection | heading, body | MEDIUM |
| RecoveryStaysPage | title, lede, section headings | MEDIUM |
| PricingHero | title, lede | MEDIUM |
| PricingOverview | section headings, body | MEDIUM |
| BlogPostTemplate | all UI labels | LOW |
| ResultsHero | title, lede | LOW |
| PressPage | title, lede | LOW |
| PrivacySections | all body text | LOW |
