'use client'
import { useMemo } from 'react'
import brainAnimation from '@public/animated/brain.json'
import Lottie from 'lottie-react'

import { AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { MoleculeAlert, MoleculeTable } from '@/components/molecules'
import { useGetVocabularyList, useGetVocabularyStats } from '@/hooks/cards'
import { isWordDue } from '@/modules/actions/actions.utils'

const Vocabulary = () => {
   const { data } = useGetVocabularyList({})
   const { data: vocabularyStats } = useGetVocabularyStats()
   const easyWords = data?.filter((item: any) => item.level === 'easy')
   const mediumWords = data?.filter((item: any) => item.level === 'medium')
   const hardWords = data?.filter((item: any) => item.level === 'hard')

   const allWords = data || []
   const dueForReview = allWords.filter((card) => isWordDue(card))

   const totalDueCount = dueForReview.length

   // Calculate due words by level
   const easyWordsDue = easyWords?.filter((card) => isWordDue(card))?.length || 0
   const mediumWordsDue = mediumWords?.filter((card) => isWordDue(card))?.length || 0
   const hardWordsDue = hardWords?.filter((card) => isWordDue(card))?.length || 0

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
            <AtomTitle type="h3">Tu Vocabulario Personal</AtomTitle>
            <AtomText>
               {data?.length
                  ? 'Aquí están todas las palabras que has guardado desde los artículos. Usa el sistema de repetición espaciada para memorizarlas de forma eficiente.'
                  : 'Tu espacio personal para guardar y practicar palabras en alemán. Ve a la sección de artículos y haz clic en cualquier palabra para añadirla aquí.'}
            </AtomText>
         </header>
         {/* Always informative banner */}
         <section className="my-8">
            {!data?.length && (
               <MoleculeAlert
                  message="Tu vocabulario está vacío. Ve a la sección 'Artículos' y haz clic en cualquier palabra alemana mientras lees para guardarla aquí automáticamente y comenzar a practicarla."
                  type="info"
               />
            )}
         </section>

         {data?.length && (
            <>
               <section className="mb-8">
                  {/* Practice Section */}
                  <div className="mb-8">
                     <div className="rounded-xl bg-white p-6 shadow-md">
                        {/* Stats Bar */}
                        <div className="mb-6 flex items-center justify-around rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 p-4">
                           <div className="flex gap-2 text-center">
                              <AtomText color="primary" fontSize="medium" isBold>
                                 {data?.length || 0}
                              </AtomText>
                              <AtomText fontSize="small">Total</AtomText>
                           </div>
                           <div className="h-10 w-px bg-gray-300" />
                           <div className="flex gap-2 text-center">
                              <AtomText color="success" fontSize="medium" isBold>
                                 {easyWords?.length || 0}
                              </AtomText>
                              <AtomText fontSize="small">Fáciles</AtomText>
                           </div>
                           <div className="h-10 w-px bg-gray-300" />
                           <div className="flex gap-2 text-center">
                              <AtomText color="warning" fontSize="medium" isBold>
                                 {mediumWords?.length || 0}
                              </AtomText>
                              <AtomText fontSize="small">Medias</AtomText>
                           </div>
                           <div className="h-10 w-px bg-gray-300" />
                           <div className="flex gap-2 text-center">
                              <AtomText color="error" fontSize="medium" isBold>
                                 {hardWords?.length || 0}
                              </AtomText>
                              <AtomText fontSize="small">Difíciles</AtomText>
                           </div>
                        </div>

                        {/* Inteligente Banner */}
                        {totalDueCount > 0 && (
                           <div className="mb-6">
                              <div className="from-primary to-secondary flex items-center gap-4 rounded-2xl bg-gradient-to-r p-4 text-white shadow-lg">
                                 <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                                    <Lottie animationData={brainAnimation} className="h-12 w-12" loop />
                                 </div>
                                 <div className="flex-1">
                                    <AtomTitle extraClassName="text-white" type="h4">
                                       Repetición Espaciada Inteligente
                                    </AtomTitle>
                                    <AtomText color="light" fontSize="small">
                                       {totalDueCount} palabra{totalDueCount === 1 ? '' : 's'} para repasar.
                                    </AtomText>
                                 </div>
                                 <AtomButton
                                    href="vocabulary/practice?level=intelligent"
                                    size="sm"
                                    type="link"
                                    variant="PRIMARY"
                                 >
                                    <span className="">Repasar</span>
                                 </AtomButton>
                              </div>
                           </div>
                        )}

                        {/* Practice List - iOS Style */}
                        <div className="space-y-3">
                           <AtomTitle type="h4">Practica por nivel de dificultad</AtomTitle>

                           {/* Practice Levels - iOS List Style */}
                           <div className="overflow-hidden rounded-2xl bg-gray-50">
                              {/* Básico */}
                              <div className="border-b border-gray-200 bg-white">
                                 <div className="flex items-center gap-4 p-4">
                                    <div className="bg-success/20 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
                                       <span className="text-xl">🟢</span>
                                    </div>
                                    <div className="flex-1">
                                       <AtomTitle extraClassName="!mb-0" type="h4">
                                          Nivel Básico
                                       </AtomTitle>
                                       <AtomText fontSize="small" isThin>
                                          {easyWords?.length || 0} palabras • {easyWordsDue} pendientes
                                       </AtomText>
                                    </div>
                                    {easyWords?.length ? (
                                       <a
                                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                                          href="vocabulary/practice?level=easy"
                                       >
                                          <svg
                                             className="h-4 w-4 text-gray-600"
                                             fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24"
                                          >
                                             <path
                                                d="M9 5l7 7-7 7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                             />
                                          </svg>
                                       </a>
                                    ) : (
                                       <AtomText fontSize="small">Vacío</AtomText>
                                    )}
                                 </div>
                              </div>

                              {/* Intermedio */}
                              <div className="border-b border-gray-200 bg-white">
                                 <div className="flex items-center gap-4 p-4">
                                    <div className="bg-warning/30 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
                                       <span className="text-xl">🟡</span>
                                    </div>
                                    <div className="flex-1">
                                       <AtomTitle extraClassName="!mb-0" type="h4">
                                          Nivel Intermedio
                                       </AtomTitle>
                                       <AtomText fontSize="small" isThin>
                                          {mediumWords?.length || 0} palabras • {mediumWordsDue} pendientes
                                       </AtomText>
                                    </div>
                                    {mediumWords?.length ? (
                                       <a
                                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                                          href="vocabulary/practice?level=medium"
                                       >
                                          <svg
                                             className="h-4 w-4 text-gray-600"
                                             fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24"
                                          >
                                             <path
                                                d="M9 5l7 7-7 7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                             />
                                          </svg>
                                       </a>
                                    ) : (
                                       <AtomText fontSize="small">Vacío</AtomText>
                                    )}
                                 </div>
                              </div>

                              {/* Avanzado */}
                              <div className="bg-white">
                                 <div className="flex items-center gap-4 p-4">
                                    <div className="bg-error/30 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
                                       <span className="text-xl">🔴</span>
                                    </div>
                                    <div className="flex-1">
                                       <AtomTitle extraClassName="!mb-0" type="h4">
                                          Nivel Avanzado
                                       </AtomTitle>
                                       <AtomText fontSize="small" isThin>
                                          {hardWords?.length || 0} palabras • {hardWordsDue} pendientes
                                       </AtomText>
                                    </div>
                                    {hardWords?.length ? (
                                       <a
                                          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                                          href="vocabulary/practice?level=hard"
                                       >
                                          <svg
                                             className="h-4 w-4 text-gray-600"
                                             fill="none"
                                             stroke="currentColor"
                                             viewBox="0 0 24 24"
                                          >
                                             <path
                                                d="M9 5l7 7-7 7"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                             />
                                          </svg>
                                       </a>
                                    ) : (
                                       <AtomText fontSize="small" isThin>
                                          Vacío
                                       </AtomText>
                                    )}
                                 </div>
                              </div>
                           </div>

                           {/* Streak Summary at Bottom */}
                           <div className="mt-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4">
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <span className="text-2xl">🔥</span>
                                    <div>
                                       <AtomText fontSize="medium">Racha de los últimos 7 días</AtomText>
                                       <div className="mt-1 flex gap-1">
                                          {vocabularyStats?.last7DayStreak.map((item, i) => (
                                             <div className="text-xs" key={i}>
                                                {item.completed ? '❤️' : '🤍'}
                                             </div>
                                          ))}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>

               <MoleculeTable columns={columns} data={tableData} title="Todas tus palabras guardadas" />
            </>
         )}
      </div>
   )
}

export default Vocabulary
