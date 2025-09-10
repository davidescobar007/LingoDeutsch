import { useTranslations } from 'next-intl'

import { AtomButton, AtomText, AtomTitle, Icon } from '@/components/atoms'

type _GrammarTopic = {
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
}

export const MoleculeGrammarPreview = ({ popularTopics }: GrammarPreviewProps) => {
   const t = useTranslations()

   return (
      <div className="from-primary via-primary/80 to-accent relative overflow-hidden rounded-xl bg-gradient-to-br shadow-lg transition-shadow duration-200 hover:shadow-xl">
         <div className="bg-primary-content/10 absolute inset-0 backdrop-blur-sm" />
         <div className="relative z-10">
            {/* Top section - Popular topics cloud */}
            <div className="border-primary-content/20 border-b p-4 sm:p-6">
               <div className="mb-3 flex items-center">
                  <Icon className="text-primary-content mb-3 mr-1.5" icon="library" iconSize="medium" />
                  <AtomTitle extraClassName="text-primary-content" type="h5">
                     {t('grammar.popularTopics')}
                  </AtomTitle>
               </div>

               <div className="flex flex-wrap gap-2 sm:gap-4">
                  {popularTopics.map((topic, index) => {
                     const getColorClass = (colorTheme: string) => {
                        const colors = {
                           blue: 'bg-info/80',
                           green: 'bg-success/80',
                           purple: 'bg-primary/80',
                           orange: 'bg-warning/80',
                           teal: 'bg-info/60',
                           red: 'bg-error/80',
                           yellow: 'bg-warning/60',
                           indigo: 'bg-primary/60'
                        }
                        return colors[colorTheme as keyof typeof colors] || colors.purple
                     }
                     return (
                        <div className="flex items-center gap-1.5 sm:gap-2" key={index}>
                           <div
                              className={`h-1.5 w-1.5 sm:h-2 sm:w-2 ${getColorClass(
                                 topic.colorTheme
                              )} rounded-full shadow-sm`}
                           />
                           <AtomText className="text-primary-content" fontSize="small" type="span">
                              {topic.label}
                           </AtomText>
                        </div>
                     )
                  })}
               </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-primary/20 text-primary-content flex flex-col gap-3 rounded-b-xl p-4 sm:flex-row sm:items-center sm:p-5">
               <div className="flex-grow text-center sm:text-left">
                  <AtomTitle extraClassName="text-primary-content text-base sm:text-lg" type="h5">
                     {t('grammar.readyToImprove')}
                  </AtomTitle>
                  <AtomText className="text-primary-content/90 text-sm sm:text-base" type="paragraph">
                     {t('grammar.discoverAllTopics')}
                  </AtomText>
                  <div className="mt-2 flex flex-wrap justify-center gap-2 opacity-60 sm:justify-start">
                     <AtomText className="text-primary-content" fontSize="small" type="span">
                        A1-A2
                     </AtomText>
                     <AtomText className="text-primary-content" fontSize="small" type="span">
                        B1-B2
                     </AtomText>
                     <AtomText className="text-primary-content" fontSize="small" type="span">
                        C1-C2
                     </AtomText>
                  </div>
               </div>
               <div className="flex justify-center sm:justify-end">
                  <AtomButton href="grammar" size="sm" type="link" variant="SECONDARY">
                     Ir a sección
                     <Icon className="ml-1.5" icon="circle-chevron-right" iconSize="small" />
                  </AtomButton>
               </div>
            </div>
         </div>
      </div>
   )
}
