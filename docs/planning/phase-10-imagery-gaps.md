# Phase 10 — Imagery gaps + AI-gen prompt brief

> Generated 2026-05-20 during Phase 10.A audit. **31 slots** need AI generation before Phase 10 can ship; **18 self-hosted files** are already in place and just need migration to Payload Media.

## Brand constraints (apply to every prompt)

Source: `docs/brand-guidelines.pdf` §II — distribution rule "beige first, ink second, one bronze gesture per surface." Imagery must read as **editorial luxury**, not stock-photo medical. Composition rules:

- **Palette**: warm beiges (`#F4EFE6` / `#E6DCC8`), deep ink (`#1F1B16`), bronze accent (`#A67C52`). Photos should be colour-graded to harmonise — avoid saturated reds, clinical whites, neon.
- **Lighting**: natural golden-hour or soft window light. No harsh studio fluorescence.
- **Composition**: generous negative space, asymmetric framing, single subject focus. Editorial fashion-magazine register, not before/after marketing.
- **Mood**: discretion, restoration, calm confidence. Audience is AU/US/EU medical tourists.
- **People**: when shown, faces partially obscured / from behind / shallow DoF. Diverse ethnicity, age 30–55, no overt celebrity faces.
- **No-go**: surgical instruments visible, hospital corridors, before/after splits, clinical signage, watermarks, AI-generated text.

Add this suffix to every prompt: *"editorial luxury, warm beige palette with bronze accents, natural light, shot on Hasselblad H6D, --ar W:H --style raw --v 6.1"* (adjust `--v` per generator).

## Output format

