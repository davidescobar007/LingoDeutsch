'use client'
import { useState } from 'react'

import { AtomText, AtomTitle, Icon } from '@/components/atoms'
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
   const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set())

   const groupedByUnit = grammarList.reduce<GroupedByLearningUnit>((acc, topic) => {
      const unitId = topic.learning_unit_id || 'uncategorized'
      const unitTitle = topic.expand?.learning_unit_id?.title || 'Sin categoría'

      if (!acc[unitId]) {
         acc[unitId] = {
            id: unitId,
            title: unitTitle,
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

   const toggleUnit = (unitId: string) => {
      setExpandedUnits((prev) => {
         const newSet = new Set(prev)
         if (newSet.has(unitId)) {
            newSet.delete(unitId)
         } else {
            newSet.add(unitId)
         }
         return newSet
      })
   }

   const getCompletedTopicsCount = (topics: TGrammar[]): number => {
      return userGrammarProgress?.filter((p) => topics.some((t) => t.id === p.grammar_id && p.isCompleted)).length
   }

   return (
      <aside className="container-card self-start border p-6 lg:sticky lg:top-20 lg:col-span-4">
         <div className="mb-4 flex items-center gap-2">
            <span className="text-2xl">{levelInfo.emoji}</span>
            <div>
               <AtomTitle extraClassName="!text-base !mb-0" type="h3">
                  Temas - {selectedLevel}
               </AtomTitle>
               <AtomText className="text-xs" fontSize="small" isThin>
                  {levelInfo.label}
               </AtomText>
            </div>
         </div>
         <div className="mt-4">
            {sortedUnits.length > 0 ? (
               <div className="space-y-2">
                  {sortedUnits.map((unit) => {
                     const isExpanded = expandedUnits.has(unit.id || 'uncategorized')
                     const completedCount = getCompletedTopicsCount(unit.topics)
                     const totalCount = unit.topics.length

                     return (
                        <div className="border-base-300 rounded-lg border" key={unit.id || 'uncategorized'}>
                           <button
                              className="hover:bg-base-200 flex w-full items-center justify-between p-3 text-left"
                              onClick={() => toggleUnit(unit.id || 'uncategorized')}
                              type="button"
                           >
                              <div className="flex flex-col">
                                 <AtomTitle extraClassName="!mb-0 !text-sm" type="h4">
                                    {unit.title}
                                 </AtomTitle>
                                 <AtomText className="text-xs" fontSize="small" isThin>
                                    {completedCount}/{totalCount} completados
                                 </AtomText>
                              </div>
                              <Icon
                                 className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                 icon="chevron-down"
                                 iconSize="small"
                              />
                           </button>
                           {isExpanded && (
                              <div className="border-base-300 border-t p-2">
                                 <MoleculeTimeLine
                                    activeTopic={selectedTopic}
                                    onSelectTopic={onSelectTopic}
                                    topics={unit.topics}
                                    userGrammarProgress={userGrammarProgress}
                                 />
                              </div>
                           )}
                        </div>
                     )
                  })}
               </div>
            ) : (
               <div className="py-8 text-center">
                  <div className="inline-block">
                     <div className="border-primary h-6 w-6 animate-spin rounded-full border-b-2" />
                  </div>
                  <AtomText className="mt-3" isThin>
                     Cargando temas...
                  </AtomText>
               </div>
            )}
         </div>
      </aside>
   )
}
