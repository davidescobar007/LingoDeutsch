'use client'

import { useTranslations } from 'next-intl'

import { AtomButton } from '@/components/atoms'
import { MoleculeReveal } from '@/components/molecules'

const QUESTIONS = [1, 2, 3, 4, 5, 6] as const

export const OrganismFaqSection = () => {
   const t = useTranslations('landing.faq')

   return (
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
         <div className="mb-12 text-center">
            <span className="text-primary mb-4 block text-sm font-medium">{t('badge')}</span>
            <h2 className="text-neutral mb-4 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
            <p className="text-neutral/70 text-lg">{t('subtitle')}</p>
         </div>

         <div className="space-y-3">
            {QUESTIONS.map((q) => (
               <MoleculeReveal key={q} title={t(`q${q}`)}>
                  {t(`a${q}`)}
               </MoleculeReveal>
            ))}
         </div>

         <div className="mt-12 text-center">
            <p className="text-neutral/70 mb-4">{t('stillQuestions')}</p>
            <AtomButton href="/about" size="md" type="link" variant="OUTLINE">
               {t('contactUs')}
            </AtomButton>
         </div>
      </section>
   )
}
