/* eslint-disable react/jsx-sort-props */
'use client'
import React from 'react'
import { useTranslations } from 'next-intl'

import { AtomText, AtomTitle, Icon } from '@/components/atoms'
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
import { Link } from '@/navigation'

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
               <MoleculeVocabularyPreview vocabularyStats={vocabularyStats} />
            </div>

            <div className="mb-12">
               <div className="-mb-2 flex w-full justify-between pt-10">
                  <AtomText fontSize="large" isBold>
                     Tu Vocabulario
                  </AtomText>
                  <Link href="article">
                     <AtomText className="flex items-center justify-center gap-1" isBold isPrimary>
                        Ver todos <Icon className="text-primary" icon="move-right" iconSize="small" />
                     </AtomText>
                  </Link>
               </div>

               <MoleculeCarrousel options={{ containScroll: false, loop: true, align: 'start' }}>
                  {articles
                     ? articles.map(({ id, title, imageFile, created, estimated_read_time }) => {
                          return (
                             <MoleculeCard
                                image={`${process.env.NEXT_PUBLIC_API_ENVIRONMENT}/api/files/${constants.ARTICLES}/${id}/${imageFile}`}
                                key={id}
                                redirectTo={id}
                                title={title}
                                buttonText="Leer artículo"
                                date={created ? new Date(created) : undefined}
                                timeToRead={estimated_read_time || ''}
                             />
                          )
                       })
                     : []}
               </MoleculeCarrousel>
            </div>
         </div>

         <div className="card-outlined h-screen w-full overflow-y-auto 2xl:w-4/12">
            {scoreList && <MoleculeScore scoreList={scoreList} user={user} />}
         </div>
      </div>
   )
}

export default Learn
