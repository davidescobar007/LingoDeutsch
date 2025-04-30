'use client'
import { useMutation, useQuery } from '@tanstack/react-query'

import {
   getArticlesByUser,
   getArticlesList,
   getSingleArticle,
   saveArticleUser
} from '@/modules/actions/articles.actions'
import { TArticleUser } from '@/modules/actions/types'

export const useArticleList = () => {
   return useQuery({ queryKey: ['articlesList'], queryFn: getArticlesList })
}

export const useArticle = (articleId: string) => {
   return useQuery({
      queryKey: ['articlesList', articleId],
      queryFn: () => getSingleArticle(articleId)
   })
}

export const useSaveArticleUser = () => {
   return useMutation({
      mutationFn: ({ userArticle, score }: { userArticle: TArticleUser; score: number }) =>
         saveArticleUser({ userArticle, score })
   })
}

export const useGetArticleByUser = (userId: string, articleId: string) => {
   return useQuery({
      queryKey: ['userArticles', userId, articleId],
      enabled: !!userId && !!articleId,
      queryFn: () => getArticlesByUser({ userId, articleId })
   })
}
