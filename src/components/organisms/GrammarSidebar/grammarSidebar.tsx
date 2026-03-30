'use client'

import { AtomText, AtomTitle } from '@/components/atoms'
import { MoleculeLearningUnitCard } from '@/components/molecules'
import { MoleculeTimeLine } from '@/components/molecules'
import { TGrammar, TUserGrammarProgress } from '@/modules/actions/types'
import { GrammarLevel } from '@/modules/global.types'

type LevelInfo = {
   description: string
   emoji: string
   label: string
}

type OrganismGrammarSidebarProps = {
   grammarList: TGrammar[]
   levelInfo: LevelInfo
   onSelectTopic: (_topicId: string) => void
   selectedLevel: GrammarLevel
   selectedTopic: string | null
   userGrammarProgress: TUserGrammarProgress[]
}

type GroupedByLearningUnit = {
   [key: string]: {
      id: string | null
      title: string
      learningGoal: string
      topics: TGrammar[]
   }
}

export const OrganismGrammarSidebar = ({
   grammarList,
   levelInfo,
   onSelectTopic,
   selectedLevel,
   selectedTopic,
   userGrammarProgress
}: OrganismGrammarSidebarProps) => {
   const groupedByUnit = grammarList.reduce<GroupedByLearningUnit>((acc, topic) => {
      const unitId = topic.learning_unit_id || 'uncategorized'
      const unitTitle = topic.expand?.learning_unit_id?.title || 'Sin categoría'
      const unitLearningGoal = topic.expand?.learning_unit_id?.learning_goal || ''

      if (!acc[unitId]) {
         acc[unitId] = {
            id: unitId,
            title: unitTitle,
            learningGoal: unitLearningGoal,
            topics: []
         }
      }
      acc[unitId].topics.push(topic)
      return acc
   }, {})

   const sortedUnits = Object.values(groupedByUnit).sort((a, b) => {
      if (a.id === 'uncategorized') return 1
      if (b.id === 'uncategorized') return -1
      return 0
   })

   const getCompletedTopicsCount = (topics: TGrammar[]): number => {
      return userGrammarProgress?.filter((p) => topics.some((t) => t.id === p.grammar_id && p.isCompleted)).length
   }

   const selectedTopicUnitId = selectedTopic
      ? grammarList.find((topic) => topic.id === selectedTopic)?.learning_unit_id || null
      : null

   const accordionName = `grammar-units-${selectedLevel}`

   return (
      <aside className="container-card self-start border p-6 lg:sticky lg:top-20 lg:col-span-4">
         <div className="mb-6 space-y-2">
            <div className="flex items-center gap-3">
               <div className="from-primary/10 to-primary/5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br shadow-sm">
                  <span className="text-2xl">{levelInfo.emoji}</span>
               </div>
               <div className="flex-1">
                  <AtomTitle extraClassName="!text-lg !mb-1 font-semibold" type="h3">
                     Temas - {selectedLevel}
                  </AtomTitle>
                  <AtomText className="text-sm" fontSize="small" isThin>
                     {levelInfo.label}
                  </AtomText>
               </div>
            </div>

            <div className="via-base-300 h-px w-full bg-gradient-to-r from-transparent to-transparent" />
         </div>

         <div className="join join-vertical w-full">
            {sortedUnits.length > 0 ? (
               sortedUnits.map((unit, _index) => {
                  const completedCount = getCompletedTopicsCount(unit.topics)

                  return (
                     <MoleculeLearningUnitCard
                        accordionName={accordionName}
                        completedCount={completedCount}
                        isOpen={unit.id === selectedTopicUnitId}
                        key={unit.id || 'uncategorized'}
                        learningGoal={unit.learningGoal}
                        title={unit.title}
                        totalCount={unit.topics.length}
                     >
                        <MoleculeTimeLine
                           activeTopic={selectedTopic}
                           onSelectTopic={onSelectTopic}
                           topics={unit.topics}
                           userGrammarProgress={userGrammarProgress}
                        />
                     </MoleculeLearningUnitCard>
                  )
               })
            ) : (
               <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative">
                     <div className="border-base-300 border-t-primary h-12 w-12 animate-spin rounded-full border-4" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-base-100 h-6 w-6 rounded-full" />
                     </div>
                  </div>
                  <AtomText className="mt-4 text-center" fontSize="small" isThin>
                     Cargando unidades de aprendizaje...
                  </AtomText>
               </div>
            )}
         </div>
      </aside>
   )
}
