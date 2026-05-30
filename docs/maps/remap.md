# Cosmedic CMS — Admin ↔ Site IA Remap

> Date: 2026-05-24
> Status: PROPOSED — not yet implemented. Implementation plan: [remap_plan.md](./remap_plan.md).
> Scope: Whole admin sidebar (top-level Buckets + per-Bucket items). Bucket realignment is the first slice; per-Bucket item detail follows Bucket by Bucket.
>
> **Planning state:** ✅ ALL 10 BUCKETS MAPPED (Users · a. Homepage · b. Treatments · c. Doctors · d. Results · e. Pricing · f. Journey · g. Contact · h. About · i. Media Library)
>
> **Item ordering rule (applied uniformly):** within each Bucket, directly-editable Items come first; **-View** and **-Template** Items are placed last (they are secondary — view items display data from elsewhere, template items hold chrome shared across N detail routes).

## Goal

Establish a **one-to-one mental model** between the Cosmedic CMS admin sidebar and the live site's information architecture:

1. **Bucket level** — every CMS Bucket maps to exactly one site IA section, named the same way the site names it (header label / footer column / page name).
2. **Item level** — every visible atom on a site page maps to exactly one Admin Item in the owning Bucket; every Admin Item maps to exactly one visible section.

No site UI change. No data loss. No unilateral deletes.

## Naming convention

Two levels of alphabetic prefixes force Payload's default alphabetical sort to match the editor's reading order:

- **Bucket** prefixes — `a.` / `b.` / `c.` … on the Bucket label (Payload `admin.group` string). Order mirrors top-nav reading order (Homepage → Treatments → Doctors → Results → Pricing → Journey → Contact), then footer-only / utility Buckets at the end.
- **Item** prefixes — `a.` / `b.` / `c.` … on the Admin Item's sidebar label inside its Bucket. Order mirrors page reading order (Main → Hero → first section → second section → …).

---

## 1. Site IA → Bucket Realignment

### 1.1 The mismatch we're fixing

The current 8 Buckets (per `admin.group` values in code) do not match the site's IA. Most visible mismatches:

| Route | Where the SITE puts it (Header / Footer) | Where the CMS puts it today (admin.group) |
|---|---|---|
| `/stories` | Top-nav: **Results** (active for `/results`, `/gallery`, `/stories`) | Journey Bucket ❌ — should follow site IA → Results |
| `/recovery-stays` | Not in main nav (inline link from `/` Place section only) | Journey Bucket — folds in as part of patient journey (Step 06 = "Recover") |
| `/blog` + `/blog/<slug>` | Footer "About" column | Journey Bucket ❌ — should follow site IA → About |
| `/press` | Footer "About" column | Homepage Bucket ❌ — should follow site IA → About |
| `/privacy` | Footer "About" column | Homepage Bucket ❌ — should follow site IA → About |

### 1.2 Target Bucket structure — 9 prefixed Buckets + Users (10 total)

| Prefix | Bucket label (`admin.group`) | Routes governed | Site IA surface |
|---|---|---|---|
| **a.** | **a. Homepage** | `/` | Homepage + sitewide shell chrome (header / footer / floating CTA / brand stats / accreditation mark / SEO defaults) |
| **b.** | **b. Treatments** | `/treatments` + 6 discipline routes + 22 sub-category routes | Top-nav "Treatments" (mega-menu) |
| **c.** | **c. Doctors** | `/surgeons` + 8 surgeon detail routes | Reached via "Our Doctors" in Treatments mega-menu |
| **d.** | **d. Results** | `/results`, `/gallery`, `/stories` | Top-nav "Results" (active for all three) |
| **e.** | **e. Pricing** | `/pricing` | Top-nav "Pricing" |
| **f.** | **f. Journey** | `/journey` + `/recovery-stays` | Top-nav "Your Journey" (page) + Recovery is the expanded view of Step 06 "Recover" |
| **g.** | **g. Contact** | `/contact`, `/video-consult` | Top-nav "Contact" (+ video-consult reached via treatment-row CTAs) |
| **h.** | **h. About** | `/blog`, `/blog/<slug>`, `/press`, `/privacy` | Footer "About" column |
| **i.** | **i. Media Library** | (no public route) | Global asset store used by every page |
| — | **Users** *(ungrouped, unchanged)* | (no public route) | Admin auth plumbing — not editorial |

