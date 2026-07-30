'use client'

import { useTranslations } from 'next-intl'

import { AtomButton } from '@/components/atoms'

export const OrganismFinalCTA = () => {
   const t = useTranslations('landing.hero')

   return (
      <section className="bg-base-200/60 border-base-300 border-t">
         <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
            <h2 className="text-neutral mb-4 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
            <p className="text-neutral/70 mx-auto mb-10 max-w-xl text-lg">{t('subtitle')}</p>
            <AtomButton href="/app/home" size="lg" type="link" variant="PRIMARY">
               {t('ctaPrimary')}
            </AtomButton>
         </div>
      </section>
   )
}
