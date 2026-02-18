'use client'

import { use, useEffect, useState } from 'react'
import { useLocale } from 'next-intl'

import { SpinLoader } from '@/components/atoms'
import { isAnswerCorrect, TemplateQuiz, TemplateQuizResult } from '@/components/templates'
import { useGetArticleByUser, useSaveArticleUser } from '@/hooks/articles'
import { useGetGrammarByLevel, useGetSingleGrammarTopicByUser, useSaveGrammarProgress } from '@/hooks/grammar'
import { useGetQuiz } from '@/hooks/quiz'
import { useUpdateUserscore } from '@/hooks/user'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'
import { calculateScore, shouldShowWaitingRoom } from '@/utils/quiz.utils'

import WaitingRoom from './watingRoom'

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

type QuizPageProps = {
   params: Promise<{ id: string }>
   searchParams: Promise<{ type?: 'article' | 'grammar' }>
}

const QuizPage = ({ params, searchParams }: QuizPageProps) => {
   const { id } = use(params)
   const { type } = use(searchParams)
   const locale = useLocale() as 'de' | 'es'
   const user = getUserInfo() as TUser
   const quizType = type || 'article'
   const isArticleQuiz = quizType === 'article'

   const { data: quizzData, isLoading } = useGetQuiz({ id, type: quizType })
   const { data: userArticle } = useGetArticleByUser(user.id, id)
   const { data: grammarTopics } = useGetGrammarByLevel('A1')
   const { data: userGrammarProgress } = useGetSingleGrammarTopicByUser({ id, user })
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
      if (isArticleQuiz && userArticle) saveArticleUser({ score: finalScore, userArticle })
      if (quizType === 'grammar' && finalScore) saveGrammarProgress({ grammar_id: id, score: finalScore, user })
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

   if (isLoading) return <SpinLoader />
   if (!questions.length) return <div>No se encontró ningún quiz.</div>
   if (!question?.options || !question?.correctAnswers) return <div>Error: Datos del quiz incorrectos.</div>

   const userProgressData = quizType === 'article' ? userArticle || null : userGrammarProgress || null
   const waitingRoomParams = shouldShowWaitingRoom(quizType, userProgressData, showResult)

   if (waitingRoomParams.shouldShowWaiting) {
      return <WaitingRoom futureDate={waitingRoomParams.futureDate!} id={id} quizType={quizType} />
   }

   if (showResult) {
      const scorePercentage = calculateScore(score, questions.length)
      const grammarTopicId = scorePercentage >= 60 && nextTopicId ? nextTopicId : id

      return (
         <TemplateQuizResult
            grammarTopicId={grammarTopicId}
            id={id}
            locale={locale}
            questions={questions}
            quizType={quizType}
            score={score}
            scorePercentage={scorePercentage}
            userAnswers={userAnswers}
         />
      )
   }

   const selectedIsCorrect = selected
      ? isAnswerCorrect(question.options, selected, question.correctAnswers)
      : false

   return (
      <TemplateQuiz
         current={current}
         onNext={handleNext}
         onSelect={handleSelect}
         question={question}
         selected={selected}
         selectedIsCorrect={selectedIsCorrect}
         totalQuestions={questions.length}
      />
   )
}

export default QuizPage
