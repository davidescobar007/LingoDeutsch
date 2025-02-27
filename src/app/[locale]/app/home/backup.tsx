'use client'
import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { CardLoader } from '@/components/atoms'
import { MoleculeCard, MoleculeScore, MoleculeStat, MoleculeTimeLine } from '@/components/molecules'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'
import { constants } from '@/modules/global.types'
import { useArticleList } from '@/hooks/articles'
import { useGetGrammarByLevel } from '@/hooks/grammar'
import { useScore } from '@/hooks/user'
import { getCookie } from '@/utils'

const Learn = () => {
   const t = useTranslations()
   const user = getUserInfo() as TUser
   const { data: listOfGrammarTopics } = useGetGrammarByLevel('A1')
   const { data: articles, isFetching } = useArticleList()
   const { data: scoreList } = useScore()
   const language = useMemo(() => getCookie('NEXT_LOCALE'), []) as string
   console.log(scoreList)
   const listOfItems: { text: string; url: string }[] = (
      listOfGrammarTopics?.map(({ topic, id }) =>
         topic ? { text: topic[language as keyof typeof topic], url: `/app/grammar/A1/${id}` } : null
      ) ?? []
   ).filter((item: { text: string; url: string } | null): item is { text: string; url: string } => item !== null)

   return (
      <div className="flex w-full flex-wrap gap-2">
         <div className="bg-orange-3000 w-full">
            <h3 className="mb-5 ">Explora lecciones de gramática claras y organizadas.</h3>
            <MoleculeTimeLine listOfItems={listOfItems} />
         </div>

         <div className="flex w-full gap-3">
            <div className="flex w-full flex-wrap lg:w-2/3">
               <div className="w-full">
                  <h4 className="mb-5 mt-16 ">Estudia palabras clave con tarjetas interactivas.</h4>
                  <div className="w-full">
                     <MoleculeStat
                        text1="Ver mi Vocabulario"
                        text2="Ir a estudiar"
                        title1="Palabras guardadas"
                        title2="Palabras estudiadas"
                        value1="42"
                        value2="15%"
                     />
                  </div>
               </div>

               <div className="w-full">
                  <h4 className="mb-5 mt-16 ">
                     Lee artículos, selecciona palabras y guárdalas para repasarlas después.
                  </h4>
                  <div className="w-full">
                     {isFetching
                        ? Array.from({ length: 3 }).map(() => <CardLoader key={crypto.randomUUID()} />)
                        : articles && (
                             <div className="rounded-box flex h-72 w-full space-x-4  overflow-x-scroll py-5 ">
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

            <div className="tablaDePuntos h-23/24 hidden w-1/3 justify-end overflow-x-scroll bg-pink-300 pt-16 lg:flex">
               {scoreList && <MoleculeScore scoreList={scoreList} user={user} />}
            </div>
         </div>
      </div>
   )
}

export default Learn
