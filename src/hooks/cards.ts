'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import { getVocabularyList, getVocabularyStats, updateVocabulary } from '@/modules/actions/cards.actions'
import { TUser } from '@/modules/actions/types'

export const useGetVocabularyList = ({
   level,
   user
}: {
   level?: 'easy' | 'medium' | 'hard'
   user?: TUser | null
}) => {
   return useQuery({
      queryKey: ['cardsKey', level],
      queryFn: () => getVocabularyList({ level, user: user! }),
      enabled: !!user?.id
   })
}

export const useGetVocabularyStats = (user?: TUser | null) => {
   return useQuery({
      queryKey: ['vocabStats', user?.id],
      queryFn: () => getVocabularyStats(user),
      enabled: !!user?.id
   })
}

export const useUpdateCard = () => {
   return useMutation({
      mutationFn: updateVocabulary
      // No automatic query invalidation - let users control when to refetch
   })
}
