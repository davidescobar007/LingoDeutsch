'use client'
import { TemplateProfile } from '@/components/templates'
import { useUpdateUser } from '@/hooks/user'
import { TUser } from '@/modules/actions/types'
import { getUserInfo, logOut } from '@/modules/actions/users.actions'
import { useRouter } from '@/navigation'

const Page = () => {
   const user = getUserInfo() as TUser
   const { mutate, isPending } = useUpdateUser()
   const { push } = useRouter()

   const handleLogout = () => {
      logOut()
      push('/')
   }

   const handleUpdateUser = (userInfo: TUser) => {
      mutate(userInfo)
   }

   return (
      <TemplateProfile isPending={isPending} onLogout={handleLogout} onUpdateUser={handleUpdateUser} user={user} />
   )
}

export default Page
