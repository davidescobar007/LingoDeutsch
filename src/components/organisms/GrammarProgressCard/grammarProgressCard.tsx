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
      <div className="border-base-300 bg-base-100 rounded-2xl border p-6 shadow-md">
         <div className="mb-4 flex items-center justify-between">
            <AtomTitle extraClassName="!text-lg" type="h3">
               📘 Progreso A1
            </AtomTitle>
            <span className="text-primary text-2xl font-bold">{percentage}%</span>
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
               <button className="bg-primary hover:bg-primary/90 w-full rounded-lg px-4 py-2 text-white transition-all duration-300 hover:shadow-md">
                  <AtomText className="!text-white" fontSize="small" isBold>
                     Continuar: {nextTopicLabel}
                  </AtomText>
               </button>
            </Link>
         )}
      </div>
   )
}
