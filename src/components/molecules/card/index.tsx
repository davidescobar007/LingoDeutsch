import { FunctionComponent } from 'react'
import Image from 'next/image'

import { AtomTitle } from '@/components/atoms'

type TMoleculeCard = {
   image?: string | undefined
   title: string
   content: string
   level: string[]
}

const levelDefaultProp: string[] = []

export const MoleculeCard: FunctionComponent<TMoleculeCard> = ({
   image,
   title,
   content,
   level = levelDefaultProp,
   ...rest
}) => {
   return (
      <article className="card card-side mb-8 cursor-pointer bg-white shadow-lg" {...rest}>
         {image && (
            <figure>
               <div className="avatar">
                  <div className="h-48 w-44 rounded">
                     <Image alt={title} layout="fill" objectFit="cover" src={image} />
                  </div>
               </div>
            </figure>
         )}
         <div className="card-body p-4">
            <article className="prose">
               <AtomTitle extraClassName="card-title mb-1 text-ellipsis overflow-hidden line-clamp-2">
                  {title}
               </AtomTitle>
               {level.map((item) => (
                  <div className="badge badge-primary mr-2" key={item}>
                     {item}
                  </div>
               ))}
               <p className="mt-1 line-clamp-2">{content}</p>
            </article>
         </div>
      </article>
   )
}