`h. About` carries `admin.description`: "Editorial pages reached from the footer 'About' column — Press, Blog (+ posts), Privacy & Terms. There is no `/about` page itself."

### 1.3 What moves where (file-by-file move list)

#### Globals (10 in `src/globals/` + 14 in `src/globals/pages/`)

| File | Current `admin.group` | Target `admin.group` |
|---|---|---|
| `globals/Settings.ts` | Homepage | **a. Homepage** |
| `globals/Header.ts` | Homepage | **a. Homepage** |
| `globals/Footer.ts` | Homepage | **a. Homepage** |
| `globals/FloatingChrome.ts` | Homepage | **a. Homepage** |
| `globals/BrandStats.ts` | Homepage | **a. Homepage** |
| `globals/EndorsementMark.ts` | Homepage | **a. Homepage** |
| `globals/SeoDefaults.ts` | Homepage | **a. Homepage** |
| `globals/FormDefaults.ts` | Contact | **g. Contact** |
| `globals/EmailTemplates.ts` | Contact | **g. Contact** |
| `globals/ConsultationPolicy.ts` | Pricing | **e. Pricing** |
| `globals/pages/HomePage.ts` | Homepage | **a. Homepage** |
| `globals/pages/TreatmentsPage.ts` | Treatments | **b. Treatments** |
| `globals/pages/SurgeonsPage.ts` | Doctors | **c. Doctors** |
| `globals/pages/ResultsPage.ts` | Results | **d. Results** |
| `globals/pages/GalleryPage.ts` | Results | **d. Results** |
| `globals/pages/StoriesPage.ts` | Journey | **d. Results** *(MOVE)* |
| `globals/pages/PricingPage.ts` | Pricing | **e. Pricing** |
| `globals/pages/JourneyPage.ts` | Journey | **f. Journey** *(rename)* |
| `globals/pages/ContactPage.ts` | Contact | **g. Contact** |
| `globals/pages/VideoConsultPage.ts` | Contact | **g. Contact** |
| `globals/pages/RecoveryStaysPage.ts` | Journey | **f. Journey** *(stays in Journey under merged scope)* |
| `globals/pages/BlogPage.ts` | Journey | **h. About** *(MOVE)* |
| `globals/pages/PressPage.ts` | Homepage | **h. About** *(MOVE)* |
| `globals/pages/PrivacyPage.ts` | Homepage | **h. About** *(MOVE)* |

#### Collections (16 in `src/collections/`)

| File | Current `admin.group` | Target `admin.group` |
|---|---|---|
| `collections/Users.ts` | (ungrouped) | (ungrouped — admin auth plumbing) |
| `collections/Media.ts` | Media Library | **i. Media Library** |
| `collections/Surgeons.ts` | Doctors | **c. Doctors** |
| `collections/Disciplines.ts` | Treatments | **b. Treatments** |
| `collections/SubCategories.ts` | Treatments | **b. Treatments** |
| `collections/Procedures.ts` | Treatments | **b. Treatments** |
| `collections/BeforeAfterCases.ts` | Results | **d. Results** |
| `collections/Stories.ts` | Journey | **d. Results** *(MOVE)* |
| `collections/PressMentions.ts` | Homepage | **h. About** *(MOVE)* |
| `collections/Awards.ts` | Homepage | **h. About** *(MOVE)* |
| `collections/RecoveryStays.ts` | Journey | **f. Journey** *(stays in Journey under merged scope)* |
| `collections/BlogPosts.ts` | Journey | **h. About** *(MOVE)* |
| `collections/BlogTags.ts` | Journey | **h. About** *(MOVE)* |
| `collections/Authors.ts` | Journey | **h. About** *(MOVE)* |
| `collections/JourneySteps.ts` | Journey | **f. Journey** *(rename)* |
| `collections/Enquiries.ts` | Contact | **g. Contact** |

#### Tally

- **24 files touched** (`admin.group` string change only — no field changes, no data migration)
- **7 items MOVE Bucket** (Stories collection + StoriesPage → Results; BlogPosts + BlogTags + Authors + BlogPage → About; PressMentions + Awards + PressPage + PrivacyPage → About)
- **0 data lost**, **0 site UI change**, **0 field schema change**

