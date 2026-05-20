import React from 'react'
import { useCms } from '@/lib/cms-context'
import { findPageBySlug } from '@/lib/cms-adapters'
import { PageBlocks } from './PageBlocks'

/**
 * Drop-in component for any route to render CMS-authored extra sections.
 * Pass the Page record's slug — clinic-edited Pages.sections blocks render
 * after the route's hard-coded design. Renders nothing if there's no Page
 * record for the slug or the sections array is empty.
 */
export const CmsExtraBlocks: React.FC<{ slug: string }> = ({ slug }) => {
  const cms = useCms()
  const page = cms ? findPageBySlug(cms, slug) : undefined
  return <PageBlocks blocks={page?.sections} />
}
