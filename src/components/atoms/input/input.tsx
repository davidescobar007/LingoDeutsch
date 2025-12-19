import { FunctionComponent } from 'react'

type TAtomInput = {
   type?: string
   inputId?: string
   withLabel?: boolean
   labelText?: string
   extraClassName?: string
   dangerouslyResetClassName?: Boolean
   error?: boolean
   [key: string]: any
}
export const AtomInput: FunctionComponent<TAtomInput> = ({
   type = 'text',
   extraClassName = '',
   inputId = '',
   withLabel = false,
   labelText = '',
   error = false,
   ...rest
}) => {
   const errorClass = error ? 'input-error' : ''
   const focusClass = 'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'

   return (
      <>
         {withLabel && (
            <label className="label" htmlFor={inputId}>
               <span className="label-text font-semibold">{labelText}</span>
            </label>
         )}
         <input
            className={`input input-bordered mb-3 w-full ${focusClass} ${errorClass} ${extraClassName}`}
            id={inputId}
            name={inputId}
            type={type}
            {...rest}
         />
      </>
   )
}
