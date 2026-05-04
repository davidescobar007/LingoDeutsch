import {
   fetchData,
   pbCreateRecord,
   pbGetList,
   pbGetSingleRecord,
   pbGetSingleRecordQuery,
   pbUpdateRecord
} from '@/network'

import { constants, queryOperators } from '../global.types'

import { TGrammar, TQuizQuestion, TUser, TUserGrammarProgress } from './types'

export const getGrammarByLevel = async (grammarLevel: string): Promise<TGrammar[]> => {
   try {
      const fields =
         'id,level,topic_name,difficulty,grammar_core,vocabulary_core,context_core,learning_unit_id,expand.learning_unit_id.id,expand.learning_unit_id.title,expand.learning_unit_id.difficulty,expand.learning_unit_id.learning_goal'
      const filter = `level ${queryOperators.EQUAL_TO} "${grammarLevel}"`
      const grammarTopics = await pbGetList(constants.GRAMMAR, {
         fields,
         filter,
         sort: 'difficulty',
         expand: 'learning_unit_id'
      })
      return grammarTopics as unknown as TGrammar[]
   } catch (error: any) {
      console.error('Error fetching grammar by level:', error)
      return []
   }
}

export const getSingleGrammarById = async ({ id }: { id: string }): Promise<TGrammar> => {
   try {
      const grammarTopics = await pbGetSingleRecordQuery({
         collection: constants.GRAMMAR,
         param: id
      })
      return grammarTopics as unknown as TGrammar
   } catch (error: any) {
      return error
   }
}

export const getGrammarQuiz = async ({ grammarId }: { grammarId: string }): Promise<TQuizQuestion> => {
   try {
      const grammar = await pbGetSingleRecordQuery({
         collection: constants.GRAMMAR,
         param: grammarId,
         fields: 'id,updated,quizz'
      })
      return grammar as unknown as any
   } catch (error: any) {
      return error
   }
}

export const getSavedGrammarTopicByUser = async (
   user: TUser | null | undefined
): Promise<TUserGrammarProgress[]> => {
   if (!user || !user.id) {
      return []
   }
   const savedGrammarTopics = await pbGetList(constants.USER_GRAMMAR_PROGRESS, {
      filter: `user_id ${queryOperators.EQUAL_TO} "${user.id}"`
   })
   return savedGrammarTopics as unknown as TUserGrammarProgress[]
}

export const getSingleGrammarTopicByUser = async ({
   user,
   grammar_id
}: {
   user: TUser | null | undefined
   grammar_id: string
}): Promise<TUserGrammarProgress> => {
   if (!user || !user.id) {
      throw new Error('User is required')
   }
   const savedGrammarTopic = await pbGetList(constants.USER_GRAMMAR_PROGRESS, {
      filter: `user_id ${queryOperators.EQUAL_TO} "${user.id}" && grammar_id ${queryOperators.EQUAL_TO} "${grammar_id}"`,
      sort: '-updated'
   })
   return savedGrammarTopic[0] as unknown as TUserGrammarProgress
}

export const saveGrammarUserProgress = async (user: TUser, grammar_id: string, score: number) => {
   const existingRecords = await pbGetList(constants.USER_GRAMMAR_PROGRESS, {
      filter: `user_id ${queryOperators.EQUAL_TO} "${user.id}" && grammar_id ${queryOperators.EQUAL_TO} "${grammar_id}"`,
      sort: '-updated'
   })
   const recordData = {
      user_id: user.id,
      grammar_id,
      isCompleted: score >= 60,
      dateCompleted: new Date().toISOString()
   }
   if (existingRecords && existingRecords.length > 0) {
      await pbUpdateRecord(constants.USER_GRAMMAR_PROGRESS, existingRecords[0].id, recordData)
   }
   await pbCreateRecord(constants.USER_GRAMMAR_PROGRESS, recordData)
}

export const fetchGrammarPodcast = async (grammarId: string, podcastContent: string) => {
   try {
      const pbUrl = process.env.NEXT_PUBLIC_API_ENVIRONMENT?.replace(/\/$/, '') || ''

      const grammar = await pbGetSingleRecord({
         collection: constants.GRAMMAR,
         recordId: grammarId,
         fields: 'podcast_audio'
      })

      if (grammar.podcast_audio) {
         return { audioUrl: `${pbUrl}/api/files/grammar/${grammarId}/${grammar.podcast_audio}` }
      }

      const data = await fetchData({
         method: 'POST',
         url: '/api/tts-podcast',
         body: { text: podcastContent }
      })

      if (data.error) throw new Error(data.error)

      try {
         const binaryString = atob(data.audio)
         const bytes = new Uint8Array(binaryString.length)
         for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i)
         }
         const audioFile = new File([bytes], `podcast_${grammarId}.wav`, { type: 'audio/wav' })

         // Use FormData for file uploads in PocketBase
         const formData = new FormData()
         formData.append('podcast_audio', audioFile)

         const updatedRecord = await pbUpdateRecord(constants.GRAMMAR, grammarId, formData)

         return { audioUrl: `${pbUrl}/api/files/grammar/${grammarId}/${updatedRecord.podcast_audio}` }
      } catch (cacheError) {
         console.error('[PODCAST] Failed to cache podcast audio in PocketBase:', cacheError)
         throw new Error('podcast.cacheError')
      }
   } catch (error) {
      console.error('generatePodcastAudio error:', error)
      throw error
   }
}
