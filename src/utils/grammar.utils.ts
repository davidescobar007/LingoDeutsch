import { TGrammar } from '@/modules/actions/types'

/**
 * Finds the next topic within the same learning unit.
 * Falls back to the first topic of the next learning unit if at the end of current unit.
 */
export const getNextTopicInUnit = (grammarList: TGrammar[], currentTopicId: string): TGrammar | undefined => {
   const currentIndex = grammarList.findIndex((t) => t.id === currentTopicId)
   if (currentIndex === -1) return undefined

   const currentTopic = grammarList[currentIndex]
   const currentUnitId = currentTopic.learning_unit_id || 'uncategorized'

   // Find topics in the same learning unit (preserving list order)
   const sameUnitTopics = grammarList.filter((t) => (t.learning_unit_id || 'uncategorized') === currentUnitId)

   // Find position within the same unit
   const indexInUnit = sameUnitTopics.findIndex((t) => t.id === currentTopicId)
   const nextInUnit = sameUnitTopics[indexInUnit + 1]

   if (nextInUnit) return nextInUnit

   // Fallback: first topic of the next learning unit (based on sidebar visual order)
   const groupOrder = grammarList.reduce<string[]>((acc, topic) => {
      const unitId = topic.learning_unit_id || 'uncategorized'
      if (!acc.includes(unitId)) acc.push(unitId)
      return acc
   }, [])

   const currentGroupIndex = groupOrder.indexOf(currentUnitId)
   const nextGroupId = groupOrder[currentGroupIndex + 1]

   if (nextGroupId) {
      return grammarList.find((t) => (t.learning_unit_id || 'uncategorized') === nextGroupId)
   }

   return undefined
}
