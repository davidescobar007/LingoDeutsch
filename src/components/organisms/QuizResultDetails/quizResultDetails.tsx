import { AtomButton, AtomTitle } from '@/components/atoms'
import { MoleculeAlert } from '@/components/molecules'

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

type OrganismQuizResultDetailsProps = {
   grammarTopicId?: string
   id: string
   locale: 'de' | 'es'
   questions: QuizQuestion[]
   quizType: 'article' | 'grammar'
   userAnswers: string[]
}

const getOptionKey = (options: Record<string, string>, value: string): string | undefined => {
   return Object.entries(options).find(([_, optionValue]) => optionValue === value)?.[0]
}

export const OrganismQuizResultDetails = ({
   grammarTopicId,
   id,
   locale,
   questions,
   quizType,
   userAnswers
}: OrganismQuizResultDetailsProps) => {
   return (
      <div className="lg:col-span-8">
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
                     typeof q.question === 'string' ? q.question : q.question[locale] || 'Pregunta no disponible'

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
   )
}
