import React from 'react'

import { Link } from '@/navigation'

type MoleculeTimeLineProps = {
   listOfItems: { text: string; url: string }[]
   startClassName?: string
   middleClassName?: string
   endClassName?: string
   containerClassName?: string
}

export const MoleculeTimeLine: React.FC<MoleculeTimeLineProps> = ({
   listOfItems,
   startClassName = 'timeline-start timeline-box',
   middleClassName = 'timeline-middle',
   endClassName = 'timeline-end timeline-box',
   containerClassName = 'timeline w-full overflow-x-scroll py-5'
}) => {
   return (
      <ul className={containerClassName}>
         {listOfItems?.map(({ text, url }, index) => {
            if (!text && !url) return null
            return index % 2 === 1 ? (
               <li key={url}>
                  <hr />
                  <div className={middleClassName}>
                     <div className="badge badge-primary badge-lg">{index + 1}</div>
                  </div>
                  <div className={endClassName}>
                     <Link className="" href={url}>
                        {text}
                     </Link>
                  </div>
                  <hr />
               </li>
            ) : (
               <li key={url}>
                  {index !== 0 && (
                     <>
                        <hr />
                        <div className={startClassName} />
                     </>
                  )}
                  <div className={startClassName}>
                     <Link className="" href={url}>
                        {text}
                     </Link>
                  </div>
                  <div className="timeline-middle">
                     <div className="badge badge-primary badge-lg">{index + 1}</div>
                  </div>
                  {index !== listOfItems.length - 1 && <hr />}
               </li>
            )
         })}
      </ul>
   )
}
