import {
   OrganismFooterSection,
   OrganismHeroSection,
   OrganismHowItWorksSection,
   OrganismNavbar
} from '@/components/organisms'

interface TemplateLandingProps {
   locale: string
}

export const TemplateLanding = ({ locale }: TemplateLandingProps) => {
   return (
      <div className="flex flex-col">
         <OrganismNavbar locale={locale} />

         <section className="overflow-x-hidden">
            <OrganismHeroSection />
            <OrganismHowItWorksSection />
         </section>

         <OrganismFooterSection />
      </div>
   )
}
