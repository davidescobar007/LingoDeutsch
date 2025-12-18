'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link } from '@/navigation'

export const OrganismFooterSection = () => {
   const t = useTranslations('footer')

   return (
      <footer className="footer bg-neutral text-neutral-content p-10">
         <aside>
            <Image alt="blabling logo" height={50} priority src="/images/logo4.svg" width={60} />
            <p>Todos los derechos reservados © 2025 Blabling</p>
         </aside>
         <nav>
            <Link className="link link-hover" href="/about">
               {t('about')}
            </Link>
            <a className="link link-hover">{t('contact')}</a>
         </nav>
         <nav>
            <a className="link link-hover">{t('terms')}</a>
            <a className="link link-hover">{t('privacy')}</a>
         </nav>
      </footer>
   )
}
