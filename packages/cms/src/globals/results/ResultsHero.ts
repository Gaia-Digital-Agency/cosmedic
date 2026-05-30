import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

export const ResultsHero: GlobalConfig = {
  slug: 'results-hero',
  label: 'Results',
  admin: {
    group: 'Results',
    description: 'All content for /results — Hero, Featured Cases, Library CTA, Stories, Share Story. Mirrors the web page top to bottom.',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [
    // ── Breadcrumb ────────────────────────────────────────────────────────────
    { name: 'breadcrumbLabel', label: 'Breadcrumb — Page Label', type: 'text', defaultValue: 'Results & Stories',
      admin: { description: 'Second item in the breadcrumb trail (Home → this label).' } },

    // ── Hero Image ────────────────────────────────────────────────────────────
    { name: 'titleA', label: 'Title — Line A', type: 'text', localized: true, defaultValue: 'Quietly',
      admin: { description: 'First line (roman).' } },
    { name: 'titleB', label: 'Title — Line B', type: 'text', localized: true, defaultValue: 'transformative.',
      admin: { description: 'Second line (italic).' } },
    { name: 'lede', label: 'Intro paragraph', type: 'textarea', localized: true,
      defaultValue: 'A small selection of consented results paired with the stories behind them. Our complete library — over two hundred cases — is shared during private consultation.',
      admin: { description: 'Intro paragraph beneath the title.' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero image. ~1600×1200, JPEG/WebP.' } },
    { name: 'imageLabel', type: 'text', localized: true, defaultValue: 'RESULTS & STORIES',
      admin: { description: 'Caption shown over the painted-SVG fallback.' } },
    { name: 'imageHue', type: 'number', min: 0, max: 6, defaultValue: 1,
      admin: { description: 'Painted-SVG fallback hue (0–6).', hidden: true } },
    { name: 'chapter', type: 'text', localized: true, defaultValue: 'Chapter IV — Results & Stories',
      admin: { description: 'Small-caps eyebrow above the hero title.', hidden: true } },

    // ── Featured Cases ────────────────────────────────────────────────────────
    { name: 'featuredCases', label: 'Featured Cases', type: 'group',
      admin: { description: '"Four signature cases" section on /results. The before/after cards come from the Before-After-Cases collection.' },
      fields: [
        { name: 'headingPre', label: 'Two Line — TitleA', type: 'text', localized: true, defaultValue: 'Four signature cases,' },
        { name: 'headingItalic', label: 'Two Line — TitleB', type: 'text', localized: true, defaultValue: 'shared with permission.' },
        { name: 'lede', label: 'Paragraph', type: 'textarea', localized: true,
          defaultValue: 'Each case represents a typical outcome, photographed at consistent angles and lighting, three to six months post-procedure.' },
        { name: 'filterBarLabel', label: 'Filter Bar Label', type: 'text', localized: true, defaultValue: 'Featured cases' },
        { name: 'countFormat', label: 'Count Format', type: 'text', localized: true, defaultValue: '{n} cases · facial',
          admin: { description: 'Right-side count label. Use {n} as placeholder for number of cases.' } },
      ],
    },

    // ── Library CTA ───────────────────────────────────────────────────────────
    { name: 'libraryCta', label: 'Library CTA', type: 'group',
      admin: { description: '"Want to see more?" CTA box shown below the Featured Cases grid.' },
      fields: [
        { name: 'eyebrow', label: 'Eyebrow', type: 'text', localized: true, defaultValue: 'Private gallery' },
        { name: 'headingPre', label: 'Two Line — TitleA', type: 'text', localized: true, defaultValue: 'Want to see ' },
        { name: 'headingItalic', label: 'Two Line — TitleB', type: 'text', localized: true, defaultValue: 'more?' },
        { name: 'body', label: 'Paragraph', type: 'textarea', localized: true,
          defaultValue: 'Our complete library — over two hundred consented cases across every discipline — is shared during private consultation. We will match what we show you to the work you are considering.' },
        { name: 'buttonLabel', label: 'CTA Button', type: 'text', localized: true, defaultValue: 'Request the full library' },
        { name: 'buttonHref', type: 'text', defaultValue: '/contact',
          admin: { description: 'Button link target.', hidden: true } },
      ],
    },

    // ── Stories ───────────────────────────────────────────────────────────────
    { name: 'storiesView', label: 'Stories', type: 'group',
      admin: { description: '"Stories, not slogans." section on /results. The patient rows come from the Stories collection.' },
      fields: [
        { name: 'headingPre', label: 'Two Line — TitleA', type: 'text', localized: true, defaultValue: 'Stories,' },
        { name: 'headingItalic', label: 'Two Line — TitleB', type: 'text', localized: true, defaultValue: 'not slogans.' },
        { name: 'lede', label: 'Paragraph', type: 'textarea', localized: true,
          defaultValue: "Eight stories from the last two years of patients, shared with their permission. Editorial restraint over marketing copy — these are the patients we're proudest to have served." },
      ],
    },

    // ── Share Story CTA ───────────────────────────────────────────────────────
    { name: 'share', label: 'Share Story', type: 'group',
      admin: { description: '"Have a story to share?" CTA at the bottom of /results and /stories.' },
      fields: [
        { name: 'eyebrow', label: 'Eyebrow', type: 'text', localized: true, defaultValue: 'Sharing your story' },
        { name: 'headingPre', label: 'Two Line — TitleA', type: 'text', localized: true, defaultValue: 'Have a ' },
        { name: 'headingItalic', label: 'Two Line — TitleB', type: 'text', localized: true, defaultValue: 'story' },
        { name: 'headingPost', label: 'Title C (roman tail)', type: 'text', localized: true, defaultValue: ' to share?' },
        { name: 'body', label: 'Paragraph', type: 'textarea', localized: true,
          defaultValue: "We never solicit testimonials — every story we publish is shared at the patient's instigation, in their own words, with their consent. If you'd like to share, we would be honoured to read it." },
        { name: 'buttonLabel', label: 'CTA Button', type: 'text', localized: true, defaultValue: 'Write to us' },
        { name: 'buttonHref', type: 'text', defaultValue: '/contact',
          admin: { description: 'Button link target.', hidden: true } },
      ],
    },
  ],
}
