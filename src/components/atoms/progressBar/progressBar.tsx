import { FunctionComponent } from 'react'
import ProgressBar from '@ramonak/react-progress-bar'

type TAtomProgressPercentage = {
   value: number
}
export const AtomProgressPercentage: FunctionComponent<TAtomProgressPercentage> = ({ value }) => {
   return (
      <section className="col-12 mb-5 text-center">
         <ProgressBar animateOnRender bgColor="#2563EB" completed={value} transitionDuration="0.4s" />
      </section>
   )
}
