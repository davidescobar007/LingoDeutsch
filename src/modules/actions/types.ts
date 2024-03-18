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

export type TScore = Array<{
   username: string
   id: string
   created: string
   updated: string
   collectionId: string
   collectionName: string
   score: number
   position: number | string
}>

export type TArticle = {
   author: string
   collectionId: string
   collectionName: string
   created: string
   id: string
   imageFile: string
   level: Array<string>
   link: string
   text_content: string
   title: string
   updated: string
   quizz: Array<{
      question: string
      option_one: string
      option_two: string
      option_three: string
      option_four: string
      correct_answer: string
   }>
   expand: {}
}

export type Ttranslation = {
   collectionId?: string
   collectionName?: string
   conjugation?: {}
   created?: string
   english_translation?: string | null
   examples?: {
      data: Array<{
         german: string
         spanish: string
      }>
   }
   german_translation: string
   id?: string
   last_time_seen?: string
   spanish_translation: string
   type_of_word?: string
   updated?: string
   user?: Array<TUser>
   expand?: {}
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
