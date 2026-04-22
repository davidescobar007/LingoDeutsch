'use client'

import { Toaster } from 'sileo'

import useScreenSize from '@/hooks/useScreenSize'

export const ResponsiveToaster = () => {
   const { isMobile } = useScreenSize()

   return (
      <Toaster
         options={{
            duration: 5000,
            fill: '#1f2937',
            styles: {
               title: '!text-white',
               description: '!text-white/80',
               badge: '!bg-white/10'
            }
         }}
         position={isMobile ? 'top-center' : 'bottom-right'}
      />
   )
}
