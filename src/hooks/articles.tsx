'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
   getArticlesByUser,
   getArticlesList,
   getArticlesListByUser,
   getSingleArticle,
   saveArticleUser
} from '@/modules/actions/articles.actions'
import { TArticleUser } from '@/modules/actions/types'

export const useArticleList = ({ level, sortCriteria }: { level?: string; sortCriteria?: string } = {}) => {
   return useQuery({
      queryKey: ['articlesList', level, sortCriteria],
      queryFn: () => getArticlesList({ level, sortCriteria })
   })
}

export const useArticle = (articleId: string) => {
   return useQuery({
      queryKey: ['article', articleId],
      queryFn: () => getSingleArticle(articleId)
   })
}

export const useSaveArticleUser = () => {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: ({ userArticle, score }: { userArticle: TArticleUser; score: number }) =>
         saveArticleUser({ userArticle, score }),
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: ['article', variables.userArticle.article_id] })
      }
   })
}

export const useGetArticleByUser = (userId: string, articleId: string) => {
   return useQuery({
      queryKey: ['userArticles', userId, articleId],
      enabled: !!userId && !!articleId,
      queryFn: () => getArticlesByUser({ userId, articleId })
   })
}

// export const useGetArticlesListByUser = (userId: string, isCompleted: boolean) => {
//    return useQuery({
//       queryKey: ['userArticlesList', userId],
//       enabled: !!userId && !!isCompleted,
//       queryFn: () => getArticlesListByUser({ userId, isCompleted })
//    })
// }

export const useGetArticlesListByUserAndState = ({
   userId,
   level,
   state,
   sortCriteria
}: {
   userId: string
   level?: string
   state?: string
   sortCriteria?: string
}) => {
   return useQuery({
      queryKey: ['userArticlesList', userId, level, state, sortCriteria],
      queryFn: () => {
         if (!userId) return getArticlesList({ level, sortCriteria })
         ////////////
         return getArticlesListByUser({ userId, sortCriteria, level, isCompleted: state === 'learned' }).then(
            (articlesListByUser) => {
               if (state === 'learned') {
                  return articlesListByUser
               }
               return getArticlesList({ level }).then((articlesList) =>
                  articlesList.map((article) => {
                     const userArticle = articlesListByUser.find((userArticle) => userArticle.id === article.id)

                     return {
                        ...article,
                        is_completed: userArticle ? userArticle.is_completed : undefined
                     }
                  })
               )
            }
         )
      }
   })
}
