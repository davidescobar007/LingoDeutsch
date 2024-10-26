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
   STUDY_VOCABULARY: 'studyVocabulary',
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
export const grammarLevels: { icon: string; label: string }[] = [
   { icon: '🫘', label: 'A1' },
   { icon: '🌱', label: 'A2' },
   { icon: '🌿', label: 'B1' },
   { icon: '🌲', label: 'B2' }
]

export const urls = {
   linguatools: 'https://petapro-translate-v1.p.rapidapi.com/?'
}

export const headers = {
   'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_LINGUATOOLS,
   'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPIDAPI_LINGUATOOLS_HOST
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
