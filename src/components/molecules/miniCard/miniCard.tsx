import React, { FunctionComponent } from 'react'

const hoverClasses = 'hover:border-primary transition-all duration-300 hover:shadow-md'
const noHoverClasses =
   'flex rounded-lg border border-transparent bg-white p-5 shadow-sm transition-all duration-300 '

type MoleculeMiniCardProps = {
   icon: React.ReactNode
   content: string
   footer: string
   className?: string
}

export const MoleculeMiniCard: FunctionComponent<MoleculeMiniCardProps> = ({
   icon,
   content,
   footer,
   className = ''
}) => {
   return (
      <div className={`${hoverClasses} ${noHoverClasses} flex-col items-center justify-center ${className}`}>
         <span className="text-primary text-4xl">{icon}</span>
         <p>{content}</p>

         <p className="text-primary text-2xl font-semibold">{footer}</p>
      </div>
   )
}
