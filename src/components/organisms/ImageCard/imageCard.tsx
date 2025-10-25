/* eslint-disable react/forbid-component-props */
import { FunctionComponent } from 'react'
import { useTranslations } from 'next-intl'

import { AtomBadge, AtomTitle } from '@/components/atoms'

type TOrganismImageCard = {
   image: string
   title: string
   level: string[]
}

export const OrganismImageCard: FunctionComponent<TOrganismImageCard> = ({ image, title, level }) => {
   const t = useTranslations()

   return (
      <article
         className="flex h-44 flex-wrap rounded-md bg-cover p-3"
         style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(65,65,65,0.35) 100%), url(${image})`
         }}
      >
         <AtomTitle extraClassName=" w-full text-start text-white leading-7 font-medium" type="h3">
            {title}
         </AtomTitle>
         <span />

         <div className="flex w-full justify-end gap-3">
            {level.map((item) => (
               <AtomBadge key={item}>{item}</AtomBadge>
            ))}
         </div>
      </article>
   )
}
