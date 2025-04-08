import React from 'react'
import { BookOpenText, CheckCircle2 } from 'lucide-react'

import { AtomBadge, AtomText, AtomTitle, Icon } from '@/components/atoms'
import { Tgrammar, TUserGrammarProgress } from '@/modules/actions/types'

type MoleculeTimeLineProps = {
   activeTopic: string | null
   onSelectTopic: (id: string) => void
   topics: Tgrammar[]
   userGrammarProgress?: TUserGrammarProgress[]
}

export const MoleculeTimeLine: React.FC<MoleculeTimeLineProps> = ({
   activeTopic,
   onSelectTopic,
   topics,
   userGrammarProgress
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
            {topics.map((topic) => (
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
                           : 'hover:border-primary/50 bg-secondary text-primary'
                     }`}
                  >
                     {isTopicCompleted(topic.id) ? (
                        <Icon icon={<CheckCircle2 size={20} />} />
                     ) : (
                        <Icon icon={<BookOpenText size={20} />} />
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
                        <AtomBadge type="secondary">
                           <AtomText fontSize="small">{topic.level}</AtomText>
                        </AtomBadge>
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
