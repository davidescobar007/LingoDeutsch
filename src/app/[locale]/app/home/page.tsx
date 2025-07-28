/* eslint-disable react/jsx-sort-props */
'use client'
import React from 'react'
import { useTranslations } from 'next-intl'

import { AtomText, AtomTitle, Icon } from '@/components/atoms'
import {
   MoleculeCallToActionCard,
   MoleculeCard,
   MoleculeCarrousel,
   MoleculeGrammarPreview,
   MoleculeLearningHero,
   MoleculeMiniCard,
   MoleculeScore
} from '@/components/molecules'
import { useArticleList } from '@/hooks/articles'
import { useGetVocabularyStats } from '@/hooks/translations'
import { useScore } from '@/hooks/user'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'
import { constants } from '@/modules/global.types'

const Learn = () => {
   const t = useTranslations()
   const user = getUserInfo() as TUser

   const { data: articles } = useArticleList()
   const { data: vocabularyStats } = useGetVocabularyStats(user)
   const { data: scoreList } = useScore()

   return (
      <div className="flex w-full flex-col 2xl:flex-row 2xl:gap-8">
         <div className="w-full 2xl:w-8/12">
            <MoleculeLearningHero
               title={t('learn.welcomeBack', { name: '{name}' })}
               subtitle={t('learn.myVocabularyProgress')}
               ctaButton={t('learn.continueJourney')}
               user={user}
               vocabularyStats={vocabularyStats || null}
            />

            <div className="mb-12">
               <div className="mb-2 flex items-center justify-between">
                  <AtomTitle type="h3">{t('learn.grammarTitle')}</AtomTitle>
               </div>
               <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{t('grammar.grammarPreview')}</p>

               {/* New Grammar Preview Component */}
               <MoleculeGrammarPreview
                  popularTopics={[
                     { label: 'Artículos', colorTheme: 'blue' },
                     { label: 'Presente', colorTheme: 'green' },
                     { label: 'Pasado', colorTheme: 'purple' },
                     { label: 'Pronombres', colorTheme: 'orange' },
                     { label: 'Adjetivos', colorTheme: 'teal' },
                     { label: 'Casos', colorTheme: 'red' },
                     { label: 'Verbos Modales', colorTheme: 'yellow' },
                     { label: 'Preposiciones', colorTheme: 'indigo' }
                  ]}
                  grammarLevels={[
                     {
                        level: 'A1',
                        title: t('grammar.A1'),
                        description: t('grammar.idealForBeginners'),
                        count: 8,
                        colorTheme: 'green'
                     },
                     {
                        level: 'A2',
                        title: t('grammar.A2'),
                        description: t('grammar.basicConversation'),
                        count: 12,
                        colorTheme: 'blue'
                     },
                     {
                        level: 'B1',
                        title: t('grammar.B1'),
                        description: t('grammar.completeToUnlock'),
                        count: 15,
                        colorTheme: 'purple'
                     }
                  ]}
                  onViewAllClick={() => (window.location.href = '/grammar')}
               />
            </div>

            <div className="mb-12">
               <AtomTitle type="h3">{t('learn.expandVocabulary')}</AtomTitle>
               <AtomText type="paragraph">{t('learn.vocabularyProgress')}</AtomText>

               <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                  <MoleculeMiniCard
                     content={t('learn.totalWords')}
                     footer={vocabularyStats?.totalWords || 0}
                     icon={<Icon icon="library" className="!text-blue-500" iconSize="large" />}
                     variant="compact"
                  />
                  <MoleculeMiniCard
                     content={t('learn.learned')}
                     footer={vocabularyStats?.learnedWords || 0}
                     icon={<Icon icon="brain-cog" className="!text-green-500" iconSize="large" />}
                     variant="compact"
                  />
                  <MoleculeMiniCard
                     content={t('learn.dailyGoal')}
                     footer={`${vocabularyStats?.wordsLearnedToday || 0}/5`}
                     icon={<Icon icon="star" className="!text-orange-500" iconSize="large" />}
                     variant="compact"
                     className="col-span-2 md:col-span-1"
                  />
               </div>

               <div className="mt-6">
                  <MoleculeCallToActionCard
                     buttonProps={{
                        buttonText: t('learn.goToVocabulary'),
                        isBlock: true,
                        typeOf: 'PRIMARY',
                        href: 'vocabulary'
                     }}
                     content={t('learn.vocabularyOverview', {
                        mastered: Math.round(vocabularyStats?.percentageDominated || 0),
                        streak: vocabularyStats?.streak || 0
                     })}
                     icon={<Icon icon="gauge" iconSize="large" iconState="primary" />}
                     title={t('learn.vocabularyPreview')}
                  />
               </div>
            </div>

            <div className="mb-12">
               <AtomTitle type="h3">{t('learn.readingExercises')}</AtomTitle>
               <div className="mb-3 w-full">
                  <MoleculeCarrousel options={{ containScroll: false, loop: true, align: 'start' }}>
                     {articles
                        ? articles.map(({ id, title, imageFile }) => {
                             return (
                                <MoleculeCard
                                   image={`${process.env.NEXT_PUBLIC_API_ENVIRONMENT}/api/files/${constants.ARTICLES}/${id}/${imageFile}`}
                                   key={id}
                                   redirectTo={id}
                                   title={title}
                                   buttonText="Leer artículo"
                                />
                             )
                          })
                        : []}
                  </MoleculeCarrousel>
               </div>
            </div>
         </div>

         <div className="card-outlined h-screen w-full overflow-y-auto 2xl:w-4/12">
            {scoreList && <MoleculeScore scoreList={scoreList} user={user} />}
         </div>
      </div>
   )
}

export default Learn
