'use client'
import { MoleculeSectionDivider } from '@/components/molecules'
import {
   OrganismArticleCarousel,
   OrganismGrammarProgressCard,
   OrganismNextStepPriority,
   OrganismStreakCard,
   OrganismWelcomeHero
} from '@/components/organisms'
import type { GrammarProgressMetrics } from '@/hooks/useGrammarProgress'
import type { UserStreakMetrics } from '@/hooks/useUserStreak'
import { TArticle, TUser, TVocabularyStatsUI } from '@/modules/actions/types'

type TemplateHomeProps = {
   articles: TArticle[]
   grammarProgress: GrammarProgressMetrics
   streakMetrics: UserStreakMetrics
   user?: TUser
   userName: string
   vocabularyStats?: TVocabularyStatsUI
}

type QuickAction = {
   id: string
   title: string
   emoji: string
   description: string
   href: string
   variant?: 'PRIMARY' | 'SECONDARY'
   badgeCount?: number
}

export const TemplateHome = ({
   articles,
   grammarProgress,
   streakMetrics,
   user = undefined,
   userName,
   vocabularyStats = undefined
}: TemplateHomeProps) => {
   const isGuest = !user || !user.id

   const dueWords = vocabularyStats?.dueForReview || 0

   // Get contextual quick actions based on user progress
   const getQuickActions = (): QuickAction[] => {
      const actions: QuickAction[] = []

      // PRIORITY 1: Grammar action for logged-in users
      if (!isGuest) {
         if (!grammarProgress.isComplete && grammarProgress.nextTopic) {
            actions.push({
               id: 'continue-grammar',
               title: 'Continuar Gramática A1',
               emoji: '📘',
               description: grammarProgress.nextTopic.name,
               href: `/app/grammar?topic=${grammarProgress.nextTopic.id}`,
               variant: 'PRIMARY',
               badgeCount: grammarProgress.totalTopics - grammarProgress.completedTopics
            })
         } else {
            // Fallback when A1 complete or no next topic: explore more grammar
            actions.push({
               id: 'explore-grammar',
               title: 'Explorar Gramática',
               emoji: '📘',
               description: 'Descubre más niveles y temas',
               href: '/app/grammar',
               variant: 'PRIMARY'
            })
         }
      }

      // PRIORITY 2: Read article (secondary unless guest or grammar complete)
      if (articles.length > 0) {
         const firstArticle = articles[0]
         actions.push({
            id: 'read-article',
            title: 'Leer Artículo',
            emoji: '📖',
            description: `${firstArticle.level || 'A1'} • ${firstArticle.estimated_read_time || 8} minutos`,
            href: `/app/article/${firstArticle.id}`,
            variant: isGuest || grammarProgress.isComplete ? 'PRIMARY' : 'SECONDARY'
         })
      }

      // PRIORITY 3: Vocabulary practice - show for logged in users
      if (!isGuest) {
         actions.push({
            id: 'practice-vocab',
            title: 'Practicar Vocabulario',
            emoji: '🎯',
            description: `${dueWords} palabra${dueWords !== 1 ? 's' : ''} pendiente${dueWords !== 1 ? 's' : ''}`,
            href: '/app/vocabulary/practice',
            variant: 'SECONDARY',
            badgeCount: dueWords > 0 ? dueWords : undefined
         })
      }

      // FALLBACK: If no actions, show explore grammar
      if (actions.length === 0) {
         actions.push({
            id: 'explore-grammar',
            title: 'Explorar Gramática',
            emoji: '📚',
            description: 'Comienza tu aprendizaje',
            href: '/app/grammar',
            variant: 'PRIMARY'
         })
      }

      return actions
   }

   const quickActions = getQuickActions()

   return (
      <div className="w-full">
         {/* 1. Welcome Section */}
         <div className="mb-8">
            <OrganismWelcomeHero isGuest={isGuest} userName={userName} />
         </div>

         {/* 2. Progress & Streak Grid - Primary Metrics */}
         <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <OrganismGrammarProgressCard
               completedTopics={grammarProgress.completedTopics}
               isGuest={isGuest}
               totalTopics={grammarProgress.totalTopics}
            />
            <OrganismStreakCard
               activitiesByType={streakMetrics.activitiesByType}
               activityDays={streakMetrics.activityDays}
               currentStreak={streakMetrics.currentStreak}
               isGuest={isGuest}
            />
         </div>

         <MoleculeSectionDivider />

         {/* 3. Next Step Priority (QuickActions + Recommendations Merged) */}
         <div className="mb-8">
            <OrganismNextStepPriority actions={quickActions} isGuest={isGuest} vocabularyStats={vocabularyStats} />
         </div>

         <MoleculeSectionDivider />

         {/* 5. Articles Carousel */}
         <OrganismArticleCarousel articles={articles || []} extraClassName="mt-2" />
      </div>
   )
}
