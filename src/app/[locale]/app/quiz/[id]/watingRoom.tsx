import React from 'react'

import { AtomButton, AtomCountdown, AtomText } from '@/components/atoms'
import { MoleculeAlert } from '@/components/molecules'

type WaitingRoomProps = {
   futureDate: Date
   id: string
}

const WaitingRoom = ({ futureDate, id }: WaitingRoomProps) => {
   return (
      <div className="flex flex-col items-center gap-4 text-center">
         <MoleculeAlert
            message="Ya has realizado un intento para este quiz. Podrás volver a intentarlo cuando termine la cuenta
            regresiva."
            type="info"
         />
         <AtomCountdown targetDate={futureDate} />
         <AtomText fontSize="large" isBlock type="span">
            Mientras tanto, puedes:
         </AtomText>
         <div className=" flex flex-wrap items-center justify-center gap-4">
            <AtomButton href={`/app/article/${id}`} type="link">
               Volver al artículo
            </AtomButton>
            <AtomButton href="/app/vocabulary" type="link">
               Revisar vocabulario
            </AtomButton>
         </div>
      </div>
   )
}

export default WaitingRoom
