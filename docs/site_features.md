# BIMC CosMedic — Site Walkthrough & Features

> Visitor's-eye narrative of every screen and every feature the public site delivers. Companion to [sitemap.md](sitemap.md) (route matrix), [cms_schema.md](cms_schema.md) (UI ↔ CMS coverage), and `design/` (the Claude Design source-of-truth).
>
> **Non-negotiable #1**: the lived experience described here must match the Claude Design pixel-for-pixel at every breakpoint. Any divergence is a bug.

## 1. Global chrome (present on every route)

### Header — fixed top, cream surface, hairline bottom rule
- **Logo (left)**: BIMC CosMedic lockup (bronze) → links to `/`.
- **Primary nav (centre)**: `Treatments` · `Surgeons` · `Your Journey` · `Gallery` · `Stories` · `Contact`.
  - Active route is highlighted (matches parent section when on a detail page, e.g. `/treatments/surgical/face/rhinoplasty` highlights `Treatments`).
- **Locale switcher (right)**: `EN | ID` — toggles between English and Bahasa Indonesia mirrors, preserving the current path.
- **Treatments mega-menu** (hover): six discipline columns (Surgical · Reconstructive · Non-surgical · Hair · Dental · Weight Loss), each listing its sub-categories. A 12 px hover bridge keeps the menu open while the cursor crosses the gap.
- **Surgeons mega-menu** (hover): two grouped columns (Plastic Surgery · Aesthetic Medicine), each listing surgeons by name.

### Footer — ink-100 surface, paper text
- White BIMC CosMedic mark.
- Four link columns: **Treatments** (6 disciplines), **Surgeons** (8 surgeons), **Information** (Journey · Gallery · Stories · Press · Pricing · Recovery Stays · Contact · Privacy), **Connect** (Instagram · WhatsApp · Email).
- Clinic address line + copyright.

### Floating chrome (fixed bottom-right, every page)
- **"Plan your treatment"** primary CTA pill → `/contact`.
- **Chat affordance** — opens an in-page chat overlay (provider TBD, scaffolded as togglable in CMS).

### Mobile (<700 px)
- Header collapses to a hamburger trigger (right).
- Drawer slides in from the right at ~85% width, paper surface, focus-trapped, ESC + outside-click to close.
- Floating chrome stays visible.

## 2. Homepage `/`

A scrolling editorial that previews every section of the site.

1. **Hero** — split layout. Left: serif headline with italicised accent word, lede, embedded enquiry form (name · email · country · treatment interest · message · submit). Right: lifestyle imagery. Reveal animation on entry (fade + 24 px translateY).
2. **Trust bar** — ACHSI accreditation · ISAPS membership · "28 years of experience" credentials.
3. **Stats strip** — 4 callouts: 28 years · 8 ISAPS-FICS surgeons · 3,400+ procedures · #1 hospital 2026. Sourced from the BrandStats global so editors can change the numbers.
4. **Treatments index** — six discipline cards (Surgical · Reconstructive · Non-surgical · Hair · Dental · Weight Loss), each with hero image, name, count of sub-treatments, and editorial blurb. Hover: image scales 1.03× over 1.2 s.
5. **Surgeons strip** — eight portrait cards (Suka · Astri · Indra · Wara · Sissy · Rosa · Risma · Theresia). Hover scale. Click → surgeon detail.
6. **Gallery teaser** — 4–6 featured before/after composites with a "View all" CTA → `/gallery`.
7. **Journey teaser** — preview of the 8-step patient journey (consult → assessment → procedure → recovery → follow-up). "View the full journey" → `/journey`.
8. **Stories teaser** — 2–3 testimonial cards with portrait, country tag, short pull-quote.
9. **Place** — Bali editorial imagery + copy positioning the clinic in Nusa Dua.
10. **CTABandSlim** — closing primary + secondary CTAs ("Plan Your Treatment" / "Speak with a Concierge") → `/contact`.

## 3. Treatments — discipline hierarchy

### `/treatments` (index)
Six discipline cards (same as homepage section but with extra editorial copy and procedure count chips).

