'use client'
import { FunctionComponent, JSX } from 'react'
import { BsStars } from 'react-icons/bs'
import { TbCrown, TbMedal, TbTrophy } from 'react-icons/tb'
import { TiStarFullOutline } from 'react-icons/ti'
import { useTranslations } from 'next-intl'

import { AtomText, AtomTitle, Icon } from '@/components/atoms'
import { TScore, TUser } from '@/modules/actions/types'

type MoleculeScoreProps = {
   scoreList: TScore
   user: TUser | undefined
}

const getPositionClass = (position: number) => {
   switch (position) {
      case 1:
         return 'bg-yellow-400'
      case 2:
         return 'bg-slate-400'
      case 3:
         return 'bg-amber-600'
      default:
         return 'bg-secondary'
   }
}

export const MoleculeScore: FunctionComponent<MoleculeScoreProps> = ({ scoreList, user }) => {
   const t = useTranslations()

   const scoreMedals: { [key: string]: JSX.Element } = {
      '1': <Icon icon={<TbCrown className="text-yellow-400" />} iconSize="medium" />,
      '2': <Icon icon={<TbTrophy className="text-slate-400" />} iconSize="medium" />,
      '3': <Icon icon={<TbMedal className="text-amber-600" />} iconSize="medium" />
   }

   return (
      <div className="w-full">
         <AtomTitle type="h3">{t('score.title')}</AtomTitle>
         <div className="alert mb-8 border-yellow-200 bg-yellow-50" role="alert">
            <BsStars className="text-yellow-700" />
            <AtomText className="text-yellow-700" isBold>
               {t('score.congratulations')}
            </AtomText>
         </div>
         <ul>
            {scoreList.map(({ username, score, position }, index) => (
               <li
                  className={`hover:bg-secondary mb-8 flex h-20 items-center rounded-xl p-5 ${
                     user?.username === username ? 'border-secondary border-2' : ''
                  }`}
                  key={username + position}
               >
                  <div className="flex w-8/12 items-center justify-start gap-4">
                     <AtomText
                        className={`flex h-7 w-7 items-center justify-center rounded-full ${getPositionClass(
                           Number(position)
                        )}`}
                        isBold
                     >
                        {position}
                     </AtomText>
                     <div>
                        <AtomText isBold>{`@${username}`}</AtomText>
                        <div className="badge badge-secondary block sm:hidden">
                           {score} {t('score.span')}
                        </div>
                     </div>
                  </div>
                  <div className="flex w-4/12 justify-end gap-4">
                     <div className="badge badge-secondary hidden sm:block">
                        {score} {t('score.span')}
                     </div>
                     {scoreMedals[index + 1] || (
                        <Icon icon={<TiStarFullOutline className="text-primary" />} iconSize="medium" />
                     )}
                  </div>
               </li>
            ))}
         </ul>
      </div>
   )
}
