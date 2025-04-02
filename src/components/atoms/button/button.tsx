import { FunctionComponent, ReactNode } from 'react'

import { Link } from '@/navigation'

type TAtomButton = {
   children: ReactNode
   type?: 'button' | 'submit' | 'reset' | 'link' | undefined
   href?: string
   variant?: 'PRIMARY' | 'INFO' | 'SECONDARY' | 'ACCENT' | 'WARNING' | 'OUTLINE'
   extraClassName?: string
   dangerouslyResetClassName?: Boolean
   isBlock?: Boolean
   onClick?: () => any
   disabled?: boolean
}

const buttonTypes = {
   PRIMARY: 'btn-primary',
   SECONDARY: 'btn-secondary text-neutral',
   INFO: 'btn-info',
   ACCENT: 'btn-accent',
   WARNING: 'btn-warning',
   OUTLINE: 'btn-outline btn-primary'
}
const emptyFunction = () => {}

export const AtomButton: FunctionComponent<TAtomButton> = ({
   children,
   type = 'button',
   href = '',
   variant: typeOf = 'PRIMARY',
   extraClassName = '',
   dangerouslyResetClassName = false,
   isBlock = false,
   onClick = emptyFunction,
   disabled = false,
   ...rest
}) => {
   return type === 'link' ? (
      <Link
         href={href}
         {...rest}
         className={
            (dangerouslyResetClassName && extraClassName) ||
            `btn my-3 shadow-md target:bg-transparent ${isBlock ? ' btn-block' : ''} ${
               buttonTypes[typeOf]
            } ${extraClassName}`
         }
      >
         {children}
      </Link>
   ) : (
      <button
         className={
            (dangerouslyResetClassName && extraClassName) ||
            `btn my-3 shadow-md target:bg-transparent ${isBlock ? ' btn-block' : ''} ${
               buttonTypes[typeOf]
            } ${extraClassName}`
         }
         disabled={disabled}
         onClick={onClick}
         type={type}
         {...rest}
      >
         {children}
      </button>
   )
}
