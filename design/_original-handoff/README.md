# Handoff: BIMC CosMedic — Multi-page Marketing Site

## Overview

A complete editorial-luxury marketing website for **BIMC CosMedic**, a plastic surgery clinic in Nusa Dua, Bali, Indonesia. The audience is international medical tourists from Australia, the United States and Europe seeking discretion, clinical credibility and a restorative atmosphere.

The design treats the site as an editorial publication — chapter-based section openers, serif display type, mono accents, generous negative space, warm-neutral palette, real before/after imagery and real surgeon profiles.

## About the Design Files

The files in `design/` are **design references created in HTML/JSX/CSS**. They are prototypes of the intended look, content structure and behaviour — **not production code to ship as-is**. Your task is to **recreate these designs in the project's chosen production stack** (e.g. Next.js + Tailwind, Astro + vanilla CSS, SvelteKit, etc.) using its established patterns. If no codebase exists yet, choose the most appropriate framework — Next.js (App Router) + a CMS-friendly structure is a strong default for a marketing/content site of this scale.

The HTML pages use Babel-in-browser transpilation of inline JSX for fast iteration; that approach is **not** for production. Treat each `.jsx` file in `design/pages/` as a component spec.

## Fidelity

**High-fidelity.** Final colours, typography, spacing, copy, imagery sources, interactions, animations and responsive behaviour are all defined. The developer should pixel-match the design while using the production codebase's idiomatic component patterns.

## Pages (75 total)

### Top-level pages (10)
| Slug | File | Purpose |
|---|---|---|
| `/` | `index.html` | Homepage — hero with embedded enquiry form, stats, treatments, surgeons, gallery, journey, stories, place |
| `/treatments` | `treatments.html` | Treatments index — grid of 6 disciplines |
| `/surgeons` | `surgeons.html` | Surgeons index — featured lead + grouped grid (Plastic Surgery / Aesthetic Medicine) |
| `/journey` | `journey.html` | "Your Journey" — 8-step process from enquiry to twelve-month follow-up |
| `/gallery` | `gallery.html` | Before & after grid — 29 cases with category filters |
| `/stories` | `stories.html` | Patient testimonials |
| `/press` | `press.html` | Editorial mentions, awards |
| `/pricing` | `pricing.html` | Tier packages + per-treatment table |
| `/recovery-stays` | `recovery-stays.html` | Curated villa partners for post-op recovery |
| `/contact` | `contact.html` | Enquiry form + practical info |

### Discipline pages (6)
`treatment-{surgical, non-surgical, hair, dental, recovery, concierge}.html` — each with a clickable procedures table, lead surgeon, pricing tiers, FAQs.

### Procedure pages (41)
`procedure-{slug}.html` — individual deep dives for every procedure across all 6 disciplines (e.g. `procedure-rhinoplasty.html`, `procedure-botulinum-toxin.html`). All driven by `pages/procedure-data.jsx` (single source of truth — copy directly into your CMS or content layer) and `pages/procedure-detail.jsx` (template).

### Surgeon pages (8)
`surgeon-{suka, astri, indra, wara, sissy, rosa, risma, theresia}.html` — real surgeon roster sourced from cosmedic.bimcbali.com. Photos hot-link to the live BIMC CDN; the production build should download and self-host them.

## Design Tokens

Defined as CSS custom properties in `design/global.css` under `:root`. Excerpt:

### Colors
```
--paper:       #f4ede1   /* primary background — warm cream */
--paper-warm:  #efe6d5   /* tinted section background */
--cream:       #ebe2d0   /* hero/photo placeholder bg */
--ink-100:     #2b2620   /* primary text */
--ink-80:      #4a4239   /* body text */
--ink-60:      #6f655a   /* muted text */
--ink-40:      #9a8e7e
--ink-20:      #c5b9a6   /* hairlines, dividers */
--ink-10:      #ddd2bd
--accent:      #b97a4a   /* bronze — CTAs, highlights */
--accent-deep: #8a5430   /* deeper bronze — active states, hover */
--accent-soft: #e8d5c0   /* tinted bronze background */
```

