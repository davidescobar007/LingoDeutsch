import { FunctionComponent } from 'react'
import Image from 'next/image'

import { AtomTitle } from '@/components/atoms'
import { Link } from '@/navigation'

type TMoleculeCard = {
   image: string
   title: string
   content?: string
   redirectTo?: string
   className?: string
}

const levelDefaultProp: string[] = []

export const MoleculeCard: FunctionComponent<TMoleculeCard> = ({
   image,
   title,
   content,
   className = '',
   redirectTo = '',
   ...rest
}) => {
   return (
      <article
         className={`card image-full rounded-xl before:!bg-transparent  before:!bg-gradient-to-b before:!from-gray-700 before:!via-gray-600 before:!to-gray-500  ${className}`}
         {...rest}
      >
         <figure>
            <Image alt={title} className="rounded-box opacity-95" layout="fill" objectFit="cover" src={image} />
         </figure>
         <div className="card-body">
            <AtomTitle extraClassName="card-title mb-1 text-ellipsis overflow-hidden line-clamp-2 text-white h-14">
               {title}
            </AtomTitle>
            <p className="mb-2 mt-1 line-clamp-2 text-white">{content}</p>
            <div className="card-actions justify-end">
               <Link className="btn btn-primary" href={`/app/article/${redirectTo}`} role="button">
                  Leer
               </Link>
            </div>
         </div>
      </article>
   )
}
