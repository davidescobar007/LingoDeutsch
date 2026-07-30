'use client'

import {
   OrganismBenefits,
   OrganismDemoShowcase,
   OrganismFaqSection,
   OrganismFinalCTA,
   OrganismFooterSection,
   OrganismHeroSection,
   OrganismHowItWorks,
   OrganismNavbar,
   OrganismTrustSection
} from '@/components/organisms'

interface TemplateLandingProps {
   locale: string
}

export const TemplateLanding = ({ locale }: TemplateLandingProps) => {
   return (
      <div className="bg-base-100 flex h-screen flex-col overflow-y-auto">
         <OrganismNavbar locale={locale} />

         <main className="bg-base-100 flex-1">
            <OrganismHeroSection />
            <OrganismDemoShowcase />
            <OrganismHowItWorks />
            <OrganismBenefits />
            <OrganismTrustSection />
            <OrganismFaqSection />
            <OrganismFinalCTA />
         </main>

         <OrganismFooterSection />
      </div>
   )
}
