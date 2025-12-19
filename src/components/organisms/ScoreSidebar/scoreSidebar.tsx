import { MoleculeScore } from '@/components/molecules'
import { TScore, TUser } from '@/modules/actions/types'

type OrganismScoreSidebarProps = {
   scoreList?: TScore
   user?: TUser
   extraClassName?: string
}

export const OrganismScoreSidebar = ({
   scoreList = undefined,
   user = undefined,
   extraClassName = ''
}: OrganismScoreSidebarProps) => {
   if (!scoreList) return null

   return (
      <div className={`rounded-lg border border-base-300 bg-base-100 p-6 shadow-md h-screen overflow-y-auto ${extraClassName}`}>
         <MoleculeScore scoreList={scoreList} user={user} />
      </div>
   )
}
