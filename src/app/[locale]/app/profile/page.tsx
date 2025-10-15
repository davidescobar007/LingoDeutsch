'use client'
import { useState } from 'react'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AtomButton, AtomInput, AtomTitle } from '@/components/atoms'
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
      <section className="flex w-full flex-col items-center px-4 py-8 lg:px-20">
         {/* Profile Header Card */}
         <div className="bg-base-200 w-full max-w-2xl rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
               <div className="avatar transition-transform duration-300 group-hover:scale-105">
                  <div className="ring-primary ring-offset-base-100 w-32 rounded-full ring-4 ring-offset-2 transition-all duration-300 group-hover:ring-offset-4">
                     <Image
                        alt="Profile picture"
                        className="transition-opacity duration-300 group-hover:opacity-90"
                        height={128}
                        src={user?.avatarUrl || ''}
                        width={128}
                     />
                  </div>
               </div>

               {/* Score Badge */}
               <div className="badge badge-lg badge-primary gap-2 px-6 py-4 shadow-md">
                  <span className="text-lg font-bold">✨ {user.score}</span>
                  <span className="text-sm opacity-90">{t('score.span')}</span>
               </div>
            </div>
         </div>

         {/* Form Card */}
         <div className="bg-base-200 mt-8 w-full max-w-2xl rounded-2xl p-8 shadow-lg transition-all duration-300">
            <AtomTitle>Tu Perfil</AtomTitle>

            <form onSubmit={handleSubmit}>
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

               <div className="relative">
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
               </div>

               {/* Action Buttons */}
               <div
                  className={`flex justify-around gap-3 transition-all duration-500 ${
                     hasChanges ? 'opacity-100' : 'pointer-events-none opacity-0'
                  }`}
               >
                  <AtomButton
                     disabled={isPending}
                     onClick={() => setUserInfo(userCopy)}
                     type="reset"
                     variant="OUTLINE"
                  >
                     {isPending ? <span className="loading loading-spinner loading-sm" /> : 'Cancelar'}
                  </AtomButton>
                  <AtomButton disabled={isPending} type="submit" variant="PRIMARY">
                     {isPending ? (
                        <span className="loading loading-spinner loading-sm" />
                     ) : (
                        t('profile.saveButton')
                     )}
                  </AtomButton>
               </div>
            </form>
         </div>
         <div className="mt-8 ">
            <Link className="link link-primary flex gap-2" href="/" onClick={handleLogout}>
               <LogOut /> Cerrar sesión
            </Link>
         </div>
      </section>
   )
}

export default Page
