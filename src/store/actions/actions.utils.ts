import { constants } from "../global.types"

export const flattenObj = (input: Record<string, any>): Record<string, any> => {
   let result: Record<string, any> = {}
   for (const key in input) {
      // eslint-disable-next-line no-prototype-builtins
      if (!input.hasOwnProperty(key)) {
         continue
      }
      if (typeof input[key] === "object" && !Array.isArray(input[key])) {
         var subFlatObject = flattenObj(input[key])
         for (const subkey in subFlatObject) {
            result[subkey] = subFlatObject[subkey]
         }
      } else {
         result[key] = input[key]
      }
   }
   return result
}

export const delay = async (duration: number = constants.DELAY): Promise<void> => {
   await new Promise<void>((resolve) => {
      setTimeout(() => {
         resolve()
      }, duration)
   })
}