Save each generated image to the path listed in the **Target** column, **before** running `pnpm --filter @cosmedic/cms seed:media` (which I'm about to write). The seed script will recursively pick up everything in `packages/web/public/assets/` and upload to Payload Media with the filename as the lookup key.

Preferred file format: **.webp** at quality 85 (Payload re-encodes to AVIF/WebP responsive variants anyway, but smaller source = faster upload). Fall back to .jpg / .png if your generator can't export webp.

## Already self-hosted (no AI needed — just migration)

| Path | Size | Used by |
|---|---|---|
| `packages/web/public/assets/treatments/surgical.webp` | 647K | Treatments grid (homepage + /treatments) |
| `packages/web/public/assets/treatments/non-surgical.webp` | 524K | Treatments grid |
| `packages/web/public/assets/treatments/hair.webp` | 535K | Treatments grid |
| `packages/web/public/assets/treatments/dental.webp` | 497K | Treatments grid |
| `packages/web/public/assets/treatments/recovery.webp` | 565K | Treatments grid |
| `packages/web/public/assets/treatments/concierge.webp` | 534K | Treatments grid |
| `packages/web/public/assets/surgeons/{suka,astri,wara,sissy,rosa}.png` | 230–315K each | Surgeon portraits |
| `packages/web/public/assets/surgeons/{indra,risma,theresia}.webp` | 17–20K each | Surgeon portraits |
| `packages/web/public/assets/results/facelift-male.webp` | 883K | Gallery |
| `packages/web/public/assets/results/lip-lift-female.webp` | 834K | Gallery |
| `packages/web/public/assets/results/lip-lift-male.webp` | 999K | Gallery |
| `packages/web/public/assets/results/necklift-female.webp` | 1.1M | Gallery |

**18 files, ~7.6 MB total.** These migrate as-is.

## NEEDS AI GEN — 23 slots

Replaces every `IMG.*` Unsplash placeholder + 8 patient portraits + missing villa renders.

### Hero + clinic environment (6 images)

| # | Target | Aspect | Prompt |
|---|---|---|---|
| 1 | `packages/web/public/assets/lifestyle/hero.webp` | 7:9 (1400×1800) | "Editorial luxury portrait of a woman in white linen looking through a sheer curtain in a sun-drenched Balinese clinic, soft window light, warm beige tones, peaceful private moment, single subject framed left of centre, shallow depth of field" |
| 2 | `packages/web/public/assets/lifestyle/reception.webp` | 3:2 (1200×800) | "Editorial photograph of a contemporary clinic reception desk, blonde travertine counter, single fresh orchid in bronze vessel, no signage, no people, warm afternoon light, shot from low angle, magazine register" |
| 3 | `packages/web/public/assets/lifestyle/clinic.webp` | 14:9 (1400×900) | "Editorial wide shot of a private consultation room, single Eames lounge chair facing a floor-to-ceiling window onto tropical garden, no medical equipment visible, warm beige walls, single brass floor lamp, golden-hour lighting" |
| 4 | `packages/web/public/assets/lifestyle/clinic-alt.webp` | 14:9 (1400×900) | "Editorial detail shot of a corridor inside a luxury Bali medical clinic, warm white walls, single bench with linen cushion, paired hibiscus branches in vase, no patients, no staff, late-afternoon side light" |
| 5 | `packages/web/public/assets/lifestyle/texture.webp` | 3:2 (1200×800) | "Editorial macro of natural Balinese travertine stone surface with shallow water pooled at one edge, single fallen frangipani petal, warm beige tones, soft diffused light from above, abstract luxury hospitality" |
| 6 | `packages/web/public/assets/lifestyle/texture-alt.webp` | 3:2 (1200×800) | "Editorial detail of cream linen drapery in motion against an open louvred window, warm afternoon light filtering through, no human subject, painterly abstraction, magazine register" |

### Location / Bali (3 images)

| # | Target | Aspect | Prompt |
|---|---|---|---|
| 7 | `packages/web/public/assets/lifestyle/bali.webp` | 4:5 (1200×1500) | "Editorial photograph of a single Balinese temple offering on a stone pedestal at the edge of a rice terrace, late afternoon golden light, woman in white walking far in background, no faces visible, warm beige tonal grade, framed for vertical magazine page" |
| 8 | `packages/web/public/assets/lifestyle/bali-alt.webp` | 4:5 (1200×1500) | "Editorial portrait of a swimming pool edge meeting tropical garden at a luxury Nusa Dua resort, single floating frangipani, no people, mirror-still water reflecting palm canopy, warm beige + bronze grade, vertical composition" |
| 9 | `packages/web/public/assets/lifestyle/bali2.webp` | 4:5 (1200×1500) | "Editorial photograph of a Balinese stone gateway flanked by white frangipani trees, warm late-day side light, single open path through, no people, magazine luxury travel register, vertical composition" |
| 10 | `packages/web/public/assets/lifestyle/light.webp` | 3:2 (1200×800) | "Editorial abstract photograph of golden Balinese afternoon light streaming through louvred wooden shutters onto a white linen-draped chaise longue, no human subject, warm beige + bronze tonal grade" |

### Recovery villas (6 images)

Each villa renders one editorial photograph. Vary composition/framing — don't repeat the same angle six times.

| # | Target | Aspect | Prompt |
|---|---|---|---|
| 11 | `packages/web/public/assets/lifestyle/villa1.webp` | 4:3 (1200×900) | "Editorial photograph of a private Nusa Dua villa courtyard at sunset, infinity pool reflecting orange sky, single woman in white silk robe with back to camera walking to plunge pool, frangipani trees framing left edge, warm beige + bronze tones" |
| 12 | `packages/web/public/assets/lifestyle/villa2.webp` | 4:3 (1200×900) | "Editorial interior of a contemporary Ubud villa bedroom open to rice paddy view, four-poster bed in raw linen, single brass lantern, no people, soft morning light, warm beige tonal grade" |
| 13 | `packages/web/public/assets/lifestyle/villa3.webp` | 4:3 (1200×900) | "Editorial photograph of a Jimbaran beachfront villa terrace at golden hour, single white-cushioned chaise longue facing ocean, low tide reflecting sky, no people, warm beige + bronze tones" |
| 14 | `packages/web/public/assets/lifestyle/villa4.webp` | 4:3 (1200×900) | "Editorial wide shot of a spacious Seminyak family villa courtyard with garden pool, brass outdoor dining table set for breakfast for one, no people, warm morning light, magazine register" |
| 15 | `packages/web/public/assets/lifestyle/villa5.webp` | 4:3 (1200×900) | "Editorial interior of an Apurva Kempinski-style suite bedroom in Nusa Dua, contemporary luxury, single bronze sculpture on stone plinth, floor-to-ceiling window onto cliffside ocean view, no people, soft afternoon light" |
| 16 | `packages/web/public/assets/lifestyle/villa6.webp` | 4:3 (1200×900) | "Editorial photograph of a traditional Balinese Sanur villa courtyard, hand-carved stone pavilion, koi pond, single offering on stone altar, warm beige tonal grade, magazine luxury travel register, no people" |

### Patient testimonial portraits (8 images)

All faces must be partially obscured (looking down / away / back-of-head / silhouette / hands only) to preserve patient anonymity. Diverse ethnicity, age 30–55.

| # | Target | Aspect | Prompt |
|---|---|---|---|
| 17 | `packages/web/public/assets/lifestyle/story1.webp` | 1:1 (400×400) | "Editorial square portrait of an Australian woman, late 40s, looking down at a single hibiscus flower held in her palm, profile lit by warm afternoon window light, white linen blouse, warm beige tonal grade, magazine register" |
| 18 | `packages/web/public/assets/lifestyle/story2.webp` | 1:1 (400×400) | "Editorial square portrait of an East-Asian woman, 30s, back to camera, looking out a louvred window over a Bali garden, hair in low chignon, cream silk shirt, warm beige tonal grade" |
| 19 | `packages/web/public/assets/lifestyle/story3.webp` | 1:1 (400×400) | "Editorial square portrait of an American man, 50s, salt-and-pepper hair, hands clasped on a stone counter, face partially hidden behind raised teacup, warm afternoon light, magazine register" |
| 20 | `packages/web/public/assets/lifestyle/story4.webp` | 1:1 (400×400) | "Editorial square portrait of a European woman, mid-40s, three-quarter back view, walking along a Balinese stone path in cream linen dress, hat brim shading face, warm beige tonal grade" |
| 21 | `packages/web/public/assets/lifestyle/story5.webp` | 1:1 (400×400) | "Editorial square portrait of a Southeast-Asian woman, late 30s, silhouetted against a window onto rice paddy, single hand raised to glass, warm beige tonal grade, no facial detail visible" |
| 22 | `packages/web/public/assets/lifestyle/story6.webp` | 1:1 (400×400) | "Editorial square portrait of a Middle-Eastern woman, 40s, head tilted down reading a single page, soft window light from above, cream cashmere shawl, face mostly shadowed, magazine register" |
| 23 | `packages/web/public/assets/lifestyle/story7.webp` | 1:1 (400×400) | "Editorial square portrait of an Australian man, late 30s, sitting on a stone bench in a Balinese garden, back to camera, looking out at a frangipani tree, warm afternoon light, beige linen shirt" |
| 24 | `packages/web/public/assets/lifestyle/story8.webp` | 1:1 (400×400) | "Editorial square portrait of a Latin-American woman, 50s, profile silhouette against late-day golden window light, single bronze earring catching light, hair in soft updo, warm beige tonal grade" |

### Before-and-after composites (25 missing of 29 planned)

**This is the largest gap.** Plan §10.2 calls for 29 B&A composites; only 4 exist locally and only 3 are seeded in the CMS. The remaining ~25 are deferred to the next imagery batch because they're case-specific medical content that needs clinical sign-off — they can't simply be AI-generated as lifestyle imagery. **Action:** flag with the clinic; either license the BIMC CosMedic original B&A image set (the source the seed file was modelled after) or shoot a fresh release-signed set. For Phase 10 launch, the existing 4 + 3 seeded records cover the homepage gallery teaser; the full `/gallery` page will display "More results coming soon" placeholder cards until the additional cases are sourced.

## Drop-zone protocol

When you've generated images:

1. Save each one to the **Target** path exactly as listed above.
2. Tell me "imagery ready" — I'll re-run `pnpm --filter @cosmedic/cms seed:media` (idempotent) to upload everything to Payload Media.
3. The seed script repoints `seed.ts` `IMG.*` constants to Media collection IDs via a generated `image-map.ts`; no further code changes needed.

## Why this list and not the plan's original list

The plan written in Phase 0 assumed surgeon portraits + B&A composites would be downloaded from `cosmedic.bimcbali.com`. That hot-link was already replaced with self-hosted local files at some point between Phase 4 and Phase 6. So the actual gap is Unsplash placeholders + missing villas + patient portraits — not the bimcbali hot-links the plan called out.
