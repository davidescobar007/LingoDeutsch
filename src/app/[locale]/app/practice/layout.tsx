"use client"
import { ReactNode } from "react"

import LayoutContainer from "@/components/_common/layoutContainer"

const PracticeLayout = ({ children }: { children: ReactNode }) => {
   return <LayoutContainer>{children}</LayoutContainer>
}

export default PracticeLayout
