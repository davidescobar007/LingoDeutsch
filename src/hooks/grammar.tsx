import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
   getGrammarByLevel,
   getSavedGrammarTopicByUser,
   getSingleGrammarById,
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
      queryFn: () => getSingleGrammarById(id)
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
      mutationFn: ({ user, grammar_id }: { user: TUser; grammar_id: string }) =>
         saveGrammarUserProgress(user, grammar_id),
      onSuccess: () => {
         toast.success('¡Leccioón guardada con éxito!')
         queryClient.invalidateQueries({
            queryKey: ['savedGrammarTopicByUser']
         })
      },
      onError: () => {
         toast.error('Error al guardar la lección')
      }
   })
}
