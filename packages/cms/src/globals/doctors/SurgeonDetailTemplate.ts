import type { GlobalConfig } from 'payload'
import { isAuthenticated, readPublic } from '../../lib/access'
import { revalidateGlobalAfterChange } from '../../lib/revalidate'

/**
 * Shared template-level chrome for every /surgeons/<slug> detail page (×8).
 *
 * Per-doctor data (name, portrait, bio, credentials, schedule, languages,
 * specialty areas) lives on the Surgeons collection. This global holds only
 * the labels / eyebrows / fallbacks / section headings that are identical
 * across all 8 detail pages.
 *
 * Two read-only mirror fields point at cross-bucket sources:
 *   - heroCtaTreatmentsLabelTemplate ← b. Treatments → Disciplines (title)
 *   - trainingRowPracticeMid ← a. Homepage → l. Settings (siteName + city)
 * Both use Payload's native `admin.readOnly` + `hooks.afterRead` — no
 * monkey-patching. Edit the source; the value here updates on next read.
 */

export const SurgeonDetailTemplate: GlobalConfig = {
  slug: 'surgeon-detail-template',
  label: 'Detail Template',
  admin: {
    group: 'Experts',
    hidden: true,
    description:
      'Template-level strings shared by every /surgeons/<slug> detail page (×8). Per-doctor data lives on **c. Surgeons** (the row). Two view-only mirrors point at cross-bucket sources — Treatments back-link label (← b. Treatments → e. Disciplines) and the "BIMC CosMedic Centre, Bali" Training row (← a. Homepage → l. Settings).',
  },
  access: { read: readPublic, update: isAuthenticated },
  hooks: revalidateGlobalAfterChange(),
  fields: [

    // ─── Breadcrumb ──────────────────────────────────────────────────────
    { name: 'breadcrumbHomeLabel', type: 'text', required: true, defaultValue: 'BIMC CosMedic',
      admin: { description: 'First crumb in the breadcrumb trail. Links to /.' } },
    { name: 'breadcrumbSurgeonsLabel', type: 'text', required: true, defaultValue: 'Surgeons',
      admin: { description: 'Second crumb. Links to /surgeons.' } },

    // ─── Hero ────────────────────────────────────────────────────────────
    { name: 'heroLeadLabel', type: 'text', required: true, defaultValue: 'Lead Surgeon',
      admin: { description: 'Eyebrow shown on the detail page when the surgeon\'s "lead" flag is TRUE.' } },
    { name: 'heroSpecialistLabel', type: 'text', required: true, defaultValue: 'Specialist',
      admin: { description: 'Eyebrow shown when the surgeon\'s "lead" flag is FALSE.' } },
    { name: 'heroCtaConsultLabel', type: 'text', required: true, defaultValue: 'Request a consultation',
      admin: { description: 'Primary CTA in the hero. Always links to /contact.' } },
    { name: 'heroCtaTreatmentsLabelTemplate', type: 'text',
      admin: {
        readOnly: true,
        description:
          'READ-ONLY mirror. The hero secondary button label is the title of the surgeon\'s discipline (Surgical for plastic-surgery, Non-Surgical for aesthetic-medicine). To change this label, edit **b. Treatments → e. Disciplines → title** for the relevant discipline. Resolves at read time.',
      },
      hooks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        afterRead: [async ({ req }: any): Promise<string> => {
          try {
            const res = await req.payload.find({
              collection: 'disciplines',
              limit: 2,
              where: { slug: { in: ['surgical', 'non-surgical'] } },
            })
            const titles = (res?.docs || [])
              .map((d: { title?: string }) => d?.title)
              .filter(Boolean)
            return titles.join(' / ') || '<Discipline.title>'
          } catch {
            return '<Discipline.title>'
          }
        }],
      },
    },
    { name: 'heroCtaTreatmentsLabelFallback', type: 'text', required: true, defaultValue: 'Treatments',
      admin: { description: 'Fallback button label when the surgeon\'s discipline cannot be resolved. Rendered as the literal text, no template substitution.' } },

    // ─── Stats row ───────────────────────────────────────────────────────
    { name: 'statLabelYears', type: 'text', required: true, defaultValue: 'Years in practice',
      admin: { description: 'Label under the first stat (yearsInPractice from the surgeon record).' } },
    { name: 'statLabelDistinction', type: 'text', required: true, defaultValue: 'Distinction',
      admin: { description: 'Label under the second stat (memberships line from the surgeon record).' } },
    { name: 'statLabelSpecialty', type: 'text', required: true, defaultValue: 'Specialty',
      admin: { description: 'Label under the third stat (first specialty area from the surgeon record).' } },

    // ─── Biography sidebar ───────────────────────────────────────────────
    { name: 'sidebarLabelSpecialism', type: 'text', required: true, defaultValue: 'Specialism',
      admin: { description: 'Sidebar definition-list label for the doctor\'s specialism / group.' } },
    { name: 'sidebarLabelCredentials', type: 'text', required: true, defaultValue: 'Credentials',
      admin: { description: 'Sidebar definition-list label for the credentials line.' } },
    { name: 'sidebarLabelLanguages', type: 'text', required: true, defaultValue: 'Languages',
      admin: { description: 'Sidebar definition-list label for the languages list.' } },
    { name: 'sidebarLabelAvailability', type: 'text', required: true, defaultValue: 'Availability',
      admin: { description: 'Sidebar definition-list label for the availability schedule.' } },
    { name: 'languagesFallback', type: 'text', required: true, defaultValue: 'English · Bahasa Indonesia',
      admin: { description: 'Fallback rendered when the surgeon record has no `languages` rows.' } },
    { name: 'availabilityFallback', type: 'text', required: true, defaultValue: 'Mon & Thu in person · weekday mornings by video',
      admin: { description: 'Fallback rendered when the surgeon record has no `availabilitySchedule` rows.' } },

    // ─── Faculty section ─────────────────────────────────────────────────
    { name: 'facultyEyebrow', type: 'text', required: true, defaultValue: 'The faculty',
      admin: { description: 'Eyebrow above the "Meet the other practitioners" card grid.' } },
    {
      name: 'facultyHeading',
      type: 'group',
      admin: { description: '"Meet the other practitioners." heading — split into 3 parts so the italic mid-sentence renders correctly.' },
      fields: [
        { name: 'pre', type: 'text', required: true, defaultValue: 'Meet the ',
          admin: { description: 'Roman prefix before the italic. Default "Meet the ". Include trailing space.' } },
        { name: 'italic', type: 'text', required: true, defaultValue: 'other practitioners.',
          admin: { description: 'The italic phrase. Default "other practitioners.".' } },
        { name: 'post', type: 'text', defaultValue: '',
          admin: { description: 'Roman suffix after the italic, if any. Default empty.' } },
      ],
    },

    // ─── Specialty areas ─────────────────────────────────────────────────
    { name: 'specialtyEyebrow', type: 'text', required: true, defaultValue: 'Specialty areas',
      admin: { description: 'Eyebrow above the specialty-area grid.' } },
    { name: 'specialtyHeadingTemplate', type: 'textarea', required: true,
      admin: {
        description:
          'Specialty section heading. Templated — use {title} and {common} for the honorific and first name. The italic word(s) wrap inside {italic}…{/italic}. Default: \'What {title} {common} {italic}does best.{/italic}\'',
      },
    },

    // ─── Training & credentials ──────────────────────────────────────────
    { name: 'trainingEyebrow', type: 'text', required: true, defaultValue: 'Training & credentials',
      admin: { description: 'Eyebrow above the training & credentials table.' } },
    { name: 'trainingRowLabels', type: 'array', required: true, minRows: 5, maxRows: 5,
      admin: { description: 'Left-column labels for the 5 training & credentials rows. Order is fixed (Medical Degree, Specialty Training, Suffix, Practice, Memberships) — do not reorder; the route relies on this order.' },
      fields: [
        { name: 'value', type: 'text', required: true },
      ],
    },
    { name: 'trainingRowRights', type: 'array', required: true, minRows: 4, maxRows: 4,
      admin: { description: 'Right-column italic phrases for rows 1, 3, 4, 5 (row 2\'s right cell comes from the surgeon\'s `credLine`). Order: ["MBBS / MD", "Board credential", "Active", "Active member"].' },
      fields: [
        { name: 'value', type: 'text', required: true },
      ],
    },
    { name: 'trainingRowPracticeMid', type: 'text',
      admin: {
        readOnly: true,
        description:
          'READ-ONLY mirror. The middle cell of the "Practice" row is composed from **a. Homepage → l. Settings → Site name + City**. Edit there to change. Resolves at read time.',
      },
      hooks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        afterRead: [async ({ req }: any): Promise<string> => {
          try {
            const settings = await req.payload.findGlobal({ slug: 'settings' })
            const name = (settings as { siteName?: string })?.siteName || 'BIMC CosMedic Centre'
            const city = (settings as { city?: string })?.city || 'Bali'
            return `${name}, ${city}`
          } catch {
            return 'BIMC CosMedic Centre, Bali'
          }
        }],
      },
    },

    // ─── Biography orphan singles ────────────────────────────────────────
    { name: 'biographyEyebrow', type: 'text', required: true, defaultValue: 'Biography',
      admin: { description: 'Eyebrow above the biography sidebar.' } },
    { name: 'secondaryBioParagraph', type: 'textarea', required: true,
      admin: {
        description:
          'Second paragraph of the bio body, shown after the per-surgeon `bio`. Templated — use {title} and {common} for the doctor\'s honorific and first name. Default: \'Patients often describe {title} {common} as quiet, deeply patient, and frank — comfortable with saying "no" when "yes" would be the easier answer. We hold this very highly.\'',
      },
    },
  ],
}
