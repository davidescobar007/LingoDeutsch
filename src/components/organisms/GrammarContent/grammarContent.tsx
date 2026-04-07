/* eslint-disable react/no-unstable-nested-components */
'use client'

import React from 'react'
import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import { BookOpen, ChevronRight } from 'lucide-react'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'

import { AtomBadge, AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { MarkdownTable, MoleculeAlert } from '@/components/molecules'
import { TGrammar, TUserGrammarProgress } from '@/modules/actions/types'

type CustomComponents = Components & {
   'alert-error'?: React.FC<{ children?: React.ReactNode }>
   'alert-info'?: React.FC<{ children?: React.ReactNode }>
   'alert-success'?: React.FC<{ children?: React.ReactNode }>
   'alert-warning'?: React.FC<{ children?: React.ReactNode }>
}

const extractTextFromChildren = (children: React.ReactNode): string => {
   if (typeof children === 'string') {
      return children
   }
   if (Array.isArray(children)) {
      return children.map(extractTextFromChildren).join('')
   }
   if (React.isValidElement(children) && children.props.children) {
      return extractTextFromChildren(children.props.children)
   }
   return ''
}

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
   const getContentSections = (content: string): string[] => {
      return content?.split(/^---$/m) || []
   }

   const renderContentSections = (sections: string[]) => {
      const components: CustomComponents = {
         'alert-error': (_props) => (
            <MoleculeAlert message={extractTextFromChildren(_props.children)} type="error" />
         ),
         'alert-info': (_props) => (
            <MoleculeAlert message={extractTextFromChildren(_props.children)} type="info" />
         ),
         'alert-success': (_props) => (
            <MoleculeAlert message={extractTextFromChildren(_props.children)} type="success" />
         ),
         'alert-warning': (_props) => (
            <MoleculeAlert message={extractTextFromChildren(_props.children)} type="warning" />
         ),
         table: ({ children }) => <MarkdownTable>{children}</MarkdownTable>
      }

      return sections.map((section, index) => (
         <div className="markdown-section" key={index}>
            <ReactMarkdown
               components={components}
               remarkPlugins={[remarkDirective, remarkDirectiveRehype, remarkGfm]}
            >
               {section}
            </ReactMarkdown>
            {index < sections.length - 1 && <hr className="my-4" />}
         </div>
      ))
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

   return (
      <section className="container-card border p-6 lg:col-span-8" id="grammar-content">
         <header className="border-base-300 mb-6 flex items-center justify-between rounded-lg border-b pb-4">
            <AtomTitle extraClassName="mt-0" type="h3">
               {grammarTopicContent?.topic_name?.es}
            </AtomTitle>
            <AtomBadge color="primary">{grammarTopicContent?.level}</AtomBadge>
         </header>

         <div className="markdown-content">{renderContentSections(sections)}</div>

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
      </section>
   )
}
