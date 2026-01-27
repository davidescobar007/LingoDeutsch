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
   layout?: 'horizontal' | 'vertical' | 'responsive' // responsive is default (vertical on mobile, horizontal on large screens)
   gap?: 'small' | 'medium' | 'large'
}

export const MoleculeStat: FunctionComponent<MoleculeStatProps> = ({
   items,
   className = '',
   layout = 'responsive',
   gap = 'medium'
}) => {
   const layoutClasses = {
      horizontal: 'stats-horizontal',
      vertical: 'stats-vertical',
      responsive: 'stats-vertical lg:stats-horizontal'
   }

   const gapClasses = {
      small: 'gap-2',
      medium: 'gap-4',
      large: 'gap-6'
   }

   return (
      <div className={`stats ${layoutClasses[layout]} max-w-full shadow ${gapClasses[gap]} ${className}`}>
         {items.map((item, idx) => (
            <div className={`stat ${item.className || ''}`} key={idx}>
               {item.icon && <div className="stat-figure">{item.icon}</div>}
               <AtomText className="stat-title" type="paragraph">
                  {item.title}
               </AtomText>
               <AtomText className="stat-value text-primary" fontSize="medium" isBold type="paragraph">
                  ****{item.value}****
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
