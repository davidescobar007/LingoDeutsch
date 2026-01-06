'use client'

import { AtomText, AtomTitle } from '@/components/atoms'
import {
   OrganismGrammarContent,
   OrganismGrammarLevelSelector,
   OrganismGrammarSidebar
} from '@/components/organisms'
import { TGrammar, TUserGrammarProgress } from '@/modules/actions/types'

type GrammarLevel = 'A1' | 'A2' | 'B1' | 'B2'

const LEVELS: GrammarLevel[] = ['A1', 'A2', 'B1', 'B2']

const LEVEL_INFO: Record<GrammarLevel, { description: string; emoji: string; label: string }> = {
   A1: {
      description: 'Fundamentos básicos',
      emoji: '🌱',
      label: 'Principiante'
   },
   A2: {
      description: 'Consolidar conocimientos',
      emoji: '🌿',
      label: 'Elemental'
   },
   B1: {
      description: 'Expresión más compleja',
      emoji: '🌳',
      label: 'Intermedio'
   },
   B2: {
      description: 'Dominio más profundo',
      emoji: '🏔️',
      label: 'Intermedio Avanzado'
   }
}

type TemplateGrammarProps = {
   grammarList: TGrammar[]
   grammarTopicContent?: TGrammar
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
   onLevelSelect,
   onSaveGrammarProgress,
   onSelectTopic,
   selectedLevel,
   selectedTopic,
   userGrammarProgress
}: TemplateGrammarProps) => {
   const getLevelProgress = (level: GrammarLevel) => {
      if (level === selectedLevel && grammarList.length > 0) {
         const completedCount =
            userGrammarProgress?.filter((p) => grammarList.some((g) => g.id === p.grammar_id && p.isCompleted))
               .length || 0
         const total = grammarList.length
         const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0
         return { completed: completedCount, percentage, total }
      }
      return { completed: 0, percentage: 0, total: 0 }
   }

   const allLevelProgress = LEVELS.reduce((acc, level) => {
      acc[level] = getLevelProgress(level)
      return acc
   }, {} as Record<GrammarLevel, { completed: number; percentage: number; total: number }>)

   const handleLevelSelect = (level: GrammarLevel) => {
      onLevelSelect(level)
      onSelectTopic(null)
   }

   const handleSelectTopic = (topicId: string) => {
      onSelectTopic(topicId)
   }

   const handleNextTopic = () => {
      const currentIndex = grammarList?.findIndex((topic) => topic.id === selectedTopic)
      if (currentIndex !== undefined && currentIndex >= 0 && currentIndex < (grammarList?.length || 0) - 1) {
         onSelectTopic(grammarList?.[currentIndex + 1]?.id || null)
      }
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
            levelInfo={LEVEL_INFO}
            levels={LEVELS}
            onLevelSelect={handleLevelSelect}
            progress={allLevelProgress}
            selectedLevel={selectedLevel}
         />

         <div className="border-base-300 my-12 border-t" />

         <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12">
            <OrganismGrammarSidebar
               grammarList={grammarList}
               levelInfo={LEVEL_INFO[selectedLevel]}
               onSelectTopic={handleSelectTopic}
               selectedLevel={selectedLevel}
               selectedTopic={selectedTopic}
               userGrammarProgress={userGrammarProgress}
            />

            <OrganismGrammarContent
               grammarTopicContent={grammarTopicContent}
               onMarkAsLearned={handleMarkAsLearned}
               onNextTopic={handleNextTopic}
               selectedTopic={selectedTopic}
               userGrammarProgress={userGrammarProgress}
            />
         </div>
      </main>
   )
}
