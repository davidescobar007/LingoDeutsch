export type AuthMethods = {
   usernamePassword: boolean
   emailPassword: boolean
   authProviders: Array<{
      name: string
      state: string
      codeVerifier: string
      codeChallenge: string
      codeChallengeMethod: string
      authUrl: string
   }>
}

export type TUser = {
   avatar?: string
   avatarUrl?: string
   collectionId: string
   collectionName: string
   created: string
   email?: string
   emailVisibility?: boolean
   id: string
   score?: number
   name?: string
   updated: string
   username?: string
   verified?: boolean
   expand: {}
   userScore?: number
}

export type TScore = {
   username: string
   id: string
   created: string
   updated: string
   collectionId: string
   collectionName: string
   score: number
   position: number | string
}[]

export type TArticle = {
   created?: string
   id: string
   imageFile: string
   level: Array<string>
   text_content?: string
   title: string
   updated?: string
   estimated_read_time?: string
   is_completed?: boolean | null
   quiz?: {
      id: string
      type: string
      question: {
         de: string
         es: string
      }
      options: Record<string, string>
      correctAnswers: string[]
   }[]
   expand?: {}
}

export type TArticleUser = {
   id: string
   article_id: string
   user_id: string
   is_completed: boolean
   highest_score_ever: number
   number_of_attempts: string
   created?: string
   updated?: string
}

type TconjugationPronouns = {
   du: string
   'er/sie/es': string
   ich: string
   ihr: string
   'sie/Sie': string
   wir: string
}

export type Ttranslation = {
   conjugation?: {
      futureI?: TconjugationPronouns
      futureII?: TconjugationPronouns
      pastPerfect?: TconjugationPronouns
      perfectTense?: TconjugationPronouns
      presentTense?: TconjugationPronouns
      simplePast?: TconjugationPronouns
      participlesI?: string
      participlesII?: string
      allPossibleWordForms: string[]
      article?: 'der' | 'die' | 'das' | null
      auxiliaryVerb?: string
      pluralForm?: string
   }
   cases?: {
      singular: {
         nominative: string
         genitive: string
         dative: string
         accusative: string
      }
      plural?: {
         nominative: string
         genitive: string
         dative: string
         accusative: string
      }
   }
   english_translation?: string | null
   examples: {
      english_translation: string
      sentence: string
      spanish_translation: string
   }[]
   german_translation: string
   id?: string
   spanish_translation: string
   type_of_word?: string
   frequency_Rank: number | null
   antonyms?: string
   synonyms?: string
   ipa_pronunciation: string
   cefrLevel?: string
}

export type TLinguaTools = Array<{
   id: number
   l1_text: string
   l2_text: string
   freq: number
   synonyme1: string
   synonyme2: string
   bed1: string
   bed2: string
   wortart: string
   genus1: string
   genus2: string
   sentences: Array<Array<string>>
}>

export type TVocabularyCard = {
   expand: {
      word_id: {
         german_translation: string
         spanish_translation: string
         id: string
         created: string
         updated: string
         collectionId: string
         collectionName: string
         examples: Array<{
            english_translation: string
            sentence: string
            spanish_translation: string
         }>
         expand: {}
      }
   }
   id: string
   last_time_seen: string | Date
   level: string
   level_history: Array<{
      date: string
      level: string
      value: number
   }>
   times_seen: number
   created: string
   updated: string
   collectionId: string
   collectionName: string
}

export type TListItem = {
   type: 'list-item'
   text?: Array<{
      content: string
      isBold?: boolean
      isItalic?: boolean
      className?: string
      isUnderline?: boolean
   }>
   classNames?: string
}

export type TIterableData = {
   type: 'header' | 'paragraph' | 'list' | 'list-item' | 'table'
   text?: {
      content: string
      isBold?: boolean
      isItalic?: boolean
      className: string
      isUnderline?: boolean
   }[]
   headerLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
   classNames?: any
   isOrderedList?: boolean
   listItems?: TListItem[]
   tableData?: {
      columns: { header: string; accessorKey: string; cell?: any }[]
      data: any[]
   }
}

export type TLearningUnit = {
   id: string
   title: string
   difficulty: number
   level: string
   learning_goal: string
   created: string
   updated: string
   collectionId: string
   collectionName: string
}

export type TGrammar = {
   content: string
   difficulty: number
   grammar_core?: string
   vocabulary_core?: string
   context_core?: string
   id: string
   level: string
   topic_name?: {
      de: string
      es: string
   }
   created: string
   updated: string
   collectionId: string
   collectionName: string
   learning_unit_id?: string
   expand: {
      learning_unit_id?: TLearningUnit
   }
   quizz?: {
      id: string
      type: string
      question: {
         de: string
         es: string
      }
      options: Record<string, string>
      correctAnswers: string[]
   }[]
}

export type TVocabularyStatsUI = {
   totalWords: number
   learnedWords: number
   percentageDominated: number
   last7DayStreak: {
      day: string
      date: string
      completed: boolean
      isToday: boolean
   }[]
   wordsLearnedToday: number
   weakWords: number
   dueForReview: number
}

export type TUserGrammarProgress = {
   collectionId: string
   collectionName: string
   created: string
   dateCompleted: string
   grammar_id: string
   id: string
   isCompleted: boolean
   updated: string
   user_id: string
   expand: {}
}

export type TwordSpecification = {
   allPossibleWordForms: string[]
   antonyms: string[]
   article: 'der' | 'die' | 'das'
   auxiliaryVerb: string
   baseForm: string
   cases?: {
      singular: {
         nominative: string
         genitive: string
         dative: string
         accusative: string
      }
      plural: {
         nominative: string
         genitive: string
         dative: string
         accusative: string
      }
   }
   cefrLevel: string[]
   conjugation?: {
      futureI: {
         du: string
         'er/sie/es': string
         ich: string
         ihr: string
         'sie/Sie': string
         wir: string
      }
      futureII: {
         du: string
         'er/sie/es': string
         ich: string
         ihr: string
         'sie/Sie': string
         wir: string
      }
      pastPerfect: {
         du: string
         'er/sie/es': string
         ich: string
         ihr: string
         'sie/Sie': string
         wir: string
      }
      perfectTense: {
         du: string
         'er/sie/es': string
         ich: string
         ihr: string
         'sie/Sie': string
         wir: string
      }
      presentTense: {
         du: string
         'er/sie/es': string
         ich: string
         ihr: string
         'sie/Sie': string
         wir: string
      }
      simplePast: {
         du: string
         'er/sie/es': string
         ich: string
         ihr: string
         'sie/Sie': string
         wir: string
      }
   }
   examples: {
      english_translation: string
      sentence: string
      spanish_translation: string
   }[]
   frequencyRank: number
   participleI?: string
   participleII?: string
   plural?: string
   pronunciation: {
      ipa: string
   }
   synonyms: string[]
   translations: {
      english: string[]
      spanish: string[]
   }
   typeOfWord: string
   word: string
}

export type TQuizQuestion = {
   id: string
   updated: string
   created?: string
   collectionId?: string
   collectionName?: string
   expand?: Record<string, any>
   quiz?: {
      id: string
      type: string
      question: {
         de: string
         es: string
      }
      options: Record<string, string>
      correctAnswers: string[]
   }[]
   quizz?: {
      id: string
      type: string
      question: {
         de: string
         es: string
      }
      options: Record<string, string>
      correctAnswers: string[]
   }[]
}
