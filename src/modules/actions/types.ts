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
   name?: string
   updated: string
   username?: string
   verified?: boolean
   expand: {}
   userScore?: number
}
