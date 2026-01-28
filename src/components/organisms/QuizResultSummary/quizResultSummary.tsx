'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

import likeAnimation from '@/assets/animated/like.json'
import sadAnimation from '@/assets/animated/sad.json'
import shipAnimation from '@/assets/animated/ship.json'
import { AtomButton, AtomText } from '@/components/atoms'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

type PerformanceLevel = 'excellent' | 'good' | 'needs-improvement'

type PerformanceData = {
   color: 'success' | 'warning' | 'error'
   level: string
   message: string
}

type OrganismQuizResultSummaryProps = {
   grammarTopicId?: string
   id: string
   incorrectAnswers: number
   performance: PerformanceLevel
   quizType: 'article' | 'grammar'
   score: number
   scorePercentage: number
   totalQuestions: number
}

const PERFORMANCE_CONFIG: Record<PerformanceLevel, PerformanceData> = {
   excellent: {
      color: 'success',
      level: 'Excelente',
      message: '¡Increíble! Has superado el quiz con gran destreza.'
   },
   good: {
      color: 'warning',
      level: 'Bien',
      message: '¡Muy bien! Estás en el camino correcto.'
   },
   'needs-improvement': {
      color: 'error',
      level: 'Necesitas mejorar',
      message: '¡No te desanimes! Cada intento te acerca más a la meta.'
   }
}

const ANIMATION_MAP: Record<PerformanceLevel, any> = {
   excellent: shipAnimation,
   good: likeAnimation,
   'needs-improvement': sadAnimation
}

export const OrganismQuizResultSummary = ({
   grammarTopicId,
   id,
   incorrectAnswers,
   performance,
   quizType,
   score,
   scorePercentage,
   totalQuestions
}: OrganismQuizResultSummaryProps) => {
   const performanceData = PERFORMANCE_CONFIG[performance]
   const animation = ANIMATION_MAP[performance]

   return (
      <div className="lg:col-span-4">
         <div className="sticky top-6 space-y-4">
            <div className="text-center">
               <div className="flex flex-col items-center justify-center">
                  <Suspense fallback={<div className="mb-2 h-16 w-16 animate-pulse rounded-full bg-gray-200" />}>
                     <div className="mb-2 h-24 w-24">
                        <Lottie animationData={animation} loop style={{ height: '100%', width: '100%' }} />
                     </div>
                  </Suspense>

                  <AtomText color={performanceData.color} fontSize="medium" isBold>
                     {performanceData.level}
                  </AtomText>
                  <AtomText fontSize="medium">{performanceData.message}</AtomText>
               </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
               <AtomText fontSize="medium" isBold>
                  Resumen
               </AtomText>
               <div className="mt-3 space-y-2">
                  <div className="flex justify-between">
                     <AtomText fontSize="small">Total preguntas:</AtomText>
                     <AtomText fontSize="small" isBold isPrimary>
                        {totalQuestions}
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
                        {incorrectAnswers}
                     </AtomText>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between">
                     <AtomText fontSize="small">Porcentaje:</AtomText>
                     <AtomText color="primary" isBold>
                        {scorePercentage}%
                     </AtomText>
                  </div>
               </div>
            </div>

            <div className="hidden lg:block">
               <div className="mt-4 flex flex-wrap justify-between gap-3">
                  {quizType === 'article' && (
                     <>
                        <AtomButton href="/app/article" isBlock type="link">
                           Buscar otros artículos
                        </AtomButton>
                        <AtomButton href={`/app/article/${id}`} isBlock type="link" variant="OUTLINE">
                           Leer de nuevo
                        </AtomButton>
                     </>
                  )}

                  {quizType === 'grammar' && grammarTopicId && (
                     <AtomButton href={`/app/grammar?topic=${grammarTopicId}`} isBlock type="link">
                        Seguir con gramática
                     </AtomButton>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}
