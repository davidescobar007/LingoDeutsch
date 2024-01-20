import { FunctionComponent } from "react"

import PictureAtom from "../../atoms/picture"
import Title from "../../atoms/title"

type TMoleculeCard = {
   image: string
   title: string
   content: string
   level: string[]
}

const levelDefaultProp: string[] = []

const MoleculeCard: FunctionComponent<TMoleculeCard> = ({
   image,
   title,
   content,
   level = levelDefaultProp,
   ...rest
}) => {
   return (
      <article className="card card-side mb-8 cursor-pointer bg-white shadow-lg" {...rest}>
         <figure>
            <div className="avatar">
               <div className="h-48 w-52 rounded">
                  <PictureAtom image={image} />
               </div>
            </div>
         </figure>
         <div className="card-body p-4">
            <article className="prose">
               <Title extraClassName="card-title mb-1 text-ellipsis overflow-hidden line-clamp-2">{title}</Title>
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

export default MoleculeCard
