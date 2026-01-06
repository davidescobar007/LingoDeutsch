/* eslint-disable react/no-unstable-nested-components */
'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { BookOpen, ChevronRight } from 'lucide-react'
import remarkGfm from 'remark-gfm'

import { AtomBadge, AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { MarkdownTable } from '@/components/molecules'
import { TGrammar, TUserGrammarProgress } from '@/modules/actions/types'

type OrganismGrammarContentProps = {
   grammarTopicContent?: TGrammar
   onMarkAsLearned: () => void
   onNextTopic: () => void
   selectedTopic: string | null
   userGrammarProgress: TUserGrammarProgress[]
}

export const OrganismGrammarContent = ({
   grammarTopicContent,
   onMarkAsLearned,
   onNextTopic,
   selectedTopic,
   userGrammarProgress
}: OrganismGrammarContentProps) => {
   const [visibleSections, setVisibleSections] = useState<number>(1)

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

   useEffect(() => {
      setVisibleSections(1)
   }, [selectedTopic])

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

   const isTopicCompleted = userGrammarProgress?.some((topic) => topic.grammar_id === selectedTopic)

   if (!grammarTopicContent || !selectedTopic) {
      return (
         <section className="container-card border p-6 lg:col-span-8" id="grammar-content">
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
         </section>
      )
   }

   const sections = getContentSections(grammarTopicContent.content)
   const totalSections = getTotalSections(grammarTopicContent.content)

   return (
      <section className="container-card border p-6 lg:col-span-8" id="grammar-content">
         <header className="border-base-300 mb-6 flex items-center justify-between rounded-lg border-b pb-4">
            <AtomTitle extraClassName="mt-0" type="h3">
               {grammarTopicContent?.topic_name?.es}
            </AtomTitle>
            <AtomBadge color="primary">{grammarTopicContent?.level}</AtomBadge>
         </header>

         <div className="markdown-content">{renderContentSections(sections)}</div>

         {visibleSections < totalSections && (
            <div className="mt-4 flex justify-center">
               <AtomButton onClick={() => setVisibleSections((prev) => prev + 1)} variant="OUTLINE">
                  Ver más
               </AtomButton>
            </div>
         )}

         {visibleSections >= totalSections && (
            <footer className="border-base-300 mt-6 border-t pt-6">
               <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                     <AtomButton href={`/app/quiz/${selectedTopic}?type=grammar`} type="link" variant="PRIMARY">
                        <span className="flex items-center justify-center gap-2">🎯 Empezar Quiz</span>
                     </AtomButton>
                     <AtomButton onClick={onNextTopic} variant="OUTLINE">
                        Siguiente <ChevronRight />
                     </AtomButton>
                  </div>

                  {!isTopicCompleted && (
                     <div className="mt-4 flex justify-center sm:justify-end">
                        <AtomText fontSize="small" isThin type="paragraph">
                           ¿Ya dominas este tema?{' '}
                           <span className="text-primary cursor-pointer hover:underline" onClick={onMarkAsLearned}>
                              Márcalo como aprendido
                           </span>
                        </AtomText>
                     </div>
                  )}
               </div>
            </footer>
         )}
      </section>
   )
}
