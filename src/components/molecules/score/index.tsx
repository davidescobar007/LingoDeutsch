'use client'
import { FunctionComponent } from 'react'
import { useTranslations } from 'next-intl'

import { TScore, TUser } from '@/modules/actions/types'

type MoleculeScoreProps = {
   scoreList: TScore
   user: TUser | undefined
}

export const MoleculeScore: FunctionComponent<MoleculeScoreProps> = ({ scoreList, user }) => {
   const t = useTranslations()

   const scoreMedals: { [key: string]: string } = {
      '1': '🥇',
      '2': '🥈',
      '3': '🥉'
   }

   return (
      <div className="">
         <ul className="w-full">
            {scoreList.map(({ username, score, position }, index) => (
               <li className="mb-4" key={username + position}>
                  <div
                     className={`stat border-secondary rounded-xl border-2 shadow-md ${
                        user?.username === username ? 'bg-secondary' : 'bg-white'
                     }`}
                  >
                     <div className="stat-figure text-secondary text-3xl">{scoreMedals[index + 1] || '⚡'}</div>
                     <div className="stat-title">
                        <span className="font-bold">
                           {position} - @{username}
                        </span>
                     </div>
                     <div className="stat-value text-lg">
                        {score} {t('score.span')}
                     </div>
                  </div>
               </li>
            ))}
         </ul>
      </div>
   )
}
