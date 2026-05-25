/**
 * CMS-backed shim for SUBCATEGORY_DATA.
 *
 * Previously this file held 22 hand-edited SubCategoryEntry records. It now
 * resolves to the live `sub-categories` + `procedures` collections in
 * Cosmedic CMS via `adaptSubCategoryData()`. Components import the same
 * named export with the same shape and need no changes.
 */

import { lazyRecord } from '@/lib/cms-proxy'
import { adaptSubCategoryData } from '@/lib/cms-adapters'

export type SubCategoryEntry = {
  parent: string
  slug: string
  title: string
  chapterTitle: [string, string]
  tagline: string
  lede: string
  intro?: string
  overview: string
  sections: Array<{ id: string; t: string; body: string }>
  faqs: Array<{ q: string; a: string }>
  leadSurgeon: string
  treatments: Array<{
    name: string
    short: string
    priceFromIdr: number | 'included' | 'complimentary' | null
    detail: {
      description: string
      duration: string
      recovery: string
      included: string[]
    }
  }>
}

export const SUBCATEGORY_DATA = lazyRecord<SubCategoryEntry>((cms) =>
  adaptSubCategoryData(cms) as Record<string, SubCategoryEntry>,
)
