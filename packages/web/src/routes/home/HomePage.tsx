import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
import { PageBlocks } from '@/components/PageBlocks'
import { Hero } from './Hero'
import { TrustStrip } from './TrustStrip'
import { Intro } from './Intro'
import { Treatments } from './Treatments'
import { PricingTeaser } from './PricingTeaser'
import { Surgeons } from './Surgeons'
import { Gallery } from './Gallery'
import { LeadMagnet } from './LeadMagnet'
import { Journey } from './Journey'
import { Stories } from './Stories'
import { Place } from './Place'
import { useCms } from '@/lib/cms-context'
import { findPageBySlug } from '@/lib/cms-adapters'

export const HomePage: React.FC = () => {
  const cms = useCms()
  const page = cms ? findPageBySlug(cms, 'home') : undefined
  return (
    <PageShell activePage="home">
      <Hero />
      <TrustStrip />
      <Intro />
      <Treatments />
      <PricingTeaser />
      <Surgeons />
      <Gallery />
      <LeadMagnet />
      <Journey />
      <Stories />
      <Place />
      {/* CMS editorial overrides — clinic can add extra sections via Pages.sections */}
      <PageBlocks blocks={page?.sections} />
    </PageShell>
  )
}
