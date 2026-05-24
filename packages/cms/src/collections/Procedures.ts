import type { CollectionConfig } from 'payload'
import { isAuthenticated, readPublic } from '../lib/access'
import { revalidationHooks } from '../lib/revalidate'
import { seoGroup } from '../lib/seo'
import { apiWarningField } from '../lib/api-warning'

export const Procedures: CollectionConfig = {
  slug: 'procedures',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'catalogueGroup', 'mainCategory', 'parentSubCategory', 'featuredRank', 'sortOrder'],
    group: 'Treatments',
    description:
      'Single source of truth for ALL pricing (Phase C9). Holds the 41 editorial surgical procedures AND the 101 catalogue line items absorbed from MachineTreatments / InjectableProducts / HairRemovalAreas. Catalogue fields (catalogueGroup, mainCategory, subCategory, brand, productLine, manufacturer, fdaApproved, bodyZone, audienceTier, unit) drive grouping in the /pricing tables; editorial fields (description, sections, faqs, surgeonsCredentialed, etc.) only need to be populated on the editorial procedures. PRICING bucket points back to this collection — pricing edits land here.',
  },
  access: {
    read: readPublic,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    ...revalidationHooks(),
    beforeChange: [
      // q15: scope sortOrder per parentSubCategory. On create, when the editor
      // hasn't set sortOrder (null/0) and a parent is chosen, default to
      // (max sortOrder among siblings in the same parent) + 10. Keeps the
      // "leave gaps for inserts" convention.
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        if (!data.parentSubCategory) return data
        if (data.sortOrder && data.sortOrder !== 0) return data
        const parentId =
          typeof data.parentSubCategory === 'object' && data.parentSubCategory !== null
            ? (data.parentSubCategory as { id: number }).id
            : data.parentSubCategory
        const siblings = await req.payload.find({
          collection: 'procedures',
          where: { parentSubCategory: { equals: parentId } },
          depth: 0,
          pagination: false,
          limit: 0,
        })
        const max = siblings.docs.reduce(
          (m: number, p: { sortOrder?: number | null }) => Math.max(m, p.sortOrder ?? 0),
          0,
        )
        data.sortOrder = max + 10
        return data
      },
    ],
  },
  fields: [
    apiWarningField,
    { name: 'slug', type: 'text', required: true, unique: true, index: true,
      admin: { description: 'URL fragment for the procedure (e.g. "breast-augmentation"). Used in /pricing cross-links and any future /procedure-{slug} routes.' } },
    { name: 'name', type: 'text', required: true,
      admin: { description: 'Display name shown in the procedure accordion on /treatments/{sub-slug} AND on /pricing rows.' } },
    { name: 'shortName', type: 'text',
      admin: { description: 'Optional shorter label used on cards and nav where space is tight.' } },
    // ── Catalogue hierarchy (Phase C9) ──────────────────────────────────
    {
      name: 'catalogueGroup',
      type: 'select',
      options: [
        { label: 'Surgical', value: 'surgical' },
        { label: 'Machine', value: 'machine' },
        { label: 'Injection', value: 'injection' },
        { label: 'BTL (Hair Removal)', value: 'btl' },
      ],
      admin: {
        description:
          'Drives which /pricing table this row appears in. surgical = full editorial; machine / injection / btl = catalogue-only line items.',
      },
    },
    { name: 'mainCategory', type: 'text',
      admin: { description: 'Main Category — e.g. "Face & Neck" (surgical), "Laser AFT Rejuvenation" (machine), "DERMAL FILLER" (injection), "Upper Body" (btl)' } },
    { name: 'subCategory', type: 'text',
      admin: { description: 'Optional 3rd-level grouping label inside Main Category. Distinct from the parentSubCategory relationship below — this is a free-text bucket for catalogue items without an editorial Sub Category entry.' } },
    { name: 'unit', type: 'text',
      admin: { description: 'e.g. "1 ml", "per unit", "per thread", "Face", "Half Arm"' } },
    {
      name: 'audienceTier',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'BIMC Tourist', value: 'tourist' },
        { label: 'BIMC Kitas + KTP', value: 'kitas_ktp' },
        { label: 'Package', value: 'package' },
      ],
      admin: { description: 'Pricing tier for multi-tier rows (machine 3-tier).' },
    },
    { name: 'brand', type: 'text', admin: { description: 'Injection only — e.g. "Juvederm"' } },
    { name: 'productLine', type: 'text', admin: { description: 'Injection only — e.g. "Volux"' } },
    { name: 'manufacturer', type: 'text', admin: { description: 'Injection only — e.g. "Allergan"' } },
    { name: 'fdaApproved', type: 'checkbox', defaultValue: false,
      admin: { description: 'Injection only — FDA-approved badge.' } },
    {
      name: 'bodyZone',
      type: 'select',
      options: [
        { label: 'Face', value: 'face' },
        { label: 'Upper Body', value: 'upper-body' },
        { label: 'Lower Body', value: 'lower-body' },
        { label: 'Package', value: 'package' },
        { label: 'Other BTL', value: 'other' },
      ],
      admin: { description: 'BTL only — body zone for hair removal grouping.' },
    },
    // ── Editorial relations (only populated on the 41 editorial procedures) ─
    { name: 'parentDiscipline', type: 'relationship', relationTo: 'disciplines',
      admin: { description: 'Which top-level discipline this procedure belongs to. Required for editorial procedures; optional for catalogue line items.' } },
    { name: 'parentSubCategory', type: 'relationship', relationTo: 'sub-categories',
      admin: { description: 'Which sub-category this procedure renders under. Drives which /treatments/{sub-slug} page lists this procedure in its accordion.' } },
    { name: 'description', type: 'richText',
      admin: { description: 'Top-of-record description shown when the procedure expands in the sub-category accordion.' } },
    {
      name: 'sections',
      type: 'array',
      admin: { description: 'Body sections rendered inside the expanded procedure accordion (or a future /procedure-{slug} page).' },
      fields: [
        { name: 'anchorId', type: 'text', required: true,
          admin: { description: 'URL-safe anchor id for the section heading.' } },
        { name: 't', type: 'text', required: true,
          admin: { description: 'Section heading.' } },
        { name: 'body', type: 'richText', required: true,
          admin: { description: 'Section body — rich text.' } },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      admin: { description: 'Procedure-specific FAQ accordion items.' },
      fields: [
        { name: 'q', type: 'text', required: true },
        { name: 'a', type: 'textarea', required: true },
      ],
    },
    { name: 'surgeonsCredentialed', type: 'relationship', relationTo: 'surgeons', hasMany: true,
      admin: { description: 'Surgeons credentialed to perform this procedure. Rendered as the "Performed by" mini-card list under the procedure on the sub-category page.' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media',
      admin: { description: 'Hero image used at the top of the procedure detail (when the procedure page exists). Falls back to the sub-category hero.' } },
    {
      name: 'pricing',
      type: 'group',
      admin: { description: 'Pricing fields for this procedure. (Workstream 2 will collapse these into a relation pointing at PriceListItems so price is edited in ONE place. For now, keep in sync with the matching PriceListItem row.) Drives the price shown on the procedure card.' },
      fields: [
        { name: 'priceIdr2025', type: 'number' },
        { name: 'priceAud2025', type: 'number' },
        { name: 'priceIdr2026', type: 'number' },
        { name: 'priceAud2026', type: 'number' },
        { name: 'priceIdrRangeLow', type: 'number', admin: { description: 'For range values' } },
        { name: 'priceIdrRangeHigh', type: 'number' },
        { name: 'priceNotes', type: 'text', admin: { description: 'e.g. "Local Anesthesia", "General Anesthesia"' } },
        { name: 'displayYear', type: 'select', defaultValue: '2026',
          options: [{ label: '2025', value: '2025' }, { label: '2026', value: '2026' }],
          admin: { description: 'Which year to display by default on procedure cards' } },
      ],
    },
    { name: 'featuredRank', type: 'number', admin: { description: 'Top-3 indicator from pricelist column 1 (1, 2, or 3 — blank for non-featured)' } },
    { name: 'includesImplant', type: 'checkbox', defaultValue: false,
      admin: { description: 'Flagged from "*" marker in pricelist' } },
    {
      name: 'detail',
      type: 'group',
      admin: { description: 'Detail fields shown inside the procedure accordion on /treatments/{sub-slug}.' },
      fields: [
        { name: 'duration', type: 'text',
          admin: { description: 'How long the procedure takes. e.g. "3.5 hours".' } },
        { name: 'recovery', type: 'text',
          admin: { description: 'Recovery summary shown in the accordion. e.g. "10–14 days for stitches; 6 weeks for swelling".' } },
        { name: 'included', type: 'array',
          admin: { description: 'Free-text "what\'s included" bullets shown inside the accordion. (Workstream 4 will collapse this into the relation-based "Included" field below.)' },
          fields: [{ name: 'value', type: 'text', required: true }] },
      ],
    },
    { name: 'included', type: 'relationship', relationTo: 'inclusion-items', hasMany: true,
      admin: { description: 'Inclusion items shown as the "What\'s included" list on the procedure card. Curate items once in the InclusionItems collection, then pick relevant ones per procedure here.' } },
    { name: 'excluded', type: 'relationship', relationTo: 'exclusion-items', hasMany: true,
      admin: { description: 'Exclusion items shown as the "Not included" list under the procedure detail. Curated once in ExclusionItems.' } },
    { name: 'recoveryTimeline', type: 'relationship', relationTo: 'journey-steps', hasMany: true,
      admin: { description: 'Ordered timeline of journey steps shown in the "Recovery timeline" block on the procedure detail.' } },
    { name: 'relatedBA', type: 'relationship', relationTo: 'before-after-cases', hasMany: true,
      admin: { description: 'Related before/after composites shown as the "Related results" thumbnail grid on the procedure detail.' } },
    { name: 'relatedProcedures', type: 'relationship', relationTo: 'procedures', hasMany: true,
      admin: { description: 'Sibling/related procedures shown as cross-links at the bottom of the procedure detail.' } },
    seoGroup,
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sort within Sub-Category',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description:
          'Per-parent ordering. Lower numbers appear EARLIER inside the parent Sub-Category. Use 10/20/30… leaving gaps for later inserts. Numbers DO NOT need to be unique across the whole collection — only within the same parentSubCategory. On create, if left at 0 with a parent set, the system assigns (max sibling sortOrder) + 10 automatically. Tip: in the admin list view, filter by parentSubCategory to see the per-parent ordering in isolation.',
      },
    },
  ],
}