### Typography
```
--font-serif: "Cormorant Garamond", "Times New Roman", Georgia, serif;  /* display + h1–h4 */
--font-sans:  "Inter", -apple-system, BlinkMacSystemFont, sans-serif;   /* body + UI */
--font-mono:  "JetBrains Mono", ui-monospace, "SF Mono", monospace;     /* eyebrows, labels, prices */
```
Loaded from Google Fonts. Sizes set per element; key beats:
- Display headings (chapter openers): serif 84–112px, weight 400, line-height 0.95, letter-spacing -0.02em
- Section titles: serif 56–72px, weight 400, italic accents on key words
- Body lede: serif italic 22px, line-height 1.55
- Body: Inter 16–17px, line-height 1.65, color `--ink-80`
- Eyebrows / mono labels: JetBrains Mono 11px, weight 500, letter-spacing 0.20em, uppercase
- Main nav links: mono 12px, weight 500, letter-spacing 0.20em, uppercase

### Spacing & layout
- Page max-width: 1480px (centered, side padding 40px / 24px on mobile)
- Section vertical rhythm: 120–160px desktop, 72–96px mobile
- Hairline border: `1px solid var(--ink-20)`
- Card radius: **0** (square edges throughout — editorial aesthetic, no rounded corners)
- Image aspect ratios: hero 4:5, surgeon portrait 4:5, B&A composite 1:1, treatment cards 3:4

## Components

All built React-style in `design/pages/*.jsx`, with shared primitives in `design/shared.jsx`:

| Component | Purpose |
|---|---|
| `PageShell` | Header + footer + floating chrome (CTA, language switcher, chat) |
| `ChapterOpener` | Editorial chapter intro with chapter eyebrow, large serif title (with italic accent on key word), lede, breadcrumbs and full-bleed image |
| `Reveal` | Intersection-observer scroll-triggered fade+slide-in |
| `Img` | Image with brand-painted SVG fallback on error |
| `Btn` | Primary / accent / ghost button variants, with `as` prop for `<a>` |
| `Mono`, `Eyebrow` | Mono label primitives |
| `PriceTag` | IDR primary + AUD italic (≈ AUD X,XXX) currency display |

## Header / Navigation

- **Always solid** cream background (`--paper`), thin bottom hairline, fixed at top.
- **Logo** at left — image (`design/assets/logo.png` bronze + `logo-light.png` white for dark backgrounds). Always links to `/`.
- **Primary nav** centred. Items: Treatments (mega-menu), Surgeons (mega-menu), Your Journey, Gallery, Stories, Contact.
- **Mega-menu dropdowns** under Treatments + Surgeons. Triggered on hover, with a `padding-top` bridge so the cursor never hits dead space crossing into the panel. Each dropdown row uses the same mono/uppercase style as the main menu.
- **Active state** — current section in `--accent-deep` with a permanent underline. Detail pages also highlight the parent section (e.g. on `procedure-rhinoplasty.html`, "Treatments" lights up); inside a dropdown, the specific sub-item also gets the active style.
- **Language switcher** at right — `EN | ID` only.

## Footer

- Dark `--ink-100` background, `--paper` text.
- Logo (white variant), columns of links (Treatments / Surgeons / Information), enquiry summary, social, copyright.

## Floating chrome

- **Fixed CTA pill** bottom-right — "Plan your treatment" → links to `/contact`.
- **Chat affordance** — concierge-style trigger.
- All present on every page via `PageShell`.

## Pricing display

Always **IDR primary, AUD italic underneath**:
- Conversion: 1 AUD ≈ 10,500 IDR (rate as of May 2026 — extract to a config value)
- Round IDR to nearest 50,000 for clean numbers
- Format: `Rp 89.250.000` (German locale) for primary; `≈ AUD 8,500` italic, smaller, ink-60

Helper: `<PriceTag aud="8,500" />` in `shared.jsx`.

## Imagery

- **Surgeon portraits** — real photos from cosmedic.bimcbali.com; data + URLs in `shared.jsx` `SURGEON_PORTRAITS`. Each portrait 500×500. The site applies per-surgeon `--portrait-pos` CSS variables to standardise framing.
- **Before/After** — 29 real combined-image cases from cosmedic.bimcbali.com; data in `shared.jsx` `BA_PAIRS`. Single combined image per case (left half = before, right half = after) with overlay tag pills.
- **Lifestyle imagery** — hero, treatments, recovery villas etc. use Unsplash photo IDs (constants in `shared.jsx`). All tagged warm-neutral / luxury-spa / sand-bone-cream palette. **In production, license proper photography or AI-generate brand-controlled images.**
- **Fallback** — every `<Img>` has an `onError` that paints a brand-tinted SVG placeholder labelled with the asset name and a hue index, so a broken URL never shows a broken-image icon.

