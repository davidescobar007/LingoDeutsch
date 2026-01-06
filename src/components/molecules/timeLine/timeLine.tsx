import React from 'react'

import { AtomText, AtomTitle, Icon } from '@/components/atoms'
import { TGrammar, TUserGrammarProgress } from '@/modules/actions/types'

type MoleculeTimeLineProps = {
   activeTopic: string | null
   onSelectTopic: (_id: string) => void
   topics: TGrammar[]
   userGrammarProgress?: TUserGrammarProgress[]
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
      <div className="relative flex">
         <div className="absolute left-4 top-8 z-0 h-[calc(100%-55px)] w-1 bg-gray-200" />
         <div className="relative flex-1 space-y-4">
            {topics?.map((topic) => (
               <div
                  className="flex cursor-pointer items-start py-2 transition-all hover:font-semibold"
                  key={topic.id}
                  onClick={() => onSelectTopic(topic.id)}
               >
                  <div
                     className={`relative z-10 mr-3 mt-4 flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                        isTopicCompleted(topic.id)
                           ? activeTopic === topic.id
                              ? 'bg-green-500 text-white'
                              : 'border-green-500 bg-green-100 text-green-700'
                           : activeTopic === topic.id
                           ? 'border-primary bg-primary text-white'
                           : 'hover:border-primary/50 bg-secondary '
                     }`}
                  >
                     {isTopicCompleted(topic.id) ? (
                        <Icon
                           className={`text-green-600 ${activeTopic === topic.id ? 'text-white' : ''}`}
                           icon="check"
                           iconSize="medium"
                        />
                     ) : (
                        <Icon
                           className={`text-primary ${activeTopic === topic.id ? 'text-white' : ''}`}
                           icon="book-open-check"
                           iconSize="medium"
                           iconState="primary"
                        />
                     )}
                  </div>
                  <div className="flex-1 rounded-md p-2 hover:bg-slate-100">
                     <div className="flex items-center justify-between">
                        <AtomTitle
                           extraClassName={`!mb-0 hover:font-semibold ${
                              activeTopic === topic.id ? 'text-primary' : ''
                           }`}
                           type="h5"
                        >
                           {topic.topic_name?.es}
                        </AtomTitle>
                     </div>
                     <div>
                        <AtomText className="" fontSize="small" isThin>
                           {isTopicCompleted(topic.id) ? 'Completado' : 'Lista para aprender'}
                        </AtomText>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}
