import { FunctionComponent } from 'react'

import { Icon } from '@/components/atoms'

type TGrammarLevelCard = {
   level: string
   levelTitle: string
   levelSubtitle: string
   progress: number
   topics: string[]
   lessons: number
   description: string
   isLocked?: boolean
   colorTheme: 'green' | 'blue' | 'purple'
   ribbon?: string
   onStartLevel?: () => void
   startLevelText: string
   whatYouWillLearnText: string
   lessonsText: string
}

const colorThemes = {
   green: {
      border: 'border-green-200 dark:border-green-800/30',
      bg: 'bg-white dark:bg-gray-800/60',
      progressBg: 'bg-green-100 dark:bg-green-900/50',
      progressFill: 'bg-green-500 dark:bg-green-600',
      levelBg: 'bg-green-100 dark:bg-green-800/30',
      levelText: 'text-green-700 dark:text-green-300',
      titleText: 'text-green-700 dark:text-green-300',
      badgeBg: 'bg-green-100 dark:bg-green-800/30',
      badgeText: 'text-green-700 dark:text-green-300',
      contentBorder: 'border-green-500',
      contentBg: 'bg-green-50 dark:bg-green-900/10',
      contentText: 'text-green-700 dark:text-green-300',
      checkColor: 'text-green-500',
      buttonBg: 'bg-green-500 dark:bg-green-600',
      buttonHover: 'hover:bg-green-600 dark:hover:bg-green-500',
      buttonGroupHover: 'group-hover:bg-green-400 dark:group-hover:bg-green-500'
   },
   blue: {
      border: 'border-blue-200 dark:border-blue-800/30',
      bg: 'bg-white dark:bg-gray-800/60',
      progressBg: 'bg-blue-100 dark:bg-blue-900/50',
      progressFill: 'bg-blue-500 dark:bg-blue-600',
      levelBg: 'bg-blue-100 dark:bg-blue-800/30',
      levelText: 'text-blue-700 dark:text-blue-300',
      titleText: 'text-blue-700 dark:text-blue-300',
      badgeBg: 'bg-blue-100 dark:bg-blue-800/30',
      badgeText: 'text-blue-700 dark:text-blue-300',
      contentBorder: 'border-blue-500',
      contentBg: 'bg-blue-50 dark:bg-blue-900/10',
      contentText: 'text-blue-700 dark:text-blue-300',
      checkColor: 'text-blue-500',
      buttonBg: 'bg-blue-500 dark:bg-blue-600',
      buttonHover: 'hover:bg-blue-600 dark:hover:bg-blue-500',
      buttonGroupHover: 'group-hover:bg-blue-400 dark:group-hover:bg-blue-500'
   },
   purple: {
      border: 'border-purple-200 dark:border-purple-800/30',
      bg: 'bg-white dark:bg-gray-800/60',
      progressBg: 'bg-purple-100 dark:bg-purple-900/50',
      progressFill: 'bg-purple-500 dark:bg-purple-600',
      levelBg: 'bg-purple-100 dark:bg-purple-800/30',
      levelText: 'text-purple-700 dark:text-purple-300',
      titleText: 'text-purple-700 dark:text-purple-300',
      badgeBg: 'bg-purple-100 dark:bg-purple-800/30',
      badgeText: 'text-purple-700 dark:text-purple-300',
      contentBorder: 'border-purple-500',
      contentBg: 'bg-purple-50 dark:bg-purple-900/10',
      contentText: 'text-purple-700 dark:text-purple-300',
      checkColor: 'text-purple-500',
      buttonBg: 'bg-purple-500 dark:bg-purple-600',
      buttonHover: 'hover:bg-purple-600 dark:hover:bg-purple-500',
      buttonGroupHover: 'group-hover:bg-purple-400 dark:group-hover:bg-purple-500'
   }
}

const defaultOnClick = () => {}

