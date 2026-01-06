import { AtomText, AtomTitle } from '@/components/atoms'
import { MoleculeTimeLine } from '@/components/molecules'
import { TGrammar, TUserGrammarProgress } from '@/modules/actions/types'

type GrammarLevel = 'A1' | 'A2' | 'B1' | 'B2'

type LevelInfo = {
   description: string
   emoji: string
   label: string
}

type OrganismGrammarSidebarProps = {
   grammarList: TGrammar[]
   levelInfo: LevelInfo
   onSelectTopic: (_topicId: string) => void
   selectedLevel: GrammarLevel
   selectedTopic: string | null
   userGrammarProgress: TUserGrammarProgress[]
}

export const OrganismGrammarSidebar = ({
   grammarList,
   levelInfo,
   onSelectTopic,
   selectedLevel,
   selectedTopic,
   userGrammarProgress
}: OrganismGrammarSidebarProps) => {
   return (
      <aside className="container-card self-start border p-6 lg:sticky lg:top-20 lg:col-span-4">
         <div className="mb-4 flex items-center gap-2">
            <span className="text-2xl">{levelInfo.emoji}</span>
            <div>
               <AtomTitle extraClassName="!text-base !mb-0" type="h3">
                  Temas - {selectedLevel}
               </AtomTitle>
               <AtomText className="text-xs" fontSize="small" isThin>
                  {levelInfo.label}
               </AtomText>
            </div>
         </div>
         <div className="mt-4">
            {grammarList.length > 0 ? (
               <MoleculeTimeLine
                  activeTopic={selectedTopic}
                  onSelectTopic={onSelectTopic}
                  topics={grammarList}
                  userGrammarProgress={userGrammarProgress}
               />
            ) : (
               <div className="py-8 text-center">
                  <div className="inline-block">
                     <div className="border-primary h-6 w-6 animate-spin rounded-full border-b-2" />
                  </div>
                  <AtomText className="mt-3" isThin>
                     Cargando temas...
                  </AtomText>
               </div>
            )}
         </div>
      </aside>
   )
}
