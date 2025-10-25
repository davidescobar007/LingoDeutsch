'use client'
import { ReactNode } from 'react'

import { OrganismLayoutContainer as LayoutContainer } from '@/components/organisms'

const ArticleLayout = ({ children }: { children: ReactNode }) => {
   return <LayoutContainer>{children}</LayoutContainer>
}

export default ArticleLayout
