'use client'
import { ReactNode, useEffect } from 'react'

import { OrganismDrawer as Drawer } from '@/components/organisms'
import { OrganismFooter as Footer } from '@/components/organisms'
import { OrganismSidebar as OrganismMenu } from '@/components/organisms'
import { useLogin } from '@/hooks/user'
import { useRouter } from '@/navigation'

const Layout = ({ children }: { readonly children: ReactNode }) => {
   const { refetch } = useLogin()
   const router = useRouter()

   useEffect(() => {
      const params = new URL(window.location.href).searchParams
      if (params.get('state')) {
         refetch().finally(() => {
            router.push('/app/home')
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <Drawer sideBar={<OrganismMenu />}>
         {children}
         <Footer />
      </Drawer>
   )
}

export default Layout
