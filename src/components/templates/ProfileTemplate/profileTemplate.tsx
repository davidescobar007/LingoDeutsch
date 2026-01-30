'use client'
import { useState } from 'react'

import { AtomText, AtomTitle, SpinLoader } from '@/components/atoms'
import { OrganismProfileActions, OrganismProfileEditForm, OrganismProfileHeader } from '@/components/organisms'
import { TUser } from '@/modules/actions/types'
import { areObjectsDistinct } from '@/utils'

type TemplateProfileProps = {
   isPending: boolean
   onLogout: () => void
   onUpdateUser: (_userInfo: TUser) => void
   user: TUser | null
}

export const TemplateProfile = ({ isPending, onLogout, onUpdateUser, user }: TemplateProfileProps) => {
   const userCopy: TUser = { ...user } as TUser
   const [userInfo, setUserInfo] = useState<TUser>(userCopy)

   const handleChange = (e: any) => {
      const { name, value } = e.target
      setUserInfo((prevValues) => ({
         ...prevValues,
         [name]: name === 'username' ? value.replace(/[@ ]+/g, '') : value
      }))
   }

   const handleSubmit = (_event: any) => {
      _event.preventDefault()
      onUpdateUser(userInfo)
   }

   const handleCancel = () => {
      setUserInfo(userCopy)
   }

   const hasChanges = areObjectsDistinct(userInfo, userCopy)

   if (!user) {
      return <SpinLoader />
   }

   return (
      <section className="w-full px-4 py-8">
         {/* Header */}
         <div className="mb-8">
            <AtomTitle type="h2">Mi Perfil</AtomTitle>
            <AtomText>Gestiona tu información personal y preferencias</AtomText>
         </div>

         {/* Profile Card */}
         <div className="mx-auto max-w-2xl">
            <OrganismProfileHeader extraClassName="mb-8" user={user} />

            <OrganismProfileEditForm
               hasChanges={hasChanges}
               isPending={isPending}
               onCancel={handleCancel}
               onChange={handleChange}
               onSubmit={handleSubmit}
               userCopy={userCopy}
               userInfo={userInfo}
            />

            <OrganismProfileActions extraClassName="mt-6" onLogout={onLogout} />
         </div>
      </section>
   )
}
