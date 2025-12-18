'use client'

import { OrganismPrivacyContent, OrganismPrivacyHero } from '@/components/organisms/Privacy'

type TPrivacyTemplateProps = {
   locale: string
}

export const TemplatePrivacy = ({ locale: _locale }: TPrivacyTemplateProps) => {
   return (
      <main>
         <OrganismPrivacyHero />
         <OrganismPrivacyContent />
      </main>
   )
}
