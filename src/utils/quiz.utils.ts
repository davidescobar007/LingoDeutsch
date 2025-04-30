export function calculateScore(
   correctAnswers: number,
   totalQuestions: number,
   mode: 'proportional' | 'all_or_nothing'
): number {
   if (totalQuestions === 0) {
      return 0
   }
   const percent = (correctAnswers / totalQuestions) * 100

   if (mode === 'proportional') {
      if (percent < 40) {
         return 0
      }
      return Math.round(percent)
   }

   if (mode === 'all_or_nothing') {
      if (percent < 70) {
         return 0
      }
      return 100
   }

   return 0
}

export function calculateFutureDate(pastDate: Date, hoursToAdd: number): { futureDate: Date; isFuture: boolean } {
   const millisecondsToAdd = hoursToAdd * 60 * 60 * 1000 // Convert hours (including fractions) to milliseconds
   const futureTime = pastDate.getTime() + millisecondsToAdd
   const futureDate = new Date(futureTime)
   const now = new Date()
   const isFuture = futureDate > now
   return { futureDate, isFuture }
}
