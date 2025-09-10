import { useTranslations } from 'next-intl'

import { AtomButton, AtomText, AtomTitle, Icon } from '@/components/atoms'

type VocabularyStats = {
   totalWords?: number
   learnedWords?: number
   wordsLearnedToday?: number
   streak?: number
}

type VocabularyPreviewProps = {
   vocabularyStats?: VocabularyStats
}

const defaultVocabularyStats: VocabularyStats = {}

export const MoleculeVocabularyPreview = ({
   vocabularyStats = defaultVocabularyStats
}: VocabularyPreviewProps) => {
   const t = useTranslations()

   const totalWords = vocabularyStats?.totalWords || 0
   const learnedWords = vocabularyStats?.learnedWords || 0
   const todayWords = vocabularyStats?.wordsLearnedToday || 0
   const streak = vocabularyStats?.streak || 0

   return (
      <div className="from-primary via-primary/80 to-accent relative overflow-hidden rounded-xl bg-gradient-to-tl shadow-lg transition-shadow duration-200 hover:shadow-xl">
         <div className="bg-primary-content/10 absolute inset-0 backdrop-blur-sm" />
         <div className="relative z-10">
            {/* Top section - Your vocabulary stats */}
            <div className="border-primary-content/20 border-b p-4 sm:p-6">
               <div className="mb-3 flex items-center">
                  <Icon className="text-primary-content mb-3 mr-1.5" icon="book" iconSize="medium" />
                  <AtomTitle extraClassName="text-primary-content" type="h5">
                     {t('vocabulary.yourVocabulary')}
                  </AtomTitle>
               </div>

               <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="text-center">
                     <div className="text-primary-content text-2xl font-bold">{totalWords}</div>
                     <AtomText className="text-primary-content/80" fontSize="small" type="span">
                        {t('vocabulary.totalWords')}
                     </AtomText>
                  </div>
                  <div className="text-center">
                     <div className="text-primary-content text-2xl font-bold">{learnedWords}</div>
                     <AtomText className="text-primary-content/80" fontSize="small" type="span">
                        {t('vocabulary.mastered')}
                     </AtomText>
                  </div>
                  <div className="text-center">
                     <div className="text-primary-content text-2xl font-bold">{todayWords}</div>
                     <AtomText className="text-primary-content/80" fontSize="small" type="span">
                        {t('vocabulary.today')}
                     </AtomText>
                  </div>
                  <div className="text-center">
                     <div className="text-primary-content text-2xl font-bold">{streak}</div>
                     <AtomText className="text-primary-content/80" fontSize="small" type="span">
                        {t('vocabulary.streak')}
                     </AtomText>
                  </div>
               </div>
            </div>

            

            {/* Bottom CTA */}
            <div className="bg-primary/20 text-primary-content flex flex-col gap-3 rounded-b-xl p-4 sm:flex-row sm:items-center sm:p-5">
               <div className="flex-grow text-center sm:text-left">
                  <AtomTitle extraClassName="text-primary-content text-base sm:text-lg" type="h5">
                     {totalWords > 0 ? t('vocabulary.keepLearning') : t('vocabulary.startBuilding')}
                  </AtomTitle>
                  <AtomText className="text-primary-content/90 text-sm sm:text-base" type="paragraph">
                     {totalWords > 0 ? t('vocabulary.practiceYourWords') : t('vocabulary.readArticlesToBuild')}
                  </AtomText>
               </div>
               <div className="flex justify-center sm:justify-end">
                  <AtomButton href="vocabulary" size="sm" type="link" variant="SECONDARY">
                     <span className="hidden sm:inline">
                        {totalWords > 0 ? t('vocabulary.practiceNow') : t('vocabulary.getStarted')}
                     </span>
                     <span className="sm:hidden">
                        {totalWords > 0 ? t('vocabulary.practice') : t('vocabulary.start')}
                     </span>
                     <Icon className="ml-1.5" icon="circle-chevron-right" iconSize="small" />
                  </AtomButton>
               </div>
            </div>
         </div>
      </div>
   )
}
