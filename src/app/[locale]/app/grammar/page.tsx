/* eslint-disable react/no-unstable-nested-components */
'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { BookOpen, ChevronRight } from 'lucide-react'
import remarkGfm from 'remark-gfm'

import { AtomBadge, AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { MarkdownTable, MoleculeTimeLine } from '@/components/molecules'
import {
   useGetGrammarByLevel,
   useGetSingleGrammarTopic,
   useSavedGrammarTopicByUser,
   useSaveGrammarProgress
} from '@/hooks/grammar'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'

type GrammarLevel = 'A1' | 'A2' | 'B1' | 'B2'
const LEVELS: GrammarLevel[] = ['A1', 'A2', 'B1', 'B2']

const LEVEL_INFO: Record<GrammarLevel, { label: string; description: string; emoji: string }> = {
   A1: {
      emoji: '🌱',
      label: 'Principiante',
      description: 'Fundamentos básicos'
   },
   A2: {
      emoji: '🌿',
      label: 'Elemental',
      description: 'Consolidar conocimientos'
   },
   B1: {
      emoji: '🌳',
      label: 'Intermedio',
      description: 'Expresión más compleja'
   },
   B2: {
      emoji: '🏔️',
      label: 'Intermedio Avanzado',
      description: 'Dominio más profundo'
   }
}

const Grammar = () => {
   const [selectedLevel, setSelectedLevel] = useState<GrammarLevel>('A1')
   const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
   const [visibleSections, setVisibleSections] = useState<number>(1)
   const user = getUserInfo() as TUser
   const { data: grammarList = [] } = useGetGrammarByLevel(selectedLevel)
   const { data: grammarTopicContent } = useGetSingleGrammarTopic(selectedTopic as string)
   const { data: userGrammarProgress = [] } = useSavedGrammarTopicByUser(user)
   const { mutate: saveGrammarProgress } = useSaveGrammarProgress()

   // Calculate progress for a level
   const getLevelProgress = (level: GrammarLevel) => {
      // Simulate progress for display (actual data loaded on demand)
      if (level === 'A1' && grammarList.length > 0) {
         const completedCount = userGrammarProgress?.filter((p) =>
            grammarList.some((g) => g.id === p.grammar_id && p.isCompleted)
         ).length || 0
         const total = grammarList.length
         const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0
         return { completed: completedCount, total, percentage }
      }
      // Default progress for other levels (will update when selected)
      return { completed: 0, total: 0, percentage: 0 }
   }

   // Check if level is locked
   const isLevelLocked = (_level: GrammarLevel) => {
      return false
   }

   useEffect(() => {
      if (grammarTopicContent && visibleSections > 0) {
         const grammarContent = document.getElementsByClassName('markdown-section')
         if (grammarContent) {
            grammarContent[grammarContent.length - 1]?.scrollIntoView({ behavior: 'smooth' })
            grammarContent[grammarContent.length - 1]?.classList.remove('opacity-0')
            if (grammarContent.length > 1) {
               grammarContent[grammarContent.length - 1]?.classList.add('animate__animated', 'animate__slideInUp')
            }
         }
         if (visibleSections === 1) {
            scrollToGrammarContent()
         }
      }
   }, [grammarTopicContent, visibleSections])

   const getTotalSections = (content: string): number => {
      return content?.split(/^---$/m).length
   }

   const getContentSections = (content: string): string[] => {
      return content?.split(/^---$/m) || []
   }

   const renderContentSections = (sections: string[]) => {
      return sections.map((section, index) => {
         if (index >= visibleSections) return null
         const isLastVisible = index === visibleSections - 1
         return (
            <div className={`markdown-section ${isLastVisible ? 'opacity-0' : ''}`} key={index}>
               <ReactMarkdown
                  components={{
                     table: ({ children }) => <MarkdownTable>{children}</MarkdownTable>
                  }}
                  remarkPlugins={[remarkGfm]}
               >
                  {section}
               </ReactMarkdown>
               {index < sections.length - 1 && <hr className="my-4" />}
            </div>
         )
      })
   }

   const scrollToGrammarContent = () => {
      const grammarContent = document.getElementById('grammar-content')
      if (grammarContent) {
         grammarContent.scrollIntoView({ behavior: 'smooth' })
      }
   }

   const handleSelectTopic = (topic: string) => {
      setVisibleSections(1)
      setSelectedTopic(topic)
      scrollToGrammarContent()
   }

   const handleNextTopic = () => {
      const currentIndex = grammarList?.findIndex((topic) => topic.id === selectedTopic)
      if (currentIndex !== undefined && currentIndex >= 0 && currentIndex < (grammarList?.length || 0) - 1) {
         setVisibleSections(1)
         setSelectedTopic(grammarList?.[currentIndex + 1]?.id || null)
      }
   }

   return (
      <main className="w-full">
         {/* Header */}
         <div className="mb-12">
            <AtomTitle type="h1">Gramática Alemana</AtomTitle>
            <AtomText className="mt-2">
               Domina la gramática paso a paso, desde lo básico hasta nivel avanzado.
            </AtomText>
         </div>

         {/* Level Selector - Minimalist Horizontal Pills */}
         <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {LEVELS.map((level) => {
               const progress = getLevelProgress(level)
               const locked = isLevelLocked(level)
               const info = LEVEL_INFO[level]
               const isSelected = selectedLevel === level

               return (
                  <button
                     className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                        isSelected
                           ? 'bg-primary text-white shadow-md'
                           : locked
                             ? 'bg-base-200 text-base-content/40 cursor-not-allowed'
                             : 'bg-base-100 border border-base-300 text-base-content hover:border-primary/50 hover:bg-base-50'
                     }`}
                     disabled={locked}
                     key={level}
                     onClick={() => {
                        if (!locked) {
                           setSelectedLevel(level)
                           setSelectedTopic(null)
                           setVisibleSections(1)
                        }
                     }}
                  >
                     <span className="text-lg">{info.emoji}</span>
                     <span className="font-semibold">{level}</span>
                     {locked ? (
                        <span className="text-sm">🔒</span>
                     ) : progress.percentage === 100 ? (
                        <span className="text-sm">✅</span>
                     ) : progress.percentage > 0 ? (
                        <span className="text-xs bg-white/20 rounded-full px-2 py-0.5">{progress.percentage}%</span>
                     ) : null}
                  </button>
               )
            })}
         </div>

         {/* Divider */}
         <div className="my-12 border-t border-base-300" />

         {/* Topics List + Lesson View */}
         <div className="flex w-full flex-wrap justify-between gap-6">
            {/* Sidebar - Topics List */}
            <aside className="w-full lg:w-4/12 rounded-lg border border-base-300 bg-base-100 shadow-md p-6">
               <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{LEVEL_INFO[selectedLevel].emoji}</span>
                  <div>
                     <AtomTitle extraClassName="!text-base !mb-0" type="h3">
                        Temas - {selectedLevel}
                     </AtomTitle>
                     <AtomText className="text-xs" fontSize="small" isThin>
                        {LEVEL_INFO[selectedLevel].label}
                     </AtomText>
                  </div>
               </div>
               <div className="mt-4">
                  {grammarList.length > 0 ? (
                     <MoleculeTimeLine
                        activeTopic={selectedTopic}
                        onSelectTopic={(topic) => handleSelectTopic(topic)}
                        topics={grammarList}
                        userGrammarProgress={userGrammarProgress}
                     />
                  ) : (
                     <div className="text-center py-8">
                        <div className="inline-block">
                           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                        </div>
                        <AtomText className="mt-3" isThin>
                           Cargando temas...
                        </AtomText>
                     </div>
                  )}
               </div>
            </aside>

            {/* Main Content - Lesson or Empty State */}
            <section className="w-full lg:w-15/24 rounded-lg border border-base-300 bg-base-100 shadow-md p-6" id="grammar-content">
               {grammarTopicContent && selectedTopic ? (
                  <>
                     <header className="mb-6 flex items-center justify-between rounded-lg border-b border-base-300 pb-4">
                        <AtomTitle extraClassName="mt-0" type="h3">
                           {grammarTopicContent?.topic_name?.es}
                        </AtomTitle>
                        <AtomBadge color="primary">{grammarTopicContent?.level}</AtomBadge>
                     </header>

                     <div className="markdown-content">
                        {renderContentSections(getContentSections(grammarTopicContent.content))}
                     </div>

                     {visibleSections < getTotalSections(grammarTopicContent.content) && (
                        <div className="mt-4 flex justify-center">
                           <AtomButton
                              onClick={() => setVisibleSections((prev) => prev + 1)}
                              variant="OUTLINE"
                           >
                              Ver más
                           </AtomButton>
                        </div>
                     )}

                     {visibleSections >= getTotalSections(grammarTopicContent.content) && (
                        <footer className="mt-6 border-t border-base-300 pt-6">
                           <div className="flex flex-col gap-4">
                              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                 <AtomButton href={`/app/quiz/${selectedTopic}?type=grammar`} type="link" variant="PRIMARY">
                                    <span className="flex items-center justify-center gap-2">🎯 Empezar Quiz</span>
                                 </AtomButton>
                                 <AtomButton onClick={() => handleNextTopic()} variant="OUTLINE">
                                    Siguiente <ChevronRight />
                                 </AtomButton>
                              </div>

                              {!userGrammarProgress?.some((topic) => topic.grammar_id === selectedTopic) && (
                                 <div className="mt-4 flex justify-center sm:justify-end">
                                    <AtomText fontSize="small" isThin type="paragraph">
                                       ¿Ya dominas este tema?{' '}
                                       <span
                                          className="cursor-pointer text-primary hover:underline"
                                          onClick={() => {
                                             saveGrammarProgress({ user, grammar_id: selectedTopic, score: 100 })
                                             handleNextTopic()
                                          }}
                                       >
                                          Márcalo como aprendido
                                       </span>
                                    </AtomText>
                                 </div>
                              )}
                           </div>
                        </footer>
                     )}
                  </>
               ) : (
                  <div className="flex w-full flex-col items-center justify-center gap-4 py-16">
                     <div className="rounded-full bg-primary/10 p-6">
                        <BookOpen className="text-primary" size={60} />
                     </div>
                     <div className="text-center">
                        <AtomTitle type="h3">Elige un tema</AtomTitle>
                        <AtomText className="mt-1 text-base-content/60">
                           Selecciona un tema de la lista lateral para comenzar a aprender
                        </AtomText>
                     </div>
                  </div>
               )}
            </section>
         </div>
      </main>
   )
}

export default Grammar
