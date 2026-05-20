# CosMedic Site CMS — Branding & Customization Spec

> Payload CMS is white-labelled as **"CosMedic Site CMS"** using the BIMC CosMedic brand identity from `docs/brand-guidelines.pdf`. Admin UI feels like an editorial extension of the public site — same palette, typography, mark.

This document captures the full spec for the admin-UI customization. Implementation lands in Phase 1.

---

## 1. Identity sources

- **Brand palette + typography**: `docs/brand-guidelines.pdf` v1.0 (19 May 2026).
- **Lockup / mark**: `docs/brand-guidelines.pdf` §I — BIMC medical cross + profile silhouette + "Managed by BIMC Hospital" endorsement.
- **Source assets on disk**: `assets/logo.png` (bronze on transparent) and `assets/logo-light.png` (white on transparent) are the existing lockup variants. Phase 1 derives CMS-public variants from these.

---

## 2. Visual identity (verbatim from brand.pdf)

### Palette (5 tokens + 1 accent)

| Token | Hex | Role |
|---|---|---|
| `--cs-paper` | `#F4EFE6` | Light-beige — admin background, light mode |
| `--cs-cream` | `#E6DCC8` | Dark-beige — section dividers, light mode |
| `--cs-ink` | `#1F1B16` | Black — body text, headings |
| `--cs-brown` | `#6B4A2B` | Dark-brown — primary buttons, eyebrow rules |
| `--cs-accent` | `#A67C52` | Bronze — links, italic accents, single highlight |

**Distribution rule** (brand.pdf §II): _beige first, ink second, one bronze gesture per surface. Treat the accent as a condiment, not a colour-block._

### Typography

| Family | Use | Notes |
|---|---|---|
| Cormorant Garamond | Display + body | Loaded from Google Fonts |
| JetBrains Mono | Labels + metadata + buttons | +18% letter-spacing for labels, uppercase |

Type scale (brand.pdf §III): 110 (display) / 64 (h1) / 36 (h2) / 21 (body) / 14 (caption italic) / 11 (label mono).

### The mark

- **Primary lockup** (on light): BIMC medical cross + profile silhouette + "Managed by BIMC Hospital" endorsement, in ink (`#1F1B16`) on light-beige (`#F4EFE6`).
- **Inverse lockup** (on dark): same composition in light-beige on ink.
- **Clearspace**: reserve 1X of breathing room, where X = height of the medical cross.
- **Minimum sizes**: 96 px wide on screen, 24 mm wide in print.

### Don'ts (brand.pdf §I)

- Don't skew the lockup
- Don't stretch
- Don't recolour
- Don't crush contrast

---

## 3. Asset inventory for admin

Files served by Payload from `/` (i.e. from `packages/cms/public/`):

| Filename | Purpose | Source |
|---|---|---|
| `/cosmedic-mark-on-light.png` | Login hero + admin header (light mode) | Derived from `assets/logo.png` |
| `/cosmedic-mark-on-dark.png` | Admin header (dark mode) | Derived from `assets/logo-light.png` |
| `/cosmedic-mark-icon.png` | 32×32 square crop for collapsed nav | Square mark-only crop |
| `/cosmedic-favicon.png` | Favicon | Same 32×32 mark |

Phase 0 Step 1c verifies + extracts these assets. If ImageMagick is unavailable on the server, list missing icon variants in this file and request user input.

---

## 4. Payload `admin` config (cosmedic deviations called out)

Implementation pattern is borrowed from the essentialbali Gaia CMS install on `gda-pn01:/var/www/essentialbali/cms/src/payload.config.ts` — same component scaffold (`Icon` + no-op `Logo` + `beforeLogin` hero), only the assets and palette change.

