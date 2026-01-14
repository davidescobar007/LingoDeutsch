'use client'
import { useTranslations } from 'next-intl'

import { AtomText } from '@/components/atoms'
import { MoleculeScore } from '@/components/molecules'
import { TScore, TUser } from '@/modules/actions/types'

type OrganismScoreSidebarProps = {
   scoreList?: TScore
   user?: TUser
   isGuest?: boolean
   extraClassName?: string
}

export const OrganismScoreSidebar = ({
   scoreList = undefined,
   user = undefined,
   isGuest = false,
   extraClassName = ''
}: OrganismScoreSidebarProps) => {
   const t = useTranslations('locked.scoreSidebar')

   if (!scoreList) return null

   return (
      <div
         className={`border-base-300 bg-base-100 h-screen overflow-y-auto rounded-2xl border p-6 shadow-md ${extraClassName}`}
      >
         <MoleculeScore scoreList={scoreList} user={user} />

         {/* Guest incentive message at bottom */}
         {isGuest && (
            <div className="border-primary/20 bg-primary/5 mt-6 flex items-start gap-3 rounded-xl border p-4">
               <span className="text-xl">🌟</span>
               <AtomText className="text-sm" fontSize="small">
                  {t('guestMessage')}
               </AtomText>
            </div>
         )}
      </div>
   )
}
