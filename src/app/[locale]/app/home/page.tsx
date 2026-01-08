/* eslint-disable react/jsx-sort-props */
'use client'
import { TemplateHome } from '@/components/templates'
import { useArticleList } from '@/hooks/articles'
import { useGetVocabularyStats } from '@/hooks/translations'
import { useGrammarProgress } from '@/hooks/useGrammarProgress'
import { useScore } from '@/hooks/user'
import { useUserStreak } from '@/hooks/useUserStreak'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'

const Learn = () => {
   const user = getUserInfo() as TUser

   const { data: articles } = useArticleList()
   const { data: vocabularyStats } = useGetVocabularyStats(user)
   const { data: scoreList } = useScore()
   const grammarProgress = useGrammarProgress(user, 'A1')
   const streakMetrics = useUserStreak(user)

   return (
      <TemplateHome
         articles={articles || []}
         grammarProgress={grammarProgress}
         streakMetrics={streakMetrics}
         scoreList={scoreList}
         user={user}
         userName={user?.name || 'Usuario'}
         vocabularyStats={vocabularyStats}
      />
   )
}

export default Learn
