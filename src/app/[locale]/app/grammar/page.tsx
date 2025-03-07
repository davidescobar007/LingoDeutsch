'use client'

import { useState } from 'react'
import { BookOpen, ChevronRight, GraduationCap } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { AtomBadge, AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { MoleculeTimeLine } from '@/components/molecules'
import { useGetGrammarByLevel, useGetSingleGrammarTopic } from '@/hooks/grammar'
import { parseHtmlToTIterableData } from '@/utils'

import { RenderSchema } from './[level]/grammar.utils'

const Grammar = () => {
   const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
   const { data } = useGetGrammarByLevel('A1')
   const { data: grammarTopicContent } = useGetSingleGrammarTopic(selectedTopic as string)
   const t = useTranslations()

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
               />
            </div>
         </aside>
         <section className="card-outlined md:w-15/24 !block w-full" id="grammar-content">
            {grammarTopicContent && selectedTopic ? (
               <>
                  <header className="bg-secondary mb-3 flex items-center justify-between rounded-md border-b-2 p-2 shadow-md">
                     <AtomTitle extraClassName="text-primary mt-3" type="h3">
                        {grammarTopicContent?.topic?.es}
                     </AtomTitle>
                     <AtomBadge>{grammarTopicContent?.level}</AtomBadge>
                  </header>
                  {grammarTopicContent?.content &&
                     RenderSchema(parseHtmlToTIterableData(grammarTopicContent?.content as string))}
                  <footer className="mt-4 flex flex-wrap justify-end gap-4 border-t-2 py-4">
                     <AtomButton variant="OUTLINE">
                        Marcar leccion como aprendida <GraduationCap />
                     </AtomButton>
                     <AtomButton>
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
