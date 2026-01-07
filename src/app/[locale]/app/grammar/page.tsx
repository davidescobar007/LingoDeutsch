'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { TemplateGrammar } from '@/components/templates'
import {
   useGetGrammarByLevel,
   useGetSingleGrammarTopic,
   useSavedGrammarTopicByUser,
   useSaveGrammarProgress
} from '@/hooks/grammar'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'
import { useRouter } from '@/navigation'

type GrammarLevel = 'A1' | 'A2' | 'B1' | 'B2'

const LEVELS: GrammarLevel[] = ['A1', 'A2', 'B1', 'B2']

const Grammar = () => {
   const router = useRouter()
   const searchParams = useSearchParams()

   const [selectedLevel, setSelectedLevel] = useState<GrammarLevel>('A1')
   const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
   const [isInitialized, setIsInitialized] = useState(false)

   const user = getUserInfo() as TUser
   const { data: grammarList = [] } = useGetGrammarByLevel(selectedLevel)
   const { data: grammarTopicContent } = useGetSingleGrammarTopic(selectedTopic as string)
   const { data: userGrammarProgress = [] } = useSavedGrammarTopicByUser(user)
   const { mutate: saveGrammarProgress } = useSaveGrammarProgress()

   // Initialize state from URL parameters on mount
   useEffect(() => {
      const topicParam = searchParams.get('topic')
      const levelParam = searchParams.get('level') as GrammarLevel

      // Validate level parameter
      if (levelParam && LEVELS.includes(levelParam)) {
         setSelectedLevel(levelParam)
      }

      // Set topic if parameter exists (validation happens when grammarList loads)
      if (topicParam) {
         setSelectedTopic(topicParam)
      }

      setIsInitialized(true)
   }, [searchParams])

   // Update URL when state changes (after initialization)
   useEffect(() => {
      if (!isInitialized) return

      const params = new URLSearchParams()
      if (selectedTopic) params.set('topic', selectedTopic)
      if (selectedLevel) params.set('level', selectedLevel)

      const queryString = params.toString()
      const newUrl = queryString ? `?${queryString}` : ''

      // Use project's router (handles locale automatically)
      router.replace(newUrl, { scroll: false })
   }, [selectedTopic, selectedLevel, isInitialized, router])

   // Listen for browser navigation (back/forward buttons)
   useEffect(() => {
      const handlePopState = () => {
         const topicParam = searchParams.get('topic')
         const levelParam = searchParams.get('level') as GrammarLevel

         // Validate level
         if (levelParam && LEVELS.includes(levelParam)) {
            setSelectedLevel(levelParam)
         }

         // Validate topic
         if (topicParam) {
            setSelectedTopic(topicParam)
         } else {
            setSelectedTopic(null)
         }
      }

      window.addEventListener('popstate', handlePopState)
      return () => window.removeEventListener('popstate', handlePopState)
   }, [searchParams])

   // Validate topic exists in current level's grammar list
   useEffect(() => {
      if (selectedTopic && grammarList.length > 0) {
         const topicExists = grammarList.some((topic) => topic.id === selectedTopic)
         if (!topicExists) {
            setSelectedTopic(null)
         }
      }
   }, [grammarList, selectedTopic])

   const handleSaveGrammarProgress = (grammar_id: string, score: number) => {
      saveGrammarProgress({ grammar_id, score, user })
   }

   if (!isInitialized) {
      return null
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
