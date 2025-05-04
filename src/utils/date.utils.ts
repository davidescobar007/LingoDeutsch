import { differenceInDays, differenceInMonths, differenceInWeeks, differenceInYears } from 'date-fns'

export const calculateDateDistance = (date: Date): string => {
   if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error('Invalid date:', date)
      return 'Fecha inválida'
   }

   const now = new Date()
   const days = differenceInDays(now, date)
   const weeks = differenceInWeeks(now, date)
   const months = differenceInMonths(now, date)
   const years = differenceInYears(now, date)

   if (years > 0) {
      return 'Hace más de un año'
   } else if (months > 0) {
      return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`
   } else if (weeks > 0) {
      return `Hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`
   } else if (days > 0) {
      return `Hace ${days} ${days === 1 ? 'día' : 'días'}`
   } else {
      return 'Menos de un dia'
   }
}
