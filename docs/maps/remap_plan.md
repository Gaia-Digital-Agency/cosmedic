# Cosmedic CMS Remap — Implementation Plan

> Date: 2026-05-24
> Status: PROPOSED — awaiting greenlight before code touched.
> Companion: [remap.md](./remap.md) — the target Admin ↔ Site map this plan implements.
> Scope: Two-stage rollout. **Phase R0** realigns the top-level Buckets to match site IA (sidebar move). **Phase R1, R7** ship per-Bucket detail for Contact + Journey (planning complete). Other per-Bucket phases follow as the user signs off their map.
>
> **Planning state mirrors [remap.md](./remap.md):** ✅ ALL 10 BUCKETS MAPPED (User · Media · Homepage · Treatments · Doctors · Results · Pricing · Journey · Contact · About)
>
> **Item ordering rule (uniform):** within each Bucket, directly-editable Items first; `-View` and `-Template` Items last. Applied to all 10 maps in remap.md and reflected in the schema tables below.

## Direct answer to the editability question

**Will Hero image + text be editable after this remap?** Yes — *if and only if* each per-Bucket phase pairs CMS schema with route rewiring. Today `/contact`'s hero is hardcoded in [`packages/web/src/routes/contact/ContactPage.tsx`](../packages/web/src/routes/contact/ContactPage.tsx) (around lines 117–128). Creating a `b. Hero` global without rewiring the route would just be another orphan field. The Contact Bucket plan (Phase R1) pairs both. Subsequent per-Bucket phases follow the same pattern.

---

## Phase R0 — Bucket Realignment (top-level admin.group rename + 7 Bucket moves)

> Goal: move every Collection + Global into the Bucket its site IA says it belongs in, and add alphabetic prefixes so Payload's default sort matches editor reading order. **No field changes. No data migration. No site UI change.** Pure `admin.group` string edits.

### R0.1 Touched files (24 total)

See [remap.md](./remap.md) §1.3 for the full file-by-file table. Summary:

- **7 items MOVE Bucket** (Stories collection + StoriesPage → d. Results; BlogPosts + BlogTags + Authors + BlogPage → h. About; PressMentions + Awards + PressPage → h. About; PrivacyPage → h. About)
- **17 items rename only** (existing Bucket gains `a./b./c./…` prefix; "Journey" relabels to "f. Journey"; "Homepage" → "a. Homepage"; etc.)

### R0.2 Edit pattern (per file)

```ts
// packages/cms/src/collections/Stories.ts — BEFORE
admin: {
  group: 'Journey',
  ...
}

// AFTER
admin: {
  group: 'd. Results',
  ...
}
```

Every file edit is one string replacement. No imports change, no fields change, no schema migration runs.

### R0.3 Verification (before merging Phase R0)

```bash
# Type-check + build
pnpm --filter @cosmedic/cms typecheck
pnpm --filter @cosmedic/cms build

# Restart CMS only — web is untouched in R0
pm2 restart cosmedic-cms

# Admin sidebar smoke — 9 prefixed Buckets present
curl -s -c /tmp/cookies.txt -d 'email=admin@bimccosmedic.com&password=...' http://127.0.0.1:4007/api/users/login
curl -s -b /tmp/cookies.txt http://127.0.0.1:4007/admin | \
  grep -oE "(a\. Homepage|b\. Treatments|c\. Doctors|d\. Results|e\. Pricing|f\. Journey|g\. Contact|h\. About|i\. Media Library)" | \
  sort -u
# Expected: 9 lines, one per Bucket. Users sits ungrouped above.

# Site smoke — nothing should change because no route reads admin.group
diff <(curl -s https://cosmedic.gaiada.online/contact) <(curl -s https://cosmedic.gaiada.online/contact)
# (Re-run a couple of times to confirm static; full visual diff vs pre-R0 snapshot kept locally)

# Visual confirmation in browser — log into /admin, confirm:
#   - Bucket order matches [remap.md](./remap.md) §1.2 a→i top-to-bottom
#   - Stories now appears under "d. Results"
#   - /press, /blog, /privacy items now under "h. About"
#   - Users sits ungrouped at the top
```

### R0.4 Rollback path

If anything breaks: `git revert <commit>` — pure string edits revert cleanly. No DB schema, no data, no migrations to undo.

### R0.5 Estimate

- **Commits:** 1 (the 24-file admin.group sweep)
- **Time:** ~30–45 minutes including verification
- **Risk:** very low (no behavioural change, only labels)

### R0.6 Greenlight gate

Do not start R0 until user confirms the 9-Bucket structure in [remap.md](./remap.md) §1.2.

---

## Phase R1 — Bucket "g. Contact" Detail

> Goal: split `/contact` editorial out of the orphan-field `Contact Page` global into purpose-named globals + a renamed collection + a sibling-page global, then rewire [ContactPage.tsx](../packages/web/src/routes/contact/ContactPage.tsx) to read from them so every visible atom becomes editable.

### R1.1 — CMS schema: 3 new Globals, 5 label renames

| Item | Action | Slug (Payload) | Fields |
|---|---|---|---|
| **a. Main** | Rename existing `contact-page` Global sidebar label. Strip hero fields (move to `b. Hero`). | `contact-page` (unchanged) | title, slug, route, publishStatus, sections, seo group |
| **b. Hero** | **New** Global | `contact-hero` | chapter, titleA, titleB, lede, heroImage, breadcrumbLabel |
| **c. Enquiry-Section** | **New** Global | `contact-enquiry-section` | eyebrow, heading, intro, trustLine + read-only live-preview rows for the 4 Direct-lines values pulled from Settings |
| **d. Visit-Section** | **New** Global | `contact-visit-section` | eyebrow, heading, body, openInMapsLabel, getDirectionsLabel, mapImage, conciergeHoursLabel, conciergeHoursValue + read-only live-preview rows for address / clinic hours / maps URL pulled from Settings |
| **e. Form** | Rename `form-defaults` Global label only | `form-defaults` (unchanged) | (no field changes) |
| **f. Email** | Rename `email-templates` Global label only | `email-templates` (unchanged) | (no field changes) |
| **g. Inbox** | Rename `enquiries` Collection label only | `enquiries` (unchanged) | (no field changes) |
| **h. Video-Consult** | Rename `video-consult-page` Global label only | `video-consult-page` (unchanged) | (no field changes) |

**Important:** slugs do **not** change for renamed items — only the admin sidebar label changes. This keeps existing data, existing API URLs, and existing route reads intact.

### R1.2 — `admin.description` notes

**On Bucket `g. Contact`:**

> Governs /contact + /video-consult. Address, hours, phone, email shown on /contact are edited in **a. Homepage → Settings** — single source of truth for clinic identity site-wide.

**On `c. Enquiry-Section`:**

> The phone / WhatsApp / email lines shown in this section are **not edited here**. Source: **a. Homepage → Settings → `contactPhone`, `whatsappNumber`, `contactEmail`, `pressEmail`**. Edit them once in Settings — they update on /contact, in the footer, and on the floating WhatsApp button.

**On `d. Visit-Section`:**

> The address block, opening hours, and "Get directions" URL are **not edited here**. Source: **a. Homepage → Settings → `addressLine1`, `addressLine2`, `city`, `postalCode`, `country`, `hoursMonFri`, `hoursSatSun`, `googleMapsUrl`**. Edit them once in Settings — they update on /contact and in the footer.

**On `e. Form` AND `f. Email`:**

> Used by every enquiry form on the site — /contact, the homepage hero quick-form, /video-consult booking. Edit once; applies everywhere.

### R1.3 — Settings field additions (one gap to close)

Today's hardcoded `/contact` page shows a "Press" email (`press@bimccosmedic.com`) that has no source in Settings. Add **one new field** to Settings to preserve visual invariance:

| New field | Type | Default value (seed from hardcoded) |
|---|---|---|
| `pressEmail` | text | `press@bimccosmedic.com` |

(Concierge phone `+62 361 3000 911` goes into the existing `contactPhone` field, which is currently blank; seed it from the hardcoded value.)

### R1.4 — Web data layer

Extend [`packages/web/src/lib/cms.ts`](../packages/web/src/lib/cms.ts):

- Add three `fetchGlobal` calls to the parallel cache load:
  - `fetchGlobal('contact-hero')`
  - `fetchGlobal('contact-enquiry-section')`
  - `fetchGlobal('contact-visit-section')`
- Extend the `CmsCache` TypeScript interface with the three new globals.
- Add adapter functions in [`packages/web/src/lib/cms-adapters.ts`](../packages/web/src/lib/cms-adapters.ts) if needed for shape normalisation.

### R1.5 — Route rewire

Replace hardcoded strings in [`packages/web/src/routes/contact/ContactPage.tsx`](../packages/web/src/routes/contact/ContactPage.tsx):

| Hardcoded today | Becomes |
|---|---|
| Chapter / title / lede / image (L117–128) | `chapter={hero.chapter}` … `image={hero.heroImage.url}` |
| Eyebrow "The Enquiry", heading, intro (L134–149) | reads from `enquirySection.eyebrow / heading / intro` |
| "Held in confidence…" trust line (L294–305) | reads from `enquirySection.trustLine` |
| Concierge / WhatsApp / Email / Press block (L157–192) | reads from `settings.contactPhone / whatsappNumber / contactEmail / pressEmail` |
| Eyebrow "Visit", heading, body (L334–349) | reads from `visitSection.eyebrow / heading / body` |
| Address block (L358–367) | reads from `settings.addressLine1 / addressLine2 / city / postalCode / country` |
| "Open in Maps" / "Get directions" buttons (L368–371) | reads from `settings.googleMapsUrl` + `visitSection.openInMapsLabel / getDirectionsLabel` |
| Clinic hours (L383–395) | reads from `settings.hoursMonFri / hoursSatSun` |
| Concierge hours (L397–411) | reads from `visitSection.conciergeHoursLabel / conciergeHoursValue` |

### R1.6 — Seed migration (visual invariance gate)

Write `packages/cms/src/seed/seed-contact-section-globals.ts` (run once, idempotent):

1. Read the four hero fields off the existing `contact-page` global → upsert into new `contact-hero` global.
2. Upsert `contact-enquiry-section` and `contact-visit-section` with strings copied verbatim from the current `ContactPage.tsx` source.
3. Patch Settings: set `contactPhone = "+62 361 3000 911"`, add `pressEmail = "press@bimccosmedic.com"`.
4. After verifying everything reads correctly, **propose** (under rule 4 — no unilateral deletes) removing the now-unused hero fields from `contact-page` for user approval.

### R1.7 — Revalidate hooks

Spread `revalidateGlobalAfterChange()` from [`packages/cms/src/lib/revalidate.ts`](../packages/cms/src/lib/revalidate.ts) onto the 3 new globals. Standard project pattern — every edit POSTs to web `/api/revalidate` to bust the 60s cache.

### R1.8 — Verification

