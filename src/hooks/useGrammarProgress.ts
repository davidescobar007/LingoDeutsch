import { useMemo } from 'react'

import { TUser } from '@/modules/actions/types'

import { useGetGrammarByLevel, useSavedGrammarTopicByUser } from './grammar'

export interface GrammarProgressMetrics {
   completedTopics: number
   totalTopics: number
   percentage: number
   isComplete: boolean
   nextTopic?: {
      id: string
      name: string
   }
   isLoading: boolean
}

/**
 * Hook personalizado para calcular progreso de gramática
 * @param user - Usuario actual (puede ser null para invitados)
 * @param level - Nivel de gramática (default: 'A1')
 * @returns Métricas de progreso de gramática
 */
export const useGrammarProgress = (
   user: TUser | null | undefined,
   level: 'A1' | 'A2' | 'B1' | 'B2' = 'A1'
): GrammarProgressMetrics => {
   const isGuest = !user || !user.id
   const { data: grammarList, isLoading } = useGetGrammarByLevel(level)
   const { data: userGrammarProgress } = useSavedGrammarTopicByUser(user)

   const metrics = useMemo(() => {
      // For guests, return default values with total topics from grammarList
      if (isGuest) {
         return {
            completedTopics: 0,
            totalTopics: grammarList?.length || 0,
            percentage: 0,
            isComplete: false,
            nextTopic: grammarList?.[0]
               ? {
                    id: grammarList[0].id,
                    name: grammarList[0].topic_name?.es || 'Próximo tema'
                 }
               : undefined
         }
      }

      // Calcular temas completados
      const completedTopics = userGrammarProgress?.filter((p) => p.isCompleted).length || 0
      const totalTopics = grammarList?.length || 0
      const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0
      const isComplete = completedTopics === totalTopics && totalTopics > 0

      // Encontrar siguiente tema incompleto
      const nextTopic = grammarList?.find(
         (grammar) => !userGrammarProgress?.some((p) => p.grammar_id === grammar.id && p.isCompleted)
      )

      return {
         completedTopics,
         totalTopics,
         percentage,
         isComplete,
         nextTopic: nextTopic
            ? {
                 id: nextTopic.id,
                 name: nextTopic.topic_name?.es || 'Próximo tema'
              }
            : undefined
      }
   }, [isGuest, grammarList, userGrammarProgress])

   return {
      ...metrics,
      isLoading
   }
}