## Interactions

- **Reveal-on-scroll** — IntersectionObserver triggers fade+translateY on entry. Stagger via `delay={i * 80}` props.
- **Hover affordances** — image scale 1.03 over 1.2s ease, link underlines slide in, dropdown rows shift right.
- **Procedure rows** on discipline pages are clickable with a `READ →` mono affordance and slide-right hover.
- **Form** — enquiry form on hero + contact page; treat as a content spec, wire to whichever backend the production stack provides.

## State / data sources

- **`shared.jsx`** — `TREATMENT_LIST`, `SURGEON_LIST` (with `slug`, `name`, `common`, `title`, `suffix`, `spec`, `train`, `cred`, `years`, `lead`, `hue`), `BA_PAIRS`, `STORY_PORTRAITS`, `IMG`, `AUD_TO_IDR`.
- **`pages/procedure-data.jsx`** — full content for all 41 procedures (parent discipline, title, taglines, sections, pricing tiers, FAQs). This is your CMS seed.
- **No backend in the design** — forms `console.log` and no-op. Wire to production CRM/email service.

## Responsive behaviour

- **Desktop ≥ 1100px** — full multi-column layouts as designed.
- **Tablet 700–1099px** — grids collapse to 2 columns; hero stacks; nav remains horizontal.
- **Mobile < 700px** — all sections single-column, hero image moves above form, nav becomes hamburger (use existing pattern in `global.css` mobile media queries — currently a placeholder; production should add a proper drawer).

## Files (this bundle)

```
design/
├── README files (this + shared.jsx, global.css)
├── *.html              # 75 page shells (each loads global.css + shared.jsx + page-specific JSX)
├── pages/
│   ├── shared.jsx      # ⚠ moved here in this bundle root for clarity — see design/shared.jsx
│   ├── home.jsx, treatments.jsx, surgeons.jsx, journey.jsx, gallery.jsx,
│   │   stories.jsx, press.jsx, pricing.jsx, recovery-stays.jsx, contact.jsx
│   ├── treatment-detail.jsx + 6 thin per-discipline wrappers
│   ├── surgeon-detail.jsx + 8 thin per-surgeon wrappers
│   ├── procedure-data.jsx           # ⭐ ALL 41 procedures' content — CMS seed
│   ├── procedure-detail.jsx + 41 thin per-procedure wrappers
└── assets/
    ├── logo.png        # bronze logo, transparent bg
    └── logo-light.png  # white logo for dark footer
```

## Suggested production stack

For a content-heavy editorial marketing site of this scale:
- **Next.js (App Router)** with **MDX** for procedure content, or a headless CMS (Sanity, Payload, Contentful) — surgeon profiles, procedures and B&A cases all want CMS-managed content
- **Tailwind CSS** with custom theme matching the tokens above, or vanilla CSS modules following `global.css`
- **next/image** for the surgeon and B&A photography (download + self-host the BIMC images)
- **Framer Motion** or vanilla IntersectionObserver for the reveal-on-scroll
- **react-hook-form + Zod** for the enquiry form, posting to whichever CRM (HubSpot, Salesforce) the clinic uses
- **Vercel / Netlify** for hosting; CDN-cached static pages with ISR for procedure content updates

## Implementation order

1. **Theme + layout shell** — install fonts, set up CSS tokens, build `PageShell` (header + footer + floating chrome) with the active-state nav logic
2. **Homepage** — most components first appear here; once it's pixel-matched, every other page reuses the same primitives
3. **Procedure detail template** — single template + data table covers 41 pages
4. **Discipline detail template** — covers 6 pages
5. **Surgeon detail template** — covers 8 pages
6. **Index pages** — gallery, stories, journey, pricing, recovery-stays, press, contact
7. **CMS wiring** — port `procedure-data.jsx` to Sanity/Payload/MDX
8. **Forms** — enquiry form → CRM
9. **i18n** — Indonesian translation pass for all copy (`EN | ID` switcher already designed)
