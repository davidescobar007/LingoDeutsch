'use client'

import { CheckCircle2, XCircle } from 'lucide-react'

import { AtomButton, AtomText } from '@/components/atoms'

type QuizQuestionType = {
   correctAnswers: string[]
   id: string
   options: Record<string, string>
   question: {
      de: string
      es: string
   }
   type: string
}

type OrganismQuizQuestionProps = {
   onSelect: (_option: string) => void
   question: QuizQuestionType
   selected: string | null
}

const getQuestionOptions = (question: QuizQuestionType): string[] => {
   if (!question?.options || typeof question.options !== 'object') return []
   return Object.values(question.options).filter(Boolean)
}

const getOptionKey = (options: Record<string, string>, value: string): string | undefined => {
   return Object.entries(options).find(([_, optionValue]) => optionValue === value)?.[0]
}

export const OrganismQuizQuestion = ({ onSelect, question, selected }: OrganismQuizQuestionProps) => {
   const options = getQuestionOptions(question)
   const questionText =
      typeof question.question === 'string' ? question.question : question.question?.de || 'Pregunta no disponible'

   return (
      <div className="flex flex-col gap-5">
         <div>
            <AtomText fontSize="medium" isBold>
               {questionText}
            </AtomText>
            <br />
            {typeof question.question !== 'string' && (
               <AtomText fontSize="small" isThin>
                  {question.question?.es || ''}
               </AtomText>
            )}
         </div>

         <div className="flex flex-col gap-5">
            {options.map((option) => {
               const isSelected = selected === option
               const optionKey = getOptionKey(question.options, option)
               const isCorrect = optionKey ? question.correctAnswers.includes(optionKey) && !!selected : false
               const isIncorrect = isSelected && optionKey ? !question.correctAnswers.includes(optionKey) : false

               const buttonVariant = isSelected ? (isCorrect ? 'SUCCESS' : 'ERROR') : 'GHOST'
               const buttonClass = `flex items-center justify-between rounded-xl border-2 p-4 text-lg font-medium shadow transition-all duration-500
                   ${
                      isSelected
                         ? isCorrect
                            ? 'border-green-500 bg-green-50 text-green-800 scale-[1.01]'
                            : 'border-red-400 bg-red-50 text-red-800 scale-[1.01]'
                         : 'hover:border-primary hover:bg-primary/10 border-gray-200 bg-white hover:scale-[1.03]'
                   }`

               return (
                  <AtomButton
                     disabled={!!selected}
                     extraClassName={buttonClass}
                     isBlock
                     key={option}
                     onClick={() => onSelect(option)}
                     size="lg"
                     type="button"
                     variant={buttonVariant}
                  >
                     {option}
                     {isSelected && isCorrect && <CheckCircle2 className="ml-2 text-green-500" size={22} />}
                     {isIncorrect && <XCircle className="ml-2 text-red-500" size={22} />}
                  </AtomButton>
               )
            })}
         </div>
      </div>
   )
}
