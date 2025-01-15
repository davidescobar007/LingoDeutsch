import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export const calculateDateDistance = (date: Date) => {
   const newDate = formatDistanceToNow(date, { locale: es })
   return newDate
}
