"use client"
import { useSuspenseQuery } from "@tanstack/react-query"

import { getArticlesList, getSingleArticle } from "@/modules/actions/articles.actions"

export const useArticleList = () => {
   return useSuspenseQuery({ queryKey: ["articlesList"], queryFn: getArticlesList })
}

export const useArticle = (articleId: string) => {
   return useSuspenseQuery({
      queryKey: ["articlesList", articleId],
      queryFn: () => getSingleArticle(articleId)
   })
}
