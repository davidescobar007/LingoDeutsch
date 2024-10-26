/* eslint-disable react/forbid-component-props */
'use client'
import { TbLanguage } from 'react-icons/tb'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import AtomTitle from '@/components/atoms/title'
import { TUser } from '@/modules/actions/types'
import { getUserInfo, isUserLoged } from '@/modules/actions/users.actions'
import { grammarLevels } from '@/modules/global.types'
import { Link, usePathname, useRouter } from '@/navigation'

const selectedStyles = 'rounded-xl border-2'
const OrganismMenu = () => {
   const pathname = usePathname()
   const t = useTranslations()
   const user = getUserInfo() as TUser
   const router = useRouter()

   return (
      <nav className=" min-h-full border-r-2 border-gray-300 p-4">
         <ul className="menu">
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
               <Link href="/app/learn">
                  <span className="text-3xl">📖</span>
                  <AtomTitle extraClassName="hidden lg:block">{t('menu.learn')}</AtomTitle>
               </Link>
            </li>
            <li className={`mb-2 ${pathname === `/app/practice` && selectedStyles}`}>
               <Link href="/app/practice">
                  <span className="text-3xl">💪</span>
                  <AtomTitle extraClassName="hidden lg:block">{t('menu.practice')}</AtomTitle>
               </Link>
            </li>
            <li>
               <details>
                  <summary>
                     <span className="text-3xl">📓</span>
                     <AtomTitle extraClassName="hidden lg:block">{t('menu.grammar')}</AtomTitle>
                  </summary>
                  <ul>
                     {grammarLevels.map(({ icon, label }) => (
                        <li key={label}>
                           <Link className="my-1 justify-between py-3 text-lg" href={`/app/grammar/${label}`}>
                              {icon} {label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </details>
            </li>

            {isUserLoged() && (
               <li className={`mb-2 ${pathname === `/app/profile` && selectedStyles}`}>
                  <Link className="w-full" href="/app/profile">
                     <div className="avatar ml-2">
                        <div className="w-8 rounded-xl">
                           <Image
                              alt="avatar"
                              height={35}
                              src={user?.avatarUrl || user?.avatar || ''}
                              width={33}
                           />
                        </div>
                     </div>
                     <AtomTitle extraClassName="hidden lg:block ml-1">{t('menu.profile')}</AtomTitle>
                  </Link>
               </li>
            )}

            <li className="mb-2">
               <details className="px-2 pr-3">
                  <summary>
                     <span className=" text-3xl">
                        <TbLanguage />
                     </span>
                  </summary>
                  <ul>
                     <li>
                        <div
                           className="my-1 justify-between py-3 text-lg"
                           onClick={() => router.push('/app/learn', { locale: 'de' })}
                        >
                           {t('menu.germanOption')}
                           <span className="text-lg">
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
                           className="my-1 justify-between py-3 text-lg"
                           onClick={() => router.push('/app/learn', { locale: 'es' })}
                        >
                           {t('menu.spanishOption')}
                           <span className="text-lg">
                              <Image
                                 alt="Spain flag"
                                 height={25}
                                 priority
                                 src="https://flagsapi.com/ES/flat/64.png"
                                 width={30}
                              />
                           </span>
                        </div>
                     </li>
                  </ul>
               </details>
            </li>
         </ul>
      </nav>
   )
}

export default OrganismMenu
