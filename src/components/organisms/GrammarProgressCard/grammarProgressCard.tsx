'use client'
import { useTranslations } from 'next-intl'

import { AtomBadge, AtomProgressPercentage, AtomText, AtomTitle } from '@/components/atoms'
import { MoleculeLockedOverlay } from '@/components/molecules'
import { Link } from '@/navigation'

type OrganismGrammarProgressCardProps = {
   completedTopics: number
   nextTopicId?: string
   nextTopicLabel?: string
   totalTopics: number
   isGuest?: boolean
}

export const OrganismGrammarProgressCard = ({
   completedTopics,
   nextTopicId = '',
   nextTopicLabel = 'Próximo tema',
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
      <div className="container-card p-6">
         {/* Header with badge if priority */}
         <div className="mb-6 flex items-start justify-between">
            <div className="flex flex-col gap-2">
               <div className="flex items-center gap-3">
                  <AtomTitle type="h3">📘 Gramática A1</AtomTitle>
                  {isComplete && <AtomBadge color="success">Completado</AtomBadge>}
               </div>
               <AtomText fontSize="medium" isThin>
                  Base fundamental para comprender artículos
               </AtomText>
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
         <div className="mb-6 flex flex-col gap-2">
            <AtomText fontSize="medium" isBold>
               {displayCompleted} de {displayTotal} temas completados
            </AtomText>
         </div>

         {/* CTA Button */}
         {!isGuest && nextTopicId && !isComplete && (
            <Link href={`/app/grammar?topic=${nextTopicId}`}>
               <button className="bg-primary hover:bg-primary/90 w-full rounded-lg px-6 py-3 text-white transition-all duration-300 hover:shadow-lg">
                  <AtomText className="!text-white" fontSize="medium" isBold>
                     Continuar: {nextTopicLabel} →
                  </AtomText>
               </button>
            </Link>
         )}
      </div>
   )

   return (
      <MoleculeLockedOverlay description={t('description')} showOverlay={isGuest} title={t('title')}>
         {cardContent}
      </MoleculeLockedOverlay>
   )
}
