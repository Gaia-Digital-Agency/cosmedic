# Cosmedic CMS — Admin ↔ Site IA Remap

> Date: 2026-05-24
> Status: PROPOSED — not yet implemented. Implementation plan: [remap_plan.md](./remap_plan.md).
> Scope: Whole admin sidebar (top-level Buckets + per-Bucket items). Bucket realignment is the first slice; per-Bucket item detail follows Bucket by Bucket.
>
> **Planning state:**
> - ✅ COMPLETE — User · Media · Journey · Contact · Homepage · About · Doctors · Results
> - ⏳ PENDING — Treatments · Pricing

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

## 2. Per-Bucket Detail

Each Bucket's Admin Items vs Site Section detail follows in its own sub-section. **Completed:** a. Homepage · c. Doctors · d. Results · f. Journey · g. Contact · h. About. **Pending:** b. Treatments · e. Pricing. (i. Media Library + Users have no editorial detail — asset store + auth plumbing respectively.)

### 2.a — Bucket "a. Homepage" detail

Covers `/` (the homepage) + every sitewide chrome surface (header / footer / floating overlay / endorsement / SEO defaults / clinic identity). Largest Bucket by item count. Two logical sub-clusters within: items **a–l** are directly editable in this Bucket (page foundation → chrome → `/` editorial sections → sitewide utility); items **m–r** are view-only mirrors whose card data is sourced from other Buckets — grouped contiguously at the bottom (Rule 6 — editor recognises them as one editorial unit).

| Admin Item (a. Homepage) | Site surface it governs |
|---|---|
| **a. Main** | `/` page meta — admin title, slug, route, publish status, SEO meta, bottom CmsExtraBlocks slot |
| **b. Hero** | `/` Hero section — chapter eyebrow, title, lede, hero image, quick-form labels |
| **c. Header** | **Sitewide** header (every page) — logo, nav labels, mega-menu config, CTA label, language switcher copy |
| **d. Footer** | **Sitewide** footer (every page) — logoLight, 3 link columns (Treatments / About / Connect), copyright template, **+ 3 new fields**: managementLine, legalEntityLine, designerLine |
| **e. Intro** | `/` Intro section — pull-quote (pre / accent / post), 2-column body |
| **f. Trust-Strip** | `/` TrustStrip — stat tiles below the Hero (BrandStats global, renamed) |
| **g. Lead-Magnet** | `/` Lead Magnet section — cover title, body eyebrow / heading / lede, form labels, success message |
| **h. Place** | `/` Place section — eyebrow, heading, body, 4-row content |
| **i. Floating-CTA** | **Sitewide** floating overlay — CTA pill label + href, WhatsApp button visibility, helper copy |
| **j. Endorsement** | **Sitewide** accreditation lockup — JCI / ACHSI / etc. labels shown in shell |
| **k. SEO-Defaults** | **Sitewide** SEO fallbacks — title template, description, OG image fallback (used when a page has no own SEO) |
| **l. Settings** | **Sitewide** clinic identity — phone, email, WhatsApp, address, hours, social links, currency rules. **Single source of truth** read by Footer, Floating-CTA, `/contact`, every page footer. |
| **m. Treatments-View** | `/` Treatments preview — eyebrow, heading, lede, "view all" CTA *(cards from b. Treatments → Disciplines)* |
| **n. Pricing-View** | `/` Pricing preview — eyebrow, heading, lede, footnote, CTA *(prices from e. Pricing → PriceListItems)* |
| **o. Surgeons-View** | `/` Surgeons preview — eyebrow, heading, lede, lead-surgeon block, CTA *(surgeon data from c. Doctors → Surgeons)* |
| **p. Gallery-View** | `/` Gallery preview — eyebrow, heading, lede, CTA *(B&A pairs from d. Results → BeforeAfterCases)* |
| **q. Journey-View** | `/` Journey preview — eyebrow, heading, lede, "view all" CTA *(step previews from f. Journey → Steps)* |
| **r. Stories-View** | `/` Stories preview — eyebrow, heading, lede, CTA *(story snippets from d. Results → Stories)* |

