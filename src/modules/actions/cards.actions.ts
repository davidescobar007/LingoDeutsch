import { pbGetList, pbUpdateRecord } from '@/network'

import { constants } from '../global.types'

import { shuffleArray } from './actions.utils'
import { handleErrorModal } from './global.actions'
import { TCard, TUser, TVocabularyStats } from './types'

export const getCardsList = async ({
   user,
   filter
}: {
   user: TUser
   filter?: string | undefined
}): Promise<TCard[]> => {
   try {
      if (!user?.id) throw new Error('need signup')

      const fields =
         'expand.word_id.german_translation,expand.word_id.spanish_translation,id,level,last_time_seen,times_seen'
      const baseFilter = `user_id = "${user.id}"`
      const levelFilter = filter ? ` && level="${filter}"` : ''

      const cards = shuffleArray(
         await pbGetList(constants.USER_VOCAB_PROGRESS, {
            filter: baseFilter + levelFilter,
            expand: 'word_id',
            fields
         })
      )

      if (cards.length || !filter) return cards as unknown as TCard[]

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

export const getVocabularyStats = async (user: TUser): Promise<TVocabularyStats> => {
   try {
      if (!user?.id) throw new Error('need signup')

      const userVocabularyProgress = await getCardsList({ user })
      const totalWords = userVocabularyProgress.length
      const learnedWords = userVocabularyProgress.filter((card) => card.level === 'easy').length
      const toRecheck = userVocabularyProgress.filter((card) => card.level === 'hard').length
      const percentageDominated = totalWords ? (learnedWords / totalWords) * 100 : 0

      // Calculate learning pace
      const validDates = userVocabularyProgress
         .map((card) => new Date(card.last_time_seen))
         .filter((date) => !isNaN(date.getTime()))

      if (validDates.length === 0) throw new Error('No valid dates found')

      const firstSeenDate = new Date(Math.min(...validDates.map((date) => date.getTime())))
      const daysSinceFirstSeen = (new Date().getTime() - firstSeenDate.getTime()) / (1000 * 60 * 60 * 24)
      const learningPace = parseFloat((totalWords / daysSinceFirstSeen).toFixed(1))

      // Calculate words learned in the last 7 days
      const last7Days = userVocabularyProgress.reduce(
         (acc, card) => {
            const date = new Date(card.last_time_seen)
            if (isNaN(date.getTime())) return acc

            const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date) as keyof typeof acc
            if (!acc[day]) acc[day] = 0
            acc[day] += 1
            return acc
         },
         { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 }
      )

      // Calculate streak of consecutive days
      validDates.sort((a, b) => a.getTime() - b.getTime())
      let streak = 1
      let maxStreak = 1

      for (let i = 1; i < validDates.length; i++) {
         const diffInTime = validDates[i].getTime() - validDates[i - 1].getTime()
         const diffInDays = diffInTime / (1000 * 3600 * 24)

         if (diffInDays === 1) {
            streak++
            if (streak > maxStreak) {
               maxStreak = streak
            }
         } else {
            streak = 1
         }
      }

      // Calculate words learned today
      const today = new Date().toDateString()
      const wordsLearnedToday = userVocabularyProgress.filter(
         (card) => new Date(card.last_time_seen).toDateString() === today
      ).length

      const isStreak = maxStreak > 1

      return {
         totalWords,
         learnedWords,
         toRecheck,
         percentageDominated,
         learningPace,
         last7Days,
         streak,
         isStreak,
         wordsLearnedToday
      }
   } catch (error) {
      console.log(error)
      throw new Error(error as any)
   }
}
