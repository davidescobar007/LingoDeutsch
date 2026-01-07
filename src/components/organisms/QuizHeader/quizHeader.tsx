import { AtomBadge, AtomProgressPercentage, AtomText } from '@/components/atoms'

type OrganismQuizHeaderProps = {
   current: number
   total: number
}

export const OrganismQuizHeader = ({ current, total }: OrganismQuizHeaderProps) => {
   const progress = Math.round(((current + 1) / total) * 100)

   return (
      <div className="flex flex-col gap-4">
         <div className="flex items-center gap-3">
            <AtomBadge color="primary" size="lg">
               {current + 1}
            </AtomBadge>
            <AtomText>
               Pregunta {current + 1} de {total}
            </AtomText>
         </div>

         <AtomProgressPercentage value={progress} />
      </div>
   )
}
