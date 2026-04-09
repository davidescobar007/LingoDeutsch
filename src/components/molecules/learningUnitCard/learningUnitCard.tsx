import { FunctionComponent, ReactNode } from 'react'

import { AtomMiniProgressBar, AtomText, AtomTitle } from '@/components/atoms'

type TMoleculeLearningUnitCard = {
   title: string
   learningGoal?: string
   completedCount: number
   totalCount: number
   accordionName: string
   isOpen?: boolean
   children: ReactNode
   className?: string
}

export const MoleculeLearningUnitCard: FunctionComponent<TMoleculeLearningUnitCard> = ({
   title,
   learningGoal,
   completedCount,
   totalCount,
   accordionName,
   isOpen = false,
   children,
   className = ''
}) => {
   const isCompleted = completedCount === totalCount && totalCount > 0
   const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

   const getProgressColor = (): 'primary' | 'success' => {
      if (isCompleted) return 'success'
      return 'primary'
   }

   return (
      <div
         className={`collapse-arrow join-item border-base-300 bg-base-100 collapse border shadow-sm transition-all duration-300 hover:shadow-md ${className}`}
      >
         <input defaultChecked={isOpen} name={accordionName} type="radio" />
         <div className="collapse-title w-full min-w-0">
            <div className="flex w-full min-w-0 items-start justify-between gap-3 pr-8">
               <div className="flex min-w-0 flex-1 flex-col space-y-2">
                  <div className="flex w-full min-w-0 items-start justify-between gap-2">
                     <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                        <AtomTitle type="h4">{title}</AtomTitle>
                        {learningGoal && (
                           <AtomText className="truncate" fontSize="small" isItalic isThin>
                              {learningGoal}
                           </AtomText>
                        )}
                     </div>
                     {isCompleted && (
                        <span className="badge badge-sm badge-success flex-shrink-0 gap-1">
                           <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                 d="M5 13l4 4L19 7"
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                              />
                           </svg>
                           Completado
                        </span>
                     )}
                  </div>

                  <div className="flex items-center gap-2">
                     <div className="flex-1">
                        <AtomMiniProgressBar
                           color={getProgressColor()}
                           max={totalCount}
                           showPercentage={false}
                           size="sm"
                           value={completedCount}
                        />
                     </div>
                     <span className="text-base-content/70 min-w-[4rem] text-right text-xs">
                        {progressPercentage}% · {completedCount}/{totalCount}
                     </span>
                  </div>
               </div>
            </div>
         </div>
         <div className="collapse-content">
            <div className="bg-base-50/50">{children}</div>
         </div>
      </div>
   )
}