```bash
pnpm --filter @cosmedic/cms build
pnpm --filter @cosmedic/web build
pm2 restart cosmedic-cms cosmedic-web

# Admin sanity — 8 items in g. Contact Bucket, alphabetical order
curl -s http://127.0.0.1:4007/admin | grep -E "a\. Main|b\. Hero|c\. Enquiry-Section|d\. Visit-Section|e\. Form|f\. Email|g\. Inbox|h\. Video-Consult"

# Visual invariance — snapshot before + after, diff must be empty
curl -s https://cosmedic.gaiada.online/contact > /tmp/contact-before.html  # before changes
# ... apply changes ...
curl -s https://cosmedic.gaiada.online/contact > /tmp/contact-after.html
diff /tmp/contact-before.html /tmp/contact-after.html  # must be empty

# Editability proof — edit each new global, wait 60s, confirm change appears
# 1. b. Hero → change lede → revisit /contact → see new lede → revert
# 2. c. Enquiry-Section → change heading → revisit → see → revert
# 3. d. Visit-Section → change body → revisit → see → revert
# 4. Settings → change contactEmail → revisit /contact AND footer → see in both → revert
```

### R1.9 Estimate

- **Commits:** ~8–10
- **Time:** ~3–4 hours including verification
- **Downtime:** none (warm builds, sub-second `pm2 restart`)

---

## Phase R2 — Bucket "a. Homepage" Detail

