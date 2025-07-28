import { useTranslations } from 'next-intl'

import { AtomGrammarTopicTag, AtomText, Icon } from '@/components/atoms'

type GrammarTopic = {
   level: string
   title: string
   description: string
   count: number
   colorTheme: 'green' | 'blue' | 'purple'
}

type GrammarPreviewProps = {
   popularTopics: {
      label: string
      colorTheme: 'blue' | 'green' | 'purple' | 'orange' | 'teal' | 'red' | 'yellow' | 'indigo'
   }[]
   grammarLevels: GrammarTopic[]
   onViewAllClick: () => void
}

export const MoleculeGrammarPreview = ({ popularTopics, grammarLevels, onViewAllClick }: GrammarPreviewProps) => {
   const t = useTranslations()

   return (
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
         {/* Top section - Popular topics cloud */}
         <div className="border-b border-gray-200 p-5 dark:border-gray-800">
            <div className="mb-3 flex items-center">
               <Icon className="mr-1.5 text-blue-500" icon="library" iconSize="small" />
               <h5 className="text-base font-medium text-gray-800 dark:text-gray-200">
                  {t('grammar.popularTopics')}
               </h5>
            </div>

            <div className="flex flex-wrap gap-2">
               {popularTopics.map((topic, index) => (
                  <AtomGrammarTopicTag colorTheme={topic.colorTheme} key={index}>
                     {topic.label}
                  </AtomGrammarTopicTag>
               ))}
            </div>
         </div>

         {/* Simple grammar level overview */}
         <div className="p-5">
            <AtomText className="mb-4" type="paragraph">
               {t('grammar.grammarPreview')}
            </AtomText>

            <div className="space-y-4">
               {grammarLevels.map((level) => (
                  <div
                     className={`rounded-lg border-l-4 border-${level.colorTheme}-500 bg-gray-50 p-4 dark:border-${level.colorTheme}-600 dark:bg-gray-800`}
                     key={level.level}
                  >
                     <div className="flex items-center">
                        <div
                           className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-${level.colorTheme}-100 text-lg font-bold text-${level.colorTheme}-600 dark:bg-${level.colorTheme}-900/30 dark:text-${level.colorTheme}-400`}
                        >
                           {level.level}
                        </div>
                        <div className="ml-4 flex-1">
                           <h4 className="text-lg font-bold">{level.title}</h4>
                           <p className="text-sm text-gray-500 dark:text-gray-400">{level.description}</p>
                        </div>
                        <div className="ml-2 flex items-center">
                           <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                              {level.count} {t('grammar.topics')}
                           </span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Bottom CTA */}
         <div className="flex flex-col items-center gap-3 border-t border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white sm:flex-row dark:border-gray-800">
            <div className="flex-grow text-center sm:text-left">
               <h5 className="font-bold">{t('grammar.readyToImprove')}</h5>
               <p className="text-xs text-white/80">{t('grammar.discoverAllTopics')}</p>
            </div>
            <button
               className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 sm:w-auto dark:bg-gray-900 dark:text-blue-400 dark:hover:bg-gray-800"
               onClick={onViewAllClick}
            >
               {t('grammar.viewAllTopics')}
               <Icon className="ml-1.5" icon="circle-chevron-right" iconSize="small" />
            </button>
         </div>
      </div>
   )
}