#### Item-order rationale (Homepage)

- a, b — page foundation (Main + Hero)
- c, d — sitewide visible chrome (Header at top, Footer at bottom, found together)
- e, f, g, h — remaining `/` editorial sections (Intro, Trust-Strip, Lead-Magnet, Place)
- i, j, k, l — sitewide utility (overlay, endorsement, SEO defaults, identity / Settings)
- m–r — the 6 view-only mirrors grouped contiguously at the bottom. Suffix `-View` signals the cards are display-only — edit the source data in the named Bucket. The Item itself owns only the section eyebrow / heading / lede / CTA label.

#### Coverage

Every visible atom on `/` plus every sitewide chrome surface accounted for, including the 2 hardcoded footer-bottom strings ("PT Trisaka Reksa Waluya", "Designed in Bali") which gain editable Footer fields.

| Atom group | Item that owns it |
|---|---|
| `/` Hero (chapter / title / lede / image + Hero quick-form labels) | b. Hero |
| `/` 6 view sections (eyebrow + heading + lede + CTA on each) | m–r (one item per view) |
| `/` Intro (pull-quote + 2-column body) | e. Intro |
| `/` TrustStrip (stat tiles) | f. Trust-Strip |
| `/` Lead Magnet | g. Lead-Magnet |
| `/` Place (eyebrow + heading + body + 4-row content) | h. Place |
| Sitewide header (logo / nav / mega-menu / CTA / lang switcher) | c. Header |
| Sitewide footer (logoLight / 3 columns / copyright / mgmt / legal / designer) | d. Footer |
| Sitewide floating overlay | i. Floating-CTA |
| Sitewide accreditation lockup | j. Endorsement |
| Sitewide SEO fallbacks (meta only) | k. SEO-Defaults |
| Sitewide clinic identity (phone / email / address / hours / WhatsApp / socials / currency) | l. Settings |
| `/` page meta + SEO + CmsExtraBlocks slot | a. Main |

#### Cross-bucket reads — display-only in a. Homepage

The 6 view sections (`m–r`, suffix `-View`) + Footer Treatments column display data sourced from **other** Buckets. Editor edits the source; the homepage display updates. Each `-View` item carries an `admin.description` noting *"Edit the source data in [bucket → item]. This item controls only the section's eyebrow / heading / lede / CTA label."*

| Display location (a. Homepage) | Editable source |
|---|---|
| m. Treatments-View → cards | b. Treatments → Disciplines (collection) |
| n. Pricing-View → price snippets | e. Pricing → PriceListItems (collection) |
| o. Surgeons-View → cards + lead-surgeon | c. Doctors → Surgeons (collection) |
| p. Gallery-View → B&A pairs | d. Results → BeforeAfterCases (collection) |
| q. Journey-View → step previews | f. Journey → Steps (collection) |
| r. Stories-View → story snippets | d. Results → Stories (collection) |
| d. Footer → Treatments column items | b. Treatments → Disciplines (auto-built from sortOrder + title) |

#### Cross-bucket reads — a. Homepage as source for other Buckets

`l. Settings` is the single source of truth for clinic identity site-wide. Other Buckets display these values read-only:

| Source field on l. Settings | Read-only display location |
|---|---|
| `contactPhone`, `whatsappNumber`, `contactEmail`, `pressEmail` | g. Contact → c. Enquiry-Section (Direct lines block) |
| `addressLine1` / `addressLine2` / `city` / `postalCode` / `country` | g. Contact → d. Visit-Section (Address block) + d. Footer (address block) |
| `hoursMonFri` / `hoursSatSun` | g. Contact → d. Visit-Section (Clinic hours) |
| `googleMapsUrl` | g. Contact → d. Visit-Section (Open in Maps / Get directions) |
| `whatsappNumber` | i. Floating-CTA (WhatsApp button) + d. Footer (WhatsApp link in Connect column) |
| `socialLinks[]` | d. Footer (Connect column) |
| `audToIdrRate`, `roundIdrTo`, `currencyDisplayMode` | b. Treatments + e. Pricing (all price rendering) |

