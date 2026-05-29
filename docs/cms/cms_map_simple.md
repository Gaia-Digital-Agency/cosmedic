# Cosmedic CMS — Visible Field Map (Admin View)

> **Purpose**: What an editor actually sees in the CMS sidebar today.
> Updated: 2026-05-29 after change09 (81 → 36 sidebar items, ~270 → ~162 visible fields).
> Source: `packages/cms/src/`. Legend: `[T]` title/heading · `[P]` paragraph · `[I]` image · `[C]` link/button

---

## 0. Hidden entirely from sidebar (change09)

Items remain in DB and are accessible to admin role via direct URL.

| Bucket | Item | Reason |
|---|---|---|
| **Homepage** | Home Page | Page-global — routing/SEO only, hidden from editors |
| **Homepage** | Home Intro | UI chrome — brand-authored pull-quote |
| **Homepage** | Home Treatments View | UI chrome — heading labels rarely changed |
| **Homepage** | Home Gallery View | UI chrome |
| **Homepage** | Home Stories View | UI chrome |
| **Homepage** | Home Pricing View | UI chrome |
| **Homepage** | Home Journey View | UI chrome |
| **Homepage** | Brand Stats | Rarely changed; admin can access |
| **Homepage** | Floating Chrome | CTA pill — rarely changed |
| **Homepage** | Endorsement Mark | Brand governance — design approval required |
| **Homepage** | SEO Defaults | Technical — robots.txt, JSON-LD, sitemaps |
| **Treatments** | Treatments Page | Page-global — routing/SEO only |
| **Treatments** | Treatments Stats | UI chrome |
| **Treatments** | Discipline Detail Template | Pure UI chrome labels |
| **Treatments** | Sub-Category Detail Template | Pure UI chrome labels |
| **Treatments** | Pricing Page | Page-global — routing/SEO only |
| **Treatments** | Pricing Footnote | Rarely changed small print |
| **Treatments** | Pricing Insurance | Rarely changed |
| **Treatments** | Pricing Payment | Rarely changed |
| **Treatments** | Pricing Catalogue View | Pure UI chrome |
| **Treatments** | Pricing Discipline List | Pure UI chrome |
| **Experts** | Surgeons Page | Page-global — routing/SEO only |
| **Experts** | Surgeons Lead View | UI chrome label only |
| **Experts** | Surgeons Plastic View | UI chrome — section heading only |
| **Experts** | Surgeons Aesthetic View | UI chrome — section heading only |
| **Experts** | Surgeon Detail Template | Pure UI chrome labels |
| **Results** | Results Page | Page-global — routing/SEO only |
| **Results** | Share CTA | Merged into CTAs item (slug: library-cta) |
| **Results** | Gallery Page | Page-global — routing/SEO only |
| **Results** | Stories Page | Page-global — routing/SEO only |
| **Results** | Featured Cases View | UI chrome |
| **Results** | Stories View | UI chrome |
| **Journey** | Journey Page | Page-global — routing/SEO only |
| **Journey** | Journey Stats | UI chrome |
| **Contact** | Contact Page | Page-global — routing/SEO only |
| **Contact** | Form Defaults | Technical — error/success copy |
| **Contact** | Email Templates | Technical — MJML templates |
| **Contact** | Video Consult Page | Page-global — routing/SEO only |
| **About** | Blog Page | Page-global — routing/SEO only |
| **About** | Blog Post Template | Pure UI chrome labels |
| **About** | Not Found Page | Admin-only |
| **About** | Privacy Page | Page-global — routing/SEO only |
| **About** | Blog Tags | Inline on Blog Posts; 0 rows in DB |
| **About** | Authors | 0 rows in DB |
| **Journey** | Journey Steps | Rarely changed by editors |
| **Media** | Media Library | Images managed via upload fields on each entity |

---

## 1. Globals — visible fields

### Shared Page Blocks (in every `sections` field)

| Block | Visible Fields |
|---|---|
| richText | heading [T], body [P] |
| imageGrid | heading [T], images.src [I], images.alt [T], images.caption [P] |
| ctaBand | heading [T], primaryLabel [C], primaryHref [C], secondaryLabel [C] |
| stats | heading [T], items.number [T], items.label [T] |
| faqAccordion | heading [T], items.q [T], items.a [P] |
| procedureList | heading [T] |
| surgeonList | heading [T] |
| baGrid | heading [T] |
| testimonialList | heading [T] |
| recoveryStayList | heading [T] |
| pressMentionList | heading [T] |
| contactForm | heading [T] |
| journeyStepList | heading [T] |
| externalEmbed | heading [T] |
| notes | heading [T], body [P] |

### Globals table

