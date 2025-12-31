/* eslint-disable react/no-unstable-nested-components */
'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { BookOpen, ChevronRight } from 'lucide-react'
import remarkGfm from 'remark-gfm'

import { AtomBadge, AtomButton, AtomPill, AtomText, AtomTitle } from '@/components/atoms'
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
         const completedCount =
            userGrammarProgress?.filter((p) => grammarList.some((g) => g.id === p.grammar_id && p.isCompleted))
               .length || 0
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
         <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
            {LEVELS.map((level) => {
               const progress = getLevelProgress(level)
               const locked = isLevelLocked(level)
               const info = LEVEL_INFO[level]
               const isSelected = selectedLevel === level

               let badge: string | null = null
               if (locked) {
                  badge = '🔒'
               } else if (progress.percentage === 100) {
                  badge = '✅'
               } else if (progress.percentage > 0) {
                  badge = `${progress.percentage}%`
               }

               return (
                  <AtomPill
                     badge={badge}
                     disabled={locked}
                     emoji={info.emoji}
                     isSelected={isSelected}
                     key={level}
                     label={level}
                     onClick={() => {
                        if (!locked) {
                           setSelectedLevel(level)
                           setSelectedTopic(null)
                           setVisibleSections(1)
                        }
                     }}
                  />
               )
            })}
         </div>

         {/* Divider */}
         <div className="border-base-300 my-12 border-t" />

         {/* Topics List + Lesson View */}
         <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Sidebar - Topics List */}
            <aside className="border-base-300 bg-base-100 self-start rounded-lg border p-6 shadow-md lg:sticky lg:top-20 lg:col-span-4">
               <div className="mb-4 flex items-center gap-2">
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

            {/* Main Content - Lesson or Empty State */}
            <section
               className="border-base-300 bg-base-100 rounded-lg border p-6 shadow-md lg:col-span-8"
               id="grammar-content"
            >
               {grammarTopicContent && selectedTopic ? (
                  <>
                     <header className="border-base-300 mb-6 flex items-center justify-between rounded-lg border-b pb-4">
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
                           <AtomButton onClick={() => setVisibleSections((prev) => prev + 1)} variant="OUTLINE">
                              Ver más
                           </AtomButton>
                        </div>
                     )}

                     {visibleSections >= getTotalSections(grammarTopicContent.content) && (
                        <footer className="border-base-300 mt-6 border-t pt-6">
                           <div className="flex flex-col gap-4">
                              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                 <AtomButton
                                    href={`/app/quiz/${selectedTopic}?type=grammar`}
                                    type="link"
                                    variant="PRIMARY"
                                 >
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
                                          className="text-primary cursor-pointer hover:underline"
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
                     <div className="bg-primary/10 rounded-full p-6">
                        <BookOpen className="text-primary" size={60} />
                     </div>
                     <div className="text-center">
                        <AtomTitle type="h3">Elige un tema</AtomTitle>
                        <AtomText className="text-base-content/60 mt-1">
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
