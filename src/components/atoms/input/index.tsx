import { FunctionComponent } from 'react'

type TAtomInput = {
   type?: string
   inputId?: string
   withLabel?: boolean
   labelText?: string
   extraClassName?: string
   dangerouslyResetClassName?: Boolean
   [key: string]: any
}
export const AtomInput: FunctionComponent<TAtomInput> = ({
   type = 'text',
   extraClassName = '',
   inputId = '',
   withLabel = false,
   labelText = '',
   ...rest
}) => {
   return (
      <>
         {withLabel && (
            <label className="label" htmlFor={inputId}>
               <span className="label-text font-semibold">{labelText}</span>
            </label>
         )}
         <input
            className={`input input-bordered mb-3 ${extraClassName}`}
            id={inputId}
            name={inputId}
            type={type}
            {...rest}
         />
      </>
   )
}
