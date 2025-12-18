import {
   OrganismAboutFeatures,
   OrganismAboutHero,
   OrganismAboutMission,
   OrganismAboutTeam,
   OrganismFooterSection,
   OrganismNavbar
} from '@/components/organisms'

interface TemplateAboutProps {
   locale: string
}

export const TemplateAbout = ({ locale }: TemplateAboutProps) => {
   return (
      <div className="flex flex-col">
         <OrganismNavbar locale={locale} />

         <section className="overflow-x-hidden">
            <OrganismAboutHero />
            <OrganismAboutMission />
            <OrganismAboutFeatures />
            <OrganismAboutTeam />
         </section>

         <OrganismFooterSection />
      </div>
   )
}