Implementation lives in [remap_plan.md](./remap_plan.md) Phase R0.

---

## 2. Per-Bucket Detail (10 of 10 mapped)

Each Bucket's Admin Items → Site Page → Site Surface in one table per Bucket. **All 10 mapped.** Implementation detail (CMS schema, route rewires, seed migrations, verification, estimates) lives in [remap_plan.md](./remap_plan.md) Phases R1–R8.

### 2.0 — Bucket "Users" (ungrouped — admin auth)

| Admin Item | Site Page | Site Surface |
|---|---|---|
| Users | (no public route) | Admin authentication — login, role, permissions |

### 2.a — Bucket "a. Homepage"

Covers `/` plus every sitewide chrome surface. Items a–l are directly editable; items m–r are intra/cross-bucket views (suffix `-View`: card data lives in the named source Item).

| Admin Item | Site Page | Site Surface |
|---|---|---|
| a. Main | `/` | Page meta + SEO + CmsExtraBlocks slot |
| b. Hero | `/` | Hero — chapter eyebrow, title, lede, hero image, quick-form labels |
| c. Header | All pages | Sitewide header — logo, nav labels, mega-menu config, CTA label, language switcher copy |
| d. Footer | All pages | Sitewide footer — logoLight, 3 link columns (Treatments / About / Connect), copyright template + management / legal-entity / designer lines |
| e. Intro | `/` | Intro section — pull-quote (pre / accent / post), 2-column body |
| f. Trust-Strip | `/` | TrustStrip stat tiles below Hero (BrandStats global) |
| g. Lead-Magnet | `/` | Lead Magnet section — cover, body eyebrow / heading / lede, form labels, success message |
| h. Place | `/` | Place section — eyebrow, heading, body, 4-row content |
| i. Floating-CTA | All pages | Floating overlay — CTA pill label + href, WhatsApp button, helper copy |
| j. Endorsement | All pages | Accreditation lockup — JCI / ACHSI etc. labels shown in shell |
| k. SEO-Defaults | All pages | SEO fallbacks — title template, description, OG image fallback |
| l. Settings | All pages | Clinic identity — phone, email, WhatsApp, address, hours, social links, currency rules (single source of truth) |
| m. Treatments-View | `/` | Treatments preview chrome — eyebrow / heading / lede / CTA (cards from b. Treatments → Disciplines) |
| n. Pricing-View | `/` | Pricing preview chrome — eyebrow / heading / lede / footnote / CTA (prices from e. Pricing → PriceListItems) |
| o. Surgeons-View | `/` | Surgeons preview chrome — eyebrow / heading / lede / lead-surgeon block / CTA (cards from c. Doctors → Surgeons) |
| p. Gallery-View | `/` | Gallery preview chrome — eyebrow / heading / lede / CTA (BA pairs from d. Results → i. Before-After-Cases) |
| q. Journey-View | `/` | Journey preview chrome — eyebrow / heading / lede / CTA (steps from f. Journey → c. Steps) |
| r. Stories-View | `/` | Stories preview chrome — eyebrow / heading / lede / CTA (quotes from d. Results → j. Patient-Stories) |

### 2.b — Bucket "b. Treatments"

Covers `/treatments` (index) + `/treatments/<discipline>` × 6 + `/treatments/<sub-cat>` × 22 = **29 routes**. The 3 Collections (e/f/g) are the canonical source — Disciplines feed mega-menu L1 + homepage Treatments-View; Sub-Categories feed mega-menu L2; Procedures feed sub-category accordions + `/pricing` tables (cross-bucket read by `e. Pricing`).

