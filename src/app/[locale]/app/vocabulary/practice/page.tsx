'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { AtomButton, AtomText, AtomTitle, Icon } from '@/components/atoms'
import { MoleculeFlipCard, MoleculeStat } from '@/components/molecules'
import { useGetVocabularyList, useGetVocabularyStats, useUpdateCard } from '@/hooks/cards'
import { isWordDue } from '@/modules/actions/actions.utils'
import { TVocabularyCard } from '@/modules/actions/types' // Assuming TCard is exported from here

const PracticeVocabulary = () => {
   const searchParams = useSearchParams()
   const router = useRouter()
   const { refetch: refetchVocabulary } = useGetVocabularyList({})
   const { refetch: refetchVocabularyStats } = useGetVocabularyStats()
   const queryParams = Object.fromEntries(searchParams.entries())
   const level = ['easy', 'medium', 'hard'].includes(queryParams.level)
      ? (queryParams.level as 'easy' | 'medium' | 'hard')
      : undefined
   const isIntelligentMode = queryParams.level === 'intelligent'
   const { data, isLoading, refetch, isFetching } = useGetVocabularyList({ level })
   const dueForReview = (data ?? []).filter((card) => isWordDue(card))
   const { mutateAsync, isPending } = useUpdateCard()

   const [currentIndex, setCurrentIndex] = useState(0)
   const [rankings, setRankings] = useState<Record<string, 'easy' | 'medium' | 'hard'>>({})
   const [isCompleted, setIsCompleted] = useState(false)
   const [updateError, setUpdateError] = useState<string | null>(null)
   const listOfWords = isIntelligentMode ? dueForReview : data || []

   useEffect(() => {
      setCurrentIndex(0)
      setRankings({})
      setIsCompleted(false)
      setUpdateError(null)
   }, [data])

   // Reset state when level filter changes
   useEffect(() => {
      console.log('object')
      setCurrentIndex(0)
      setRankings({})
      setIsCompleted(false)
      setUpdateError(null)
   }, [level])

   useEffect(() => {
      if (isCompleted) {
         console.log('Practice session completed successfully!')
         refetchVocabulary()
         refetchVocabularyStats()
      }
   }, [isCompleted])

   if (isLoading || isFetching) {
      return <div className="flex h-screen items-center justify-center">Loading...</div>
   }

   if (!listOfWords || listOfWords.length === 0) {
      return (
         <div className="flex h-screen items-center justify-center">
            <AtomText>No hay palabras para practicar en este nivel aún.</AtomText>
         </div>
      )
   }

   const currentWord: TVocabularyCard | undefined = listOfWords[currentIndex]
   const wordText = currentWord?.expand?.word_id?.german_translation
   const translationText = currentWord?.expand?.word_id?.spanish_translation

   const handleRank = async (rank: 'easy' | 'medium' | 'hard') => {
      if (currentWord) {
         setRankings((prevRankings) => ({
            ...prevRankings,
            [currentWord.id]: rank
         }))

         // Clear any previous errors
         setUpdateError(null)

         // Update the card level and persist to database
         const updatedCard = {
            ...currentWord,
            level: rank
         }

         try {
            await mutateAsync(updatedCard)
            // Automatically move to next card after successful ranking
            handleNext()
         } catch (error) {
            console.error('Failed to update card:', error)
            setUpdateError('Error al guardar. Inténtalo de nuevo.')
         }
      }
   }

   const handleNext = () => {
      if (currentIndex < listOfWords.length - 1) {
         setCurrentIndex(currentIndex + 1)
      } else {
         setIsCompleted(true)
      }
   }

   const handleLevelChange = (newLevel: 'easy' | 'medium' | 'hard') => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('level', newLevel)
      router.push(`?${params.toString()}`)
   }

   const handleRestart = () => {
      refetch()
      setCurrentIndex(0)
      setRankings({})
      setIsCompleted(false)
      setUpdateError(null)
   }

   const getStudyStats = () => {
      const totalWords = listOfWords.length
      const rankedWords = Object.keys(rankings).length
      const easyWords = Object.values(rankings).filter((rank) => rank === 'easy').length
      const mediumWords = Object.values(rankings).filter((rank) => rank === 'medium').length
      const hardWords = Object.values(rankings).filter((rank) => rank === 'hard').length

      return {
         totalWords,
         rankedWords,
         easyWords,
         mediumWords,
         hardWords,
         completionRate: Math.round((rankedWords / totalWords) * 100)
      }
   }

   return (
      <div className="flex w-full flex-col flex-wrap justify-start ">
         <header className="w-full">
            <AtomTitle type="h3">Practica vocabulario</AtomTitle>
            <AtomText>Repasa y memoriza tu vocabulario con nuestras flashcards</AtomText>
         </header>

         {isCompleted ? (
            /* Study Summary */
            <div className="mt-8 w-full text-center">
               <AtomTitle type="h4">¡Sesión de práctica completada!</AtomTitle>

               {/* Perfect score celebration */}

               <MoleculeStat
                  items={[
                     {
                        icon: (
                           <Icon
                              icon={getStudyStats().completionRate === 100 ? 'check-circle' : 'gauge'}
                              iconSize="large"
                              iconState={
                                 getStudyStats().completionRate === 100
                                    ? 'success'
                                    : getStudyStats().completionRate >= 70
                                    ? 'info'
                                    : 'warning'
                              }
                           />
                        ),
                        title: 'Progreso de la sesión',
                        value:
                           getStudyStats().completionRate === 100
                              ? '¡Completado!'
                              : `${getStudyStats().completionRate}%`,
                        description: `${getStudyStats().rankedWords} de ${
                           getStudyStats().totalWords
                        } palabras completadas`
                     },
                     {
                        icon: (
                           <Icon
                              icon={
                                 getStudyStats().easyWords >= getStudyStats().hardWords
                                    ? 'graduation-cap'
                                    : 'target'
                              }
                              iconSize="large"
                              iconState={
                                 getStudyStats().easyWords >= getStudyStats().hardWords ? 'success' : 'warning'
                              }
                           />
                        ),
                        title: 'Rendimiento de aprendizaje',
                        value:
                           getStudyStats().easyWords >= getStudyStats().hardWords
                              ? 'Excelente dominio'
                              : 'Continúa practicando',
                        description: `${getStudyStats().easyWords} fáciles • ${
                           getStudyStats().mediumWords
                        } medias • ${getStudyStats().hardWords} difíciles`
                     }
                  ]}
               />

               {/* Action Buttons */}
               <div className="mt-4 flex items-center justify-center gap-4">
                  <AtomButton onClick={handleRestart} variant="PRIMARY">
                     Practicar de Nuevo
                  </AtomButton>

                  <AtomButton href="/app/vocabulary" onClick={handleRestart} type="link" variant="OUTLINE">
                     Ver mi vocabulario
                  </AtomButton>
               </div>
            </div>
         ) : (
            /* Study Interface */
            <>
               <section className="card-outlined mt-4 !block w-full">
                  <AtomText>Selecciona el nivel de dificultad:</AtomText>
                  <div className="mt-2 flex gap-5">
                     {(['easy', 'medium', 'hard'] as const).map((difficulty, index) => {
                        const radioClasses = ['radio-success', 'radio-warning', 'radio-error']
                        const labels = ['Fácil', 'Medio', 'Difícil']
                        return (
                           <div className="" key={difficulty}>
                              <label className="label cursor-pointer justify-start space-x-3">
                                 <input
                                    checked={level === difficulty}
                                    className={`radio ${radioClasses[index]}`}
                                    name="difficulty"
                                    onChange={() => handleLevelChange(difficulty)}
                                    type="radio"
                                 />
                                 <AtomText type="span">{labels[index]}</AtomText>
                              </label>
                           </div>
                        )
                     })}
                  </div>
               </section>
               {/* Progress Indicator */}
               <div className="my-8 flex justify-center">
                  <AtomText className="text-sm">
                     Tarjeta {currentIndex + 1} de {listOfWords.length}
                  </AtomText>
               </div>
               <footer className="w-full">
                  {currentWord && (
                     <div className="flex w-full flex-col items-center space-y-6">
                        {/* Flash Card */}

                        <MoleculeFlipCard
                           germanExample={currentWord.expand.word_id?.examples[0]?.sentence || ''}
                           germanText={wordText || ''}
                           spanishExample={currentWord.expand.word_id?.examples[0]?.spanish_translation || ''}
                           spanishText={translationText || ''}
                        />

                        {/* Rating Section */}
                        <div className="flex flex-col items-center space-y-4">
                           <AtomText className="text-lg font-semibold">
                              ¿Qué tan difícil fue esta palabra?
                           </AtomText>

                           {updateError && (
                              <div className="rounded bg-red-50 p-2 text-sm text-red-500">{updateError}</div>
                           )}

                           <div className="flex gap-4">
                              {(
                                 [
                                    { difficulty: 'easy', label: 'Fácil', variant: 'ACCENT' },
                                    { difficulty: 'medium', label: 'Medio', variant: 'WARNING' },
                                    { difficulty: 'hard', label: 'Difícil', variant: 'SECONDARY' }
                                 ] as const
                              ).map(({ difficulty, label, variant }) => {
                                 const isSelected = rankings[currentWord.id] === difficulty
                                 const isUpdating = isPending
                                 return (
                                    <AtomButton
                                       disabled={isUpdating}
                                       key={difficulty}
                                       onClick={() => handleRank(difficulty)}
                                       variant={isSelected ? variant : 'OUTLINE'}
                                    >
                                       {label}
                                    </AtomButton>
                                 )
                              })}
                           </div>
                        </div>
                     </div>
                  )}
               </footer>
            </>
         )}
      </div>
   )
}

export default PracticeVocabulary
