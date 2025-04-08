import { pbCreateRecord, pbGetList, pbGetSingleRecordQuery } from '@/network'

import { constants, queryOperators } from '../global.types'

import { Tgrammar, TUser, TUserGrammarProgress } from './types'

export const getGrammarByLevel = async (grammarLevel: string): Promise<Tgrammar[]> => {
   try {
      const fields = 'id,level,topic_name,difficulty'
      const filter = `level ${queryOperators.EQUAL_TO} "${grammarLevel}"`
      const grammarTopics = await pbGetList(constants.GRAMMAR, {
         fields,
         filter,
         sort: 'difficulty'
      })
      return grammarTopics as unknown as Tgrammar[]
   } catch (error: any) {
      return error
   }
}

export const getSingleGrammarById = async (id: string): Promise<Tgrammar> => {
   try {
      const grammarTopics = await pbGetSingleRecordQuery({
         collection: constants.GRAMMAR,
         param: id
      })
      return grammarTopics as unknown as Tgrammar
   } catch (error: any) {
      return error
   }
}

export const getSavedGrammarTopicByUser = async (user: TUser): Promise<TUserGrammarProgress[]> => {
   const savedGrammarTopics = await pbGetList(constants.USER_GRAMMAR_PROGRESS, {
      filter: `user_id ${queryOperators.EQUAL_TO} "${user.id}"`
   })
   return savedGrammarTopics as unknown as TUserGrammarProgress[]
}

export const saveGrammarUserProgress = async (user: TUser, grammar_id: string) => {
   const createdRecord = pbCreateRecord(constants.USER_GRAMMAR_PROGRESS, {
      user_id: user.id,
      grammar_id,
      isCompleted: true,
      dateCompleted: new Date().toISOString()
   })
   return createdRecord
}
