/* eslint-disable react/jsx-sort-props */
'use client'
import { TemplateHome } from '@/components/templates'
import { useArticleList } from '@/hooks/articles'
import { useGetGrammarByLevel, useSavedGrammarTopicByUser } from '@/hooks/grammar'
import { useGetVocabularyStats } from '@/hooks/translations'
import { useScore } from '@/hooks/user'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'

const Learn = () => {
   const user = getUserInfo() as TUser

   const { data: articles } = useArticleList()
   const { data: vocabularyStats } = useGetVocabularyStats(user)
   const { data: scoreList } = useScore()
   const { data: grammarList } = useGetGrammarByLevel('A1')
   const { data: userGrammarProgress } = useSavedGrammarTopicByUser(user)

   return (
      <TemplateHome
         articles={articles || []}
         grammarList={grammarList || []}
         scoreList={scoreList}
         user={user}
         userGrammarProgress={userGrammarProgress || []}
         userName={user?.name || 'Usuario'}
         vocabularyStats={vocabularyStats}
      />
   )
}

export default Learn
