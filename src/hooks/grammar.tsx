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

export const useGetGrammarByLevel = (grammarLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2') => {
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

export const useGetSingleGrammarTopicByUser = ({ id, user }: { id: string; user: TUser }) => {
   return useQuery({
      queryKey: ['grammarByIdAndUser', id, user],
      queryFn: () => getSingleGrammarTopicByUser({ grammar_id: id, user }),
      enabled: Boolean(user)
   })
}

export const useSavedGrammarTopicByUser = (user: TUser) => {
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
         if (userGrammarInfo.score >= 60) toast.success('¡Lección guardada con éxito!')
         queryClient.invalidateQueries({
            queryKey: ['savedGrammarTopicByUser']
         })
      },
      onError: () => {
         toast.error('Error al guardar la lección')
      }
   })
}
