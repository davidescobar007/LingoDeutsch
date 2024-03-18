import { FunctionComponent, ReactNode } from "react"

type TAtomButton = {
   children: ReactNode
   type?: "button" | "submit" | "reset" | undefined
   typeOf?: "PRIMARY" | "INFO" | "SECONDARY" | "ACCENT" | "WARNING"
   extraClassName?: string
   dangerouslyResetClassName?: Boolean
   onClick?: () => any
}

const buttonTypes = {
   PRIMARY: "btn-primary ",
   SECONDARY: "btn-secondary",
   INFO: "btn-info",
   ACCENT: "btn-accent",
   WARNING: "btn-warning"
}
const emptyFunction = () => {}
const AtomButton: FunctionComponent<TAtomButton> = ({
   children,
   type = "button",
   typeOf = "PRIMARY",
   extraClassName = "",
   dangerouslyResetClassName = false,
   onClick = emptyFunction,
   ...rest
}) => {
   return (
      <button
         className={
            (dangerouslyResetClassName && extraClassName) ||
            `btn my-3 shadow-md target:bg-transparent ${buttonTypes[typeOf]} ${extraClassName}`
         }
         onClick={onClick}
         type={type}
         {...rest}
      >
         {children}
      </button>
   )
}

export default AtomButton
