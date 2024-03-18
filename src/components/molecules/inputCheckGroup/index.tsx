import { FunctionComponent } from "react"

import AtomInput from "@/components/atoms/input"

type TMoleculeInputCheckGroup = {
   text: string
   name: string
   inputState: "success" | "error" | "selected"
   [index: string]: any
}

const inputStyles = {
   selected: "border-4 border-accent bg-secondary",
   success: "border-4 border-primary bg-secondary",
   error: "border-4 border-error bg-secondary"
}

const inputEmoji = {
   success: "✅",
   error: "🚫",
   selected: ""
}

const emojiStyles = {
   success: "animate__heartBeat",
   error: "animate__shakeX",
   selected: ""
}

const MoleculeInputCheckGroup: FunctionComponent<TMoleculeInputCheckGroup> = ({
   text = "",
   name = "",
   inputState,
   ...rest
}) => {
   return (
      <div className={`form-control my-4 rounded-xl p-2 ${inputStyles[inputState]}`}>
         <label className="label relative cursor-pointer justify-start">
            <AtomInput extraClassName="radio-accent radio mr-4" inputId={name} type="radio" {...rest} />
            {/* <input className="radio-accent radio mr-4" name={name} type="radio" {...rest} /> */}
            <span className="label-text text-lg font-normal">{text}</span>
            <span
               className={`animate__animated ${emojiStyles[inputState]} absolute right-0 top-0 -mr-5 -mt-6 text-2xl`}
            >
               {inputEmoji[inputState]}
            </span>
         </label>
      </div>
   )
}

export default MoleculeInputCheckGroup
