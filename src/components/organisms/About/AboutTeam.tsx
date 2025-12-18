'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AtomButton } from '@/components/atoms'

export const OrganismAboutTeam = () => {
   const t = useTranslations('about')

   return (
      <section className="bg-base-100 py-20">
         <div className="container mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
               <div className="mb-12 text-center">
                  <h2 className="mb-6 text-4xl font-bold text-gray-600 sm:text-5xl">{t('team.title')}</h2>
                  <p className="text-base-content/80 text-lg sm:text-xl">{t('team.description')}</p>
               </div>

               <div className="bg-primary/10 rounded-lg p-8 text-center">
                  <div className="mb-6 flex justify-center">
                     <Image alt="Blabling logo" height={80} priority src="/images/logo4.svg" width={100} />
                  </div>
                  <h3 className="mb-4 text-2xl font-semibold text-gray-600">{t('team.callToAction')}</h3>
                  <p className="text-base-content/70 mb-6">{t('team.contact')}</p>
                  <AtomButton href="/app/home" size="lg" type="link" variant="PRIMARY">
                     {t('team.startButton')}
                  </AtomButton>
               </div>
            </div>
         </div>
      </section>
   )
}
