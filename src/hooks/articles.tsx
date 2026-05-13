'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
   fetchArticlePodcast,
   getArticlesByUser,
   getArticlesList,
   getArticlesListByUser,
   getRelatedArticles,
   getSingleArticle,
   saveArticleUser
} from '@/modules/actions/articles.actions'
import { TArticle, TArticleUser } from '@/modules/actions/types'

export const useArticleList = ({ level, sortCriteria }: { level?: string; sortCriteria?: string } = {}) => {
   return useQuery({
      queryKey: ['articlesList', level, sortCriteria],
      queryFn: () => getArticlesList({ level, sortCriteria })
   })
}

export const useArticle = (articleId: string) => {
   return useQuery({
      queryKey: ['article', articleId],
      queryFn: () => getSingleArticle({ articleId }),
      enabled: !!articleId
   })
}

export const useSaveArticleUser = () => {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: ({ userArticle, score }: { userArticle: TArticleUser; score: number }) =>
         saveArticleUser({ userArticle, score }),
      onSuccess: (data, variables) => {
         queryClient.invalidateQueries({ queryKey: ['article', variables.userArticle.article_id] })
         queryClient.invalidateQueries({
            queryKey: ['userArticles', variables.userArticle.user_id, variables.userArticle.article_id]
         })
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

export const useGetArticlesListByUserAndState = ({
   userId,
   level,
   state,
   sortCriteria,
   enabled = true
}: {
   userId?: string | undefined
   level?: string
   state?: string
   sortCriteria?: string
   enabled?: boolean
}) => {
   return useQuery({
      queryKey: ['userArticlesList', userId, level, state, sortCriteria],
      enabled,
      queryFn: () => {
         if (!userId) return getArticlesList({ level, sortCriteria })

         return getArticlesListByUser({ userId, sortCriteria, level, isCompleted: state === 'learned' }).then(
            (articlesListByUser: TArticle[]) => {
               if (state === 'learned') {
                  return articlesListByUser
               }
               return getArticlesList({ level }).then((articlesList: TArticle[]) =>
                  articlesList.map((article: TArticle) => {
                     const userArticle = articlesListByUser.find(
                        (userArticle: TArticle) => userArticle.id === article.id
                     )

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

export const useRelatedArticles = ({ articleId, level }: { articleId: string; level?: string }) => {
   return useQuery({
      queryKey: ['relatedArticles', articleId, level],
      queryFn: () => getRelatedArticles({ articleId, level }),
      enabled: !!articleId
   })
}

export const useGenerateArticlePodcast = (articleId: string) => {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: ({ text }: { text: string }) => fetchArticlePodcast(articleId, text),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['article', articleId] })
      }
   })
}
