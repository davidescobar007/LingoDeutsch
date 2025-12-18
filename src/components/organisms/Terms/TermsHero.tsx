'use client'

import { useTranslations } from 'next-intl'

export const OrganismTermsHero = () => {
   const t = useTranslations('terms')

   return (
      <section className="bg-primary relative py-20 pb-32">
         <div className="container relative mx-auto px-6 py-12 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
               <h1 className="mb-6 text-5xl font-bold leading-tight text-white drop-shadow-lg sm:text-6xl">
                  {t('hero.title')}
               </h1>

               <p className="mx-auto max-w-2xl text-xl text-white/90 drop-shadow-md sm:text-2xl">
                  {t('hero.subtitle')}
               </p>
            </div>
         </div>

         {/* Wave divider */}
         <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg
               className="relative block h-[80px] w-[calc(100%+1.3px)] sm:h-[180px] md:h-[120px]"
               preserveAspectRatio="none"
               viewBox="0 0 1200 120"
               xmlns="http://www.w3.org/2000/svg"
            >
               <path d="M0,0 C150,80 350,0 600,60 C850,120 1050,40 1200,80 L1200,120 L0,120 Z" fill="#F9FAFB" />
            </svg>
         </div>
      </section>
   )
}
