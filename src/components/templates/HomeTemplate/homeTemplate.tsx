'use client'
import {
   OrganismAchievementBadges,
   OrganismArticleCarousel,
   OrganismGrammarPreview,
   OrganismGrammarProgressCard,
   OrganismQuickActions,
   OrganismScoreSidebar,
   OrganismStreakCard,
   OrganismVocabularyPreview,
   OrganismWelcomeHero
} from '@/components/organisms'
import { TArticle, TGrammar, TScore, TUser, TUserGrammarProgress, TVocabularyStatsUI } from '@/modules/actions/types'

type TemplateHomeProps = {
   articles: TArticle[]
   grammarList: TGrammar[]
   scoreList?: TScore
   user?: TUser
   userGrammarProgress: TUserGrammarProgress[]
   userName: string
   vocabularyStats?: TVocabularyStatsUI
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

   // Get next recommended topic (first incomplete)
   const nextTopic = grammarList?.find(
      (grammar) => !userGrammarProgress?.some((p) => p.grammar_id === grammar.id && p.isCompleted)
   )

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

   // Transform grammar data for display (show random 6 topics)
   const grammarTopics =
      grammarList
         ?.sort(() => 0.5 - Math.random())
         .slice(0, 6)
         .map((grammar, index) => ({
            id: grammar.id,
            label: grammar.topic_name?.es || 'Tema de gramática',
            colorTheme: (['blue', 'green', 'purple', 'orange', 'teal', 'red', 'yellow', 'indigo'] as const)[
               index % 8
            ]
         })) || []

   const currentStreak = calculateStreak()
   const activityDays = getActivityDays()

   return (
      <div className="flex w-full flex-col gap-6 2xl:flex-row 2xl:gap-8">
         {/* Main Content */}
         <div className="w-full 2xl:w-8/12">
            {/* Welcome Section */}
            <OrganismWelcomeHero userName={userName} />

            {/* Quick Actions */}
            <div className="mb-6">
               <OrganismQuickActions />
            </div>

            {/* Progress & Streak Grid */}
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
               <OrganismGrammarProgressCard
                  completedTopics={completedGrammarTopics}
                  nextTopicId={nextTopic?.id || ''}
                  nextTopicLabel={nextTopic?.topic_name?.es || 'Próximo tema'}
                  totalTopics={totalGrammarTopics}
               />
               <OrganismStreakCard
                  activityDays={activityDays}
                  currentStreak={currentStreak}
               />
            </div>

            {/* Achievement Badges */}
            <div className="mb-6">
               <OrganismAchievementBadges />
            </div>

            {/* Grammar & Vocabulary Preview */}
            <OrganismGrammarPreview popularTopics={grammarTopics} />
            <OrganismVocabularyPreview vocabularyStats={vocabularyStats} />

            {/* Articles Carousel */}
            <OrganismArticleCarousel articles={articles || []} extraClassName="mb-12" />
         </div>

         {/* Sidebar */}
         <OrganismScoreSidebar extraClassName="w-full 2xl:w-4/12" scoreList={scoreList} user={user} />
      </div>
   )
}
