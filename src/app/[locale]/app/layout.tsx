'use client'
import { ReactNode } from 'react'

import Drawer from '@/components/_common/drawer'
import Footer from '@/components/_common/footer'
import { OrganismMenu } from '@/components/molecules'

const Layout = ({ children }: { readonly children: ReactNode }) => {
   return (
      <Drawer sideBar={<OrganismMenu />}>
         {children}
         <Footer />
      </Drawer>
   )
}

export default Layout
