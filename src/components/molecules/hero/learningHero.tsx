import React, { FunctionComponent } from 'react'

import { AtomText, AtomTitle } from '@/components/atoms'
import { TUser } from '@/modules/actions/types'

type TVocabularyStats = {
   percentageDominated?: number
   streak?: number
   totalWords?: number
   learnedWords?: number
   wordsLearnedToday?: number
}

type TMoleculeHeroProps = {
   title: string
   subtitle: string
   ctaButton: string
   user: TUser | null
   vocabularyStats?: TVocabularyStats | null
}

export const MoleculeLearningHero: FunctionComponent<TMoleculeHeroProps> = ({
   title,
   subtitle,
   ctaButton,
   user,
   vocabularyStats = null
}) => {
   // Get translations from the parent component, so we don't need to import useTranslations here
   return (
      <div className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-4 text-white shadow-lg sm:p-6">
         {/* Background decorative elements */}
         <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-white opacity-20 sm:-right-16 sm:-top-16 sm:h-64 sm:w-64" />
         <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-indigo-200 opacity-20 sm:-bottom-20 sm:-left-20 sm:h-72 sm:w-72" />
         <div className="absolute right-8 top-12 h-12 w-12 rounded-full bg-blue-300 opacity-15 sm:right-20 sm:top-10 sm:h-16 sm:w-16" />

         <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
            <div className="md:w-3/5">
               <div className="inline-block rounded-full bg-indigo-600 bg-opacity-20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm sm:px-3 sm:text-sm">
                  {new Date().toLocaleDateString(undefined, {
                     weekday: 'long',
                     month: 'long',
                     day: 'numeric'
                  })}
               </div>
               <AtomTitle extraClassName="mb-1 mt-2 sm:mt-3   text-white !mb-1 drop-shadow-sm" type="h4">
                  {title.replace('{name}', user?.name || '')} 👋
               </AtomTitle>
               <AtomText className="mb-4 text-sm text-white text-opacity-90 sm:text-base" type="paragraph">
                  {vocabularyStats?.streak
                     ? `¡Excelente trabajo! Llevas ${vocabularyStats.streak} días consecutivos aprendiendo.`
                     : '¡Comienza a aprender hoy y alcanza tus metas!'}
               </AtomText>
            </div>
         </div>
      </div>
   )
}
