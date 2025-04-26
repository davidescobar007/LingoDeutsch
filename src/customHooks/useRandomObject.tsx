import { useCallback, useEffect, useMemo, useState } from 'react'

import { getRandomFromArray } from '@/utils' // Assuming getRandomFromArray handles empty arrays gracefully

// Use a generic type T for the items in the array
// Add an identifier property constraint (e.g., id or id2) for filtering
interface ItemWithId {
   id2: string | number // Use the identifier present in the Quiz component's Question type
   [key: string]: any // Allow other properties
}

const useRandomObjectFromArray = <T extends ItemWithId>(initialItems: T[]) => {
   // State for the list of items yet to be picked
   const [remainingItems, setRemainingItems] = useState<T[]>(initialItems)
   // State for the currently selected random item
   const [randomObject, setRandomObject] = useState<T | null>(null)

   // Memoize the initial length to avoid recalculating
   const initialLength = useMemo(() => initialItems.length, [initialItems])

   // Function to get the next random object, memoized with useCallback
   const getRandomObject = useCallback(() => {
      if (remainingItems.length === 0) {
         setRandomObject(null) // No more items left
         return
      }

      // Get a random item from the current remaining list
      const newRandomObject = getRandomFromArray(remainingItems)
      setRandomObject(newRandomObject)

      // Update the remaining items by filtering out the selected one
      // Use the identifier (id2) for reliable filtering
      setRemainingItems((prevItems) => prevItems.filter((item) => item.id2 !== newRandomObject.id2))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [remainingItems]) // Dependency: re-create if remainingItems changes

   // Effect to pick the first random object when the hook initializes or initialItems change
   useEffect(() => {
      // Initialize with the first random item if items are available
      if (initialItems.length > 0) {
         const firstRandomObject = getRandomFromArray(initialItems)
         setRandomObject(firstRandomObject)
         setRemainingItems(initialItems.filter((item) => item.id2 !== firstRandomObject.id2))
      } else {
         setRemainingItems([])
         setRandomObject(null)
      }
   }, [initialItems]) // Run only when initialItems array reference changes

   // Calculate the number of items already filtered out (i.e., shown)
   const filteredArrayLength = useMemo(
      () => initialLength - remainingItems.length,
      [initialLength, remainingItems.length]
   )

   // Determine if the filtering process is complete
   const filteringComplete = useMemo(
      () => remainingItems.length === 0 && initialLength > 0, // Ensure it was not empty initially
      [remainingItems.length, initialLength]
   )

   return {
      randomObject, // The current random item (or null if done/empty)
      getRandomObject, // Function to get the next item
      filteredArrayLength, // How many items have been processed
      filteringComplete, // Boolean indicating if all items are processed
      remainingItemsCount: remainingItems.length // Optional: number of items left
   }
}

export default useRandomObjectFromArray
