import { pbGetList, pbUpdateRecord } from '@/network'

import { constants } from '../global.types'

import { shuffleArray } from './actions.utils'
import { handleErrorModal } from './global.actions'
import { TCard, TUser } from './types'

export const getCardsList = async ({
   user,
   filter
}: {
   user: TUser
   filter: string | undefined
}): Promise<TCard[]> => {
   try {
      if (!user?.id) throw new Error('need signup')
      const fields = 'expand.word_id.german_translation,expand.word_id.spanish_translation,id,level,last_time_seen'
      const cardsWithLevelFilter = shuffleArray(
         await pbGetList(constants.STUDY_VOCABULARY, {
            filter: `user_id = "${user.id}" && level="${filter}"`,
            expand: 'word_id',
            fields
         })
      )
      if (filter && cardsWithLevelFilter.length) return cardsWithLevelFilter as unknown as TCard[]

      const cardsNoLevelFilter = shuffleArray(
         await pbGetList(constants.STUDY_VOCABULARY, {
            filter: `user_id = "${user.id}"`,
            expand: 'word_id',
            fields
         })
      )
      if (filter && !cardsWithLevelFilter.length) return cardsNoLevelFilter as unknown as TCard[]
      if (!filter) return cardsNoLevelFilter as unknown as TCard[]
      return cardsNoLevelFilter as unknown as TCard[]
   } catch (error: string | any) {
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
      value: constants.CARDS_LEVEL[card.level]
   }
   card.level_history = card.level_history?.length
      ? ([...card.level_history, levelHistoryObj] as any)
      : [levelHistoryObj]
   await pbUpdateRecord(constants.STUDY_VOCABULARY, card.id, card)
}
