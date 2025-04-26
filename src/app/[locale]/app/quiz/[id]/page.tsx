'use client'
import React, { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

import { AtomBadge, AtomButton, AtomText, AtomTitle, Icon } from '@/components/atoms'
import { MoleculeStat } from '@/components/molecules'
import { MoleculeAlert } from '@/components/molecules'
import { useArticle } from '@/hooks/articles' // Assumes this fetches TArticle by id

type QuizQuestion = {
   question: string
   option_one: string
   option_two: string
   option_three: string
   option_four: string
   correct_answer: string
}

const getOptions = (q: QuizQuestion) => [q.option_one, q.option_two, q.option_three, q.option_four]

// Scoring logic function
function calculateScore(
   correctAnswers: number,
   totalQuestions: number,
   mode: 'proportional' | 'all_or_nothing'
): { score: number; feedback: string } {
   if (totalQuestions === 0) {
      return { score: 0, feedback: 'No se respondieron preguntas.' }
   }
   const percent = (correctAnswers / totalQuestions) * 100

   if (mode === 'proportional') {
      if (percent < 40) {
         return {
            score: 0,
            feedback:
               'Necesitabas al menos 40% de respuestas correctas para obtener puntos en el sistema proporcional.'
         }
      }
      const score = Math.round(percent)
      return {
         score,
         feedback: `Obtuviste ${score} puntos usando el sistema de calificación proporcional.`
      }
   }

   if (mode === 'all_or_nothing') {
      if (percent < 70) {
         return {
            score: 0,
            feedback:
               'Necesitabas al menos 70% de respuestas correctas para obtener puntos en el sistema todo o nada.'
         }
      }
      return {
         score: 100,
         feedback: 'Respondiste al menos el 70% correctamente y obtuviste 100 puntos en el sistema todo o nada.'
      }
   }

   return { score: 0, feedback: 'Modo de puntuación inválido.' }
}

const QuizPage = ({ params: { id } }: { params: { id: string } }) => {
   const { data: article, isLoading } = useArticle(id)
   const [current, setCurrent] = useState(0)
   const [selected, setSelected] = useState<string | null>(null)
   const [showResult, setShowResult] = useState(false)
   const [score, setScore] = useState(0)
   const [mode, setMode] = useState<'proportional' | 'all_or_nothing' | null>(null)
   const [userAnswers, setUserAnswers] = useState<string[]>([])

   if (isLoading) return <div>Cargando...</div>
   if (!article || !article.quizz || article.quizz.length === 0) return <div>No se encontró ningún quiz.</div>

   const questions = article.quizz
   const question = questions[current]
   const options = getOptions(question)

   const handleSelect = (option: string) => {
      setSelected(option)
   }

   const handleNext = () => {
      if (selected === question.correct_answer) setScore((s) => s + 1)
      setUserAnswers((answers) => [...answers, selected || ''])
      setSelected(null)
      if (current < questions.length - 1) {
         setCurrent((c) => c + 1)
      } else {
         setShowResult(true)
      }
   }

   // Mode selection before quiz starts
   if (!mode) {
      return (
         <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-6">
            <AtomTitle extraClassName="text-primary">Elige tu sistema de puntuación</AtomTitle>
            <AtomText className="mb-2">Selecciona cómo quieres que se califique tu quiz:</AtomText>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
               {/* Proporcional */}
               <div
                  className="cursor-pointer rounded-2xl border border-violet-400 bg-violet-50 p-6 shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                  onClick={() => setMode('proportional')}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setMode('proportional')}
                  role="button"
                  tabIndex={0}
               >
                  <AtomTitle extraClassName="text-primary" type="h5">
                     🎯 Proporcional
                  </AtomTitle>
                  <AtomText className="mb-4">
                     Suma puntos según tu porcentaje.
                     <br /> <br />
                     <AtomText className="text-primary" fontSize="small" isBold type="span">
                        Ganas puntos si logras más del 40% de aciertos.
                     </AtomText>
                  </AtomText>
                  <AtomText fontSize="small" isThin type="span">
                     Ejemplo: 85% correcto = 85 puntos.
                     <br />
                  </AtomText>
                  <AtomBadge className="mt-2" color="primary">
                     Más flexible
                  </AtomBadge>
               </div>
               {/* Todo o Nada */}
               <div
                  className="cursor-pointer rounded-2xl border border-yellow-400 bg-yellow-50 p-6 shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  onClick={() => setMode('all_or_nothing')}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setMode('all_or_nothing')}
                  role="button"
                  tabIndex={0}
               >
                  <AtomTitle extraClassName="text-primary" type="h5">
                     🔥Todo o Nada
                  </AtomTitle>

                  <AtomText className="mb-4">
                     Gana 100 puntos con minimo el 70% de aciertos.
                     <br /> <br />
                     <AtomText className="text-primary" fontSize="small" isBold type="span">
                        Si obtienes 69% o menos, no ganas puntos.
                     </AtomText>
                  </AtomText>
                  <AtomText className="mb-2" fontSize="small" isThin type="span">
                     Ejemplo: 7/10 correctas = 100 puntos.
                     <br />
                  </AtomText>
                  <AtomBadge className="mt-2" color="warning">
                     Más desafiante
                  </AtomBadge>
               </div>
            </div>
         </div>
      )
   }

   if (showResult) {
      const { score: finalScore, feedback } = calculateScore(score, questions.length, mode)
      console.log(feedback)
      const isPerfect = finalScore === 100
      return (
         <div className="w-full text-center">
            <AtomTitle type="h4">¡Quiz finalizado!</AtomTitle>
            {isPerfect && (
               <div className="animate__animated animate__tada mb-4 flex flex-col items-center justify-center">
                  <Icon icon="check" iconState="success" />

                  <AtomText className="text-green-600" fontSize="large" isBold type="span">
                     🎉 ¡Felicidades! ¡Puntaje perfecto! 🎉
                  </AtomText>

                  <AtomText type="span">Has respondido correctamente a todas de las preguntas.</AtomText>
               </div>
            )}

            <MoleculeStat
               items={[
                  {
                     icon: (
                        <Icon icon="gauge" iconSize="large" iconState={finalScore >= 70 ? 'success' : 'warning'} />
                     ),
                     title: 'Puntaje final',
                     value: `${finalScore}%`,
                     description: `${score} de ${questions.length} correctas`
                  },
                  {
                     icon: (
                        <Icon
                           icon={finalScore >= 70 ? 'bookmark' : 'bookmark-x'}
                           iconSize="large"
                           iconState={finalScore >= 70 ? 'success' : 'error'}
                        />
                     ),
                     title: 'Estado del artículo',
                     value: finalScore >= 70 ? 'Aprendido' : 'Aún no aprobado',
                     description:
                        finalScore >= 70
                           ? '¡Felicidades, ya esta marcado como aprendido!'
                           : 'Aún no alcanzas el 70% requerido.'
                  },
                  {
                     icon: <Icon icon="settings" iconSize="large" iconState="info" />,
                     title: 'Sistema de puntuación',
                     value: mode === 'all_or_nothing' ? 'Todo o Nada' : 'Modo proporcional',
                     description:
                        mode === 'proportional'
                           ? 'Recibes puntos por cada respuesta correcta.'
                           : '100 puntos si ≥ 70%'
                  }
               ]}
            />

            <div className="mb-8 mt-16 text-left">
               <AtomTitle type="h4">Aqui tu resumen del quiz:</AtomTitle>

               <ul className="mt-6 flex flex-col gap-6">
                  {questions.map((q, idx) => {
                     const userAnswer = userAnswers[idx]
                     const isCorrect = userAnswer === q.correct_answer
                     return (
                        <li key={idx}>
                           <MoleculeAlert
                              message={`Tu respuesta: ${userAnswer || 'Sin respuesta'}`}
                              title={q.question}
                              type={isCorrect ? 'success' : 'error'}
                           />
                        </li>
                     )
                  })}
               </ul>
            </div>
            <div className="mt-4">
               <span className="badge badge-outline badge-lg">
                  Sistema usado: <b>{mode === 'proportional' ? 'Proporcional' : 'Todo o Nada'}</b>
               </span>
            </div>
         </div>
      )
   }

   return (
      <div className="mx-auto flex w-full flex-col gap-4">
         <AtomTitle>{question.question}</AtomTitle>
         <div className="flex flex-col gap-5">
            {options.map((option) => {
               const isSelected = selected === option
               const isCorrect = option === question.correct_answer && selected
               const isIncorrect = isSelected && option !== question.correct_answer
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
            {current === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
         </AtomButton>
         {selected && (
            <div className="mt-4 flex items-center justify-center gap-2">
               {selected === question.correct_answer ? (
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
