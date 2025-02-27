'use client'
import { ReactNode } from 'react'

import LayoutContainer from '@/components/_common/layoutContainer/layoutConntainer'

const LearnLayout = ({ children }: { children: ReactNode | any }) => {
   return <LayoutContainer>{children}</LayoutContainer>
}

export default LearnLayout
