# Cosmedic CMS — Hidden but Renders on Frontend

> Globals and collections that are **hidden in the CMS admin sidebar** but whose
> content **still renders on the live site**. Editors cannot edit these through
> the normal admin UI — they must access the global via direct URL
> (`/admin/globals/<slug>`) or ask a developer.
>
> Last verified: 2026-05-30 (session 2).

---

## Hidden Globals That Render

| Slug | Renders on | Content |
|---|---|---|
| `header` | Every page | Navigation links, logo, locale switcher, CTA pill |
| `footer` | Every page | Brand column, nav columns, newsletter, social links, copyright |
| `floating-chrome` | Every page | "Plan Your Treatment" CTA pill, WhatsApp floating button |
| `home-intro` | `/` | "Our Approach" pull-quote, two-column body paragraphs |
| `home-gallery-view` | `/` | Gallery section eyebrow/heading/lede *(legacy — may be superseded by Sections card)* |
| `home-stories-view` | `/` | Stories section eyebrow/heading/lede *(legacy — may be superseded by Sections card)* |
| `home-pricing-view` | `/` | Pricing teaser eyebrow/heading/footnote *(legacy — may be superseded by Sections card)* |
| `home-journey-view` | `/` | Journey teaser eyebrow/heading *(legacy — may be superseded by Sections card)* |
| `treatments-index-section` | `/procedures` | Index section eyebrow, heading, lede |
| `treatments-stats` | `/procedures` | Stats row (number + label tiles) |
| `sub-category-detail-template` | `/procedures/*/* (21 routes)` | TOC labels, sidebar CTAs, section headings |
| `pricing-overview` | `/pricing` | Section eyebrow, heading, body |
| `pricing-discipline-list-view` | `/pricing` | On-request label, included label, arrow glyph |
| `surgeons-lead-view` | `/experts` | Lead surgeon eyebrow, stat labels, CTA *(merged into SurgeonsHero.sections.lead)* |
| `surgeons-plastic-view` | `/experts` | Plastic surgery section lede, eyebrow, heading *(merged into SurgeonsHero.sections)* |
| `surgeons-aesthetic-view` | `/experts` | Aesthetic medicine section lede, eyebrow, heading *(merged into SurgeonsHero.sections)* |
| `results-featured-cases-view` | `/results` | B&A section eyebrow, heading, lede, filter label |
| `results-stories-view` | `/results` | Stories section eyebrow, heading, lede |
| `library-cta` | `/results` | Library CTA + Share CTA blocks |
| `journey-stats` | `/journey` | Stats row (number + label tiles) |
| `contact-enquiry-section` | `/contact` | Form labels, intent copy, submit states, success/error messages |
| `not-found-page` | `/404` | Error heading, lede, CTA buttons |

---

## Hidden Collections That Render

| Slug | Renders on | Content |
|---|---|---|
| `journey-steps` | `/journey` | All numbered step cards (title, body, bullets, image) |
| `blog-tags` | `/blog`, `/blog/*` | Tag chips on blog index and post pages |
| `authors` | `/blog/*` | Byline name, role, bio, portrait on blog posts |

---

## Note on Merged Content

Some of these hidden globals have had their content **merged into a visible Hero card**.
The hidden global still exists in the DB but its data may be stale or unused — the
visible card is now the live source. Check before editing via direct URL.

| Hidden global | Merged into |
|---|---|
| `surgeons-lead-view` | Hero (surgeons-hero) → Sections → Lead Surgeon |
| `surgeons-plastic-view` | Hero (surgeons-hero) → Sections → Plastic Surgery |
| `surgeons-aesthetic-view` | Hero (surgeons-hero) → Sections → Aesthetic Medicine |
| `pricing-insurance` | Hero (treatments-hero) → Pricing → Insurance |
| `pricing-payment` | Hero (treatments-hero) → Pricing → Payment |
| `consultation-policy` | Hero (treatments-hero) → Pricing → Consultation |
| `contact-visit-section` | Hero (contact-hero) → Visit Section |
