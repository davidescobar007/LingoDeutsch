import { headers, urls } from "@/modules/global.types"
import { extractAndSortSentences } from "@/utils"

import { fetchData } from "."

export const getWordsTranslationFetchImplementation = async (wordToTranslate: string) => {
   const urlCompletion = `${urls.linguatools}query=${wordToTranslate}&langpair=de-es`
   try {
      if (wordToTranslate !== "" && wordToTranslate !== " ") {
         const translationData: any = await fetchData("GET", urlCompletion, null, headers)
         let result = await translationData.text()
         result = result ? JSON.parse(result) : null

         if (!Array.isArray(result) || result.length === 0) {
            return null
         }

         const german_translation = result && result[0].l1_text
         const spanish_translation = result
            .map((item, index) => (index < 3 && item.l2_text ? item.l2_text : ""))
            .filter(Boolean)
            .join(", ")

         const data = {
            german_translation,
            spanish_translation,
            english_translation: null,
            user: null,
            type_of_word: result && result[0].wortart,
            examples: result && extractAndSortSentences(result)
         }
         return data
      }
   } catch (error) {
      console.warn(error)
      return error
   }
}
