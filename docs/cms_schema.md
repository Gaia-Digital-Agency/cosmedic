# CosMedic CMS Map — UI ↔ CMS coverage matrix

> Verifies **Non-negotiable #3**: every editorial surface on the front-end is editable in Cosmedic CMS. This is the round-trip check that complements `db_schema.md` (the WHAT) and `cms_info.md` (the LOOK).
>
> **How to use:**
> - "Can an editor change THIS thing on the homepage?" → see §3, find the page, find the surface, read the CMS column.
> - "Where does THIS collection appear?" → see §4 reverse map.
> - "Does anything fall through the cracks?" → §5 coverage audit.

---

## 1. CMS inventory recap

### 1.1 Collections (17)

| Slug | Records | Drives |
|---|---|---|
| `surgeons` | 8 | All surgeon mentions, surgeon detail pages, surgeon mega-menu, lead-surgeon mini-cards |
| `disciplines` | 6 | Treatments mega-menu, treatments index cards, discipline detail page hero |
| `subCategories` | 18 | Treatments mega-menu sub-items, sub-category detail page |
| `procedures` | 41+ | Procedure detail pages, sub-category procedure list, related procedures |
| `priceListItems` | ~150 | `/pricing` table rows (full clinic catalogue) |
| `injectableProducts` | ~30 | `/pricing` injectables table, future booking transparency |
| `machineTreatments` | ~20 | `/pricing` machine treatments table with audience tiers |
| `hairRemovalAreas` | ~25 | `/pricing` BTL hair removal table |
| `beforeAfterCases` | 29 | `/gallery`, gallery teaser on home, procedure detail "related cases" |
| `stories` | TBD | `/stories`, stories teaser on home, surgeon detail testimonials |
| `pressMentions` | TBD | `/press` |
| `awards` | TBD | `/press` (awards section), brand stats on home |
| `recoveryStays` | TBD | `/recovery-stays`, procedure detail recovery teaser |
| `pricingTiers` | TBD | `/pricing` concierge packages section |
| `blogPosts` | future | `/blog`, `/blog/:slug`, home blog teaser (if added) |
| `blogTags` | future | `/blog` filter chips, `/blog/:slug` tag pills |
| `authors` | future | Blog post bylines |
| `pages` | 15 | Per-route hand-crafted hero + body blocks (home, journey, gallery, stories, press, pricing, contact, recovery-stays, video-consult, funnel-assessment, privacy, blog index, treatments index, surgeons index, etc.) |
| `journeySteps` | ~8 | `/journey` page steps + procedure detail recovery timeline (Day 1/2/4/7/10/14) |
| `inclusionItems` | ~5 | Procedure detail "What's included" list (universal) |
| `exclusionItems` | ~7 | Procedure detail "What's excluded" list (universal) |
| `enquiries` | dynamic | Form submissions (admin-only view; never on public UI) |
| `newsletterSubscribers` | dynamic | (optional, future) |
| `redirects` | dynamic | nginx-edge / web-route redirect rules |
| `media` | dynamic | EVERY image, video, PDF on the site |
| `users` | dynamic | Admin / editor accounts |

### 1.2 Globals (10)

