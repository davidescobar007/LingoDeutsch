import React from 'react'

import { AtomButton, AtomCountdown, AtomText } from '@/components/atoms'
import { MoleculeAlert } from '@/components/molecules'

type WaitingRoomProps = {
   futureDate: Date
   id: string
   quizType?: 'article' | 'grammar'
}

const WaitingRoom = ({ futureDate, id, quizType = 'article' }: WaitingRoomProps) => {
   const isArticleQuiz = quizType === 'article'

   return (
      <div className="flex flex-col items-center gap-4 text-center">
         <MoleculeAlert
            message="Ya has realizado un intento para este quiz. Podrás volver a intentarlo cuando termine la cuenta
            regresiva."
            type="info"
         />
         <AtomCountdown targetDate={futureDate} />
         <AtomText fontSize="medium" isBlock type="span">
            Mientras tanto, puedes:
         </AtomText>
         <div className=" flex flex-wrap items-center justify-center gap-4">
            {isArticleQuiz ? (
               <>
                  <AtomButton href={`/app/article/${id}`} type="link">
                     Volver al artículo
                  </AtomButton>
                  <AtomButton href="/app/article" type="link" variant="OUTLINE">
                     Buscar otros artículos
                  </AtomButton>
               </>
            ) : (
               <>
                  <AtomButton href={`/app/grammar?topic=${id}`} type="link">
                     Volver al tema
                  </AtomButton>
                  <AtomButton href="/app/grammar" type="link" variant="OUTLINE">
                     Explorar gramática
                  </AtomButton>
               </>
            )}
         </div>
      </div>
   )
}

export default WaitingRoom
