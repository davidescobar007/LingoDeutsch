'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link } from '@/navigation'

export const OrganismFooterSection = () => {
   const t = useTranslations('footer')
   const currentYear = new Date().getFullYear()

   return (
      <footer className="border-base-300 bg-base-100 border-t py-12">
         <div className="mx-auto max-w-5xl px-6 text-center">
            <div className="mb-8 flex justify-center">
               <Image alt="blabling logo" height={60} priority src="/images/logo4.svg" width={70} />
            </div>

            <nav className="text-neutral/60 mb-8 flex flex-wrap justify-center gap-8 font-medium">
               <Link className="hover:text-primary transition-colors" href="/about">
                  {t('about')}
               </Link>
               <Link className="hover:text-primary transition-colors" href="/contact">
                  {t('contact')}
               </Link>
               <Link className="hover:text-primary transition-colors" href="/terms">
                  {t('terms')}
               </Link>
               <Link className="hover:text-primary transition-colors" href="/privacy">
                  {t('privacy')}
               </Link>
            </nav>

            <p className="text-neutral/40 text-sm">{t('copyright', { year: currentYear })}</p>
         </div>
      </footer>
   )
}
