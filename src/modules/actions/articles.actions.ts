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
import { TArticle, TArticleUser, TQuizQuestion } from './types'

const getArticlesList = async ({ level, sortCriteria }: { level?: string; sortCriteria?: string }): Promise => {
   try {
      const options: any = {
         fields: 'id,title,level,created,updated,imageFile,estimated_read_time',
         sort: sortCriteria === 'recent' ? '-created' : sortCriteria === 'old' ? 'created' : '-updated'
      }
      if (level) options.filter = `level~"${level}"`

      const data = await pbGetList('articles', options)
      return data as unknown as TArticle[]
   } catch (error: any) {
      console.error('Error fetching articles:', error)
      return []
   }
}

const getSingleArticle = async ({ articleId }: { articleId: string }): Promise => {
   const article = await pbGetSingleRecord({
      collection: constants.ARTICLES,
      recordId: articleId
   })
   await delay()
   return article as unknown as TArticle
}

const getArticleQuiz = async ({ articleId }: { articleId: string }): Promise => {
   const article = await pbGetSingleRecord({
      collection: constants.ARTICLES,
      recordId: articleId,
      fields: 'id,updated,quizz'
   })
   await delay()
   return article as unknown as TQuizQuestion
}

const saveArticleUser = async ({ userArticle, score }: { userArticle: TArticleUser; score: number }) => {
   if (!userArticle.id) {
      await pbCreateRecord(constants.USER_ARTICLE_PROGRESS, {
         article_id: userArticle.article_id,
         user_id: userArticle.user_id,
         is_completed: Boolean(score >= 60),
         highest_score_ever:
            score > (userArticle.highest_score_ever || 0) ? score : userArticle.highest_score_ever || 0,
         number_of_attempts: (Number(userArticle.number_of_attempts) || 0) + 1
      })
   } else {
      await pbUpdateRecord(constants.USER_ARTICLE_PROGRESS, userArticle.id, {
         is_completed: Boolean(score >= 60),
         highest_score_ever:
            score > (userArticle.highest_score_ever || 0) ? score : userArticle.highest_score_ever || 0,
         number_of_attempts: (Number(userArticle.number_of_attempts) || 0) + 1
      })
   }
}

const getArticleByUser = async ({ userId, articleId }: { userId: string; articleId: string }): Promise => {
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
            number_of_attempts: '0'
         } as TArticleUser
      }
      throw error
   }
}

const getArticlesListByUser = async ({
   userId,
   isCompleted,
   sortCriteria,
   level
}: {
   userId: string
   isCompleted?: boolean
   sortCriteria?: string
   level?: string
}): Promise => {
   try {
      const isCompletedFilter = isCompleted ? ` && is_completed=${isCompleted}` : ''
      const levelFilter = level ? ` && article_id.level~"${level}"` : ''
      const data = await pbGetList(constants.USER_ARTICLE_PROGRESS, {
         filter: `user_id="${userId}"${isCompletedFilter} ${levelFilter}`,
         expand: 'article_id',
         fields:
            'id,article_id,is_completed,expand.article_id.created,expand.article_id.title,expand.article_id.imageFile,expand.article_id.estimated_read_time',
         sort: sortCriteria === 'recent' ? '-created' : sortCriteria === 'old' ? 'created' : '-updated'
      })
      const transformedData = data.map((item) => ({
         ...item.expand.article_id,
         is_completed: item.is_completed,
         id: item.article_id
      }))
      return transformedData as unknown as TArticle[]
   } catch (error: any) {
      console.error('Error fetching articles by user:', error)
      return []
   }
}

export {
   getArticleQuiz,
   getArticleByUser as getArticlesByUser,
   getArticlesList,
   getArticlesListByUser,
   getSingleArticle,
   saveArticleUser
}
