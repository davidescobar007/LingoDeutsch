'use client'

import { useMutation, useQuery } from '@tanstack/react-query'

import { getCardsList, updateCard } from '@/modules/actions/cards.actions'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'

export const useGetCardsList = (filter?: string) => {
   const userModel = getUserInfo() as TUser

   return useQuery({
      queryKey: ['cardsKey', filter],
      queryFn: () => getCardsList({ filter, user: userModel })
   })
}

export const useUpdateCard = () => {
   return useMutation({
      mutationFn: updateCard
   })
}