> Goal: split `/` editorial out of the part-orphan `HomePage` global into 10 new section globals + 8 label renames + 3 new fields on Footer, then rewire each home/* section component in [packages/web/src/routes/home/](../packages/web/src/routes/home/) to read from its dedicated global so every visible atom on `/` plus every sitewide chrome surface becomes editable. Closes the 2 hardcoded footer-bottom strings ("PT Trisaka Reksa Waluya" + "Designed in Bali") via 3 new fields on the Footer global.

### R2.1 — CMS schema: 10 new Globals, 8 label renames, 3 new fields on Footer

Items a–l are directly editable. Items m–r are view-only mirrors (suffix `-View`) — each owns only the section eyebrow / heading / lede / CTA label; the cards/data are pulled from the source Bucket.

| Item | Action | Slug (Payload) | Fields |
|---|---|---|---|
| **a. Main** | Rename existing `home-page` Global label. Strip section editorial fields (move to b, e, g, h). | `home-page` (unchanged) | title, slug, route, publishStatus, sections, seo group |
| **b. Hero** | **New** Global | `home-hero` | chapter, title, lede, heroImage, breadcrumbLabel, quickFormLabelsOverride |
| **c. Header** | Rename `header` Global label only | `header` (unchanged) | (no field changes) |
| **d. Footer** | Rename `footer` Global label + **add 3 new fields** | `footer` (unchanged) | existing + `managementLine` text, `legalEntityLine` text, `designerLine` text |
| **e. Intro** | **New** Global | `home-intro` | pullQuotePre, pullQuoteAccent, pullQuotePost, col1Body (richText), col2Body (richText) |
| **f. Trust-Strip** | Rename `brand-stats` Global label only | `brand-stats` (unchanged) | (no field changes — already holds stat tiles) |
| **g. Lead-Magnet** | **New** Global | `home-lead-magnet` | coverTitle, coverFooter, bodyEyebrow, bodyHeading, bodyLede, formLabels group, successMessage |
| **h. Place** | **New** Global | `home-place` | eyebrow, heading, body, rows array (4 rows: A/B/C/D + text) |
| **i. Floating-CTA** | Rename `floating-chrome` Global label only | `floating-chrome` (unchanged) | (no field changes) |
| **j. Endorsement** | Rename `endorsement-mark` Global label only | `endorsement-mark` (unchanged) | (no field changes) |
| **k. SEO-Defaults** | Rename `seo-defaults` Global label only | `seo-defaults` (unchanged) | (no field changes) |
| **l. Settings** | Rename `settings` Global label only | `settings` (unchanged) | (no field changes — note: this is the source for clinic identity used by g. Contact + d. Footer + i. Floating-CTA) |
| **m. Treatments-View** | **New** Global | `home-treatments-view` | eyebrow, heading, lede, ctaLabel, ctaHref |
| **n. Pricing-View** | **New** Global | `home-pricing-view` | eyebrow, heading, lede, footnote, ctaLabel, ctaHref |
| **o. Surgeons-View** | **New** Global | `home-surgeons-view` | eyebrow, heading, lede, leadSurgeonLabel, leadSurgeonRef (relationship → Surgeons), ctaLabel, ctaHref |
| **p. Gallery-View** | **New** Global | `home-gallery-view` | eyebrow, heading, lede, ctaLabel, ctaHref |
| **q. Journey-View** | **New** Global | `home-journey-view` | eyebrow, heading, lede, ctaLabel, ctaHref |
| **r. Stories-View** | **New** Global | `home-stories-view` | eyebrow, heading, lede, ctaLabel, ctaHref |

**Important:** slugs do **not** change for renamed items — only the admin sidebar label changes. All existing data + API URLs + route reads intact.

### R2.2 — `admin.description` notes

**On Bucket `a. Homepage`:**

> Governs the homepage editorial (items a, b, e, g, h plus the 6 view sections m–r) and every sitewide chrome surface that appears on every page (items c, d, i, j, k, l). Settings (l.) is the single source of truth for clinic identity used by /contact, the footer, and the floating WhatsApp button.

**On items m–r (the 6 view sections):**

> The cards / data shown in this section's grid are **not edited here**. Edit the source in [bucket → collection] (m. → b. Treatments → Disciplines; n. → e. Pricing → PriceListItems; o. → c. Doctors → Surgeons; p. → d. Results → BeforeAfterCases; q. → f. Journey → Steps; r. → d. Results → Stories). This item controls only the section eyebrow, heading, lede, and "view all" CTA label.

**On `d. Footer`:**

> The Treatments link column is auto-built from b. Treatments → Disciplines (sortOrder + title). The Connect column's WhatsApp link uses l. Settings → whatsappNumber. The address block uses l. Settings → addressLine1/2 + city + postalCode + country. Edit those in their source; this item controls only the About column items + copyright template + management / legal-entity / designer lines.

### R2.3 — Settings field additions

None needed. The 3 footer-bottom strings ("Managed by BIMC Hospital, Nusa Dua" — appended to copyright; "PT Trisaka Reksa Waluya"; "Designed in Bali") are added as new fields on Footer (R2.1 row d), not Settings.

### R2.4 — Web data layer

Extend [`packages/web/src/lib/cms.ts`](../packages/web/src/lib/cms.ts) parallel cache load with the 10 new globals:

- `fetchGlobal('home-hero')`
- `fetchGlobal('home-intro')`
- `fetchGlobal('home-lead-magnet')`
- `fetchGlobal('home-place')`
- `fetchGlobal('home-treatments-view')`
- `fetchGlobal('home-pricing-view')`
- `fetchGlobal('home-surgeons-view')`
- `fetchGlobal('home-gallery-view')`
- `fetchGlobal('home-journey-view')`
- `fetchGlobal('home-stories-view')`

Extend `CmsCache` TypeScript interface accordingly. Footer interface gains 3 new optional string fields.

### R2.5 — Route rewire

Replace fallback / hardcoded strings in each homepage section component:

| Component | Hardcoded today | Becomes |
|---|---|---|
| [home/Hero.tsx](../packages/web/src/routes/home/Hero.tsx) | Fallback eyebrow / title / lede (L13-15, L81-86, L92-111); fallback form labels (L135-209) | reads from `cms.homeHero.*` |
| [home/Intro.tsx](../packages/web/src/routes/home/Intro.tsx) | Pull-quote pre/accent/post + 2 column body (L11-19) | reads from `cms.homeIntro.*` |
| [home/Treatments.tsx](../packages/web/src/routes/home/Treatments.tsx) | Eyebrow / heading / lede (L12-17) | reads from `cms.homeTreatmentsView.*` |
| [home/PricingTeaser.tsx](../packages/web/src/routes/home/PricingTeaser.tsx) | Eyebrow / heading / lede / footnote (L25-33); PRICE_TEASER array (L8-17) | reads from `cms.homePricingView.*`; PRICE_TEASER drops, prices pulled from PriceListItems |
| [home/Surgeons.tsx](../packages/web/src/routes/home/Surgeons.tsx) | Fallback labels + lead body (L17-32) | reads from `cms.homeSurgeonsView.*` |
| [home/Gallery.tsx](../packages/web/src/routes/home/Gallery.tsx) | Eyebrow / heading / lede / CTA (L13-18) | reads from `cms.homeGalleryView.*` |
| [home/Journey.tsx](../packages/web/src/routes/home/Journey.tsx) | STEPS array (L8-14); heading / CTA (L19-23) | reads from `cms.homeJourneyView.*`; step previews pulled from JourneySteps collection |
| [home/Stories.tsx](../packages/web/src/routes/home/Stories.tsx) | STORIES array (L10-38); eyebrow / heading / lede (L43-59) | reads from `cms.homeStoriesView.*`; quotes pulled from Stories collection |
| [home/LeadMagnet.tsx](../packages/web/src/routes/home/LeadMagnet.tsx) | Cover title / footer (L15-20); body eyebrow / heading / lede / form labels / success (L21-31) | reads from `cms.homeLeadMagnet.*` |
| [home/Place.tsx](../packages/web/src/routes/home/Place.tsx) | Eyebrow / heading / body (L34-39); DEFAULT_ROWS (L10-15) | reads from `cms.homePlace.*` |
| [shell/Footer.tsx](../packages/web/src/components/shell/Footer.tsx) | "PT Trisaka Reksa Waluya" (L97), "Designed in Bali" (L98), copyright "Managed by BIMC Hospital, Nusa Dua" suffix | reads from `cms.footer.managementLine` (composed into copyright), `cms.footer.legalEntityLine`, `cms.footer.designerLine` |

### R2.6 — Seed migration (visual invariance gate)

Write `packages/cms/src/seed/seed-home-section-globals.ts` (run once, idempotent):

1. Upsert each new global (`home-hero`, `home-intro`, `home-lead-magnet`, `home-place`, `home-treatments-view`, `home-pricing-view`, `home-surgeons-view`, `home-gallery-view`, `home-journey-view`, `home-stories-view`) with strings copied verbatim from the current `home/*.tsx` fallback / hardcoded source.
2. Patch Footer: set `managementLine`, `legalEntityLine`, `designerLine` to current hardcoded values.
3. After verifying everything reads correctly, **propose** (under rule 4 — no unilateral deletes) removing the now-unused section fields from `home-page` for user approval.

### R2.7 — Revalidate hooks

Spread `revalidateGlobalAfterChange()` onto all 10 new globals. Standard project pattern.

### R2.8 — Verification

```bash
pnpm --filter @cosmedic/cms build
pnpm --filter @cosmedic/web build
pm2 restart cosmedic-cms cosmedic-web

# Admin sanity — 18 items in a. Homepage Bucket, alphabetical order
curl -s http://127.0.0.1:4007/admin | grep -E "a\. Main|b\. Hero|c\. Header|d\. Footer|e\. Intro|f\. Trust-Strip|g\. Lead-Magnet|h\. Place|i\. Floating-CTA|j\. Endorsement|k\. SEO-Defaults|l\. Settings|m\. Treatments-View|n\. Pricing-View|o\. Surgeons-View|p\. Gallery-View|q\. Journey-View|r\. Stories-View"

# Visual invariance — / + footer on every page must be byte-identical
curl -s https://cosmedic.gaiada.online/ > /tmp/home-before.html
# ... apply changes ...
diff /tmp/home-before.html <(curl -s https://cosmedic.gaiada.online/)
# (Footer also visible on every page — spot-check 3 routes for footer diff)

# Editability proof — edit each new global, wait 60s, confirm change appears
# 1. b. Hero → change lede → revisit / → see → revert
# 2. e. Intro → change col1 body → revisit / → see → revert
# 3. g. Lead-Magnet → change cover title → revisit / → see → revert
# 4. h. Place → change body → revisit / → see → revert
# 5. m–r. each view section → change heading → revisit / → see → revert
# 6. d. Footer → change managementLine → revisit ANY page → see in footer → revert
```

### R2.9 Estimate

- **Commits:** ~15–18 (more sections than Contact or Journey)
- **Time:** ~5–7 hours including verification (largest single-bucket phase)
- **Downtime:** none

---

## Phase R3 — Bucket "b. Treatments" Detail

> Goal: split `/treatments` editorial out of the generic-pageFields-only `TreatmentsPage` global into 4 new section globals + 2 new detail-template globals, then rewire [TreatmentsIndex.tsx](../packages/web/src/routes/treatments/TreatmentsIndex.tsx) + [DisciplineDetail.tsx](../packages/web/src/routes/detail/DisciplineDetail.tsx) + [SubCategoryDetail.tsx](../packages/web/src/routes/detail/SubCategoryDetail.tsx) to read from them. Disciplines + SubCategories + Procedures Collections stay as-is — already provide per-row data, just get label renames. Closes the orphan editorial chrome on 29 routes (1 index + 6 discipline + 22 sub-category).

### R3.1 — CMS schema: 5 new Globals, 4 label renames

| Item | Action | Slug (Payload) | Fields |
|---|---|---|---|
| **a. Main** | Rename existing `treatments-page` Global label. Keep generic `pageFields()`. | `treatments-page` (unchanged) | title, slug, route, publishStatus, sections, seo group |
| **b. Hero** | **New** Global | `treatments-hero` | chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel |
| **c. Index** | **New** Global | `treatments-index-section` | eyebrow, heading, lede, readMoreCtaTemplate |
| **d. Stats** | **New** Global | `treatments-stats` | stats array (4 rows: number, label) |
| **e. Disciplines** | Rename `disciplines` Collection label only | `disciplines` (unchanged) | (no field changes) |
| **f. Sub-Categories** | Rename `sub-categories` Collection label only | `sub-categories` (unchanged) | (no field changes) |
| **g. Procedures** | Rename `procedures` Collection label only | `procedures` (unchanged) | (no field changes) |
| **h. Discipline-Template** | **New** Global | `discipline-detail-template` | tocOnThisPageLabel, tocOverviewLabel, tocSubCategoriesLabel, tocProceduresLabel, tocFaqsLabel, chooseAFocusHeading, chooseAFocusBodyTemplate, readMoreLabel, comingLabel, faqsHeading, relatedEyebrow, relatedHeadingTemplate, relatedLedeTemplate |
| **i. Sub-Category-Template** | **New** Global | `sub-category-detail-template` | chapterFormatTemplate, tocOnThisPageLabel, tocOverviewLabel, tocTreatmentsLabel, tocFaqsLabel, takeAStepEyebrow, bookVideoConsultCtaLabel, getEstimateCtaLabel, whatsappConciergeCtaLabel, replyLine, treatmentsHeading, treatmentsIntro, faqsHeading |

**Important:** slugs do **not** change for renamed items. All existing Discipline + SubCategory + Procedure rows untouched.

### R3.2 — `admin.description` notes

**On Bucket `b. Treatments`:**

> Governs `/treatments` + 6 `/treatments/<discipline>` + 22 `/treatments/<sub-cat>` = 29 routes. The 3 Collections (e/f/g) are the canonical source consumed sitewide — Disciplines feed mega-menu L1 + homepage Treatments-View + Footer Treatments column; Sub-Categories feed mega-menu L2; Procedures feed sub-category accordions and `/pricing` tables (cross-bucket read by `e. Pricing`).

**On items h / i (the 2 templates):**

> Template-level strings shared across every `/treatments/<discipline>` (6 routes) or `/treatments/<sub-cat>` (22 routes). Per-discipline / per-sub-category data lives on the row in e. Disciplines / f. Sub-Categories.

### R3.3 — Settings field additions

None.

### R3.4 — Web data layer

Extend [`packages/web/src/lib/cms.ts`](../packages/web/src/lib/cms.ts) parallel cache load:

- `fetchGlobal('treatments-hero')`
- `fetchGlobal('treatments-index-section')`
- `fetchGlobal('treatments-stats')`
- `fetchGlobal('discipline-detail-template')`
- `fetchGlobal('sub-category-detail-template')`

Extend `CmsCache` interface with the 5 new globals. Disciplines + SubCategories + Procedures Collections already fetched.

### R3.5 — Route rewire

Replace hardcoded strings in [TreatmentsIndex.tsx](../packages/web/src/routes/treatments/TreatmentsIndex.tsx):

| Hardcoded today | Becomes |
|---|---|
| `TREATMENTS_STATS` array (L10-15) | reads from `cms.treatmentsStats.stats` |
| ChapterOpener literals (L19-27) | reads from `cms.treatmentsHero.*` |
| "An Index" eyebrow + heading + lede (L32-39) | reads from `cms.treatmentsIndexSection.*` |
| "Read more →" template (L58-60) | reads from `cms.treatmentsIndexSection.readMoreCtaTemplate` |
| `TREATMENT_LIST` (web seed) | reads from `cms.disciplines` (sorted by sortOrder) |

Replace hardcoded strings in [DisciplineDetail.tsx](../packages/web/src/routes/detail/DisciplineDetail.tsx):

| Hardcoded today | Becomes |
|---|---|
| TOC labels (L40-61) | reads from `cms.disciplineDetailTemplate.toc*` |
| ChapterOpener literals + hero data (L24-36) | derived from `cms.disciplines` row (chapterTitle, tagline, lede, heroImage) |
| "Choose a focus" heading + body template (L92-101) | reads from `cms.disciplineDetailTemplate.chooseAFocus*` |
| "Read more →" / "Coming v1.4" labels (L157, L170) | reads from `cms.disciplineDetailTemplate.readMoreLabel / comingLabel` |
| "Frequently asked" heading (L247) | reads from `cms.disciplineDetailTemplate.faqsHeading` |
| "Related" eyebrow + heading + lede template (L261-269) | reads from `cms.disciplineDetailTemplate.related*` |
| Sub-categories list | derived from `cms.subCategories.filter(parent === discipline)` |
| Procedures list | derived from `cms.procedures.filter(parentDiscipline === discipline AND no parentSubCategory)` |
| `TREATMENT_CONTENT` (web seed) | DELETED — all sections + faqs come from `cms.disciplines` row |

Replace hardcoded strings in [SubCategoryDetail.tsx](../packages/web/src/routes/detail/SubCategoryDetail.tsx):

| Hardcoded today | Becomes |
|---|---|
| Chapter format template (L26) | reads from `cms.subCategoryDetailTemplate.chapterFormatTemplate` |
| TOC labels (L42-58) | reads from `cms.subCategoryDetailTemplate.toc*` |
| "Take a step" sidebar block (L60-138) | all labels read from `cms.subCategoryDetailTemplate.takeAStep* / bookVideoConsultCtaLabel / getEstimateCtaLabel / whatsappConciergeCtaLabel / replyLine` |
| "Treatments" h2 + intro (L167-171) | reads from `cms.subCategoryDetailTemplate.treatmentsHeading / treatmentsIntro` |
| "Frequently asked" heading (L187) | reads from `cms.subCategoryDetailTemplate.faqsHeading` |
| `SUBCATEGORY_DATA` (web seed) | DELETED — all data comes from `cms.subCategories` row + `cms.procedures` filtered by parentSubCategory |
| ProcedureFactsPanel chrome | reads from `cms.procedures` per-row detail fields |

### R3.6 — Seed migration (visual invariance gate)

Write `packages/cms/src/seed/seed-treatments-section-globals.ts` (run once, idempotent):

1. Upsert `treatments-hero` with 8 atoms from TreatmentsIndex.tsx L19-27 verbatim.
2. Upsert `treatments-index-section` with strings from L32-39 + L58-60.
3. Upsert `treatments-stats` with the 4 hardcoded stat tiles (L10-15).
4. Upsert `discipline-detail-template` with ~13 chrome strings from DisciplineDetail.tsx.
5. Upsert `sub-category-detail-template` with ~13 chrome strings from SubCategoryDetail.tsx.
6. **Reconcile editorial content**: copy any per-discipline sections/faqs from `packages/web/src/content/treatment-content.ts` (web seed) into the matching Disciplines collection rows (verify existing rows already populated; only fill gaps).
7. **Reconcile sub-category content**: copy per-sub-category sections/faqs/treatments from `packages/web/src/content/subcategory-data.ts` into Sub-Categories rows + Procedures rows (verify; gap-fill only).
8. After verifying everything reads correctly, **propose** (under rule 4 — no unilateral deletes) removing `packages/web/src/content/treatment-content.ts` + `packages/web/src/content/subcategory-data.ts` for user approval.

### R3.7 — Revalidate hooks

Spread `revalidateGlobalAfterChange()` onto all 5 new globals. Standard project pattern.

### R3.8 — Verification

```bash
pnpm --filter @cosmedic/cms build
pnpm --filter @cosmedic/web build
pm2 restart cosmedic-cms cosmedic-web

# Admin sanity — 9 items in b. Treatments Bucket, alphabetical order
curl -s http://127.0.0.1:4007/admin | grep -E "a\. Main|b\. Hero|c\. Index|d\. Stats|e\. Disciplines|f\. Sub-Categories|g\. Procedures|h\. Discipline-Template|i\. Sub-Category-Template"

# Visual invariance — /treatments + sample discipline + sample sub-category
curl -s https://cosmedic.gaiada.online/treatments > /tmp/treatments-before.html
curl -s https://cosmedic.gaiada.online/treatments/surgical > /tmp/discipline-before.html
curl -s https://cosmedic.gaiada.online/treatments/surgical-breast > /tmp/subcat-before.html
# ... apply changes ...
diff /tmp/treatments-before.html <(curl -s https://cosmedic.gaiada.online/treatments)
diff /tmp/discipline-before.html <(curl -s https://cosmedic.gaiada.online/treatments/surgical)
diff /tmp/subcat-before.html <(curl -s https://cosmedic.gaiada.online/treatments/surgical-breast)
# Spot-check 4 more disciplines + 4 more sub-categories

# Editability proof
# 1. b. Hero → change lede → revisit /treatments → see → revert
# 2. c. Index → change heading → revisit /treatments → see → revert
# 3. d. Stats → edit one tile → revisit /treatments → see → revert
# 4. h. Discipline-Template → change "Frequently asked" heading → revisit any /treatments/<discipline> → see → revert
# 5. i. Sub-Category-Template → change book-video-consult CTA label → revisit any /treatments/<sub-cat> → see → revert
```

### R3.9 Estimate

- **Commits:** ~14–16 (5 new globals + 3 route rewires + seed reconcile + collection renames + verification)
- **Time:** ~6–8 hours (largest by route count: 29 routes)
- **Downtime:** none (warm builds, sub-second `pm2 restart`)

---

## Phase R4 — Bucket "c. Doctors" Detail

> Goal: split `/surgeons` editorial out of the generic-pageFields-only `SurgeonsPage` global into 4 new section globals + 1 new detail-template global, then rewire [SurgeonsIndex.tsx](../packages/web/src/routes/surgeons/SurgeonsIndex.tsx) and [SurgeonDetail.tsx](../packages/web/src/routes/detail/SurgeonDetail.tsx) to read from them so every visible atom on `/surgeons` + the 8 `/surgeons/<slug>` pages becomes editable. Surgeons Collection (existing) stays as-is — already provides per-doctor data, just gets a label rename. Closes ~40 orphan atoms across the 9 routes.

### R4.1 — CMS schema: 5 new Globals, 2 label renames

| Item | Action | Slug (Payload) | Fields |
|---|---|---|---|
| **a. Main** | Rename existing `surgeons-page` Global label. Keep generic `pageFields()`. | `surgeons-page` (unchanged) | title, slug, route, publishStatus, sections, seo group |
| **b. Hero** | **New** Global | `surgeons-hero` | chapter, titleA, titleB, lede, heroImage, imageLabel, breadcrumbLabel |
| **c. Surgeons** | Rename `surgeons` Collection label only | `surgeons` (unchanged) | (no field changes) |
| **d. Lead-View** | **New** Global | `surgeons-lead-view` | sectionEyebrow, blockEyebrow, statLabelTrained, statLabelSpecialty, statLabelDistinction, ctaLabel |
| **e. Plastic-Surgery-View** | **New** Global | `surgeons-plastic-view` | eyebrow, headingA, headingItalic, headingB, lede |
| **f. Aesthetic-Medicine-View** | **New** Global | `surgeons-aesthetic-view` | eyebrow, headingA, headingItalic, headingB, lede |
| **g. Detail-Template** | **New** Global | `surgeon-detail-template` | heroLeadLabel, heroSpecialistLabel, heroCtaConsultLabel, heroCtaTreatmentsLabelTemplate *(view-only mirror ← b. Treatments → Disciplines)*, breadcrumbHomeLabel, breadcrumbSurgeonsLabel, statLabelYears, statLabelDistinction, statLabelSpecialty, biographyEyebrow, sidebarLabelSpecialism, sidebarLabelCredentials, sidebarLabelLanguages, sidebarLabelAvailability, languagesFallback, availabilityFallback, secondaryBioParagraph, specialtyEyebrow, specialtyHeadingTemplate, trainingEyebrow, trainingRowLabels (array of 5), trainingRowRights (array of 4 — rows 1-3+5), trainingRowPracticeMid *(view-only mirror ← a. Homepage → l. Settings)*, facultyEyebrow, facultyHeading |

**Important:** slugs do **not** change for renamed items. All existing surgeon data + API URLs + route reads intact.

**View-only mirror fields on `g. Detail-Template`** use Payload's native `admin.readOnly: true` + `hooks.afterRead` pattern — the field declares itself, but its value is computed from the source Global / Collection at read time. No monkey-patching; full Payload capability preserved (Rule 9).

### R4.2 — `admin.description` notes

**On Bucket `c. Doctors`:**

> Governs /surgeons + the 8 /surgeons/<slug> detail pages. The Surgeons Collection (g.) is the canonical source for every doctor surface on the site — homepage Surgeons-View, Doctors mega-menu, discipline & sub-category Lead Surgeon panels, and blog bylines all read from here.

**On items d / e / f (the 3 view sections):**

> The cards / data shown in this section are **not edited here**. Edit the source in **c. Surgeons** (same Bucket). This item controls only the section's eyebrow / heading / lede / CTA labels.

**On `g. Detail-Template`:**

> Template-level strings that apply to every /surgeons/<slug> detail page. Per-doctor data (name, portrait, bio, credentials, schedule, languages, specialty areas) lives on **c. Surgeons** (the row). This global controls only the labels, eyebrows, fallbacks, and section headings that are identical across all 8 detail pages. Two fields are **view-only** mirrors of cross-bucket sources — Treatments back-link label (← b. Treatments → Disciplines) and "BIMC CosMedic Centre, Bali" Training row (← a. Homepage → l. Settings).

### R4.3 — Settings field additions

None. Clinic name + city are already on Settings — the Training table row will mirror them.

### R4.4 — Web data layer

Extend [`packages/web/src/lib/cms.ts`](../packages/web/src/lib/cms.ts) parallel cache load:

- `fetchGlobal('surgeons-hero')`
- `fetchGlobal('surgeons-lead-view')`
- `fetchGlobal('surgeons-plastic-view')`
- `fetchGlobal('surgeons-aesthetic-view')`
- `fetchGlobal('surgeon-detail-template')`

Extend `CmsCache` TypeScript interface with the 5 new globals. Surgeons Collection already fetched.

### R4.5 — Route rewire

Replace hardcoded strings in [SurgeonsIndex.tsx](../packages/web/src/routes/surgeons/SurgeonsIndex.tsx):

| Hardcoded today | Becomes |
|---|---|
| ChapterOpener literals (L62-66, L71-78) | reads from `cms.surgeonsHero.*` |
| "Lead Plastic Surgeon" eyebrow (L83) | reads from `cms.surgeonsLeadView.sectionEyebrow` |
| "Lead Surgeon" block eyebrow (L100) | reads from `cms.surgeonsLeadView.blockEyebrow` |
| Stat labels Trained / Specialty / Distinction (L112, L116, L120) | reads from `cms.surgeonsLeadView.statLabel*` |
| "Read the full profile" CTA (L125) | reads from `cms.surgeonsLeadView.ctaLabel` |
| Plastic section eyebrow / heading / lede (L134, L136-138, L139-142) | reads from `cms.surgeonsPlasticView.*` |
| Aesthetic section eyebrow / heading / lede (L156, L158-159, L161-164) | reads from `cms.surgeonsAestheticView.*` |
| Loading fallback "Loading surgeon roster…" (L65) | stays hardcoded (defensive cold-start state) |

Replace hardcoded strings in [SurgeonDetail.tsx](../packages/web/src/routes/detail/SurgeonDetail.tsx):

| Hardcoded today | Becomes |
|---|---|
| Hero eyebrow toggle "Lead Surgeon" / "Specialist" (L43) | reads from `cms.surgeonDetailTemplate.heroLeadLabel / heroSpecialistLabel` |
| "Request a consultation" CTA (L56) | reads from `cms.surgeonDetailTemplate.heroCtaConsultLabel` |
| Treatments back-link label (L59) | reads from `cms.surgeonDetailTemplate.heroCtaTreatmentsLabelTemplate` (mirror of Discipline title) |
| Breadcrumb static labels (L67, L69) | reads from `cms.surgeonDetailTemplate.breadcrumb*` |
| Stats row labels (L78, L84, L90) | reads from `cms.surgeonDetailTemplate.statLabel*` |
| Biography eyebrow (L100) | reads from `cms.surgeonDetailTemplate.biographyEyebrow` |
| 4 sidebar dt labels (L105, L111, L117, L127) | reads from `cms.surgeonDetailTemplate.sidebarLabel*` |
| Languages fallback (L122) | reads from `cms.surgeonDetailTemplate.languagesFallback` |
| Availability fallback (L141) | reads from `cms.surgeonDetailTemplate.availabilityFallback` |
| Hardcoded "Patients often describe…" paragraph (L157-161) | reads from `cms.surgeonDetailTemplate.secondaryBioParagraph` |
| Specialty Areas eyebrow + heading template (L169, L173) | reads from `cms.surgeonDetailTemplate.specialtyEyebrow / specialtyHeadingTemplate` |
| Training & credentials eyebrow (L190) | reads from `cms.surgeonDetailTemplate.trainingEyebrow` |
| Training 5 row labels (L195-198, L200) | reads from `cms.surgeonDetailTemplate.trainingRowLabels[]` |
| Training row right phrases — MBBS / MD, Board credential, Active, Active member (L195, L197-198, L205) | reads from `cms.surgeonDetailTemplate.trainingRowRights[]` |
| Training "BIMC CosMedic Centre, Bali" mid (L198) | reads from `cms.surgeonDetailTemplate.trainingRowPracticeMid` (mirror of Settings clinic name + city) |
| Faculty eyebrow + heading (L243, L245-247) | reads from `cms.surgeonDetailTemplate.facultyEyebrow / facultyHeading` |

### R4.6 — Seed migration (visual invariance gate)

Write `packages/cms/src/seed/seed-doctors-section-globals.ts` (run once, idempotent):

1. Upsert `surgeons-hero` with strings copied verbatim from current `SurgeonsIndex.tsx` ChapterOpener (L62-78).
2. Upsert `surgeons-lead-view` with the 6 hardcoded chrome strings from L83, L100, L112, L116, L120, L125.
3. Upsert `surgeons-plastic-view` with strings from L134-142 (split heading into headingA / headingItalic / headingB tokens).
4. Upsert `surgeons-aesthetic-view` with strings from L156-164 (same split).
5. Upsert `surgeon-detail-template` with all ~24 chrome strings from SurgeonDetail.tsx verbatim. For the two mirror fields:
    - `heroCtaTreatmentsLabelTemplate` → leave blank; afterRead hook resolves the parent discipline title at read time.
    - `trainingRowPracticeMid` → leave blank; afterRead hook composes `${settings.clinicName}, ${settings.city}` at read time.

### R4.7 — Revalidate hooks

Spread `revalidateGlobalAfterChange()` from [`packages/cms/src/lib/revalidate.ts`](../packages/cms/src/lib/revalidate.ts) onto all 5 new globals. Standard project pattern — every edit POSTs to web `/api/revalidate` to bust the 60s cache.

### R4.8 — Verification

```bash
pnpm --filter @cosmedic/cms build
pnpm --filter @cosmedic/web build
pm2 restart cosmedic-cms cosmedic-web

# Admin sanity — 7 items in c. Doctors Bucket, alphabetical order
curl -s http://127.0.0.1:4007/admin | grep -E "a\. Main|b\. Hero|c\. Surgeons|d\. Lead-View|e\. Plastic-Surgery-View|f\. Aesthetic-Medicine-View|g\. Detail-Template"

# Visual invariance — /surgeons + a sample of /surgeons/<slug>
curl -s https://cosmedic.gaiada.online/surgeons > /tmp/surgeons-before.html
curl -s https://cosmedic.gaiada.online/surgeons/suka > /tmp/surgeon-detail-before.html
# ... apply changes ...
diff /tmp/surgeons-before.html <(curl -s https://cosmedic.gaiada.online/surgeons)
diff /tmp/surgeon-detail-before.html <(curl -s https://cosmedic.gaiada.online/surgeons/suka)
# Spot-check the other 7 detail routes

# Editability proof — edit each new global, wait 60s, confirm change appears
# 1. b. Hero → change lede → revisit /surgeons → see → revert
# 2. d. Lead-View → change CTA label → revisit /surgeons → see → revert
# 3. e. Plastic-Surgery-View → change heading → revisit /surgeons → see → revert
# 4. f. Aesthetic-Medicine-View → change lede → revisit /surgeons → see → revert
# 5. g. Detail-Template → change "Patients often describe…" → revisit any /surgeons/<slug> → see → revert
```

### R4.9 Estimate

- **Commits:** ~10–12
- **Time:** ~3–4 hours including verification
- **Downtime:** none (warm builds, sub-second `pm2 restart`)

---

## Phase R5 — Bucket "d. Results" Detail

> Goal: split `/results` editorial out of the orphan-field `results-page` Global into 5 new section globals (Hero + 2 view-only chrome items + 2 shared CTA blocks); rewire `/results` + `/gallery` + `/stories` to read from them; relabel both collections so every visible atom across the 3 routes becomes editable. Closes the 4 `/results` orphans and the 2 CTA duplications (Want-to-see-more + Have-a-story-to-share) via single-source-of-truth shared globals.

### R5.1 — CMS schema: 5 new Globals, 3 page-Global renames, 2 Collection renames

| Item | Action | Slug (Payload) | Fields |
|---|---|---|---|
| **a. Main** | Rename existing `results-page` Global label. Strip hero fields (move to `b. Hero`); strip section editorial (move to i., j., c., d.). | `results-page` (unchanged) | title, slug, route, publishStatus, sections, seo group |
| **b. Hero** | **New** Global | `results-hero` | chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel |
| **c. Library-Cta** | **New** Global | `library-cta` | eyebrow, heading, body, buttonLabel, buttonHref. **Shared** by `/results` + `/gallery` |
| **d. Share-Cta** | **New** Global | `share-cta` | eyebrow, heading, body, buttonLabel, buttonHref. **Shared** by `/results` + `/stories` |
| **e. Gallery** | Rename existing `gallery-page` Global label. Expand fields to cover full editorial (hero + filter chrome). | `gallery-page` (unchanged) | hero (chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel), filterBarLabel, countFormat |
| **f. Stories** | Rename existing `stories-page` Global label. Expand fields to cover full editorial (hero + story-rows section chrome). | `stories-page` (unchanged) | hero (chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel) |
| **g. Before-After-Cases** | Rename `before-after-cases` Collection label only | `before-after-cases` (unchanged) | (no field changes) |
| **h. Patient-Stories** | Rename `stories` Collection label only (sidebar shows "h. Patient-Stories") | `stories` (unchanged — keeps DB table + API URLs) | (no field changes) |
| **i. Featured-Cases-View** | **New** Global | `results-featured-cases-view` | eyebrow, heading, lede, filterBarLabel, countFormat (e.g. `"{n} cases · facial"`) |
| **j. Stories-View** | **New** Global | `results-stories-view` | eyebrow, heading, lede |

**Important:** slugs do **not** change for renamed items. The Stories collection keeps slug `stories` (DB table `stories`) — only the admin sidebar label gains the `h. Patient-Stories` prefix. New globals get new slugs.

### R5.2 — `admin.description` notes

**On Bucket `d. Results`:**

> Governs /results + /gallery + /stories — the three routes under the "Results" top-nav link. Fully self-contained; no Settings reads. Two shared CTA blocks (c. Library-Cta + d. Share-Cta) render on two pages each — edit once, applies to both.

**On `i. Featured-Cases-View`:**

> The before/after cards shown in this section are **not edited here**. Source: **g. Before-After-Cases** (same Bucket). This item controls only the section eyebrow, heading, lede, filter-bar label, and count format string.

**On `j. Stories-View`:**

> The patient-quote rows shown in this section are **not edited here**. Source: **h. Patient-Stories** (same Bucket). This item controls only the section eyebrow, heading, and lede.

**On `c. Library-Cta`:**

> Used by **both** `/results` (bottom of "Featured cases") and `/gallery` (bottom of grid). Edit once; applies to both pages.

**On `d. Share-Cta`:**

> Used by **both** `/results` (bottom of "Stories") and `/stories` (bottom of page). Edit once; applies to both pages.

**On `h. Patient-Stories`:**

> The patient-quote rows that back the `/stories` page and `/results` Stories-View section. Renamed in the sidebar from "Stories" to "Patient-Stories" to disambiguate from `f. Stories` (the `/stories` page Global). Payload slug `stories` is unchanged.

### R5.3 — Settings field additions

None. d. Results is self-contained.

### R5.4 — Web data layer

Extend [`packages/web/src/lib/cms.ts`](../packages/web/src/lib/cms.ts) parallel cache load with the 5 new globals:

- `fetchGlobal('results-hero')`
- `fetchGlobal('results-featured-cases-view')`
- `fetchGlobal('results-stories-view')`
- `fetchGlobal('library-cta')`
- `fetchGlobal('share-cta')`

Also extend any per-page global fetches if `gallery-page` and `stories-page` gain new fields (R5.1 rows g + h).

Extend `CmsCache` TypeScript interface accordingly.

### R5.5 — Route rewire

Replace hardcoded content in three route files:

| File | Hardcoded today | Becomes |
|---|---|---|
| [ResultsPage.tsx](../packages/web/src/routes/results/ResultsPage.tsx) | ChapterOpener literals (L71-79) | reads from `cms.resultsHero.*` |
| [ResultsPage.tsx](../packages/web/src/routes/results/ResultsPage.tsx) | "Four signature cases" section title + lede (L82-92) | reads from `cms.resultsFeaturedCasesView.{eyebrow,heading,lede}` |
| [ResultsPage.tsx](../packages/web/src/routes/results/ResultsPage.tsx) | filter Mono + count format (L94-99) | reads from `cms.resultsFeaturedCasesView.{filterBarLabel,countFormat}` |
| [ResultsPage.tsx](../packages/web/src/routes/results/ResultsPage.tsx) | "Private gallery / Want to see more?" CTA block (L172-208) | reads from `cms.libraryCta.*` |
| [ResultsPage.tsx](../packages/web/src/routes/results/ResultsPage.tsx) | "Stories, not slogans" section title + lede (L218-227) | reads from `cms.resultsStoriesView.{eyebrow,heading,lede}` |
| [ResultsPage.tsx](../packages/web/src/routes/results/ResultsPage.tsx) | inline `STORIES` array (L10-67) | drops — quotes pulled from `cms.patientStories` (collection `stories`) |
| [ResultsPage.tsx](../packages/web/src/routes/results/ResultsPage.tsx) | "Sharing your story / Have a story to share?" CTA (L255-280) | reads from `cms.shareCta.*` |
| [GalleryPage.tsx](../packages/web/src/routes/gallery/GalleryPage.tsx) | ChapterOpener literals (L15-23) | reads from `cms.galleryPage.hero.*` |
| [GalleryPage.tsx](../packages/web/src/routes/gallery/GalleryPage.tsx) | filter Mono + count format (L26-30) | reads from `cms.galleryPage.{filterBarLabel,countFormat}` |
| [GalleryPage.tsx](../packages/web/src/routes/gallery/GalleryPage.tsx) | "Private gallery / Want to see more?" CTA block (L104-133) | reads from `cms.libraryCta.*` |
| [StoriesPage.tsx](../packages/web/src/routes/stories/StoriesPage.tsx) | ChapterOpener literals (L72-80) | reads from `cms.storiesPage.hero.*` |
| [StoriesPage.tsx](../packages/web/src/routes/stories/StoriesPage.tsx) | inline `STORIES` array (L11-68) | drops — quotes pulled from `cms.patientStories` (collection `stories`) |
| [StoriesPage.tsx](../packages/web/src/routes/stories/StoriesPage.tsx) | "Sharing your story / Have a story to share?" CTA (L111-126) | reads from `cms.shareCta.*` |

### R5.6 — Seed migration (visual invariance gate)

Write `packages/cms/src/seed/seed-results-section-globals.ts` (run once, idempotent):

1. Read hero fields off existing `results-page` Global → upsert into new `results-hero` Global.
2. Upsert `results-featured-cases-view` with eyebrow/heading/lede/filterBarLabel/countFormat copied verbatim from `ResultsPage.tsx` L82-99.
3. Upsert `results-stories-view` with eyebrow/heading/lede copied verbatim from `ResultsPage.tsx` L218-227.
4. Upsert `library-cta` with eyebrow/heading/body/buttonLabel/buttonHref copied from `ResultsPage.tsx` L172-208 (preferred verbiage) — note `GalleryPage.tsx` L104-133 has near-identical prose with minor variance; pick the `/results` version as canonical and update `/gallery` to match (visual invariance gate verifies acceptable).
5. Upsert `share-cta` with eyebrow/heading/body/buttonLabel/buttonHref copied from `ResultsPage.tsx` L255-280 — same canonical-pick treatment versus `StoriesPage.tsx` L111-126.
6. Expand `gallery-page` Global with hero + filterBarLabel + countFormat seeded from `GalleryPage.tsx` hardcoded.
7. Expand `stories-page` Global with hero seeded from `StoriesPage.tsx` hardcoded.
8. Confirm `stories` Collection has 8 rows matching the 2 hardcoded `STORIES` arrays; seed missing rows (idempotent).
9. After verifying everything reads correctly, **propose** (under rule 4 — no unilateral deletes) removing the now-unused hero + section fields from `results-page` Global for user approval.

### R5.7 — Revalidate hooks

Spread `revalidateGlobalAfterChange()` from [`packages/cms/src/lib/revalidate.ts`](../packages/cms/src/lib/revalidate.ts) onto the 5 new globals. `gallery-page` + `stories-page` + `before-after-cases` + `stories` collections already have hooks.

### R5.8 — Verification

```bash
pnpm --filter @cosmedic/cms build
pnpm --filter @cosmedic/web build
pm2 restart cosmedic-cms cosmedic-web

# Admin sanity — 10 items in d. Results Bucket, alphabetical order
curl -s http://127.0.0.1:4007/admin | grep -E "a\. Main|b\. Hero|c\. Library-Cta|d\. Share-Cta|e\. Gallery|f\. Stories|g\. Before-After-Cases|h\. Patient-Stories|i\. Featured-Cases-View|j\. Stories-View"

# Visual invariance — all 3 routes must be byte-identical
for route in /results /gallery /stories; do
  curl -s "https://cosmedic.gaiada.online${route}" > "/tmp/results-before${route//\//-}.html"
done
# ... apply changes ...
for route in /results /gallery /stories; do
  diff "/tmp/results-before${route//\//-}.html" <(curl -s "https://cosmedic.gaiada.online${route}")
done

# Editability proof — edit each new global + shared CTAs, confirm propagation
# 1. b. Hero → change lede → revisit /results → see → revert
# 2. i. Featured-Cases-View → change heading → revisit /results → see → revert
# 3. j. Stories-View → change heading → revisit /results → see → revert
# 4. c. Library-Cta → change body → revisit /results AND /gallery → see in BOTH → revert
# 5. d. Share-Cta → change body → revisit /results AND /stories → see in BOTH → revert
# 6. e. Gallery → change filterBarLabel → revisit /gallery → see → revert
# 7. f. Stories → change hero lede → revisit /stories → see → revert
# 8. h. Patient-Stories → edit one row quote → revisit /stories AND /results Stories-View → see in BOTH → revert
```

### R5.9 Estimate

- **Commits:** ~12–14 (5 new globals + 2 expanded page globals + 2 collection label renames + 3 routes rewired + 1 seed migration)
- **Time:** ~4–5 hours including verification
- **Downtime:** none (warm builds, sub-second `pm2 restart`)

---

## Phase R6 — Bucket "e. Pricing" Detail

> Goal: split `PricingPage` global's nested group fields (overviewBlock / footnoteBlock / insurancePaymentBlock) into 5 dedicated section globals, add a Hero global, add 2 cross-bucket view-only globals for the discipline price list + clinic catalogue chrome, then rewire [PricingPage.tsx](../packages/web/src/routes/pricing/PricingPage.tsx) + [ClinicCatalogueTable.tsx](../packages/web/src/routes/pricing/ClinicCatalogueTable.tsx) to read from them. ConsultationPolicy stays as-is, gets label rename. Procedures + Disciplines + Sub-Categories Collections stay in b. Treatments (cross-bucket reads).

### R6.1 — CMS schema: 7 new Globals, 2 label renames

| Item | Action | Slug (Payload) | Fields |
|---|---|---|---|
| **a. Main** | Rename existing `pricing-page` Global label. Strip overviewBlock + footnoteBlock + insurancePaymentBlock (moved to c/d/e/f). Keep pageFields() only. | `pricing-page` (unchanged) | title, slug, route, publishStatus, sections, seo group |
| **b. Hero** | **New** Global | `pricing-hero` | chapter, titleA, titleB, lede, heroImage, imageHue, imageLabel, breadcrumbLabel |
| **c. Overview** | **New** Global (was `pricing-page.overviewBlock` group) | `pricing-overview` | eyebrow, headingPart1, headingPart2, body |
| **d. Footnote** | **New** Global (was `pricing-page.footnoteBlock` group) | `pricing-footnote` | text (textarea) |
| **e. Insurance** | **New** Global (split from `pricing-page.insurancePaymentBlock`) | `pricing-insurance` | eyebrow, headingRoman, headingItalic, body (textarea, paragraphs separated by blank line) |
| **f. Payment** | **New** Global (split from `pricing-page.insurancePaymentBlock`) | `pricing-payment` | eyebrow, headingRoman, headingItalic, termsText (textarea, one row per line "Label \| Value") |
| **g. Consultation** | Rename `consultation-policy` Global label only | `consultation-policy` (unchanged) | (no field changes) |
| **h. Discipline-List-View** | **New** Global | `pricing-discipline-list-view` | sectionEyebrow (optional), onRequestLabel, includedLabel, arrowChar (default "→") *(view-only — cards from b. Treatments → e. + f. + g.)* |
| **i. Catalogue-View** | **New** Global | `pricing-catalogue-view` | sectionEyebrow, headingRoman, headingItalic, introTemplate (uses `{n}` for total count), sheetSurgicalTitle, sheetSurgicalSubtitle, sheetMachineTitle, sheetMachineSubtitle, sheetInjectionTitle, sheetInjectionSubtitle, sheetBtlTitle, sheetBtlSubtitle, hairZoneLabels group (face, upperBody, lowerBody, package, other), injectableCategoryLabels group (botulinumToxin, filler, skinBooster, collagenStimulator, bioRemodeling, threadLift, mesotherapy, hgh, other) *(view-only — rows from b. Treatments → g. Procedures filtered by catalogueGroup)* |

**Important:** slugs do **not** change for renamed items. Existing pricing-page data fields are preserved during the split.

### R6.2 — `admin.description` notes

**On Bucket `e. Pricing`:**

> Governs `/pricing`. The discipline price list rows + clinic catalogue table rows are sourced cross-bucket from `b. Treatments` (Disciplines + Sub-Categories + Procedures). This Bucket owns the section chrome (a–g) and the 2 cross-bucket view items (h, i). Edit prices in `b. Treatments → g. Procedures`.

**On items h / i (the 2 view items):**

> The cards / rows shown in this section are **not edited here**. Edit the source in `b. Treatments → g. Procedures` (catalogue line items) and `b. Treatments → e. Disciplines + f. Sub-Categories` (discipline list grouping). This item controls only the section chrome strings.

### R6.3 — Settings field additions

None.

### R6.4 — Web data layer

Extend [`packages/web/src/lib/cms.ts`](../packages/web/src/lib/cms.ts) parallel cache load:

- `fetchGlobal('pricing-hero')`
- `fetchGlobal('pricing-overview')`
- `fetchGlobal('pricing-footnote')`
- `fetchGlobal('pricing-insurance')`
- `fetchGlobal('pricing-payment')`
- `fetchGlobal('pricing-discipline-list-view')`
- `fetchGlobal('pricing-catalogue-view')`

Extend `CmsCache` interface accordingly. Procedures + Disciplines + Sub-Categories Collections + ConsultationPolicy global already fetched.

### R6.5 — Route rewire

Replace hardcoded strings in [PricingPage.tsx](../packages/web/src/routes/pricing/PricingPage.tsx):

| Hardcoded today | Becomes |
|---|---|
| `DEFAULT_PAYMENT_TERMS` (L13-20) | reads from `cms.pricingPayment.termsText` (parsed) |
| ChapterOpener literals (L65-73) | reads from `cms.pricingHero.*` |
| Overview block reads from `pricing-page.overviewBlock` (L39-42, L75-97) | reads from `cms.pricingOverview.*` |
| Discipline list section H2/H3 + "On request" / "Included" / arrow labels (L101-251) | reads from `cms.pricingDisciplineListView.*` |
| Footnote fallback (L44-46) | reads from `cms.pricingFootnote.text` |
| Insurance section (L52-57, L284-301) | reads from `cms.pricingInsurance.*` |
| Payment section (L58-61, L304-340) | reads from `cms.pricingPayment.*` |

Replace hardcoded strings in [ClinicCatalogueTable.tsx](../packages/web/src/routes/pricing/ClinicCatalogueTable.tsx):

| Hardcoded today | Becomes |
|---|---|
| `SHEET_LABEL` (L31-36) | reads from `cms.pricingCatalogueView.sheet{Surgical,Machine,Injection,Btl}{Title,Subtitle}` |
| `HAIR_ZONE_LABEL` (L38-44) | reads from `cms.pricingCatalogueView.hairZoneLabels.*` |
| `labelInjectableCategory` (L46-58) | reads from `cms.pricingCatalogueView.injectableCategoryLabels.*` |
| Section eyebrow "Clinic catalogue · CMS-managed" + heading + intro (L334-353) | reads from `cms.pricingCatalogueView.sectionEyebrow / headingRoman / headingItalic / introTemplate` (`{n}` replaced with `totalCatalogueRows`) |

### R6.6 — Seed migration (visual invariance gate)

Write `packages/cms/src/seed/seed-pricing-section-globals.ts` (run once, idempotent):

1. Upsert `pricing-hero` with 8 atoms from PricingPage.tsx L65-73 verbatim.
2. Read existing `pricing-page` Global → copy `overviewBlock` group into new `pricing-overview` global → set `pricing-overview` fields.
3. Read existing `pricing-page` Global → copy `footnoteBlock.text` into new `pricing-footnote.text`.
4. Read existing `pricing-page` Global → copy `insurancePaymentBlock.insurance*` into new `pricing-insurance` global; copy `insurancePaymentBlock.payment*` into new `pricing-payment` global.
5. Upsert `pricing-discipline-list-view` with default labels ("On request", "Included", "→").
6. Upsert `pricing-catalogue-view` with all chrome strings from ClinicCatalogueTable.tsx (SHEET_LABEL × 4, HAIR_ZONE_LABEL × 5, labelInjectableCategory × 9, section eyebrow + heading + intro template).
7. After verifying everything reads correctly, **propose** (under rule 4 — no unilateral deletes) removing the moved-out group fields from `pricing-page` for user approval.

### R6.7 — Revalidate hooks

Spread `revalidateGlobalAfterChange()` onto all 7 new globals. Standard project pattern.

### R6.8 — Verification

```bash
pnpm --filter @cosmedic/cms build
pnpm --filter @cosmedic/web build
pm2 restart cosmedic-cms cosmedic-web

# Admin sanity — 9 items in e. Pricing Bucket
curl -s http://127.0.0.1:4007/admin | grep -E "a\. Main|b\. Hero|c\. Overview|d\. Footnote|e\. Insurance|f\. Payment|g\. Consultation|h\. Discipline-List-View|i\. Catalogue-View"

# Visual invariance — /pricing must be byte-identical
curl -s https://cosmedic.gaiada.online/pricing > /tmp/pricing-before.html
# ... apply changes ...
diff /tmp/pricing-before.html <(curl -s https://cosmedic.gaiada.online/pricing)

# Editability proof
# 1. b. Hero → change lede → revisit /pricing → see → revert
# 2. c. Overview → change heading → revisit /pricing → see → revert
# 3. d. Footnote → change text → revisit /pricing → see → revert
# 4. e. Insurance → change body → revisit /pricing → see → revert
# 5. f. Payment → add a term → revisit /pricing → see → revert
# 6. h. Discipline-List-View → change "On request" label → revisit /pricing → see → revert
# 7. i. Catalogue-View → change "Surgical Procedures" title → revisit /pricing → see → revert
# 8. Cross-bucket: edit a Procedure in b. Treatments → g. Procedures → revisit /pricing → see new price → revert
```

### R6.9 Estimate

- **Commits:** ~10–12 (7 new globals + 2 route rewires + seed migration + verification)
- **Time:** ~3–4 hours (1 route; well-scoped split from existing global)
- **Downtime:** none

---

## Phase R7 — Bucket "f. Journey" Detail

> Goal: replace hardcoded STEPS array + ChapterOpener literals in [JourneyPage.tsx](../packages/web/src/routes/journey/JourneyPage.tsx) with reads from JourneyPage Global + JourneySteps Collection; collapse /recovery-stays editorial into a sibling global + wire RecoveryStays Collection to back the villa grid.

### R7.1 — CMS schema: 3 new Globals, 3 renames

| Item | Action | Slug (Payload) | Fields |
|---|---|---|---|
| **a. Main** | Rename existing `journey-page` Global label. Strip hero fields (move to `b. Hero`); strip stats (move to `d. Stats`). | `journey-page` (unchanged) | title, slug, route, publishStatus, sections, seo group |
| **b. Hero** | **New** Global | `journey-hero` | chapter, titleA, titleB, lede, heroImage, breadcrumbLabel |
| **c. Steps** | Rename `journey-steps` Collection label only. **Wire it to the route** (replaces hardcoded `STEPS` array). | `journey-steps` (unchanged) | (per-row: number, title, body, bullets[4], image — already exists in code) |
| **d. Stats** | **New** Global | `journey-stats` | stats array (3 rows: number, label) |
| **e. Recovery-Stays** | Rename existing `recovery-stays-page` Global label. Repurpose to cover the full `/recovery-stays` editorial (hero + top stats + portfolio chrome + inclusions chrome). | `recovery-stays-page` (unchanged) | full editorial section block array |
| **f. Villas** | Rename `recovery-stays` Collection label only. **Wire it to the route** (replaces hardcoded `VILLAS` array). | `recovery-stays` (unchanged) | (per-row already exists: name, location, br, pool, fromIdr, body, img, hue) |

### R7.2 — Web data layer

Extend [`packages/web/src/lib/cms.ts`](../packages/web/src/lib/cms.ts) parallel cache load:
- `fetchGlobal('journey-hero')`
- `fetchGlobal('journey-stats')`
- (JourneySteps + RecoveryStays Collections are already fetched; confirm `fetchAll` calls present.)

Extend `CmsCache` interface accordingly.

### R7.3 — Route rewire

Replace hardcoded content in [JourneyPage.tsx](../packages/web/src/routes/journey/JourneyPage.tsx):

| Hardcoded today | Becomes |
|---|---|
| `STEPS` array (L10–109) | `cms.journeySteps.sort(byStepNumber).map(...)` |
| ChapterOpener literals (L113–120) | `chapter={journeyHero.chapter}` … |
| Stats row literals (L148–166) | `journeyStats.stats.map(...)` |

Replace hardcoded content in [RecoveryStaysPage.tsx](../packages/web/src/routes/recovery-stays/RecoveryStaysPage.tsx):

| Hardcoded today | Becomes |
|---|---|
| `VILLAS` array (L11–78) | `cms.recoveryStays.map(...)` |
| `INCLUSIONS` array (L80–89) | reads from `recoveryStaysPage.inclusions` |
| ChapterOpener literals (L96–104) | reads from `recoveryStaysPage.hero.*` |
| Stats row literals (L106–131) | reads from `recoveryStaysPage.stats[]` |
| Section heads "The portfolio" + "What's included" (L134–148, L182–195) | reads from `recoveryStaysPage.portfolioSection.*` + `recoveryStaysPage.inclusionsSection.*` |

### R7.4 — Seed migration

Write `packages/cms/src/seed/seed-journey-section-globals.ts` (run once, idempotent):

1. Read the 4 hero fields off `journey-page` global → upsert into new `journey-hero`.
2. Create `journey-stats` with the 3 hardcoded stat rows seeded verbatim.
3. Re-seed `journey-steps` Collection with the 7 hardcoded STEPS rows (confirm existing 6 seeded rows + add Step 07 Homecoming if missing).
4. Repurpose `recovery-stays-page` global with full editorial fields seeded from current RecoveryStaysPage.tsx hardcoded strings.
5. Re-seed `recovery-stays` Collection with the 6 hardcoded VILLAS rows (confirm existing 6 seeded rows match the hardcoded content).

### R7.5 — Revalidate hooks

Spread `revalidateGlobalAfterChange()` onto `journey-hero` + `journey-stats`. (`journey-steps`, `recovery-stays-page`, `recovery-stays` already have hooks.)

### R7.6 — Verification

```bash
pnpm --filter @cosmedic/cms build
pnpm --filter @cosmedic/web build
pm2 restart cosmedic-cms cosmedic-web

# Admin sanity — 6 items in f. Journey Bucket
curl -s http://127.0.0.1:4007/admin | grep -E "a\. Main|b\. Hero|c\. Steps|d\. Stats|e\. Recovery-Stays|f\. Villas"

# Visual invariance — /journey AND /recovery-stays must be byte-identical
curl -s https://cosmedic.gaiada.online/journey > /tmp/journey-before.html
curl -s https://cosmedic.gaiada.online/recovery-stays > /tmp/rs-before.html
# ... apply changes ...
diff /tmp/journey-before.html <(curl -s https://cosmedic.gaiada.online/journey)
diff /tmp/rs-before.html <(curl -s https://cosmedic.gaiada.online/recovery-stays)

# Editability proof — edit one step body, confirm /journey changes; edit one villa, confirm /recovery-stays changes
```

### R7.7 Estimate

- **Commits:** ~10–12
- **Time:** ~4–5 hours including verification (more atoms than Contact)
- **Downtime:** none

---

## Phase R8 — Bucket "h. About" Detail

> Goal: split `/blog`-index and `/blog/<slug>`-template editorial into 2 globals (one each) + create a new collection backing the 10 hardcoded `/privacy` legal sections. Wire each /blog, /blog/<slug>, /press, /privacy route component to read from its dedicated global / collection so every visible atom becomes editable. About is fully self-contained — no Settings reads, no cross-bucket dependencies in either direction.

### R8.1 — CMS schema: 1 new Global, 1 new Collection, 8 label renames

| Item | Action | Slug (Payload) | Fields |
|---|---|---|---|
| **a. Blog** | Rename existing `blog-page` Global label. Strip per-post template fields (move to j. Blog-Post-Template). | `blog-page` (unchanged) | hero (chapter, titleA, titleB, lede, heroImage), thisIssueEyebrow, readTheEssayCtaLabel, archiveEyebrow, archiveHeading, archiveLede, archiveFilterLabel, archiveEmptyStateCopy |
| **b. Blog-Posts** | Rename `blog-posts` Collection label only | `blog-posts` (unchanged) | (no field changes) |
| **c. Blog-Tags** | Rename `blog-tags` Collection label only | `blog-tags` (unchanged) | (no field changes) |
| **d. Authors** | Rename `authors` Collection label only | `authors` (unchanged) | (no field changes) |
| **e. Press** | Rename `press-page` Global label only | `press-page` (unchanged) | hero (existing) + accreditationsEyebrow, accreditationsHeading, accreditationsLede, pressEyebrow, pressHeading, pressLede |
| **f. Press-Mentions** | Rename `press-mentions` Collection label only | `press-mentions` (unchanged) | (no field changes — already has headline, date, outlet, url) |
| **g. Awards** | Rename `awards` Collection label only | `awards` (unchanged) | (per-row already has: name, fullName, notes, image) |
| **h. Privacy** | Rename `privacy-page` Global label. Strip the hardcoded section fields (move to i. Privacy-Sections). | `privacy-page` (unchanged) | hero (chapter, titleA, titleB, lede, heroImage), lastUpdatedDate, introParagraph |
| **i. Privacy-Sections** | **New** Collection | `privacy-sections` | sortOrder, heading, body (richText) |
| **j. Blog-Post-Template** | **New** Global | `blog-post-template` | aboutTheAuthorHeading, moreFromTheJournalHeading, bylineFormatTemplate (optional) |

### R8.2 — `admin.description` notes

**On Bucket `h. About`:**

> Editorial pages reached from the footer "About" column — Press, Blog (+ posts), Privacy & Terms. There is no `/about` page itself. Fully self-contained — no Settings or cross-bucket reads needed.

**On `j. Blog-Post-Template`:**

> Template-level strings that apply to every `/blog/<slug>` post page. Per-post hero / body / byline lives on b. Blog-Posts (the row); this global controls only the "About the author" and "More from the journal" section headings shared across all posts.

**On `i. Privacy-Sections`:**

> The 10 legal sections shown on `/privacy`. One row per section. Use `sortOrder` to control rendering order. Each row's `body` field is rich text (supports paragraphs + lists + emphasis).

### R8.3 — Settings field additions

None. About Bucket is self-contained.

### R8.4 — Web data layer

Extend [`packages/web/src/lib/cms.ts`](../packages/web/src/lib/cms.ts) parallel cache load:

- `fetchGlobal('blog-post-template')` (new)
- `fetchAll('privacy-sections')` (new collection)
- Existing `blog-page`, `press-page`, `privacy-page` globals + `blog-posts`, `blog-tags`, `authors`, `press-mentions`, `awards` collections — already fetched; confirm.

Extend `CmsCache` interface with the new global + collection types.

### R8.5 — Route rewire

Replace hardcoded strings in:

| File | Hardcoded today | Becomes |
|---|---|---|
| [BlogIndex.tsx](../packages/web/src/routes/blog/BlogIndex.tsx) | "The archive" heading + lede (L110-118), filter row label, empty-state copy | reads from `cms.blogPage.archive*` |
| [BlogPost.tsx](../packages/web/src/routes/blog/BlogPost.tsx) | "About the author" heading (L171), "More from the journal" heading (L196, L198) | reads from `cms.blogPostTemplate.aboutTheAuthorHeading / moreFromTheJournalHeading` |
| [PressPage.tsx](../packages/web/src/routes/press/PressPage.tsx) | ACCREDITATIONS array (L10-51) — 8 entries | reads from `cms.awards` (8 rows) |
| [PressPage.tsx](../packages/web/src/routes/press/PressPage.tsx) | PRESS array (L53-60) — 6 headlines | reads from `cms.pressMentions` (6 rows) |
| [PressPage.tsx](../packages/web/src/routes/press/PressPage.tsx) | ChapterOpener (L64-71) + section heads (L105-110, L163-169) | reads from `cms.pressPage.hero.*` + `cms.pressPage.{accreditations,press}{Eyebrow,Heading,Lede}` |
| [PrivacyPage.tsx](../packages/web/src/routes/privacy/PrivacyPage.tsx) | SECTIONS array (L17-103) — 10 legal sections | reads from `cms.privacySections` (10 rows, sorted by `sortOrder`) |
| [PrivacyPage.tsx](../packages/web/src/routes/privacy/PrivacyPage.tsx) | ChapterOpener (L108-114) + Last updated "12 May 2026" (L133) | reads from `cms.privacyPage.hero.*` + `cms.privacyPage.lastUpdatedDate` |

### R8.6 — Seed migration (visual invariance gate)

Write `packages/cms/src/seed/seed-about-section-content.ts` (run once, idempotent):

1. Read the existing `blog-page` Global, split fields between `a. Blog` (index chrome) and new `j. Blog-Post-Template` global (which gets seeded with hardcoded "About the author" + "More from the journal" headings from current BlogPost.tsx).
2. Update `press-page` Global with the 6 new section-chrome fields seeded from hardcoded section heads.
3. Update `privacy-page` Global with `lastUpdatedDate = "12 May 2026"` + introParagraph (if any).
4. Upsert `privacy-sections` collection with 10 rows from hardcoded SECTIONS array (sortOrder 1-10).
5. Confirm `awards` collection has 8 rows matching hardcoded ACCREDITATIONS; seed if missing.
6. Confirm `press-mentions` collection has 6 rows matching hardcoded PRESS array; seed if missing.
7. After verifying everything reads correctly, **propose** (under rule 4 — no unilateral deletes) removing the now-unused per-post template fields from `blog-page` for user approval.

### R8.7 — Revalidate hooks

Spread `revalidateGlobalAfterChange()` onto new `blog-post-template` Global. Standard `revalidationHooks()` onto new `privacy-sections` Collection. Other globals + collections already wired.

### R8.8 — Verification

```bash
pnpm --filter @cosmedic/cms build
pnpm --filter @cosmedic/web build
pm2 restart cosmedic-cms cosmedic-web

# Admin sanity — 10 items in h. About Bucket
curl -s http://127.0.0.1:4007/admin | grep -E "a\. Blog|b\. Blog-Posts|c\. Blog-Tags|d\. Authors|e\. Press|f\. Press-Mentions|g\. Awards|h\. Privacy|i\. Privacy-Sections|j\. Blog-Post-Template"

# Visual invariance — all 4 routes must be byte-identical
for route in /blog /press /privacy; do
  curl -s "https://cosmedic.gaiada.online${route}" > "/tmp/about-before${route//\//-}.html"
done
# ... apply changes ...
for route in /blog /press /privacy; do
  diff "/tmp/about-before${route//\//-}.html" <(curl -s "https://cosmedic.gaiada.online${route}")
done
# Spot-check one /blog/<slug> route too

# Editability proof
# 1. a. Blog → change archiveLede → revisit /blog → see → revert
# 2. j. Blog-Post-Template → change moreFromTheJournalHeading → revisit /blog/<slug> → see → revert
# 3. e. Press → change accreditationsLede → revisit /press → see → revert
# 4. i. Privacy-Sections → edit row 1 body → revisit /privacy → see → revert
```

### R8.9 Estimate

- **Commits:** ~10–12 (4 routes touched, 1 new global, 1 new collection, 1 schema migration)
- **Time:** ~4–5 hours (10 hardcoded privacy sections are the bulk — accurate verbatim seeding is the gate)
- **Downtime:** none

---

## All per-Bucket phases planned

All 8 detailed phases (R1 / R2 / R3 / R4 / R5 / R6 / R7 / R8) are mapped above following the same shape:

1. Per-Bucket detail in [remap.md](./remap.md) §2.
2. CMS schema work (new globals as needed, label renames, `admin.description` notes).
4. Route rewire (replace hardcoded strings).
5. Seed migration to preserve visual invariance.
6. Revalidate hooks.
7. Verify (curl smoke + visual diff + editability proof).

Each phase ships independently. User signs off on the per-Bucket map (in [remap.md](./remap.md)) before that phase's code work starts.

---

## Risks (whole remap)

1. **Phase R0 is the safest; Phases R1–R8 each carry seed-migration risk.** Visual diff must be empty for each Bucket; if not, the seed mismatched the hardcoded source — fix the seed, redeploy, re-diff.
2. **Renaming Payload Global slugs is destructive.** The plan keeps slugs unchanged for all renamed items; new globals get new slugs.
3. **Splitting hero fields off `contact-page` / `journey-page` requires tiny data migrations** (R1.6, R7.4) — same pattern when other Bucket detail phases split fields off existing globals.
4. **Payload admin label / sidebar-label mechanism needs verification** before relying on `labels: { singular, plural }` to render the renamed labels — `admin.group` alone may suffice for Bucket labels, but per-item labels may need additional Payload API research. Rule "Never guess" — verify before coding R0.
5. **Settings stays the single source of truth for clinic identity** across the realignment. Any new field added to Settings (e.g. `pressEmail` in R1.3) is a one-time addition, not a duplication into another Bucket.

## Estimate (whole remap)

| Phase | Estimate |
|---|---|
| R0 — Bucket realignment | 30–45 min |
| R1 — g. Contact detail | 3–4 hours |
| R2 — a. Homepage detail | 5–7 hours |
| R3 — b. Treatments | 6–8 hours (29 routes; 5 new globals + 4 collection renames) |
| R4 — c. Doctors | 3–4 hours (9 routes; 5 new globals) |
| R5 — d. Results detail | 4–5 hours (3 routes, 5 new globals, 2 shared CTAs) |
| R6 — e. Pricing | 3–4 hours (1 route; 7 new globals split from existing PricingPage) |
| R7 — f. Journey detail | 4–5 hours |
| R8 — h. About detail | 4–5 hours (4 routes, lots of hardcoded prose) |
| **Total** | **~30–35 hours** spread across 9+ phased commits |

No site downtime at any point (warm builds, sub-second `pm2 restart`).

## Greenlight gate

Do not start **Phase R0** until user confirms the 9-Bucket structure in [remap.md](./remap.md) §1.2 and §1.3.

---

## Appendix A — Cross-Bucket Data Flow (source-of-truth reference)

Where data sourced in one Bucket is **displayed read-only** in another. Editor edits the source row; consumers update on next cache bust. Used to drive `admin.description` notes + `-View` suffix decisions.

### A.1 — a. Homepage → l. Settings (the single source of truth for clinic identity)

| Source field on l. Settings | Read-only display location |
|---|---|
| `contactPhone`, `whatsappNumber`, `contactEmail`, `pressEmail` | g. Contact → c. Enquiry-Section (Direct lines block) |
| `addressLine1` / `addressLine2` / `city` / `postalCode` / `country` | g. Contact → d. Visit-Section (Address block) + a. Homepage → d. Footer (address block) |
| `hoursMonFri` / `hoursSatSun` | g. Contact → d. Visit-Section (Clinic hours) |
| `googleMapsUrl` | g. Contact → d. Visit-Section (Open in Maps / Get directions) |
| `whatsappNumber` | a. Homepage → i. Floating-CTA (WhatsApp button) + a. Homepage → d. Footer (WhatsApp link in Connect column) |
| `socialLinks[]` | a. Homepage → d. Footer (Connect column) |
| `audToIdrRate`, `roundIdrTo`, `currencyDisplayMode` | b. Treatments + e. Pricing (every price render) |
| clinic name + city | c. Doctors → g. Detail-Template (Practice row) |

### A.2 — c. Doctors → c. Surgeons (the canonical Collection for every surgeon surface)

| Source on c. Surgeons | Read-only display location |
|---|---|
| All fields | a. Homepage → o. Surgeons-View (homepage teaser) |
| lead=true row + selected specialists | a. Homepage → c. Header (Doctors mega-menu) |
| lead-by-discipline | b. Treatments → discipline detail "Lead Surgeon" panel |
| lead-by-subcategory | b. Treatments → sub-category detail "Lead Surgeon" panel |
| authoring surgeon | h. About → c. Blog-Posts byline |

### A.3 — b. Treatments → Disciplines (catalogue + nav source)

| Source on Disciplines | Read-only display location |
|---|---|
| All rows (title + sortOrder) | a. Homepage → d. Footer (Treatments column — auto-built) |
| All rows | a. Homepage → m. Treatments-View (homepage teaser cards) |
| All rows | a. Homepage → c. Header (Treatments mega-menu) |
| Parent discipline `title` | c. Doctors → g. Detail-Template (hero Treatments back-link CTA) |

### A.4 — d. Results → g. Before-After-Cases + h. Patient-Stories

| Source | Read-only display location |
|---|---|
| g. Before-After-Cases (all rows) | d. Results → i. Featured-Cases-View (`/results` grid) + d. Results → e. Gallery (`/gallery` grid) + a. Homepage → p. Gallery-View |
| h. Patient-Stories (all rows) | d. Results → j. Stories-View (`/results` story rows) + d. Results → f. Stories (`/stories` rows) + a. Homepage → r. Stories-View |

### A.5 — d. Results → c. Library-Cta + d. Share-Cta (shared CTA blocks)

| Source | Read-only display location |
|---|---|
| c. Library-Cta | `/results` "Want to see more?" + `/gallery` "Want to see more?" |
| d. Share-Cta | `/results` "Have a story to share?" + `/stories` "Have a story to share?" |

### A.6 — f. Journey → c. Steps (the canonical step Collection)

| Source on c. Steps | Read-only display location |
|---|---|
| All 7 rows | f. Journey → b. Hero context + a. Homepage → q. Journey-View (step previews) |

---

## Appendix B — Naming conventions

| Item type | Convention | Examples |
|---|---|---|
| Global (page-section editorial) | Singular descriptive | a. Main · b. Hero · c. Enquiry-Section · d. Visit-Section · e. Form · f. Email · d. Stats |
| Collection (data rows) | Plural noun | c. Steps · c. Surgeons · d. Authors · e. Disciplines · f. Sub-Categories · f. Villas · g. Awards · g. Inbox · g. Procedures · g. Before-After-Cases · h. Patient-Stories |
| Sibling page collapsed to one Item | Page name with hyphen | e. Recovery-Stays (in f. Journey) · h. Video-Consult (in g. Contact) · g. Gallery + h. Stories (in d. Results) |
| View-only mirror Item (cards from another Item) | Suffix `-View` (placed last in Bucket) | m. Treatments-View · n. Pricing-View · o. Surgeons-View · p. Gallery-View · q. Journey-View · r. Stories-View (all in a. Homepage) · i. Featured-Cases-View · j. Stories-View (in d. Results) · d. Lead-View · e. Plastic-Surgery-View · f. Aesthetic-Medicine-View (in c. Doctors) · h. Discipline-List-View · i. Catalogue-View (in e. Pricing) |
| Shared template Item (chrome shared across N detail routes) | Suffix `-Template` (placed last in Bucket) | g. Detail-Template (in c. Doctors) · h. Discipline-Template · i. Sub-Category-Template (in b. Treatments) · j. Blog-Post-Template (in h. About) |
| Shared CTA Global serving 2+ pages | `*-Cta` | c. Library-Cta · d. Share-Cta (both in d. Results) |
| Bucket label | `a. Name` … `i. Name` prefix matching site IA reading order | a. Homepage · b. Treatments · c. Doctors · d. Results · e. Pricing · f. Journey · g. Contact · h. About · i. Media Library |

---

## Appendix C — Postgres + Payload migration gotchas (referenced from CLAUDE.md)

Carry into every per-Bucket phase that creates new Globals or Collections. Lessons from Item 2 (`Pages → 14 Globals` refactor):

1. **`payload migrate` hangs silently** on large migrations even with `--force-accept-warning`. Workaround: extract the `await db.execute(sql\`...\`)` body to a `.sql` file and pipe to `psql --single-transaction -v ON_ERROR_STOP=1`. Then `INSERT INTO payload_migrations (name, batch, created_at, updated_at) VALUES ('<migration-name>', <next-batch>, NOW(), NOW())` to register.
2. **Postgres 63-char identifier limit** — block field enums named `enum_<gslug>_blocks_<bslug>_<field>` can exceed it for long global slugs. Use `dbName: '...'` override on the GlobalConfig (e.g. `recovery-stays-page` needed `dbName: 'rec_stays_pg'`).
3. **Direct psql DDL leaves objects owned by `postgres`** — the Payload runtime connects as `cosmedic` and gets `permission denied` on `ALTER`. After applying schema directly, run `ALTER TABLE/SEQUENCE/TYPE OWNER TO cosmedic` for every new public-schema object. One-shot: `psql -tAc "SELECT 'ALTER TABLE \"' || tablename || '\" OWNER TO cosmedic;' FROM pg_tables WHERE schemaname='public'" | psql`. Also `ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cosmedic`.
4. **`tsx` scripts that call `getPayload()` trigger `pushDevSchema`** unless `NODE_ENV=production` is set. The drizzle push tries `ALTER TABLE ... DROP CONSTRAINT` and fails on non-owner. Always invoke one-off migration / seed scripts as `NODE_ENV=production pnpm --filter @cosmedic/cms exec tsx <script>`.
5. **`git stash -u` will sweep untracked top-level directories** — `changes/` got vacuumed once. Recoverable via `git checkout stash@{0}^3 -- <path>`. `/changes/` is now in `.gitignore`.

Reference these in any phase's R*.6 seed migration + R*.8 verification when DDL or seed-script work is in scope.

---

## Appendix D — Per-phase rollback path

R0 path is `git revert <commit>` (pure string edits). Every per-Bucket phase R1–R8 follows the same shape:

1. **Git revert** the commits in reverse — restores `admin.group` labels, route files, `cms.ts` fetches, `CmsCache` interface, seed scripts.
2. **DB**: new Global tables (`globals_<slug>` + `_locales` + `_rels`) can be left in place after revert — Payload ignores tables for unregistered Globals. Drop only if cleanup is requested: `DROP TABLE IF EXISTS globals_<slug>, globals_<slug>_locales, globals_<slug>_rels CASCADE;` then `DELETE FROM payload_migrations WHERE name = '<migration-name>';`.
3. **Sibling sites unaffected** at all times — Phase R is single-site work.
4. **Visual invariance gate** is the safety net: a phase that produces a visual diff before commit doesn't ship.
