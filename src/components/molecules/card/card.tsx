import { FunctionComponent } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AtomBadge, AtomText, AtomTitle, Icon } from '@/components/atoms'
import { Link } from '@/navigation'
import { calculateDateDistance } from '@/utils/date.utils'

type TMoleculeCard = {
   image: string
   title: string
   content?: string
   redirectTo?: string
   timeToRead?: string
   isCompleted?: boolean | null
   date?: Date
}

export const MoleculeCard: FunctionComponent<TMoleculeCard> = ({
   image,
   title,
   content = '',
   redirectTo = '',
   timeToRead = '',
   isCompleted = false,
   date = null
}) => {
   const t = useTranslations()

   return (
      <div className="card bg-neutral-content my-6 h-96 min-w-64 max-w-64 shadow-lg">
         <figure className="h-52">
            <Image alt={title} className="min-h-full w-full object-cover" height={400} src={image} width={400} />
         </figure>
         <div className="card-body p-2">
            <AtomBadge color={isCompleted ? 'success' : 'secondary'}>
               {isCompleted ? 'Aprendido' : date ? calculateDateDistance(new Date(date)) : ''}
            </AtomBadge>
            <AtomTitle extraClassName="h-16" type="h4">
               {title}
            </AtomTitle>
            <AtomText type="paragraph">{content}</AtomText>

            <div className="card-actions items-center justify-between">
               <div className="flex items-center gap-1">
                  <Icon icon="timer" iconSize="small" iconState="primary" /> {timeToRead} min
               </div>
               <Link className="btn btn-primary" href={`/app/article/${redirectTo}`} role="button">
                  {t('card.readNow')}
               </Link>
            </div>
         </div>
      </div>
   )
}
