/* eslint-disable react/jsx-sort-props */
'use client'
import React from 'react'
import { useTranslations } from 'next-intl'

import { AtomText, AtomTitle, Icon } from '@/components/atoms'
import {
   MoleculeCallToActionCard,
   MoleculeCard,
   MoleculeCarrousel,
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
            <div className="mb-12">
               <AtomTitle type="h3">{t('learn.grammarTitle')}</AtomTitle>
               <MoleculeCallToActionCard
                  buttonProps={{
                     buttonText: t('learn.startGrammarLesson'),
                     isBlock: false,
                     buttonIcon: <Icon icon="book-open-check" iconState="white" />
                  }}
                  content={t('learn.grammarContent')}
                  icon={<Icon icon="book-open-check" iconSize="large" iconState="primary" />}
                  isIconFilled
                  title={t('learn.grammarStepByStep')}
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
                     dinamicContent={
                        <div className="space-y-2">
                           <div className="flex justify-between text-sm">
                              <span>{t('learn.progress')}</span>
                              <span>{Math.round(vocabularyStats?.percentageDominated || 0)}%</span>
                           </div>
                           <progress
                              className="progress progress-primary w-full"
                              max="100"
                              value={vocabularyStats?.percentageDominated || 0}
                           />
                        </div>
                     }
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