### 2.c — Bucket "c. Doctors" detail

Covers `/surgeons` (index) + `/surgeons/<slug>` × 8 (detail). 7 admin items in reading order — page sections of `/surgeons` top→bottom (a–e), shared detail-template chrome for the 8 detail pages (f), then the backing Collection (g).

| Admin Item (c. Doctors) | Site page / section |
|---|---|
| **a. Main** | `/surgeons` page meta + SEO + bottom `<CmsExtraBlocks slug="surgeons"/>` slot |
| **b. Hero** | `/surgeons` Hero (chapter eyebrow, 2-line title, lede, hero image, image label, breadcrumbs) |
| **c. Lead-View** | `/surgeons` Lead Surgeon panel — chrome (section eyebrow "Lead Plastic Surgeon", block eyebrow "Lead Surgeon", 3 stat labels Trained / Specialty / Distinction, "Read the full profile" CTA); displays lead row from g. Surgeons |
| **d. Plastic-Surgery-View** | `/surgeons` Plastic Surgery section — chrome (eyebrow, heading, lede); displays group=plastic-surgery (non-lead) cards from g. Surgeons |
| **e. Aesthetic-Medicine-View** | `/surgeons` Aesthetic Medicine section — chrome (eyebrow, heading, lede); displays group=aesthetic-medicine cards from g. Surgeons |
| **f. Detail-Template** | `/surgeons/<slug>` × 8 template chrome — hero eyebrow toggle ("Lead Surgeon" / "Specialist"), hero CTA "Request a consultation", breadcrumb static labels, 3 stats-row labels (Years in practice / Distinction / Specialty), Biography eyebrow + 4 sidebar dt labels (Specialism / Credentials / Languages / Availability), Languages fallback, Availability fallback, hardcoded "Patients often describe…" paragraph, Specialty Areas eyebrow + heading template, Training & Credentials eyebrow + 5 row labels + 4 right-column phrases (MBBS/MD · Board credential · Active · Active member), Faculty eyebrow + heading ("Meet the other practitioners.") |
| **g. Surgeons** | Surgeons Collection — 8 doctor records (all field data: name, portrait, spec, bio, years, specAreas, group, lead flag, credentials, languages, availability schedule, sortOrder, SEO). Same record feeds `/surgeons` cards + lead panel + `/surgeons/<slug>` per-doctor data + faculty grid + Doctors mega-menu + discipline Lead Surgeon panels + blog bylines. |

#### Item-order rationale (Doctors)

- a, b — page foundation (Main + Hero of `/surgeons`)
- c, d, e — `/surgeons` body sections in reading order: lead spotlight → plastic grid → aesthetic grid
- f — shared chrome for the 8 `/surgeons/<slug>` detail routes
- g — the canonical Collection backing every surgeon surface across the site

#### Coverage

All visible atoms on `/surgeons` + `/surgeons/<slug>` × 8 accounted for.

| Atom group | Item that owns it |
|---|---|
| `/surgeons` Hero (6 atoms) | b. Hero |
| `/surgeons` Lead panel chrome (6 atoms) | c. Lead-View |
| `/surgeons` Lead panel data (portrait, name, suffix, cred, bio, stat values) | g. Surgeons (lead=true row) |
| `/surgeons` Plastic section chrome (3 atoms) | d. Plastic-Surgery-View |
| `/surgeons` Plastic grid cards | g. Surgeons (group=plastic-surgery, non-lead) |
| `/surgeons` Aesthetic section chrome (3 atoms) | e. Aesthetic-Medicine-View |
| `/surgeons` Aesthetic grid cards | g. Surgeons (group=aesthetic-medicine) |
| `/surgeons` page meta + SEO | a. Main |
| `/surgeons/<slug>` per-doctor data (hero portrait, name, suffix, cred, group, bio, stats values, sidebar dd values, specialty cards, training row mids, faculty grid) | g. Surgeons (the row) |
| `/surgeons/<slug>` template chrome (~24 atoms) | f. Detail-Template |

