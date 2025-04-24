/* eslint-disable no-useless-catch */

import { RecordListQueryParams } from 'pocketbase'

import { queryOperators } from '@/modules/global.types'
import { pb } from '@/network/setup'

export const pbGetList = async (collection: string, queryParamas?: RecordListQueryParams) => {
   const records = await pb.collection(collection).getFullList(200, queryParamas)
   return records
}

export const pbGetSingleRecord = async (collection: string, recordId: string, expand: any = null) => {
   const records = await pb.collection(collection).getOne(recordId, {
      expand
   })
   return records
}

export const pbGetSingleRecordQuery = async ({
   collection,
   field = 'id',
   operator = queryOperators.EQUAL_TO,
   param,
   ...rest
}: {
   collection: string
   field?: string
   operator?: string
   param: any
   [key: string]: any
}) => {
   const records = await pb.collection(collection).getFirstListItem(`${field} ${operator} "${param}"`, { ...rest })
   return records
}

export const pbCreateRecord = async (collection: string, data: any) => {
   return await pb.collection(collection).create(data, { $autoCancel: false })
}

export const pbDeleteRecord = async (collection: string, id: string) => {
   await pb.collection(collection).delete(id)
}

export const pbUpdateRecord = async (collection: string, recordID: string, data: any) => {
   const recordResult = await pb.collection(collection).update(recordID, data)
   return recordResult
}

export const fetchData = async ({
   method,
   url,
   body = null,
   headers = {}
}: {
   method: string
   url: string
   body?: any
   headers?: Record<string, string>
}) => {
   try {
      const options: any = {
         method,
         headers: {
            'Content-Type': 'application/json',
            ...headers
         }
      }

      if (body) options.body = JSON.stringify(body)

      const response = await fetch(url, options)
      const data = await response.json() // Parse the response body as JSON
      let parsedData = data

      // Check if the data is still a string and parse it again
      if (typeof data === 'string') {
         try {
            parsedData = JSON.parse(data)
         } catch (error) {
            console.error('Failed to parse JSON string:', data)
            throw new Error('Invalid JSON response format')
         }
      }

      if (!response.ok) return new Error(parsedData.message || 'Something went wrong')

      return parsedData
   } catch (error) {
      throw error
   }
}

export const pbSignUp = async (provider: string, code: string, codeVerifier: any, redirectUrl: string) => {
   const resultLoginData = await pb.collection('users').authWithOAuth2(provider, code, codeVerifier, redirectUrl)
   return resultLoginData
}

export const pbListAuthMethods = async () => {
   const methods = await pb.collection('users').listAuthMethods()
   return methods
}

export const pbLogOut = () => {
   pb.authStore.clear()
}

// const obj = {
//    allPossibleWordForms: [
//       'umgehen',
//       'umgeht',
//       'umging',
//       'umgangen',
//       'umgehst',
//       'umgehe',
//       'umgehet',
//       'umgingst',
//       'umginge',
//       'umgingen',
//       'umginget',
//       'umgingest',
//       'umgehemd',
//       'umgehend',
//       'umgehendem',
//       'umgehenden',
//       'umgehender',
//       'umgehendes',
//       'umgehende',
//       'umgehendste',
//       'umgehendstem',
//       'umgehendsten',
//       'umgehendster',
//       'umgehendstes',
//       'geht um',
//       'ging um',
//       'ist umgegangen'
//    ],
//    antonyms: ['begegnen', 'achten', 'pflegen'],
//    article: null,
//    auxiliaryVerb: 'sein',
//    baseForm: 'umgehen',
//    cases: null,
//    cefrLevel: ['B1'],
//    conjugation: {
//       futureI: {
//          du: 'wirst umgehen',
//          'er/sie/es': 'wird umgehen',
//          ich: 'werde umgehen',
//          ihr: 'werdet umgehen',
//          'sie/Sie': 'werden umgehen',
//          wir: 'werden umgehen'
//       },
//       futureII: {
//          du: 'wirst umgegangen sein',
//          'er/sie/es': 'wird umgegangen sein',
//          ich: 'werde umgegangen sein',
//          ihr: 'werdet umgegangen sein',
//          'sie/Sie': 'werden umgegangen sein',
//          wir: 'werden umgegangen sein'
//       },
//       pastPerfect: {
//          du: 'warst umgegangen',
//          'er/sie/es': 'war umgegangen',
//          ich: 'war umgegangen',
//          ihr: 'wart umgegangen',
//          'sie/Sie': 'waren umgegangen',
//          wir: 'waren umgegangen'
//       },
//       perfectTense: {
//          du: 'bist umgegangen',
//          'er/sie/es': 'ist umgegangen',
//          ich: 'bin umgegangen',
//          ihr: 'seid umgegangen',
//          'sie/Sie': 'sind umgegangen',
//          wir: 'sind umgegangen'
//       },
//       presentTense: {
//          du: 'gehst um',
//          'er/sie/es': 'geht um',
//          ich: 'gehe um',
//          ihr: 'geht um',
//          'sie/Sie': 'gehen um',
//          wir: 'gehen um'
//       },
//       simplePast: {
//          du: 'gingst um',
//          'er/sie/es': 'ging um',
//          ich: 'ging um',
//          ihr: 'gingt um',
//          'sie/Sie': 'gingen um',
//          wir: 'gingen um'
//       }
//    },
//    examples: [
//       {
//          english_translation: 'He knows how to handle difficult people.',
//          sentence: 'Er weiß, wie man mit schwierigen Leuten umgeht.',
//          spanish_translation: 'Él sabe cómo tratar con gente difícil.'
//       },
//       {
//          english_translation: 'The company knows how to handle complaints.',
//          sentence: 'Die Firma weiß, wie man mit Beschwerden umgeht.',
//          spanish_translation: 'La empresa sabe cómo manejar las quejas.'
//       },
//       {
//          english_translation: 'She deals well with stress.',
//          sentence: 'Sie geht gut mit Stress um.',
//          spanish_translation: 'Ella lidia bien con el estrés.'
//       }
//    ],
//    frequencyRank: 6,
//    participleI: 'umgehend',
//    participleII: 'umgegangen',
//    plural: null,
//    pronunciation: {
//       ipa: 'ˈʊmˌɡeːən'
//    },
//    synonyms: ['handhaben', 'verfahren', 'sich verhalten', 'begegnen'],
//    translations: {
//       english: ['to handle', 'to deal with', 'to treat', 'to circulate', 'to associate'],
//       spanish: ['tratar', 'manejar', 'lidiar con', 'asociarse', 'circular']
//    },
//    typeOfWord: 'verb',
//    word: 'umgehen'
// }
