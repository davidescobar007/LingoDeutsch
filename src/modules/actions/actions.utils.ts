import { constants } from '../global.types'

import { TVocabularyCard } from './types'

export const flattenObj = (input: Record<string, any>): Record<string, any> => {
   let result: Record<string, any> = {}
   for (const key in input) {
      // eslint-disable-next-line no-prototype-builtins
      if (!input.hasOwnProperty(key)) {
         continue
      }
      if (typeof input[key] === 'object' && !Array.isArray(input[key])) {
         var subFlatObject = flattenObj(input[key])
         for (const subkey in subFlatObject) {
            result[subkey] = subFlatObject[subkey]
         }
      } else {
         result[key] = input[key]
      }
   }
   return result
}

export const delay = async (duration: number = constants.DELAY): Promise<void> => {
   await new Promise<void>((resolve) => {
      setTimeout(() => {
         resolve()
      }, duration)
   })
}

export function shuffleArray(array: any[]) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
   }
   return array
}

// Vocabulary helper functions

// Helper function to calculate review intervals
export const getReviewInterval = (level: string): number => {
   const reviewIntervals = {
      easy: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      medium: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
      hard: 1 * 24 * 60 * 60 * 1000 // 1 day in milliseconds
   }
   return reviewIntervals[level as keyof typeof reviewIntervals] || reviewIntervals.medium
}

// Helper function to check if a word is due for review
export const isWordDue = (card: TVocabularyCard): boolean => {
   if (!card.last_time_seen) return true // Never seen = due

   const now = new Date()
   const lastSeenDate = new Date(card.last_time_seen)
   const timeSinceLastSeen = now.getTime() - lastSeenDate.getTime()
   const reviewInterval = getReviewInterval(card.level)

   return timeSinceLastSeen >= reviewInterval
}

// Helper function to calculate learning streak
export const calculateStreak = (cards: TVocabularyCard[]) => {
   const days = []
   const today = new Date()
   const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'] // Dom, Lun, Mar, Mié, Jue, Vie, Sáb

   // Precompute all card last_time_seen as date strings for fast lookup
   const learnedDates = new Set(
      cards
         .filter((card) => card.last_time_seen)
         .map((card) => {
            const d = new Date(card.last_time_seen)
            // Only use date part, ignore time
            return (
               d.getFullYear() +
               '-' +
               (d.getMonth() + 1).toString().padStart(2, '0') +
               '-' +
               d.getDate().toString().padStart(2, '0')
            )
         })
   )

   for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)

      const dayIndex = date.getDay() // 0 = Sunday, 1 = Monday, etc.
      const dayName = dayNames[dayIndex]
      const dateNumber = date.getDate().toString()
      const dateKey =
         date.getFullYear() +
         '-' +
         (date.getMonth() + 1).toString().padStart(2, '0') +
         '-' +
         date.getDate().toString().padStart(2, '0')

      // Completed if any card was learned (last_time_seen) on this day
      const completed = learnedDates.has(dateKey)

      days.push({
         day: dayName,
         date: dateNumber,
         completed: completed,
         isToday: i === 0 // Last item (i=0) is today
      })
   }

   return days
}

// Helper function to count words learned today
export const getWordsLearnedToday = (cards: TVocabularyCard[]): number => {
   const today = new Date().toDateString()
   return cards.filter((card) => new Date(card.last_time_seen).toDateString() === today).length
}
