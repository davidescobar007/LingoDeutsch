/* eslint-disable react/no-unstable-nested-components */
'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { BookOpen, ChevronRight, GraduationCap } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
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

const Grammar = () => {
   const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
   const [visibleSections, setVisibleSections] = useState<number>(1)
   const router = useRouter()
   const searchParams = useSearchParams()
   const topicFromUrl = searchParams.get('topic')
   const _t = useTranslations()
   const user = getUserInfo() as TUser
   const { data } = useGetGrammarByLevel('A1')
   const { data: grammarTopicContent } = useGetSingleGrammarTopic(selectedTopic as string)
   const { data: userGrammarProgress } = useSavedGrammarTopicByUser(user)
   const { mutate: saveGrammarProgress } = useSaveGrammarProgress()

   useEffect(() => {
      if (topicFromUrl && data) {
         const topicExists = data.some((topic) => topic.id === topicFromUrl)
         if (topicExists) {
            setSelectedTopic(topicFromUrl)
         }
      }
      setVisibleSections(1)
   }, [topicFromUrl, data])

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
      return content.split(/^---$/m).length
   }

   const getContentSections = (content: string): string[] => {
      const sections = content.split(/^---$/m)
      return sections
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
      const params = new URLSearchParams(window.location.search)
      params.set('topic', topic)
      router.replace(`?${params.toString()}`, { scroll: false })
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
                  <header
                     className="animate__animated animate__tada bg-secondary mb-3 flex items-center justify-between rounded-md border-b-2 p-2 shadow-md"
                     id="grammar-topic-header"
                  >
                     <AtomTitle extraClassName="text-primary mt-3" type="h3">
                        {grammarTopicContent?.topic_name?.es}
                     </AtomTitle>
                     <AtomBadge color="primary">{grammarTopicContent?.level}</AtomBadge>
                  </header>

                  <>
                     <div className="markdown-content">
                        {renderContentSections(getContentSections(grammarTopicContent.content))}
                     </div>
                     {visibleSections < getTotalSections(grammarTopicContent.content) && (
                        <div className="mt-4 flex justify-center">
                           <AtomButton
                              onClick={() => {
                                 setVisibleSections((prev) => prev + 1)
                              }}
                              variant="OUTLINE"
                           >
                              Ver más
                           </AtomButton>
                        </div>
                     )}
                  </>

                  {visibleSections >= getTotalSections(grammarTopicContent.content) && (
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
                                 setVisibleSections(1)
                                 setSelectedTopic(data?.[currentIndex + 1]?.id || null)
                              }
                           }}
                        >
                           Siguien Leccion <ChevronRight />
                        </AtomButton>
                     </footer>
                  )}
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
