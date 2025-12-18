import { CardLoader } from '@/components/atoms'
import { OrganismLayoutContainer as LayoutContainer } from '@/components/organisms'

const Loader = () => (
   <LayoutContainer>
      {Array.from({ length: 3 }).map((_i, index) => (
         <CardLoader key={index} />
      ))}
   </LayoutContainer>
)
export default Loader