| Admin Item | Site Page | Site Surface |
|---|---|---|
| a. Main | `/treatments` | Page meta + SEO + CmsExtraBlocks slot |
| b. Hero | `/treatments` | ChapterOpener — chapter, title A, title B, lede, hero image, imageHue, imageLabel, breadcrumbs |
| c. Index | `/treatments` | "An Index" section — eyebrow, heading, lede, "Read more →" CTA template |
| d. Stats | `/treatments` | StatsRow — 4 stat tiles (number + label each) |
| e. Disciplines | `/treatments` + `/treatments/<discipline>` × 6 | Disciplines Collection — 6 records (title, subtitle, displayCount, hue, body, chapterTitle, tagline, lede, overview, heroImage, leadSurgeons, faqs, SEO). Also feeds Treatments mega-menu L1 + `/` Treatments-View + Footer Treatments column |
| f. Sub-Categories | `/treatments/<sub-cat>` × 22 | Sub-Categories Collection — 22 records (title, parent, chapterTitle, tagline, lede, intro, overview, leadSurgeon, sections, faqs, heroImage, SEO). Also feeds Treatments mega-menu L2 |
| g. Procedures | `/treatments/<sub-cat>` accordion + `/pricing` tables (cross-bucket → e. Pricing) | Procedures Collection — 233 records (slug, name, catalogueGroup, pricing.*, editorial fields where populated, surgeonsCredentialed, relatedBA, relatedProcedures, sortOrder, SEO) |
| h. Discipline-Template | `/treatments/<discipline>` × 6 | Shared template chrome — TOC labels, "Choose a focus" heading + body, "Read more →"/"Coming v1.4" labels, "Frequently asked" heading, "Related" eyebrow + heading + lede template |
| i. Sub-Category-Template | `/treatments/<sub-cat>` × 22 | Shared template chrome — chapter format template, TOC labels, "Take a step" sidebar (3 CTA labels + reply line), "Treatments" h2 + intro, ProcedureFactsPanel chrome, "Frequently asked" heading |

### 2.c — Bucket "c. Doctors"

Covers `/surgeons` (index) + `/surgeons/<slug>` × 8 (detail). The Surgeons Collection (g.) is the canonical source consumed sitewide.

| Admin Item | Site Page | Site Surface |
|---|---|---|
| a. Main | `/surgeons` | Page meta + SEO + CmsExtraBlocks slot |
| b. Hero | `/surgeons` | Hero — chapter eyebrow, 2-line title, lede, hero image, image label, breadcrumbs |
| c. Surgeons | `/surgeons` + `/surgeons/<slug>` × 8 | Surgeons Collection — 8 doctor records (name, portrait, spec, bio, years, specAreas, group, lead flag, credentials, languages, availability, sortOrder, SEO). Read also by `/`, `/treatments/<discipline>`, `/blog/<slug>` |
| d. Lead-View | `/surgeons` | Lead Surgeon panel chrome — section eyebrow, block eyebrow, 3 stat labels, "Read the full profile" CTA (lead row from c.) |
| e. Plastic-Surgery-View | `/surgeons` | Plastic Surgery section chrome — eyebrow, heading, lede (cards from c., group=plastic-surgery non-lead) |
| f. Aesthetic-Medicine-View | `/surgeons` | Aesthetic Medicine section chrome — eyebrow, heading, lede (cards from c., group=aesthetic-medicine) |
| g. Detail-Template | `/surgeons/<slug>` × 8 | Shared template chrome — hero eyebrow toggle, hero CTA, breadcrumb labels, 3 stat labels, Biography eyebrow + 4 sidebar dt labels, fallbacks, Specialty Areas + Training & Credentials + Faculty section headings |

### 2.d — Bucket "d. Results"

Covers `/results` (hybrid index — both BA + Stories teasers) + `/gallery` (full BA list) + `/stories` (full quote list). Two shared CTA globals close cross-page duplication (Rule 8).

| Admin Item | Site Page | Site Surface |
|---|---|---|
| a. Main | `/results` | Page meta + SEO + CmsExtraBlocks slot |
| b. Hero | `/results` | ChapterOpener — chapter, title A, title B, lede, hero image, imageHue, imageLabel, breadcrumbs |
| c. Library-Cta | `/results` + `/gallery` | "Private gallery / Want to see more?" CTA — eyebrow, heading, body, button label, href (shared) |
| d. Share-Cta | `/results` + `/stories` | "Sharing your story / Have a story to share?" CTA — eyebrow, heading, body, button label, href (shared) |
| e. Gallery | `/gallery` | Whole page — hero, filter chrome (cards from g.; CTA from c.) |
| f. Stories | `/stories` | Whole page — hero, story-rows section chrome (rows from h.; CTA from d.) |
| g. Before-After-Cases | `/results` + `/gallery` | BeforeAfterCases Collection — the case rows |
| h. Patient-Stories | `/results` + `/stories` | Stories Collection (label-only rename to disambiguate from f.) — patient-quote rows. Payload slug `stories` unchanged. |
| i. Featured-Cases-View | `/results` | "Four signature cases" chrome — eyebrow, heading, lede, filter-bar label, "{n} cases · facial" count format (cards from g.) |
| j. Stories-View | `/results` | "Stories, not slogans" chrome — eyebrow, heading, lede (rows from h.) |

