'use client'

import { useTranslations } from 'next-intl'

export const OrganismAboutMission = () => {
   const t = useTranslations('about')

   return (
      <section className="bg-base-100 py-20">
         <div className="container mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
               <div className="mb-12 text-center">
                  <h2 className="mb-6 text-4xl font-bold text-gray-600 sm:text-5xl">{t('mission.title')}</h2>
                  <p className="text-base-content/80 text-lg sm:text-xl">{t('mission.description')}</p>
               </div>

               <div className="grid gap-8 md:grid-cols-2">
                  <div className="bg-base-200 rounded-lg p-8">
                     <div className="mb-4 text-4xl">🎯</div>
                     <h3 className="mb-4 text-2xl font-semibold text-gray-600">{t('mission.vision.title')}</h3>
                     <p className="text-base-content/70">{t('mission.vision.description')}</p>
                  </div>

                  <div className="bg-base-200 rounded-lg p-8">
                     <div className="mb-4 text-4xl">💡</div>
                     <h3 className="mb-4 text-2xl font-semibold text-gray-600">{t('mission.values.title')}</h3>
                     <p className="text-base-content/70">{t('mission.values.description')}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
