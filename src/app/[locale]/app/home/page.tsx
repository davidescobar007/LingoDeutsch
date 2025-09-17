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
import { useGetGrammarByLevel } from '@/hooks/grammar'
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
   const { data: grammarList } = useGetGrammarByLevel('A1')

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

            <div>
               <AtomTitle type="h2">👋 Hola {user?.name}, ¿listo para aprender alemán hoy?</AtomTitle>
               <AtomText type="span">Comienza tu lección diaria y sigue aprendiendo.</AtomText>
            </div>

            <div className="mb-12">
               <MoleculeGrammarPreview
                  popularTopics={
                     grammarList
                        ?.sort(() => 0.5 - Math.random())
                        .slice(0, 6)
                        .map((grammar, index) => ({
                           id: grammar.id,
                           label: grammar.topic_name?.es || 'Tema de gramática',
                           colorTheme: (
                              ['blue', 'green', 'purple', 'orange', 'teal', 'red', 'yellow', 'indigo'] as const
                           )[index % 8]
                        })) || []
                  }
               />
            </div>

            <div className="mb-12">
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
