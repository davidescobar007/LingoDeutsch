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
import {
   TArticle,
   TGrammar,
   TScore,
   TUser,
   TUserGrammarProgress,
   TVocabularyStatsUI
} from '@/modules/actions/types'

type TemplateHomeProps = {
   articles: TArticle[]
   grammarList: TGrammar[]
   scoreList?: TScore
   user?: TUser
   userGrammarProgress: TUserGrammarProgress[]
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
   grammarList,
   scoreList = undefined,
   user = undefined,
   userGrammarProgress,
   userName,
   vocabularyStats = undefined
}: TemplateHomeProps) => {
   // Calculate grammar progress
   const completedGrammarTopics = userGrammarProgress?.filter((p) => p.isCompleted).length || 0
   const totalGrammarTopics = grammarList?.length || 0
   const grammarComplete = completedGrammarTopics === totalGrammarTopics && totalGrammarTopics > 0

   // Get next recommended topic (first incomplete)
   const nextTopic = grammarList?.find(
      (grammar) => !userGrammarProgress?.some((p) => p.grammar_id === grammar.id && p.isCompleted)
   )

   // Get vocabulary stats
   const dueWords = vocabularyStats?.dueForReview || 0

   // Get contextual quick actions based on user progress
   const getQuickActions = (): QuickAction[] => {
      const actions: QuickAction[] = []

      // PRIORITY 1: Grammar incomplete - show continue grammar
      if (!grammarComplete && nextTopic) {
         actions.push({
            id: 'continue-grammar',
            title: 'Continuar Gramática A1',
            emoji: '📘',
            description: nextTopic.topic_name?.es || 'Próximo tema',
            href: `/app/grammar?topic=${nextTopic.id}`,
            variant: 'PRIMARY',
            badgeCount: totalGrammarTopics - completedGrammarTopics
         })
      }

      // PRIORITY 2: Grammar complete OR secondary action - show read article
      if (articles.length > 0) {
         const firstArticle = articles[0]
         actions.push({
            id: 'read-article',
            title: 'Leer Artículo',
            emoji: '📖',
            description: `${firstArticle.level || 'A1'} • ${firstArticle.estimated_reading_time || 8} minutos`,
            href: `/app/article/${firstArticle.id}`,
            variant: grammarComplete ? 'PRIMARY' : 'SECONDARY'
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

   // Calculate streak (based on grammar progress dates)
   const calculateStreak = (): number => {
      if (!userGrammarProgress || userGrammarProgress.length === 0) return 0

      const sortedDates = userGrammarProgress
         .filter((p) => p.dateCompleted)
         .map((p) => new Date(p.dateCompleted))
         .sort((a, b) => b.getTime() - a.getTime())

      if (sortedDates.length === 0) return 0

      let streak = 1
      const today = new Date()
      let currentDate = new Date(today)
      currentDate.setHours(0, 0, 0, 0)

      for (let i = 0; i < sortedDates.length; i++) {
         const checkDate = new Date(sortedDates[i])
         checkDate.setHours(0, 0, 0, 0)

         const diffDays = Math.floor((currentDate.getTime() - checkDate.getTime()) / (1000 * 60 * 60 * 24))

         if (diffDays === streak) {
            streak++
            currentDate = new Date(checkDate)
            currentDate.setDate(currentDate.getDate() - 1)
         } else if (diffDays > streak) {
            break
         }
      }

      return streak - 1
   }

   // Generate activity days for the past 7 days
   const getActivityDays = (): boolean[] => {
      const days: boolean[] = []
      for (let i = 6; i >= 0; i--) {
         const date = new Date()
         date.setDate(date.getDate() - i)
         date.setHours(0, 0, 0, 0)

         const hasActivity = userGrammarProgress?.some((p) => {
            if (!p.dateCompleted) return false
            const progressDate = new Date(p.dateCompleted)
            progressDate.setHours(0, 0, 0, 0)
            return progressDate.getTime() === date.getTime()
         })

         days.push(Boolean(hasActivity))
      }
      return days
   }

   // Get recommendation for next steps
   const getRecommendation = () => {
      // Priority 1: Grammar incomplete
      if (!grammarComplete && nextTopic) {
         return {
            type: 'grammar' as const,
            title: '📘 Completa la gramática A1',
            message: `Te falta${totalGrammarTopics - completedGrammarTopics > 1 ? 'n' : ''} ${
               totalGrammarTopics - completedGrammarTopics
            } tema${
               totalGrammarTopics - completedGrammarTopics > 1 ? 's' : ''
            } para avanzar. Completa la base gramatical antes de leer artículos.`,
            cta: 'Continuar gramática',
            href: `/app/grammar?topic=${nextTopic.id}`
         }
      }

      // Priority 2: Grammar complete but no articles read yet
      if (grammarComplete && articles.length > 0) {
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

   const currentStreak = calculateStreak()
   const activityDays = getActivityDays()
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
                  completedTopics={completedGrammarTopics}
                  nextTopicId={nextTopic?.id || ''}
                  nextTopicLabel={nextTopic?.topic_name?.es || 'Próximo tema'}
                  totalTopics={totalGrammarTopics}
               />
               <OrganismStreakCard activityDays={activityDays} currentStreak={currentStreak} />
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
