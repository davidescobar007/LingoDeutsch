import { FunctionComponent, ReactNode } from 'react'

import { AtomText } from '@/components/atoms'

export type StatItem = {
   icon?: ReactNode
   title: string
   value: string | number
   description?: string
   className?: string
}

export interface MoleculeStatProps {
   items: StatItem[]
   className?: string
}

export const MoleculeStat: FunctionComponent<MoleculeStatProps> = ({ items, className = '' }) => {
   return (
      <div className="stats stats-vertical lg:stats-horizontal max-w-full shadow">
         {items.map((item, idx) => (
            <div className="stat" key={idx}>
               {item.icon && <div className="stat-figure">{item.icon}</div>}
               <AtomText className="stat-title" type="paragraph">
                  {item.title}
               </AtomText>
               <AtomText className="stat-value text-primary" fontSize="huge" isBold type="paragraph">
                  {item.value}
               </AtomText>
               {item.description && (
                  <AtomText className="stat-desc" fontSize="small" isThin type="paragraph">
                     {item.description}
                  </AtomText>
               )}
            </div>
         ))}
      </div>
   )
}
