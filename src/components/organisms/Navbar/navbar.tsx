'use client'
/* eslint-disable react/forbid-component-props */

import { FcGoogle } from 'react-icons/fc'
import { TbLogout, TbUser } from 'react-icons/tb'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { AuthProviderInfo } from 'pocketbase'

import { AtomTitle } from '@/components/atoms'
import { useAuth } from '@/hooks/user'
import { getUserInfo, isUserLoged, logOut } from '@/modules/actions/users.actions'
import { Link, useRouter } from '@/navigation'

const OrganismNavbar = ({ locale }: { locale: string }) => {
   const t = useTranslations()
   const _router = useRouter()
   const { authMethods } = useAuth()

   const user = getUserInfo()

   return (
      <header className="border-b-1 navbar border-neutral bg-primary sticky top-0 z-50 flex h-14 items-center px-4 md:px-10 lg:px-20">
         <div className="flex flex-1 items-center gap-2">
            <div className="-mt-2 w-16 select-none">
               <Link href="/">
                  <Image alt="blabling logo" height={50} priority src="/images/logo4.svg" width={60} />
               </Link>
            </div>
            <Link href="/">
               <AtomTitle extraClassName="hidden md:block select-none text-white mt-2" type="h1">
                  Blabling
               </AtomTitle>
            </Link>
         </div>
         <div className="flex flex-none items-center gap-2">
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
                        className="btn text-primary bg-white hover:bg-gray-100"
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
