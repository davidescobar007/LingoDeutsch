import { ReactNode } from 'react'

import LayoutContainer from '@/components/_common/layoutContainer/layoutConntainer'

const LearnLayout = ({ children }: { children: ReactNode }) => {
   return <LayoutContainer>{children}</LayoutContainer>
}

export default LearnLayout
