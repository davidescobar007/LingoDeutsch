import React, { ReactNode } from 'react'

const LayoutContainer = ({ children, isCenter = false }: { children: ReactNode; isCenter?: boolean }) => {
   return (
      <main
         className={`bg-red-4000 flex w-full flex-wrap p-5 md:w-10/12 ${
            isCenter ? 'justify-center' : 'justify-between'
         }`}
      >
         {children}
      </main>
   )
}

export default LayoutContainer
