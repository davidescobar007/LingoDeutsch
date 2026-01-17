'use client'
import { ReactNode, useEffect, useState } from 'react'

import { OrganismDrawer as Drawer } from '@/components/organisms'
import { OrganismFooter as Footer } from '@/components/organisms'
import { OrganismSidebar as OrganismMenu } from '@/components/organisms'
import { useLogin } from '@/hooks/user'
import { isUserLoged } from '@/modules/actions/users.actions'
import { usePathname, useRouter } from '@/navigation'

const PROTECTED_ROUTES = ['/app/vocabulary', '/app/profile', '/app/quiz']

const Layout = ({ children }: { readonly children: ReactNode }) => {
   const pathname = usePathname()
   const [hasOAuthParams, setHasOAuthParams] = useState(false)
   const router = useRouter()

   useEffect(() => {
      const params = new URL(window.location.href).searchParams
      const hasState = !!params.get('state')
      setHasOAuthParams(hasState)
   }, [])

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
      <Drawer sideBar={<OrganismMenu />}>
         {children}
         <Footer />
      </Drawer>
   )
}

export default Layout
