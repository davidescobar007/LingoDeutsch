import { AtomText, Icon } from '@/components/atoms'
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
   const masteryPercentage = Math.round(vocabularyStats?.percentageDominated || 0)
   const wordsToday = vocabularyStats?.wordsLearnedToday || 0

   // Define the 5 actionable vocabulary cards with theme-aligned colors
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
      },
      {
         id: 'mastery',
         label: 'Dominio (Easy)',
         value: masteryPercentage,
         colorLight: 'text-success',
         colorDark: 'dark:text-success',
         icon: '🎓'
      },
      {
         id: 'today',
         label: 'Practicadas hoy',
         value: wordsToday,
         colorLight: 'text-primary',
         colorDark: 'dark:text-primary',
         icon: '✅'
      }
   ]

   const getCardStyles = (card: VocabularyCard) => {
      const baseStyles =
         'flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border px-6 py-4 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-102 transform-gpu bg-base-100'

      switch (card.id) {
         case 'total':
            return `${baseStyles} border-info hover:border-info/80`
         case 'due':
            return `${baseStyles} border-warning hover:border-warning/80`
         case 'weak':
            return `${baseStyles} border-error hover:border-error/80`
         case 'mastery':
            return `${baseStyles} border-success hover:border-success/80`
         case 'today':
            return `${baseStyles} border-primary hover:border-primary/80`
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
         case 'mastery':
            return 'vocabulary?filter=easy'
         case 'today':
            return 'vocabulary'
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

         <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {vocabularyCards.map((card) => (
               <Link href={getCardLink(card.id)} key={card.id}>
                  <div className={getCardStyles(card)}>
                     <AtomText className="mb-2 text-center" fontSize="small" isThin>
                        {card.label}
                     </AtomText>

                     <div className="flex items-center gap-2">
                        {card.icon && <span className="animate-pulse text-2xl">{card.icon}</span>}
                        <span className={`${getCardValueClasses(card)} drop-shadow-sm`}>
                           {card.id === 'mastery' ? `${card.value}%` : card.value}
                        </span>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   )
}
