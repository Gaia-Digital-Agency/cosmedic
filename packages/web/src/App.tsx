import React from 'react'
import './styles/globals.css'
import { PageShell } from '@/components/shell/PageShell'
import { Hero } from '@/routes/home/Hero'
import { TrustStrip } from '@/routes/home/TrustStrip'
import { Intro } from '@/routes/home/Intro'
import { Treatments } from '@/routes/home/Treatments'
import { PricingTeaser } from '@/routes/home/PricingTeaser'
import { Surgeons } from '@/routes/home/Surgeons'
import { Gallery } from '@/routes/home/Gallery'
import { LeadMagnet } from '@/routes/home/LeadMagnet'
import { Journey } from '@/routes/home/Journey'
import { Stories } from '@/routes/home/Stories'
import { Place } from '@/routes/home/Place'

export const App: React.FC = () => (
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
