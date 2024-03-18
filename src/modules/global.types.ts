export const constants = {
   USERS: "users",
   CATEGORIES: "categories",
   CARDS: "cards",
   SCORE: "score",
   CATEGORY: "category",
   SECTIONS: "sections",
   PACKS: "packs",
   FRONT_TERM: "frontTerm",
   ANSWER: "answer",
   VOCABULARY: "vocabulary",
   ARTICLES: "articles",
   QUIZZES: "quizzes",
   STUDY_VOCABULARY: "studyVocabulary",
   DELAY: 500,
   CARDS_LEVEL: {
      easy: 1,
      medium: 2,
      hard: 3
   }
}

export const queryOperators = {
   LESS_THAN: "<",
   LESS_THAN_OR_EQUAL_TO: "<=",
   EQUAL_TO: "=",
   LIKE: "~",
   GREATER_THAN: ">",
   GREATER_THAN_EQUAL_TO: ">=",
   NOT_EQUAL_TO: "!=",
   ARRAY_CONTAINS: "array-contains",
   ARRAY_CONTAINS_ANY: "array-contains-any",
   IN: "in",
   NOT_IN: "not-in"
}

export const urls = {
   linguatools: "https://petapro-translate-v1.p.rapidapi.com/?"
}

export const headers = {
   "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_LINGUATOOLS,
   "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPIDAPI_LINGUATOOLS_HOST
}
