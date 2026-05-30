# CMS — Fields Visible in UI but Hidden in CMS

> **ALL CONFLICTS RESOLVED — 2026-05-30**
> Full visibility sweep applied: every field that renders as Lede, Para, Image, Title, Body, or Array
> is now visible in the CMS. No editor-inaccessible content remains.
> See sweep audit: `docs/maps/sweep_map.md`

| Bucket | Item | Field | Status |
|---|---|---|---|
| — | — | — | All clear ✅ |

---

## Rule (standing, 2026-05-30)

> **Titles, Paragraphs/Text, Images, Arrays must NEVER be hidden from editors.**
> Only structural/technical fields may stay hidden:
> slugs · hrefs · breadcrumbs · imageHue · imageLabel · chapter eyebrows ·
> ctaHref links · success/error states · legacy fields · deprecated fields ·
> eyebrow labels · CTA labels · hours labels · map captions

---

## Sweep history

| Date | Action | Result |
|---|---|---|
| 2026-05-30 | Full L1–L10 sweep across 52 routes | 0 conflicts remaining |
| 2026-05-30 | Phase 1: Removed global-level hidden from 46 globals | All globals now visible |
| 2026-05-30 | Phase 2: Fixed field-level violations in Header, Footer, ContactVisitSection, RecoveryStaysPage, HomeSurgeonsView | 8 fields unhidden |
| 2026-05-29 | Iteration 4 simplification (change09) | ~88% fields hidden — over-hidden |
| 2026-05-27 | Iteration 3 (change08) | Baseline for this sweep |

---

## Previous conflict log (archived — all resolved 2026-05-30)

The following were conflicts as of 2026-05-29. All now resolved by the visibility sweep.

| Bucket | Item | Field | Resolution |
|---|---|---|---|
| Homepage | HomeHero | lede | ✅ unhidden |
| Homepage | HomeIntro | pullQuoteBefore/Accent/After, col1, col2 | ✅ global unhidden |
| Homepage | HomeTreatmentsView | heading, lede | ✅ global unhidden |
| Homepage | HomePricingView | heading, lede, footnote | ✅ global unhidden |
| Homepage | HomeSurgeonsView | leadBody | ✅ already visible; global was visible |
| Homepage | HomeGalleryView | heading.a/b, lede | ✅ global unhidden |
| Homepage | HomeStoriesView | heading, lede | ✅ global unhidden |
| Homepage | HomeJourneyView | heading | ✅ global unhidden |
| Treatments | TreatmentsHero | lede | ✅ unhidden |
| Treatments | PricingHero | lede | ✅ unhidden |
| Treatments | Disciplines | lede, body, overview, faqs | ✅ unhidden |
| Treatments | SubCategories | intro, overview, sections, faqs | ✅ unhidden |
| Treatments | Procedures | description, sections, faqs | ✅ unhidden |
| Experts | SurgeonsHero | lede | ✅ unhidden |
| Experts | SurgeonsAestheticView | heading, lede | ✅ global unhidden |
| Experts | SurgeonsPlasticView | heading, lede | ✅ global unhidden |
| Results | ResultsHero | lede | ✅ unhidden |
| Journey | JourneyHero | lede | ✅ unhidden |
| Journey | JourneyStats | stats.label | ✅ global unhidden |
| Contact | ContactHero | lede | ✅ unhidden |
| Contact | ContactVisitSection | body | ✅ unhidden |
| About | BlogPosts | lede | ✅ unhidden |
| Every page | Header | navItems array | ✅ global unhidden + field unhidden |
| Every page | Footer | linkColumns, footerBottomLines, treatmentsHeading | ✅ global unhidden + fields unhidden |
