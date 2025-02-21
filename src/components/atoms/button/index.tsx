import { FunctionComponent, ReactNode } from 'react'

type TAtomButton = {
   children: ReactNode
   type?: 'button' | 'submit' | 'reset' | undefined
   typeOf?: 'PRIMARY' | 'INFO' | 'SECONDARY' | 'ACCENT' | 'WARNING'
   extraClassName?: string
   dangerouslyResetClassName?: Boolean
   isBlock?: Boolean
   onClick?: () => any
}

const buttonTypes = {
   PRIMARY: 'btn-primary text-white',
   SECONDARY: 'btn-secondary',
   INFO: 'btn-info',
   ACCENT: 'btn-accent',
   WARNING: 'btn-warning'
}
const emptyFunction = () => {}

export const AtomButton: FunctionComponent<TAtomButton> = ({
   children,
   type = 'button',
   typeOf = 'PRIMARY',
   extraClassName = '',
   dangerouslyResetClassName = false,
   isBlock = false,
   onClick = emptyFunction,
   ...rest
}) => {
   return (
      <button
         className={
            (dangerouslyResetClassName && extraClassName) ||
            `btn my-3 shadow-md target:bg-transparent ${isBlock ? ' btn-block' : ''} ${
               buttonTypes[typeOf]
            } ${extraClassName}`
         }
         onClick={onClick}
         type={type}
         {...rest}
      >
         {children}
      </button>
   )
}
