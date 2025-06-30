/* eslint-disable react/forbid-component-props */
'use client'
import { FunctionComponent } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AtomText, AtomTitle, Icon } from '@/components/atoms'
import { useLogin } from '@/hooks/user'
import { getUserInfo } from '@/modules/actions/users.actions'
import { Link, usePathname, useRouter } from '@/navigation'
const selectedStyles = 'rounded-xl border-2'

export const OrganismMenu: FunctionComponent = () => {
   const pathname = usePathname()
   const t = useTranslations()
   const router = useRouter()

   const { data: userFromLoginMethod } = useLogin()
   const userFromLoggedInfo = getUserInfo()

   const user = userFromLoggedInfo || userFromLoginMethod

   return (
      <nav className="flex min-h-full flex-col justify-between border-r-2 border-gray-300 p-4">
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
                     LingoDeutsch
                  </AtomTitle>
               </Link>
            </li>
            <li className={`mb-2 ${pathname === `/app/learn` && selectedStyles}`}>
               <Link className="flex items-center" href="/app/home">
                  <Icon icon="home" iconSize="medium" />
                  <AtomText className="mb-0 hidden lg:block" fontSize="large" isBold>
                     {t('menu.home')}
                  </AtomText>
               </Link>
            </li>
            <li className={`mb-2 ${pathname === `/app/grammar` && selectedStyles}`}>
               <Link className="flex items-center" href="/app/grammar">
                  <Icon icon="book" iconSize="medium" />
                  <AtomText className="hidden lg:block" fontSize="large" isBold>
                     {t('menu.grammar')}
                  </AtomText>
               </Link>
            </li>
            <li className={`mb-2 ${pathname === `/app/article` && selectedStyles}`}>
               <Link className="flex items-center" href="/app/article">
                  <Icon icon="scroll-text" iconSize="medium" />
                  <AtomText className="hidden lg:block" fontSize="large" isBold>
                     Lectura
                  </AtomText>
               </Link>
            </li>
            <li className={`mb-2 ${pathname === `/app/vocabulary` && selectedStyles}`}>
               <Link className="flex items-center" href="/app/vocabulary">
                  <Icon icon="brain" iconSize="medium" />
                  <AtomText className="hidden lg:block" fontSize="large" isBold>
                     Vocabulario
                  </AtomText>
               </Link>
            </li>
         </ul>

         <ul className="menu">
            {user && (
               <li className={`${pathname === `/app/profile` && selectedStyles} bg-red-4000`}>
                  <Link className="flex items-center" href="/app/profile">
                     <div className="avatar ml-2">
                        <div className="w-9 rounded-xl">
                           <Image
                              alt="avatar"
                              height={45}
                              src={user?.avatarUrl || user?.avatar || ''}
                              width={45}
                           />
                        </div>
                     </div>
                     <AtomTitle extraClassName="hidden lg:block">{t('menu.profile')}</AtomTitle>
                  </Link>
               </li>
            )}
         </ul>
      </nav>
   )
}
