import React from 'react'

import { AtomText, AtomTitle, Icon } from '@/components/atoms'
import { MoleculeAlert, MoleculeStat } from '@/components/molecules'
import { calculateScore } from '@/utils/quiz.utils'

type QuizResultProps = {
   score: number
   questions: any[]
   mode: 'proportional' | 'all_or_nothing'
   userAnswers: string[]
   article: any
}

export const QuizResult: React.FC<QuizResultProps> = ({ score, questions, mode, userAnswers, article }) => {
   const finalScore = calculateScore(score, questions.length, mode)
   const isPerfect = finalScore === 100 && score === questions.length

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
                  const correctValue = q[q.correct_answer]
                  const isCorrect = userAnswer === correctValue
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
      </div>
   )
}
