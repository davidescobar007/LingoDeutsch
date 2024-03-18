"use client"
import { toast } from "react-toastify"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

import { getSingleArticle } from "@/modules/actions/articles.actions"
import { saveVocabularyToStudy, searchTranslationFromSources } from "@/modules/actions/translations.actions"

export const useTranslation = ({
   wordToTranslate,
   ...options
}: {
   wordToTranslate: string
   [key: string]: any
}) => {
   return useQuery({
      queryKey: ["translation", wordToTranslate],
      queryFn: () => searchTranslationFromSources(wordToTranslate),
      retry: false,
      ...options
   })
}

export const useArticle = (articleId: string) => {
   return useQuery({
      queryKey: ["articlesList", articleId],
      queryFn: () => getSingleArticle(articleId)
   })
}

export const useSaveVocabulary = () => {
   const t = useTranslations()
   return useMutation({
      mutationFn: saveVocabularyToStudy,
      onError: (err) => {
         toast.info(t(err.message))
      },
      onSuccess: () => {
         toast.success(t("translation.saved"))
      }
   })
}