### 2.e — Bucket "e. Pricing"

Covers `/pricing`. Discipline price list + clinic catalogue table cards are sourced cross-bucket from b. Treatments (e. Disciplines + f. Sub-Categories + g. Procedures); this Bucket owns the section chrome and the consultation policy callout.

| Admin Item | Site Page | Site Surface |
|---|---|---|
| a. Main | `/pricing` | Page meta + SEO + CmsExtraBlocks slot |
| b. Hero | `/pricing` | ChapterOpener — chapter, title A, title B, lede, hero image, imageHue, imageLabel, breadcrumbs |
| c. Overview | `/pricing` | Editorial overview between hero and price list — eyebrow, heading parts (roman + italic), body |
| d. Footnote | `/pricing` | Centred italic footnote text |
| e. Insurance | `/pricing` | Insurance section — eyebrow, heading roman + italic, body paragraphs |
| f. Payment | `/pricing` | Payment section — eyebrow, heading roman + italic, key/value terms list |
| g. Consultation | `/pricing` (+ optional `/contact`, `/procedure-detail` per displayOn) | Consultation fee callout — feeIdr, feeAud, waiverConditionText, displayOn select |
| h. Discipline-List-View | `/pricing` | Discipline-grouped price list chrome — "On request" / "Included" / arrow labels (rows from b. Treatments → e. + f. + g.) |
| i. Catalogue-View | `/pricing` | Clinic catalogue table chrome — eyebrow, heading + italic accent, intro paragraph template, 4 sheet titles + subtitles (Surgical / Machine / Injection / BTL), category-group chrome, hair-zone labels, injectable-category labels (rows from b. Treatments → g. Procedures filtered by catalogueGroup) |

### 2.f — Bucket "f. Journey"

Covers `/journey` + `/recovery-stays` (the expanded view of Step 06 "Recover").

| Admin Item | Site Page | Site Surface |
|---|---|---|
| a. Main | `/journey` | Page meta + SEO + CmsExtraBlocks slot |
| b. Hero | `/journey` | ChapterOpener — chapter, title A, title B, lede, hero image, breadcrumbs |
| c. Steps | `/journey` | JourneySteps Collection — 7-row body (number, title, body, 4 bullets, image) |
| d. Stats | `/journey` | Bottom stats row — 3 cells (number + label) |
| e. Recovery-Stays | `/recovery-stays` | Whole page — Hero, top stats row, portfolio section chrome, inclusions section chrome |
| f. Villas | `/recovery-stays` | RecoveryStays Collection — 6 villa rows (name, location, bedrooms, pool, price, body, image, drive-time) |

### 2.g — Bucket "g. Contact"

Covers `/contact` + `/video-consult`. Address / hours / phone / email read from a. Homepage → l. Settings (single source of truth).

| Admin Item | Site Page | Site Surface |
|---|---|---|
| a. Main | `/contact` | Page meta + SEO + CmsExtraBlocks slot |
| b. Hero | `/contact` | Hero — chapter eyebrow, title A, title B, lede, hero image, breadcrumbs |
| c. Enquiry-Section | `/contact` | "The Enquiry" — eyebrow, heading, intro, Direct lines (live-preview of Settings phone/email), trust line |
| d. Visit-Section | `/contact` | "Visit" — eyebrow, heading, body, Maps labels, map image, concierge hours (live-preview of Settings address/hours/maps URL) |
| e. Form | `/contact` + `/` hero quick-form + `/video-consult` | Form copy — labels, placeholders, submit, success / error / rate-limit messages |
| f. Email | (post-submit) | Email templates — clinic-notify + autoresponder |
| g. Inbox | (admin-only) | Enquiries Collection — submission rows, never rendered on site |
| h. Video-Consult | `/video-consult` | Whole page — Hero, "What to expect" 4 bullets, booking form chrome, confirmation copy |

