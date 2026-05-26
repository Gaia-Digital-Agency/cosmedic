# All image refs + asset paths (2026-05-25)

Every image source reference (with or without `media={}` prop) across all 77 files. Includes `IMG.X`, `TREATMENT_IMG`, `SURGEON_IMG`, literal `/assets/...` paths.

### `components/PageBlocks.tsx` (5 matches)

```
138:              <Img src={mediaUrl(it.image) || ''} alt={it.caption || ''} fallbackLabel={it.caption || 'IMAGE'} />
276:                <Img src={surgeonPortraitUrl(s)} alt={s.name} fallbackLabel={`DR. ${(s.commonName || s.name).toUpperCase()}`} fallbackHue={s.hue} />
305:              <Img src={baCompositeUrl(c, '') || ''} alt={c.beforeAlt || c.caseLabel} fallbackLabel={c.caseLabel} />
353:              <Img src={recoveryHeroUrl(v, '') || ''} alt={v.name} fallbackLabel={v.name.toUpperCase()} />
426:      <iframe src={block.iframeUrl} style={{ width: '100%', minHeight: 480, border: 'none' }} title={block.heading || 'Embed'} />
```

### `components/detail/ProcedureFactsPanel.tsx` (2 matches)

```
82:                        <img src={portraitUrl} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
116:                      <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
```

### `components/detail/SurgeonMini.tsx` (3 matches)

```
6:import { SURGEON_IMG } from '@/content/seed'
13:      <Img
14:        src={SURGEON_IMG(surgeon.slug)}
```

### `components/primitives/ChapterOpener.tsx` (1 matches)

```
29:          <Img src={image} fallbackLabel={imageLabel} fallbackHue={imageHue} alt="" />
```

### `components/primitives/Img.tsx` (8 matches)

```
38: *  Legacy: <Img src="..." /> — single <img>, painted-SVG fallback on error.
40: *  Responsive: <Img media={cmsMedia} src={fallbackUrl} /> — emits a
42: *    (WebP variants at sm/md/lg/xl/xxl widths) and an <img> fallback
45:export const Img: React.FC<ImgProps> = (props) => {
75:        <img
76:          src={current}
88:    <img
89:      src={current}
```

### `components/shell/Footer.tsx` (2 matches)

```
66:  const footerLogoSrc = mediaUrl(fg?.logoLight, '/assets/logo-light.svg') || '/assets/logo-light.svg'
77:            <img src={footerLogoSrc} alt="BIMC CosMedic" />
```

### `components/shell/Header.tsx` (5 matches)

```
21:  // both <img>s and let the stylesheet show/hide based on header state.
22:  const logoLightSrc = mediaUrl(cms?.header?.logoLight, '/assets/logo.svg') || '/assets/logo.svg'
23:  const logoDarkSrc = mediaUrl(cms?.header?.logoDark, '/assets/logo-light.svg') || '/assets/logo-light.svg'
93:          <img src={logoLightSrc} alt={logoAlt} className="logo-img logo-img-light" />
94:          <img src={logoDarkSrc} alt={logoAlt} className="logo-img logo-img-dark" />
```

### `content/blog-data.ts` (14 matches)

```
33:    img: IMG.surgical,
46:    img: IMG.concierge,
58:    img: IMG.villa2,
70:    img: IMG.injectables,
82:    img: IMG.clinic,
94:    img: IMG.surgical,
106:    img: IMG.dental,
149:    img: IMG.surgical,
235:    img: IMG.concierge,
250:    img: IMG.villa2,
265:    img: IMG.injectables,
280:    img: IMG.clinic,
295:    img: IMG.surgical,
310:    img: IMG.dental,
```

### `lib/cms-adapters.ts` (2 matches)

```
367:  // Asset-path fallback for the 8 seeded portraits in packages/web/public/assets/surgeons/.
368:  return `/assets/surgeons/${s.slug}.${['suka','astri','sissy','rosa','wara'].includes(s.slug) ? 'png' : 'webp'}`
```

### `lib/cms.media.ts` (2 matches)

```
5: * root-relative; nginx routes `/api/media/...` to :4007). The
13: * the browser hits `/api/media/...` which nginx routes to :4007. The
```

### `lib/cms.types.ts` (1 matches)

```
44:   * (sm, md, lg, xl, xxl). Used by <Img> to emit <picture> srcset.
```