| Bucket | Item | Visible Fields |
|---|---|---|
| **Homepage** | Home Hero | title.a [T], title.b [T], primaryCtaLabel [C], secondaryCtaLabel [C], heroImage [I] |
| **Homepage** | Surgeons | eyebrow [T], heading [T] *(teamCaption, split on comma)*, body [P] *(leadBody)*, ctaLabel [C] *(leadCtaLabel)*, groupPhoto [I], groupPhotoAlt [T] |
| **Homepage** | Home Lead Magnet | coverImage [I], coverLine1 [T], coverLine2 [T], coverLine3 [T], heading [T], fineprint [P] |
| **Homepage** | Home Place | heading [T], body [P], ctaLabel [C], image [I] |
| **Homepage** | Settings | siteName [T], siteTagline [P], contactEmail [T], clinicEnquiryEmail [T], contactPhone [T], whatsappNumber [T], addressLine1 [T], addressLine2 [T], city [T], hoursMonFri [T], hoursSatSun [T] |
| **Homepage** | Header | logoLight [I], logoDark [I] |
| **Homepage** | Footer | brandTagline [P], enquirySummary [P], addressBlock [P], copyrightTemplate [T], logoLight [I] |
| **Treatments** | Treatments Hero | titleA [T], titleB [T], heroImage [I] |
| **Treatments** | Treatments Index | heading [T] |
| **Treatments** | Pricing Hero | titleA [T], titleB [T], heroImage [I] |
| **Treatments** | Pricing Overview | heading [T], body [P] |
| **Treatments** | Consultation Policy | feeIdr [T], waiverConditionText [P] |
| **Experts** | Surgeons Hero | title.a [T], title.b [T], heroImage [I] |
| **Results** | Results Hero | title.a [T], title.b [T], heroImage [I] |
| **Results** | CTAs | headingPre [T], headingItalic [T], body [P], buttonLabel [C], buttonHref [C], share.headingPre [T], share.headingItalic [T], share.headingPost [T], share.body [P], share.buttonLabel [C], share.buttonHref [C] |
| **Journey** | Journey Hero | title.a [T], title.b [T], heroImage [I] |
| **Journey** | Recovery Stays — Page | hero.title.a [T], hero.title.b [T], hero.heroImage [I] |
| **Contact** | Contact Hero | title.a [T], title.b [T], heroImage [I] |
| **Contact** | Contact Enquiry Section | headingPre [T], headingItalic [T] |
| **Contact** | Contact Visit Section | headingPre [T], headingItalic [T], body [P], mapImage [I], conciergeHoursValue [P] |
| **About** | Press Page | title [T], accreditationsSection.heading [T], pressSection.headingPre [T] |

---

## 2. Collections — visible fields

| Bucket | Item | Visible Fields |
|---|---|---|
| **Homepage** | Press Mentions | publication [T], headline [T], summary [P], publishedDate [T], isFeatured, logo [I] |
| **Homepage** | Awards | name [T], year [T], issuer [T], summary [P], logo [I] |
| **Treatments** | Disciplines | title [T], subtitle [T], tagline [T], body [P], overview [P], heroImage [I], faqs.q [T], faqs.a [P] |
| **Treatments** | Sub Categories | title [T], tagline [T], overview [P], heroImage [I], faqs.q [T], faqs.a [P] |
| **Treatments** | Procedures | name [T], shortName [T], description [P], heroImage [I], pricing.priceIdr2026 [T], pricing.priceNotes [P], detail.duration [T], detail.recovery [T], faqs.q [T], faqs.a [P] |
| **Experts** | Surgeons | name [T], designation [T], bio [P], portrait [I], specAreas [T] |
| **Results** | Before/After Cases | caseLabel [T], description [P], composite [I], year [T], patientAge [T], recoveryDuration [T], isFeatured |
| **Results** | Patient Stories | patientLabel [T], country [T], procedureLabel [T], quote [T], body [P], portrait [I], videoUrl [C], publishStatus |
| **Journey** | Recovery Stays — Villas | name [T], location [T], body [P], heroImage [I], priceFromIdrPerNight [T], amenities [T], partnerUrl [C] |
| **Contact** | Enquiries | name [T], email [T], phone [T], country [T], status, message [P], internalNotes [P] |
| **About** | Blog Posts | title [T], body [P], heroImage [I], author, publishedAt, publishStatus |
| **About** | Privacy | title [T], paragraphs [P], listItems [P] |
| **Users** | Users | email, avatar [I] |

---

## 3. Field count — Friday vs today

| | Friday 2026-05-23 | Today 2026-05-29 | Change |
|---|:---:|:---:|:---:|
| Sidebar items | **81** | **36** | −45 (−56%) |
| Visible fields (globals) | ~175 | ~95 | −80 |
| Visible fields (collections) | ~95 | ~67 | −28 |
| **Total visible fields** | **~270** | **~162** | **−108 (−40%)** |
| Total fields in system | ~884 | ~884 | — |
| Hidden % | 69% | 82% | +13pp |

---

## 4. Field count — Iteration 4 (2026-05-29)

| | After change09 | After iteration 4 | Change |
|---|:---:|:---:|:---:|
| Sidebar items | **36** | **26** | −10 (−28%) |
| Visible fields | **~240** | **~130** | −110 (−46%) |
| Cumulative hidden % | 82% | **~88%** | +6pp |
| Items hidden this pass | — | 8 | — |
| Fields hidden this pass | — | ~110 | — |

**Key changes:** All eyebrow fields hidden. quickEnquiry group (18 sub-fields) hidden.
All hero chapter/lede/imageHue/imageLabel/breadcrumbLabel hidden.
All collection richText body/overview fields hidden (dev territory, > 1 min to update).
**Rule established:** image upload fields keep items visible. Benchmark: < 1 min per field.
