/* eslint-disable react/no-unstable-nested-components */
'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { BookOpen, ChevronRight, GraduationCap } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import remarkGfm from 'remark-gfm'

import { AtomBadge, AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { MoleculeTimeLine } from '@/components/molecules'
import {
   useGetGrammarByLevel,
   useGetSingleGrammarTopic,
   useSavedGrammarTopicByUser,
   useSaveGrammarProgress
} from '@/hooks/grammar'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'

const Grammar = () => {
   const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
   const searchParams = useSearchParams()
   const topicFromUrl = searchParams.get('topic')
   const t = useTranslations()
   const user = getUserInfo() as TUser
   const { data } = useGetGrammarByLevel('A1')
   const { data: grammarTopicContent } = useGetSingleGrammarTopic(selectedTopic as string)
   const { data: userGrammarProgress } = useSavedGrammarTopicByUser(user)
   const { mutate: saveGrammarProgress } = useSaveGrammarProgress()

   // Set selected topic from URL parameter when component mounts or URL changes
   useEffect(() => {
      if (topicFromUrl && data) {
         // Check if the topic ID exists in the data
         const topicExists = data.some((topic) => topic.id === topicFromUrl)
         if (topicExists) {
            setSelectedTopic(topicFromUrl)
         }
      }
   }, [topicFromUrl, data])

   const scrollToGrammarContent = () => {
      const grammarContent = document.getElementById('grammar-content')
      if (grammarContent) {
         grammarContent.scrollIntoView({ behavior: 'smooth' })
      }
   }

   const handleSelectTopic = (topic: string) => {
      setSelectedTopic(topic)
      scrollToGrammarContent()
   }

   return (
      <main className="flex w-full flex-wrap justify-between gap-7 rounded-xl ">
         <header className="w-full">
            <AtomTitle type="h3">Tu Guía de Gramática Alemana</AtomTitle>
            <AtomText>
               Explora nuestra completa guía de gramática alemana. Selecciona un tema de la lista para empezar a
               aprender y practicar.
            </AtomText>
         </header>
         <aside className="card-outlined !block w-full md:w-4/12">
            <AtomTitle type="h3">Temas de Gramática</AtomTitle>
            <div className="">
               <MoleculeTimeLine
                  activeTopic={selectedTopic}
                  onSelectTopic={(topic) => handleSelectTopic(topic)}
                  topics={data || []}
                  userGrammarProgress={userGrammarProgress}
               />
            </div>
         </aside>
         <section className="card-outlined md:w-15/24 !block w-full" id="grammar-content">
            {grammarTopicContent && selectedTopic ? (
               <>
                  <header className="bg-secondary mb-3 flex items-center justify-between rounded-md border-b-2 p-2 shadow-md">
                     <AtomTitle extraClassName="text-primary mt-3" type="h3">
                        {grammarTopicContent?.topic_name?.es}
                     </AtomTitle>
                     <AtomBadge>{grammarTopicContent?.level}</AtomBadge>
                  </header>
                  {grammarTopicContent?.content && (
                     <div className="markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{grammarTopicContent.content}</ReactMarkdown>
                     </div>
                  )}
                  <footer className="mt-4 flex flex-wrap justify-end gap-4 border-t-2 py-4">
                     {!userGrammarProgress?.some((topic) => topic.grammar_id === selectedTopic) && (
                        <AtomButton
                           onClick={() => {
                              saveGrammarProgress({ user, grammar_id: selectedTopic })
                           }}
                           variant="OUTLINE"
                        >
                           Marcar leccion como aprendida <GraduationCap />
                        </AtomButton>
                     )}
                     <AtomButton
                        onClick={() => {
                           const currentIndex = data?.findIndex((topic) => topic.id === selectedTopic)
                           if (
                              currentIndex !== undefined &&
                              currentIndex >= 0 &&
                              currentIndex < (data?.length || 0) - 1
                           ) {
                              setSelectedTopic(data?.[currentIndex + 1]?.id || null)
                           }
                        }}
                     >
                        Siguien Leccion <ChevronRight />
                     </AtomButton>
                  </footer>
               </>
            ) : (
               <div className="flex w-full flex-wrap justify-center">
                  <div className="mb-8 flex w-full justify-center ">
                     <div className="bg-secondary text-primary rounded-full p-4 ">
                        <BookOpen size={50} />
                     </div>
                  </div>
                  <AtomText className="">Elige un tema de gramática para comenzar</AtomText>
                  <br />
               </div>
            )}
         </section>
      </main>
   )
}

export default Grammar
