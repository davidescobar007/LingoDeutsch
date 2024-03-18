"use client"
import { ReactNode } from "react"

import Drawer from "@/components/_common/drawer"
import OrganismMenu from "@/components/molecules/asideLeft"

const Layout = ({ children }: { readonly children: ReactNode }) => {
   return <Drawer sideBar={<OrganismMenu />}>{children}</Drawer>
}

export default Layout
