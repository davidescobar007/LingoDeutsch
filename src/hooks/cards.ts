'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import { getVocabularyList, getVocabularyStats, updateVocabulary } from '@/modules/actions/cards.actions'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'

export const useGetVocabularyList = ({ level }: { level?: 'easy' | 'medium' | 'hard' }) => {
   const userModel = getUserInfo() as TUser

   return useQuery({
      queryKey: ['cardsKey', level],
      queryFn: () => getVocabularyList({ level, user: userModel }),
      enabled: !!userModel?.id
   })
}

export const useGetVocabularyStats = () => {
   const userModel = getUserInfo() as TUser

   return useQuery({
      queryKey: ['vocabStats', userModel?.id],
      queryFn: () => getVocabularyStats(userModel),
      enabled: !!userModel?.id
   })
}

export const useUpdateCard = () => {
   return useMutation({
      mutationFn: updateVocabulary
      // No automatic query invalidation - let users control when to refetch
   })
}
