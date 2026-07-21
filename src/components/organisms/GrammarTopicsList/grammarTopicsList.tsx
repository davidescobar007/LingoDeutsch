'use client'
import { useState } from 'react'

import { AtomText, AtomTitle } from '@/components/atoms'
import { TGrammar, TUserGrammarProgress } from '@/modules/actions/types'
import { Link } from '@/navigation'

type OrganismGrammarTopicsListProps = {
   level: string
   topics: TGrammar[]
   userProgress: TUserGrammarProgress[]
}

type TopicState = 'locked' | 'available' | 'recommended' | 'completed'

export const OrganismGrammarTopicsList = ({ level, topics, userProgress }: OrganismGrammarTopicsListProps) => {
   // Determine topic state for each topic
   const getTopicState = (topic: TGrammar): TopicState => {
      const userTopicProgress = userProgress?.find((p) => p.grammar_id === topic.id)

      if (userTopicProgress?.isCompleted) {
         return 'completed'
      }

      // Get previous topic to determine if current is locked
      const topicIndex = topics.findIndex((t) => t.id === topic.id)
      if (topicIndex === 0) {
         return 'available'
      }

      const previousTopic = topics[topicIndex - 1]
      const previousProgress = userProgress?.find((p) => p.grammar_id === previousTopic.id)

      if (!previousProgress?.isCompleted && level !== 'A1') {
         return 'locked'
      }

      // First incomplete topic is recommended
      if (
         !userTopicProgress?.isCompleted &&
         topicIndex === topics.findIndex((t) => !userProgress?.find((p) => p.grammar_id === t.id && p.isCompleted))
      ) {
         return 'recommended'
      }

      return 'available'
   }

   const getStateStyles = (state: TopicState) => {
      switch (state) {
         case 'completed':
            return 'opacity-60 cursor-not-allowed'
         case 'locked':
            return 'opacity-60 cursor-not-allowed'
         case 'recommended':
            return ''
         case 'available':
         default:
            return ''
      }
   }

   const getStateIcon = (state: TopicState) => {
      switch (state) {
         case 'completed':
            return '✅'
         case 'locked':
            return '🔒'
         case 'recommended':
            return '⭐'
         case 'available':
         default:
            return '📚'
      }
   }

   // Pagination: show 10 topics per page
   const TOPICS_PER_PAGE = 10
   const totalPages = Math.ceil(topics.length / TOPICS_PER_PAGE)
   const [currentPage, setCurrentPage] = useState(0)

   const paginatedTopics = topics.slice(currentPage * TOPICS_PER_PAGE, (currentPage + 1) * TOPICS_PER_PAGE)

   return (
      <div className="w-full">
         {/* Header with topic count */}
         <div className="mb-6 flex items-center justify-between">
            <div>
               <AtomTitle extraClassName="!text-lg" type="h3">
                  Temas del Nivel {level}
               </AtomTitle>
               <AtomText className="mt-1 text-sm" fontSize="small" isThin>
                  {userProgress?.filter((p) => topics.some((t) => t.id === p.grammar_id && p.isCompleted))
                     .length || 0}{' '}
                  de {topics.length} completados
               </AtomText>
            </div>
         </div>

         {/* Topics Grid */}
         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paginatedTopics.map((topic, index) => {
               const state = getTopicState(topic)
               const isLocked = state === 'locked'

               return (
                  <Link href={isLocked ? '#' : `/app/grammar?level=${level}&topic=${topic.id}`} key={topic.id}>
                     <div
                        className={`container-card-interactive ${getStateStyles(state)} ${
                           isLocked ? '' : 'hover:scale-102'
                        }`}
                     >
                        {/* Icon and State */}
                        <div className="mb-3 flex items-start justify-between">
                           <span className="text-2xl">{getStateIcon(state)}</span>
                           <span className="text-base-content/60 text-xs font-semibold">
                              {currentPage * TOPICS_PER_PAGE + index + 1}/{topics.length}
                           </span>
                        </div>

                        {/* Topic Name */}
                        <AtomTitle extraClassName="!text-base !mb-2" type="h4">
                           {topic.topic_name || 'Sin título'}
                        </AtomTitle>

                        {/* Level Badge */}
                        <div className="mb-3 flex items-center gap-2">
                           <span className="bg-primary/20 text-primary inline-block rounded-full px-2 py-1 text-xs font-semibold">
                              {topic.level || level}
                           </span>
                        </div>

                        {/* State Label */}
                        <div className="border-base-300 flex items-center justify-between border-t pt-3">
                           <AtomText className="text-xs" fontSize="small" isThin>
                              {state === 'completed' && '✅ Completado'}
                              {state === 'locked' && '🔒 Bloqueado'}
                              {state === 'recommended' && '⭐ Recomendado'}
                              {state === 'available' && '📖 Disponible'}
                           </AtomText>
                           <span className="text-lg">→</span>
                        </div>
                     </div>
                  </Link>
               )
            })}
         </div>

         {/* Pagination */}
         {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
               <button
                  className="border-base-300 hover:bg-base-200 rounded-lg border px-4 py-2 disabled:opacity-50"
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
               >
                  ← Anterior
               </button>

               <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                     <button
                        className={`h-10 w-10 rounded-lg font-semibold transition-all ${
                           i === currentPage ? 'bg-primary text-white' : 'border-base-300 hover:bg-base-200 border'
                        }`}
                        key={i}
                        onClick={() => setCurrentPage(i)}
                     >
                        {i + 1}
                     </button>
                  ))}
               </div>

               <button
                  className="border-base-300 hover:bg-base-200 rounded-lg border px-4 py-2 disabled:opacity-50"
                  disabled={currentPage === totalPages - 1}
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
               >
                  Siguiente →
               </button>
            </div>
         )}
      </div>
   )
}
