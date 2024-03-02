"use client"
import { useState } from "react"

function useLocalStorage(key: string) {
   const getInitialValue = () => {
      if (typeof window !== "undefined") {
         const storedValue = localStorage.getItem(key)
         return storedValue ? JSON.parse(storedValue) : null
      }
   }

   const [value, setValue] = useState(getInitialValue)

   const updateValue = <T,>(newValue: T) => {
      if (typeof window !== "undefined") {
         localStorage.setItem(key, JSON.stringify(newValue))
      }
      setValue(newValue)
   }

   const clearValue = () => {
      if (typeof window !== "undefined") {
         localStorage.removeItem(key)
      }
   }

   return [value, updateValue, clearValue]
}

export default useLocalStorage
