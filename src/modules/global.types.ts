export const constants = {
   USERS: 'users',
   CATEGORIES: 'categories',
   CARDS: 'cards',
   SCORE: 'score',
   CATEGORY: 'category',
   SECTIONS: 'sections',
   PACKS: 'packs',
   FRONT_TERM: 'frontTerm',
   ANSWER: 'answer',
   VOCABULARY: 'vocabulary',
   ARTICLES: 'articles',
   QUIZZES: 'quizzes',
   USER_VOCAB_PROGRESS: 'userVocabularyProgress',
   VOCABULARY_STATS: 'vocabularyStats',
   USER_GRAMMAR_PROGRESS: 'userGrammarProgress',
   USER_ARTICLE_PROGRESS: 'userArticlesProgress',
   GRAMMAR: 'grammar',
   DELAY: 500,
   CARDS_LEVEL: {
      easy: 1,
      medium: 2,
      hard: 3
   }
}

export const queryOperators = {
   LESS_THAN: '<',
   LESS_THAN_OR_EQUAL_TO: '<=',
   EQUAL_TO: '=',
   LIKE: '~',
   GREATER_THAN: '>',
   GREATER_THAN_EQUAL_TO: '>=',
   NOT_EQUAL_TO: '!=',
   ARRAY_CONTAINS: 'array-contains',
   ARRAY_CONTAINS_ANY: 'array-contains-any',
   IN: 'in',
   NOT_IN: 'not-in'
}
export type GrammarLevel = 'A1.1' | 'A1.2' | 'A2.1' | 'A2.2' | 'B1.1' | 'B1.2' | 'B2.1' | 'B2.2'

export const GRAMMAR_LEVELS: GrammarLevel[] = ['A1.1', 'A1.2', 'A2.1', 'A2.2', 'B1.1', 'B1.2', 'B2.1', 'B2.2']

export type GrammarLevelInfo = {
   description: string
   emoji: string
   label: string
}

export const GRAMMAR_LEVEL_INFO: Record<GrammarLevel, GrammarLevelInfo> = {
   'A1.1': {
      description: 'Fundamentos básicos',
      emoji: '🌱',
      label: 'Principiante'
   },
   'A1.2': {
      description: 'Consolidar conocimientos iniciales',
      emoji: '🌿',
      label: 'Principiante +'
   },
   'A2.1': {
      description: 'Expresión elemental',
      emoji: '🌳',
      label: 'Elemental'
   },
   'A2.2': {
      description: 'Expresión elemental avanzada',
      emoji: '🏞️',
      label: 'Elemental +'
   },
   'B1.1': {
      description: 'Expresión intermedia',
      emoji: '⛰️',
      label: 'Intermedio'
   },
   'B1.2': {
      description: 'Expresión intermedia avanzada',
      emoji: '🏔️',
      label: 'Intermedio +'
   },
   'B2.1': {
      description: 'Expresión compleja',
      emoji: '🗻',
      label: 'Intermedio Avanzado'
   },
   'B2.2': {
      description: 'Dominio profundo',
      emoji: '🌍',
      label: 'Intermedio Avanzado +'
   }
}

export const tailwindColors = {
   blue: [
      'blue',
      'lightblue',
      'darkblue',
      'skyblue',
      'deepskyblue',
      'dodgerblue',
      'midnightblue',
      'steelblue',
      'royalblue',
      'powderblue',
      'cornflowerblue',
      'slateblue',
      'lightsteelblue',
      'aliceblue'
   ],
   red: ['red', 'lightcoral', 'salmon', 'darksalmon', 'lightred', 'crimson', 'firebrick', 'darkred', 'indianred'],
   green: [
      'green',
      'lightgreen',
      'darkgreen',
      'forestgreen',
      'limegreen',
      'palegreen',
      'springgreen',
      'seagreen',
      'mediumseagreen',
      'darkseagreen',
      'yellowgreen',
      'lawngreen',
      'chartreuse',
      'greenyellow',
      'olivedrab',
      'olive',
      'darkolivegreen',
      'teal'
   ],
   yellow: [
      'yellow',
      'lightyellow',
      'darkyellow',
      'gold',
      'khaki',
      'palegoldenrod',
      'moccasin',
      'peachpuff',
      'papayawhip',
      'lemonchiffon',
      'lightgoldenrodyellow'
   ],
   orange: ['orange', 'darkorange', 'lightorange', 'coral', 'tomato', 'orangered', 'darkorange', 'bisque'],
   pink: [
      'pink',
      'lightpink',
      'hotpink',
      'deeppink',
      'palevioletred',
      'mediumvioletred',
      'lavenderblush',
      'lavender'
   ],
   purple: [
      'purple',
      'mediumpurple',
      'mediumorchid',
      'darkorchid',
      'darkviolet',
      'blueviolet',
      'indigo',
      'darkmagenta',
      'orchid',
      'thistle',
      'plum',
      'violet'
   ],
   gray: ['gray', 'lightgray', 'darkgray', 'dimgray', 'slategray', 'lightslategray', 'gainsboro', 'silver'],
   brown: [
      'brown',
      'saddlebrown',
      'sienna',
      'chocolate',
      'peru',
      'rosybrown',
      'sandybrown',
      'burlywood',
      'wheat',
      'tan'
   ],
   black: ['black'],
   white: ['white', 'whitesmoke', 'ghostwhite', 'snow'],
   cyan: [
      'cyan',
      'lightcyan',
      'darkcyan',
      'aqua',
      'aquamarine',
      'turquoise',
      'mediumturquoise',
      'darkturquoise',
      'lightseagreen'
   ],
   indigo: ['indigo'],
   violet: ['violet'],
   lime: ['lime'],
   emerald: ['emerald'],
   amber: ['amber'],
   rose: ['rose'],
   fuchsia: ['fuchsia'],
   sky: ['sky'],
   slate: ['slate'],
   stone: ['stone'],
   neutral: ['neutral'],
   zinc: ['zinc']
}
