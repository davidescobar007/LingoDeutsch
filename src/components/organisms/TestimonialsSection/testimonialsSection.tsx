'use client'

import { useTranslations } from 'next-intl'

import { MoleculeTestimonialCard } from '@/components/molecules'

export const OrganismTestimonialsSection = () => {
   const t = useTranslations('landing.testimonials')

   return (
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
         <div className="mb-16 text-center">
            <span className="text-primary mb-4 block text-sm font-medium">{t('badge')}</span>
            <h2 className="text-neutral mb-4 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
            <p className="text-neutral/70 mx-auto max-w-2xl text-lg">{t('subtitle')}</p>
         </div>

         {/* Featured testimonial (Notion "read the full story" style) */}
         <MoleculeTestimonialCard
            avatar={t('name1').charAt(0)}
            isFeatured
            name={t('name1')}
            quote={t('quote1')}
            rating={5}
            role={t('role1')}
         />

         {/* Two short testimonials */}
         <div className="mt-6 grid gap-6 md:grid-cols-2">
            <MoleculeTestimonialCard
               avatar={t('name2').charAt(0)}
               name={t('name2')}
               quote={t('quote2')}
               rating={5}
               role={t('role2')}
            />
            <MoleculeTestimonialCard
               avatar={t('name3').charAt(0)}
               name={t('name3')}
               quote={t('quote3')}
               rating={5}
               role={t('role3')}
            />
         </div>
      </section>
   )
}
