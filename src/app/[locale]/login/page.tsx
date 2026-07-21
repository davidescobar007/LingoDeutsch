/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { use, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { AuthProviderInfo } from 'pocketbase'

import { AtomText, AtomTitle } from '@/components/atoms'
import { useAuth } from '@/hooks/user'
import { useAuthState } from '@/providers/AuthProvider'

const Login = ({ params }: { params: Promise<{ locale: string }> }) => {
   const { locale } = use(params)
   const router = useRouter()
   const t = useTranslations()
   const { authMethods } = useAuth()
   const { user, isLoading: isLoadingUser } = useAuthState()

   // Redirect if user is already logged in
   useEffect(() => {
      if (!isLoadingUser && user?.id) {
         router.push(`/${locale}/app/home`)
      }
   }, [user, isLoadingUser, router, locale])

   // Show loading while checking authentication
   if (isLoadingUser) {
      return (
         <div className="bg-base-200 flex h-screen w-full items-center justify-center overflow-y-auto">
            <div className="flex flex-col items-center gap-4">
               <span className="loading loading-spinner loading-lg text-primary" />
               <p className="text-sm text-gray-600">{t('login.checkingAuth') || 'Checking authentication...'}</p>
            </div>
         </div>
      )
   }

   // Don't render login form if user is authenticated
   if (user?.id) {
      return null
   }

   return (
      <div className="bg-base-200 flex h-screen w-full items-center justify-center overflow-y-auto p-4">
         <div className="card bg-base-100 w-full max-w-md shadow-xl">
            {/* Card Header - Logo/Brand */}
            <figure className="from-primary bg-gradient-to-br via-purple-600 to-indigo-700 px-10 pt-10">
               <div className="flex flex-col items-center gap-4 pb-8">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                     <BookOpen className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-center">
                     <AtomTitle extraClassName="text-white" type="h1">
                        {t('login.welcome')}
                     </AtomTitle>
                     <AtomText className="text-white/90" fontSize="small">
                        {t('login.subtitle')}
                     </AtomText>
                  </div>
               </div>
            </figure>

            {/* Card Body - Login Content */}
            <div className="card-body">
               <AtomText className="text-center" fontSize="small">
                  {t('login.description')}
               </AtomText>

               {/* Card Actions - Google Button */}
               <div className="card-actions mt-4 justify-center">
                  {authMethods?.map((provider: AuthProviderInfo) => (
                     <a
                        className="btn btn-outline btn-primary"
                        href={`${provider.authURL}${window.location.origin}/${locale}/app/home`}
                        key={provider.authURL}
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

               {/* Footer Text */}
               <AtomText className="mt-4 text-center opacity-60" fontSize="small">
                  {t('login.footer')}
               </AtomText>
            </div>
         </div>
      </div>
   )
}

export default Login
