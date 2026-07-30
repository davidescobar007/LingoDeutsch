'use client'

import { useTranslations } from 'next-intl'

import { Icon } from '@/components/atoms'

const STEP_ICONS = ['book-open-text', 'brain', 'scroll-text'] as const

const chip = (label: string) => (
   <span className="bg-primary/5 text-primary rounded-full px-4 py-1.5 font-medium">{label}</span>
)

export const OrganismHowItWorks = () => {
   const t = useTranslations('landing.howItWorks')
   const steps = [1, 2, 3] as const

   return (
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
         <div className="mb-16 text-center">
            <h2 className="text-neutral mb-4 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
            <p className="text-neutral/70 mx-auto max-w-2xl text-lg">{t('subtitle')}</p>
         </div>

         <div className="space-y-12">
            {steps.map((step, index) => (
               <div
                  className="border-base-300 flex flex-col gap-6 border-t pt-10 md:flex-row md:items-start md:gap-10"
                  key={step}
               >
                  <div className="flex shrink-0 items-center gap-4 md:w-1/3">
                     <span className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold">
                        {step}
                     </span>
                     <Icon icon={STEP_ICONS[index]} iconSize="large" iconState="primary" />
                  </div>

                  <div className="flex-1">
                     <span className="text-primary mb-2 block text-sm font-medium">{t(`step${step}.badge`)}</span>
                     <h3 className="text-neutral mb-3 text-2xl font-bold">{t(`step${step}.title`)}</h3>
                     <p className="text-neutral/70 mb-4 leading-relaxed">{t(`step${step}.description`)}</p>
                     <div className="flex flex-wrap gap-4 text-sm">
                        {step === 1 && (
                           <>
                              {chip(t('step1.stat1'))}
                              {chip(t('step1.stat2'))}
                           </>
                        )}
                        {step === 2 && (
                           <span className="bg-base-200 text-neutral/70 rounded-full px-4 py-1.5">
                              {t('step2.tryIt')}
                           </span>
                        )}
                        {step === 3 && (
                           <>
                              {chip(t('step3.stat1'))}
                              {chip(t('step3.stat2'))}
                              {chip(t('step3.stat3'))}
                           </>
                        )}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>
   )
}
