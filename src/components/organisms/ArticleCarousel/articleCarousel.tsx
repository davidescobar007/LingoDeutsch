import { MoleculeCard, MoleculeCarousel, MoleculeSectionHeader } from '@/components/molecules'
import { TArticle } from '@/modules/actions/types'
import { constants } from '@/modules/global.types'

type OrganismArticleCarouselProps = {
   articles: TArticle[]
   extraClassName?: string
}

export const OrganismArticleCarousel = ({ articles, extraClassName = '' }: OrganismArticleCarouselProps) => {
   // Ensure articles is always an array
   const safeArticles = Array.isArray(articles) ? articles : []

   // Filter by level A1 (MVP focus - PRD §4.2)
   const filteredArticles = safeArticles.filter((article) => article.level === 'A1' || !article.level)

   // Take first 6 articles to avoid overwhelming carousel
   const displayArticles = filteredArticles.slice(0, 6)

   return (
      <div className={extraClassName}>
         <MoleculeSectionHeader
            extraClassName="-mb-2 pt-10"
            linkHref="article"
            linkText="Ver todos"
            title="📖 Artículos Recomendados"
         />
         <MoleculeCarousel options={{ containScroll: false, loop: false, align: 'start' }}>
            {displayArticles.map(({ id, title, imageFile, created, estimated_read_time, level }) => (
               <MoleculeCard
                  _date={created ? new Date(created) : undefined}
                  buttonText="Leer artículo"
                  image={`${process.env.NEXT_PUBLIC_API_ENVIRONMENT}/api/files/${constants.ARTICLES}/${id}/${imageFile}`}
                  key={id}
                  redirectTo={id}
                  timeToRead={estimated_read_time || ''}
                  title={`${level ? `${level} · ` : ''}${title}`}
               />
            ))}
         </MoleculeCarousel>
      </div>
   )
}
