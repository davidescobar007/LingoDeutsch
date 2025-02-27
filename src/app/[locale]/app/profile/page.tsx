'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { AtomButton, AtomInput, AtomTitle } from '@/components/atoms'
import { ProfileLoader } from '@/components/atoms'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'
import { useUpdateUser } from '@/hooks/user'
import { areObjectsDistinct } from '@/utils'

const Page = () => {
   const t = useTranslations()
   const user = getUserInfo() as TUser
   const userCopy: TUser = { ...user }
   const [userInfo, setUserInfo] = useState<TUser>(userCopy)
   const { mutate } = useUpdateUser()

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
   if (!user) {
      return (
         <section className="flex w-full justify-center p-5 lg:px-20">
            <ProfileLoader />
         </section>
      )
   }
   return (
      <section className="flex w-full flex-col lg:px-20">
         <div className="avatar flex justify-center">
            <div className="w-24 rounded-full">
               <Image alt="Profile picture" height={80} src={user?.avatarUrl || ''} width={80} />
            </div>
         </div>
         <AtomTitle extraClassName="my-4 flex justify-center" type="h4">
            {t('score.span')}: <span className=" font-bold">{user.score} ✨</span>
         </AtomTitle>

         <form className="form-control flex justify-center" onSubmit={handleSubmit}>
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

            {areObjectsDistinct(userInfo, userCopy) && (
               <AtomButton extraClassName="mt-5" type="submit">
                  {t('profile.saveButton')}
               </AtomButton>
            )}
         </form>
      </section>
   )
}

export default Page
