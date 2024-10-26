import { pbGetList, pbGetSingleRecordQuery } from '@/network'

import { constants, queryOperators } from '../global.types'

import { Tgrammar } from './types'

export const getGrammarByLevel = async (grammarLevel: string): Promise<Tgrammar[]> => {
   try {
      const fields = 'id,level,topic,difficulty'
      const filter = `level ${queryOperators.EQUAL_TO} "${grammarLevel}"`
      const grammarTopics = await pbGetList(constants.GRAMMAR, {
         fields,
         filter,
         sort: 'difficulty'
      })
      console.log(grammarTopics)
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
      console.log(grammarTopics)
      return grammarTopics as unknown as Tgrammar
   } catch (error: any) {
      return error
   }
}
