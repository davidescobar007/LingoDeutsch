'use client'
import { useTranslations } from 'next-intl'

import { AtomButton, AtomText, AtomTitle } from '@/components/atoms'

type OrganismWelcomeHeroProps = {
   userName: string
   isGuest?: boolean
   extraClassName?: string
}

export const OrganismWelcomeHero = ({
   userName,
   isGuest = false,
   extraClassName = ''
}: OrganismWelcomeHeroProps) => {
   const t = useTranslations('locked.welcomeHero')

   if (isGuest) {
      return (
         <div className={`mb-8 ${extraClassName}`}>
            <AtomTitle extraClassName="mb-2" type="h2">
               🇩🇪 {t('guestTitle')}
            </AtomTitle>
            <AtomText className="mb-4 block" type="span">
               {t('guestSubtitle')}
            </AtomText>
            <AtomButton href="/login" type="link" variant="PRIMARY">
               {t('guestCta')} →
            </AtomButton>
         </div>
      )
   }

   return (
      <div className={`mb-8 ${extraClassName}`}>
         <AtomTitle extraClassName="mb-2" type="h2">
            👋 Hola {userName}, ¿listo para aprender alemán hoy?
         </AtomTitle>
         <AtomText type="span">Comienza tu lección diaria y sigue aprendiendo.</AtomText>
      </div>
   )
}
