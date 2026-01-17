/* eslint-disable no-useless-catch */

import { fetchData, pbCreateRecord, pbGetList, pbGetSingleRecordQuery } from '@/network'
import { pb } from '@/network/setup'
import { removePunctuation } from '@/utils'

import { constants } from '../global.types'

import { delay } from './actions.utils'
import { handleErrorModal } from './global.actions'
import { Ttranslation, TwordSpecification } from './types'
import { isUserLoged } from './users.actions'

export const getWordsTranslationFromDB = async (params: any) => {
   try {
      const translation = await pbGetSingleRecordQuery({ ...params, collection: constants.VOCABULARY })
      return translation
   } catch (error) {
      if (String(error) === "ClientResponseError 404: The requested resource wasn't found.") {
         return null
      } else {
         handleErrorModal(error as any)
         return error
      }
   }
}

export const searchTranslationFromSources = async (wordToTranslate: string): Promise<Ttranslation> => {
   try {
      await delay()
      const exactTranslationFromDB = await getWordsTranslationFromDB({
         field: 'german_translation',
         operator: '=',
         param: removePunctuation(wordToTranslate)
      })
      if (exactTranslationFromDB) return exactTranslationFromDB as Ttranslation

      const similarTranslationFromDB = await getWordsTranslationFromDB({
         field: 'conjugation.allPossibleWordForms',
         operator: '~',
         param: removePunctuation(wordToTranslate)
      })
      if (similarTranslationFromDB) return similarTranslationFromDB as Ttranslation
      const translationFromAPI: TwordSpecification = await fetchData({
         method: 'GET',
         url: `/api/translations?wordToTranslate=${wordToTranslate}`
      })

      if (!translationFromAPI) {
         throw new Error()
      }

      const newWordToBeSaved: Ttranslation = {
         german_translation: translationFromAPI.baseForm,
         spanish_translation: translationFromAPI.translations.spanish.join(', '),
         english_translation: translationFromAPI.translations.english.join(', '),
         conjugation: {
            ...translationFromAPI.conjugation,
            allPossibleWordForms: translationFromAPI.allPossibleWordForms,
            participlesI: translationFromAPI.participleI,
            participlesII: translationFromAPI.participleII,
            article: translationFromAPI.article,
            auxiliaryVerb: translationFromAPI.auxiliaryVerb,
            pluralForm: translationFromAPI.plural
         },
         examples: translationFromAPI.examples,
         type_of_word: translationFromAPI.typeOfWord,
         frequency_Rank: translationFromAPI.frequencyRank,
         synonyms: translationFromAPI.synonyms.join(', '),
         antonyms: translationFromAPI.antonyms.join(', '),
         ipa_pronunciation: translationFromAPI.pronunciation.ipa,
         cefrLevel: translationFromAPI.cefrLevel.join(', '),
         cases: translationFromAPI.cases
            ? {
                 singular: {
                    nominative: translationFromAPI.cases.singular?.nominative,
                    genitive: translationFromAPI.cases.singular?.genitive,
                    dative: translationFromAPI.cases.singular?.dative,
                    accusative: translationFromAPI.cases.singular?.accusative
                 },
                 plural: translationFromAPI.cases.plural
                    ? {
                         nominative: translationFromAPI.cases.plural?.nominative,
                         genitive: translationFromAPI.cases.plural?.genitive,
                         dative: translationFromAPI.cases.plural?.dative,
                         accusative: translationFromAPI.cases.plural?.accusative
                      }
                    : undefined
              }
            : undefined
      }
      const newTranslationSaved = pbCreateRecord(constants.VOCABULARY, newWordToBeSaved)
      return newTranslationSaved as unknown as Ttranslation
   } catch (error) {
      throw error
   }
}

export const checkVocaBularyExist = async (userId: string, wordId: string) => {
   const wordIsSaved = pbGetList(constants.USER_VOCAB_PROGRESS, {
      filter: `user_id = "${userId}" && word_id = "${wordId}"`
   })
   return wordIsSaved
}

export const saveVocabularyToStudy = async (selectedWordTranslation: any) => {
   try {
      if (isUserLoged() && selectedWordTranslation?.id) {
         await delay()
         const userId = pb.authStore.model?.id || ''
         const valueExists = await checkVocaBularyExist(userId, selectedWordTranslation.id)
         if (valueExists.length) {
            throw new Error('translation.alreadySaved')
         }
         const data = {
            user_id: userId,
            word_id: selectedWordTranslation.id,
            last_time_seen: null,
            level: 'hard'
         }
         pbCreateRecord(constants.USER_VOCAB_PROGRESS, data)
      } else {
         throw new Error('translation.error')
      }
   } catch (error) {
      throw error
   }
}
