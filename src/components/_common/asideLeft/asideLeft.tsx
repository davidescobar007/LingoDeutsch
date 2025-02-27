/* eslint-disable react/forbid-component-props */
'use client'
import { FunctionComponent } from 'react'
import { TbBook2 } from 'react-icons/tb'
import { TbBrain, TbHome } from 'react-icons/tb'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AtomTitle, Icon } from '@/components/atoms'
import { useLogin } from '@/hooks/user'
import { getUserInfo } from '@/modules/actions/users.actions'
import { grammarLevels } from '@/modules/global.types'
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
               <Link className="flex items-center" href="/app/learn">
                  <Icon icon={<TbHome />} />
                  <AtomTitle extraClassName="hidden lg:block mb-0">{t('menu.home')}</AtomTitle>
               </Link>
            </li>
            <li className={`mb-2 ${pathname === `/app/practice` && selectedStyles}`}>
               {/* <Link href="/app/practice">
                  <span className="">
                     <TbBrain />
                  </span>
                  <AtomTitle extraClassName="hidden lg:block">{t('menu.practice')}</AtomTitle>
               </Link> */}
               <Link className="flex items-center" href="/app/practice">
                  <Icon icon={<TbBrain />} />
                  <AtomTitle extraClassName="hidden lg:block mb-0">{t('menu.practice')}</AtomTitle>
               </Link>
            </li>
            <li>
               <details>
                  <summary>
                     <span className="">
                        <TbBook2 />
                     </span>
                     <AtomTitle extraClassName="hidden lg:block">{t('menu.grammar')}</AtomTitle>
                  </summary>
                  <ul>
                     {grammarLevels.map(({ icon, label }) => (
                        <li key={label}>
                           <Link className="my-1 justify-between py-3 " href={`/app/grammar/${label}`}>
                              {icon} {label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </details>
            </li>
         </ul>

         <ul className="menu">
            {/* <li className="bg-red-4000 mb-2">
               <details>
                  <summary className="px-6 py-3">
                     <span className=" ">
                        <TbLanguage />
                     </span>
                  </summary>
                  <ul>
                     <li>
                        <div
                           className="my-1 justify-between py-3 "
                           onClick={() => router.push('/app/learn', { locale: 'de' })}
                        >
                           {t('menu.germanOption')}
                           <span className="">
                              <Image
                                 alt="German flag"
                                 height={25}
                                 priority
                                 src="https://flagsapi.com/DE/flat/64.png"
                                 width={30}
                              />
                           </span>
                        </div>
                     </li>
                     <li>
                        <div
                           className="my-1 justify-between py-3 "
                           onClick={() => router.push('/app/learn', { locale: 'es' })}
                        >
                           {t('menu.spanishOption')}
                           <span className="">
                              <Image
                                 alt="Spain flag"
                                 height={27}
                                 priority
                                 src="https://flagsapi.com/ES/flat/64.png"
                                 width={35}
                              />
                           </span>
                        </div>
                     </li>
                  </ul>
               </details>
            </li> */}

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
