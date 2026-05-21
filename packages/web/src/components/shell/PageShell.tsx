import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingChrome } from './FloatingChrome'
import { CTABandSlim } from '@/components/primitives/CTABandSlim'
import { BackToTop } from '@/components/primitives/BackToTop'

type Props = {
  activePage?: string
  hideCTA?: boolean
  children: React.ReactNode
}

export const PageShell: React.FC<Props> = ({ activePage, hideCTA = false, children }) => (
  <>
    <Header activePage={activePage} />
    <main>{children}</main>
    <div className="dark-foot">
      {!hideCTA && <CTABandSlim />}
      <Footer />
    </div>
    <FloatingChrome />
    <BackToTop />
  </>
)
