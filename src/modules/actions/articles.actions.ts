/* eslint-disable no-restricted-globals */
import { pbGetList, pbGetSingleRecord } from '@/network'

import { constants } from '../global.types'

import { delay } from './actions.utils'
import { TArticle } from './types'

const getArticlesList = async (): Promise<TArticle[]> => {
   try {
      const data = await pbGetList('articles')
      return data as unknown as TArticle[]
   } catch (error: any) {
      return error
   }
}

const getSingleArticle = async (articleId: string): Promise<TArticle> => {
   const article = await pbGetSingleRecord(constants.ARTICLES, articleId)
   await delay()
   return article as unknown as TArticle
}

export { getArticlesList, getSingleArticle }
