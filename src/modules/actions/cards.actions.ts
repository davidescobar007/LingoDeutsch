import { pbGetList, pbUpdateRecord } from '@/network'

import { constants } from '../global.types'

import { calculateStreak, delay, getWordsLearnedToday, isWordDue, shuffleArray } from './actions.utils'
import { handleErrorModal } from './global.actions'
import { TUser, TVocabularyCard, TVocabularyStatsUI } from './types'

export const getVocabularyList = async ({
   user,
   level
}: {
   user: TUser
   level?: string | undefined
}): Promise<TVocabularyCard[]> => {
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

      if (cards.length || !level) return cards as unknown as TVocabularyCard[]

      const fallbackCards = shuffleArray(
         await pbGetList(constants.USER_VOCAB_PROGRESS, {
            filter: baseFilter,
            expand: 'word_id',
            fields
         })
      )

      return fallbackCards as unknown as TVocabularyCard[]
   } catch (error: any) {
      console.error('Error fetching vocabulary list:', error)
      handleErrorModal(error)
      return []
   }
}

export const updateVocabulary = async (card: TVocabularyCard) => {
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

export const getVocabularyStats = async (user: TUser | null | undefined): Promise<TVocabularyStatsUI> => {
   try {
      if (!user?.id) {
         // Return default values for guests
         return {
            totalWords: 0,
            learnedWords: 0,
            percentageDominated: 0,
            last7DayStreak: [],
            wordsLearnedToday: 0,
            weakWords: 0,
            dueForReview: 0
         }
      }

      const cards: TVocabularyCard[] = await getVocabularyList({ user })

      // Calculate basic metrics
      const totalWords = cards.length
      const learnedWords = cards.filter((card) => card.level === 'easy').length
      const weakWords = cards.filter((card) => card.level !== 'easy').length
      const dueForReview = cards.filter(isWordDue).length

      // Calculate derived metrics
      const percentageDominated = totalWords ? Math.round((learnedWords / totalWords) * 100) : 0
      const last7DayStreak = calculateStreak(cards)
      const wordsLearnedToday = getWordsLearnedToday(cards)

      return {
         totalWords,
         learnedWords,
         percentageDominated,
         last7DayStreak,
         wordsLearnedToday,
         weakWords,
         dueForReview
      }
   } catch (error) {
      console.error('Error fetching vocabulary stats:', error)
      // Return default values on error
      return {
         totalWords: 0,
         learnedWords: 0,
         percentageDominated: 0,
         last7DayStreak: [],
         wordsLearnedToday: 0,
         weakWords: 0,
         dueForReview: 0
      }
   }
}
