import { useQuery } from '@tanstack/react-query'

import { getGrammarByLevel, getSingleGrammarById } from '@/modules/actions/grammar.actions'

export const useGetGrammarByLevel = (grammarLevel: string) => {
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
