import React, { useState } from 'react'
import './styles/globals.css'
import { HomePage } from '@/routes/home/HomePage'
import { DisciplineDetail } from '@/routes/detail/DisciplineDetail'
import { SubCategoryDetail } from '@/routes/detail/SubCategoryDetail'
import { SurgeonDetail } from '@/routes/detail/SurgeonDetail'
import { TreatmentsIndex } from '@/routes/treatments/TreatmentsIndex'
import { SurgeonsIndex } from '@/routes/surgeons/SurgeonsIndex'
import { ResultsPage } from '@/routes/results/ResultsPage'
import { GalleryPage } from '@/routes/gallery/GalleryPage'
import { StoriesPage } from '@/routes/stories/StoriesPage'
import { JourneyPage } from '@/routes/journey/JourneyPage'
import { PricingPage } from '@/routes/pricing/PricingPage'
import { RecoveryStaysPage } from '@/routes/recovery-stays/RecoveryStaysPage'
import { PressPage } from '@/routes/press/PressPage'
import { ContactPage } from '@/routes/contact/ContactPage'
import { VideoConsultPage } from '@/routes/video-consult/VideoConsultPage'
import { BlogIndex } from '@/routes/blog/BlogIndex'
import { BlogPost } from '@/routes/blog/BlogPost'
import { PrivacyPage } from '@/routes/privacy/PrivacyPage'
import { NotFound } from '@/routes/NotFound'
import { resolveRoute, type Route } from './router'
import { CmsProvider } from './lib/cms-context'
import type { CmsCache } from './lib/cms'

type Props = { route?: Route; cms?: CmsCache | null }

export const App: React.FC<Props> = ({ route: initialRoute, cms }) => {
  const [route] = useState<Route>(() => {
    if (initialRoute) return initialRoute
    if (typeof window !== 'undefined') return resolveRoute(window.location.pathname)
    return { kind: 'home' }
  })

  const content = ((): React.ReactElement => {
    switch (route.kind) {
      case 'home':
        return <HomePage />
      case 'discipline':
        return <DisciplineDetail slug={route.slug} />
      case 'subcategory':
        return <SubCategoryDetail disciplineSlug={route.disciplineSlug} slug={route.slug} />
      case 'surgeon':
        return <SurgeonDetail slug={route.slug} />
      case 'treatments-index':
        return <TreatmentsIndex />
      case 'surgeons-index':
        return <SurgeonsIndex />
      case 'results':
        return <ResultsPage />
      case 'gallery':
        return <GalleryPage />
      case 'stories':
        return <StoriesPage />
      case 'journey':
        return <JourneyPage />
      case 'pricing':
        return <PricingPage />
      case 'recovery-stays':
        return <RecoveryStaysPage />
      case 'press':
        return <PressPage />
      case 'contact':
        return <ContactPage />
      case 'video-consult':
        return <VideoConsultPage />
      case 'blog-index':
        return <BlogIndex />
      case 'blog-post':
        return <BlogPost slug={route.slug} />
      case 'privacy':
        return <PrivacyPage />
      case 'redirect':
        // Server short-circuits to 301 before render; client SPA never sees
        // this kind. Render NotFound defensively if it leaks through.
        return <NotFound />
      case 'notfound':
      default:
        return <NotFound />
    }
  })()
  return <CmsProvider value={cms}>{content}</CmsProvider>
}
