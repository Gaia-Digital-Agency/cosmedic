# Cosmedic CMS — Simple Field Map (Admin View)

> **Purpose**: Make the CMS usable by a non-technical average admin — no dev knowledge required.
> This file shows exactly what will be **visible** after hiding technical, UI-chrome, and internal fields.
> Everything not listed here should have `admin: { hidden: true }` applied.
>
> Format mirrors `docs/changes/app_map.md`. Generated 2026-05-27. Source: cms_map_all.md.

**Legend:** `[T]` title / heading · `[P]` paragraph / body text · `[I]` image upload · `[C]` button label or link

**Hidden field classes** (apply everywhere, not just where named below):
- `eyebrow` / `sectionEyebrow` / `blockEyebrow` / `leadSurgeonEyebrow` / `associatesEyebrow` / `thisIssueEyebrow` — decorative labels, brand-set, not editorial
- `lede` / `intro` / `introParagraph` / `introTemplate` / `trustLine` — introductory supporting text, not primary content
- `iframeUrl` — technical embed URL
- `successBody` / `successHeading` — transient form states, rarely changed
- `pullQuoteBefore` / `pullQuoteAccent` / `pullQuoteAfter` — brand-authored pull-quote fragments
- `footnote` (section-level) — small-print supporting copy

---

## 0. Hidden entirely (sidebar items removed)

These collections and globals will not appear in the CMS sidebar for editor-role users.

| Bucket | Item | Reason |
|---|---|---|
| *(any)* | Media Library | Images are managed inside each entity via upload fields |
| **Homepage** | SEO Defaults | All technical — robots.txt, sitemaps, JSON-LD schema |
| **Homepage** | Endorsement Mark | Brand governance — should only be changed with design approval |
| **Treatments** | Discipline Detail Template | Pure UI chrome labels |
| **Treatments** | Sub-Category Detail Template | Pure UI chrome labels |
| **Treatments** | Pricing Discipline List | All fields are UI chrome (onRequestLabel, includedLabel, arrowChar) — nothing editorial |
| **Doctors** | Surgeon Detail Template | Pure UI chrome labels |
| **About** | Blog Post Template | Pure UI chrome labels |

---

## 1. CMS Globals — visible fields after hiding

### Shared Page Blocks (available in every `sections` field)

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
| **Homepage** | Home Page | title [T] |
| **Homepage** | Home Hero | title.a [T], title.b [T], primaryCtaLabel [C], secondaryCtaLabel [C], heroImage [I] |
| **Homepage** | Home Intro | col1 [P], col2 [P] |
| **Homepage** | Home Treatments View | heading.a [T], heading.b [T] |
| **Homepage** | Home Surgeons View | leadCtaLabel [C], teamCaption [P], groupPhoto [I] |
| **Homepage** | Home Gallery View | heading.a [T], heading.b [T], ctaLabel [C] |
| **Homepage** | Home Stories View | heading.a [T], heading.b [T], ctaLabel [C] |
| **Homepage** | Home Pricing View | heading.a [T], heading.b [T], viewAllLabel [C] |
| **Homepage** | Home Journey View | heading.a [T], heading.b [T], ctaLabel [C] |
| **Homepage** | Home Lead Magnet | coverImage [I], coverLine1 [T], coverLine2 [T], coverLine3 [T], heading.a [T], heading.b [T] |
| **Homepage** | Home Place | heading.a [T], heading.b [T], body [P], ctaLabel [C], image [I] |
| **Homepage** | Settings | siteName [T], siteTagline [P], contactEmail [T], clinicEnquiryEmail [T], contactPhone [T], whatsappNumber [T], addressLine1 [T], addressLine2 [T], city [T], hoursMonFri [T], hoursSatSun [T] |
| **Homepage** | Header | logoLight [I], logoDark [I] |
| **Homepage** | Footer | brandTagline [P], enquirySummary [P], addressBlock [P], copyrightTemplate [T], logoLight [I] |
| **Homepage** | Floating Chrome | ctaPill.label [T], ctaPill.href [C] |
| **Homepage** | Brand Stats | stats.number [T], stats.label [T] |
| **Treatments** | Treatments Page | title [T], tagline [T], heroImage [I] |
| **Treatments** | Treatments Hero | titleA [T], titleB [T], heroImage [I] |
| **Treatments** | Treatments Index | heading [T] |
| **Treatments** | Treatments Stats | stats.number [T], stats.label [T] |
| **Treatments** | Pricing Page | title [T] |
| **Treatments** | Pricing Hero | titleA [T], titleB [T], heroImage [I] |
| **Treatments** | Pricing Overview | heading.a [T], heading.b [T], body [P] |
| **Treatments** | Pricing Footnote | text [P] |
| **Treatments** | Pricing Insurance | headingRoman [T], headingItalic [T], body [P] |
| **Treatments** | Pricing Payment | headingRoman [T], headingItalic [T], termsText [P] |
| **Treatments** | Pricing Catalogue View | headingRoman [T], headingItalic [T] |
| **Treatments** | Consultation Policy | feeIdr [T], waiverConditionText [P] |
| **Doctors** | Surgeons Page | title [T] |
| **Doctors** | Surgeons Hero | title.a [T], title.b [T], heroImage [I] |
| **Doctors** | Surgeons Lead View | ctaLabel [C] |
| **Doctors** | Surgeons Plastic View | heading.a [T], heading.b [T], headingItalic [T] |
| **Doctors** | Surgeons Aesthetic View | heading.a [T], heading.b [T], headingItalic [T] |
| **Results** | Results Page | title [T] |
| **Results** | Results Hero | title.a [T], title.b [T], heroImage [I] |
| **Results** | Library CTA | headingPre [T], headingItalic [T], body [P], buttonLabel [C], buttonHref [C] |
| **Results** | Share CTA | headingPre [T], headingItalic [T], headingPost [T], body [P], buttonLabel [C], buttonHref [C] |
| **Results** | Gallery Page | title [T] |
| **Results** | Stories Page | title [T] |
| **Results** | Featured Cases View | headingPre [T], headingItalic [T] |
| **Results** | Stories View | headingPre [T], headingItalic [T] |
| **Journey** | Journey Page | title [T] |
| **Journey** | Journey Hero | title.a [T], title.b [T], heroImage [I] |
| **Journey** | Journey Stats | stats.number [T], stats.label [T] |
| **Journey** | Recovery Stays Page | hero.title.a [T], hero.title.b [T], hero.heroImage [I], portfolioSection.headingPre [T], inclusionsSection.headingPre [T], inclusions.title [T], inclusions.body [P] |
| **Contact** | Contact Page | title [T] |
| **Contact** | Contact Hero | title.a [T], title.b [T], heroImage [I] |
| **Contact** | Contact Enquiry Section | headingPre [T], headingItalic [T] |
| **Contact** | Contact Visit Section | headingPre [T], headingItalic [T], body [P], mapImage [I], conciergeHoursValue [P] |
| **Contact** | Form Defaults | successMessage [P], errorMessage [P] |
| **Contact** | Email Templates | templates.subject [T], templates.bodyMjml [P] |
| **Contact** | Video Consult Page | title [T] |
| **About** | Blog Page | title [T], archiveSection.headingPre [T] |
| **About** | Press Page | title [T], accreditationsSection.heading [T], pressSection.headingPre [T] |
| **About** | Privacy Page | title [T], lastUpdatedDate [T] |
| **About** | Not Found Page | headingA [T], headingB [T], primaryBtnLabel [C], primaryBtnHref [C] |