```ts
// packages/cms/src/payload.config.ts (admin block)
admin: {
  user: Users.slug,
  theme: 'all',                                                  // light/dark toggle enabled
  meta: {
    titleSuffix: ' — CosMedic Site CMS',
    description: 'BIMC CosMedic — content management for the clinic team.',
    icons: [
      { rel: 'icon', type: 'image/png', url: '/cosmedic-favicon.png' },
    ],
    openGraph: {
      siteName: 'CosMedic Site CMS',
      description: 'BIMC CosMedic — content management for the clinic team.',
      images: [{ url: '/cosmedic-mark-on-light.png' }],
    },
  },
  components: {
    graphics: {
      Icon: '@/components/CosmedicIcon',
      Logo: '@/components/CosmedicLogo',                         // no-op — suppresses Payload's default wordmark
    },
    beforeLogin: ['@/components/CosmedicBeforeLogin'],
  },
  css: 'src/styles/admin-theme.css',                             // brand palette + typography
},
```

**Deviations from essentialbali Gaia install**:
1. `admin.theme: 'all'` (essentialbali uses `'dark'`) — enables light/dark toggle per user requirement. Light is default.
2. No `LoginHint` / `ElliotNavLink` / custom dashboard components — those are essentialbali features, not part of the white-label pattern.

---

## 5. Custom React components

### `CosmedicBeforeLogin.tsx` — login hero

Sole brand element on the login screen. Stacked vertically: wordmark → lockup → tagline.

```tsx
// packages/cms/src/components/CosmedicBeforeLogin.tsx
import React from 'react'

const CosmedicBeforeLogin: React.FC = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2rem',
    gap: '1.1rem',
  }}>
    <h1 style={{
      margin: 0,
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 500,
      fontSize: '2.4rem',
      letterSpacing: '0.02em',
      color: 'var(--theme-text)',
    }}>
      CosMedic Site CMS
    </h1>
    <img
      src="/cosmedic-mark-on-light.png"
      alt="BIMC CosMedic"
      style={{ width: '180px', height: 'auto', display: 'block' }}
    />
    <p style={{
      margin: 0,
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: '0.72rem',
      fontWeight: 500,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: 'var(--theme-elevation-500)',
    }}>
      Managed by BIMC Hospital · Nusa Dua · Bali
    </p>
  </div>
)

export default CosmedicBeforeLogin
```

### `CosmedicLogo.tsx` — no-op

Intentionally renders nothing. Suppresses Payload's default "Payload" wordmark so `CosmedicBeforeLogin` remains the sole brand element.

```tsx
// packages/cms/src/components/CosmedicLogo.tsx
import React from 'react'
const CosmedicLogo: React.FC = () => null
export default CosmedicLogo
```

### `CosmedicIcon.tsx` — collapsed-nav mark

```tsx
// packages/cms/src/components/CosmedicIcon.tsx
import React from 'react'

const CosmedicIcon: React.FC = () => (
  <img
    src="/cosmedic-mark-icon.png"
    alt="BIMC CosMedic"
    style={{ width: '32px', height: '32px', objectFit: 'contain', display: 'block' }}
  />
)

export default CosmedicIcon
```

---

## 6. Admin theme CSS

`packages/cms/src/styles/admin-theme.css` overrides Payload's default theme variables with the brand palette and typography.

```css
:root {
  /* Brand palette (brand.pdf §II) */
  --cs-paper:  #F4EFE6;
  --cs-cream:  #E6DCC8;
  --cs-ink:    #1F1B16;
  --cs-brown:  #6B4A2B;
  --cs-accent: #A67C52;

  /* Map onto Payload admin variables (light mode = default) */
  --theme-bg:            var(--cs-paper);
  --theme-text:          var(--cs-ink);
  --theme-elevation-50:  #ECE4D2;
  --theme-elevation-100: var(--cs-cream);
  --theme-elevation-500: var(--cs-brown);
  --theme-elevation-1000:var(--cs-ink);
  --theme-success-500:   var(--cs-brown);
  --theme-error-500:     #B95C5C;
  --color-accent:        var(--cs-accent);
}

[data-theme="dark"] {
  --theme-bg:            var(--cs-ink);
  --theme-text:          var(--cs-paper);
  --theme-elevation-50:  #2A241E;
  --theme-elevation-100: #3B332B;
  --theme-elevation-500: var(--cs-cream);
  --theme-elevation-1000:var(--cs-paper);
  --color-accent:        var(--cs-accent);
}

/* Brand typography in admin */
body, .payload__app {
  font-family: 'Cormorant Garamond', 'Times New Roman', Georgia, serif;
}

.payload__app input,
.payload__app button,
code,
.label,
.eyebrow {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: 0.05em;
}
```

