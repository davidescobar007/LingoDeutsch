'use client'
import Image from 'next/image'

import { AtomText, AtomTitle } from '@/components/atoms'
import { TUser } from '@/modules/actions/types'

type OrganismProfileHeaderProps = {
   extraClassName?: string
   user: TUser
}

export const OrganismProfileHeader = ({ extraClassName = '', user }: OrganismProfileHeaderProps) => {
   return (
      <div className={`border-base-300 bg-base-100 rounded-lg border p-6 ${extraClassName}`}>
         <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
               <div className="ring-primary ring-offset-base-100 h-24 w-24 overflow-hidden rounded-full ring-4 ring-offset-2">
                  <Image alt="Profile picture" height={96} src={user?.avatarUrl || ''} width={96} />
               </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
               <AtomTitle extraClassName="!mb-1" type="h3">
                  {user?.name}
               </AtomTitle>
               <AtomText className="text-base-content/60 mb-4">@{user?.username}</AtomText>

               {/* Stats Pills */}
               <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  <div className="bg-primary/10 rounded-full px-3 py-1">
                     <AtomText className="text-primary text-sm font-semibold">✨ {user.score} puntos</AtomText>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
