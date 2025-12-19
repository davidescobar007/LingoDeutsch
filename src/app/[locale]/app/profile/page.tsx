'use client'
import { useState } from 'react'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AtomButton, AtomInput, AtomText, AtomTitle } from '@/components/atoms'
import { ProfileLoader } from '@/components/atoms'
import { useUpdateUser } from '@/hooks/user'
import { TUser } from '@/modules/actions/types'
import { getUserInfo, logOut } from '@/modules/actions/users.actions'
import { Link, useRouter } from '@/navigation'
import { areObjectsDistinct } from '@/utils'

const Page = () => {
   const t = useTranslations()
   const user = getUserInfo() as TUser
   const userCopy: TUser = { ...user }
   const [userInfo, setUserInfo] = useState<TUser>(userCopy)
   const { mutate, isPending } = useUpdateUser()
   const { push } = useRouter()

   const handleLogout = () => {
      logOut()
      push('/')
   }

   const handleChange = (e: any) => {
      const { name, value } = e.target
      setUserInfo((prevValues) => ({
         ...prevValues,
         [name]: name === 'username' ? value.replace(/[@ ]+/g, '') : value
      }))
   }

   const handleSubmit = (event: any) => {
      event.preventDefault()
      mutate(userInfo)
   }

   const hasChanges = areObjectsDistinct(userInfo, userCopy)

   if (!user) {
      return (
         <section className="flex w-full justify-center p-5 lg:px-20">
            <ProfileLoader />
         </section>
      )
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
            {/* Avatar & User Info */}
            <div className="mb-8 rounded-lg border border-base-300 bg-base-100 p-6">
               <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                     <div className="ring-primary ring-offset-base-100 h-24 w-24 overflow-hidden rounded-full ring-4 ring-offset-2">
                        <Image
                           alt="Profile picture"
                           height={96}
                           src={user?.avatarUrl || ''}
                           width={96}
                        />
                     </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-center sm:text-left">
                     <AtomTitle extraClassName="!mb-1" type="h3">
                        {userCopy?.name}
                     </AtomTitle>
                     <AtomText className="text-base-content/60 mb-4">
                        @{userCopy?.username}
                     </AtomText>

                     {/* Stats Pills */}
                     <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                        <div className="rounded-full bg-primary/10 px-3 py-1">
                           <AtomText className="text-sm font-semibold text-primary">
                              ✨ {user.score} puntos
                           </AtomText>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Edit Form */}
            <div className="rounded-lg border border-base-300 bg-base-100 p-6">
               <AtomTitle extraClassName="!mb-4" type="h4">
                  Editar Perfil
               </AtomTitle>

               <form className="space-y-4" onSubmit={handleSubmit}>
                  <AtomInput
                     inputId="name"
                     labelText={t('profile.name')}
                     maxLength="30"
                     name="name"
                     onChange={handleChange}
                     placeholder={userCopy?.name}
                     value={userInfo?.name}
                     withLabel
                  />

                  <AtomInput
                     id="username"
                     labelText={t('profile.alias')}
                     maxLength="13"
                     name="username"
                     onChange={handleChange}
                     placeholder={`@${userCopy?.username}`}
                     value={`@${userInfo?.username}`}
                     withLabel
                  />

                  <AtomInput
                     disabled
                     id="email"
                     labelText={t('profile.email')}
                     name="email"
                     onChange={handleChange}
                     placeholder={userCopy?.email}
                     value={userInfo?.email}
                     withLabel
                  />

                  {/* Action Buttons */}
                  <div
                     className={`flex gap-3 transition-all duration-500 ${
                        hasChanges ? 'opacity-100' : 'pointer-events-none opacity-0'
                     }`}
                  >
                     <AtomButton
                        disabled={isPending}
                        extraClassName="flex-1"
                        onClick={() => setUserInfo(userCopy)}
                        type="reset"
                        variant="OUTLINE"
                     >
                        {isPending ? <span className="loading loading-spinner loading-sm" /> : 'Cancelar'}
                     </AtomButton>
                     <AtomButton
                        disabled={isPending}
                        extraClassName="flex-1"
                        type="submit"
                        variant="PRIMARY"
                     >
                        {isPending ? (
                           <span className="loading loading-spinner loading-sm" />
                        ) : (
                           t('profile.saveButton')
                        )}
                     </AtomButton>
                  </div>
               </form>
            </div>

            {/* Logout */}
            <div className="mt-6 text-center">
               <Link className="link link-primary inline-flex gap-2" href="/" onClick={handleLogout}>
                  <LogOut size={18} />
                  Cerrar sesión
               </Link>
            </div>
         </div>
      </section>
   )
}

export default Page
