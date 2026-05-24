import React from 'react'
import { useCms } from '@/lib/cms-context'
import { StatsRow } from '@/components/primitives/StatsRow'

const FALLBACK_STATS = [
  { number: '28', label: 'Years in practice' },
  { number: '8', label: 'ISAPS / FICS surgeons' },
  { number: '3,400+', label: 'Procedures performed' },
  { number: '#1', label: 'Medical Tourism Hospital 2026' },
]

export const TrustStrip: React.FC = () => {
  const cms = useCms()
  const stats = cms?.brandStats?.stats?.length ? cms.brandStats.stats : FALLBACK_STATS
  return <StatsRow stats={stats} variant="trust-strip" />
}
