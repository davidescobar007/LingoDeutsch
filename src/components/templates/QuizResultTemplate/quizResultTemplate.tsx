'use client'

import { CheckCircle2, XCircle } from 'lucide-react'

import { AtomText } from '@/components/atoms'
import { OrganismQuizResultDetails, OrganismQuizResultSummary } from '@/components/organisms'

type QuizQuestion = {
   correctAnswers: string[]
   id: string
   options: Record<string, string>
   question: {
      de: string
      es: string
   }
   type: string
}

type PerformanceLevel = 'excellent' | 'good' | 'needs-improvement'

type TemplateQuizResultProps = {
   grammarTopicId?: string
   id: string
   locale: 'de' | 'es'
   questions: QuizQuestion[]
   quizType: 'article' | 'grammar'
   score: number
   scorePercentage: number
   userAnswers: string[]
}

const getPerformanceLevel = (score: number): PerformanceLevel => {
   if (score >= 80) return 'excellent'
   if (score >= 60) return 'good'
   return 'needs-improvement'
}

export const TemplateQuizResult = ({
   grammarTopicId,
   id,
   locale,
   questions,
   quizType,
   score,
   scorePercentage,
   userAnswers
}: TemplateQuizResultProps) => {
   const isApproved = scorePercentage >= 60
   const performance = getPerformanceLevel(scorePercentage)
   const incorrectAnswers = questions.length - score

   return (
      <div className="mx-auto w-full">
         <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-center gap-4">
               {isApproved ? (
                  <>
                     <div className="rounded-full bg-green-100 p-3">
                        <CheckCircle2 className="text-green-600" size={32} />
                     </div>
                     <div>
                        <AtomText color="success" fontSize="medium" isBold>
                           ****¡Felicitaciones! Quiz Aprobado****
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
                        <AtomText color="error" fontSize="medium" isBold>
                           ****Quiz No Aprobado****
                        </AtomText>
                        <br />
                        <AtomText fontSize="medium">Necesitas al menos 60% para aprobar</AtomText>
                     </div>
                  </>
               )}
            </div>
         </div>

         <div className="grid gap-6 lg:grid-cols-12">
            <OrganismQuizResultSummary
               grammarTopicId={grammarTopicId}
               id={id}
               incorrectAnswers={incorrectAnswers}
               performance={performance}
               quizType={quizType}
               score={score}
               scorePercentage={scorePercentage}
               totalQuestions={questions.length}
            />

            <OrganismQuizResultDetails
               grammarTopicId={grammarTopicId}
               id={id}
               locale={locale}
               questions={questions}
               quizType={quizType}
               userAnswers={userAnswers}
            />
         </div>
      </div>
   )
}
