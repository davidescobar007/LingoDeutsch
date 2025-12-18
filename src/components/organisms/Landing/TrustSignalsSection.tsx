'use client'
import { useTranslations } from 'next-intl'

import { AtomText } from '@/components/atoms'

const trustItems = [
   {
      icon: '🔒',
      titleKey: 'secure',
      descKey: 'secureDesc'
   },
   {
      icon: '🎓',
      titleKey: 'cefr',
      descKey: 'cefrDesc'
   },
   {
      icon: '🧠',
      titleKey: 'science',
      descKey: 'scienceDesc'
   },
   {
      icon: '🌍',
      titleKey: 'students',
      descKey: 'studentsDesc'
   }
]

const stats = [
   { value: '3,000+', labelKey: 'statStudents' },
   { value: '50+', labelKey: 'statArticles' },
   { value: '2,000+', labelKey: 'statWords' },
   { value: '16', labelKey: 'statLessons' }
]

export const OrganismTrustSignalsSection = () => {
   const t = useTranslations('landing')

   return (
      <section className="bg-gradient-to-b from-white to-purple-50 py-16">
         <div className="container mx-auto px-4">
            {/* Trust badges */}
            <div className="mb-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
               {trustItems.map((item, index) => (
                  <div
                     className="group flex flex-col items-center rounded-2xl bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
                     key={index}
                  >
                     <div className="mb-3 text-3xl transition-transform duration-300 group-hover:scale-110 sm:text-4xl">
                        {item.icon}
                     </div>
                     <AtomText className="mb-1 font-semibold text-gray-800" fontSize="medium">
                        {t(`trust.${item.titleKey}`)}
                     </AtomText>
                     <AtomText className="text-gray-500" fontSize="small">
                        {t(`trust.${item.descKey}`)}
                     </AtomText>
                  </div>
               ))}
            </div>

            {/* Stats bar */}
            <div className="rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 p-6 shadow-xl sm:p-8">
               <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
                  {stats.map((stat, index) => (
                     <div className="text-center" key={index}>
                        <div className="mb-1 text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>
                        <div className="text-sm text-white/80 sm:text-base">{t(`trust.${stat.labelKey}`)}</div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Bottom trust line */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-center sm:gap-8">
               <div className="flex items-center gap-2 text-gray-500">
                  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                  </svg>
                  <AtomText className="text-gray-500" fontSize="small">
                     {t('trust.gdpr')}
                  </AtomText>
               </div>
               <div className="flex items-center gap-2 text-gray-500">
                  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                  <AtomText className="text-gray-500" fontSize="small">
                     {t('trust.available')}
                  </AtomText>
               </div>
               <div className="flex items-center gap-2 text-gray-500">
                  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17l4.59-4.59L16 11l-6 6z" />
                  </svg>
                  <AtomText className="text-gray-500" fontSize="small">
                     {t('trust.noInstall')}
                  </AtomText>
               </div>
            </div>
         </div>
      </section>
   )
}
