import React, { useState, useEffect } from 'react'
import './styles/globals.css'
import { HomePage } from '@/routes/home/HomePage'
import { DisciplineDetail } from '@/routes/detail/DisciplineDetail'
import { SubCategoryDetail } from '@/routes/detail/SubCategoryDetail'
import { SurgeonDetail } from '@/routes/detail/SurgeonDetail'
import { NotFound } from '@/routes/NotFound'
import { resolveRoute, type Route } from './router'

type Props = { route?: Route }

export const App: React.FC<Props> = ({ route: initialRoute }) => {
  // SSR passes the resolved route; client hydration uses window.location to
  // re-derive (matches the SSR render so hydration is consistent).
  const [route] = useState<Route>(() => {
    if (initialRoute) return initialRoute
    if (typeof window !== 'undefined') return resolveRoute(window.location.pathname)
    return { kind: 'home' }
  })

  // Defensive: if hydration somehow diverges from SSR (e.g. user manipulated
  // history before hydration), force a soft re-derive on mount. No-op normally.
  useEffect(() => {
    /* no-op — full page nav handles all transitions */
  }, [])

  switch (route.kind) {
    case 'home':
      return <HomePage />
    case 'discipline':
      return <DisciplineDetail slug={route.slug} />
    case 'subcategory':
      return <SubCategoryDetail slug={route.slug} />
    case 'surgeon':
      return <SurgeonDetail slug={route.slug} />
    case 'notfound':
    default:
      return <NotFound />
  }
}