### `lib/placeholder.ts` (1 matches)

```
4: * the `<Img>` primitive swaps its src for this generated SVG.
```

### `lib/seo.ts` (1 matches)

```
212:      `<script defer data-domain="${esc(domain)}" src="https://plausible.io/js/script.js"></script>`,
```

### `routes/blog/BlogIndex.tsx` (4 matches)

```
18:        <Img src={p.img} fallbackLabel={p.category.toUpperCase()} fallbackHue={p.hue} alt="" />
51:  const heroImage = mediaUrl(page?.heroImage, '') || IMG.texture
87:              <Img
88:                src={featured.img}
```

### `routes/blog/BlogPost.tsx` (7 matches)

```
8:import { SURGEON_LIST, SURGEON_IMG } from '@/content/seed'
84:                <Img
85:                  src={SURGEON_IMG(author.slug)}
180:              <Img
181:                src={SURGEON_IMG(author.slug)}
230:                    <Img
231:                      src={r.img}
```

### `routes/contact/ContactPage.tsx` (4 matches)

```
123:  const heroImage = mediaUrl(hero.heroImage ?? null, IMG.reception) || IMG.reception
124:  const mapImage = mediaUrl(visit.mapImage ?? null, IMG.bali) || IMG.bali
436:                <Img
437:                  src={mapImage}
```

### `routes/detail/DisciplineDetail.tsx` (6 matches)

```
10:import { TREATMENT_LIST, SURGEON_LIST, TREATMENT_IMG } from '@/content/seed'
60:  const heroImg = TREATMENT_IMG(slug)
179:                        <Img
180:                          src={heroImg}
345:                    <Img
346:                      src={TREATMENT_IMG(rel.slug)}
```

### `routes/detail/SubCategoryDetail.tsx` (2 matches)

```
10:import { TREATMENT_LIST, SURGEON_LIST, TREATMENT_IMG, IMG } from '@/content/seed'
51:  const heroImg = parent ? TREATMENT_IMG(parent.slug) : IMG.hero
```

### `routes/detail/SurgeonDetail.tsx` (5 matches)

```
7:import { SURGEON_LIST, TREATMENT_LIST, SURGEON_IMG } from '@/content/seed'
131:          <Img
133:            src={SURGEON_IMG(slug)}
348:                      <Img
350:                        src={SURGEON_IMG(other.slug)}
```

### `routes/gallery/GalleryPage.tsx` (3 matches)

```
49:    image: mediaUrl(galleryPage?.heroImage) || IMG.texture,
96:                    <Img
97:                      src={c.image}
```

### `routes/home/Gallery.tsx` (2 matches)

```
43:                  <Img
44:                    src={c.image}
```

### `routes/home/Hero.tsx` (1 matches)

```
89:          <Img src={heroImage} fallbackLabel="BIMC · NUSA DUA" fallbackHue={3} alt="" />
```

### `routes/home/Place.tsx` (1 matches)

```
37:            <Img media={g?.image} src={IMG.bali} fallbackLabel="BALI · NUSA DUA" fallbackHue={4} alt="" />
```

### `routes/home/Stories.tsx` (2 matches)

```
84:              <Img
85:                src={STORY_PORTRAITS[s.idx]}
```

### `routes/home/Surgeons.tsx` (6 matches)

```
6:import { SURGEON_LIST, SURGEON_IMG } from '@/content/seed'
10:const TEAM_PLACEHOLDER = '/assets/surgeons/team-placeholder.webp'
53:            <Img
55:              src={SURGEON_IMG(lead.slug)}
111:          <Img
112:            src={groupPhotoSrc}
```

### `routes/home/Treatments.tsx` (3 matches)

```
5:import { TREATMENT_LIST, TREATMENT_IMG } from '@/content/seed'
41:                <Img
43:                  src={TREATMENT_IMG(t.slug)}
```

### `routes/journey/JourneyPage.tsx` (10 matches)

```
28:    img: IMG.reception,
43:    img: IMG.clinic,
58:    img: IMG.texture,
73:    img: IMG.bali,
88:    img: '/assets/treatments/surgical.webp',
103:    img: IMG.recovery,
118:    img: IMG.concierge,
160:            img: imageUrl || fallback?.img || IMG.reception,
177:  const heroImg = heroImage || IMG.bali
220:                <Img src={s.img} fallbackLabel={s.t.toUpperCase()} fallbackHue={s.hue} alt="" />
```

