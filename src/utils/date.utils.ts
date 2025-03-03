import { formatDistanceStrict, formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export const calculateDateDistance = (date: Date) => {
   if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error('Invalid date:', date)
      return 'Fecha inválida'
   }

   const newDateStrict = formatDistanceStrict(date, new Date(), {
      locale: es,
      unit: 'day'
   })

   let newDate = formatDistanceToNow(date, { locale: es })

   if (newDateStrict === '0 días') return 'Hace menos de un día'

   newDate = `Hace ${newDate}`

   return newDate
}
