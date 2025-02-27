import React, { FunctionComponent } from 'react'
type IconType = {
   icon: React.ReactNode
   iconSize?: 'small' | 'medium' | 'large'
}

export const Icon: FunctionComponent<IconType> = ({ icon, iconSize = 'medium' }) => {
   const classes = [
      iconSize === 'small' && 'text-lg',
      iconSize === 'medium' && 'text-xl',
      iconSize === 'large' && 'text-4xl'
   ]
      .filter(Boolean)
      .join(' ')
   return <div className={classes}>{icon}</div>
}
