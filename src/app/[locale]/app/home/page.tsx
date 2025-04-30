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
               <AtomText type="paragraph">{t('learn.myVocabularyProgress')}</AtomText>
               <div className="-m-3 mt-2 flex flex-wrap">
                  <div className="w-6/12  p-3 md:w-3/12">
                     <MoleculeMiniCard
                        content={t('learn.saved')}
                        footer={vocabularyStats?.totalWords}
                        icon={<Icon icon="library" className="!text-blue-500" iconSize="large" />}
                        className=""
                     />
                  </div>
                  <div className="w-6/12  p-3 md:w-3/12 ">
                     <MoleculeMiniCard
                        content={t('learn.learned')}
                        footer={vocabularyStats?.learnedWords}
                        icon={<Icon icon="brain-cog" className="text-pink-500" iconSize="large" />}
                        className=" "
                     />
                  </div>
                  <div className="w-6/12  p-3 md:w-3/12">
                     <MoleculeMiniCard
                        content={t('learn.toReview')}
                        footer={vocabularyStats?.toRecheck}
                        icon={<Icon icon="clipboard-check" className="!text-green-500" iconSize="large" />}
                        className=""
                     />
                  </div>
                  <div className="w-6/12  p-3 md:w-3/12">
                     <MoleculeMiniCard
                        content={t('learn.streak')}
                        footer={vocabularyStats?.streak}
                        icon={<Icon icon="flame" className="text-orange-500" iconSize="large" />}
                        className=""
                     />
                  </div>
                  <div className="w-full p-3 md:w-6/12">
                     <MoleculeCallToActionCard
                        buttonProps={{
                           buttonText: t('learn.practiceVocabulary'),
                           isBlock: true,
                           typeOf: 'SECONDARY'
                        }}
                        content={t('learn.learnAtLeast')}
                        dinamicContent={
                           <progress
                              className="progress progress-primary w-full"
                              max="5"
                              value={vocabularyStats?.wordsLearnedToday}
                           />
                        }
                        icon={<Icon icon="clipboard-check" iconSize="large" iconState="primary" />}
                        title={t('learn.yourChallenge')}
                     />
                  </div>
                  <div className="w-full p-3 md:w-6/12">
                     <MoleculeCallToActionCard
                        buttonProps={{ buttonText: t('learn.expandVocabulary'), isBlock: true }}
                        content={t('learn.masteredVocabulary', {
                           percentageDominated: vocabularyStats?.percentageDominated
                        })}
                        dinamicContent={
                           <progress
                              className="progress progress-primary w-full"
                              max="100"
                              value={vocabularyStats?.percentageDominated}
                           />
                        }
                        icon={<Icon icon="library" iconSize="large" iconState="primary" />}
                        title={t('learn.vocabularyMastery')}
                     />
                  </div>
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
