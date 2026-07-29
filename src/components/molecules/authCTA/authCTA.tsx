'use client'

import { FcGoogle } from 'react-icons/fc'
import { ArrowLeft, Lock } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { AuthProviderInfo } from 'pocketbase'

import { AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { useAuth } from '@/hooks/user'
import { Link } from '@/navigation'

type MoleculeAuthCTAProps = {
   description?: string
   onBack?: () => void
   compact?: boolean
   title?: string
}

export const MoleculeAuthCTA = ({
   onBack = undefined,
   compact = false,
   title,
   description
}: MoleculeAuthCTAProps) => {
   const t = useTranslations()
   const locale = useLocale()
   const { authMethods } = useAuth()

   const resolvedTitle = title ?? t('authCta.title')
   const resolvedDescription = description ?? t('authCta.description')

   if (compact) {
      return (
         <div className="flex flex-col items-center space-y-4 p-4 text-center">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
               <Lock className="text-primary h-6 w-6" />
            </div>
            <div>
               <AtomText fontSize="medium" isBold>
                  {resolvedTitle}
               </AtomText>
               <AtomText fontSize="small" isThin>
                  {resolvedDescription}
               </AtomText>
            </div>
            <div className="flex w-full flex-col gap-2">
               {authMethods?.map((provider: AuthProviderInfo) => (
                  <Link
                     className="btn btn-primary btn-sm flex items-center justify-center gap-2"
                     href={`${provider.authURL}${window.location.origin}/${locale}/app/home`}
                     key={provider.authURL}
                  >
                     <FcGoogle className="h-4 w-4" />
                     <span>{t('menu.loginWithGoogle')}</span>
                  </Link>
               ))}
               <AtomButton onClick={onBack} size="sm" variant="GHOST">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  {t('authCta.back')}
               </AtomButton>
            </div>
         </div>
      )
   }

   return (
      <div className="flex flex-col items-center space-y-6 p-6 text-center">
         <div className="from-primary/20 to-primary/10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br">
            <Lock className="text-primary h-8 w-8" />
         </div>

         <div className="space-y-2">
            <AtomTitle type="h4">{resolvedTitle}</AtomTitle>
            <AtomText fontSize="small" isThin>
               {resolvedDescription}
            </AtomText>
         </div>

         <div className="flex w-full flex-col gap-3">
            {authMethods?.map((provider: AuthProviderInfo) => (
               <Link
                  className="btn btn-primary btn-block flex items-center justify-center gap-2"
                  href={`${provider.authURL}${window.location.origin}/${locale}/app/home`}
                  key={provider.authURL}
               >
                  <FcGoogle className="h-5 w-5" />
                  <span>{t('menu.loginWithGoogle')}</span>
               </Link>
            ))}

            {onBack && <div className="divider text-xs">{t('authCta.or')}</div>}
            {onBack && (
               <AtomButton isBlock onClick={onBack} variant="GHOST">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('authCta.backToTranslation')}
               </AtomButton>
            )}
         </div>

         <AtomText className="text-center text-xs opacity-60" fontSize="small" isThin>
            {t('login.footer')}
         </AtomText>
      </div>
   )
}