#### Cross-bucket reads — view-only fields inside f. Detail-Template

Two atoms on `/surgeons/<slug>` mirror values whose source lives outside the Doctors Bucket. Each is implemented as a read-only field on `f. Detail-Template` with `admin.description` signposting the source.

| Cosmedic CMS display location | Source field | Source Bucket → Item |
|---|---|---|
| f. Detail-Template → hero Treatments back-link CTA label | parent discipline `title` | b. Treatments → Disciplines |
| f. Detail-Template → Training table "Practice" row mid value ("BIMC CosMedic Centre, Bali") | clinic name + city | a. Homepage → r. Settings |

No standalone view-only Items — items c / d / e source from `g. Surgeons` which lives in the same Bucket.

#### Cross-bucket reads — c. Doctors as source for other Buckets

`g. Surgeons` is the canonical Collection for every surgeon surface site-wide. Other Buckets display its rows read-only:

| Source field on g. Surgeons | Read-only display location |
|---|---|
| All fields | a. Homepage → o. Surgeons-View (homepage teaser) |
| lead=true row + selected specialists | a. Homepage → c. Header (Doctors mega-menu) |
| lead-by-discipline | b. Treatments → discipline detail "Lead Surgeon" panel |
| lead-by-subcategory | b. Treatments → sub-category detail "Lead Surgeon" panel |
| authoring surgeon | h. About → c. Blog-Posts byline |

Bucket `c. Doctors` carries `admin.description`: *"Governs /surgeons + the 8 /surgeons/<slug> detail pages. The Surgeons Collection (g.) is the canonical source for every doctor surface on the site — homepage Surgeons-View, Doctors mega-menu, discipline & sub-category Lead Surgeon panels, and blog bylines all read from here."*

### 2.d — Bucket "d. Results" detail

Covers routes `/results`, `/gallery`, `/stories`. `/results` is the hybrid index page (shows both BA cases AND patient stories as teasers); `/gallery` is the full BA list; `/stories` is the full patient-quote list. Two CTA blocks are shared across pages (Rule 8 — single source). Two intra-Bucket `-View` items carry section chrome whose cards live in the same Bucket's collections.

| Admin Item (d. Results) | Site section it governs |
|---|---|
| **a. Main** | `/results` page meta — admin title, slug, route, publishStatus, SEO meta, bottom `<CmsExtraBlocks slug="results"/>` slot |
| **b. Hero** | `/results` ChapterOpener — chapter "Chapter IV — Results & Stories", title A "Quietly", title B "transformative.", lede, hero image, imageHue, imageLabel "RESULTS & STORIES", breadcrumbs |
| **c. Featured-Cases-View** | `/results` "Four signature cases, shared with permission." section chrome — eyebrow + heading + lede + filter-bar Mono label + "{n} cases · facial" count format. *Cards from `i. Before-After-Cases`* |
| **d. Stories-View** | `/results` "Stories, not slogans." section chrome — eyebrow + heading + lede. *Rows from `j. Patient-Stories`* |
| **e. Library-Cta** | "Private gallery / Want to see more?" CTA block — eyebrow, heading, body, button label, button href. **Shared by `/results` AND `/gallery`** — single source of truth |
| **f. Share-Cta** | "Sharing your story / Have a story to share?" CTA block — eyebrow, heading, body, button label, button href. **Shared by `/results` AND `/stories`** — single source of truth |
| **g. Gallery** | Whole `/gallery` page — hero (chapter "Chapter IV — Selected Results", title, lede, image, breadcrumbs) + filter-bar Mono label + "{n} cases · facial" count format. *Cards from `i. Before-After-Cases`; CTA from `e. Library-Cta`* |
| **h. Stories** | Whole `/stories` page — hero (chapter "Chapter VI — Stories", title A "In their", title B "own words.", lede, image, breadcrumbs) + story-rows section chrome. *Rows from `j. Patient-Stories`; CTA from `f. Share-Cta`* |
| **i. Before-After-Cases** | BeforeAfterCases Collection — the cases themselves. Backs `/results` Featured-Cases-View + `/gallery` grid |
| **j. Patient-Stories** | Stories Collection (label-only rename to disambiguate from `h. Stories` page) — the patient-quote rows. Backs `/stories` rows + `/results` Stories-View |