### 2.h — Bucket "h. About"

Covers `/blog`, `/blog/<slug>`, `/press`, `/privacy` — the 4 routes the footer's "About" column links to. Three contiguous clusters: Blog (a–e), Press (f–h), Privacy (i–j). Fully self-contained.

| Admin Item | Site Page | Site Surface |
|---|---|---|
| a. Blog | `/blog` | Hero + "This issue" featured chrome + "The archive" section chrome (eyebrow, heading, lede, "filter by" label, empty-state copy) |
| b. Blog-Posts | `/blog` + `/blog/<slug>` | BlogPosts Collection — every post row (hero, body, dek, author ref, tag refs, date, image, featured flag) |
| c. Blog-Tags | `/blog` | BlogTags Collection — filter taxonomy |
| d. Authors | `/blog/<slug>` | Authors Collection — author rows (name, role, bio, portrait) |
| e. Press | `/press` | Hero + Accreditations section chrome + Press section chrome |
| f. Press-Mentions | `/press` | PressMentions Collection — headline rows |
| g. Awards | `/press` | Awards Collection — accreditation rows |
| h. Privacy | `/privacy` | Hero + "Last updated" date + intro chrome |
| i. Privacy-Sections | `/privacy` | NEW Collection — 10 legal section rows (sortOrder, heading, rich-text body) |
| j. Blog-Post-Template | `/blog/<slug>` | Per-post template — byline chrome, "About the author" + "More from the journal" section headings (NEW global) |

### 2.i — Bucket "i. Media Library"

| Admin Item | Site Page | Site Surface |
|---|---|---|
| Media | (sitewide) | Asset library — image / file upload target for every page upload field. Folders + 9-value bucket category select for asset browsing. |

---

## 3. Rules honoured (whole remap)

- **Non-negotiable #3** — every editorial string lives in CMS. Today 2/34 routes honour this; this remap moves that to 34/34 by the end of all per-Bucket phases.
- **Cosmedic rule 1 — Simplify.** Bucket count goes from 8 → 9 (plus Users). Recovery merges into Journey rather than getting its own Bucket; About absorbs scattered footer-only content.
- **Cosmedic rule 2 — Preserve granular control.** Every visible atom remains editable. Cross-bucket mirrors keep Settings as single source of truth for clinic identity.
- **Cosmedic rule 3 — No front-side visual change.** Bucket renames + admin.group moves do not touch frontend rendering. Per-Bucket detail phases seed new globals with current hardcoded strings to keep the site byte-identical before / after.
- **Cosmedic rule 4 — No unilateral deletes.** No data lost. The `Pages` collection backup table (already retained from Item 2 close-out) is the safety net for any data that needs unwinding.
- **Cosmedic rule 5 — Plan first.** This doc + [remap_plan.md](./remap_plan.md) gate execution. Each Bucket phase ships only after this doc lists its detail.
- **Cosmedic rule 6 — Intuitive site ↔ CMS mapping.** Bucket labels mirror site nav surfaces: top-nav labels for a/b/c/d/e/f/g, footer "About" column label for h.
- **Cosmedic rule 7 — Verify before user-tests.** Each phase ends with a curl-based smoke check + visual diff before the editor is told "go look."
- **Cosmedic rule 8 — Universal coverage, no duplication.** Every visible atom on the live site must be manageable from the CMS. No atom is duplicated across multiple editable CMS fields — each atom has exactly one source-of-truth field; other surfaces that need the same value use a read-only mirror that points back to the source (signposted in `admin.description`). Example: clinic phone lives only on `l. Settings → contactPhone`; `/contact`'s Enquiry-Section displays it read-only.
- **Cosmedic rule 9 — Full Payload capability preserved.** Every Payload feature (REST + GraphQL APIs, drafts / preview / publish workflow, access control, role permissions, revalidate hooks, media uploads + variants + focal point, rich-text editor, admin search / filter / sort / column config, localization scaffolding, Postgres adapter + migrations) must continue to function identically before/after the remap. The remap is a sidebar reorganisation; not a Payload patching exercise. If any phase would require disabling, monkey-patching, or replacing native Payload behaviour, that phase stops and is redesigned.
