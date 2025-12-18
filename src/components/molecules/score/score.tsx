'use client'
import { FunctionComponent, JSX } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AtomText, AtomTitle, Icon } from '@/components/atoms'
import { TScore, TUser } from '@/modules/actions/types'

type MoleculeScoreProps = {
   scoreList: TScore
   user: TUser | undefined
}

export const MoleculeScore: FunctionComponent<MoleculeScoreProps> = ({ scoreList, user }) => {
   const _t = useTranslations()

   const _scoreMedals: { [key: string]: JSX.Element } = {
      '1': <Icon className="text-yellow-400" icon="crown" iconSize="medium" />,
      '2': <Icon className="text-slate-400" icon="trophy" iconSize="medium" />,
      '3': <Icon className="text-amber-600" icon="medal" iconSize="medium" />
   }

   const userPosition = scoreList.findIndex((item) => item.username === user?.username) + 1
   const isTopThree = userPosition > 0 && userPosition <= 3

   return (
      <div className="w-full">
         <AtomTitle type="h3">Puntuaciones</AtomTitle>
         <AtomText>Compite con otros estudiantes y sube en el ranking</AtomText>

         {isTopThree && (
            <div className="alert my-4 border-yellow-200 bg-yellow-50 shadow-md" role="alert">
               <Icon className="text-yellow-700" icon="stars" />
               <AtomText className="text-yellow-700" isBold>
                  {userPosition === 1
                     ? '¡Felicitaciones! Eres el número 1'
                     : `¡Excelente! Estás en el top 3 (puesto #${userPosition})`}
               </AtomText>
            </div>
         )}
         <ul className="space-y-3">
            {scoreList.map(({ username, score, position }, _index) => {
               const isCurrentUser = user?.username === username
               const _isTop3 = Number(position) <= 3

               return (
                  <li
                     className={`group rounded-2xl p-4 transition-all duration-300 sm:p-5 ${
                        isCurrentUser
                           ? 'bg-primary/10 border-primary/30 border-2 shadow-md'
                           : 'bg-base-100 hover:bg-base-200 border-base-300 border shadow-sm '
                     }`}
                     key={username + position}
                  >
                     <div className="flex items-center gap-3 sm:gap-4">
                        {/* Position Badge */}
                        {Number(position) === 1 ? (
                           <div className="flex  flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 sm:h-10 sm:w-10">
                              <Image
                                 alt="Gold Medal - 1st Place"
                                 height={40}
                                 priority
                                 src="/images/gold-medal.svg"
                                 width={40}
                              />
                           </div>
                        ) : Number(position) === 2 ? (
                           <div className="flexflex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 sm:h-12 sm:w-12">
                              <Image
                                 alt="Silver Medal - 2nd Place"
                                 height={40}
                                 src="/images/silver-medal.svg"
                                 width={40}
                              />
                           </div>
                        ) : Number(position) === 3 ? (
                           <div className="flex flex-shrink-0 items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 sm:h-12 sm:w-12">
                              <Image
                                 alt="Bronze Medal - 3rd Place"
                                 height={40}
                                 src="/images/bronze-medal.svg"
                                 width={40}
                              />
                           </div>
                        ) : (
                           <div
                              className={`bg-primary/20 text-primary flex h-12  w-12 flex-shrink-0 items-center justify-center rounded-xl font-bold `}
                           >
                              {position}
                           </div>
                        )}

                        <div className="flex flex-1 flex-row items-center justify-end gap-2 2xl:flex-col 2xl:items-end">
                           <div className="flex min-w-0 items-center gap-2">
                              <AtomText className="truncate" isBold>
                                 @{username}
                              </AtomText>
                              {isCurrentUser && (
                                 <span className="badge badge-primary badge-xs sm:badge-sm">Tú</span>
                              )}
                           </div>
                           <div className="badge badge-secondary badge-sm sm:badge-md">{score} Exp</div>
                        </div>
                     </div>
                  </li>
               )
            })}
         </ul>
      </div>
   )
}
