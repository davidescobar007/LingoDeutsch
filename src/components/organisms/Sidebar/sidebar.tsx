/* eslint-disable react/forbid-component-props */
'use client'
import { FunctionComponent } from 'react'
import { LogIn } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AtomText, AtomTitle, Icon } from '@/components/atoms'
import { getUserInfo } from '@/modules/actions/users.actions'
import { Link, usePathname } from '@/navigation'
import { pb } from '@/network/setup'
const selectedStyles = 'rounded-xl border-2 border-primary/50 bg-primary/10'

export const OrganismSidebar: FunctionComponent = () => {
   const pathname = usePathname()
   const t = useTranslations()
   const currentYear = new Date().getFullYear()

   const user = getUserInfo()

   return (
      <nav className="flex min-h-full flex-col justify-between border-r-2 border-gray-300 py-4">
         <ul className="menu bg-red-3000 h-full min-h-full">
            <li className="mb-2">
               <Link className="hover:bg-inherit" href="/">
                  <Image
                     alt="heart with german flag colors"
                     className="-ml-1 block lg:hidden"
                     height={57}
                     priority
                     src="/images/logo.png"
                     width={57}
                  />
                  <AtomTitle extraClassName="hidden lg:block" type="h1">
                     Blabling
                  </AtomTitle>
               </Link>
            </li>
            <li className={`mb-2 ${pathname === `/app/home` && selectedStyles}`}>
               <Link className="flex items-center" href="/app/home">
                  <Icon icon="home" iconSize="medium" />
                  <AtomText className="mb-0" fontSize="medium" isBold>
                     {t('menu.home')}
                  </AtomText>
               </Link>
            </li>
            <li className={`mb-2 ${pathname === `/app/grammar` && selectedStyles}`}>
               <Link className="flex items-center" href="/app/grammar">
                  <Icon icon="book" iconSize="medium" />
                  <AtomText fontSize="medium" isBold>
                     {t('menu.grammar')}
                  </AtomText>
               </Link>
            </li>
            <li className={`mb-2 ${pathname === `/app/article` && selectedStyles}`}>
               <Link className="flex items-center" href="/app/article">
                  <Icon icon="scroll-text" iconSize="medium" />
                  <AtomText fontSize="medium" isBold>
                     Lectura
                  </AtomText>
               </Link>
            </li>
            <li className={`mb-2 ${pathname === `/app/vocabulary` && selectedStyles}`}>
               <Link className="flex items-center" href="/app/vocabulary">
                  <Icon icon="brain" iconSize="medium" />
                  <AtomText fontSize="medium" isBold>
                     Vocabulario
                  </AtomText>
               </Link>
            </li>
         </ul>

         <div className="flex flex-col gap-2">
            <ul className="menu">
               {pb.authStore.isValid ? (
                  <li className={`${pathname === `/app/profile` && selectedStyles}`}>
                     <Link className="flex items-center" href="/app/profile">
                        <div className="avatar">
                           <div className="w-9 rounded-xl">
                              <Image
                                 alt="avatar"
                                 height={45}
                                 src={user?.avatarUrl || user?.avatar || ''}
                                 width={45}
                              />
                           </div>
                        </div>
                        <AtomTitle extraClassName="mt-3" type="h3">
                           {t('menu.profile')}
                        </AtomTitle>
                     </Link>
                  </li>
               ) : (
                  <li className={`mb-2 ${pathname === `/app/article` && selectedStyles}`}>
                     <Link className="flex items-end justify-start" href="/login">
                        <LogIn />
                        <AtomText fontSize="medium" isBold>
                           Iniciar sesión
                        </AtomText>
                     </Link>
                  </li>
               )}
            </ul>

            {/* Footer Links */}
            <div className="border-t border-gray-300 px-4 pt-3">
               <ul className="space-y-1">
                  <li>
                     <Link className="hover:text-primary text-xs text-gray-600 hover:underline" href="/about">
                        {t('footer.about')}
                     </Link>
                  </li>
                  <li>
                     <Link className="hover:text-primary text-xs text-gray-600 hover:underline" href="/terms">
                        {t('footer.terms')}
                     </Link>
                  </li>
               </ul>
               <p className="mt-2 text-xs text-gray-500">© {currentYear} LingoDeutsch</p>
            </div>
         </div>
      </nav>
   )
}
