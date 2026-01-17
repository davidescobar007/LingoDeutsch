'use client'
import { CardLoader } from '@/components/atoms'
import { OrganismLayoutContainer as LayoutContainer } from '@/components/organisms'
import { TemplateHome } from '@/components/templates'
import { useArticleList } from '@/hooks/articles'
import { useGetVocabularyStats } from '@/hooks/cards'
import { useGrammarProgress } from '@/hooks/useGrammarProgress'
import { useUserStreak } from '@/hooks/useUserStreak'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'

const Learn = () => {
   const user = getUserInfo() as TUser | null

   const { data: articles, isLoading: articlesLoading } = useArticleList()
   const { data: vocabularyStats, isLoading: vocabLoading } = useGetVocabularyStats()
   const grammarProgress = useGrammarProgress(user, 'A1')
   const streakMetrics = useUserStreak(user)

   const isLoading = articlesLoading || vocabLoading || grammarProgress.isLoading || streakMetrics.isLoading

   if (isLoading) {
      return (
         <LayoutContainer>
            {Array.from({ length: 3 }).map((_i, index) => (
               <CardLoader key={index} />
            ))}
         </LayoutContainer>
      )
   }

   return (
      <TemplateHome
         articles={articles || []}
         grammarProgress={grammarProgress}
         streakMetrics={streakMetrics}
         user={user || undefined}
         userName={user?.name || 'Usuario'}
         vocabularyStats={vocabularyStats}
      />
   )
}

export default Learn
