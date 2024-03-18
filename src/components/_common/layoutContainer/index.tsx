import React, { ReactNode } from "react"

const LayoutContainer = ({ children }: { children: ReactNode }) => {
   return (
      <main className="bg-red-4000 flex w-full flex-wrap justify-between md:w-10/12 2xl:w-7/12">{children}</main>
   )
}

export default LayoutContainer
