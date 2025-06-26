'use client'
import { ReactNode } from 'react'

import LayoutContainer from '@/components/_common/layoutContainer/layoutConntainer'

const Layout = ({ children }: { children: ReactNode }) => {
   return <LayoutContainer>{children}</LayoutContainer>
}

export default Layout