### `/treatments/:discipline` (6 routes)
Per-discipline chapter page:
- **ChapterOpener** — eyebrow ("Discipline 02 / 06"), serif title + italicised key word, lede, full-bleed hero image, breadcrumb trail (`Home / Treatments / Surgical`).
- **Overview** — 1–2 paragraphs of richtext.
- **Sub-category cards** — 3 cards per discipline (e.g. Surgical → Face · Body · Breast). Hover scale.
- **Lead surgeons strip** — surgeons credentialed in this discipline.
- **FAQ accordion** — common questions per discipline.
- **CTABand** → `/contact`.

### `/treatments/:discipline/:subcategory` (18 routes)
- ChapterOpener with deeper breadcrumb.
- Intro + Overview.
- **Procedures list** — clickable rows, each with name, short blurb, **PriceTag** (IDR primary + AUD italic). On hover: `READ →` slides right.
- Lead surgeon mini-card.
- FAQs.
- CTABand.

### `/treatments/:discipline/:subcategory/:procedure` (41 routes)
The atomic procedure page:
- ChapterOpener with full breadcrumb.
- **Overview** (richtext).
- **Sections** — structured content blocks (How it works, Who it's for, Outcome, Recovery, Aftercare). One section per `{ id, title, body }` editorial record.
- **PriceTag** — IDR primary (rounded to nearest 50 k IDR), AUD italic underneath at the active exchange rate (Settings.audToIdrRate, default 10500). `*` indicator when implants are included.
- **What's included / excluded** — universal lists sourced from the InclusionItems / ExclusionItems collections.
- **Recovery timeline** — Day 1 / 2 / 4 / 7 / 10 / 14 from the JourneySteps collection.
- **FAQs** accordion.
- **Lead surgeon mini-card** → surgeon detail.
- **Related procedures** — peer procedures in the same sub-category.
- CTABand.

## 4. Surgeons

### `/surgeons` (index)
Two groups (Plastic Surgery · Aesthetic Medicine), each with 4 surgeon cards. Portrait, name, common name (e.g. "Dr. Suka"), credentials (years · ISAPS-FICS · spec).

### `/surgeons/:slug` (8 routes)
- Portrait at curated framing (per-surgeon CSS variable from the Surgeons record).
- Name + suffix + credentials line.
- Specialty area chips (e.g. Rhinoplasty · Facelift · Breast augmentation).
- Long-form bio (richtext).
- **Credentialed procedures** — list of procedures this surgeon performs, each linking to its detail page.
- **Availability schedule** (sourced from xlsx Further Info).
- **Languages spoken**.
- CTABand → `/contact`.

## 5. Gallery `/gallery`

- ChapterOpener.
- **Category filters** (Surgical · Non-surgical · Hair · Dental · etc.) — chip row, multi-select.
- **B&A grid** — 29 cases. Each card is a single composite image (left=before, right=after), with case label, linked procedure, surgeon name. Per-half alt text for accessibility.
- Click a card → modal lightbox with surgeon credit + procedure link.

## 6. Stories `/stories`

Testimonial archive:
- Portrait card with patient label (anonymous-friendly), country tag, procedure link.
- Short pull-quote + expandable long-form body.
- Optional `videoUrl` for video testimonials (embedded inline).
- Year + lead surgeon attribution.

## 7. Your Journey `/journey`

The 8-step patient journey in a chapter-numbered layout:
1. Initial enquiry & video consult.
2. Pre-arrival assessment.
3. Arrival in Bali & in-person consult.
4. Pre-op (Day –1).
5. Procedure day.
6. Recovery at the clinic / partner villa.
7. Follow-up reviews (Day 7 / 14).
8. Post-treatment care from home.

Each step has an icon, headline, body copy. Items sourced from the JourneySteps collection so editors can re-order or add steps.

## 8. Pricing `/pricing`

- **Tier packages** (PricingTiers collection) — 3–4 concierge tiers, each with name, descriptor, "from IDR / AUD" headline, inclusions list, "Begin your journey" CTA.
- **Consultation policy banner** — sourced from ConsultationPolicy global ("IDR 150,000 — waived if treatment is booked the same day").
- **Per-treatment table** — every PriceListItem from the xlsx, grouped by sheet (Surgical · Non-surgical · Machine · Injection · BTL), with audience tier columns (Standard / Tourist / Kitas+KTP / Package), 2025 + 2026 prices in IDR + AUD, range values for grouped procedures.
- Search + filter chips so patients can narrow by category.

## 9. Recovery Stays `/recovery-stays`

Villa partner cards for post-op accommodation:
- Hero image + name + Bali location.
- Per-night price from (IDR + AUD).
- Amenity chips (24-hour nurse · airport transfer · meal plan · etc.).
- Photo gallery on click.
- Partner link out.
- Map (lat/lng → Google Maps embed).

## 10. Press `/press`

- Press mention cards (logo + headline + publication + link).
- Awards section (e.g. "#1 hospital 2026") — from the Awards collection.
- Featured mentions float to the top.

## 11. Contact `/contact`

- ChapterOpener.
- **Enquiry form** — name · email · phone · country · treatment interest (rel → Procedures) · preferred date · message. Honeypot + rate-limit (1 / IP / 60 s).
  - Submit → POST `/api/enquiry` → Payload `Enquiries` create → email notification to clinic (`Settings.contactEmail`) + optional autoresponder to submitter.
  - Inline success state on 200.
- **Practical info** — address, phone, WhatsApp, hours (Mon–Fri / Sat–Sun), Google Maps link.
- **Floor plan / clinic photography**.

## 12. Video Consult `/video-consult`

Editorial page explaining the international-patient video consultation flow:
- Booking form (linked to Enquiries collection with `sourcePage: video-consult`).
- Pricing / duration / what to prepare.
- Surgeon availability windows.

## 13. Funnel Assessment `/funnel-assessment`

Treatment-fit assessment form. Editorial intro + multi-step form that captures patient goals, medical history flags, and routes to the right surgeon group.

## 14. Blog `/blog` + `/blog/:slug`

Indexed BlogPosts collection:
- Index: hero of latest post + grid of remaining posts (title, lede, hero image, tag chips, reading time).
- Post: ChapterOpener, hero image, richtext body, author card (rel to Surgeons if applicable), tag chips, related posts.

## 15. Privacy `/privacy`

Long-form policy page. Single Pages record (richtext body).

---

# Recurring UI primitives

| Primitive | Behaviour |
|---|---|
| `<Btn>` | Three variants — **primary** (bronze fill), **accent** (ink fill), **ghost** (hairline border). Renders `<a>` or `<button>` via `as` prop. |
| `<Img>` | `<picture>` with AVIF → WebP → JPG. On error paints a brand-tinted SVG fallback labelled with the asset name + hue index. Never shows a broken-image icon. |
| `<Reveal>` | IntersectionObserver-driven fade + 24 px translateY on entry. `delay` prop for stagger sequences. |
| `<PriceTag>` | IDR primary (de-DE locale, "Rp 89.250.000"), AUD italic underneath ("≈ AUD 8,500"). Reads exchange rate + rounding from Settings global. |
| `<ChapterOpener>` | Eyebrow ("Discipline 02 / 06") + serif title (italicised accent word) + lede + breadcrumbs + full-bleed image. Used on every detail-style page. |
| `<TrustBar>` | Credentials strip — tone `paper` or `cream`, `compact` boolean. |
| `<CTABandSlim>` | Two-line serif title + lede + primary + secondary CTAs. End-of-page closer on most routes. |
| `<Mono>` `<Eyebrow>` | JetBrains Mono label primitives (uppercase, +18% tracking). |

# Interactions

- **Reveal-on-scroll**: every section fades + lifts on entry (IntersectionObserver, `0.2` threshold, single-fire).
- **Image hover**: scale 1.03 over 1.2 s ease-out.
- **Mega-menu hover bridge**: 12 px `padding-top` on the dropdown panel so the cursor crossing the gap stays "inside" — no flicker.
- **Dropdown row hover**: row slides right ~6 px; `READ →` token appears on procedure rows.
- **Active state**: nav item underline + ink-100 colour. Children light up their parent (`/treatments/surgical/face/rhinoplasty` highlights `Treatments`).
- **Mobile drawer**: focus-trapped, ESC to close, click-outside to close, ARIA `dialog` + `aria-modal`.

# Bilingual content (EN ⇄ ID)

- Every editorial field in Payload is `localized: true` (Phase 9 wires the locale routing).
- URL strategy: `/` = EN (default), `/id/...` = ID. Switcher in header toggles between mirrors, preserving the path.
- Static UI strings (button labels, form errors, "Read more") live in `packages/web/src/i18n/{en,id}.json` — small message catalogue.
- `<html lang>` set per request; `<link rel="alternate" hreflang>` for SEO.

# Pricing model

- All amounts stored as AUD in Payload (per-procedure + per-PriceListItem records).
- `<PriceTag>` converts to IDR at the active `Settings.audToIdrRate` (default 10500 IDR / AUD per May 2026 rate, from brand.pdf §IV).
- IDR rounded to nearest 50,000 (configurable via `Settings.roundIdrTo`).
- Display rules:
  - EN locale → IDR primary + AUD italic underneath.
  - ID locale → IDR only.
  - Range values ("IDR 1.4M – IDR 1.6M") supported via `priceIdrRangeLow` / `priceIdrRangeHigh`.

# Forms & email

- React Hook Form + Zod validation on every form.
- Honeypot field (`/website/` text input, hidden) — silent reject if filled.
- Rate-limit by IP (1 submission / 60 s) at the SSR `/api/enquiry` handler.
- Payload `Enquiries.afterChange` hook fires nodemailer email to `Settings.contactEmail` + optional autoresponder.
- All form labels / placeholders / success messages sourced from the `FormDefaults` global so editors can rewrite copy without a redeploy.

# SEO & structured data

- Per-page `<title>` / `<meta description>` / `<link rel="canonical">` / OpenGraph / Twitter cards. Defaults from `Settings` + `SeoDefaults` globals; per-record overrides via the `seo` group on every collection.
- JSON-LD per page kind:
  - `MedicalClinic` on `/` and `/contact`.
  - `Physician` on each `/surgeons/:slug`.
  - `MedicalProcedure` on each procedure detail.
  - `BlogPosting` on each blog post.
- `sitemap.xml` regenerated on every Payload `afterChange` mutation; served at `/sitemap.xml`.
- `robots.txt` allows everything except `/admin`, `/api/`, preview routes.

# Accessibility (Non-negotiable #2)

- Lighthouse Accessibility ≥ 90 (Green) on every route × breakpoint.
- Every `<Img>` has a meaningful `alt` (required on the Media collection).
- Keyboard nav: every interactive element reachable, no traps, visible focus rings.
- Screen-reader pass on home + a representative procedure + the form (NVDA / VoiceOver).
- Mega-menu + mobile drawer announce open/closed via ARIA.

# Performance & responsive

- Lighthouse Performance ≥ 85, LCP ≤ 2.5 s, CLS ≤ 0.1, TBT ≤ 200 ms.
- Images served as AVIF → WebP → JPG via Payload `imageSizes` (480 / 768 / 1280 / 1920 / 2560).
- `<picture>` with `srcset` — no 2560 served to mobile.
- nginx caches `/api/media/` for 30 d immutable.
- Breakpoints: ≥1100 (full multi-column) · 700–1099 (2-col grids, nav stays horizontal) · <700 (single column, hamburger drawer).

# CMS-driven content boundary

Editor-managed (Cosmedic CMS, white-labelled Payload):
- Every editorial string on every page.
- Every image (surgeon portraits, B&A composites, hero / lifestyle imagery, logos).
- Every CTA label + destination per page.
- Every navigation item (header, footer, mega-menu).
- Every price (PriceListItems + Procedures.pricing + PricingTiers).
- Every FAQ.
- Every stat (BrandStats global).
- Every endorsement / brand line (EndorsementMark global).
- Every form label / placeholder / success message (FormDefaults global).
- Every email template (EmailTemplates).
- Per-page SEO overrides.

Hard-coded (intentional):
- Structural UI primitives ("More", "Close", "Read more" — but still localised via static catalogue).
- Accessibility labels.
- Error boundary fallbacks.

See [cms_schema.md](cms_schema.md) for the page-by-page UI ↔ CMS coverage matrix; see [db_schema.md](db_schema.md) for the field-level catalogue.
