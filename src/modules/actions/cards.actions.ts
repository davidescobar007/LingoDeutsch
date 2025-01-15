import { pbGetList, pbUpdateRecord } from '@/network'
import { calculateDateDistance } from '@/utils/date.utils'

import { constants } from '../global.types'

import { shuffleArray } from './actions.utils'
import { handleErrorModal } from './global.actions'
import { TCard, TUser, TVocabularyStats } from './types'

export const getCardsList = async ({
   user,
   filter
}: {
   user: TUser
   filter: string | undefined
}): Promise<TCard[]> => {
   try {
      if (!user?.id) throw new Error('need signup')

      const fields =
         'expand.word_id.german_translation,expand.word_id.spanish_translation,id,level,last_time_seen,times_seen'
      const baseFilter = `user_id = "${user.id}"`
      const levelFilter = filter ? ` && level="${filter}"` : ''

      const cards = shuffleArray(
         await pbGetList(constants.STUDY_VOCABULARY, {
            filter: baseFilter + levelFilter,
            expand: 'word_id',
            fields
         })
      )

      if (cards.length || !filter) return cards as unknown as TCard[]

      const fallbackCards = shuffleArray(
         await pbGetList(constants.STUDY_VOCABULARY, {
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
   await pbUpdateRecord(constants.STUDY_VOCABULARY, card.id, card)
}

export const getVocabularyStats = async (user: TUser): Promise<TVocabularyStats> => {
   if (!user?.id) throw new Error('need signup')
   const vocabularyStats = await pbGetList(constants.VOCABULARY_STATS, {
      fields: 'total_words,last_time_seen'
   })
   vocabularyStats.map((vocabularyStat) => {
      vocabularyStat.last_time_seen = calculateDateDistance(vocabularyStat.last_time_seen)
      return vocabularyStat
   })
   return vocabularyStats[0] as unknown as TVocabularyStats
}
