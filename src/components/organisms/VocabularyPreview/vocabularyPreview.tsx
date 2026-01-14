'use client'
import { useTranslations } from 'next-intl'

import { AtomText, Icon } from '@/components/atoms'
import { MoleculeLockedOverlay } from '@/components/molecules'
import { Link } from '@/navigation'

type VocabularyStats = {
   totalWords?: number
   learnedWords?: number
   wordsLearnedToday?: number
   streak?: number
   weakWords?: number
   dueForReview?: number
   percentageDominated?: number
}

type VocabularyPreviewProps = {
   vocabularyStats?: VocabularyStats
   isGuest?: boolean
}

const defaultVocabularyStats: VocabularyStats = {}

// Sample data for guests to show what the feature looks like
const SAMPLE_STATS = {
   totalWords: 127,
   dueForReview: 8,
   weakWords: 12,
   percentageDominated: 45
}

export const OrganismVocabularyPreview = ({
   vocabularyStats = defaultVocabularyStats,
   isGuest = false
}: VocabularyPreviewProps) => {
   const t = useTranslations('locked.vocabularyPreview')

   // Use sample data for guests
   const stats = isGuest ? SAMPLE_STATS : vocabularyStats
   const totalWords = stats?.totalWords || 0
   const dueForReview = stats?.dueForReview || 0
   const masteryPercentage = Math.round(stats?.percentageDominated || 0)

   const cardContent = (
      <div className="container-card flex w-full flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
         {/* Left: Title & Stats */}
         <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
               <span className="text-2xl">🎯</span>
               <AtomText fontSize="large" isBold>
                  Tu Vocabulario
               </AtomText>
            </div>
            <AtomText className="text-base-content/70" fontSize="medium">
               {totalWords} palabras · {dueForReview} pendientes · {masteryPercentage}% dominado
            </AtomText>
         </div>

         {/* Right: CTA */}
         {!isGuest && dueForReview > 0 && (
            <Link href="/app/vocabulary/practice">
               <AtomText className="flex items-center gap-2 whitespace-nowrap" isBold isPrimary>
                  Practicar <Icon className="text-primary" icon="move-right" iconSize="small" />
               </AtomText>
            </Link>
         )}
      </div>
   )

   return (
      <MoleculeLockedOverlay
         ctaHref="/login"
         description={t('description')}
         showOverlay={isGuest}
         title={t('title')}
      >
         {cardContent}
      </MoleculeLockedOverlay>
   )
}
