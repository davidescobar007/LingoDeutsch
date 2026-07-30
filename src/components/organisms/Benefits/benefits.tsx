'use client'

import { useTranslations } from 'next-intl'

import { Icon } from '@/components/atoms'

type BenefitKey = 'translation' | 'spaced' | 'grammar'
type IconName = 'globe' | 'brain' | 'book'

const BENEFITS: { icon: IconName; key: BenefitKey }[] = [
   { icon: 'globe', key: 'translation' },
   { icon: 'brain', key: 'spaced' },
   { icon: 'book', key: 'grammar' }
]

export const OrganismBenefits = () => {
   const t = useTranslations('landing.benefits')

   return (
      <section className="bg-base-100 mx-auto max-w-5xl px-6 py-20 md:py-28">
         <div className="mb-16 text-center">
            <h2 className="text-neutral mb-4 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
            <p className="text-neutral/70 mx-auto max-w-2xl text-lg">{t('subtitle')}</p>
         </div>

         <div className="grid gap-8 md:grid-cols-3">
            {BENEFITS.map((benefit) => (
               <div
                  className="border-base-300 bg-base-100 hover:border-primary/40 rounded-2xl border p-8 transition-colors"
                  key={benefit.key}
               >
                  <div className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
                     <Icon icon={benefit.icon} iconSize="medium" />
                  </div>
                  <p className="text-neutral text-lg font-medium leading-relaxed">{t(benefit.key)}</p>
               </div>
            ))}
         </div>
      </section>
   )
}
