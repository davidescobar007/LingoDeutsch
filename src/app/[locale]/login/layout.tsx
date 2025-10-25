import { ReactNode } from 'react'

import { OrganismLayoutContainer as LayoutContainer } from '@/components/organisms'

const LoginLayout = ({ children }: { children: ReactNode }) => {
   return <LayoutContainer>{children}</LayoutContainer>
}

export default LoginLayout
