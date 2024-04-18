import { ReactNode } from "react"

import LayoutContainer from "@/components/_common/layoutContainer"

const Layout = ({ children }: { children: ReactNode }) => {
   return <LayoutContainer>{children}</LayoutContainer>
}

export default Layout
