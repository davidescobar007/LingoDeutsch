'use client'
import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { AtomTitle, CardLoader } from '@/components/atoms'
import { MoleculeCard, MoleculeScore, MoleculeStat, MoleculeTimeLine } from '@/components/molecules'
import { useArticleList } from '@/hooks/articles'
import { useGetGrammarByLevel } from '@/hooks/grammar'
import { useGetVocabularyStats } from '@/hooks/translations'
import { useScore } from '@/hooks/user'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'
import { constants } from '@/modules/global.types'
import { getCookie } from '@/utils'

const classes = {
   container: 'flex w-full flex-col',
   section: 'mb-10 w-full rounded-2xl bg-white shadow-md',
   sectionContent: 'p-8',
   timelineContainer: 'flex h-full flex-1 gap-10',
   leftColumn: 'flex w-8/12 flex-wrap',
   cardContainer: 'mb-12 w-full rounded-2xl bg-white p-8 shadow-md',
   articleContainer: 'w-full rounded-2xl bg-white p-8 shadow-md',
   articleContent: 'w-full',
   articleList: 'rounded-box flex w-full space-x-4 overflow-x-scroll',
   rightColumn: 'flex h-full w-3/12 flex-1 flex-col rounded-2xl bg-white p-8 shadow-md',
   scoreContainer: 'flex-grow overflow-y-auto'
}
var settings = {
   dots: true,
   infinite: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1
}
const Learn = () => {
   const t = useTranslations()
   const user = getUserInfo() as TUser
   const { data: listOfGrammarTopics } = useGetGrammarByLevel('A1')
   const { data: articles, isFetching } = useArticleList()
   const { data: vocabularyStats } = useGetVocabularyStats(user)
   const { data: scoreList } = useScore()
   const language = useMemo(() => getCookie('NEXT_LOCALE'), []) as string

   const listOfItems: { text: string; url: string }[] = (
      listOfGrammarTopics?.map(({ topic, id }) =>
         topic ? { text: topic[language as keyof typeof topic], url: `/app/grammar/A1/${id}` } : null
      ) ?? []
   ).filter((item: { text: string; url: string } | null): item is { text: string; url: string } => item !== null)

   return (
      <div className={classes.container}>
         <div className={classes.section}>
            <div className={classes.sectionContent}>
               <AtomTitle>Explora lecciones de gramática claras y organizadas.</AtomTitle>
               <MoleculeTimeLine listOfItems={listOfItems} />
            </div>
         </div>

         <div className={classes.timelineContainer}>
            <div className={classes.leftColumn}>
               <div className={classes.cardContainer}>
                  <AtomTitle extraClassName="mb-6">Estudia palabras clave con tarjetas interactivas.</AtomTitle>
                  <MoleculeStat
                     text1="¡Sigue agregando más palabras!"
                     text2="No olvides repasar regularmente. "
                     title1="Palabras guardadas"
                     title2="Ultima revision"
                     value1={(vocabularyStats?.total_words || 0).toString()}
                     value2={(vocabularyStats?.last_time_seen as unknown as string) || ''}
                  />
               </div>
               <div className={classes.articleContainer}>
                  <AtomTitle extraClassName="mb-6">
                     Lee artículos, selecciona palabras y guárdalas para repasarlas después.
                  </AtomTitle>
                  <div className={classes.articleContent}>
                     {isFetching
                        ? Array.from({ length: 3 }).map(() => <CardLoader key={crypto.randomUUID()} />)
                        : articles && (
                             <div className={classes.articleList}>
                                {articles.map(({ title, id, imageFile }) => {
                                   return (
                                      <MoleculeCard
                                         className="via-80%% min-w-96 from-10% to-10% before:!bg-transparent before:!bg-gradient-to-b before:!from-gray-700 before:!via-gray-600 before:!to-transparent"
                                         image={`${process.env.NEXT_PUBLIC_API_ENVIRONMENT}/api/files/${constants.ARTICLES}/${id}/${imageFile}`}
                                         key={id}
                                         redirectTo={id}
                                         title={title}
                                      />
                                   )
                                })}
                             </div>
                          )}
                  </div>
               </div>
            </div>

            <div className={classes.rightColumn}>
               <AtomTitle extraClassName="mb-6">{t('score.title')}</AtomTitle>
               <div className={classes.scoreContainer} style={{ height: '500px' }}>
                  {scoreList && <MoleculeScore scoreList={scoreList} user={user} />}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Learn
