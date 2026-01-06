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
      <div
         className={`border-base-300 bg-base-100 h-screen overflow-y-auto rounded-2xl border p-6 shadow-md ${extraClassName}`}
      >
         <MoleculeScore scoreList={scoreList} user={user} />
      </div>
   )
}
