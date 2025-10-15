'use client'

import { Suspense } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useLocale } from 'next-intl'

import likeAnimation from '@/assets/animated/like.json'
import sadAnimation from '@/assets/animated/sad.json'
import shipAnimation from '@/assets/animated/ship.json'
import { AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { MoleculeAlert } from '@/components/molecules'
import { calculateScore } from '@/utils/quiz.utils'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

type QuizQuestion = {
   id: string
   type: string
   question: {
      de: string
      es: string
   }
   options: Record<string, string>
   correctAnswers: string[]
}

type QuizResultProps = {
   score: number
   questions: QuizQuestion[]
   userAnswers: string[]
   id: string
   typeOfQuizz: 'article' | 'grammar'
   nextTopicId?: string
}

const getOptionKey = (options: Record<string, string>, value: string): string | undefined => {
   return Object.entries(options).find(([_, optionValue]) => optionValue === value)?.[0]
}

export const QuizResult = ({
   score,
   questions,
   userAnswers,
   id,
   typeOfQuizz,
   nextTopicId = undefined
}: QuizResultProps) => {
   const locale = useLocale() as 'de' | 'es'
   const finalScore = calculateScore(score, questions.length)
   const isApproved = finalScore >= 60

   // Determine grammar navigation: next topic if approved, same topic if not
   const grammarTopicId = isApproved && nextTopicId ? nextTopicId : id

   const getPerformanceData = (score: number) => {
      if (score >= 80)
         return {
            key: 1,
            level: 'Excelente',
            color: 'success' as const,
            icon: 'trophy' as const,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600'
         }
      if (score >= 60)
         return {
            key: 2,
            level: 'Bien',
            color: 'warning' as const,
            icon: 'star' as const,
            iconBg: 'bg-orange-100',
            iconColor: 'text-orange-600'
         }
      return {
         key: 3,
         level: 'Necesitas mejorar',
         color: 'error' as const,
         icon: 'bookmark-x' as const,
         iconBg: 'bg-red-100',
         iconColor: 'text-red-600'
      }
   }

   const performance = getPerformanceData(finalScore)

   return (
      <div className="mx-auto w-full">
         {/* Dynamic Header with Performance */}

         <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-center gap-4">
               {isApproved ? (
                  <>
                     <div className="rounded-full bg-green-100 p-3">
                        <CheckCircle2 className="text-green-600" size={32} />
                     </div>
                     <div>
                        <AtomText color="success" fontSize="large" isBold>
                           ¡Felicitaciones! Quiz Aprobado
                        </AtomText>
                        <br />
                        <AtomText fontSize="medium">Has superado el umbral mínimo del 60%</AtomText>
                     </div>
                  </>
               ) : (
                  <>
                     <div className="rounded-full bg-red-100 p-3">
                        <XCircle className="text-red-600" size={32} />
                     </div>
                     <div>
                        <AtomText color="error" fontSize="large" isBold>
                           Quiz No Aprobado
                        </AtomText>
                        <br />
                        <AtomText fontSize="medium">Necesitas al menos 60% para aprobar</AtomText>
                     </div>
                  </>
               )}
            </div>
         </div>

         <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column - Combined Sidebar Info */}
            <div className="lg:col-span-4">
               <div className="sticky top-6 space-y-4">
                  {/* Performance Badge */}
                  <div className="text-center">
                     <div className="flex flex-col items-center justify-center">
                        <Suspense
                           fallback={<div className="mb-2 h-16 w-16 animate-pulse rounded-full bg-gray-200" />}
                        >
                           <div className="mb-2 h-24 w-24">
                              <Lottie
                                 animationData={
                                    performance.key === 1
                                       ? shipAnimation
                                       : performance.key === 2
                                       ? likeAnimation
                                       : sadAnimation
                                 }
                                 loop
                                 style={{ width: '100%', height: '100%' }}
                              />
                           </div>
                        </Suspense>

                        <AtomText color={performance.color} fontSize="large" isBold>
                           {performance.level}
                        </AtomText>
                        <AtomText fontSize="medium">
                           {performance.key === 1 && <>¡Increíble! Has superado el quiz con gran destreza.</>}
                           {performance.key === 2 && <>¡Muy bien! Estás en el camino correcto.</>}
                           {performance.key === 3 && <>¡No te desanimes! Cada intento te acerca más a la meta.</>}
                        </AtomText>
                     </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                     <AtomText fontSize="medium" isBold>
                        Resumen
                     </AtomText>
                     <div className="mt-3 space-y-2">
                        <div className="flex justify-between">
                           <AtomText fontSize="small">Total preguntas:</AtomText>
                           <AtomText fontSize="small" isBold isPrimary>
                              {questions.length}
                           </AtomText>
                        </div>
                        <div className="flex justify-between">
                           <AtomText fontSize="small">Correctas:</AtomText>
                           <AtomText fontSize="small" isBold>
                              {score}
                           </AtomText>
                        </div>
                        <div className="flex justify-between">
                           <AtomText fontSize="small">Incorrectas:</AtomText>
                           <AtomText color="danger" fontSize="small" isBold>
                              {questions.length - score}
                           </AtomText>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between">
                           <AtomText fontSize="small">Porcentaje:</AtomText>
                           <AtomText color="primary" isBold>
                              {finalScore}%
                           </AtomText>
                        </div>
                     </div>
                  </div>
                  <div className="hidden lg:block">
                     <div className="mt-4 flex flex-wrap justify-between gap-3">
                        {typeOfQuizz === 'article' && (
                           <>
                              <AtomButton href="/app/article" isBlock type="link">
                                 Buscar otros artículos
                              </AtomButton>
                              <AtomButton href={`/app/article/${id}`} isBlock type="link" variant="OUTLINE">
                                 Leer de nuevo
                              </AtomButton>
                           </>
                        )}

                        {typeOfQuizz === 'grammar' && (
                           <AtomButton href={`/app/grammar?topic=${grammarTopicId}`} isBlock type="link">
                              Seguir con gramática
                           </AtomButton>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Column - Detailed Analysis */}
            <div className="lg:col-span-8">
               {/* Detailed Results */}
               <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <AtomTitle type="h3">Análisis detallado de respuestas</AtomTitle>

                  <ul className="mt-6 space-y-4">
                     {questions.map((q, idx) => {
                        const userAnswer = userAnswers[idx]
                        const userAnswerKey = getOptionKey(q.options, userAnswer)
                        const isCorrect = userAnswerKey ? q.correctAnswers.includes(userAnswerKey) : false

                        const correctAnswerTexts = q.correctAnswers
                           .map((key) => q.options[key])
                           .filter(Boolean)
                           .join(', ')

                        const questionText =
                           typeof q.question === 'string'
                              ? q.question
                              : q.question[locale] || 'Pregunta no disponible'

                        const feedbackMessage = isCorrect
                           ? `Tu respuesta: ${userAnswer || 'Sin respuesta'}`
                           : `Tu respuesta: ${userAnswer || 'Sin respuesta'} | Correcta(s): ${correctAnswerTexts}`

                        return (
                           <li className="group" key={q.id || idx}>
                              <div className="transform transition-all duration-200 group-hover:scale-[1.02]">
                                 <MoleculeAlert
                                    message={feedbackMessage}
                                    title={`${idx + 1}. ${questionText}`}
                                    type={isCorrect ? 'success' : 'error'}
                                 />
                              </div>
                           </li>
                        )
                     })}
                  </ul>
               </div>

               <div className="block lg:hidden">
                  <div className="mt-4 flex flex-wrap justify-between gap-3">
                     {typeOfQuizz === 'article' && (
                        <>
                           <AtomButton href="/app/article" isBlock type="link">
                              Buscar otros artículos
                           </AtomButton>
                           <AtomButton href={`/app/article/${id}`} isBlock type="link" variant="OUTLINE">
                              Leer de nuevo
                           </AtomButton>
                        </>
                     )}
                     {typeOfQuizz === 'grammar' && (
                        <AtomButton href={`/app/grammar?topic=${grammarTopicId}`} isBlock type="link">
                           Seguir con gramática
                        </AtomButton>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
