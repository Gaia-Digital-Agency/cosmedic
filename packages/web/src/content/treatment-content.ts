/**
 * CMS-backed shim for TREATMENT_CONTENT.
 *
 * Previously this file held 6 hand-edited DisciplineContent records. It now
 * resolves to the live `disciplines` collection in Cosmedic CMS via
 * `adaptDisciplineContent()`. Components import the same named export.
 */

import { lazyRecord } from '@/lib/cms-proxy'
import { adaptDisciplineContent } from '@/lib/cms-adapters'
import type { CmsCache } from '@/lib/cms'

export type DisciplineContent = {
  chapter: string
  title: [string, string]
  lede: string
  leadSurgeon: string
  subcategories?: Array<{ slug: string; title: string; short: string; available: boolean }>
  overview: string
  sections: Array<{ id: string; t: string; body: string }>
  procedures?: Array<{ n: string; d: string; priceFromIdr: number | null }>
  faqs: Array<{ q: string; a: string }>
}

export const TREATMENT_CONTENT = lazyRecord<DisciplineContent>((cms: CmsCache) => {
  const out: Record<string, DisciplineContent> = {}
  for (const d of cms.disciplines) {
    const adapted = adaptDisciplineContent(d.slug, cms)
    if (adapted) out[d.slug] = adapted
  }
  return out
})
