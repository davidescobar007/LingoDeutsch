'use client'

import { AtomText, AtomTitle } from '@/components/atoms'
import {
   OrganismGrammarContent,
   OrganismGrammarLevelSelector,
   OrganismGrammarSidebar
} from '@/components/organisms'
import { TGrammar, TUserGrammarProgress } from '@/modules/actions/types'
import { GRAMMAR_LEVEL_INFO, GRAMMAR_LEVELS, GrammarLevel } from '@/modules/global.types'
import { getNextTopicInUnit } from '@/utils/grammar.utils'

type LevelProgress = {
   completed: number
   percentage: number
   total: number
}

type TemplateGrammarProps = {
   grammarList: TGrammar[]
   grammarTopicContent?: TGrammar
   isTopicLoading: boolean
   onLevelSelect: (_level: GrammarLevel) => void
   onSaveGrammarProgress: (_grammar_id: string, _score: number) => void
   onSelectTopic: (_topicId: string | null) => void
   selectedLevel: GrammarLevel
   selectedTopic: string | null
   userGrammarProgress: TUserGrammarProgress[]
}

export const TemplateGrammar = ({
   grammarList,
   grammarTopicContent,
   isTopicLoading,
   onLevelSelect,
   onSaveGrammarProgress,
   onSelectTopic,
   selectedLevel,
   selectedTopic,
   userGrammarProgress
}: TemplateGrammarProps) => {
   const getLevelProgress = (level: GrammarLevel): LevelProgress => {
      if (level === selectedLevel && grammarList.length > 0) {
         const completedGrammarIds = new Set(
            userGrammarProgress?.filter((p) => p.isCompleted).map((p) => p.grammar_id)
         )
         const completedCount = grammarList.filter((g) => completedGrammarIds.has(g.id)).length
         const total = grammarList.length
         const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0
         return { completed: completedCount, percentage, total }
      }
      return { completed: 0, percentage: 0, total: 0 }
   }

   // prettier-ignore
   const allLevelProgress: Record<GrammarLevel, LevelProgress> = GRAMMAR_LEVELS.reduce(
      (acc, level) => {
         acc[level] = getLevelProgress(level)
         return acc
      },
      {} as Record<GrammarLevel, LevelProgress>
   )

   const handleLevelSelect = (level: GrammarLevel) => {
      onLevelSelect(level)
      onSelectTopic(null)
   }

   const handleSelectTopic = (topicId: string) => {
      onSelectTopic(topicId)
   }

   const handleNextTopic = () => {
      if (!selectedTopic || !grammarList?.length) return
      const nextTopic = getNextTopicInUnit(grammarList, selectedTopic)
      if (nextTopic) onSelectTopic(nextTopic.id)
   }

   const handleMarkAsLearned = () => {
      if (selectedTopic) {
         onSaveGrammarProgress(selectedTopic, 100)
         handleNextTopic()
      }
   }

   return (
      <main className="w-full">
         <div className="mb-12">
            <AtomTitle type="h1">Gramática Alemana</AtomTitle>
            <AtomText className="mt-2">
               Domina la gramática paso a paso, desde lo básico hasta nivel avanzado.
            </AtomText>
         </div>

         <OrganismGrammarLevelSelector
            levelInfo={GRAMMAR_LEVEL_INFO}
            levels={GRAMMAR_LEVELS}
            onLevelSelect={handleLevelSelect}
            progress={allLevelProgress}
            selectedLevel={selectedLevel}
         />

         <div className="border-base-300 my-12 border-t" />

         <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12">
            <OrganismGrammarSidebar
               grammarList={grammarList}
               levelInfo={GRAMMAR_LEVEL_INFO[selectedLevel]}
               onSelectTopic={handleSelectTopic}
               selectedLevel={selectedLevel}
               selectedTopic={selectedTopic}
               userGrammarProgress={userGrammarProgress}
            />

            <OrganismGrammarContent
               grammarTopicContent={grammarTopicContent}
               isTopicLoading={isTopicLoading}
               onMarkAsLearned={handleMarkAsLearned}
               onNextTopic={handleNextTopic}
               selectedTopic={selectedTopic}
               userGrammarProgress={userGrammarProgress}
            />
         </div>
      </main>
   )
}
