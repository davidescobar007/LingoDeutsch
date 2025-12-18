'use client'

import { OrganismTermsContent, OrganismTermsHero } from '@/components/organisms'

type TTemplateTerms = {
   locale: string
}

export const TemplateTerms = ({ locale: _locale }: TTemplateTerms) => {
   return (
      <main>
         <OrganismTermsHero />
         <OrganismTermsContent />
      </main>
   )
}
