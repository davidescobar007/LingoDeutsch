import { AtomTitle } from '@/components/atoms'
import { MoleculeCard, MoleculeCarousel, MoleculeSectionHeader } from '@/components/molecules'
import { TArticle } from '@/modules/actions/types'
import { constants } from '@/modules/global.types'

type OrganismArticleCarouselProps = {
   articles: TArticle[]
   excludeId?: string
   extraClassName?: string
   filterLevel?: string
   limit?: number
   showViewAll?: boolean
   title?: string
}

const DEFAULT_LIMIT = 6
const DEFAULT_LEVEL = 'A1'

export const OrganismArticleCarousel = ({
   articles,
   excludeId = '',
   extraClassName = '',
   filterLevel,
   limit = DEFAULT_LIMIT,
   showViewAll = true,
   title
}: OrganismArticleCarouselProps) => {
   const safeArticles = Array.isArray(articles) ? articles : []

   const levelToFilter = filterLevel ?? DEFAULT_LEVEL

   const filteredArticles = safeArticles
      .filter((article) => {
         if (!article.level) return true
         return Array.isArray(article.level)
            ? article.level.includes(levelToFilter)
            : article.level === levelToFilter
      })
      .filter((article) => !excludeId || article.id !== excludeId)

   const displayArticles = filteredArticles.slice(0, limit)

   if (displayArticles.length === 0) return null

   return (
      <div className={extraClassName}>
         {showViewAll ? (
            <MoleculeSectionHeader
               linkHref="article"
               linkText="Ver todos"
               title={title ?? '📖 Artículos Recomendados'}
            />
         ) : (
            <div className="flex w-full justify-between">
               <AtomTitle type="h3">{title ?? '📖 Artículos Recomendados'}</AtomTitle>
            </div>
         )}
         <MoleculeCarousel options={{ containScroll: false, loop: true, align: 'start' }}>
            {displayArticles.map(({ created, estimated_read_time, id, imageFile, level, title: articleTitle }) => (
               <MoleculeCard
                  _date={created ? new Date(created) : undefined}
                  buttonText="Leer artículo"
                  image={`${process.env.NEXT_PUBLIC_API_ENVIRONMENT}/api/files/${constants.ARTICLES}/${id}/${imageFile}`}
                  key={id}
                  redirectTo={id}
                  timeToRead={estimated_read_time || ''}
                  title={`${level ? `${level} · ` : ''}${articleTitle}`}
               />
            ))}
         </MoleculeCarousel>
      </div>
   )
}
