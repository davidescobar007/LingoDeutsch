'use client'

import { useTranslations } from 'next-intl'

import { AtomText } from '@/components/atoms'
import { MoleculeCollapse } from '@/components/molecules'

export const OrganismTermsContent = () => {
   const t = useTranslations('terms')

   // Variables for interpolation
   const variables = {
      date: '4 de diciembre de 2025',
      country: 'Colombia',
      jurisdiction: 'Bogotá',
      email: 'support@blabling.com',
      contactUrl: 'https://blabling.com/contact'
   }

   const sections = [
      {
         id: 'who-we-are',
         title: t('sections.whoWeAre.title'),
         content: t('sections.whoWeAre.content')
      },
      {
         id: 'acceptance',
         title: t('sections.acceptance.title'),
         content: t('sections.acceptance.content')
      },
      {
         id: 'registration',
         title: t('sections.registration.title'),
         content: t('sections.registration.content')
      },
      {
         id: 'permitted-use',
         title: t('sections.permittedUse.title'),
         content: t('sections.permittedUse.content')
      },
      {
         id: 'app-content',
         title: t('sections.appContent.title'),
         content: t('sections.appContent.content')
      },
      {
         id: 'user-content',
         title: t('sections.userContent.title'),
         content: t('sections.userContent.content')
      },
      {
         id: 'payments',
         title: t('sections.payments.title'),
         content: t('sections.payments.content')
      },
      {
         id: 'promotions',
         title: t('sections.promotions.title'),
         content: t('sections.promotions.content')
      },
      {
         id: 'cancellation',
         title: t('sections.cancellation.title'),
         content: t('sections.cancellation.content')
      },
      {
         id: 'privacy',
         title: t('sections.privacy.title'),
         content: t('sections.privacy.content')
      },
      {
         id: 'intellectual-property',
         title: t('sections.intellectualProperty.title'),
         content: t('sections.intellectualProperty.content')
      },
      {
         id: 'liability',
         title: t('sections.liability.title'),
         content: t('sections.liability.content')
      },
      {
         id: 'suspension',
         title: t('sections.suspension.title'),
         content: t('sections.suspension.content')
      },
      {
         id: 'third-party-links',
         title: t('sections.thirdPartyLinks.title'),
         content: t('sections.thirdPartyLinks.content')
      },
      {
         id: 'language',
         title: t('sections.language.title'),
         content: t('sections.language.content')
      },
      {
         id: 'jurisdiction',
         title: t('sections.jurisdiction.title'),
         content: t('sections.jurisdiction.content', variables)
      },
      {
         id: 'contact',
         title: t('sections.contact.title'),
         content: t('sections.contact.content', variables)
      }
   ]

   return (
      <section className="bg-base-100 py-20">
         <div className="container mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
               {/* Introduction */}
               <div className="mb-8">
                  <p className="text-base-content/80 mb-4">{t('lastUpdate', variables)}</p>
                  <AtomText className="mb-6" fontSize="medium">
                     ****{t('introduction')}****
                  </AtomText>
               </div>

               {/* Collapsible Sections */}
               <div className="space-y-2">
                  {sections.map((section) => (
                     <MoleculeCollapse key={section.id} title={section.title}>
                        <AtomText className="whitespace-pre-line">{section.content}</AtomText>
                     </MoleculeCollapse>
                  ))}
               </div>
            </div>
         </div>
      </section>
   )
}
