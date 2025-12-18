import { MoleculeCard, MoleculeCarousel, MoleculeSectionHeader } from '@/components/molecules'
import { TArticle } from '@/modules/actions/types'
import { constants } from '@/modules/global.types'

type OrganismArticleCarouselProps = {
   articles: TArticle[]
   extraClassName?: string
}

export const OrganismArticleCarousel = ({ articles, extraClassName = '' }: OrganismArticleCarouselProps) => {
   return (
      <div className={extraClassName}>
         <MoleculeSectionHeader
            extraClassName="-mb-2 pt-10"
            linkHref="article"
            linkText="Ver todos"
            title="Tu Vocabulario"
         />

         <MoleculeCarousel options={{ containScroll: false, loop: true, align: 'start' }}>
            {articles?.map(({ id, title, imageFile, created, estimated_read_time }) => (
               <MoleculeCard
                  buttonText="Leer artículo"
                  date={created ? new Date(created) : undefined}
                  image={`${process.env.NEXT_PUBLIC_API_ENVIRONMENT}/api/files/${constants.ARTICLES}/${id}/${imageFile}`}
                  key={id}
                  redirectTo={id}
                  timeToRead={estimated_read_time || ''}
                  title={title}
               />
            )) || []}
         </MoleculeCarousel>
      </div>
   )
}
