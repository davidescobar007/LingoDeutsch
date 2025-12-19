'use client'
import { AtomText, AtomTitle } from '@/components/atoms'

type OrganismArticleHeaderProps = {
   description?: string
   title?: string
}

export const OrganismArticleHeader = ({
   description = 'Aca puedes encontrar articulos para leer y aprender vocabulario nuevo. Puedes filtrar por nivel, estado y ordenarlos por fecha de publicacion o por estado.',
   title = 'Lee y aprende'
}: OrganismArticleHeaderProps) => {
   return (
      <header className="mb-4 w-full">
         <AtomTitle type="h3">{title}</AtomTitle>
         <AtomText>{description}</AtomText>
      </header>
   )
}
