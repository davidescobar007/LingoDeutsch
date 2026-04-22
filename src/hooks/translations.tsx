'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { sileo } from 'sileo'

import { getSingleArticle } from '@/modules/actions/articles.actions'
import { getVocabularyStats } from '@/modules/actions/cards.actions'
import { saveVocabularyToStudy, searchTranslationFromSources } from '@/modules/actions/translations.actions'
import { TUser } from '@/modules/actions/types'

export const useTranslation = ({
   wordToTranslate,
   ...options
}: {
   wordToTranslate: string
   [key: string]: any
}) => {
   return useQuery({
      queryKey: ['translation', wordToTranslate],
      queryFn: () => searchTranslationFromSources(wordToTranslate),
      retry: false,
      ...options
   })
}

export const useArticle = (articleId: string) => {
   return useQuery({
      queryKey: ['articlesList', articleId],
      queryFn: () => getSingleArticle({ articleId })
   })
}

export const useSaveVocabulary = () => {
   const t = useTranslations()
   return useMutation({
      mutationFn: saveVocabularyToStudy,
      onError: (err) => {
         if (err.message === 'translation.alreadySaved') {
            sileo.error({ title: t('notification.error'), description: t('toast.vocabularyAlreadySaved') })
         } else {
            sileo.error({ title: t('notification.error'), description: t('toast.vocabularyError') })
         }
      },
      onSuccess: () => {
         sileo.success({ title: t('notification.success'), description: t('toast.vocabularySaved') })
      }
   })
}

export const useGetVocabularyStats = (user: TUser | null | undefined) => {
   return useQuery({
      queryKey: ['userVocabularyStats', user?.id],
      queryFn: () => getVocabularyStats(user),
      enabled: Boolean(user?.id)
   })
}
