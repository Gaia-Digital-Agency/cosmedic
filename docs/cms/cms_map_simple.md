# Cosmedic CMS — Simple Field Map (Admin View)

> **Purpose**: Make the CMS usable by a non-technical average admin — no dev knowledge required.
> This file shows exactly what will be **visible** after hiding technical, UI-chrome, and internal fields.
> Everything not listed here should have `admin: { hidden: true }` applied.
>
> Format mirrors `docs/changes/app_map.md`. Generated 2026-05-27. Source: cms_map_all.md.

**Legend:** `[T]` title / heading · `[P]` paragraph / body text · `[I]` image upload · `[C]` button label or link

---

## 0. Hidden entirely (sidebar items removed)

These collections and globals will not appear in the CMS sidebar for average admin users.

| Bucket | Item | Reason |
|---|---|---|
| *(any)* | Media Library | Images are managed inside each entity via upload fields — no need for a standalone Media browser |
| *(any)* | Analytics | Internal data only — no content to edit |
| **Homepage** | SEO Defaults | All technical — robots.txt, sitemaps, JSON-LD schema |
| **Homepage** | Endorsement Mark | Brand governance — should only be changed with design approval |
| **Treatments** | Discipline Detail Template | Pure UI chrome labels (TOC headings, "available"/"coming soon" copy) |
| **Treatments** | Sub-Category Detail Template | Pure UI chrome labels (TOC headings, CTA copy) |
| **Doctors** | Surgeon Detail Template | Mostly UI chrome labels (sidebar label strings, training row labels) |
| **About** | Blog Post Template | Pure UI chrome labels (byline labels, "more from the journal" labels) |

---

## 1. CMS Globals — visible fields after hiding

### Shared Page Blocks (available in every `sections` field — no change)

| Block | Visible Fields |
|---|---|
| richText | eyebrow [T], heading [T], body [P] |
| imageGrid | heading [T], images.src [I], images.alt [T], images.caption [P] |
| ctaBand | heading [T], lede [P], primaryLabel [C], primaryHref [C], secondaryLabel [C] |
| stats | heading [T], items.number [T], items.label [T] |
| faqAccordion | heading [T], items.q [T], items.a [P] |
| procedureList | heading [T] |
| surgeonList | heading [T] |
| baGrid | heading [T] |
| testimonialList | heading [T] |
| recoveryStayList | heading [T] |
| pressMentionList | heading [T] |
| contactForm | heading [T], lede [P] |
| journeyStepList | heading [T] |
| externalEmbed | heading [T], iframeUrl [C] |
| notes | heading [T], body [P] |

### Globals table

