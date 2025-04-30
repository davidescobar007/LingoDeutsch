/* eslint-disable no-restricted-globals */

import {
   pbCreateRecord,
   pbGetList,
   pbGetSingleRecord,
   pbGetSingleRecordWithComplexfilter,
   pbUpdateRecord
} from '@/network'

import { constants } from '../global.types'

import { delay } from './actions.utils'
import { TArticle, TArticleUser } from './types'
import { isUserLoged } from './users.actions'

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

const saveArticleUser = async ({ userArticle, score }: { userArticle: TArticleUser; score: number }) => {
   if (isUserLoged && !userArticle.id) {
      pbCreateRecord(constants.USER_ARTICLE_PROGRESS, {
         article_id: userArticle.article_id,
         user_id: userArticle.user_id,
         is_completed: Boolean(score >= 70),
         highest_score_ever: score,
         number_of_attempts: 1
      })
   } else {
      pbUpdateRecord(constants.USER_ARTICLE_PROGRESS, userArticle.id, {
         is_completed: Boolean(score >= 70),
         highest_score_ever: score > userArticle.highest_score_ever ? score : userArticle.highest_score_ever,
         number_of_attempts: userArticle.number_of_attempts + 1
      })
   }
}

const getArticleByUser = async ({
   userId,
   articleId
}: {
   userId: string
   articleId: string
}): Promise<TArticleUser> => {
   try {
      const data = await pbGetSingleRecordWithComplexfilter({
         collection: constants.USER_ARTICLE_PROGRESS,
         filter: `user_id="${userId}" && article_id="${articleId}"`
      })
      return data as unknown as TArticleUser
   } catch (error: any) {
      if (error?.status === 404) {
         return {
            article_id: articleId,
            user_id: userId,
            is_completed: false,
            highest_score_ever: 0,
            number_of_attempts: 0
         } as TArticleUser
      }
      throw error
   }
}
export { getArticleByUser as getArticlesByUser, getArticlesList, getSingleArticle, saveArticleUser }
