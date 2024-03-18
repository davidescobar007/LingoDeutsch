export const getRandomFromArray = (array: any[]) => {
   const random = Math.floor(Math.random() * array.length)
   return array[random]
}
export const removePunctuation = (inputString: string) => {
   return inputString.replace(/[.,#!$%^&*;:{}=\-_`~()?"'„“\\\r\n]/g, "")
}

export const extractAndSortSentences = (inputData: any) => {
   const transformedData = { data: [] }

   inputData.slice(0, 3).forEach((item: any) => {
      const sentences = item?.sentences
      if (sentences) {
         const firstFiveShortest = sentences
            .map((sentence: any) => {
               if (Array.isArray(sentence) && sentence.length >= 2) {
                  return {
                     german: sentence[0].replace(/<\/?b>/g, ""),
                     spanish: sentence[1].replace(/<\/?b>/g, "")
                  }
               }
               return null
            })
            .filter((sentence: any) => sentence !== null)
            .sort((a: any, b: any) => a.german.length - b.german.length)
            .slice(0, 5)

         transformedData.data = transformedData.data
            .concat(firstFiveShortest)
            .sort((a: any, b: any) => a.german.length - b.german.length)
      }
   })

   return transformedData
}

export function areObjectsDistinct(obj1: any, obj2: any) {
   const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])
   for (const key of keys) {
      if (obj1[key] !== obj2[key]) {
         // TODO: uncomment following line when checking for differences between two objects
         // TODO: when committing, this must be always commented
         // console.log(`Difference in ${key}: ${obj1[key]} !== ${obj2[key]}`)
         return true
      }
   }
   return false
}

export function flattenObjects(arrayOfObjects: any[]) {
   /**
    * Flattens an array of objects by converting nested properties into top-level properties.
    *
    * @param {Array} arrayOfObjects - An array of objects with nested properties.
    * @returns {Array} - An array of objects where nested properties are flattened into top-level properties.
    */
   return arrayOfObjects.map((object) => {
      const flattenedObject: any = {}

      function flatten(current: any, path = []) {
         if (Array.isArray(current)) {
            flattenedObject[path.join(".")] = current
         } else if (typeof current === "object" && current !== null) {
            for (const [key, value] of Object.entries(current)) {
               flatten(value, path.concat(key as any))
            }
         } else {
            const propertyName = path[path.length - 1]
            if (flattenedObject[propertyName] !== undefined) {
               let index = 2
               while (flattenedObject[`${propertyName}${index}`] !== undefined) {
                  index++
               }
               flattenedObject[`${propertyName}${index}`] = current
            } else {
               flattenedObject[propertyName] = current
            }
         }
      }

      flatten(object)
      return flattenedObject
   })
}

export function filterProperties(arr: any[], propertiesToKeep: any[]) {
   return arr.map((obj) => {
      const newObj: any = {}
      propertiesToKeep.forEach((property) => {
         if (obj[property] !== undefined) {
            newObj[property] = obj[property]
         }
      })
      return newObj
   })
}

export const getPercentage = (number1: number, number2: number) => {
   if (typeof number1 !== "number" || typeof number2 !== "number" || number2 === 0) {
      return 0
   }
   if (number1 === 0) {
      return 100
   }

   const partial = (number1 / number2) * 100
   const percentage = Math.round(100 - partial)

   return Math.max(0, percentage)
}

export const localStorageHandler = <T>(key: string) => {
   const getItem = () => {
      let data = localStorage.getItem(key)
      return data ? (JSON.parse(data) as T) : undefined
   }
   const saveItem = (data?: any) => {
      localStorage.setItem(key, JSON.stringify(data))
   }
   const clearItem = () => {
      localStorage.removeItem(key)
   }
   return { getItem, saveItem, clearItem }
}

export const openModal = (): void => {
   const newDocument: any = document.getElementById("my_modal_1")
   newDocument.showModal()
}
