'use client'
import { AtomProgressPercentage, AtomText, AtomTitle } from '@/components/atoms'
import { Link } from '@/navigation'

type OrganismGrammarProgressCardProps = {
   completedTopics: number
   nextTopicId?: string
   nextTopicLabel?: string
   totalTopics: number
}

export const OrganismGrammarProgressCard = ({
   completedTopics,
   nextTopicId = '',
   nextTopicLabel = 'Próximo tema',
   totalTopics
}: OrganismGrammarProgressCardProps) => {
   const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0

   return (
      <div className="rounded-lg border border-base-300 bg-base-100 p-6 shadow-md">
         <div className="flex items-center justify-between mb-4">
            <AtomTitle extraClassName="!text-lg" type="h3">
               📘 Progreso A1
            </AtomTitle>
            <span className="text-2xl font-bold text-primary">{percentage}%</span>
         </div>

         <div className="mb-6">
            <AtomProgressPercentage value={percentage} />
         </div>

         <div className="mb-4 flex justify-between">
            <AtomText className="text-sm" fontSize="small">
               {completedTopics} de {totalTopics} temas completados
            </AtomText>
         </div>

         {nextTopicId && (
            <Link href={`/app/grammar?topic=${nextTopicId}`}>
               <button className="w-full rounded-lg bg-primary py-2 px-4 text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-md">
                  <AtomText className="!text-white" fontSize="small" isBold>
                     Continuar: {nextTopicLabel}
                  </AtomText>
               </button>
            </Link>
         )}
      </div>
   )
}
