'use client'
/* eslint-disable react/forbid-component-props */

import { FcGoogle } from 'react-icons/fc'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { TbLanguage, TbLogout, TbUser } from 'react-icons/tb'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { AuthProviderInfo } from 'pocketbase'

import { AtomTitle } from '@/components/atoms'
import { useAuth } from '@/hooks/user'
import { getUserInfo, isUserLoged, logOut } from '@/modules/actions/users.actions'
import { Link, useRouter } from '@/navigation'

const OrganismNavbar = ({ locale }: { locale: string }) => {
   const t = useTranslations()
   const router = useRouter()
   const { authMethods } = useAuth()

   const user = getUserInfo()

   return (
      <header className="border-b-1 navbar border-neutral bg-base-100 flex h-14 px-4 shadow-md md:px-10 lg:px-20">
         <div className="flex-1">
            <div className="w-16 select-none">
               <Link href="/">
                  <Image
                     alt="heart with german flag colors"
                     height={50}
                     priority
                     src="/images/logo.png"
                     width={60}
                  />
               </Link>
            </div>
            <Link href="/">
               <AtomTitle extraClassName="hidden md:block select-none flex content-center" type="h1">
                  LingoDeutsch
               </AtomTitle>
            </Link>
         </div>
         <div className="flex-none gap-2">
            <div className="dropdown dropdown-end dropdown-bottom">
               <label className="btn btn-ghost m-1 " tabIndex={0}>
                  <span className=" ">
                     <TbLanguage />
                  </span>
                  <span className="">
                     <MdOutlineKeyboardArrowDown className="text-gray-600" />
                  </span>
               </label>
               <ul
                  className="menu dropdown-content menu-sm rounded-box bg-base-100 z-[1] mt-3 w-52 p-2 shadow-lg"
                  tabIndex={0}
               >
                  <li>
                     <div className="my-1 justify-between py-3" onClick={() => router.push('/', { locale: 'de' })}>
                        {t('menu.germanOption')}
                        <span className="">
                           <Image
                              alt="German flag"
                              height={25}
                              priority
                              src="https://flagsapi.com/DE/flat/64.png"
                              width={35}
                           />
                        </span>
                     </div>
                  </li>
                  <li>
                     <div className="my-1 justify-between py-3" onClick={() => router.push('/', { locale: 'es' })}>
                        {t('menu.spanishOption')}
                        <span className="">
                           <Image
                              alt="Spain flag"
                              height={25}
                              priority
                              src="https://flagsapi.com/ES/flat/64.png"
                              width={35}
                           />
                        </span>
                     </div>
                  </li>
               </ul>
            </div>
            {isUserLoged && user ? (
               <div className="dropdown-end dropdown">
                  <label className="avatar btn btn-circle btn-ghost" tabIndex={0}>
                     <div className="w-10 rounded-full">
                        <Image alt="avatar" height={50} src={user?.avatarUrl || ''} width={50} />
                     </div>
                  </label>
                  <ul
                     className="menu dropdown-content menu-sm rounded-box bg-base-100 mt-3 w-52 p-2 shadow-lg"
                     tabIndex={0}
                  >
                     <li>
                        <Link className="my-1 justify-between py-3" href="/profile">
                           {t('menu.profile')}
                           <span className="">
                              <TbUser />
                           </span>
                        </Link>
                     </li>
                     <li>
                        <Link className="my-1 justify-between py-3" href="/" onClick={() => logOut()}>
                           {t('menu.logOut')}
                           <span className="">
                              <TbLogout />
                           </span>
                        </Link>
                     </li>
                  </ul>
               </div>
            ) : (
               <div>
                  {authMethods?.map((provider: AuthProviderInfo) => (
                     <a
                        className="btn btn-outline btn-primary"
                        href={`${provider.authUrl + process.env.NEXT_PUBLIC_ENVIRONMENT}/${locale}/app/home`}
                        key={provider.authUrl}
                        role="button"
                     >
                        <span className="mr-1 ">
                           <FcGoogle />
                        </span>
                        <span className="block font-bold md:hidden">{t('menu.logIn')}</span>
                        <span className="hidden font-bold md:block">{t('menu.loginWithGoogle')}</span>
                     </a>
                  ))}
               </div>
            )}
         </div>
      </header>
   )
}

export default OrganismNavbar
