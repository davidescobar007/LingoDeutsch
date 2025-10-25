import { ReactNode } from 'react'

import { OrganismLayoutContainer as LayoutContainer } from '@/components/organisms'

const Layout = ({ children }: { children: ReactNode }) => {
   return <LayoutContainer isCenter>{children}</LayoutContainer>
}

export default Layout
