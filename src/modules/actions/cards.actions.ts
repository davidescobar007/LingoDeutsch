import { pbGetList, pbUpdateRecord } from '@/network'

import { constants } from '../global.types'

import { delay, shuffleArray } from './actions.utils'
import { handleErrorModal } from './global.actions'
import { TCard, TUser, TVocabularyStatsUI } from './types'

export const getCardsList = async ({
   user,
   level
}: {
   user: TUser
   level?: string | undefined
}): Promise<TCard[]> => {
   try {
      if (!user?.id) throw new Error('need signup')

      const fields =
         'expand.word_id.german_translation,expand.word_id.spanish_translation,id,level,last_time_seen,times_seen,expand.word_id.examples'
      const baseFilter = `user_id = "${user.id}"`
      const levelFilter = level ? ` && level="${level}"` : ''

      const cards = shuffleArray(
         await pbGetList(constants.USER_VOCAB_PROGRESS, {
            filter: baseFilter + levelFilter,
            expand: 'word_id',
            fields
         })
      )

      if (cards.length || !level) return cards as unknown as TCard[]

      const fallbackCards = shuffleArray(
         await pbGetList(constants.USER_VOCAB_PROGRESS, {
            filter: baseFilter,
            expand: 'word_id',
            fields
         })
      )

      return fallbackCards as unknown as TCard[]
   } catch (error: any) {
      handleErrorModal(error)
      return error
   }
}

export const updateCard = async (card: TCard) => {
   delay()
   const currentDate = new Date()
   card.last_time_seen = currentDate
   card.times_seen = Number(card.times_seen + 1)
   const levelHistoryObj = {
      level: card.level,
      date: currentDate,
      value: constants.CARDS_LEVEL[card.level as keyof typeof constants.CARDS_LEVEL]
   }
   card.level_history = card.level_history?.length
      ? ([...card.level_history, levelHistoryObj] as any)
      : [levelHistoryObj]
   await pbUpdateRecord(constants.USER_VOCAB_PROGRESS, card.id, card)
}

export const getVocabularyStats = async (user: TUser): Promise<TVocabularyStatsUI> => {
   try {
      if (!user?.id) throw new Error('need signup')

      const userVocabularyProgress = await getCardsList({ user })
      const totalWords = userVocabularyProgress.length
      const learnedWords = userVocabularyProgress.filter((card) => card.level === 'easy').length
      const percentageDominated = totalWords ? Math.round((learnedWords / totalWords) * 100) : 0

      const today = new Date().toDateString()
      const wordsLearnedToday = userVocabularyProgress.filter(
         (card) => new Date(card.last_time_seen).toDateString() === today
      ).length

      const uniqueDates = [
         ...new Set(
            userVocabularyProgress
               .map((card) => new Date(card.last_time_seen).toDateString())
               .filter((dateStr) => dateStr !== 'Invalid Date')
         )
      ].sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) // Most recent first

      let streak = 0
      if (uniqueDates.length > 0) {
         let checkDate = new Date()

         for (const dateStr of uniqueDates) {
            const checkDateStr = checkDate.toDateString()

            if (dateStr === checkDateStr) {
               streak++
               checkDate.setDate(checkDate.getDate() - 1)
            } else {
               break
            }
         }
      }

      return {
         totalWords,
         learnedWords,
         percentageDominated,
         streak,
         wordsLearnedToday
      }
   } catch (error) {
      console.log(error)
      throw new Error(error as any)
   }
}
