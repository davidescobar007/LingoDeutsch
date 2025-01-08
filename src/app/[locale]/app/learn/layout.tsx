'use client'
import { ReactNode } from 'react'

import LayoutContainer from '@/components/_common/layoutContainer'

const LearnLayout = ({ children }: { children: ReactNode | any }) => {
   return <LayoutContainer>{children}</LayoutContainer>
}

export default LearnLayout
