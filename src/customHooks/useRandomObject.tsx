import { getRandomFromArray } from '@/utils'

const useRandomItem = <T,>(items: any[]) => {
   let remainingItems = items
   const randomObject = getRandomFromArray(remainingItems)
   const getNextItem = () => {
      remainingItems.filter((item) => item.id2 !== randomObject.id2)
   }
   return [randomObject, getNextItem]
}

export default useRandomItem
