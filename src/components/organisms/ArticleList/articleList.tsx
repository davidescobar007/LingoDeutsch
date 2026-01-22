'use client'
import { SpinLoader } from '@/components/atoms'
import { AtomText } from '@/components/atoms'
import { MoleculeAlert, MoleculeCard } from '@/components/molecules'
import { TArticle } from '@/modules/actions/types'
import { constants } from '@/modules/global.types'

type OrganismArticleListProps = {
   articles?: TArticle[]
   isLoading?: boolean
}

const EMPTY_ARRAY: TArticle[] = []

export const OrganismArticleList = ({ articles = EMPTY_ARRAY, isLoading = false }: OrganismArticleListProps) => {
   if (isLoading) {
      return <SpinLoader />
   }

   const hasArticles = articles && articles.length > 0

   return (
      <div className="flex flex-wrap justify-center gap-4 md:justify-evenly">
         {!hasArticles && (
            <MoleculeAlert
               message="No se encontraron articulos con esta criteria, intenta con un filtro diferente"
               type="warning"
            />
         )}
         {hasArticles && <AtomText isBlock>Total articulos: {articles.length}</AtomText>}
         {hasArticles &&
            articles.map(({ created, estimated_read_time, id, imageFile, is_completed, title }) => (
               <div key={id}>
                  <MoleculeCard
                     _date={created as unknown as Date}
                     buttonText="Leer articulo"
                     image={`${process.env.NEXT_PUBLIC_API_ENVIRONMENT}/api/files/${constants.ARTICLES}/${id}/${imageFile}`}
                     isCompleted={is_completed}
                     redirectTo={id}
                     timeToRead={estimated_read_time}
                     title={title}
                  />
               </div>
            ))}
      </div>
   )
}
