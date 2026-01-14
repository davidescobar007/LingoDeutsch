'use client'
import { TemplateHome } from '@/components/templates'
import { useArticleList } from '@/hooks/articles'
import { useGetVocabularyStats } from '@/hooks/cards'
import { useGrammarProgress } from '@/hooks/useGrammarProgress'
import { useUserStreak } from '@/hooks/useUserStreak'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'

const Learn = () => {
   const user = getUserInfo() as TUser | null

   const { data: articles } = useArticleList()
   const { data: vocabularyStats } = useGetVocabularyStats()
   const grammarProgress = useGrammarProgress(user, 'A1')
   const streakMetrics = useUserStreak(user)

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
