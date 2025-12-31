'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link } from '@/navigation'

export const OrganismFooterSection = () => {
   const t = useTranslations('footer')

   return (
      <footer className="border-t border-gray-100 bg-white py-12">
         <div className="container mx-auto px-4 text-center">
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

            <div className="mb-8 flex justify-center gap-6">
               {/* Social Placeholders */}
               {[1, 2, 3].map((i) => (
                  <div
                     className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-blue-100 hover:text-blue-500"
                     key={i}
                  >
                     •
                  </div>
               ))}
            </div>

            <p className="text-neutral/40 text-sm">
               © 2025 Blabling. Todos los derechos reservados.
               <br />
               <span className="mt-2 block text-xs">Hecho con ❤️ para estudiantes de alemán.</span>
            </p>
         </div>
      </footer>
   )
}
