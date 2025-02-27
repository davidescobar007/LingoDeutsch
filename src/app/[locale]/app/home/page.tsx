/* eslint-disable react/jsx-sort-props */
'use client'
import React, { useMemo } from 'react'
import { TbBook, TbBook2, TbBrain, TbChecklist, TbFlame } from 'react-icons/tb'
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
import { useGetGrammarByLevel } from '@/hooks/grammar'
import { useGetVocabularyStats } from '@/hooks/translations'
import { useScore } from '@/hooks/user'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'
import { constants } from '@/modules/global.types'
import { getCookie } from '@/utils'

const SLIDES = Array.from(Array(10).keys())

const Learn = () => {
   const t = useTranslations()
   const user = getUserInfo() as TUser
   const { data: listOfGrammarTopics } = useGetGrammarByLevel('A1')
   const { data: articles, isFetching } = useArticleList()
   const { data: vocabularyStats } = useGetVocabularyStats(user)
   const { data: scoreList } = useScore()
   const language = useMemo(() => getCookie('NEXT_LOCALE'), []) as string

   return (
      <div className="flex w-full flex-col">
         <div className="mb-9">
            <AtomTitle type="h3">{t('learn.grammarTitle')}</AtomTitle>
            <MoleculeCallToActionCard
               buttonProps={{ buttonText: t('learn.startGrammarLesson'), isBlock: false, buttonIcon: <TbBook /> }}
               content={t('learn.grammarContent')}
               icon={<Icon icon={<TbBook />} iconSize="large" />}
               isIconFilled
               title={t('learn.grammarStepByStep')}
            />
         </div>

         <div className="mb-9">
            <AtomTitle type="h3">{t('learn.expandVocabulary')}</AtomTitle>
            <AtomText type="paragraph">{t('learn.myVocabularyProgress')}</AtomText>
            <div className="-m-3 mb-3 mt-2 flex flex-wrap">
               <div className="w-6/12  p-3 md:w-3/12">
                  <MoleculeMiniCard
                     content={t('learn.saved')}
                     footer="42"
                     icon={<Icon icon={<TbBook2 className="text-blue-500" />} iconSize="large" />}
                     className=""
                  />
               </div>
               <div className="w-6/12  p-3 md:w-3/12 ">
                  <MoleculeMiniCard
                     content={t('learn.learned')}
                     footer="15"
                     icon={<Icon icon={<TbBrain className="text-pink-500" />} iconSize="large" />}
                     className=" "
                  />
               </div>
               <div className="w-6/12  p-3 md:w-3/12">
                  <MoleculeMiniCard
                     content={t('learn.toReview')}
                     footer="8"
                     icon={<Icon icon={<TbChecklist className="text-violet-500" />} iconSize="large" />}
                     className=""
                  />
               </div>
               <div className="w-6/12  p-3 md:w-3/12">
                  <MoleculeMiniCard
                     content={t('learn.streak')}
                     footer="5"
                     icon={<Icon icon={<TbFlame className="text-orange-500" />} iconSize="large" />}
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
                        <progress className="progress progress-primary w-full" max="100" value={30} />
                     }
                     icon={<Icon icon={<TbChecklist />} iconSize="large" />}
                     title={t('learn.yourChallenge')}
                  />
               </div>
               <div className="w-full p-3 md:w-6/12">
                  <MoleculeCallToActionCard
                     buttonProps={{ buttonText: t('learn.expandVocabulary'), isBlock: true }}
                     content={t('learn.masteredVocabulary')}
                     dinamicContent={
                        <progress className="progress progress-primary w-full" max="100" value={30} />
                     }
                     icon={<Icon icon={<TbBook2 />} iconSize="large" />}
                     title={t('learn.vocabularyMastery')}
                  />
               </div>
            </div>
         </div>

         <div className="mb-9">
            <AtomTitle type="h3">{t('learn.readingExercises')}</AtomTitle>
            <div className="mb-3 w-full">
               <MoleculeCarrousel options={{ containScroll: false, loop: true, align: 'start' }}>
                  {articles.map(({ id, title, imageFile }) => {
                     return (
                        <div key={id} className="flex justify-center">
                           <MoleculeCard
                              image={`${process.env.NEXT_PUBLIC_API_ENVIRONMENT}/api/files/${constants.ARTICLES}/${id}/${imageFile}`}
                              key={id}
                              redirectTo={id}
                              title={title}
                           />
                        </div>
                     )
                  })}
               </MoleculeCarrousel>
            </div>
         </div>

         <div className="card-outlined w-full overflow-y-auto" style={{ height: '500px' }}>
            {scoreList && <MoleculeScore scoreList={scoreList} user={user} />}
         </div>
      </div>
   )
}

export default Learn