| Bucket | Item | Visible Fields |
|---|---|---|
| **Homepage** | Home Page | title [T] |
| **Homepage** | Home Hero | eyebrow [T], title.a [T], title.b [T], lede [P], primaryCtaLabel [C], secondaryCtaLabel [C], heroImage [I] |
| **Homepage** | Home Intro | eyebrow [T], pullQuoteBefore [T], pullQuoteAccent [T], pullQuoteAfter [T], col1 [P], col2 [P] |
| **Homepage** | Home Treatments View | eyebrow [T], heading.a [T], heading.b [T], lede [P] |
| **Homepage** | Home Surgeons View | eyebrow [T], leadSurgeonEyebrow [T], leadBody [P], leadCtaLabel [C], associatesEyebrow [T], teamCaption [P], groupPhoto [I] |
| **Homepage** | Home Gallery View | eyebrow [T], heading.a [T], heading.b [T], lede [P], ctaLabel [C] |
| **Homepage** | Home Stories View | eyebrow [T], heading.a [T], heading.b [T], lede [P], ctaLabel [C] |
| **Homepage** | Home Pricing View | eyebrow [T], heading.a [T], heading.b [T], lede [P], footnote [P] |
| **Homepage** | Home Journey View | eyebrow [T], heading.a [T], heading.b [T], ctaLabel [C] |
| **Homepage** | Home Lead Magnet | coverImage [I], coverLine1 [T], coverLine2 [T], coverLine3 [T], heading.a [T], heading.b [T], lede [P], successHeading [T], successBody [P] |
| **Homepage** | Home Place | eyebrow [T], heading.a [T], heading.b [T], body [P], ctaLabel [C], image [I] |
| **Homepage** | Settings | siteName [T], siteTagline [P], contactEmail [T], clinicEnquiryEmail [T], contactPhone [T], whatsappNumber [T], addressLine1 [T], addressLine2 [T], city [T], hoursMonFri [T], hoursSatSun [T] |
| **Homepage** | Header | logoLight [I], logoDark [I] |
| **Homepage** | Footer | brandTagline [P], enquirySummary [P], addressBlock [P], copyrightTemplate [T], logoLight [I] |
| **Homepage** | Floating Chrome | ctaPill.label [T], ctaPill.href [C] |
| **Homepage** | Brand Stats | stats.number [T], stats.label [T] |
| **Treatments** | Treatments Page | title [T], tagline [T], lede [P], heroImage [I] |
| **Treatments** | Treatments Hero | titleA [T], titleB [T], lede [P], heroImage [I] |
| **Treatments** | Treatments Index | eyebrow [T], heading [T], lede [P] |
| **Treatments** | Treatments Stats | stats.number [T], stats.label [T] |
| **Doctors** | Surgeons Page | title [T] |
| **Doctors** | Surgeons Hero | title.a [T], title.b [T], lede [P], heroImage [I] |
| **Doctors** | Surgeons Lead View | sectionEyebrow [T], blockEyebrow [T], ctaLabel [C] |
| **Doctors** | Surgeons Plastic View | eyebrow [T], heading.a [T], heading.b [T], headingItalic [T], lede [P] |
| **Doctors** | Surgeons Aesthetic View | eyebrow [T], heading.a [T], heading.b [T], headingItalic [T], lede [P] |
| **Results** | Results Page | title [T] |
| **Results** | Results Hero | title.a [T], title.b [T], lede [P], heroImage [I] |
| **Results** | Library CTA | eyebrow [T], headingPre [T], headingItalic [T], body [P], buttonLabel [C], buttonHref [C] |
| **Results** | Share CTA | eyebrow [T], headingPre [T], headingItalic [T], headingPost [T], body [P], buttonLabel [C], buttonHref [C] |
| **Results** | Gallery Page | title [T] |
| **Results** | Stories Page | title [T] |
| **Results** | Featured Cases View | eyebrow [T], headingPre [T], headingItalic [T], lede [P] |
| **Results** | Stories View | eyebrow [T], headingPre [T], headingItalic [T], lede [P] |
| **Pricing** | Pricing Page | title [T] |
| **Pricing** | Pricing Hero | titleA [T], titleB [T], lede [P], heroImage [I] |
| **Pricing** | Pricing Overview | eyebrow [T], heading.a [T], heading.b [T], body [P] |
| **Pricing** | Pricing Footnote | text [P] |
| **Pricing** | Pricing Insurance | eyebrow [T], headingRoman [T], headingItalic [T], body [P] |
| **Pricing** | Pricing Payment | eyebrow [T], headingRoman [T], headingItalic [T], termsText [P] |
| **Pricing** | Pricing Catalogue View | sectionEyebrow [T], headingRoman [T], headingItalic [T], introTemplate [P] |
| **Pricing** | Pricing Discipline List | sectionEyebrow [T] |
| **Pricing** | Consultation Policy | feeIdr [T], waiverConditionText [P] |
| **Journey** | Journey Page | title [T] |
| **Journey** | Journey Hero | title.a [T], title.b [T], lede [P], heroImage [I] |
| **Journey** | Journey Stats | stats.number [T], stats.label [T] |
| **Journey** | Recovery Stays Page | hero.title.a [T], hero.title.b [T], hero.lede [P], hero.heroImage [I], portfolioSection.headingPre [T], portfolioSection.lede [P], inclusionsSection.headingPre [T], inclusionsSection.lede [P], inclusions.title [T], inclusions.body [P] |
| **Contact** | Contact Page | title [T] |
| **Contact** | Contact Hero | title.a [T], title.b [T], lede [P], heroImage [I] |
| **Contact** | Contact Enquiry Section | eyebrow [T], headingPre [T], headingItalic [T], intro [P], trustLine [P] |
| **Contact** | Contact Visit Section | eyebrow [T], headingPre [T], headingItalic [T], body [P], mapImage [I], conciergeHoursValue [P] |
| **Contact** | Form Defaults | successMessage [P], errorMessage [P] |
| **Contact** | Email Templates | templates.subject [T], templates.bodyMjml [P] |
| **Contact** | Video Consult Page | title [T] |
| **About** | Blog Page | title [T], thisIssueEyebrow [T], archiveSection.eyebrow [T], archiveSection.headingPre [T], archiveSection.lede [P] |
| **About** | Press Page | title [T], accreditationsSection.eyebrow [T], accreditationsSection.heading [T], accreditationsSection.lede [P], pressSection.eyebrow [T], pressSection.headingPre [T], pressSection.lede [P] |
| **About** | Privacy Page | title [T], lastUpdatedDate [T], introParagraph [P] |
| **About** | Not Found Page | eyebrow [T], headingA [T], headingB [T], lede [P], primaryBtnLabel [C], primaryBtnHref [C] |

