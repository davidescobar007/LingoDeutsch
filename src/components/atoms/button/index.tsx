import { FunctionComponent, ReactNode } from "react"

type TAtomButton = {
   children: ReactNode
   type?: "button" | "submit" | "reset" | undefined
   typeOf?: "PRIMARY" | "INFO" | "SECONDARY" | "ACCENT" | "WARNING"
   extraClassName?: string
   dangerouslyResetClassName?: Boolean
}

const buttonTypes = {
   PRIMARY: "btn-primary text-white",
   SECONDARY: "btn-secondary text-neutral hover:text-white",
   INFO: "btn-info",
   ACCENT: "btn-accent",
   WARNING: "btn-warning"
}

const AtomButton: FunctionComponent<TAtomButton> = ({
   children,
   type = "button",
   typeOf = "PRIMARY",
   extraClassName = "",
   dangerouslyResetClassName = false,
   ...rest
}) => {
   return (
      <button
         className={
            (dangerouslyResetClassName && extraClassName) ||
            `btn my-3 shadow-md target:bg-transparent ${buttonTypes[typeOf]} ${extraClassName}`
         }
         type={type}
         {...rest}
      >
         {children}
      </button>
   )
}

export default AtomButton
