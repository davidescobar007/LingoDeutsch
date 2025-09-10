/* eslint-disable react/jsx-sort-props */
'use client'
import React from 'react'
import { useTranslations } from 'next-intl'

import { AtomText, AtomTitle } from '@/components/atoms'
import {
   MoleculeCard,
   MoleculeCarrousel,
   MoleculeGrammarPreview,
   MoleculeScore,
   MoleculeVocabularyPreview
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
            {/* <div className="mb-12">
               <MoleculeLearningHero
                  title={t('learn.welcomeBack', { name: '{name}' })}
                  subtitle={t('learn.myVocabularyProgress')}
                  ctaButton={t('learn.continueJourney')}
                  user={user}
                  vocabularyStats={vocabularyStats || null}
               />
            </div> */}

            <div className="mb-12">
               <AtomTitle type="h3">{t('learn.grammarTitle')}</AtomTitle>
               <AtomText type="span">{t('grammar.grammarPreview')}</AtomText>

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
               />
            </div>

            <div className="mb-12">
               <AtomTitle type="h3">{t('learn.expandVocabulary')}</AtomTitle>
               <AtomText type="span">{t('vocabulary.vocabularyPreview')}</AtomText>

               {/* New Vocabulary Preview Component */}
               <MoleculeVocabularyPreview vocabularyStats={vocabularyStats} />
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
