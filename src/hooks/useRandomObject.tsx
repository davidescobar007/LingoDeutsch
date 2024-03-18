/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"

import { getRandomFromArray } from "../utils"

export default function useRandomObjectFromArray(initialArray: any[]) {
   const [filteredArray, setFilteredArray] = useState(initialArray)
   const [randomObject, setRandomObject] = useState(null)
   const [filteredArrayLength, setFilteredArrayLength] = useState(0)
   const [filteringComplete, setFilteringComplete] = useState(false)

   useEffect(() => {
      getRandomObject()
   }, [initialArray])

   const filterArray = () => {
      const selectedObject = getRandomFromArray(filteredArray)
      const newFilteredArray: any = filteredArray.filter((item) => item !== selectedObject)
      setRandomObject(selectedObject)
      setFilteredArray(newFilteredArray)
      setFilteredArrayLength(newFilteredArray.length)
      setFilteringComplete(filteredArray.length === 0)
   }

   const getRandomObject = () => {
      filterArray()
   }

   return { randomObject, getRandomObject, filteringComplete, filteredArrayLength }
}
