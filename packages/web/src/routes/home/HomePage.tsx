import React from 'react'
import { PageShell } from '@/components/shell/PageShell'
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

export const HomePage: React.FC = () => (
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
  </PageShell>
)
