import { AtomText, Icon } from '@/components/atoms'
import { Link } from '@/navigation'

type VocabularyStats = {
   totalWords?: number
   learnedWords?: number
   wordsLearnedToday?: number
   streak?: number
   weakWords?: number
   dueForReview?: number
}

type VocabularyPreviewProps = {
   vocabularyStats?: VocabularyStats
}

type VocabularyCard = {
   id: string
   label: string
   value: number
   colorLight: string
   colorDark: string
   icon?: string
}

const defaultVocabularyStats: VocabularyStats = {}

export const OrganismVocabularyPreview = ({
   vocabularyStats = defaultVocabularyStats
}: VocabularyPreviewProps) => {
   const totalWords = vocabularyStats?.totalWords || 0
   const dueForReview = vocabularyStats?.dueForReview || 0
   const weakWords = vocabularyStats?.weakWords || 0

   // Define the 3 actionable vocabulary cards with theme-aligned colors
   const vocabularyCards: VocabularyCard[] = [
      {
         id: 'total',
         label: 'Total palabras',
         value: totalWords,
         colorLight: 'text-info',
         colorDark: 'dark:text-info'
      },
      {
         id: 'due',
         label: 'Pendientes de revisar',
         value: dueForReview,
         colorLight: 'text-warning',
         colorDark: 'dark:text-warning',
         icon: '⏰'
      },
      {
         id: 'weak',
         label: 'Palabras difíciles',
         value: weakWords,
         colorLight: 'text-error',
         colorDark: 'dark:text-error',
         icon: '🎯'
      }
   ]

   const getCardStyles = (card: VocabularyCard) => {
      const baseStyles =
         'flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border px-6 py-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform-gpu'

      switch (card.id) {
         case 'total':
            return `${baseStyles} bg-gradient-to-br from-info/10 to-info/20 border-info/30 hover:border-info/50 hover:from-info/15 hover:to-info/25`
         case 'due':
            return `${baseStyles} bg-gradient-to-br from-warning/10 to-warning/20 border-warning/30 hover:border-warning/50 hover:from-warning/15 hover:to-warning/25`
         case 'weak':
            return `${baseStyles} bg-gradient-to-br from-error/10 to-error/20 border-error/30 hover:border-error/50 hover:from-error/15 hover:to-error/25`
         default:
            return baseStyles
      }
   }

   const getCardLink = (cardId: string) => {
      switch (cardId) {
         case 'total':
            return 'vocabulary'
         case 'due':
            return 'vocabulary?filter=due'
         case 'weak':
            return 'vocabulary?filter=weak'
         default:
            return 'vocabulary'
      }
   }

   const getCardValueClasses = (card: VocabularyCard) => {
      return `text-3xl font-bold ${card.colorLight} ${card.colorDark}`
   }

   return (
      <div className="flex w-full flex-wrap justify-between gap-4 pt-10">
         <div className="flex w-full justify-between">
            <AtomText fontSize="large" isBold>
               Tu Vocabulario
            </AtomText>
            <Link href="vocabulary">
               <AtomText className="flex items-center justify-center gap-1" isBold isPrimary>
                  Empezar <Icon className="text-primary" icon="move-right" iconSize="small" />
               </AtomText>
            </Link>
         </div>

         <div className="flex w-full flex-wrap gap-4 sm:flex-nowrap">
            {vocabularyCards.map((card) => (
               <Link className="w-full sm:flex-1" href={getCardLink(card.id)} key={card.id}>
                  <div className={getCardStyles(card)}>
                     <AtomText className="mb-2 text-center" fontSize="small" isThin>
                        {card.label}
                     </AtomText>

                     <div className="flex items-center gap-2">
                        {card.icon && <span className="animate-pulse text-2xl">{card.icon}</span>}
                        <span className={`${getCardValueClasses(card)} drop-shadow-sm`}>{card.value}</span>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   )
}
