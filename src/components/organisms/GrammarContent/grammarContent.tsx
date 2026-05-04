/* eslint-disable react/no-unstable-nested-components */
'use client'

import React, { useEffect, useState } from 'react'
import { BookOpen, ChevronRight } from 'lucide-react'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'

import { SpinLoader } from '@/components/atoms'
import { AtomBadge, AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import {
   MarkdownTable,
   MoleculeAlert,
   MoleculeChatBubble,
   MoleculePodcastPlayer,
   MoleculeReveal,
   MoleculeTypewriterMarkdown
} from '@/components/molecules'
import { useGeneratePodcastAudio } from '@/hooks/grammar'
import { TGrammar, TUserGrammarProgress } from '@/modules/actions/types'

const markdownComponents = {
   'alert-error': (_props: { children?: React.ReactNode }) => (
      <MoleculeAlert message={extractTextFromChildren(_props.children)} type="error" />
   ),
   'alert-info': (_props: { children?: React.ReactNode }) => (
      <MoleculeAlert message={extractTextFromChildren(_props.children)} type="info" />
   ),
   'alert-success': (_props: { children?: React.ReactNode }) => (
      <MoleculeAlert message={extractTextFromChildren(_props.children)} type="success" />
   ),
   'alert-warning': (_props: { children?: React.ReactNode }) => (
      <MoleculeAlert message={extractTextFromChildren(_props.children)} type="warning" />
   ),
   'chat-bubble': (_props: { align?: string; avatar?: string; children?: React.ReactNode; name?: string }) => (
      <MoleculeChatBubble
         align={(_props.align as 'left' | 'right') || 'left'}
         avatar={_props.avatar}
         message={extractTextFromChildren(_props.children)}
         name={_props.name || ''}
      />
   ),
   reveal: (_props: { children?: React.ReactNode; title?: string }) => (
      <MoleculeReveal title={_props.title || 'Ver más'}>{_props.children}</MoleculeReveal>
   ),
   table: (_props: { children?: React.ReactNode }) => <MarkdownTable>{_props.children}</MarkdownTable>
} as any

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
   isTopicLoading: boolean
   onMarkAsLearned: () => void
   onNextTopic: () => void
   selectedTopic: string | null
   userGrammarProgress: TUserGrammarProgress[]
}

export const OrganismGrammarContent = ({
   grammarTopicContent,
   isTopicLoading,
   onMarkAsLearned,
   onNextTopic,
   selectedTopic,
   userGrammarProgress
}: OrganismGrammarContentProps) => {
   const isTopicCompleted = userGrammarProgress?.some((topic) => topic.grammar_id === selectedTopic)
   const [isTypewriterComplete, setIsTypewriterComplete] = useState(false)

   const generatePodcast = useGeneratePodcastAudio(grammarTopicContent?.id ?? '')

   useEffect(() => {
      setIsTypewriterComplete(false)
   }, [selectedTopic])

   if (selectedTopic && isTopicLoading) {
      return (
         <section className="container-card border p-6 lg:col-span-8" id="grammar-content">
            <div className="flex w-full items-center justify-center py-16">
               <SpinLoader />
            </div>
         </section>
      )
   }

   if (!grammarTopicContent || !selectedTopic) {
      return (
         <section className="container-card border p-6 lg:col-span-8" id="grammar-content">
            <div className="flex w-full flex-col items-center justify-center gap-4 py-16">
               <div className="bg-primary/10 rounded-full p-6">
                  <BookOpen className="text-primary" size={60} />
               </div>
               <div className="text-center">
                  <AtomTitle type="h3">Elige un tema</AtomTitle>
                  <AtomText className="mt-1" fontSize="small">
                     Selecciona un tema de la lista lateral para comenzar a aprender
                  </AtomText>
               </div>
            </div>
         </section>
      )
   }

   return (
      <section className="container-card border p-6 lg:col-span-8" id="grammar-content">
         <header className="border-base-300 mb-6 flex items-center justify-between rounded-lg border-b pb-4">
            <AtomTitle extraClassName="mt-0" type="h3">
               {grammarTopicContent?.topic_name?.es}
            </AtomTitle>
            <AtomBadge color="primary">{grammarTopicContent?.level}</AtomBadge>
         </header>

         {grammarTopicContent?.podcast_content && (
            <MoleculePodcastPlayer
               grammarId={grammarTopicContent.id}
               handleGeneratePodcast={generatePodcast.mutateAsync}
               isGenerating={generatePodcast.isPending}
               podcastAudio={grammarTopicContent.podcast_audio}
               podcastContent={grammarTopicContent.podcast_content}
            />
         )}

         <div className="markdown-content !min-w-full">
            <MoleculeTypewriterMarkdown
               components={markdownComponents}
               delay={200}
               onComplete={() => setIsTypewriterComplete(true)}
               remarkPlugins={[remarkDirective, remarkDirectiveRehype, remarkGfm]}
            >
               {grammarTopicContent.content}
            </MoleculeTypewriterMarkdown>
         </div>

         <footer
            className={`border-base-300 mt-6 border-t pt-6 transition-opacity duration-500 ${
               isTypewriterComplete ? 'opacity-100' : 'opacity-0'
            }`}
         >
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
