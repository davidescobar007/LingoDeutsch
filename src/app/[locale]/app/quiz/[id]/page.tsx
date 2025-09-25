'use client'
import React, { useEffect, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

import { AtomBadge, AtomButton, AtomProgressPercentage, AtomText } from '@/components/atoms'
import { useArticle, useGetArticleByUser, useSaveArticleUser } from '@/hooks/articles' // Assumes this fetches TArticle by id
import { useUpdateUserscore } from '@/hooks/user'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'
import { calculateFutureDate, calculateScore } from '@/utils/quiz.utils'

import { QuizModeSelection } from './QuizModeSelection'
import { QuizResult } from './QuizResult'

type QuizQuestion = {
   question: string
   option_one: string
   option_two: string
   option_three: string
   option_four?: string
   option_five?: string
   correct_answer: 'option_one' | 'option_two' | 'option_three' | 'option_four' | 'option_five'
}

const getOptions = (q: QuizQuestion) =>
   [q.option_one, q.option_two, q.option_three, q.option_four, q.option_five].filter((opt): opt is string =>
      Boolean(opt)
   )

const QuizPage = ({ params: { id } }: { params: { id: string } }) => {
   const user = getUserInfo() as TUser
   const { data: article, isLoading } = useArticle(id)
   const { data: userArticle } = useGetArticleByUser(user.id, id)
   const [current, setCurrent] = useState(0)
   const [selected, setSelected] = useState<string | null>(null)
   const [showResult, setShowResult] = useState(false)
   const [score, setScore] = useState(0)
   const [mode, setMode] = useState<'proportional' | 'all_or_nothing' | null>(null)
   const [userAnswers, setUserAnswers] = useState<string[]>([])
   const { mutate: updateUserScore } = useUpdateUserscore()
   const { mutate: saveArticleUser } = useSaveArticleUser()

   useEffect(() => {
      if (!showResult && !mode) return
      const finalScore = mode ? calculateScore(score, questions.length, mode) : 0
      if (userArticle) saveArticleUser({ userArticle, score: finalScore })
      if (finalScore >= 40) updateUserScore({ newScore: finalScore, user })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [showResult])

   if (isLoading) return <div>Cargando...</div>
   if (!article || !article.quizz || article.quizz.length === 0) return <div>No se encontró ningún quiz.</div>

   const questions = article.quizz
   const question = questions[current]
   const options = getOptions(question)

   const handleSelect = (option: string) => {
      setSelected(option)
   }

   const handleNext = () => {
      if (selected === question[question.correct_answer]) setScore((s) => s + 1)
      setUserAnswers((answers) => [...answers, selected || ''])
      setSelected(null)
      if (current < questions.length - 1) {
         setCurrent((c) => c + 1)
      } else {
         setShowResult(true)
      }
   }

   if (userArticle?.updated && !mode) {
      const { isFuture } = calculateFutureDate(new Date(userArticle.updated), 1.25)
      if (isFuture) {
         // return <WaitingRoom futureDate={futureDate} id={id} />
      }
   }

   // Mode selection before quiz starts
   if (!mode) {
      return <QuizModeSelection setMode={setMode} />
   }

   if (showResult) {
      return <QuizResult id={id} mode={mode} questions={questions} score={score} userAnswers={userAnswers} />
   }

   return (
      <div className="mx-auto flex w-full flex-col gap-4">
         <div className="fflex items-center justify-between ">
            <div className="flex items-center gap-3">
               <AtomBadge color="primary" size="lg">
                  {current + 1}
               </AtomBadge>
               <AtomText>
                  Pregunta {current + 1} de {questions.length}
               </AtomText>
            </div>
         </div>

         <AtomProgressPercentage value={Math.round(((current + 1) / questions.length) * 100)} />

         <AtomText fontSize="huge" isBlock isBold>
            {question.question}
         </AtomText>
         <div className="flex flex-col gap-5">
            {options.map((option) => {
               const isSelected = selected === option
               const isCorrect = option === question[question.correct_answer] && selected
               const isIncorrect = isSelected && option !== question[question.correct_answer]
               return (
                  <button
                     className={`flex items-center justify-between rounded-xl border-2 p-4 text-lg font-medium shadow transition-all duration-500
                        ${
                           isSelected
                              ? isCorrect
                                 ? 'border-green-500 bg-green-50 text-green-800'
                                 : 'border-red-400 bg-red-50 text-red-800'
                              : 'hover:border-primary hover:bg-primary/10 border-gray-200 bg-white hover:scale-[1.03]'
                        }
                        ${isSelected ? 'scale-[1.01]' : ''}
                        focus:ring-primary focus:outline-none focus:ring-2`}
                     disabled={!!selected}
                     key={option}
                     onClick={() => handleSelect(option)}
                  >
                     <span>{option}</span>
                     {isSelected && isCorrect && <CheckCircle2 className="ml-2 text-green-500" size={22} />}
                     {isIncorrect && <XCircle className="ml-2 text-red-500" size={22} />}
                  </button>
               )
            })}
         </div>
         <AtomButton disabled={!selected} extraClassName="mt-4" onClick={handleNext}>
            {current === questions.length - 1 ? (
               <span className="flex items-center gap-2">🏁 Finalizar Quiz</span>
            ) : (
               <span className="flex items-center gap-2">
                  Siguiente ({current + 2}/{questions.length}) →
               </span>
            )}
         </AtomButton>
         {selected && (
            <div className="mt-4 flex items-center justify-center gap-2">
               {selected === question[question.correct_answer] ? (
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

export default QuizPage
