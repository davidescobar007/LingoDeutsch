'use client'
import { ReactNode, useEffect } from 'react'

import Drawer from '@/components/_common/drawer'
import Footer from '@/components/_common/footer'
import { OrganismMenu } from '@/components/molecules'
import { useLogin } from '@/hooks/user'
import { useRouter } from '@/navigation'

const Layout = ({ children }: { readonly children: ReactNode }) => {
   const { refetch } = useLogin()
   const params = new URL(window.location.href).searchParams
   const router = useRouter()

   useEffect(() => {
      if (params.get('state')) {
         refetch().finally(() => {
            router.push('/app/learn')
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
