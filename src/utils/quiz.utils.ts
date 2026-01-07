import { addHours, isAfter } from 'date-fns'

export function calculateScore(correctAnswers: number, totalQuestions: number): number {
   if (totalQuestions === 0) {
      return 0
   }
   return Math.round((correctAnswers / totalQuestions) * 100)
}

export function calculateFutureDate(pastDate: Date, hoursToAdd: number): { futureDate: Date; isFuture: boolean } {
   const futureDate = addHours(pastDate, hoursToAdd)
   const now = new Date()
   const isFuture = isAfter(futureDate, now)
   return { futureDate, isFuture }
}

export function shouldShowWaitingRoom(
   quizType: 'article' | 'grammar',
   userProgress: { updated?: string } | null,
   showResult: boolean
): { futureDate?: Date; shouldShowWaiting: boolean } {
   if (showResult) return { shouldShowWaiting: false }
   if (!userProgress?.updated) return { shouldShowWaiting: false }
   const { isFuture, futureDate } = calculateFutureDate(new Date(userProgress.updated), 1.25)
   return { futureDate, shouldShowWaiting: isFuture }
}
