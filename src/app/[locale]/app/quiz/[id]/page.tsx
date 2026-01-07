'use client'
import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

import { AtomBadge, AtomButton, AtomProgressPercentage, AtomText } from '@/components/atoms'
import { useGetArticleByUser, useSaveArticleUser } from '@/hooks/articles'
import { useGetGrammarByLevel, useGetSingleGrammarTopicByUser, useSaveGrammarProgress } from '@/hooks/grammar'
import { useGetQuiz } from '@/hooks/quiz'
import { useUpdateUserscore } from '@/hooks/user'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'
import { calculateScore, shouldShowWaitingRoom } from '@/utils/quiz.utils'

import { QuizResult } from './QuizResult'
import WaitingRoom from './watingRoom'

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

type QuizPageProps = {
   params: { id: string }
   searchParams: { type?: 'article' | 'grammar' }
}

const getQuestionOptions = (question: QuizQuestion): string[] => {
   if (!question?.options || typeof question.options !== 'object') return []
   return Object.values(question.options).filter(Boolean)
}

const getOptionKey = (options: Record<string, string>, value: string): string | undefined => {
   return Object.entries(options).find(([_, optionValue]) => optionValue === value)?.[0]
}

const isAnswerCorrect = (options: Record<string, string>, selected: string, correctAnswers: string[]): boolean => {
   const selectedKey = getOptionKey(options, selected)
   return selectedKey ? correctAnswers.includes(selectedKey) : false
}

const QuizPage = ({ params: { id }, searchParams }: QuizPageProps) => {
   const user = getUserInfo() as TUser
   const quizType = searchParams?.type || 'article'
   const isArticleQuiz = quizType === 'article'

   const { data: quizzData, isLoading } = useGetQuiz({ id, type: quizType })
   const { data: userArticle } = useGetArticleByUser(user.id, id)
   const { data: grammarTopics } = useGetGrammarByLevel('A1')
   const { data: userGrammarProgress } = useGetSingleGrammarTopicByUser({ user, id })
   const { mutate: updateUserScore } = useUpdateUserscore()
   const { mutate: saveArticleUser } = useSaveArticleUser()
   const { mutate: saveGrammarProgress } = useSaveGrammarProgress()

   const [current, setCurrent] = useState(0)
   const [selected, setSelected] = useState<string | null>(null)
   const [showResult, setShowResult] = useState(false)
   const [score, setScore] = useState(0)
   const [userAnswers, setUserAnswers] = useState<string[]>([])
   const [hasSubmittedScore, setHasSubmittedScore] = useState(false)

   const questions = (quizzData?.quiz || quizzData?.quizz || []) as QuizQuestion[]
   const question = questions[current]
   const options = getQuestionOptions(question)

   const getNextTopicId = (): string | undefined => {
      if (quizType !== 'grammar' || !grammarTopics?.length) return undefined
      const currentIndex = grammarTopics.findIndex((topic) => topic.id === id)
      const hasNextTopic = currentIndex !== -1 && currentIndex < grammarTopics.length - 1
      return hasNextTopic ? grammarTopics[currentIndex + 1]?.id : undefined
   }

   const nextTopicId = getNextTopicId()

   useEffect(() => {
      if (!showResult || !questions.length || hasSubmittedScore) return
      const finalScore = calculateScore(score, questions.length)
      if (isArticleQuiz && userArticle) saveArticleUser({ userArticle, score: finalScore })
      if (quizType === 'grammar' && finalScore) saveGrammarProgress({ grammar_id: id, user, score: finalScore })
      if (finalScore >= 40) updateUserScore({ newScore: finalScore, user })
      setHasSubmittedScore(true)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [showResult, questions.length, score, isArticleQuiz, userArticle, hasSubmittedScore, user])

   const handleSelect = (option: string) => setSelected(option)

   const handleNext = () => {
      if (selected && isAnswerCorrect(question.options, selected, question.correctAnswers)) {
         setScore((s) => s + 1)
      }
      setUserAnswers((answers) => [...answers, selected || ''])
      setSelected(null)
      setCurrent((c) => (c < questions.length - 1 ? c + 1 : c))
      if (current >= questions.length - 1) setShowResult(true)
   }

   if (isLoading) return <div>Cargando...</div>
   if (!questions.length) return <div>No se encontró ningún quiz.</div>
   if (!question?.options || !question?.correctAnswers) return <div>Error: Datos del quiz incorrectos.</div>

   // Check waiting room (unificado)
   const userProgressData = quizType === 'article' ? userArticle || null : userGrammarProgress || null
   const waitingRoomParams = shouldShowWaitingRoom(quizType, userProgressData, showResult)

   if (waitingRoomParams.shouldShowWaiting) {
      return <WaitingRoom futureDate={waitingRoomParams.futureDate!} id={id} quizType={quizType} />
   }

   // Show result
   if (showResult)
      return (
         <QuizResult
            id={id}
            nextTopicId={nextTopicId}
            questions={questions}
            score={score}
            typeOfQuizz={quizType}
            userAnswers={userAnswers}
         />
      )

   const isLastQuestion = current === questions.length - 1
   const selectedIsCorrect = selected
      ? isAnswerCorrect(question.options, selected, question.correctAnswers)
      : false
   const questionText =
      typeof question.question === 'string' ? question.question : question.question?.de || 'Pregunta no disponible'

   return (
      <div className="mx-auto flex w-full flex-col gap-4">
         <div className="flex items-center gap-3">
            <AtomBadge color="primary" size="lg">
               {current + 1}
            </AtomBadge>
            <AtomText>
               Pregunta {current + 1} de {questions.length}
            </AtomText>
         </div>

         <AtomProgressPercentage value={Math.round(((current + 1) / questions.length) * 100)} />

         <AtomText fontSize="huge" isBold>
            {questionText}
         </AtomText>
         {typeof question.question !== 'string' && (
            <AtomText fontSize="small" isThin>
               {question.question?.es || ''}
            </AtomText>
         )}

         <div className="flex flex-col gap-5">
            {options.map((option) => {
               const isSelected = selected === option
               const optionKey = getOptionKey(question.options, option)
               const isCorrect = optionKey ? question.correctAnswers.includes(optionKey) && !!selected : false
               const isIncorrect = isSelected && optionKey ? !question.correctAnswers.includes(optionKey) : false

               const buttonClass = `flex items-center justify-between rounded-xl border-2 p-4 text-lg font-medium shadow transition-all duration-500 focus:ring-primary focus:outline-none focus:ring-2
                  ${
                     isSelected
                        ? isCorrect
                           ? 'border-green-500 bg-green-50 text-green-800'
                           : 'border-red-400 bg-red-50 text-red-800'
                        : 'hover:border-primary hover:bg-primary/10 border-gray-200 bg-white hover:scale-[1.03]'
                  }
                  ${isSelected ? 'scale-[1.01]' : ''}`

               return (
                  <button
                     className={buttonClass}
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
            {isLastQuestion ? (
               <span className="flex items-center gap-2">🏁 Finalizar Quiz</span>
            ) : (
               <span className="flex items-center gap-2">
                  Siguiente ({current + 2}/{questions.length}) →
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

export default QuizPage
