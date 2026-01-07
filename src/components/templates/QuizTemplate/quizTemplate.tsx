'use client'

import { CheckCircle2, XCircle } from 'lucide-react'

import { AtomButton, AtomText } from '@/components/atoms'
import { OrganismQuizHeader, OrganismQuizQuestion } from '@/components/organisms'

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

type TemplateQuizProps = {
   current: number
   onNext: () => void
   onSelect: (_option: string) => void
   question: QuizQuestion
   selected: string | null
   selectedIsCorrect: boolean
   totalQuestions: number
}

const getOptionKey = (options: Record<string, string>, value: string): string | undefined => {
   return Object.entries(options).find(([_, optionValue]) => optionValue === value)?.[0]
}

const isAnswerCorrect = (options: Record<string, string>, selected: string, correctAnswers: string[]): boolean => {
   const selectedKey = getOptionKey(options, selected)
   return selectedKey ? correctAnswers.includes(selectedKey) : false
}

export const TemplateQuiz = ({
   current,
   onNext,
   onSelect,
   question,
   selected,
   selectedIsCorrect,
   totalQuestions
}: TemplateQuizProps) => {
   const isLastQuestion = current === totalQuestions - 1

   return (
      <div className="mx-auto flex w-full flex-col gap-4">
         <OrganismQuizHeader current={current} total={totalQuestions} />

         <OrganismQuizQuestion onSelect={onSelect} question={question} selected={selected} />

         <AtomButton disabled={!selected} extraClassName="mt-4" onClick={onNext}>
            {isLastQuestion ? (
               <span className="flex items-center gap-2">🏁 Finalizar Quiz</span>
            ) : (
               <span className="flex items-center gap-2">
                  Siguiente ({current + 2}/{totalQuestions}) →
               </span>
            )}
         </AtomButton>

         {selected && (
            <div className="mt-4 flex items-center justify-center gap-2">
               {selectedIsCorrect ? (
                  <>
                     <CheckCircle2 className="text-green-700" size={28} />
                     <AtomText className="text-lg font-bold text-green-700">¡Correcto! ¡Bien hecho!</AtomText>
                  </>
               ) : (
                  <>
                     <XCircle className="text-red-700" size={28} />
                     <AtomText className="text-lg font-bold text-red-700">
                        Incorrecto. ¡Intenta la siguiente!
                     </AtomText>
                  </>
               )}
            </div>
         )}
      </div>
   )
}

export { isAnswerCorrect }
