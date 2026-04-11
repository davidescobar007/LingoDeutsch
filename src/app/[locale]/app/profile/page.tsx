'use client'
import { TemplateProfile } from '@/components/templates'
import { useUpdateUser } from '@/hooks/user'
import { TUser } from '@/modules/actions/types'
import { useRouter } from '@/navigation'
import { useAuthState } from '@/providers/AuthProvider'

const Page = () => {
   const { user, logout } = useAuthState()
   const { mutate, isPending } = useUpdateUser()
   const { push } = useRouter()

   if (!user) return null

   const handleLogout = () => {
      logout()
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
