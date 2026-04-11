'use client'
import { BookIcon, BrainIcon, HomeIcon, LogIn, ScrollTextIcon, UserIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link, usePathname } from '@/navigation'
import { useAuthState } from '@/providers/AuthProvider'

const OrganismFooter = () => {
   const pathname = usePathname()
   const t = useTranslations('menu')
   const { user } = useAuthState()
   return (
      <footer className="border-t border-gray-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
         <div className="btm-nav">
            <Link className="transition-transform duration-150 active:scale-95" href="/app/grammar">
               <BookIcon className={pathname === '/app/grammar' ? 'text-primary' : 'text-gray-400'} size={20} />
               <span
                  className={`btm-nav-label text-xs ${
                     pathname === '/app/grammar' ? 'active text-primary font-bold' : 'text-gray-500'
                  }`}
               >
                  {t('grammar')}
               </span>
            </Link>
            <Link className="transition-transform duration-150 active:scale-95" href="/app/article">
               <ScrollTextIcon
                  className={pathname === '/app/article' ? 'text-primary' : 'text-gray-400'}
                  size={20}
               />
               <span
                  className={`btm-nav-label text-xs ${
                     pathname === '/app/article' ? 'active text-primary font-bold' : 'text-gray-500'
                  }`}
               >
                  {t('reading')}
               </span>
            </Link>
            <Link className="transition-transform duration-150 active:scale-95" href="/app/home">
               <HomeIcon className={pathname === '/app/home' ? 'text-primary' : 'text-gray-400'} size={20} />
               <span
                  className={`btm-nav-label text-xs ${
                     pathname === '/app/home' ? 'active text-primary font-bold' : 'text-gray-500'
                  }`}
               >
                  {t('home')}
               </span>
            </Link>
            <Link className="transition-transform duration-150 active:scale-95" href="/app/vocabulary">
               <BrainIcon
                  className={pathname === '/app/vocabulary' ? 'text-primary' : 'text-gray-400'}
                  size={20}
               />
               <span
                  className={`btm-nav-label text-xs ${
                     pathname === '/app/vocabulary' ? 'active text-primary font-bold' : 'text-gray-500'
                  }`}
               >
                  {t('vocabulary')}
               </span>
            </Link>
            {user ? (
               <Link className="transition-transform duration-150 active:scale-95" href="/app/profile">
                  <UserIcon className={pathname === '/app/profile' ? 'text-primary' : 'text-gray-400'} size={20} />
                  <span
                     className={`btm-nav-label text-xs ${
                        pathname === '/app/profile' ? 'active text-primary font-bold' : 'text-gray-500'
                     }`}
                  >
                     {t('profile')}
                  </span>
               </Link>
            ) : (
               <Link className="transition-transform duration-150 active:scale-95" href="/login">
                  <LogIn className="text-gray-400" size={20} />
                  <span className="btm-nav-label text-xs text-gray-500">{t('footerLogIn')}</span>
               </Link>
            )}
         </div>
      </footer>
   )
}

export default OrganismFooter
