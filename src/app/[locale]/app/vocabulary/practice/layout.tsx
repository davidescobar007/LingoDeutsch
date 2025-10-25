'use client'
import { ReactNode } from 'react'

import { OrganismLayoutContainer as LayoutContainer } from '@/components/organisms'

const Layout = ({ children }: { children: ReactNode }) => {
   return <LayoutContainer>{children}</LayoutContainer>
}

export default Layout
