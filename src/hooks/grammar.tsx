import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
   getGrammarByLevel,
   getSavedGrammarTopicByUser,
   getSingleGrammarById,
   getSingleGrammarTopicByUser,
   saveGrammarUserProgress
} from '@/modules/actions/grammar.actions'
import { TUser } from '@/modules/actions/types'
import { GrammarLevel } from '@/modules/global.types'

export const useGetGrammarByLevel = (grammarLevel: GrammarLevel) => {
   return useQuery({
      queryKey: ['grammarByLevel', grammarLevel],
      queryFn: () => getGrammarByLevel(grammarLevel)
   })
}

export const useGetSingleGrammarTopic = (id: string) => {
   return useQuery({
      queryKey: ['grammarById', id],
      queryFn: () => getSingleGrammarById({ id })
   })
}

export const useGetSingleGrammarTopicByUser = ({ id, user }: { id: string; user: TUser | null | undefined }) => {
   return useQuery({
      queryKey: ['grammarByIdAndUser', id, user],
      queryFn: () => getSingleGrammarTopicByUser({ grammar_id: id, user: user as TUser }),
      enabled: Boolean(user)
   })
}

export const useSavedGrammarTopicByUser = (user: TUser | null | undefined) => {
   return useQuery({
      queryKey: ['savedGrammarTopicByUser', user],
      queryFn: () => getSavedGrammarTopicByUser(user),
      enabled: Boolean(user)
   })
}

export const useSaveGrammarProgress = () => {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: ({ user, grammar_id, score }: { user: TUser; grammar_id: string; score: number }) =>
         saveGrammarUserProgress(user, grammar_id, score),
      onSuccess: (_, userGrammarInfo) => {
         if (userGrammarInfo.score >= 60) {
            toast.success('¡Lección guardada con éxito!')
         }

         queryClient.invalidateQueries({
            queryKey: ['savedGrammarTopicByUser']
         })
         queryClient.invalidateQueries({
            queryKey: ['grammarByIdAndUser', userGrammarInfo.grammar_id, userGrammarInfo.user]
         })
      },
      onError: () => {
         toast.error('Error al guardar la lección')
      }
   })
}