export const MoleculeGrammarLevelCard: FunctionComponent<TGrammarLevelCard> = ({
   level,
   levelTitle,
   levelSubtitle,
   progress,
   topics,
   lessons,
   description,
   isLocked = false,
   colorTheme,
   ribbon = '',
   onStartLevel = defaultOnClick,
   startLevelText,
   whatYouWillLearnText,
   lessonsText
}) => {
   const theme = colorThemes[colorTheme]
   const opacity = isLocked ? 'opacity-80' : ''

   return (
      <div
         className={`group relative flex h-[380px] flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md ${theme.border} ${theme.bg}`}
      >
         {/* Ribbon for locked/advanced levels */}
         {ribbon && (
            <div className="absolute right-0 top-0 h-16 w-16 overflow-hidden">
               <div className="absolute right-[-30px] top-[10px] w-[100px] rotate-45 transform bg-purple-600 py-1 text-center text-xs font-medium text-white">
                  {ribbon}
               </div>
            </div>
         )}

         {/* Progress bar header - always present but invisible for locked cards */}
         <div
            className={`relative h-2 w-full overflow-hidden ${
               isLocked ? 'bg-gray-100 dark:bg-gray-800' : theme.progressBg
            }`}
         >
            {!isLocked && (
               <div
                  className={`absolute left-0 top-0 h-full ${theme.progressFill}`}
                  style={{ width: `${progress}%` }}
               />
            )}
         </div>

         <div className="flex flex-1 flex-col px-4 pt-4">
            {/* Header with level badge and info */}
            <div className="mb-4 flex h-[60px] items-center">
               <div
                  className={`mr-2 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${theme.levelBg} ${opacity}`}
               >
                  <span className={`text-base font-bold ${theme.levelText}`}>{level}</span>
               </div>
               <div className="flex-1">
                  <h4 className={`text-lg font-bold leading-tight ${theme.titleText}`}>{levelTitle}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{levelSubtitle}</p>
               </div>
            </div>

            {/* Topics for locked levels or learning content for unlocked */}
            <div className="mb-4 min-h-[140px]">
               <div className={`border-l-3 rounded-md p-3 ${theme.contentBorder} ${theme.contentBg}`}>
                  <div className={`mb-2 text-xs font-medium ${theme.contentText}`}>{whatYouWillLearnText}</div>
                  <div className="space-y-1.5">
                     {topics.map((topic, index) => (
                        <div className="flex items-start text-xs" key={index}>
                           <Icon
                              className={`mr-1.5 mt-0.5 flex-shrink-0 ${theme.checkColor}`}
                              icon="check"
                              iconSize="small"
                           />
                           <span className="flex-1 leading-relaxed">{topic}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Locked message or lesson info - consistent height */}
            <div className="mb-4 flex h-[70px] items-center px-0">
               <div className="flex h-full w-full items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                     <Icon className="mr-1 flex-shrink-0" icon="book" iconSize="small" />
                     <span className="whitespace-nowrap">
                        {lessons} {lessonsText}
                     </span>
                  </div>
                  <div className="flex items-center">
                     <Icon className="mr-1 flex-shrink-0" icon="target" iconSize="small" />
                     <span className="text-right">{description}</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Action button - pushed to bottom */}
         <div
            className={`flex h-[50px] items-center justify-center text-center text-sm font-medium text-white transition-all ${
               isLocked
                  ? 'cursor-not-allowed bg-purple-500/50 dark:bg-purple-700/50'
                  : `cursor-pointer ${theme.buttonBg} ${theme.buttonHover} ${theme.buttonGroupHover}`
            }`}
            onClick={!isLocked ? onStartLevel : undefined}
         >
            {startLevelText}
            <Icon
               className={`ml-1.5 ${!isLocked ? 'transition-transform group-hover:translate-x-1' : ''}`}
               icon={isLocked ? 'cross' : 'circle-chevron-right'}
               iconSize="small"
            />
         </div>
      </div>
   )
}
