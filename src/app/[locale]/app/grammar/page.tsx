'use client'

import { useState } from 'react'

import { TemplateGrammar } from '@/components/templates'
import {
   useGetGrammarByLevel,
   useGetSingleGrammarTopic,
   useSavedGrammarTopicByUser,
   useSaveGrammarProgress
} from '@/hooks/grammar'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'

type GrammarLevel = 'A1' | 'A2' | 'B1' | 'B2'

const Grammar = () => {
   const [selectedLevel, setSelectedLevel] = useState<GrammarLevel>('A1')
   const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

   const user = getUserInfo() as TUser
   const { data: grammarList = [] } = useGetGrammarByLevel(selectedLevel)
   const { data: grammarTopicContent } = useGetSingleGrammarTopic(selectedTopic as string)
   const { data: userGrammarProgress = [] } = useSavedGrammarTopicByUser(user)
   const { mutate: saveGrammarProgress } = useSaveGrammarProgress()

   const handleSaveGrammarProgress = (grammar_id: string, score: number) => {
      saveGrammarProgress({ grammar_id, score, user })
   }

   return (
      <TemplateGrammar
         grammarList={grammarList}
         grammarTopicContent={grammarTopicContent}
         onLevelSelect={setSelectedLevel}
         onSaveGrammarProgress={handleSaveGrammarProgress}
         onSelectTopic={setSelectedTopic}
         selectedLevel={selectedLevel}
         selectedTopic={selectedTopic}
         userGrammarProgress={userGrammarProgress}
      />
   )
}

export default Grammar