Google Fonts loaded via custom head injection in admin (Cormorant Garamond 400/500/600 + italic; JetBrains Mono 400/500).

---

## 7. Light/dark toggle

- `admin.theme: 'all'` enables Payload's built-in toggle (user menu).
- System preference is followed by default; user choice persists in localStorage.
- Both themes use the same brand palette mapped to elevation variables (above).
- Brand rule still applies in both modes: "one bronze gesture per surface" — never accent on cards/blocks.

---

## 8. Where the branding applies

| Surface | What's branded |
|---|---|
| Browser title | `{Page} — CosMedic Site CMS` (`titleSuffix`) |
| Favicon | `/cosmedic-favicon.png` |
| OpenGraph (admin link sharing) | siteName + description + image from `meta.openGraph` |
| Login screen | `CosmedicBeforeLogin` is sole brand element |
| Admin nav (expanded) | `CosmedicLogo` is no-op; wordmark suppressed |
| Admin nav (collapsed) | `CosmedicIcon` shows mark |
| Email-from name | `CosMedic Site CMS <no-reply@cosmedic.gaiada.online>` (nodemailer config) |
| Password-reset email subject + body | Templated via `EmailTemplates` global, branded copy |

---

## 9. Bootstrap super-admin user

Credentials sourced from `.env` (gitignored), seeded on first boot only:

```bash
# .env (NEVER committed)
PAYLOAD_SEED_ADMIN_EMAIL=super_admin@email.com
PAYLOAD_SEED_ADMIN_PASSWORD=Teameditor@123
```

`packages/cms/src/seed/admin.ts` reads these on first boot, creates the Users record if it doesn't already exist (idempotent — no-op on subsequent runs).

**Post-launch hardening (Phase 12)**:
- Rotate the bootstrap password to a strong random value.
- Create per-editor accounts with appropriate roles (admin / editor / content-only).
- Optionally disable the bootstrap user entirely (mark `disabled: true`) after editor accounts exist.

`Teameditor@123` is convenience-only — never a long-lived production credential.

---

## 10. White-label pattern (re-usability for future Gaia clients)

The component scaffold + admin-theme.css pattern documented here is **reusable across other Gaia client sites**. For a new client:

1. Replace the wordmark string in `CosmedicBeforeLogin` (e.g. "CosMedic Site CMS" → "FooBar Site CMS").
2. Swap mark assets in `packages/cms/public/`.
3. Replace the palette in `admin-theme.css` (5 tokens + 1 accent) with the new brand's tokens.
4. Replace the typography families if needed.
5. Update `titleSuffix`, `openGraph.siteName`, and email-from name strings.

Everything else (theme: 'all', component scaffold, no-op Logo trick, CSS variable mapping) stays identical. The pattern is essentialbali (yellow + tree-of-life) → cosmedic (beige + BIMC lockup) → future clients (their brand).

---

## 11. Verification

Phase 1 acceptance criteria for CMS branding:

- [ ] `/admin` browser title reads `… — CosMedic Site CMS`.
- [ ] Login screen renders: `CosMedic Site CMS` wordmark (Cormorant), BIMC lockup, "Managed by BIMC Hospital" tagline (mono uppercase).
- [ ] No Payload default "Payload" wordmark anywhere in the UI.
- [ ] Collapsed nav shows BIMC mark icon.
- [ ] Both light and dark modes are legible.
- [ ] One bronze accent gesture per screen — no accent on bulk surfaces.
- [ ] Favicon shows in browser tab.
- [ ] Email-from name reads "CosMedic Site CMS" in test emails.
