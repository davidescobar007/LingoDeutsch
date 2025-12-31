'use client'

import {
   OrganismFeatureShowcase,
   OrganismFinalCTA,
   OrganismFooterSection,
   OrganismHeroSection,
   OrganismNavbar,
   OrganismStatsSection,
   OrganismTestimonialsSection
} from '@/components/organisms'

interface TemplateLandingProps {
   locale: string
}

export const TemplateLanding = ({ locale }: TemplateLandingProps) => {
   return (
      <div className="flex min-h-screen flex-col">
         <OrganismNavbar locale={locale} />

         <main className="bg-white">
            <div className="container mx-auto px-4 py-12 md:px-12 lg:py-24">
               <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
                  {/* Left Column - Sticky Hero */}
                  <OrganismHeroSection />

                  {/* Right Column - All Content */}
                  <div className="w-full space-y-32 lg:w-1/2">
                     <OrganismFeatureShowcase />
                     <OrganismStatsSection />
                     <OrganismTestimonialsSection />
                     <OrganismFinalCTA />
                  </div>
               </div>
            </div>
         </main>

         <OrganismFooterSection />
      </div>
   )
}
