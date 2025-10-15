'use client'
import { useMemo } from 'react'

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

   // Calculate completed days in the last 7-day streak
   const completedDays = vocabularyStats?.last7DayStreak?.filter((item: any) => item.completed)?.length || 0

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
            {data?.length ? (
               <MoleculeAlert
                  message={`Tienes ${data.length} palabra${data.length === 1 ? '' : 's'} guardada${
                     data.length === 1 ? '' : 's'
                  } en tu vocabulario personal. ¡Úsalas para practicar con repetición espaciada!`}
                  type="success"
               />
            ) : (
               <MoleculeAlert
                  message="Tu vocabulario está vacío. Ve a la sección 'Artículos' y haz clic en cualquier palabra alemana mientras lees para guardarla aquí automáticamente y comenzar a practicarla."
                  type="info"
               />
            )}
         </section>

         {data?.length && (
            <>
               <section className="mb-8">
                  {/* Tu Racha Semanal */}
                  <div className="mb-8">
                     <div className="bg-base-100 border-primary/20 hover:border-primary/30 rounded-3xl border-2 p-6 shadow-lg transition-all duration-300">
                        <div className="mb-6 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                                 <span className="text-xl">🏆</span>
                              </div>
                              <div>
                                 <AtomText fontSize="large" isBold isPrimary>
                                    Tu Racha Semanal
                                 </AtomText>
                                 <br />
                                 <AtomText fontSize="small">Progreso de los últimos 7 días</AtomText>
                              </div>
                           </div>
                        </div>

                        <div className="bg-base-200/30 mb-6 rounded-2xl">
                           <div className="flex items-center justify-between">
                              {vocabularyStats?.last7DayStreak.map((item, i) => (
                                 <div className="group flex flex-1 flex-col items-center gap-2" key={i}>
                                    {/* Indicador de estado */}
                                    <div
                                       className={`flex h-9 w-9  items-center justify-center rounded-full text-xl ${
                                          item.completed
                                             ? 'bg-success text-white shadow-lg'
                                             : 'bg-error/20 text-error'
                                       } ${item.isToday ? 'ring-accent ring-2 ring-offset-2' : ''}`}
                                    >
                                       {item.completed ? '✅' : '💔'}
                                    </div>

                                    {/* Día */}
                                    <AtomText
                                       className={`text-center text-xs font-medium ${
                                          item.isToday ? 'text-accent font-bold' : 'text-base-content/60'
                                       }`}
                                    >
                                       {item.isToday ? 'Hoy' : item.day}
                                    </AtomText>

                                    {/* Fecha */}
                                    <AtomText
                                       className={`text-center text-xs ${
                                          item.isToday ? 'text-accent/70' : 'text-base-content/40'
                                       }`}
                                    >
                                       {item.date}
                                    </AtomText>
                                 </div>
                              ))}
                           </div>
                        </div>

                        {/* Mensaje motivacional */}
                        <div className="">
                           <div className="flex items-center gap-3">
                              <span className="text-2xl">💪</span>
                              <div>
                                 <AtomText fontSize="small" isBold isPrimary>
                                    {completedDays} de 7 días completados esta semana
                                 </AtomText>{' '}
                                 <AtomText fontSize="small" isPrimary isThin>
                                    {completedDays >= 5
                                       ? '¡Excelente! Sigue así para dominar el alemán.'
                                       : completedDays >= 3
                                       ? '¡Buen progreso! Cada día cuenta para mejorar.'
                                       : '¡Puedes hacerlo mejor! La constancia es clave.'}
                                 </AtomText>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Repetición Espaciada Inteligente */}
                  {totalDueCount > 0 && (
                     <div className="mb-8">
                        <div className="bg-base-100 border-primary/20 hover:border-primary/40 group cursor-pointer overflow-hidden rounded-3xl border-2 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                           <div className="relative">
                              <div className="mb-6 flex items-center gap-4">
                                 <div className="from-primary to-secondary flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg">
                                    <span className="text-2xl">🧠</span>
                                    <div className="bg-success absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full" />
                                 </div>

                                 <div className="flex-1">
                                    <AtomText className="text-primary mb-2 text-lg font-bold">
                                       Repaso Inteligente
                                    </AtomText>
                                    <br />
                                    <AtomText className="text-base-content/60 text-sm">
                                       Sistema de repetición espaciada adaptada para que tu cerebro retenga mejor
                                    </AtomText>
                                 </div>
                              </div>

                              {/* Words counter section */}
                              <div className="mb-6">
                                 <div className="bg-accent/5 border-accent/10 flex items-center justify-between rounded-xl border p-4">
                                    <div className="flex items-center gap-3">
                                       <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-full">
                                          <span className="text-accent text-lg">📚</span>
                                       </div>
                                       <div>
                                          <AtomText>Palabras listas para repasar</AtomText>
                                          <br />
                                          <AtomText className="!text-accent" fontSize="small" isBold>
                                             Algoritmo neuroadaptivo activo
                                          </AtomText>
                                       </div>
                                    </div>
                                    <div className="text-right">
                                       <AtomText className="!text-accent" fontSize="huge" isBlock isBold>
                                          {totalDueCount}
                                       </AtomText>
                                       <br />
                                       <AtomText className="!text-accent" fontSize="small" isBold>
                                          {totalDueCount === 1 ? 'palabra' : 'palabras'}
                                       </AtomText>
                                    </div>
                                 </div>
                              </div>

                              <AtomButton
                                 href="vocabulary/practice?level=intelligent"
                                 isBlock
                                 size="sm"
                                 type="link"
                                 variant="PRIMARY"
                              >
                                 🧠 Practicar repetición espaciada
                              </AtomButton>
                           </div>
                        </div>
                     </div>
                  )}
                  {/* Niveles de dificultad con diseño limpio */}
                  <div className="mb-8">
                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:[&>*:nth-child(3):last-child]:col-span-2 sm:[&>*:nth-child(3):last-child]:mx-auto sm:[&>*:nth-child(3):last-child]:max-w-md lg:[&>*:nth-child(3):last-child]:col-span-1 lg:[&>*:nth-child(3):last-child]:mx-0 lg:[&>*:nth-child(3):last-child]:max-w-none">
                        {/* Nivel Básico */}
                        <div className="bg-base-100 border-success/20 hover:border-success/40 group overflow-hidden rounded-3xl border-2 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                           <div className="relative flex h-full flex-col">
                              <div className="mb-4 flex h-[88px] items-start gap-4">
                                 <div className="bg-success/10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl">
                                    <span className="text-2xl">🟢</span>
                                 </div>
                                 <div>
                                    <AtomText fontSize="large" isBold>
                                       Nivel Básico
                                    </AtomText>
                                    <br />
                                    <AtomText fontSize="small">Palabras que dominas bien</AtomText>
                                 </div>
                              </div>

                              <div className="mb-6 flex-grow space-y-3">
                                 <div className="flex items-center justify-between">
                                    <AtomText fontSize="small">Disponibles</AtomText>
                                    <AtomText fontSize="large" isBold>
                                       {easyWords?.length || 0}
                                    </AtomText>
                                 </div>
                                 <progress
                                    className="progress progress-success bg-success/10 h-3 w-full"
                                    max={100}
                                    value={
                                       easyWords?.length
                                          ? Math.min((easyWordsDue / (easyWords?.length || 1)) * 100, 100)
                                          : 0
                                    }
                                 />
                                 <AtomText fontSize="small" isBold>
                                    {easyWordsDue} necesitan repaso hoy
                                 </AtomText>
                              </div>

                              <div className="mt-auto">
                                 {easyWords?.length ? (
                                    <AtomButton
                                       href="vocabulary/practice?level=easy"
                                       isBlock
                                       size="sm"
                                       type="link"
                                       variant="SUCCESS"
                                    >
                                       Practicar Nivel Básico
                                    </AtomButton>
                                 ) : (
                                    <div className="p-4 text-center">
                                       <AtomText fontSize="small">No tienes palabras en este nivel</AtomText>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>

                        {/* Nivel Intermedio */}
                        <div className="bg-base-100 border-warning/20 hover:border-warning/40 group overflow-hidden rounded-3xl border-2 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                           <div className="relative flex h-full flex-col">
                              <div className="mb-4 flex min-h-[88px] items-start gap-4">
                                 <div className="bg-warning/10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl">
                                    <span className="text-2xl">🟡</span>
                                 </div>
                                 <div>
                                    <AtomText fontSize="large" isBold>
                                       Nivel Intermedio
                                    </AtomText>
                                    <br />
                                    <AtomText fontSize="small">Palabras que estás aprendiendo</AtomText>
                                 </div>
                              </div>

                              <div className="mb-6 flex-grow space-y-3">
                                 <div className="flex items-center justify-between">
                                    <AtomText fontSize="small">Disponibles</AtomText>
                                    <AtomText fontSize="large" isBold>
                                       {mediumWords?.length || 0}
                                    </AtomText>
                                 </div>
                                 <progress
                                    className="progress progress-warning bg-warning/10 h-3 w-full"
                                    max={100}
                                    value={
                                       mediumWords?.length
                                          ? Math.min((mediumWordsDue / (mediumWords?.length || 1)) * 100, 100)
                                          : 0
                                    }
                                 />
                                 <AtomText fontSize="small" isBold>
                                    {mediumWordsDue} necesitan repaso hoy
                                 </AtomText>
                              </div>

                              <div className="mt-auto">
                                 {mediumWords?.length ? (
                                    <AtomButton
                                       href="vocabulary/practice?level=medium"
                                       isBlock
                                       size="sm"
                                       type="link"
                                       variant="ACCENT"
                                    >
                                       Practicar Nivel Intermedio
                                    </AtomButton>
                                 ) : (
                                    <div className="p-4 text-center">
                                       <AtomText fontSize="small" isBold>
                                          No tienes palabras en este nivel
                                       </AtomText>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>

                        {/* Nivel Avanzado */}
                        <div className="bg-base-100 border-error/20 hover:border-error/40 group cursor-pointer overflow-hidden rounded-3xl border-2 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                           <div className="relative flex h-full flex-col">
                              <div className="mb-4 flex min-h-[88px] items-start gap-4">
                                 <div className="bg-error/10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl">
                                    <span className="text-2xl">🔴</span>
                                 </div>
                                 <div>
                                    <AtomText fontSize="large" isBold>
                                       Nivel Avanzado
                                    </AtomText>
                                    <br />
                                    <AtomText fontSize="small">Palabras más difíciles para ti</AtomText>
                                 </div>
                              </div>

                              <div className="mb-6 flex-grow space-y-3">
                                 <div className="flex items-center justify-between">
                                    <AtomText fontSize="small">Disponibles</AtomText>
                                    <AtomText fontSize="large" isBold>
                                       {hardWords?.length || 0}
                                    </AtomText>
                                 </div>
                                 <progress
                                    className="progress progress-error bg-error/10 h-3 w-full"
                                    max={100}
                                    value={
                                       hardWords?.length
                                          ? Math.min((hardWordsDue / (hardWords?.length || 1)) * 100, 100)
                                          : 0
                                    }
                                 />
                                 <AtomText fontSize="small" isBold>
                                    {hardWordsDue} necesitan repaso hoy
                                 </AtomText>
                              </div>

                              <div className="mt-auto">
                                 {hardWords?.length ? (
                                    <AtomButton
                                       href="vocabulary/practice?level=hard"
                                       isBlock
                                       size="sm"
                                       type="link"
                                       variant="ERROR"
                                    >
                                       Practicar Nivel Avanzado
                                    </AtomButton>
                                 ) : (
                                    <div className="p-4 text-center">
                                       <AtomText fontSize="small">No tienes palabras en este nivel</AtomText>
                                    </div>
                                 )}
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
