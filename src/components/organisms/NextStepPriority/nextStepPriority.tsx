'use client'
import { useTranslations } from 'next-intl'

import { AtomText, AtomTitle } from '@/components/atoms'
import { MoleculeLockedOverlay } from '@/components/molecules'
import { Link } from '@/navigation'

type QuickAction = {
   id: string
   title: string
   emoji: string
   description: string
   href: string
   variant?: 'PRIMARY' | 'SECONDARY'
   badgeCount?: number
   isLocked?: boolean
}

type VocabularyStats = {
   totalWords?: number
   dueForReview?: number
   percentageDominated?: number
}

type OrganismNextStepPriorityProps = {
   actions?: QuickAction[]
   isGuest?: boolean
   vocabularyStats?: VocabularyStats
}

const DEFAULT_ACTIONS: QuickAction[] = [
   {
      id: 'continue-grammar',
      title: 'Continuar Gramática',
      emoji: '📘',
      description: 'Nominativo & Acusativo',
      href: '/app/grammar',
      variant: 'PRIMARY'
   },
   {
      id: 'practice-vocab',
      title: 'Practicar Vocabulario',
      emoji: '🎯',
      description: '5 palabras pendientes',
      href: '/app/vocabulary/practice',
      variant: 'SECONDARY',
      badgeCount: 5
   },
   {
      id: 'read-article',
      title: 'Leer Artículo',
      emoji: '📖',
      description: 'Nivel A1 • 8 minutos',
      href: '/app/article',
      variant: 'SECONDARY'
   }
]

const GUEST_ACTIONS: QuickAction[] = [
   {
      id: 'explore-grammar',
      title: 'Explorar Gramática',
      emoji: '📘',
      description: 'Lecciones A1-B2',
      href: '/login',
      variant: 'PRIMARY',
      isLocked: true
   },
   {
      id: 'read-article',
      title: 'Leer Artículos',
      emoji: '📖',
      description: 'Gratis sin registro',
      href: '/app/article',
      variant: 'SECONDARY',
      isLocked: false
   },
   {
      id: 'practice-vocab',
      title: 'Practicar Vocabulario',
      emoji: '🎯',
      description: 'Repetición espaciada',
      href: '/login',
      variant: 'SECONDARY',
      isLocked: true
   }
]

export const OrganismNextStepPriority = ({
   actions = DEFAULT_ACTIONS,
   isGuest = false,
   vocabularyStats
}: OrganismNextStepPriorityProps) => {
   const _t = useTranslations('locked.quickActions')
   const tLocked = useTranslations('locked')
   const displayActions = isGuest ? GUEST_ACTIONS : actions

   // Separate PRIMARY and SECONDARY actions
   const primaryAction = displayActions.find((action) => action.variant === 'PRIMARY')
   const secondaryActions = displayActions.filter((action) => action.variant === 'SECONDARY')

   return (
      <div className="w-full">
         <AtomTitle extraClassName="!text-lg mb-4" type="h3">
            ⚡ Tu Siguiente Paso
         </AtomTitle>

         <div className="flex flex-col gap-3">
            {/* PRIMARY Action - Full Width, Prominent */}
            {primaryAction && (
               <Link
                  href={primaryAction.isLocked && isGuest ? '/login' : primaryAction.href}
                  key={primaryAction.id}
               >
                  <div
                     className={`container-card hover:scale-102 border-primary/20 bg-primary/5 transform-gpu p-6 transition-all duration-300 ${
                        primaryAction.isLocked && isGuest ? 'opacity-75' : ''
                     }`}
                  >
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <span className="text-4xl">{primaryAction.emoji}</span>
                           <div>
                              <AtomText className="block font-bold" fontSize="medium">
                                 {primaryAction.title}
                              </AtomText>
                              <AtomText className="mt-1" fontSize="medium" isThin>
                                 {primaryAction.description}
                              </AtomText>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           {primaryAction.badgeCount !== undefined && !isGuest && (
                              <span className="bg-primary/20 text-primary rounded-full px-3 py-1 text-sm font-bold">
                                 {primaryAction.badgeCount}
                              </span>
                           )}

                           <AtomText color="primary" fontSize="medium" isBold>
                              →
                           </AtomText>
                        </div>
                     </div>
                  </div>
               </Link>
            )}

            {/* SECONDARY Actions - Grid 2 columns */}
            {secondaryActions.length > 0 && (
               <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {secondaryActions.map((action) => {
                     const isVocabulary = action.id === 'practice-vocab'
                     const shouldShowOverlay = isVocabulary && action.isLocked && isGuest

                     // Get vocabulary stats for vocabulary card
                     const totalWords = vocabularyStats?.totalWords || 0
                     const dueForReview = vocabularyStats?.dueForReview || 0
                     const masteryPercentage = Math.round(vocabularyStats?.percentageDominated || 0)

                     // Show detailed stats for vocabulary when user is logged in
                     const showVocabStats = isVocabulary && !isGuest && vocabularyStats

                     const cardContent = (
                        <div
                           className={`container-card hover:scale-102 transform-gpu p-4 transition-all duration-300 ${
                              action.isLocked && isGuest && !shouldShowOverlay ? 'opacity-75' : ''
                           }`}
                        >
                           <div className="flex flex-col gap-2">
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <span className="text-2xl">{action.emoji}</span>
                                    <AtomText className="font-semibold" fontSize="medium">
                                       {action.title}
                                    </AtomText>
                                 </div>
                                 {action.isLocked && isGuest && !shouldShowOverlay && (
                                    <span className="bg-warning text-warning-content flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold">
                                       🔒
                                    </span>
                                 )}
                                 {action.badgeCount !== undefined && !isGuest && !showVocabStats && (
                                    <span className="bg-primary/20 text-primary rounded-full px-2 py-1 text-xs font-bold">
                                       {action.badgeCount}
                                    </span>
                                 )}
                              </div>
                              {showVocabStats ? (
                                 <AtomText className="text-base-content/70" fontSize="small">
                                    {totalWords} palabras · {dueForReview} pendientes · {masteryPercentage}%
                                    dominado
                                 </AtomText>
                              ) : (
                                 <AtomText className="text-sm" fontSize="small" isThin>
                                    {action.description}
                                 </AtomText>
                              )}
                           </div>
                        </div>
                     )

                     if (shouldShowOverlay) {
                        return (
                           <MoleculeLockedOverlay
                              ctaHref="/login"
                              description={tLocked('vocabulary.description')}
                              key={action.id}
                              showOverlay
                              title={tLocked('vocabulary.title')}
                              variant="compact"
                           >
                              {cardContent}
                           </MoleculeLockedOverlay>
                        )
                     }

                     return (
                        <Link href={action.isLocked && isGuest ? '/login' : action.href} key={action.id}>
                           {cardContent}
                        </Link>
                     )
                  })}
               </div>
            )}
         </div>
      </div>
   )
}
