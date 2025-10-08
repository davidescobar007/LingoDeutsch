'use client'

import { useQuery } from '@tanstack/react-query'

import { getArticleQuiz } from '@/modules/actions/articles.actions'
import { getGrammarQuiz } from '@/modules/actions/grammar.actions'

export const useGetQuiz = ({ id, type }: { id: string; type: 'grammar' | 'article' }) => {
   return useQuery({
      queryKey: ['quizKey', id],
      queryFn: () => {
         if (type === 'article') return getArticleQuiz({ articleId: id })
         return getGrammarQuiz({ grammarId: id })
      }
   })
}
