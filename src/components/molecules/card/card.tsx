import { FunctionComponent } from 'react'
import { TbClock } from 'react-icons/tb'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AtomText, AtomTitle, Icon } from '@/components/atoms'
import { Link } from '@/navigation'

type TMoleculeCard = {
   image: string
   title: string
   content?: string
   redirectTo?: string
}

export const MoleculeCard: FunctionComponent<TMoleculeCard> = ({
   image,
   title,
   content = '',
   redirectTo = ''
}) => {
   const t = useTranslations()

   return (
      <div className="card my-6 h-96 w-64 shadow-lg">
         <figure className="h-52">
            <Image
               alt={title}
               className="min-h-full w-full object-cover"
               height={400}
               layout="responsive"
               src={image}
               width={400}
            />
         </figure>
         <div className="card-body p-2">
            <AtomText className="badge badge-secondary">{t('card.new')}</AtomText>
            <AtomTitle extraClassName="h-16" type="h4">
               {title}
            </AtomTitle>
            <AtomText type="paragraph">{content}</AtomText>

            <div className="card-actions items-center justify-between">
               <AtomText>
                  <Icon icon={<TbClock />} iconSize="medium" /> {t('card.readTime')}
               </AtomText>
               <Link className="btn btn-primary" href={`/app/article/${redirectTo}`} role="button">
                  {t('card.readNow')}
               </Link>
            </div>
         </div>
      </div>
   )
}
