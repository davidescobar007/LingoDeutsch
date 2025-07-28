import { useTranslations } from 'next-intl'

import { AtomBadge, AtomButton, AtomText, AtomTitle, Icon } from '@/components/atoms'

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
               <AtomTitle type="h5">{t('grammar.popularTopics')}</AtomTitle>
            </div>

            <div className="flex flex-wrap gap-2">
               {popularTopics.map((topic, index) => (
                  <AtomBadge colorTheme={topic.colorTheme} key={index} variant="topic">
                     {topic.label}
                  </AtomBadge>
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
                     className={`rounded-lg border-l-4 bg-gray-50 border-${level.colorTheme}-500 p-2 dark:border-${level.colorTheme}-600 dark:bg-gray-800`}
                     key={level.level}
                  >
                     <div className="flex items-center">
                        <div
                           className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-${level.colorTheme}-100 dark:bg-${level.colorTheme}-900/30`}
                        >
                           <AtomText
                              className={`text-${level.colorTheme}-600 dark:text-${level.colorTheme}-400`}
                              fontSize="large"
                              isBold
                              type="span"
                           >
                              {level.level}
                           </AtomText>
                        </div>
                        <div className="ml-4 flex-1">
                           <AtomTitle type="h4">{level.title}</AtomTitle>
                           <AtomText className="-mt-2" type="paragraph">
                              {level.description}
                           </AtomText>
                        </div>
                        <div className="ml-2 flex items-center">
                           <AtomText fontSize="small" type="span">
                              {level.count} {t('grammar.topics')}
                           </AtomText>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Bottom CTA */}
         <div className="flex flex-col items-center gap-3 border-t border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white sm:flex-row dark:border-gray-800">
            <div className="flex-grow text-center sm:text-left">
               <AtomTitle extraClassName="text-white" type="h5">
                  {t('grammar.readyToImprove')}
               </AtomTitle>
               <AtomText className="text-xs text-white/80" type="paragraph">
                  {t('grammar.discoverAllTopics')}
               </AtomText>
            </div>
            <AtomButton href="grammar" onClick={onViewAllClick} size="sm" type="link" variant="SECONDARY">
               {t('grammar.viewAllTopics')}
               <Icon className="ml-1.5" icon="circle-chevron-right" iconSize="small" />
            </AtomButton>
         </div>
      </div>
   )
}
