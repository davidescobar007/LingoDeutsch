'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import { getCardsList, updateCard } from '@/modules/actions/cards.actions'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'

export const useGetVocabularyList = ({ level }: { level?: 'easy' | 'medium' | 'hard' }) => {
   const userModel = getUserInfo() as TUser

   return useQuery({
      queryKey: ['cardsKey', level],
      queryFn: () => getCardsList({ level, user: userModel })
   })
}

export const useUpdateCard = () => {
   return useMutation({
      mutationFn: updateCard
      // No automatic query invalidation - let users control when to refetch
   })
}
