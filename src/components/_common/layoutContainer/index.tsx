import React, { ReactNode } from 'react'

const LayoutContainer = ({ children, isCenter = false }: { children: ReactNode; isCenter?: boolean }) => {
   return (
      <main
         className={`flex w-full flex-wrap bg-red-400 p-5 md:w-10/12 ${
            isCenter ? 'justify-center' : 'justify-between'
         }`}
      >
         {children}
      </main>
   )
}

export default LayoutContainer
