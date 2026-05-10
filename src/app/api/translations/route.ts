import { GoogleGenAI, Type } from '@google/genai'
import { NextResponse } from 'next/server'

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY })

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url)
   const wordToTranslate = searchParams.get('wordToTranslate')

   if (!wordToTranslate) {
      return new Response('Missing wordToTranslate parameter', { status: 400 })
   }
   try {
      const conjugationPronouns = {
         ich: {
            type: Type.STRING,
            nullable: false,
            description: 'the conjugated verb in german for "ich" pronoum'
         },
         du: { type: Type.STRING, nullable: false, description: 'the conjugated verb in german for "du" pronoum' },
         'er/sie/es': {
            type: Type.STRING,
            nullable: false,
            description: 'the conjugated verb in german for "er/sie/es" pronoums'
         },

         wir: {
            type: Type.STRING,
            nullable: false,
            description: 'the conjugated verb in german for "wir" pronoum'
         },
         ihr: {
            type: Type.STRING,
            nullable: false,
            description: 'the conjugated verb in german for "ihr" pronoum'
         },
         'sie/Sie': {
            type: Type.STRING,
            nullable: false,
            description: 'the conjugated verb in german for "sie/Sie" pronoums'
         }
      }

      const response = await ai.models.generateContent({
         model: 'gemini-2.5-flash',
         contents: `return all metadata following estructure provided for this word in german language: ${wordToTranslate}. Include all required nested properties`,
         config: {
            responseMimeType: 'application/json',
            responseSchema: {
               type: Type.OBJECT,
               properties: {
                  allPossibleWordForms: {
                     type: Type.ARRAY,
                     items: { type: Type.STRING },
                     description: `Generate an exhaustive list of all possible morphological word forms in German for a given lemma, including conjugations, declensions, and inflected variants, but excluding unrelated derived lexemes (e.g., nouns derived from verbs). The goal is to enable a search engine to recognize any grammatical form of a word.

                                    Specific Rules:
                                    Verbs:
                                    Include all conjugated forms (all persons, tenses, moods: present, past, subjunctive, imperative).
                                    For separable verbs, list both combined and separated forms (e.g., "umgehen" → "umgehe", "gehe um", "ging um", "umgegangen").
                                    Include participles (present: umgehend; past: umgegangen) and their adjectival inflections (umgehende, umgehenden).
                                    Exclude unrelated nominalizations (e.g., "Umgehung" is a separate noun).

                                    Nouns:
                                    Cover all declensions (all cases + plural):
                                    Singular: Hund, Hundes, Hund, Hund.
                                    Plural: Hunde, Hunde, Hunden, Hunde.

                                    Adjectives/Adverbs:
                                    Include all inflected forms (strong/weak/mixed declensions): schneller, schnellste, schnellen, etc.
                                    Add comparative/superlative where applicable (schnell → schneller, am schnellsten).
                                    For adverbs, include base form + comparatives (oft → öfter).
                                    Prepositions/Conjunctions:
                                    Most are invariant, but include inflected pronouns (e.g., "der" → dem, dessen).

                                    Edge Cases:
                                    No superlatives for non-gradable words (e.g., "umgehend" cannot be "umgehendste").
                                    No derived lexemes (e.g., "umgehbar" is a new adjective, not a verb form).
                                    *Example Output for "umgehen" (verb):
                                    [umgehe, umgehst, umgeht, gehen um, gehst um, geht um, ging um, gingst um, gingen um, gingt um, umgegangen, umgehend, umgehende, umgehenden, umgehender, umgehendes]
                                    Note: For nouns/adjectives, provide all case/gender/number variants. Verify irregular forms (e.g., "Stadt" → Städte).`,
                     nullable: false
                  },
                  word: { type: Type.STRING, description: 'The word in German' },
                  typeOfWord: {
                     type: Type.STRING,
                     enum: ['verb', 'noun', 'adjective', 'adverb', 'preposition', 'conjunction', 'pronoun'],
                     description: 'The grammatical type of the word'
                  },
                  baseForm: {
                     type: Type.STRING,
                     description: 'The infinitive or root form, useful for verbs and derivatives'
                  },
                  translations: {
                     type: Type.OBJECT,
                     properties: {
                        spanish: {
                           type: Type.ARRAY,
                           items: { type: Type.STRING },
                           nullable: false,
                           description:
                              'List of Spanish translations, preferably in infinitive form for verbs. Nouns/adjectives should be in their base form (singular masculine for adjectives).',
                           example: ['ir', 'caminar', 'convertirse en algo', 'vender', 'casa', 'feliz']
                        },
                        english: {
                           type: Type.ARRAY,
                           items: { type: Type.STRING },
                           nullable: false,
                           description:
                              'List of translations in English in base and or infinitive form if possible'
                        }
                     }
                  },
                  frequencyRank: {
                     type: Type.INTEGER,
                     nullable: false,
                     maximum: 10,
                     minimum: 1,
                     description:
                        'The frequency rank of the word in german language where 10 represents the most common word and 1 the least common'
                  },
                  article: {
                     type: Type.STRING,
                     enum: ['der', 'die', 'das'],
                     nullable: true,
                     description: 'The article of the word, if applicable'
                  },
                  plural: {
                     type: Type.STRING,
                     nullable: true,
                     description: 'The plural form of the word, if applicable'
                  },
                  cases: {
                     type: Type.OBJECT,
                     properties: {
                        singular: {
                           type: Type.OBJECT,
                           properties: {
                              nominative: {
                                 type: Type.STRING,
                                 nullable: true,
                                 description: 'The word in nominative case, if applicable'
                              },
                              genitive: {
                                 type: Type.STRING,
                                 nullable: true,
                                 description: 'The word in genitive case, if applicable'
                              },
                              dative: {
                                 type: Type.STRING,
                                 nullable: true,
                                 description: 'The word in dative case, if applicable'
                              },
                              accusative: {
                                 type: Type.STRING,
                                 nullable: true,
                                 description: 'The word in accusative case, if applicable'
                              }
                           },
                           nullable: true,
                           description: 'The singular cases of the word in German'
                        },
                        plural: {
                           type: Type.OBJECT,
                           properties: {
                              nominative: {
                                 type: Type.STRING,
                                 nullable: true,
                                 description: 'The word in nominative case, if applicable'
                              },
                              genitive: {
                                 type: Type.STRING,
                                 nullable: true,
                                 description: 'The word in genitive case, if applicable'
                              },
                              dative: {
                                 type: Type.STRING,
                                 nullable: true,
                                 description: 'The word in dative case, if applicable'
                              },
                              accusative: {
                                 type: Type.STRING,
                                 nullable: true,
                                 description: 'The word in accusative case, if applicable'
                              }
                           },
                           nullable: true,
                           description: 'The plural cases of the word in German'
                        }
                     },
                     nullable: true
                  },
                  conjugation: {
                     type: Type.OBJECT,
                     properties: {
                        presentTense: {
                           type: Type.OBJECT,
                           nullable: true,
                           description: 'The present tense conjugation, präsens',
                           properties: conjugationPronouns
                        },
                        simplePast: {
                           type: Type.OBJECT,
                           nullable: true,
                           description: 'The simple past tense conjugation, prateritum',
                           properties: conjugationPronouns
                        },
                        perfectTense: {
                           type: Type.OBJECT,
                           nullable: true,
                           description: 'The perfect tense conjugation, perfekt',
                           properties: conjugationPronouns
                        },
                        pastPerfect: {
                           type: Type.OBJECT,
                           nullable: true,
                           description: 'The past perfect tense conjugation, plusquamperfekt',
                           properties: conjugationPronouns
                        },
                        futureI: {
                           type: Type.OBJECT,
                           nullable: true,
                           description: 'The future I tense conjugation, futur I',
                           properties: conjugationPronouns
                        },
                        futureII: {
                           type: Type.OBJECT,
                           nullable: true,
                           description: 'The future II tense conjugation, futur II',
                           properties: conjugationPronouns
                        }
                     },
                     nullable: true,
                     description: 'when the typeOfWord is a verb, it returns the conjugation in different tenses'
                  },
                  participleI: {
                     type: Type.STRING,
                     nullable: true,
                     description: 'The present participle (Partizip I)'
                  },
                  participleII: {
                     type: Type.STRING,
                     nullable: true,
                     description: 'The past participle (Partizip II)'
                  },
                  auxiliaryVerb: {
                     type: Type.STRING,
                     enum: ['haben', 'sein', 'werden'],
                     nullable: true,
                     description: 'when typeOfWord is verb it returns the correct auxiliary verb'
                  },
                  examples: {
                     type: Type.ARRAY,
                     items: {
                        type: Type.OBJECT,
                        properties: {
                           sentence: { type: Type.STRING, description: 'The example sentence in German' },
                           spanish_translation: {
                              type: Type.STRING,
                              description: 'The translation of the sentence in Spanish'
                           },
                           english_translation: {
                              type: Type.STRING,
                              description: 'The translation of the sentence in English'
                           }
                        }
                     },
                     maxItems: '10',
                     minItems: '5',
                     nullable: false
                  },
                  synonyms: {
                     type: Type.ARRAY,
                     items: { type: Type.STRING },
                     nullable: false,
                     description: 'List of synonyms'
                  },
                  antonyms: {
                     type: Type.ARRAY,
                     items: { type: Type.STRING },
                     nullable: false,
                     description: 'List of antonyms'
                  },
                  pronunciation: {
                     type: Type.OBJECT,
                     properties: {
                        ipa: {
                           type: Type.STRING,
                           nullable: false,
                           description: 'The IPA (International Phonetic Alphabet) representation'
                        }
                     },
                     nullable: false
                  },
                  cefrLevel: {
                     type: Type.ARRAY,
                     items: { type: Type.STRING, enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
                     nullable: false,
                     description: 'The CEFR level of the word, it may contain multiple levels'
                  }
               },
               required: [
                  'allPossibleWordForms',
                  'word',
                  'typeOfWord',
                  'baseForm',
                  'translations',
                  'examples',
                  'synonyms',
                  'antonyms',
                  'pronunciation',
                  'frequencyRank'
               ],
               propertyOrdering: [
                  'allPossibleWordForms',
                  'antonyms',
                  'article',
                  'auxiliaryVerb',
                  'baseForm',
                  'cases',
                  'cefrLevel',
                  'conjugation',
                  'examples',
                  'frequencyRank',
                  'participleI',
                  'participleII',
                  'plural',
                  'pronunciation',
                  'synonyms',
                  'translations',
                  'typeOfWord',
                  'word'
               ]
            }
         }
      })
      return new NextResponse(JSON.stringify(response.text), {
         status: 200
      })
   } catch (error) {
      console.warn('***************ERROR: ', error)
      return new Response('Error fetching translation', { status: 500 })
   }
}
