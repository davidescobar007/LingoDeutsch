import React, { ReactNode } from "react"

const LayoutContainer = ({ children }: { children: ReactNode }) => {
   return (
      <main className="flex w-full flex-wrap justify-between bg-red-400 p-5 md:w-10/12 2xl:w-7/12">
         {children}
      </main>
   )
}

export default LayoutContainer
