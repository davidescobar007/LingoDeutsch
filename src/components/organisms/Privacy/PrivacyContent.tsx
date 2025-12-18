'use client'

import { useTranslations } from 'next-intl'

import { AtomText } from '@/components/atoms'
import { MoleculeCollapse } from '@/components/molecules'

export const OrganismPrivacyContent = () => {
   const t = useTranslations('privacy')

   // Variables for interpolation
   const variables = {
      date: '17 de diciembre de 2025',
      email: 'privacy@blabling.com'
   }

   const sections = [
      {
         id: 'data-collected',
         title: t('sections.dataCollected.title'),
         content: t('sections.dataCollected.content')
      },
      {
         id: 'data-purposes',
         title: t('sections.dataPurposes.title'),
         content: t('sections.dataPurposes.content')
      },
      {
         id: 'legal-basis',
         title: t('sections.legalBasis.title'),
         content: t('sections.legalBasis.content')
      },
      {
         id: 'data-sharing',
         title: t('sections.dataSharing.title'),
         content: t('sections.dataSharing.content')
      },
      {
         id: 'data-retention',
         title: t('sections.dataRetention.title'),
         content: t('sections.dataRetention.content')
      },
      {
         id: 'your-rights',
         title: t('sections.yourRights.title'),
         content: t('sections.yourRights.content')
      },
      {
         id: 'security',
         title: t('sections.security.title'),
         content: t('sections.security.content')
      },
      {
         id: 'minors-privacy',
         title: t('sections.minorsPrivacy.title'),
         content: t('sections.minorsPrivacy.content')
      },
      {
         id: 'cookies',
         title: t('sections.cookies.title'),
         content: t('sections.cookies.content')
      },
      {
         id: 'policy-changes',
         title: t('sections.policyChanges.title'),
         content: t('sections.policyChanges.content')
      },
      {
         id: 'contact',
         title: t('sections.contact.title'),
         content: t('sections.contact.content')
      }
   ]

   return (
      <section className="bg-base-100 py-20">
         <div className="container mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
               {/* Introduction */}
               <div className="mb-8">
                  <p className="text-base-content/80 mb-4">{t('lastUpdate', variables)}</p>
                  <AtomText className="mb-6" fontSize="large">
                     {t('introduction')}
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
