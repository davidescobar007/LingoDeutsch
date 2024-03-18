import LayoutContainer from "@/components/_common/layoutContainer"
import { CardLoader } from "@/components/atoms/loader"

const Loader = () => (
   <LayoutContainer>
      {Array.from({ length: 3 }).map((_i, index) => (
         <CardLoader key={index} />
      ))}
   </LayoutContainer>
)
export default Loader
