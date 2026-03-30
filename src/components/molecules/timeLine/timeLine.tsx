import React from 'react'

import { AtomText, AtomTitle } from '@/components/atoms'
import { TGrammar, TUserGrammarProgress } from '@/modules/actions/types'

type MoleculeTimeLineProps = {
   activeTopic: string | null
   onSelectTopic: (_id: string) => void
   topics: TGrammar[]
   userGrammarProgress?: TUserGrammarProgress[]
}

const getCategoryColor = (category?: string): string => {
   switch (category) {
      case 'grammar':
         return 'bg-blue-500'
      case 'vocabulary':
         return 'bg-green-500'
      case 'context':
         return 'bg-amber-500'
      case 'communications':
         return 'bg-purple-500'
      default:
         return 'bg-primary'
   }
}

const getCategoryTextColor = (category?: string): string => {
   switch (category) {
      case 'grammar':
         return 'text-blue-600'
      case 'vocabulary':
         return 'text-green-600'
      case 'context':
         return 'text-amber-600'
      case 'communications':
         return 'text-purple-600'
      default:
         return 'text-primary'
   }
}

export const MoleculeTimeLine: React.FC<MoleculeTimeLineProps> = ({
   activeTopic,
   onSelectTopic,
   topics,
   userGrammarProgress = undefined
}) => {
   const isTopicCompleted = (topicId: string): Boolean => {
      if (!userGrammarProgress) return false
      const topic = userGrammarProgress.find((item) => item.grammar_id === topicId)
      return topic ? true : false
   }

   return (
      <div className="relative">
         <div className="relative space-y-3">
            {topics?.map((topic) => (
               <div
                  className="group flex cursor-pointer items-stretch transition-all"
                  key={topic.id}
                  onClick={() => onSelectTopic(topic.id)}
               >
                  {/* Barra lateral de color según categoría */}
                  <div
                     className={`w-1.5 rounded-l ${getCategoryColor(topic.category)} ${
                        activeTopic === topic.id ? 'opacity-100' : 'opacity-70'
                     } group-hover:opacity-100`}
                  />
                  {/* Contenido del tema */}
                  <div
                     className={`flex-1 rounded-r-md border border-l-0 p-3 transition-all ${
                        activeTopic === topic.id
                           ? 'border-base-300 bg-base-200'
                           : 'border-base-200 bg-base-100 hover:bg-base-200'
                     }`}
                  >
                     <div className="flex items-start justify-between gap-2">
                        <AtomTitle
                           extraClassName={`!mb-0.5 !text-sm hover:font-semibold ${
                              activeTopic === topic.id ? getCategoryTextColor(topic.category) : ''
                           }`}
                           type="h5"
                        >
                           {topic.topic_name?.es}
                        </AtomTitle>

                        {/* Checkmark para temas completados */}
                        {isTopicCompleted(topic.id) && (
                           <svg
                              className="h-4 w-4 flex-shrink-0 text-green-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                           >
                              <path
                                 d="M5 13l4 4L19 7"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                              />
                           </svg>
                        )}
                     </div>
                     <AtomText className="" fontSize="small" isThin>
                        {isTopicCompleted(topic.id) ? 'Completado' : 'Lista para aprender'}
                     </AtomText>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}
