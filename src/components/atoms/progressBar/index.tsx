import { FunctionComponent } from "react"
import ProgressBar from "@ramonak/react-progress-bar"

type TAtomProgressPercentage = {
   value: number
}
const AtomProgressPercentage: FunctionComponent<TAtomProgressPercentage> = ({ value }) => {
   return (
      <section className="col-12 mb-5 text-center">
         <ProgressBar
            animateOnRender
            // baseBgColor="transparent"
            bgColor="#58cc02"
            completed={value}
            // labelColor="transparent"
            transitionDuration="0.4s"
         />
      </section>
   )
}
export default AtomProgressPercentage
