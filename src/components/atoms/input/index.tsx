import { FunctionComponent } from "react"

type TAtomInput = {
   type?: string
   inputId?: string
   withLabel?: boolean
   labelText?: string
   extraClassName?: string
   dangerouslyResetClassName?: Boolean
}
const AtomInput: FunctionComponent<TAtomInput> = ({
   type = "text",
   extraClassName = "",
   inputId = "",
   withLabel = false,
   labelText = "",
   ...rest
}) => {
   return (
      <div className="my-3">
         {withLabel && (
            <label className="label" htmlFor={inputId}>
               <span className="label-text font-semibold">{labelText}</span>
            </label>
         )}
         <input
            className={"input input-bordered w-full max-w-xs " + extraClassName}
            id={inputId}
            name={inputId}
            type={type}
            {...rest}
         />
      </div>
   )
}

export default AtomInput
