'use client'
import { useTranslations } from 'next-intl'

import { AtomBadge, AtomProgressPercentage, AtomText, AtomTitle } from '@/components/atoms'
import { MoleculeLockedOverlay } from '@/components/molecules'

type OrganismGrammarProgressCardProps = {
   completedTopics: number
   totalTopics: number
   isGuest?: boolean
}

export const OrganismGrammarProgressCard = ({
   completedTopics,
   totalTopics,
   isGuest = false
}: OrganismGrammarProgressCardProps) => {
   const t = useTranslations('locked.grammarProgress')

   // Show sample data for guests (35% progress)
   const displayPercentage = isGuest ? 35 : totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0
   const displayCompleted = isGuest ? 6 : completedTopics
   const displayTotal = isGuest ? 16 : totalTopics
   const isComplete = displayCompleted === displayTotal

   const cardContent = (
      <div className="container-card h-full p-6">
         {/* Header with badge if priority */}
         <div className="mb-6 flex items-start justify-between">
            <div className="flex items-start gap-3">
               <span className="text-xl">📘</span>
               <div>
                  <div className="flex items-center gap-3">
                     <AtomTitle type="h3">Gramática A1</AtomTitle>
                     {isComplete && <AtomBadge color="success">Completado</AtomBadge>}
                  </div>
                  <AtomText className="mt-1" fontSize="medium" isThin>
                     Base fundamental para comprender artículos
                  </AtomText>
               </div>
            </div>
            <AtomText color="primary" fontSize="medium" isBold>
               {displayPercentage}%
            </AtomText>
         </div>

         {/* Progress Bar */}
         <div className="mb-6">
            <AtomProgressPercentage value={displayPercentage} />
         </div>

         {/* Stats */}
         <div className="flex flex-col gap-2">
            <AtomText fontSize="medium" isBold>
               {displayCompleted} de {displayTotal} temas completados
            </AtomText>
         </div>
      </div>
   )

   return (
      <MoleculeLockedOverlay description={t('description')} showOverlay={isGuest} title={t('title')}>
         {cardContent}
      </MoleculeLockedOverlay>
   )
}
