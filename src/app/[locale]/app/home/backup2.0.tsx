'use client'
import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { AtomTitle, CardLoader } from '@/components/atoms'
import { MoleculeCard, MoleculeScore, MoleculeStat, MoleculeTimeLine } from '@/components/molecules'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'
import { constants } from '@/modules/global.types'
import { useArticleList } from '@/hooks/articles'
import { useGetGrammarByLevel } from '@/hooks/grammar'
import { useScore } from '@/hooks/user'
import { getCookie } from '@/utils'

const styles = {
   container: 'flex h-[calc(100vh-300px)] w-full flex-col',
   header: 'mb-6 min-h-52 w-full bg-white rounded-box p-5 shadow-md',
   content: 'flex h-[calc(100vh-300px)] gap-5',
   leftColumn: 'flex w-8/12 flex-wrap ',
   leftColumnFirst: 'bg-white rounded-box p-5 shadow-md mb-6',
   leftColumnSecond: 'bg-white rounded-box p-5 shadow-md',
   fullWidth: 'w-full',
   articleContainer: 'rounded-box flex h-72 w-full space-x-4 overflow-x-scroll py-5',
   rightColumn: 'h-[calc(100vh-335px)] w-4/12 bg-white rounded-box p-5 shadow-md',
   scoreContainer: 'h-[calc(100vh-450px)] px-7 overflow-y-auto'
}

const Learn = () => {
   const t = useTranslations()
   const user = getUserInfo() as TUser
   const { data: listOfGrammarTopics } = useGetGrammarByLevel('A1')
   const { data: articles, isFetching } = useArticleList()
   const { data: scoreList } = useScore()
   const language = useMemo(() => getCookie('NEXT_LOCALE'), []) as string

   const listOfItems: { text: string; url: string }[] = (
      listOfGrammarTopics?.map(({ topic, id }) =>
         topic ? { text: topic[language as keyof typeof topic], url: `/app/grammar/A1/${id}` } : null
      ) ?? []
   ).filter((item: { text: string; url: string } | null): item is { text: string; url: string } => item !== null)

   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <AtomTitle>Explora lecciones de gramática claras y organizadas.</AtomTitle>
            <MoleculeTimeLine listOfItems={listOfItems} />
         </div>

         <div className={styles.content}>
            <div className={styles.leftColumn}>
               <div className={styles.fullWidth + ' ' + styles.leftColumnFirst}>
                  <AtomTitle extraClassName="mb-6">Estudia palabras clave con tarjetas interactivas.</AtomTitle>
                  <MoleculeStat
                     text1="Ver mi Vocabulario"
                     text2="Ir a estudiar"
                     title1="Palabras guardadas"
                     title2="Palabras estudiadas"
                     value1="42"
                     value2="15%"
                  />
               </div>
               <div className={styles.fullWidth + ' ' + styles.leftColumnSecond}>
                  <AtomTitle>Lee artículos, selecciona palabras y guárdalas para repasarlas después.</AtomTitle>
                  <div className={styles.fullWidth}>
                     {isFetching
                        ? Array.from({ length: 3 }).map(() => <CardLoader key={crypto.randomUUID()} />)
                        : articles && (
                             <div className={styles.articleContainer}>
                                {articles.map(({ text_content, title, id, imageFile }) => {
                                   return (
                                      <MoleculeCard
                                         className="min-w-96"
                                         content={text_content}
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

            <div className={styles.rightColumn}>
               <AtomTitle extraClassName="mb-6">{t('score.title')}</AtomTitle>
               <div className={styles.scoreContainer}>
                  {scoreList && <MoleculeScore scoreList={scoreList} user={user} />}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Learn
