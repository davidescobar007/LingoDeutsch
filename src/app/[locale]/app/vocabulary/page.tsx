'use client'
import { useMemo, useState } from 'react'

import { AtomText, AtomTitle } from '@/components/atoms'
import { MoleculeAlert, MoleculeMiniCard, MoleculeTable } from '@/components/molecules'
import { type VocabularyLevel } from '@/data/vocabularyTopics'
import { useGetVocabularyList } from '@/hooks/cards'

const Vocabulary = () => {
   const { data } = useGetVocabularyList({})
   const [selectedLevel, setSelectedLevel] = useState<VocabularyLevel>('A1')
   const [isAddingTopic, setIsAddingTopic] = useState<string | null>(null)

   const easyWords = data?.filter((item: any) => item.level === 'easy')
   const mediumWords = data?.filter((item: any) => item.level === 'medium')
   const hardWords = data?.filter((item: any) => item.level === 'hard')

   const handleAddVocabularySet = async (topicId: string) => {
      setIsAddingTopic(topicId)

      // Simulate API call to add vocabulary set
      // This would typically call an API endpoint to add a set of words for this topic
      // For now, we'll just simulate the loading state
      setTimeout(() => {
         setIsAddingTopic(null)
         // Here you would typically show a success message or update the data
         console.log(`Added vocabulary set for topic: ${topicId}`)
      }, 1000)
   }

   const tableData = useMemo(() => {
      if (!data) return []
      return data.map((item: any) => {
         let levelDisplay = item.level || '-'
         if (item.level === 'hard') {
            levelDisplay = `🔴 Dificil`
         } else if (item.level === 'medium') {
            levelDisplay = `🟡 Medio`
         } else if (item.level === 'easy') {
            levelDisplay = `🟢 Facil`
         }
         return {
            german: item.expand?.word_id?.german_translation || '-',
            spanish: item.expand?.word_id?.spanish_translation || '-',
            level: levelDisplay
         }
      })
   }, [data])

   const columns = useMemo(
      () => [
         {
            header: 'Alemán',
            accessorKey: 'german'
         },
         {
            header: 'Español',
            accessorKey: 'spanish'
         },
         {
            header: 'Nivel',
            accessorKey: 'level'
         }
      ],
      []
   )

   return (
      <div className="w-full">
         <header className="w-full">
            <AtomTitle type="h3">Tu guia de Vocabulario</AtomTitle>
            <AtomText>
               {data?.length
                  ? 'Explora tu guía de vocabulario. Selecciona tu set de palabras por nivel para empezar a aprender y practicar.'
                  : 'Tu espacio personal para guardar y practicar nuevas palabras en alemán.'}
            </AtomText>
         </header>
         {/* Always informative banner */}
         <section className="my-8">
            {data?.length ? (
               <MoleculeAlert
                  message={`Tienes ${data.length} palabra${
                     data.length === 1 ? '' : 's'
                  } en tu vocabulario. ¡Selecciona un nivel para practicar!`}
                  type="success"
               />
            ) : (
               <MoleculeAlert
                  message="Tu vocabulario está vacío. Visita la sección de artículos y haz clic en cualquier palabra mientras lees para guardarla en tu diccionario personal y comenzar a practicar."
                  type="info"
               />
            )}
         </section>

         {data?.length === 0 ? null : (
            <>
               <AtomTitle type="h5">Practica por nivel de dificultad</AtomTitle>

               <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <MoleculeMiniCard
                     actionButton={
                        easyWords?.length
                           ? {
                                text: 'Practicar',
                                href: 'vocabulary/practice?level=easy',
                                variant: 'PRIMARY',
                                size: 'sm'
                             }
                           : undefined
                     }
                     content="Nivel Fácil"
                     description={
                        easyWords?.length
                           ? `${easyWords
                                .slice(0, 3)
                                .map((item) => item.expand?.word_id?.german_translation)
                                .join(', ')}...`
                           : 'No tienes palabras en este nivel'
                     }
                     footer={`${easyWords?.length || 0} palabras`}
                     icon={<span className="text-3xl">🟢</span>}
                     size="lg"
                  />
                  <MoleculeMiniCard
                     actionButton={
                        mediumWords?.length
                           ? {
                                text: 'Practicar',
                                href: 'vocabulary/practice?level=medium',
                                variant: 'PRIMARY',
                                size: 'sm'
                             }
                           : undefined
                     }
                     content="Nivel Medio"
                     description={
                        mediumWords?.length
                           ? `${mediumWords
                                .slice(0, 3)
                                .map((item) => item.expand?.word_id?.german_translation)
                                .join(', ')}...`
                           : 'No tienes palabras en este nivel'
                     }
                     footer={`${mediumWords?.length || 0} palabras`}
                     icon={<span className="text-3xl">🟡</span>}
                     size="lg"
                  />
                  <MoleculeMiniCard
                     actionButton={
                        hardWords?.length
                           ? {
                                text: 'Practicar',
                                href: 'vocabulary/practice?level=hard',
                                variant: 'PRIMARY',
                                size: 'sm'
                             }
                           : undefined
                     }
                     content="Nivel Difícil"
                     description={
                        hardWords?.length
                           ? `${hardWords
                                .slice(0, 3)
                                .map((item) => item.expand?.word_id?.german_translation)
                                .join(', ')}...`
                           : 'No tienes palabras en este nivel'
                     }
                     footer={`${hardWords?.length || 0} palabras`}
                     icon={<span className="text-3xl">🔴</span>}
                     size="lg"
                  />
               </div>

               {/* New Section: Vocabulary Topics by CEFR Level */}

               {/* <section className="my-12">
                  <AtomTitle type="h5">Añade vocabulario por tema</AtomTitle>
                  <AtomText className="mb-6">
                     Expande tu vocabulario con palabras organizadas por nivel CEFR y tema específico.
                  </AtomText>

                  <div className="mb-6 flex flex-wrap gap-2">
                     {Object.keys(vocabularyTopics).map((level) => (
                        <AtomBadge
                           className="transition-all hover:scale-105"
                           color="primary"
                           key={level}
                           onClick={() => setSelectedLevel(level as VocabularyLevel)}
                           outline={selectedLevel !== level}
                           size="lg"
                        >
                           {level}
                        </AtomBadge>
                     ))}
                  </div>

                  <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                     {vocabularyTopics[selectedLevel as keyof typeof vocabularyTopics].map((topic, index) => {
                        // Mock data for demonstration
                        const hasProgress = index % 3 === 0
                        const progressValue = hasProgress
                           ? index % 6 === 0
                              ? 100 // Every 6th card is mastered (100%)
                              : Math.floor(Math.random() * 80) + 10 // Random progress 10-89%
                           : 0

                        return (
                           <MoleculeMiniCard
                              content={topic.name}
                              description={topic.description}
                              footer={`${topic.wordCount} palabras`}
                              icon={
                                 isAddingTopic === topic.id ? (
                                    <Icon icon="settings" iconState="primary" />
                                 ) : (
                                    <AtomText fontSize="large">{topic.icon}</AtomText>
                                 )
                              }
                              isLoading={isAddingTopic === topic.id}
                              key={topic.id}
                              onClick={() => handleAddVocabularySet(topic.id)}
                              progressIndicator={
                                 hasProgress
                                    ? {
                                         value: progressValue,
                                         showIcon: progressValue === 100,
                                         color: progressValue === 100 ? 'success' : 'warning',
                                         size: 'sm'
                                      }
                                    : undefined
                              }
                              size="md"
                              state={
                                 hasProgress ? (progressValue === 100 ? 'completed' : 'inProgress') : 'default'
                              }
                              variant="detailed"
                           />
                        )
                     })}
                  </div>

                  <MoleculeAlert
                     message="💡 Haz clic en cualquier tema para añadir todas sus palabras a tu vocabulario personal y comenzar a practicarlas."
                     type="info"
                  />
               </section> */}

               <div className="shadow-xl">
                  <MoleculeTable columns={columns} data={tableData} title="Tu vocabulario" />
               </div>
            </>
         )}
      </div>
   )
}

export default Vocabulary
