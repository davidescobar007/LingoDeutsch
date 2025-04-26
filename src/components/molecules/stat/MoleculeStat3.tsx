import { FunctionComponent } from 'react'

import { Icon } from '../../atoms/icon/incon'
import { AtomText } from '../../atoms/paragraph/paragraph'

interface MoleculeStat3Props {
   finalScore: number
   score: number
   questionsLength: number
   mode: 'proportional' | 'all-or-nothing'
}

export const MoleculeStat3: FunctionComponent<MoleculeStat3Props> = ({
   finalScore,
   score,
   questionsLength,
   mode
}) => {
   return (
      <div className="stats my-6 flex flex-col justify-center gap-4 shadow md:flex-row">
         <div className="stat">
            <div className="stat-figure">
               <Icon icon="gauge" iconSize="large" iconState={finalScore >= 70 ? 'success' : 'warning'} />
            </div>
            <AtomText type="paragraph">Puntaje final</AtomText>
            <AtomText className="text-primary" fontSize="huge" isBold type="paragraph">
               {finalScore}%
            </AtomText>
            <AtomText fontSize="small" isThin type="paragraph">
               {score} de {questionsLength} correctas
            </AtomText>
         </div>
         <div className="stat">
            <div className="stat-figure ">
               <Icon
                  icon={finalScore >= 70 ? 'bookmark' : 'bookmark-x'}
                  iconSize="large"
                  iconState={finalScore >= 70 ? 'success' : 'error'}
               />
            </div>
            <AtomText type="paragraph">Estado del artículo</AtomText>
            <AtomText className="text-primary" fontSize="huge" isBold type="paragraph">
               {finalScore >= 70 ? 'Aprendido' : 'Aún no aprobado'}
            </AtomText>
            <AtomText fontSize="small" isThin type="paragraph">
               {finalScore >= 70
                  ? '¡Felicidades, ya esta marcado como aprendido!'
                  : 'Aún no alcanzas el 70% requerido.'}
            </AtomText>
         </div>
         <div className="stat">
            <div className="stat-figure text-secondary">
               <Icon icon="settings" iconSize="large" iconState="info" />
            </div>
            <AtomText type="paragraph">Sistema de puntuación</AtomText>
            <AtomText className="text-primary" fontSize="huge" isBold type="paragraph">
               {finalScore >= 70 ? 'Todo o Nada' : 'Modo proporcional'}
            </AtomText>
            <AtomText fontSize="small" isThin type="paragraph">
               {mode === 'proportional' ? 'Recibes puntos por cada respuesta correcta.' : '100 puntos si ≥ 70%'}
            </AtomText>
         </div>
      </div>
   )
}
