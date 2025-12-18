'use client'

import dynamic from 'next/dynamic'

import { AtomSectionSkeleton } from '@/components/atoms'
import {
   OrganismHeroSection,
   OrganismHowItWorksSection,
   OrganismInteractiveDemoSection,
   OrganismNavbar
} from '@/components/organisms'

// Lazy load below-the-fold sections for better initial page load performance
const OrganismTestimonialsSection = dynamic(
   () => import('@/components/organisms/Landing/TestimonialsSection').then((mod) => mod.OrganismTestimonialsSection),
   {
      loading: () => <AtomSectionSkeleton />
   }
)

const OrganismMotivationSection = dynamic(
   () => import('@/components/organisms/Landing/MotivationSection').then((mod) => mod.OrganismMotivationSection),
   {
      loading: () => <AtomSectionSkeleton />
   }
)

const OrganismFaqSection = dynamic(
   () => import('@/components/organisms/Landing/FaqSection').then((mod) => mod.OrganismFaqSection),
   {
      loading: () => <AtomSectionSkeleton />
   }
)

const OrganismTrustSignalsSection = dynamic(
   () => import('@/components/organisms/Landing/TrustSignalsSection').then((mod) => mod.OrganismTrustSignalsSection),
   {
      loading: () => <AtomSectionSkeleton height="h-64" />
   }
)

const OrganismFooterSection = dynamic(
   () => import('@/components/organisms/Landing/FooterSection').then((mod) => mod.OrganismFooterSection),
   {
      loading: () => <AtomSectionSkeleton height="h-48" />
   }
)

interface TemplateLandingProps {
   locale: string
}

export const TemplateLanding = ({ locale }: TemplateLandingProps) => {
   return (
      <div className="flex flex-col">
         <OrganismNavbar locale={locale} />

         <main className="overflow-x-hidden">
            {/* Above-the-fold sections - loaded immediately */}
            <OrganismHeroSection />
            <OrganismHowItWorksSection />
            <OrganismInteractiveDemoSection />

            {/* Below-the-fold sections - lazy loaded */}
            <OrganismTestimonialsSection />
            <OrganismMotivationSection />
            <OrganismFaqSection />
            <OrganismTrustSignalsSection />
         </main>

         <OrganismFooterSection />
      </div>
   )
}
