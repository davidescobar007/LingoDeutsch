'use client'
import { ReactNode, useEffect } from 'react'

import { OrganismDrawer as Drawer } from '@/components/organisms'
import { OrganismFooter as Footer } from '@/components/organisms'
import { OrganismSidebar as OrganismMenu } from '@/components/organisms'
import { useLogin, useOAuthParams } from '@/hooks/user'
import { isUserLoged } from '@/modules/actions/users.actions'
import { usePathname, useRouter } from '@/navigation'

const PROTECTED_ROUTES = ['/app/vocabulary', '/app/profile', '/app/quiz']

const Layout = ({ children }: { readonly children: ReactNode }) => {
   const pathname = usePathname()
   const hasOAuthParams = useOAuthParams()
   const router = useRouter()

   const { refetch } = useLogin(hasOAuthParams)

   useEffect(() => {
      if (hasOAuthParams) {
         refetch().finally(() => {
            router.push('/app/home')
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [hasOAuthParams])

   const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.includes(route))
   const isAuthenticated = isUserLoged()

   if (!hasOAuthParams && isProtectedRoute && !isAuthenticated) {
      router.push('/login')
      return null
   }

   return (
      <div className="flex justify-center">
         <Drawer sideBar={<OrganismMenu />}>
            {children}
            <Footer />
         </Drawer>
      </div>
   )
}

export default Layout