---

## 2. CMS Collections — visible fields after hiding

| Bucket | Item | Visible Fields |
|---|---|---|
| **Homepage** | Press Mentions | publication [T], headline [T], summary [P], publishedDate [T], isFeatured, logo [I] |
| **Homepage** | Awards | name [T], year [T], issuer [T], summary [P], logo [I] |
| **Treatments** | Disciplines | title [T], subtitle [T], tagline [T], lede [P], body [P], overview [P], heroImage [I], faqs.q [T], faqs.a [P] |
| **Treatments** | Sub Categories | title [T], tagline [T], lede [P], intro [P], overview [P], heroImage [I], faqs.q [T], faqs.a [P] |
| **Treatments** | Procedures | name [T], shortName [T], description [P], heroImage [I], pricing.priceIdr2026 [T], pricing.priceNotes [P], detail.duration [T], detail.recovery [T], faqs.q [T], faqs.a [P] |
| **Doctors** | Surgeons | name [T], designation [T], bio [P], portrait [I], specAreas [T] |
| **Results** | Before/After Cases | caseLabel [T], description [P], composite [I], year [T], patientAge [T], recoveryDuration [T], isFeatured |
| **Results** | Patient Stories | patientLabel [T], country [T], procedureLabel [T], quote [T], body [P], portrait [I], videoUrl [C], publishStatus |
| **Journey** | Journey Steps | number [T], title [T], body [P], image [I], dayLabel [T] |
| **Journey** | Recovery Stays | name [T], location [T], body [P], heroImage [I], priceFromIdrPerNight [T], amenities [T], partnerUrl [C] |
| **Contact** | Enquiries | name [T], email [T], phone [T], country [T], status, message [P], internalNotes [P] |
| **About** | Blog Posts | title [T], lede [P], body [P], heroImage [I], author, publishedAt, publishStatus |
| **About** | Blog Tags | name [T], description [P] |
| **About** | Authors | name [T], role [T], bio [P], portrait [I] |
| **About** | Privacy Sections | title [T], paragraphs [P], listItems [P] |
| **Users** | Users | email, avatar [I] |

---

## 3. Field hiding summary (counts)

| Entity type | Total fields (all) | Visible fields (simple) | Hidden |
|---|---|---|---|
| Globals | ~350+ fields across 54 items | ~130 fields across 54 items | ~220 fields + 8 items hidden entirely |
| Collections | ~150+ fields across 19 items | ~70 fields across 15 items | ~80 fields + 2 items (Media, Analytics) hidden entirely |

> **Next step**: Implement `admin: { hidden: true }` on each field not listed above, and `admin: { hidden: ({ user }) => user?.role !== 'admin' }` on entire collections/globals in Section 0.
