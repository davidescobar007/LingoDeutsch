"use client"

import LayoutContainer from "@/components/_common/layoutContainer"
import { CardLoader } from "@/components/atoms/loader"
import MoleculeCard from "@/components/molecules/card"
import MoleculeScore from "@/components/molecules/score"
import { constants } from "@/modules/global.types"
import { Link } from "@/navigation"
import { useArticleList } from "@/store/articles"
import { useLogin, useScore } from "@/store/user"

const Learn = () => {
   const { data: articles, isFetching } = useArticleList()
   const { data: user } = useLogin()
   const { data: scoreList } = useScore()

   return (
      <LayoutContainer>
         {isFetching
            ? Array.from({ length: 3 }).map((_i, index) => <CardLoader key={index} />)
            : articles && (
                 <ul className="w-7/12">
                    {articles.map(({ level, text_content, title, id, imageFile }) => {
                       return (
                          <li key={id}>
                             <Link href={`/app/article/${id}`}>
                                <MoleculeCard
                                   content={text_content}
                                   image={`${process.env.NEXT_PUBLIC_API_ENVIRONMENT}/api/files/${constants.ARTICLES}/${id}/${imageFile}`}
                                   level={level}
                                   title={title}
                                />
                             </Link>
                          </li>
                       )
                    })}
                 </ul>
              )}

         <MoleculeScore scoreList={scoreList || []} user={user} />
      </LayoutContainer>
   )
}

export default Learn
