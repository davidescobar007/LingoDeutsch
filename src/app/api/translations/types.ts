export type ConjugationForm = {
   ich: string
   du: string
   'er/sie/es': string
   wir: string
   ihr: string
   'sie/Sie': string
}

export type GermanWordInfo = {
   word: string // The word in German

   type: 'verb' | 'noun' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | string

   baseForm?: string // The infinitive or root form, useful for verbs and derivatives

   translations?: {
      spanish?: string // Spanish translation
      english?: string // English translation
   }

   article?: 'der' | 'die' | 'das' // Article used with the noun, if applicable

   plural?: string // Plural form of the noun, if any

   cases?: {
      singular?: Record<'nominative' | 'genitive' | 'dative' | 'accusative', string>
      // Declensions in singular
      plural?: Record<'nominative' | 'genitive' | 'dative' | 'accusative', string>
      // Declensions in plural
   }

   conjugation?: {
      presentTense?: ConjugationForm // ich gehe, du gehst...
      simplePast?: ConjugationForm // ich ging, du gingst...
      perfectTense?: ConjugationForm // ich bin gegangen...
      pastPerfect?: ConjugationForm // ich war gegangen...
      futureI?: ConjugationForm // ich werde gehen...
      futureII?: ConjugationForm // ich werde gegangen sein...

      subjunctiveI?: {
         presentTense?: ConjugationForm
         perfectI?: ConjugationForm
         futureI?: ConjugationForm
         futureII?: ConjugationForm
      }

      subjunctiveII?: {
         simplePast?: ConjugationForm // ich ginge...
         pastPerfect?: ConjugationForm // ich wäre gegangen...
         futureI?: ConjugationForm // ich würde gehen...
         futureII?: ConjugationForm // ich würde gegangen sein...
      }

      imperative?: Record<string, string> // Imperative forms, e.g., "geh!", "geht!"
   }

   participleI?: string // Present participle (Partizip I), e.g., "gehend"
   participleII?: string // Past participle (Partizip II), e.g., "gegangen"

   auxiliaryVerb?: 'haben' | 'sein' | 'werden'
   // The auxiliary verb used with this verb in perfect tenses

   derivedForms?: {
      type: 'noun' | 'adjective' | 'verb' // Type of the derived form
      word: string // The derived word
      gender?: 'masculine' | 'feminine' | 'neuter' // Gender of the derived word (if noun)
      plural?: string // Plural of the derived word
      cases?: Record<'nominative' | 'genitive' | 'dative' | 'accusative', string> // Declensions
   }[]

   abstractNoun?: {
      singular?: Record<'nominative' | 'genitive' | 'dative' | 'accusative', string>
      // Singular case forms of abstract noun
      plural?: string // Plural form of abstract noun
      gender?: 'masculine' | 'feminine' | 'neuter' // Gender of the abstract noun
   }

   examples?: {
      sentence: string // Example sentence in German
      translation: string // Translation of the sentence
      source?: string // Optional source (e.g., "Goethe", "AI-generated")
   }[] & { length: 3 } // Array length max 3

   synonyms?: string[] // Words with similar meaning
   antonyms?: string[] // Words with opposite meaning
   relatedWords?: string[] // Related vocabulary items
   compounds?: string[] // Compound words that include this one

   pronunciation?: {
      ipa?: string // IPA (International Phonetic Alphabet) representation
   }

   frequencyRank?: number // Frequency of the word in modern usage (lower = more common)

   cefrLevel?: ['A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2']
   // Estimated CEFR levels at which this word appears
}
