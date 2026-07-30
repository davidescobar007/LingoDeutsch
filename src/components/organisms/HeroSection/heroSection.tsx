'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AtomButton } from '@/components/atoms'
import { Link } from '@/navigation'

export const OrganismHeroSection = () => {
   const t = useTranslations('landing.hero')

   return (
      <section className="mx-auto max-w-4xl px-6 py-20 text-center md:py-32">
         <span className="bg-primary/10 text-primary mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
            {t('badge')}
         </span>

         <h1 className="text-neutral mx-auto mb-6 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            {t('title')}
         </h1>

         <p className="text-neutral/70 mx-auto mb-10 max-w-2xl text-lg leading-relaxed md:text-xl">
            {t('subtitle')}
         </p>

         <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
            <AtomButton href="/app/home" size="lg" type="link" variant="PRIMARY">
               {t('ctaPrimary')}
            </AtomButton>
            <Link
               className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-lg font-medium transition-colors"
               href="#demo"
            >
               {t('ctaSecondary')}
               <span aria-hidden>→</span>
            </Link>
         </div>

         {/* Product screenshot — Notion style */}
         <div className="">
            <div className="border-base-300 overflow-hidden rounded-2xl border shadow-2xl">
               <Image
                  alt={t('screenshotAlt')}
                  className="h-auto w-full"
                  height={800}
                  priority
                  src="/images/homepage.png"
                  width={1200}
               />
            </div>
         </div>
      </section>
   )
}
