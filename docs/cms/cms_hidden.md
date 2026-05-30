# Cosmedic CMS — Hidden Globals & Collections

> Globals and collections with `admin: { hidden: true }` at the top level.
> Not visible in the CMS admin sidebar. Still exist in DB and are queryable via direct URL.
> Last verified: 2026-05-30 (session 2) against `packages/cms/src/`.

---

## Hidden Globals

| Bucket | Slug | Label | Why hidden |
|---|---|---|---|
| **Homepage** | `header` | Header | Navigation managed by dev; editors use Settings for contact/social data |
| **Homepage** | `footer` | Footer | Brand chrome managed by dev |
| **Homepage** | `floating-chrome` | Floating Chrome | CTA pill + WhatsApp bubble — dev-controlled |
| **Homepage** | `home-intro` | Editorial | Pull-quote + trust strip — merged into page; editor path via Hero |
| **Homepage** | `home-gallery-view` | Home Gallery View | Section content merged into Sections (home-treatments-view) |
| **Homepage** | `home-stories-view` | Home Stories View | Section content merged into Sections (home-treatments-view) |
| **Homepage** | `home-pricing-view` | Home Pricing View | Section content merged into Sections (home-treatments-view) |
| **Homepage** | `home-journey-view` | Home Journey View | Section content merged into Sections (home-treatments-view) |
| **Homepage** | `brand-stats` | Brand Stats | Legacy — stats now inline in HomeIntro.trustStrip |
| **Homepage** | `endorsement-mark` | Endorsement Mark | Brand identity — dev-only |
| **Homepage** | `seo-defaults` | SEO Defaults | Technical SEO — dev-only |
| **Homepage** | `home-page` | Home Page | Legacy page-block global — superseded by section globals |
| **Procedures** | `treatments-index-section` | Treatments Index | Chrome for /procedures index — dev-stable |
| **Procedures** | `treatments-stats` | Treatments Stats | Stats row — dev-stable |
| **Procedures** | `sub-category-detail-template` | Sub-Category Template | Template chrome — dev-stable, rarely changes |
| **Procedures** | `pricing-hero` | Pricing Hero | Merged into Hero (treatments-hero → pricing group) |
| **Procedures** | `pricing-overview` | Pricing Overview | Section heading — dev-stable |
| **Procedures** | `pricing-footnote` | Pricing Footnote | Small print — dev-stable |
| **Procedures** | `pricing-insurance` | Pricing Insurance | Merged into Hero (treatments-hero → pricing → insurance) |
| **Procedures** | `pricing-payment` | Pricing Payment | Merged into Hero (treatments-hero → pricing → payment) |
| **Procedures** | `pricing-discipline-list-view` | Pricing Discipline List | Table chrome — dev-stable |
| **Procedures** | `consultation-policy` | Consultation Policy | Merged into Hero (treatments-hero → pricing → consultation) |
| **Procedures** | `treatments-page` | Treatments Page | Legacy page-block global |
| **Procedures** | `pricing-page` | Pricing Page | Legacy page-block global |
| **Experts** | `surgeons-lead-view` | Surgeons Lead View | Merged into Hero (surgeons-hero → sections → lead) |
| **Experts** | `surgeons-plastic-view` | Surgeons Plastic View | Merged into Hero (surgeons-hero → sections → plasticSurgery) |
| **Experts** | `surgeons-aesthetic-view` | Surgeons Aesthetic View | Merged into Hero (surgeons-hero → sections → aestheticMedicine) |
| **Experts** | `surgeons-page` | Surgeons Page | Legacy page-block global |
| **Results** | `results-featured-cases-view` | Featured Cases View | Section heading — dev-stable |
| **Results** | `results-stories-view` | Stories View | Section heading — dev-stable |
| **Results** | `library-cta` | Library CTA | CTA block — dev-stable |
| **Results** | `share-cta` | Share CTA | CTA block — dev-stable |
| **Results** | `results-page` | Results Page | Legacy page-block global |
| **Results** | `gallery-page` | Gallery Page | Legacy page-block global |
| **Results** | `stories-page` | Stories Page | Legacy page-block global |
| **Journey** | `journey-stats` | Journey Stats | Stats row — dev-stable |
| **Journey** | `journey-page` | Journey Page | Legacy page-block global |
| **Contact** | `contact-enquiry-section` | Enquiry | Form labels + intent copy — dev-stable |
| **Contact** | `contact-visit-section` | Visit | Content merged into Hero (contact-hero → visitSection) |
| **Contact** | `form-defaults` | Form Defaults | Generic form chrome — dev-stable |
| **Contact** | `email-templates` | Email Templates | MJML templates — dev-only |
| **Contact** | `contact-page` | Contact Page | Legacy page-block global |
| **Contact** | `video-consult-page` | Video Consult Page | Legacy page-block global |
| **Publications** | `blog-page` | Blog Page | Legacy page-block global |
| **Publications** | `press-page` | Press Page | Legacy page-block global |
| **Publications** | `privacy-page` | Privacy Page | Legacy page-block global |
| **Publications** | `not-found-page` | Not Found Page | 404 chrome — dev-stable |

---

## Hidden Collections

| Bucket | Slug | Label | Why hidden |
|---|---|---|---|
| **Journey** | `journey-steps` | Journey Steps | Structured data — editor can request dev edits; rarely changes |
| **Contact** | `analytics` | Analytics | Internal logging — not for editors |
| **Publications** | `blog-tags` | Blog Tags | Taxonomy — managed by dev alongside post creation |
| **Publications** | `authors` | Authors | Managed alongside surgeon profiles — dev edits |
