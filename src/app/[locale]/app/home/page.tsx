'use client'
import { SpinLoader } from '@/components/atoms'
import { TemplateHome } from '@/components/templates'
import { useArticleList } from '@/hooks/articles'
import { useGetVocabularyStats } from '@/hooks/cards'
import { useGrammarProgress } from '@/hooks/useGrammarProgress'
import { useOAuthParams } from '@/hooks/user'
import { useUserStreak } from '@/hooks/useUserStreak'
import { useAuthState } from '@/providers/AuthProvider'

const Learn = () => {
   const { user } = useAuthState()
   const hasOAuthParams = useOAuthParams()
   const { data: articles, isLoading: articlesLoading } = useArticleList()
   const { data: vocabularyStats, isLoading: vocabLoading } = useGetVocabularyStats(user)
   const grammarProgress = useGrammarProgress(user, 'A1.1')
   const streakMetrics = useUserStreak(user)

   const isLoading =
      articlesLoading || vocabLoading || grammarProgress.isLoading || streakMetrics.isLoading || hasOAuthParams

   if (isLoading) {
      return <SpinLoader />
   }

   return (
      <TemplateHome
         articles={articles || []}
         grammarProgress={grammarProgress}
         streakMetrics={streakMetrics}
         user={user ?? undefined}
         userName={user?.name ?? 'Usuario'}
         vocabularyStats={vocabularyStats}
      />
   )
}

export default Learn