| Global | Drives |
|---|---|
| `Settings` | Site name, tagline, AUD↔IDR rate, contact email/phone, address, hours, social links, default locale, IDR rounding, default OG image |
| `Header` | Logo (light + dark), nav items, mega-menu structure, EN\|ID switcher labels |
| `Footer` | Logo (light), link columns, enquiry summary, address block, copyright template, social icons |
| `FloatingChrome` | CTA pill (label, href, enabled), chat affordance config |
| `BrandStats` | Stats strip values (28 years, 8 ISAPS-FICS, 3,400+ procedures, #1 hospital 2026) |
| `EndorsementMark` | "Managed by BIMC Hospital" endorsement text + lockup variants + clearspace rules |
| `ConsultationPolicy` | Consultation fee (IDR 150,000) + same-day waiver text + where to display |
| `FormDefaults` | All form labels, placeholders, success/error messages, submit-button text |
| `EmailTemplates` | Enquiry autoresponder, clinic notification, newsletter confirmation, password reset |
| `SeoDefaults` | Page title pattern, robots.txt content, default OG image, organization JSON-LD |

### 1.3 Composable blocks (Pages.sections array)

Used inside `Pages` records to assemble per-route content:

- `ChapterOpener` — chapter title (2-part with italic accent) + lede + breadcrumbs + hero image
- `RichText` — paragraph / heading / list block
- `ImageGrid` — N images in editorial layout
- `CTABand` — title + lede + primary CTA + secondary CTA
- `Stats` — array of `{ number, label, sourceNote }` for trust strips
- `FAQAccordion` — heading + items `{ q, a }`
- `ProcedureList` — `{ filter, layout }` → renders linked Procedures
- `SurgeonList` — `{ filter, layout }` → renders linked Surgeons
- `BAGrid` — `{ filter, layout }` → renders BeforeAfterCases
- `TestimonialList` — `{ filter, count }` → renders Stories
- `RecoveryStayList` — renders RecoveryStays cards
- `PressMentionList` — renders PressMentions
- `ContactForm` — embeds enquiry form `{ formId, defaultsOverride }`
- `JourneyStepList` — `{ filter }` → renders JourneySteps
- `ExternalEmbed` — `{ html | iframeUrl }` for video / map / partner widget

### 1.4 Hooks (Payload `afterChange` / `beforeValidate` / etc.)

| Collection / Global | Hook | What it does |
|---|---|---|
| `enquiries.afterChange` (`op=create`) | email-notify | Sends email to clinic via nodemailer using EmailTemplates → enquiry-clinic-notify |
| `enquiries.afterChange` (`op=create`, if autoresponder enabled) | email-confirm | Sends confirmation to submitter via EmailTemplates → enquiry-autoresponder |
| `enquiries.beforeValidate` | honeypot-check | Silently rejects bot submissions if honeypot field is filled |
| `pages.afterChange`, `surgeons.afterChange`, `procedures.afterChange`, `subCategories.afterChange`, `disciplines.afterChange`, `beforeAfterCases.afterChange`, `stories.afterChange`, `blogPosts.afterChange` | revalidate-web | POST `http://127.0.0.1:3007/api/revalidate` so web SSR cache busts immediately |
| `pages.afterChange`, `surgeons.afterChange`, `procedures.afterChange`, `subCategories.afterChange`, `disciplines.afterChange`, `blogPosts.afterChange` | regenerate-sitemap | Triggers `/sitemap.xml` regeneration |
| `media.beforeValidate` | require-alt | Rejects upload if `alt` field is empty (a11y / SEO Green) |
| `users.afterChange` (`op=create`) | welcome-email | Sends "welcome to Cosmedic CMS" template |
| `priceListItems.beforeChange` | link-procedure | Auto-links to matching `Procedures` slug when name resembles editorial procedure |

### 1.5 Plugins

| Plugin | Why |
|---|---|
| `@payloadcms/db-postgres` | Postgres adapter (required by stack) |
| `@payloadcms/storage-local` | Local filesystem for Media (Phase 0); swap to S3-compatible later if needed |
| `@payloadcms/email-nodemailer` | SMTP send for hooks above |
| `@payloadcms/plugin-seo` | SEO group per collection (title, description, ogImage, canonical) |
| `@payloadcms/richtext-lexical` | Richtext fields (bio, body, descriptor) |
| `@payloadcms/plugin-search` | Admin-side search across collections (optional, low priority) |
| `@payloadcms/plugin-redirects` | Drives the `Redirects` collection (optional) |

### 1.6 Custom admin components (Cosmedic CMS branding)

See `docs/cms_info.md` for full spec.

- `CosmedicBeforeLogin.tsx` — login hero (Cormorant wordmark + BIMC lockup + Mono tagline)
- `CosmedicLogo.tsx` — intentional no-op (suppresses Payload default wordmark)
- `CosmedicIcon.tsx` — compact mark for collapsed nav
- `admin-theme.css` — brand-palette CSS-var mapping (light + dark)

### 1.7 Custom web components (front-end consumers of CMS data)

Lives in `packages/web/src/components/` (Phase 2+). Each maps one design primitive (from `shared.jsx`) to a typed React component consuming Payload data:

| Component | Wraps |
|---|---|
| `<PageShell>` | Header + Footer + FloatingChrome |
| `<Header>` | Reads Global: Header |
| `<Footer>` | Reads Global: Footer |
| `<FloatingChrome>` | Reads Global: FloatingChrome |
| `<ChapterOpener>` | Reads ChapterOpener block (or top-level fields on Disciplines / SubCategories / Procedures) |
| `<Reveal>` | IntersectionObserver wrapper, pure UI |
| `<Img>` | `<picture>` with AVIF/WebP/JPG fallback, SVG-on-error |
| `<Btn>` | Pure UI primitive |
| `<Mono>`, `<Eyebrow>` | Pure UI primitives |
| `<PriceTag>` | Reads Settings.audToIdrRate + pricing fields |
| `<TrustBar>` | Reads BrandStats global |
| `<CTABandSlim>` | Reads CTABand block |
| `<RichTextRenderer>` | Renders Lexical richtext from any collection field |
| `<BlockRenderer>` | Dispatches on Pages.sections block type → renders the matching block component |
| `<EnquiryForm>` | Reads FormDefaults global + POSTs to `/api/enquiry` |

---

## 2. Site IA cross-reference

Full route list lives in `docs/sitemap.md`. Recap of top-level routes the matrix below covers:

| Route | Page type | Records / globals it consumes |
|---|---|---|
| `/` | Homepage | Pages (slug=home), BrandStats, Disciplines, Surgeons, BeforeAfterCases, JourneySteps, Stories, Header, Footer, FloatingChrome |
| `/treatments` | Index | Pages (slug=treatments), Disciplines (all), Header/Footer/FloatingChrome |
| `/treatments/:discipline` | Discipline detail | Disciplines (one), SubCategories (children), Surgeons (leadSurgeons), Header/Footer/FC |
| `/treatments/:discipline/:sub` | SubCategory detail | SubCategories (one), Procedures (children), Surgeons (leadSurgeon), InclusionItems/ExclusionItems, Header/Footer/FC |
| `/treatments/:discipline/:sub/:procedure` | Procedure detail | Procedures (one), Surgeons (credentialed), InclusionItems, ExclusionItems, JourneySteps (recoveryTimeline), BeforeAfterCases (related), PriceListItems (linked), Header/Footer/FC |
| `/surgeons` | Index | Pages (slug=surgeons), Surgeons (all, grouped) |
| `/surgeons/:slug` | Surgeon detail | Surgeons (one), Procedures (credentialedProcedures rel), Stories (filter by surgeon) |
| `/journey` | Page | Pages (slug=journey), JourneySteps (all) |
| `/gallery` | Page | Pages (slug=gallery), BeforeAfterCases (all + filter) |
| `/stories` | Page | Pages (slug=stories), Stories (all) |
| `/press` | Page | Pages (slug=press), PressMentions, Awards |
| `/pricing` | Page | Pages (slug=pricing), PricingTiers, Procedures (with pricing), PriceListItems, InjectableProducts, MachineTreatments, HairRemovalAreas, ConsultationPolicy, Settings.audToIdrRate |
| `/recovery-stays` | Page | Pages (slug=recovery-stays), RecoveryStays |
| `/contact` | Page | Pages (slug=contact), FormDefaults, Settings (address/phone/hours), Enquiries (create-only) |
| `/video-consult` | Page | Pages (slug=video-consult) |
| `/funnel-assessment` | Page | Pages (slug=funnel-assessment), FormDefaults, Enquiries (create-only with sourceCta) |
| `/blog`, `/blog/:slug` | Blog | Pages (slug=blog), BlogPosts, BlogTags, Authors |
| `/privacy` | Page | Pages (slug=privacy) |

Header / Footer / FloatingChrome appear on every public route. Localised mirror at `/id/*` (Phase 9) — every editorial field is `localized: true` so same records drive both locales.

---

## 3. Per-page mapping matrix

> Columns: **Surface** (what the user sees) · **Element type** (image/text/list/form/CTA/etc.) · **CMS source** (collection or global) · **Field path** (specific Payload field) · **Notes** (defaults, hooks, special handling)

### 3.1 `/` — Homepage

| Surface | Type | CMS source | Field path | Notes |
|---|---|---|---|---|
| Header bar (sticky cream) | shell | Global: Header | logoLight, navItems[] | Active state derived from current route |
| Mega-menu — Treatments | nav | Global: Header | navItems[?label=Treatments].megaMenu | Auto-populates from Disciplines+SubCategories on revalidate |
| Mega-menu — Surgeons | nav | Global: Header | navItems[?label=Surgeons].megaMenu | Auto-populates from Surgeons grouped by `group` field |
| EN\|ID switcher | nav | Global: Header | localeSwitcher.labels.{en,id} | |
| Hero background image | image | Pages | pages(slug=home).heroImage | Required alt; SVG fallback |
| Hero vignette overlay | UI | — | (CSS-only) | Not CMS |
| Eyebrow ("A sanctuary in Nusa Dua · Est. 1998") | text | Pages | pages(slug=home).sections[0].block=ChapterOpener.eyebrow | Localized |
| H1 ("Plastic surgery in Bali, by ISAPS surgeons.") | text | Pages | pages(slug=home).sections[0].block=ChapterOpener.title ([line, line]) | Italic accent on 2nd part |
| Sub-headline ("The care of medicine. The grace of Bali.") | text | Pages | pages(slug=home).sections[0].block=ChapterOpener.tagline | Italic styled |
| Description paragraph (with pricing) | text | Pages | pages(slug=home).sections[0].block=ChapterOpener.lede | "Procedures from {price}" interpolation from Settings + Procedures.pricing.min |
| Hero CTA "Plan Your Treatment" | CTA | Pages | pages(slug=home).sections[0].block=ChapterOpener.primaryCta {label, href} | Anchor to #enquiry by default |
| Hero CTA "View Pricing" | CTA | Pages | pages(slug=home).sections[0].block=ChapterOpener.secondaryCta {label, href} | |
| Quick-enquiry card eyebrow ("Begin · No commitment") | text | Pages | pages(slug=home).sections[?].block=ContactForm.eyebrow | |
| Quick-enquiry h4 ("Get a private price estimate…") | text | Pages | pages(slug=home).sections[?].block=ContactForm.heading | |
| Quick-enquiry sub ("Two fields to start…") | text | Pages | pages(slug=home).sections[?].block=ContactForm.subheading | |
| Form field labels ("Your name", "Email", "Area of interest") | text | Global: FormDefaults | labels.{name,email,treatment} | Localized |
| Form placeholders | text | Global: FormDefaults | placeholders.{name,email,treatment} | Localized |
| Form submit "Begin enquiry" | text | Global: FormDefaults | submitLabel | |
| Form fineprint ("Held in confidence…") | text | Global: FormDefaults | privacyNotice | Localized |
| Form submit → POST | hook | — | POST /api/enquiry → Enquiries.create | sourcePage=/ , sourceCta=hero-form |
| TrustBar credentials (ACHSI, ISAPS, etc.) | row | Global: BrandStats | stats[?role=trust] | Each: number, label, sourceNote |
| Stats strip (28 / 8 / 3,400+ / #1) | grid | Global: BrandStats | stats[?role=hero-stats] | Subset filter by role tag |
| Intro eyebrow ("Our Approach") | text | Pages | pages(slug=home).sections[?].block=RichText.eyebrow | Localized |
| Intro pull-quote ("Aesthetic medicine…considered with the same care…") | text | Pages | pages(slug=home).sections[?].block=RichText.pullQuote | Italic accent on key word |
| Intro 2-col body paragraphs | text | Pages | pages(slug=home).sections[?].block=RichText.columns[] | Two-column richtext |
| Treatments section eyebrow + H2 + lede | text | Pages | pages(slug=home).sections[?].block=RichText | Or as ChapterOpener mini |
| Treatments cards (6) | list | Collection: Disciplines | iterate, publishStatus=published, sortBy=order ASC | Card: heroImage, displayCount, title, subtitle, body, link |
| Pricing teaser "Starting From" eyebrow | text | Pages | pages(slug=home).sections[?].block=RichText.eyebrow | |
| Pricing teaser H2 + lede | text | Pages | pages(slug=home).sections[?].block=RichText.{title,lede} | |
| Pricing teaser rows (procedure + "from" price) | list | Collection: Procedures + Settings | filter by featuredRank, limit 8; PriceTag uses Settings.audToIdrRate | |
| Surgeons section H2 + lede | text | Pages | pages(slug=home).sections[?].block=SurgeonList.{heading, lede} | |
| Lead surgeon card | item | Collection: Surgeons | filter: lead=true, group=Plastic Surgery, limit 1 | Full card with bio excerpt |
| Surgeon strip (8 portraits) | list | Collection: Surgeons | iterate, publishStatus=published, sortBy=group then commonName | Card: portrait, commonName, credLine, link to /surgeons/:slug |
| Gallery teaser eyebrow + H2 + lede | text | Pages | pages(slug=home).sections[?].block=BAGrid.{eyebrow, heading, lede} | |
| Gallery teaser cards (4–6) | list | Collection: BeforeAfterCases | filter isFeatured=true, limit 6 | composite Media, beforeAlt, afterAlt, tags, procedure.name |
| Gallery teaser "View all" CTA | CTA | Pages | pages(slug=home).sections[?].block=BAGrid.viewAllCta | → /gallery |
| Journey teaser eyebrow + H2 + lede | text | Pages | pages(slug=home).sections[?].block=JourneyStepList.{eyebrow, heading, lede} | |
| Journey teaser steps (3–4) | list | Collection: JourneySteps | sortBy=order, limit 4 | Each: dayLabel, title, body excerpt |
| Stories teaser cards (3) | list | Collection: Stories | filter isFeatured=true, limit 3 | portrait, quote, patientLabel, country, procedure.name |
| Stories teaser "View all" CTA | CTA | Pages | pages(slug=home).sections[?].block=TestimonialList.viewAllCta | → /stories |
| LeadMagnet cover ("The Bali Recovery Guide.") | block | Pages | pages(slug=home).sections[?].block=LeadMagnet.{coverEyebrow, coverTitle[3], coverFoot[2]} | "BIMC CosMedic / MMXXVI" foot |
| LeadMagnet body eyebrow ("Free Guide") + H2 + lede | text | Pages | pages(slug=home).sections[?].block=LeadMagnet.{eyebrow, heading, lede} | Localized |
| LeadMagnet email-capture form | form | Pages + FormDefaults | LeadMagnet.formLabels + FormDefaults.placeholders.email | Submit → NewsletterSubscribers.create with source=lead-magnet; success message from EmailTemplates |
| LeadMagnet fineprint | text | Pages | pages(slug=home).sections[?].block=LeadMagnet.fineprint | Localized |
| "Place" / location section (Bali photography + text) | block | Pages | pages(slug=home).sections[?].block=RichText + ImageGrid | |
| CTA band ("Begin your journey." + 2 buttons) | block | Pages | pages(slug=home).sections[last].block=CTABand | {title[2], lede, primaryCta, secondaryCta} |
| Footer logo | image | Global: Footer | logoLight | |
| Footer link column "Treatments" | list | Global: Footer | linkColumns[?heading=Treatments].items[] | Auto-populated from Disciplines on revalidate |
| Footer link column "Surgeons" | list | Global: Footer | linkColumns[?heading=Surgeons].items[] | Auto-populated from Surgeons on revalidate |
| Footer link column "Information" | list | Global: Footer | linkColumns[?heading=Information].items[] | Manual: Journey, Gallery, Stories, Press, Pricing, Recovery, Contact, Privacy |
| Footer enquiry summary | text | Global: Footer | enquirySummary (richtext) | |
| Footer social icons | list | Global: Settings | socialLinks[] | Same source on every page |
| Footer address block | text | Global: Footer | addressBlock (richtext) | Or pulled from Settings.address* |
| Footer copyright | text | Global: Footer | copyrightTemplate | `{year}` token substituted |
| Floating CTA pill ("Plan your treatment") | overlay | Global: FloatingChrome | ctaPill {label, href, enabled} | Visible on every route |
| Floating chat affordance | overlay | Global: FloatingChrome | chat {enabled, provider, embedScript} | |

### 3.2 `/treatments` — Treatments index

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Header + Footer + FloatingChrome | shell | Globals | (as on home) |
| Chapter opener (H1 + lede + breadcrumbs + hero) | block | Pages | pages(slug=treatments).sections[0].block=ChapterOpener |
| Discipline cards (6) | list | Collection: Disciplines | iterate sortBy=order — heroImage, order, title, subtitle, displayCount, body, "Read →" link |
| CTA band at end | block | Pages | pages(slug=treatments).sections[last].block=CTABand |

### 3.3 `/treatments/:discipline` — Discipline detail (×6)

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Chapter opener | data | Collection: Disciplines | (one matching :discipline).chapterTitle, tagline, lede, heroImage, breadcrumbs auto-built |
| Overview richtext | text | Disciplines | .overview |
| SubCategory cards (3 per discipline) | list | Collection: SubCategories | filter parent=:discipline, sortBy=order — heroImage, title, intro excerpt, link to sub-category |
| Lead surgeon mini-card | data | Collection: Disciplines + Surgeons | .leadSurgeons[0] → Surgeons.portrait, commonName, credLine, bio excerpt |
| FAQs | list | Disciplines | .faqs[] {q, a} |
| CTA band | data | Pages or Disciplines | If Disciplines.ctaBand exists use it, else fallback to a global default CTABand |

### 3.4 `/treatments/:discipline/:sub` — Sub-category detail (×18)

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Chapter opener | data | Collection: SubCategories | .chapterTitle, tagline, lede, heroImage |
| Intro paragraph | text | SubCategories | .intro |
| Overview richtext | text | SubCategories | .overview |
| Sections array | list | SubCategories | .sections[] {id, t, body} |
| Procedures clickable list | list | Collection: Procedures (filtered) | parentSubCategory=:sub, sortBy=featuredRank+name — name, short, priceFromAud, "READ →" |
| Lead surgeon mini-card | data | SubCategories + Surgeons | .leadSurgeon → Surgeons.* |
| FAQs | list | SubCategories | .faqs[] |
| CTA band | data | Pages or SubCategories | (as above) |

### 3.5 `/treatments/:discipline/:sub/:procedure` — Procedure detail (×41+)

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Chapter opener | data | Collection: Procedures | .name, .shortName, .description (or chapterTitle/lede if present), .heroImage |
| Overview / description | text | Procedures | .description (richtext) |
| Body sections (multi) | list | Procedures | .sections[] {id, t, body} |
| Pricing tag (IDR primary + AUD italic) | data | Procedures + Settings | .pricing.priceIdr2026 / .priceAud2026 (toggle year via Settings.displayYear); fallback to PriceListItems.linkedProcedure |
| Pricing range fallback | data | Procedures | .pricing.priceIdrRangeLow / High (when applicable) |
| Includes list | list | Procedures + InclusionItems | .included[] (relationship) — render scope=surgical-procedure |
| Excludes list | list | Procedures + ExclusionItems | .excluded[] (relationship) |
| Recovery timeline | list | Procedures + JourneySteps | .recoveryTimeline[] — dayLabel, title, body excerpt |
| Consultation policy callout | data | Global: ConsultationPolicy | feeIdr, waiverConditionText (if displayOn includes "procedure-detail") |
| FAQs | list | Procedures | .faqs[] |
| Lead surgeon mini-card | data | Procedures + Surgeons | .surgeonsCredentialed[0] (or featured) |
| Related B&A cases | list | Procedures + BeforeAfterCases | .relatedBA[] |
| Related procedures | list | Procedures | .relatedProcedures[] |
| CTA band | data | Pages or Procedures | (as above) |

### 3.6 `/surgeons` — Surgeons index

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Chapter opener | block | Pages | pages(slug=surgeons).sections[0].block=ChapterOpener |
| Featured lead | data | Collection: Surgeons | filter lead=true limit 1 — full card |
| Plastic Surgery grid | list | Collection: Surgeons | filter group="Plastic Surgery", sortBy=commonName |
| Aesthetic Medicine grid | list | Collection: Surgeons | filter group="Aesthetic Medicine", sortBy=commonName |
| CTA band | block | Pages | pages(slug=surgeons).sections[last].block=CTABand |

### 3.7 `/surgeons/:slug` — Surgeon detail (×8)

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Portrait | image | Collection: Surgeons | .portrait (Media req'd alt), .portraitPosition |
| Name + title + suffix + commonName | text | Surgeons | .name, .title, .suffix, .commonName |
| Credentials line | text | Surgeons | .credLine |
| Spec + training + proc | text | Surgeons | .spec, .train, .proc |
| Years in practice + group | text | Surgeons | .yearsInPractice, .group |
| Spec areas (chip cloud) | list | Surgeons | .specAreas[] |
| Languages | list | Surgeons | .languages[] |
| Availability schedule | list | Surgeons | .availabilitySchedule[] {day, window, byAppointment} |
| Long-form bio | text | Surgeons | .bio (richtext) |
| Linked procedures grid | list | Surgeons + Procedures | .credentialedProcedures[] |
| Stories linked to this surgeon | list | Stories | filter surgeon=:slug |
| CTA band | data | (default) | (as above) |

### 3.8 `/journey` — Patient journey

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Chapter opener | block | Pages | pages(slug=journey).sections[0].block=ChapterOpener |
| 8-step process (or all JourneySteps) | list | Collection: JourneySteps | iterate sortBy=order — dayLabel, title, body (richtext), icon |
| CTA band | block | Pages | pages(slug=journey).sections[last].block=CTABand |

### 3.9 `/gallery` — Before & After

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Chapter opener | block | Pages | pages(slug=gallery).sections[0].block=ChapterOpener |
| Category filter chips | list | Collection: Disciplines (derived) | iterate (+ "All") — used as client-side filter on B&A tags |
| B&A grid (29 cases) | list | Collection: BeforeAfterCases | filter publishStatus=published, sortBy=year DESC — composite, beforeAlt, afterAlt, tags, procedure.name, surgeon.commonName |
| CTA band | block | Pages | pages(slug=gallery).sections[last].block=CTABand |

### 3.10 `/stories` — Testimonials

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Chapter opener | block | Pages | pages(slug=stories).sections[0].block=ChapterOpener |
| Testimonial cards | list | Collection: Stories | iterate, sortBy=year DESC — portrait, quote, body, patientLabel, country, year, procedure.name |
| (Optional) video testimonials | embed | Stories | .videoUrl (if present, render as embed) |
| CTA band | block | Pages | pages(slug=stories).sections[last].block=CTABand |

### 3.11 `/press` — Press + Awards

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Chapter opener | block | Pages | pages(slug=press).sections[0].block=ChapterOpener |
| Press mentions grid | list | Collection: PressMentions | sortBy=publishedDate DESC — publication, logo, headline, url, summary |
| Awards section | list | Collection: Awards | sortBy=year DESC — name, year, issuer, logo, summary |
| CTA band | block | Pages | pages(slug=press).sections[last].block=CTABand |

### 3.12 `/pricing` — Full price list

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Chapter opener | block | Pages | pages(slug=pricing).sections[0].block=ChapterOpener |
| Currency rate banner ("1 AUD ≈ Rp X — May 2026") | text | Global: Settings | audToIdrRate + a sentence template |
| Consultation policy callout | data | Global: ConsultationPolicy | feeIdr, waiverConditionText |
| Concierge tier cards | list | Collection: PricingTiers | sortBy=sortOrder — name, descriptor, priceFromAud, inclusions[] |
| Surgical procedures table | list | Collection: PriceListItems | filter sheet=surgical, group by category — name, priceIdr2025, priceIdr2026 |
| Non-surgical table | list | Collection: PriceListItems | filter sheet=non-surgical |
| Machine treatments table (3-tier pricing) | list | Collection: MachineTreatments | machineName, area, standardIdr, kitasKtpIdr, packageIdr |
| Injectable products table | list | Collection: InjectableProducts | name, brand, unit, priceIdr |
| Hair removal table | list | Collection: HairRemovalAreas | area, bodyZone, priceIdr |
| Inclusion list (universal) | list | Collection: InclusionItems | scope=surgical-procedure |
| Exclusion list (universal) | list | Collection: ExclusionItems | scope=surgical-procedure |
| CTA band | block | Pages | pages(slug=pricing).sections[last].block=CTABand |

### 3.13 `/recovery-stays`

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Chapter opener | block | Pages | pages(slug=recovery-stays).sections[0].block=ChapterOpener |
| Villa cards | list | Collection: RecoveryStays | sortBy=sortOrder — name, location, heroImage, gallery, descriptor, amenities, priceFromAudPerNight, partnerUrl |
| Map embed (optional) | block | Pages | pages(slug=recovery-stays).sections[?].block=ExternalEmbed |
| CTA band | block | Pages | (as above) |

### 3.14 `/contact`

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Chapter opener | block | Pages | pages(slug=contact).sections[0].block=ChapterOpener |
| Enquiry form | block | Pages + FormDefaults | pages(slug=contact).sections[?].block=ContactForm + FormDefaults |
| Form submit → Enquiries.create | hook | Collection: Enquiries | sourcePage=/contact |
| Hours strip | text | Global: Settings | hoursMonFri, hoursSatSun |
| Address block | text | Global: Settings | addressLine1, addressLine2, city, postalCode, country |
| Phone / WhatsApp / Email links | text | Global: Settings | contactPhone, whatsappNumber, contactEmail |
| Map embed | block | Pages | pages(slug=contact).sections[?].block=ExternalEmbed |
| CTA band | block | Pages | (as above) |

### 3.15 `/video-consult`

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Chapter opener | block | Pages | pages(slug=video-consult).sections[0].block=ChapterOpener |
| Body sections | blocks | Pages | pages(slug=video-consult).sections[*] |
| Booking widget embed | block | Pages | pages(slug=video-consult).sections[?].block=ExternalEmbed |
| Form (optional) | block | Pages + FormDefaults | ContactForm block |

### 3.16 `/funnel-assessment`

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Chapter opener | block | Pages | pages(slug=funnel-assessment).sections[0].block=ChapterOpener |
| Assessment questions | blocks | Pages | pages(slug=funnel-assessment).sections[*].block=RichText / RichTextWithChoices (custom block, TBD) |
| Lead-magnet capture form | block | Pages + FormDefaults | ContactForm with sourceCta="funnel" |
| Result page (downloadable PDF) | block | Pages | ExternalEmbed or RichText with link |

### 3.17 `/blog` + `/blog/:slug`

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Blog index chapter | block | Pages | pages(slug=blog).sections[0].block=ChapterOpener |
| Filter chips | list | Collection: BlogTags | iterate |
| Post cards | list | Collection: BlogPosts | filter publishStatus=published, sortBy=publishedAt DESC — heroImage, title, lede, author.name, publishedAt, tags |
| Post detail: title, lede | text | BlogPosts | .title, .lede |
| Post detail: hero image | image | BlogPosts | .heroImage |
| Post detail: body | richtext | BlogPosts | .body (richtext via Lexical) |
| Author byline | data | BlogPosts + Authors | .author → portrait, name, role |
| Tags | list | BlogPosts | .tags[] |
| Reading time | text | BlogPosts | .readingTimeMinutes (auto-computed) |

### 3.18 `/privacy`

| Surface | Type | CMS source | Field path |
|---|---|---|---|
| Shell | shell | Globals | — |
| Chapter opener | block | Pages | pages(slug=privacy).sections[0].block=ChapterOpener |
| Body | richtext | Pages | pages(slug=privacy).sections[?].block=RichText (long-form policy) |

### 3.19 `/admin` — Payload (Cosmedic CMS)

Not part of the public site map but covered for completeness. See `docs/cms_info.md`.

| Surface | Source |
|---|---|
| Login screen hero | custom component `CosmedicBeforeLogin` |
| Admin nav logo (collapsed) | custom component `CosmedicIcon` |
| Admin nav logo (expanded) | custom component `CosmedicLogo` (no-op) |
| Admin palette + typography | `admin-theme.css` |
| Light/dark toggle | Payload built-in (`admin.theme: 'all'`) |
| Title suffix | `admin.meta.titleSuffix: ' — Cosmedic CMS'` |
| Favicon | `admin.meta.icons[0].url: /cosmedic-favicon.png` |

---

## 4. Reverse map: CMS entity → pages

### 4.1 Collections

| Collection | Pages where it surfaces |
|---|---|
| **Surgeons** | `/`, `/surgeons`, `/surgeons/:slug`, `/treatments/:discipline` (leadSurgeons), `/treatments/:discipline/:sub` (leadSurgeon), `/treatments/:discipline/:sub/:procedure` (surgeonsCredentialed), Header mega-menu (Surgeons), Footer Surgeons column, Stories detail (surgeon attribution) |
| **Disciplines** | `/`, `/treatments`, `/treatments/:discipline`, Header mega-menu (Treatments column headings), Footer Treatments column, breadcrumbs on sub-category & procedure pages |
| **SubCategories** | `/treatments/:discipline`, `/treatments/:discipline/:sub`, Header mega-menu (Treatments items), breadcrumbs on procedure pages |
| **Procedures** | `/`, `/pricing` (rows), `/treatments/:discipline/:sub`, `/treatments/:discipline/:sub/:procedure`, `/surgeons/:slug` (credentialedProcedures), related-procedures cross-links |
| **PriceListItems** | `/pricing` (the bulk table) |
| **InjectableProducts** | `/pricing` (injectables table) |
| **MachineTreatments** | `/pricing` (machine treatments tier table) |
| **HairRemovalAreas** | `/pricing` (BTL section) |
| **BeforeAfterCases** | `/`, `/gallery`, `/treatments/:discipline/:sub/:procedure` (related) |
| **Stories** | `/`, `/stories`, `/surgeons/:slug` (filtered by surgeon) |
| **PressMentions** | `/press` |
| **Awards** | `/press`, `/` (via BrandStats if "#1 hospital 2026" repeated there) |
| **RecoveryStays** | `/recovery-stays`, `/treatments/:discipline/:sub/:procedure` (optional recovery suggestion) |
| **PricingTiers** | `/pricing` |
| **BlogPosts / BlogTags / Authors** | `/blog`, `/blog/:slug` |
| **Pages** | every editorial page route |
| **JourneySteps** | `/journey`, `/` (teaser), `/treatments/:discipline/:sub/:procedure` (recoveryTimeline) |
| **InclusionItems / ExclusionItems** | `/treatments/:discipline/:sub/:procedure` (includes/excludes), `/pricing` (universal lists) |
| **Enquiries** | Form submissions only — never displayed on public site |
| **Media** | Every image on every page |

### 4.2 Globals

| Global | Routes |
|---|---|
| **Header** | every public route |
| **Footer** | every public route |
| **FloatingChrome** | every public route |
| **Settings** | every page (locale, contact info, social, IDR↔AUD rate, IDR rounding) |
| **BrandStats** | `/`, `/press` (if referenced) |
| **EndorsementMark** | every page (lockup variant chosen by surface), brand book reference |
| **ConsultationPolicy** | `/pricing`, `/contact`, every procedure detail (per `displayOn` setting) |
| **FormDefaults** | `/` (hero form), `/contact`, `/funnel-assessment`, `/video-consult`, anywhere ContactForm block appears |
| **EmailTemplates** | not on public UI — used by hooks for outbound mail |
| **SeoDefaults** | every page head (`<title>`, meta description, OG image, robots.txt, sitemap) |

---

## 5. Coverage audit checklist

Run before Phase 11 sign-off. Each row should be ✅ before launch.

### Per-page coverage

- [ ] **`/`** — every heading, lede, CTA label, form label, stat number, and image traces to Pages(slug=home), Disciplines, Surgeons, BeforeAfterCases, JourneySteps, Stories, BrandStats, or globals
- [ ] **`/treatments`** — chapter copy + 6 discipline cards driven by CMS
- [ ] **`/treatments/:discipline` × 6** — chapter, overview, sub-category cards, lead surgeon, FAQs all CMS-driven
- [ ] **`/treatments/:discipline/:sub` × 18** — same as above + procedures list
- [ ] **`/treatments/:discipline/:sub/:procedure` × 41+** — chapter, sections, pricing, includes/excludes, recovery timeline, FAQs, related cases all CMS-driven
- [ ] **`/surgeons`** — chapter + grouped grids
- [ ] **`/surgeons/:slug` × 8** — every field on the page is in Surgeons or linked
- [ ] **`/journey`** — every step is a JourneySteps record
- [ ] **`/gallery`** — every B&A composite, alt text, and tag in BeforeAfterCases
- [ ] **`/stories`** — every testimonial in Stories
- [ ] **`/press`** — every mention + every award is in PressMentions/Awards
- [ ] **`/pricing`** — every row sources from PriceListItems, Procedures.pricing, MachineTreatments, InjectableProducts, HairRemovalAreas, PricingTiers — no hard-coded prices
- [ ] **`/recovery-stays`** — every villa in RecoveryStays
- [ ] **`/contact`** — copy in Pages, form labels in FormDefaults, contact info in Settings
- [ ] **`/video-consult`** — copy + embed in Pages
- [ ] **`/funnel-assessment`** — questions + capture in Pages + FormDefaults
- [ ] **`/blog`, `/blog/:slug`** — content in BlogPosts; tags + authors as relationships
- [ ] **`/privacy`** — long-form richtext in Pages

### Cross-cutting

- [ ] Header nav labels, mega-menu items, EN|ID labels all in Global: Header
- [ ] Footer columns, social, address, copyright all in Global: Footer / Settings
- [ ] Floating CTA + chat in Global: FloatingChrome
- [ ] Every Media has non-empty `alt` (required field — enforced by `media.beforeValidate` hook)
- [ ] Every Pages record has SEO group filled (title, description, OG image)
- [ ] Every editorial field has `en` + `id` content (Phase 9)
- [ ] Pricing display reads `Settings.audToIdrRate` (no hard-coded 10500)
- [ ] Brand stats (28 years / 8 / 3,400+ / #1) read from BrandStats global, not hard-coded
- [ ] "Managed by BIMC Hospital" line reads from EndorsementMark global
- [ ] Consultation fee + waiver text reads from ConsultationPolicy global
- [ ] No string "Plan your treatment" / "Begin enquiry" / "Read more" appears in code without a CMS lookup (use FormDefaults / Pages / globals)

### Hooks & integrations

- [ ] `enquiries.afterChange` fires email-notify on every create
- [ ] `media.beforeValidate` rejects empty `alt`
- [ ] `pages.afterChange` (and similar on Surgeons/Procedures/etc.) POSTs to web `/api/revalidate`
- [ ] `priceListItems.beforeChange` auto-links to matching Procedures by name
- [ ] Sitemap regenerates on any page-bound mutation
- [ ] Login uses CosmedicBeforeLogin (not Payload default)

### Pixel-fidelity tie-in (Non-negotiable #1)

- [ ] Every UI surface listed in §3 renders identically to its design source in `design/`
- [ ] Playwright visual regression covers every route × every breakpoint (Phase 11)

---

## 6. Notes & gaps

- **Pages collection drives a LOT.** Each route's hero, body sections, SEO override, and per-page CTAs live there. Editors should not have to touch any other collection just to tweak a page's copy.
- **Section blocks are the editor's flex layer.** Adding a new content block to any page means editing that Pages record's `sections` array in `/admin` — no developer involvement.
- **Auto-populated mega-menus + footer columns** stay in sync with collections via `afterChange` hooks. Manually-curated overrides remain possible via Header/Footer globals.
- **Form copy lives in FormDefaults** — one global controls every form on the site, but each ContactForm block can override per-instance via `defaultsOverride`.
- **Pricing display logic lives in `<PriceTag>`** — single point of truth for IDR formatting (rounded to nearest 50,000 per Settings.roundIdrTo) + AUD italic underneath when `Settings.currencyDisplayMode = idr-with-aud`.
- **Open gaps to resolve**:
  - PressMentions seed data — clinic to provide.
  - Awards seed data — clinic to provide (we know "#1 hospital 2026" from brand.pdf).
  - Stories seed data — clinic to provide.
  - Authors + BlogTags — empty until blog content begins.
  - `funnel-assessment` may need a custom block type (`AssessmentQuestion`) — to spec in Phase 5.