---

## 2. CMS Collections — visible fields after hiding

| Bucket | Item | Visible Fields |
|---|---|---|
| **Homepage** | Press Mentions | publication [T], headline [T], summary [P], publishedDate [T], isFeatured, logo [I] |
| **Homepage** | Awards | name [T], year [T], issuer [T], summary [P], logo [I] |
| **Treatments** | Disciplines | title [T], subtitle [T], tagline [T], body [P], overview [P], heroImage [I], faqs.q [T], faqs.a [P] |
| **Treatments** | Sub Categories | title [T], tagline [T], overview [P], heroImage [I], faqs.q [T], faqs.a [P] |
| **Treatments** | Procedures | name [T], shortName [T], description [P], heroImage [I], pricing.priceIdr2026 [T], pricing.priceNotes [P], detail.duration [T], detail.recovery [T], faqs.q [T], faqs.a [P] |
| **Doctors** | Surgeons | name [T], designation [T], bio [P], portrait [I], specAreas [T] |
| **Results** | Before/After Cases | caseLabel [T], description [P], composite [I], year [T], patientAge [T], recoveryDuration [T], isFeatured |
| **Results** | Patient Stories | patientLabel [T], country [T], procedureLabel [T], quote [T], body [P], portrait [I], videoUrl [C], publishStatus |
| **Journey** | Journey Steps | number [T], title [T], body [P], image [I], dayLabel [T] |
| **Journey** | Recovery Stays | name [T], location [T], body [P], heroImage [I], priceFromIdrPerNight [T], amenities [T], partnerUrl [C] |
| **Contact** | Enquiries | name [T], email [T], phone [T], country [T], status, message [P], internalNotes [P] |
| **About** | Blog Posts | title [T], body [P], heroImage [I], author, publishedAt, publishStatus |
| **About** | Blog Tags | name [T], description [P] |
| **About** | Authors | name [T], role [T], bio [P], portrait [I] |
| **About** | Privacy Sections | title [T], paragraphs [P], listItems [P] |
| **Users** | Users | email, avatar [I] |
| *(internal)* | Analytics | question [P], askedAt [T], country [T], city [T] |

---

## 3. Field hiding summary (verified counts)

Field counts derived from `cms_map_all.md` (comma-separated field notation, includes array sub-fields).

| Entity type | Source entities | Total fields | Visible (simple) | Hidden | Hidden % |
|---|---|---|---|---|---|
| Globals | 63 globals | ~628 fields | ~175 fields | ~453 fields | **72%** |
| Collections | 18 + Analytics | ~256 fields | ~95 fields | ~161 fields | **63%** |
| **Total** | **82 entities** | **~884 fields** | **~270 fields** | **~614 fields** | **≈ 69%** |

**Verdict**: Hidden fields account for **≈ 69% of all fields** — confirmed close to 2/3, with the eyebrow/lede/successBody/iframeUrl class reducing the visible surface further than the first pass.

9 entire entities are hidden from the sidebar (Section 0 — 1 more than the first pass: Pricing Discipline List added).

> **Next step**: Implement `admin: { hidden: true }` on each field not listed above, and `admin: { hidden: ({ user }) => user?.role !== 'admin' }` on entire collections/globals in Section 0.
