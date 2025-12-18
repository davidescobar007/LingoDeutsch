'use client'

import { useTranslations } from 'next-intl'

import { AtomText, AtomTitle } from '@/components/atoms'

export const OrganismAboutFeatures = () => {
   const t = useTranslations('about')

   const features = [
      {
         icon: '📚',
         title: t('features.interactive.title'),
         description: t('features.interactive.description')
      },
      {
         icon: '🎯',
         title: t('features.personalized.title'),
         description: t('features.personalized.description')
      },
      {
         icon: '🧠',
         title: t('features.effective.title'),
         description: t('features.effective.description')
      },
      {
         icon: '🌟',
         title: t('features.fun.title'),
         description: t('features.fun.description')
      }
   ]

   return (
      <section className="bg-base-200 py-20">
         <div className="container mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
               <div className="mb-16 text-center">
                  <h2 className="mb-6 text-4xl font-bold text-gray-600 sm:text-5xl">{t('features.title')}</h2>
                  <p className="text-base-content/80 text-lg sm:text-xl">{t('features.subtitle')}</p>
               </div>

               <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {features.map((feature, index) => (
                     <div
                        className="bg-base-100 rounded-lg p-6 shadow-md transition-transform hover:scale-105"
                        key={index}
                     >
                        <div className="mb-4 text-5xl">{feature.icon}</div>
                        <AtomTitle extraClassName="mb-3" type="h3">
                           {feature.title}
                        </AtomTitle>
                        <AtomText className="text-base-content/70" fontSize="small" type="paragraph">
                           {feature.description}
                        </AtomText>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   )
}
