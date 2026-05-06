'use client'

import { FcGoogle } from 'react-icons/fc'
import { ArrowLeft, Lock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { AuthProviderInfo } from 'pocketbase'

import { AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { useAuth } from '@/hooks/user'
import { Link } from '@/navigation'

type MoleculeAuthCTAProps = {
   onBack?: () => void
   compact?: boolean
}

const emptyFunction = () => {}

export const MoleculeAuthCTA = ({ onBack = emptyFunction, compact = false }: MoleculeAuthCTAProps) => {
   const t = useTranslations()
   const { authMethods } = useAuth()

   if (compact) {
      return (
         <div className="flex flex-col items-center space-y-4 p-4 text-center">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
               <Lock className="text-primary h-6 w-6" />
            </div>
            <div>
               <AtomText fontSize="medium" isBold>
                  {t('authCta.title')}
               </AtomText>
               <AtomText fontSize="small" isThin>
                  {t('authCta.description')}
               </AtomText>
            </div>
            <div className="flex w-full flex-col gap-2">
               {authMethods?.map((provider: AuthProviderInfo) => (
                  <Link
                     className="btn btn-primary btn-sm flex items-center justify-center gap-2"
                     href={`${provider.authUrl}${window.location.origin}`}
                     key={provider.authUrl}
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
            <AtomTitle type="h4">{t('authCta.title')}</AtomTitle>
            <AtomText fontSize="small" isThin>
               {t('authCta.description')}
            </AtomText>
         </div>

         <div className="flex w-full flex-col gap-3">
            {authMethods?.map((provider: AuthProviderInfo) => (
               <Link
                  className="btn btn-primary btn-block flex items-center justify-center gap-2"
                  href={`${provider.authUrl}${window.location.origin}`}
                  key={provider.authUrl}
               >
                  <FcGoogle className="h-5 w-5" />
                  <span>{t('menu.loginWithGoogle')}</span>
               </Link>
            ))}

            <div className="divider text-xs">{t('authCta.or')}</div>

            <AtomButton isBlock onClick={onBack} variant="GHOST">
               <ArrowLeft className="mr-2 h-4 w-4" />
               {t('authCta.backToTranslation')}
            </AtomButton>
         </div>

         <AtomText className="text-center text-xs opacity-60" fontSize="small" isThin>
            {t('login.footer')}
         </AtomText>
      </div>
   )
}
