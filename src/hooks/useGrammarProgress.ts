import { useMemo } from 'react'

import { TGrammar, TUser } from '@/modules/actions/types'
import { GrammarLevel } from '@/modules/global.types'
import { getNextTopicInUnit } from '@/utils/grammar.utils'

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
   level: GrammarLevel = 'A1'
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
                    name: grammarList[0].topic_name || 'Próximo tema'
                 }
               : undefined
         }
      }

      // Calcular temas completados
      const completedTopics = userGrammarProgress?.filter((p) => p.isCompleted).length || 0
      const totalTopics = grammarList?.length || 0
      const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0
      const isComplete = completedTopics === totalTopics && totalTopics > 0

      // Encontrar siguiente tema basado en el último completado
      const completedIds = new Set(
         userGrammarProgress?.filter((p) => p.isCompleted).map((p) => p.grammar_id) || []
      )
      const lastCompletedTopic = grammarList?.reduce<TGrammar | undefined>((latest, topic) => {
         if (!completedIds.has(topic.id)) return latest
         if (!latest) return topic
         const latestIdx = grammarList.findIndex((g) => g.id === latest.id)
         const topicIdx = grammarList.findIndex((g) => g.id === topic.id)
         return topicIdx > latestIdx ? topic : latest
      }, undefined)

      const nextTopic = lastCompletedTopic
         ? getNextTopicInUnit(grammarList ?? [], lastCompletedTopic.id)
         : grammarList?.[0]

      return {
         completedTopics,
         totalTopics,
         percentage,
         isComplete,
         nextTopic: nextTopic
            ? {
                 id: nextTopic.id,
                 name: nextTopic.topic_name || 'Próximo tema'
              }
            : undefined
      }
   }, [isGuest, grammarList, userGrammarProgress])

   return {
      ...metrics,
      isLoading
   }
}
