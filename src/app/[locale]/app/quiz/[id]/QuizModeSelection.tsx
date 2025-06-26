import React from 'react'

import { AtomBadge, AtomText, AtomTitle } from '@/components/atoms'

type QuizModeSelectionProps = {
   setMode: (mode: 'proportional' | 'all_or_nothing') => void
}

export const QuizModeSelection: React.FC<QuizModeSelectionProps> = ({ setMode }) => {
   return (
      <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-6">
         <AtomTitle extraClassName="text-primary">Elige tu sistema de puntuación</AtomTitle>
         <AtomText className="mb-2">Selecciona cómo quieres que se califique tu quiz:</AtomText>
         <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {/* Proporcional */}
            <div
               className="border-primary/30 bg-primary/5 focus:ring-primary cursor-pointer rounded-2xl border-2 p-6 shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2"
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
               className="border-warning/30 bg-warning/5 focus:ring-warning cursor-pointer rounded-2xl border-2 p-6 shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2"
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
               <AtomBadge className="bg-warning/80 badge mt-2">Más desafiante</AtomBadge>
            </div>
         </div>
      </div>
   )
}