### `routes/press/PressPage.tsx` (1 matches)

```
32:  const heroImage = mediaUrl(page?.heroImage, '') || IMG.clinic
```

### `routes/pricing/PricingPage.tsx` (1 matches)

```
71:    IMG.texture
```

### `routes/privacy/PrivacyPage.tsx` (1 matches)

```
24:  const heroImage = mediaUrl(page?.heroImage, '') || IMG.texture
```

### `routes/recovery-stays/RecoveryStaysPage.tsx` (9 matches)

```
29:    name: 'Villa Sembilan', loc: 'Nusa Dua', br: '2 BR', pool: 'Private', fromIdr: 2_940_000, img: IMG.villa1, hue: 0,
34:    name: 'Villa Damai', loc: 'Ubud', br: '3 BR', pool: 'Private', fromIdr: 4_410_000, img: IMG.villa2, hue: 1,
39:    name: 'Villa Kelapa', loc: 'Jimbaran', br: '2 BR', pool: 'Private', fromIdr: 3_360_000, img: IMG.villa3, hue: 2,
44:    name: 'Villa Tirta', loc: 'Nusa Dua', br: '4 BR', pool: 'Private', fromIdr: 6_090_000, img: IMG.villa4, hue: 3,
49:    name: 'The Apurva Suite', loc: 'Nusa Dua', br: '1 BR', pool: 'Resort', fromIdr: 5_460_000, img: IMG.villa5, hue: 4,
54:    name: 'Villa Sereno', loc: 'Sanur', br: '3 BR', pool: 'Private', fromIdr: 3_990_000, img: IMG.villa6, hue: 5,
94:  const heroImg = heroImage || IMG.villa1
127:            img: imageUrl || fallback?.img || IMG.villa1,
191:                  <Img src={v.img} fallbackLabel={v.name.toUpperCase()} fallbackHue={v.hue} alt="" />
```

### `routes/results/ResultsPage.tsx` (5 matches)

```
86:    image: mediaUrl(heroCms?.heroImage) || IMG.texture,
179:                  <Img
180:                    src={c.image}
293:                <Img
294:                  src={s.portrait || STORY_PORTRAITS[i % STORY_PORTRAITS.length]}
```

### `routes/stories/StoriesPage.tsx` (3 matches)

```
57:    image: mediaUrl(storiesPage?.heroImage) || IMG.texture,
105:                <Img
106:                  src={s.portrait || STORY_PORTRAITS[i % STORY_PORTRAITS.length]}
```

### `routes/surgeons/SurgeonsIndex.tsx` (6 matches)

```
8:import { SURGEON_LIST, SURGEON_IMG, IMG, type Surgeon } from '@/content/seed'
56:          <Img
58:            src={SURGEON_IMG(s.slug)}
107:    image: mediaUrl(heroCms?.heroImage) || IMG.clinic,
154:            <Img
156:              src={SURGEON_IMG(lead.slug)}
```

### `routes/treatments/TreatmentsIndex.tsx` (3 matches)

```
8:import { TREATMENT_LIST, TREATMENT_IMG, IMG } from '@/content/seed'
55:    image: mediaUrl(heroCms?.heroImage) || IMG.surgical,
100:                  <Img src={TREATMENT_IMG(t.slug)} fallbackLabel={t.t.toUpperCase()} fallbackHue={t.hue} alt="" />
```

### `routes/video-consult/VideoConsultPage.tsx` (1 matches)

```
82:        image={IMG.reception}
```

### `routes/video-consult/WhatToExpect.tsx` (3 matches)

```
5:import { SURGEON_LIST, SURGEON_IMG } from '@/content/seed'
81:              <Img
82:                src={SURGEON_IMG(s.slug)}
```


## CMS-side image references (collections + globals)

### `globals/Footer.ts` (1 upload fields)

```
16:    { name: 'logoLight', type: 'upload', relationTo: 'media',
```

### `globals/Header.ts` (2 upload fields)

```
17:    { name: 'logoLight', type: 'upload', relationTo: 'media',
19:    { name: 'logoDark', type: 'upload', relationTo: 'media',
```

### `globals/Settings.ts` (1 upload fields)

```
21:    { name: 'defaultOgImage', type: 'upload', relationTo: 'media',
```

