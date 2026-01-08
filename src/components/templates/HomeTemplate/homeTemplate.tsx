'use client'
import {
   OrganismArticleCarousel,
   OrganismGrammarProgressCard,
   OrganismQuickActions,
   OrganismRecommendedNextSteps,
   OrganismScoreSidebar,
   OrganismStreakCard,
   OrganismVocabularyPreview,
   OrganismWelcomeHero
} from '@/components/organisms'
import type { GrammarProgressMetrics } from '@/hooks/useGrammarProgress'
import type { UserStreakMetrics } from '@/hooks/useUserStreak'
import { TArticle, TScore, TUser, TVocabularyStatsUI } from '@/modules/actions/types'

type TemplateHomeProps = {
   articles: TArticle[]
   grammarProgress: GrammarProgressMetrics
   streakMetrics: UserStreakMetrics
   scoreList?: TScore
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
   scoreList = undefined,
   user = undefined,
   userName,
   vocabularyStats = undefined
}: TemplateHomeProps) => {
   // Get vocabulary stats
   const dueWords = vocabularyStats?.dueForReview || 0

   // Get contextual quick actions based on user progress
   const getQuickActions = (): QuickAction[] => {
      const actions: QuickAction[] = []

      // PRIORITY 1: Grammar incomplete - show continue grammar
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
      }

      // PRIORITY 2: Grammar complete OR secondary action - show read article
      if (articles.length > 0) {
         const firstArticle = articles[0]
         actions.push({
            id: 'read-article',
            title: 'Leer Artículo',
            emoji: '📖',
            description: `${firstArticle.level || 'A1'} • ${firstArticle.estimated_read_time || 8} minutos`,
            href: `/app/article/${firstArticle.id}`,
            variant: grammarProgress.isComplete ? 'PRIMARY' : 'SECONDARY'
         })
      }

      // PRIORITY 3: Vocabulary practice - show if due words exist
      if (dueWords > 0) {
         actions.push({
            id: 'practice-vocab',
            title: 'Practicar Vocabulario',
            emoji: '🎯',
            description: `${dueWords} palabra${dueWords !== 1 ? 's' : ''} pendiente${dueWords !== 1 ? 's' : ''}`,
            href: '/app/vocabulary/practice',
            variant: 'SECONDARY',
            badgeCount: dueWords
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

   // Get recommendation for next steps
   const getRecommendation = () => {
      // Priority 1: Grammar incomplete
      if (!grammarProgress.isComplete && grammarProgress.nextTopic) {
         return {
            type: 'grammar' as const,
            title: '📘 Completa la gramática A1',
            message: `Te falta${grammarProgress.totalTopics - grammarProgress.completedTopics > 1 ? 'n' : ''} ${
               grammarProgress.totalTopics - grammarProgress.completedTopics
            } tema${
               grammarProgress.totalTopics - grammarProgress.completedTopics > 1 ? 's' : ''
            } para avanzar. Completa la base gramatical antes de leer artículos.`,
            cta: 'Continuar gramática',
            href: `/app/grammar?topic=${grammarProgress.nextTopic.id}`
         }
      }

      // Priority 2: Grammar complete but no articles read yet
      if (grammarProgress.isComplete && articles.length > 0) {
         const firstArticle = articles[0]
         return {
            type: 'article' as const,
            title: '📖 ¡Listo para leer!',
            message:
               'Has completado la gramática A1. Ahora puedes leer artículos y poner en práctica lo aprendido.',
            cta: 'Leer primer artículo',
            href: `/app/article/${firstArticle.id}`
         }
      }

      // Priority 3: Vocabulary practice
      if (dueWords > 0) {
         return {
            type: 'vocabulary' as const,
            title: '🎯 Practica vocabulario',
            message: `Tienes ${dueWords} palabra${dueWords > 1 ? 's' : ''} pendiente${
               dueWords > 1 ? 's' : ''
            } de revisar. Refuerza tu aprendizaje con repetición espaciada.`,
            cta: 'Practicar ahora',
            href: '/app/vocabulary/practice'
         }
      }

      // Default: General encouragement
      return {
         type: 'general' as const,
         title: '🎉 ¡Vas genial!',
         message: 'Sigue practicando para mantener tu progreso. Explora más contenido y consolida tu aprendizaje.',
         cta: 'Explorar contenido',
         href: '/app/grammar'
      }
   }

   const quickActions = getQuickActions()
   const recommendation = getRecommendation()

   return (
      <div className="flex w-full flex-col gap-6 2xl:flex-row 2xl:gap-8">
         {/* Main Content */}
         <div className="w-full 2xl:w-8/12">
            {/* 1. Welcome Section */}
            <OrganismWelcomeHero userName={userName} />

            {/* 2. Progress & Streak Grid */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
               <OrganismGrammarProgressCard
                  completedTopics={grammarProgress.completedTopics}
                  nextTopicId={grammarProgress.nextTopic?.id || ''}
                  nextTopicLabel={grammarProgress.nextTopic?.name || 'Próximo tema'}
                  totalTopics={grammarProgress.totalTopics}
               />
               <OrganismStreakCard
                  activityDays={streakMetrics.activityDays}
                  currentStreak={streakMetrics.currentStreak}
               />
            </div>

            {/* 3. Quick Actions (Contextual) */}
            <div className="mb-6">
               <OrganismQuickActions actions={quickActions} />
            </div>

            {/* 4. Vocabulary Preview */}
            <OrganismVocabularyPreview vocabularyStats={vocabularyStats} />

            {/* 5. Recommended Next Steps */}
            <OrganismRecommendedNextSteps extraClassName="mt-10" recommendation={recommendation} />

            {/* 6. Articles Carousel */}
            <OrganismArticleCarousel articles={articles || []} extraClassName="mb-12 mt-10" />
         </div>

         {/* Sidebar */}
         <OrganismScoreSidebar extraClassName="w-full 2xl:w-4/12" scoreList={scoreList} user={user} />
      </div>
   )
}
