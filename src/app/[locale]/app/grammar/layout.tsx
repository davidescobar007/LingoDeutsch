import { ReactNode } from 'react'

import LayoutContainer from '@/components/_common/layoutContainer'

const Layout = ({ children }: { children: ReactNode }) => {
   return <LayoutContainer isCenter>{children}</LayoutContainer>
}

export default Layout