### `globals/EndorsementMark.ts` (2 upload fields)

```
19:    { name: 'primaryLockup', type: 'upload', relationTo: 'media',
21:    { name: 'inverseLockup', type: 'upload', relationTo: 'media',
```

### `globals/treatments/TreatmentsHero.ts` (1 upload fields)

```
28:    { name: 'heroImage', type: 'upload', relationTo: 'media',
```

### `globals/pricing/PricingHero.ts` (1 upload fields)

```
28:    { name: 'heroImage', type: 'upload', relationTo: 'media',
```

### `globals/doctors/SurgeonsHero.ts` (1 upload fields)

```
26:    { name: 'heroImage', type: 'upload', relationTo: 'media',
```

### `collections/Authors.ts` (1 upload fields)

```
27:    { name: 'portrait', type: 'upload', relationTo: 'media' },
```

### `collections/Surgeons.ts` (1 upload fields)

```
60:    { name: 'portrait', type: 'upload', relationTo: 'media',
```

### `collections/BeforeAfterCases.ts` (1 upload fields)

```
28:    { name: 'composite', type: 'upload', relationTo: 'media',
```

### `collections/Stories.ts` (1 upload fields)

```
36:    { name: 'portrait', type: 'upload', relationTo: 'media' },
```

### `collections/RecoveryStays.ts` (2 upload fields)

```
40:    { name: 'heroImage', type: 'upload', relationTo: 'media', admin: { description: 'Large card image. Falls back to a tinted painted-SVG card if blank.' } },
66:    { name: 'gallery', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }] },
```

### `collections/Awards.ts` (1 upload fields)

```
29:    { name: 'logo', type: 'upload', relationTo: 'media' },
```

### `collections/PressMentions.ts` (1 upload fields)

```
27:    { name: 'logo', type: 'upload', relationTo: 'media' },
```

### `collections/Procedures.ts` (1 upload fields)

```
143:    { name: 'heroImage', type: 'upload', relationTo: 'media',
```

### `collections/JourneySteps.ts` (4 upload fields)

```
62:      type: 'upload',
63:      relationTo: 'media',
82:      type: 'upload',
83:      relationTo: 'media',
```

### `collections/Disciplines.ts` (1 upload fields)

```
54:    { name: 'heroImage', type: 'upload', relationTo: 'media',
```

### `collections/SubCategories.ts` (1 upload fields)

```
74:    { name: 'heroImage', type: 'upload', relationTo: 'media',
```

### `collections/BlogPosts.ts` (1 upload fields)

```
29:    { name: 'heroImage', type: 'upload', relationTo: 'media' },
```

### `globals/home/HomeHero.ts` (1 upload fields)

```
28:    { name: 'heroImage', type: 'upload', relationTo: 'media',
```

### `globals/home/HomeSurgeonsView.ts` (1 upload fields)

```
44:    { name: 'groupPhoto', type: 'upload', relationTo: 'media',
```

### `globals/home/HomePlace.ts` (1 upload fields)

```
18:    { name: 'image', type: 'upload', relationTo: 'media',
```

### `globals/pages/JourneyHero.ts` (2 upload fields)

```
35:      type: 'upload',
36:      relationTo: 'media',
```

### `globals/pages/ContactHero.ts` (1 upload fields)

```
26:    { name: 'heroImage', type: 'upload', relationTo: 'media',
```

### `globals/pages/RecoveryStaysPage.ts` (1 upload fields)

```
34:        { name: 'heroImage', type: 'upload', relationTo: 'media' },
```

### `globals/pages/ContactVisitSection.ts` (1 upload fields)

```
26:    { name: 'mapImage', type: 'upload', relationTo: 'media',
```

### `globals/pages/HomePage.ts` (1 upload fields)

```
73:    { name: 'groupPhoto', type: 'upload', relationTo: 'media', admin: { description: 'Single team group photo replacing the legacy 6-card associates grid. Falls back to /assets/surgeons/team-placeholder.webp when unset.' } },
```

### `globals/pages/_pageFields.ts` (2 upload fields)

```
47:          { name: 'image', type: 'upload', relationTo: 'media', required: true },
240:        { name: 'heroImage', type: 'upload', relationTo: 'media' },
```

### `globals/results/ResultsHero.ts` (1 upload fields)

```
28:    { name: 'heroImage', type: 'upload', relationTo: 'media',
```