#### Item-order rationale (Results)

- a, b — `/results` page foundation (Main + Hero)
- c, d — `/results` mid-page section chrome (Featured-Cases-View + Stories-View, both intra-Bucket reads)
- e, f — shared CTA blocks (Library-Cta serves /results + /gallery; Share-Cta serves /results + /stories)
- g, h — sibling pages collapsed to one item each (`/gallery` + `/stories`)
- i, j — backing Collections (alphabetised plural nouns, mirroring f. Journey's c. Steps + f. Villas pattern)

#### Coverage

All atoms across the 3 routes accounted for. Zero orphans. Zero duplication (the 2 CTA blocks that today render twice on different pages collapse to one source each).

| Route | Atom group | Item that owns it |
|---|---|---|
| `/results` | page meta + SEO + CmsExtraBlocks slot | a. Main |
| `/results` | Hero (6 atoms) | b. Hero |
| `/results` | "Four signature cases…" section chrome (4 atoms) | c. Featured-Cases-View |
| `/results` | BA card data | i. Before-After-Cases (read by c.) |
| `/results` | "Stories, not slogans." section chrome (3 atoms) | d. Stories-View |
| `/results` | story-row data | j. Patient-Stories (read by d.) |
| `/results` | "Want to see more?" CTA (5 atoms) | e. Library-Cta |
| `/results` | "Have a story to share?" CTA (5 atoms) | f. Share-Cta |
| `/results` | § divider | decorative — no editing |
| `/gallery` | Hero + filter chrome | g. Gallery |
| `/gallery` | BA card data | i. Before-After-Cases |
| `/gallery` | "Want to see more?" CTA | e. Library-Cta (shared) |
| `/stories` | Hero + story-rows section chrome | h. Stories |
| `/stories` | 8 story rows | j. Patient-Stories |
| `/stories` | "Have a story to share?" CTA | f. Share-Cta (shared) |

#### Cross-bucket source

None. d. Results is fully self-contained — every editorial atom is sourced inside the Bucket. The two `-View` items read from collections in the same Bucket (intra-Bucket mirrors); the suffix signals "edit the cards in the named Item" regardless of Bucket.

#### Naming note — Stories disambiguation

Two items share the word "Stories": `h. Stories` (the page Global) + `j. Patient-Stories` (the collection of patient-quote rows that back it). The collection gets the prefix label `Patient-` to disambiguate in the sidebar — Payload slug stays `stories` (no DB change).

### 2.f — Bucket "f. Journey" detail

Covers routes `/journey` + `/recovery-stays`. Primary page (`/journey`) gets detailed section items; sibling page (`/recovery-stays`) collapses to one item; attached Collection becomes its own item.

| Admin Item (f. Journey) | Site section it governs |
|---|---|
| **a. Main** | `/journey` page meta — admin title, slug, route, publish status, SEO meta, bottom `<CmsExtraBlocks slug="journey"/>` slot |
| **b. Hero** | `/journey` ChapterOpener — chapter eyebrow "Chapter V — Your Journey", title A "From enquiry,", title B "to homecoming.", lede, hero image, breadcrumbs |
| **c. Steps** | `/journey` 7-step body — **JourneySteps Collection** (7 rows). Each row: step number, title (Enquiry / Consult / Plan / Arrive / Procedure / Recover / Homecoming), body, 4-bullet list (A–D), image |
| **d. Stats** | `/journey` bottom stats row — 3 cells: "24h · Reply to first enquiry", "45min · Initial consultation", "12mo · Follow-up programme" |
| **e. Recovery-Stays** | Whole `/recovery-stays` page — Hero, top stats row (6 villas / 4 locations / 5–21 nights / All provisioned), "The portfolio" section chrome, "What's included" section chrome (8 inclusion items) |
| **f. Villas** | **RecoveryStays Collection** (6 rows). Each row: villa name, location, bedrooms, pool type, "from" price, body, image, drive-time |

#### Coverage check

| Atom group | Item |
|---|---|
| `/journey` Hero (6 atoms) | b. Hero |
| `/journey` 7 steps × 8 atoms = 56 atoms | c. Steps |
| `/journey` Stats (6 atoms) | d. Stats |
| `/journey` page meta | a. Main |
| `/recovery-stays` Hero + Stats + Portfolio chrome + Inclusions section (~30 atoms) | e. Recovery-Stays |
| `/recovery-stays` 6 villa cards × ~8 atoms each = 48 atoms | f. Villas |

**Total ~146 atoms across 6 admin items.** Every visible atom on both routes accounted for.

#### Cross-bucket source

None. Neither `/journey` nor `/recovery-stays` reads from Settings.

### 2.g — Bucket "g. Contact" detail

Covers routes `/contact` + `/video-consult`. Primary page items in reading order (visible on page top→bottom), then behind-the-scenes support items (submission pipeline), then sibling page.

| Admin Item (g. Contact) | Site section it governs |
|---|---|
| **a. Main** | `/contact` page meta — admin title, slug, route, publish status, SEO meta, bottom `<CmsExtraBlocks slug="contact"/>` slot |
| **b. Hero** | `/contact` Hero — chapter eyebrow, title line A, title line B, lede, hero image, breadcrumbs |
| **c. Enquiry-Section** | `/contact` "The Enquiry" section — eyebrow, heading, intro blurb, Direct lines block *(live-preview of Settings phone/email)*, "Held in confidence…" trust line |
| **d. Visit-Section** | `/contact` "Visit" section — eyebrow, heading, body paragraph, Open in Maps / Get directions labels, map image, Concierge hours *(address / clinic hours / maps URL live-preview of Settings)* |
| **e. Form** | Form copy used by `/contact`, homepage hero quick-form, `/video-consult` — labels, placeholders, submit text, success / error / rate-limit messages |
| **f. Email** | Post-submit emails — clinic-notify (to staff) + autoresponder (to enquirer). Also used by homepage + video-consult submissions. |
| **g. Inbox** | All form submissions — admin-only data table, never rendered on the site |
| **h. Video-Consult** | Whole `/video-consult` page — Hero, "What to expect" 4 bullets, booking-form chrome, booking-confirmation copy |

#### Naming conventions applied

- **Collections** → plural noun (`c. Steps`, `f. Villas`, `g. Inbox`).
- **Globals (page-section editorial)** → singular descriptive (`a. Main`, `b. Hero`, `c. Enquiry-Section`, `d. Visit-Section`, `e. Form`, `f. Email`, `d. Stats`).
- **Sibling page collapsed** → page name with hyphen (`e. Recovery-Stays` in f. Journey; `h. Video-Consult` in g. Contact).

#### Item-order rationale (Contact)

Visible on page top→bottom (a–d) → behind the scenes in submission flow order (e–g) → sibling page (h). Editor scans the Bucket and sees the page from top to bottom, then the pipeline that processes submissions, then `/video-consult`.

#### Coverage

All **39 atoms** from the `/contact` + `/video-consult` audit are accounted for.

| Atom group | Item |
|---|---|
| Hero atoms (chapter / title A / title B / lede / image / breadcrumbs) | b. Hero |
| "The Enquiry" section editorial (7 atoms) | c. Enquiry-Section |
| "Visit" section editorial (8 atoms) | d. Visit-Section |
| Form labels / placeholders / submit / success / error / rate-limit (12 atoms) | e. Form |
| Form chip list (treatments) | *cross-bucket — Procedures collection in **b. Treatments** (already wired)* |
| Bottom CmsExtraBlocks + SEO meta | a. Main |
| Post-submit emails (2 templates) | f. Email |
| Submission row write | g. Inbox |
| `/video-consult` — hero / what-to-expect / booking-form / confirmation | h. Video-Consult |

#### Cross-bucket source — Settings (in `a. Homepage`)

To avoid duplicating clinic identity data, `c. Enquiry-Section` and `d. Visit-Section` **display** values from the **Settings** global (in **a. Homepage** Bucket post-realignment). Those values are **not editable** inside the Contact Bucket — editors edit them once in Settings, and they propagate everywhere (footer, floating WhatsApp button, `/contact`).

Each section provides a **read-only live-preview field** showing the actual current Settings value inline, so editors confirm what's being pulled without leaving the page.

| Cosmedic CMS display location | Source field | Source Bucket → Item |
|---|---|---|
| c. Enquiry-Section → Direct lines → Concierge | `contactPhone` | a. Homepage → Settings |
| c. Enquiry-Section → Direct lines → WhatsApp | `whatsappNumber` | a. Homepage → Settings |
| c. Enquiry-Section → Direct lines → Email | `contactEmail` | a. Homepage → Settings |
| c. Enquiry-Section → Direct lines → Press | `pressEmail` *(new — see plan)* | a. Homepage → Settings |
| d. Visit-Section → Address (line 1) | `addressLine1` | a. Homepage → Settings |
| d. Visit-Section → Address (line 2) | `addressLine2` | a. Homepage → Settings |
| d. Visit-Section → Address (city) | `city` | a. Homepage → Settings |
| d. Visit-Section → Address (postal code) | `postalCode` | a. Homepage → Settings |
| d. Visit-Section → Address (country) | `country` | a. Homepage → Settings |
| d. Visit-Section → Clinic hours (Mon–Sat) | `hoursMonFri` | a. Homepage → Settings |
| d. Visit-Section → Clinic hours (Sun) | `hoursSatSun` | a. Homepage → Settings |
| d. Visit-Section → Open in Maps / Get directions | `googleMapsUrl` | a. Homepage → Settings |

Bucket `g. Contact` carries `admin.description`: *"Governs /contact + /video-consult. Address, hours, phone, email shown on /contact are edited in `a. Homepage → Settings` — single source of truth for clinic identity site-wide."*

Items `e. Form` and `f. Email` each carry `admin.description` noting their shared use: *"Used by every enquiry form on the site — /contact, the homepage hero quick-form, /video-consult booking. Edit once; applies everywhere."*

### 2.h — Bucket "h. About" detail

Covers `/blog`, `/blog/<slug>`, `/press`, `/privacy` — the 4 routes the footer's "About" column links to. Three contiguous clusters by route family: Blog (a–e), Press (f–h), Privacy (i–j). Fully self-contained — no cross-bucket reads in or out.

| Admin Item (h. About) | Site surface it governs |
|---|---|
| **a. Blog** | `/blog` page — Hero + "This issue" featured chrome + "The archive" section chrome (eyebrow, heading, lede, "filter by" label, empty-state copy) |
| **b. Blog-Post-Template** | `/blog/<slug>` template — byline chrome, "About the author" section heading, "More from the journal" section heading |
| **c. Blog-Posts** | BlogPosts Collection — every post row (per-post hero, body, dek, author ref, tag refs, date, image, featured flag) |
| **d. Blog-Tags** | BlogTags Collection — filter taxonomy (one row per tag/category) |
| **e. Authors** | Authors Collection — author rows (name, role, bio, portrait) |
| **f. Press** | `/press` page — Hero + "Accreditations" section chrome + "Press" section chrome |
| **g. Press-Mentions** | PressMentions Collection — headline rows shown in `/press` "Press" section |
| **h. Awards** | Awards Collection — accreditation rows shown in `/press` "Accreditations" grid |
| **i. Privacy** | `/privacy` page — Hero + "Last updated" date + intro chrome |
| **j. Privacy-Sections** | **NEW Collection** — 10 legal section rows (heading + rich-text body) for `/privacy` body |

#### Type breakdown

4 Globals (a, b, f, i) · 6 Collections (c, d, e, g, h, j). `j. Privacy-Sections` is a new collection that closes the 10-hardcoded-legal-sections orphan; `b. Blog-Post-Template` is a new global that splits per-post template chrome away from the `a. Blog` (index) Global.

#### Item-order rationale (About)

Three route-family clusters, contiguous (mirror of Homepage's view-cluster pattern):

- **a–e** Blog (page + template + 3 backing collections)
- **f–h** Press (page + 2 backing collections)
- **i–j** Privacy (page + 1 new backing collection)

#### Coverage

Every visible atom on the 4 routes accounted for, including the 10 hardcoded `/privacy` legal sections (now editable via `j. Privacy-Sections` rows) and the 8 hardcoded `/press` accreditation entries (now editable via `h. Awards` rows).

| Route | Atom group | Item that owns it |
|---|---|---|
| `/blog` | Hero (chapter / title / lede / image / breadcrumbs) | a. Blog |
| `/blog` | "This issue" eyebrow + "Read the essay" CTA label + empty-state copy | a. Blog |
| `/blog` | Featured post (title / dek / image / author / role / date / category) | c. Blog-Posts (the `featured: true` row) |
| `/blog` | "The archive" eyebrow / heading / lede | a. Blog |
| `/blog` | Filter buttons (category names) | d. Blog-Tags |
| `/blog` | Post cards in archive grid | c. Blog-Posts |
| `/blog/<slug>` | Per-post hero (chapter / title / lede / image) | c. Blog-Posts (the row) |
| `/blog/<slug>` | Post body (rich text) | c. Blog-Posts (the row) |
| `/blog/<slug>` | Byline (author name + role + date) | c. Blog-Posts (row date) + e. Authors (row name/role) |
| `/blog/<slug>` | "About the author" heading + structure | b. Blog-Post-Template |
| `/blog/<slug>` | Author bio (name / role / portrait / bio) | e. Authors (the row) |
| `/blog/<slug>` | "More from the journal" heading + grid chrome | b. Blog-Post-Template |
| `/press` | Hero (chapter / title / lede / image / breadcrumbs) | f. Press |
| `/press` | "Accreditations" eyebrow / heading / lede | f. Press |
| `/press` | Accreditation cards (8 — name / full name / notes) | h. Awards |
| `/press` | "Press" eyebrow / heading / lede | f. Press |
| `/press` | Headline cards (6 — headline / date / outlet) | g. Press-Mentions |
| `/privacy` | Hero (chapter / title / lede / image / breadcrumbs) | i. Privacy |
| `/privacy` | "Last updated" date | i. Privacy |
| `/privacy` | 10 legal sections (heading + body) | j. Privacy-Sections |

#### Cross-bucket source

None. About Bucket is fully self-contained — every editorial atom is sourced inside the Bucket.

### 2.a–2.j — Bucket detail status

| Bucket | Status | Filled-in detail |
|---|---|---|
| **a. Homepage** | ✅ COMPLETE (above) | Phase R2 |
| b. Treatments | ⏳ PENDING | Phase R3 |
| **c. Doctors** | ✅ COMPLETE (above) | Phase R4 |
| **d. Results** | ✅ COMPLETE (above) | Phase R5 |
| e. Pricing | ⏳ PENDING | Phase R6 |
| **f. Journey** | ✅ COMPLETE (above) | Phase R7 |
| **g. Contact** | ✅ COMPLETE (above) | Phase R1 |
| **h. About** | ✅ COMPLETE (above) | Phase R8 |
| i. Media Library | n/a — asset store, no editorial | — |
| Users | n/a — admin auth, no editorial | — |

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
