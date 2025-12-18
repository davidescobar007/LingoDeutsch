import { FunctionComponent } from 'react'
import Image from 'next/image'

import { AtomBadge, AtomButton, AtomText, AtomTitle, Icon } from '@/components/atoms'

type TMoleculeCard = {
   image?: string
   title?: string
   content?: string
   redirectTo?: string
   timeToRead?: string
   isCompleted?: boolean | null
   _date?: Date
   cardType?: 'withImage' | 'simple'
   buttonText?: string
   footerText?: string
   onClick?: () => void
}

const defaultOnClick = () => {}

export const MoleculeCard: FunctionComponent<TMoleculeCard> = ({
   image = undefined,
   title = '',
   content = '',
   redirectTo = '',
   timeToRead = '',
   isCompleted = false,
   _date = null,
   buttonText = '',
   cardType = 'withImage',
   footerText = '',
   onClick = defaultOnClick
}) => {
   if (cardType === 'simple') {
      return (
         <div className="card bg-base-100 xl:w-7/24 lg:w-11/24 w-full shadow-xl">
            <div className="card-body">
               <AtomTitle type="h5">{title}</AtomTitle>
               <AtomText>{content}</AtomText>
               <div className="card-actions mt-4 items-center justify-between">
                  <AtomText fontSize="small" isThin type="span">
                     {footerText}
                  </AtomText>
                  {buttonText && (
                     <AtomButton href={redirectTo} onClick={onClick} type={redirectTo ? 'link' : 'button'}>
                        {buttonText}
                     </AtomButton>
                  )}
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="card bg-neutral-content my-6 h-96 min-w-64 max-w-64 shadow-lg">
         {image && title && (
            <figure className="h-52">
               <Image
                  alt={title}
                  className="min-h-full w-full object-cover"
                  height={400}
                  src={image}
                  width={400}
               />
            </figure>
         )}

         <div className="card-body p-2">
            <AtomTitle extraClassName="h-16" type="h4">
               {title}
            </AtomTitle>
            <AtomText type="paragraph">{content}</AtomText>

            <div className="card-actions items-center justify-between">
               <div className="flex items-center gap-1">
                  <Icon icon="timer" iconSize="small" iconState="primary" /> {timeToRead} min
               </div>

               {isCompleted && <AtomBadge color="accent">Aprendido</AtomBadge>}
               {buttonText && redirectTo && (
                  <AtomButton href={`/app/article/${redirectTo}`} isBlock type="link">
                     {buttonText}
                  </AtomButton>
               )}
            </div>
         </div>
      </div>
   )
}
