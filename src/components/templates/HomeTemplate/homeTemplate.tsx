'use client'
import {
   OrganismArticleCarousel,
   OrganismGrammarPreview,
   OrganismScoreSidebar,
   OrganismVocabularyPreview,
   OrganismWelcomeHero
} from '@/components/organisms'
import { TArticle, TGrammar, TScore, TUser, TVocabularyStatsUI } from '@/modules/actions/types'

type TemplateHomeProps = {
   userName: string
   articles: TArticle[]
   vocabularyStats?: TVocabularyStatsUI
   scoreList?: TScore
   user?: TUser
   grammarList: TGrammar[]
}

export const TemplateHome = ({
   userName,
   articles,
   vocabularyStats = undefined,
   scoreList = undefined,
   user = undefined,
   grammarList
}: TemplateHomeProps) => {
   // Transform grammar data for display
   const grammarTopics =
      grammarList
         ?.sort(() => 0.5 - Math.random())
         .slice(0, 6)
         .map((grammar, index) => ({
            id: grammar.id,
            label: grammar.topic_name?.es || 'Tema de gramática',
            colorTheme: (['blue', 'green', 'purple', 'orange', 'teal', 'red', 'yellow', 'indigo'] as const)[
               index % 8
            ]
         })) || []

   return (
      <div className="flex w-full flex-col 2xl:flex-row 2xl:gap-8">
         <div className="w-full 2xl:w-8/12">
            <OrganismWelcomeHero userName={userName} />
            <OrganismGrammarPreview popularTopics={grammarTopics} />
            <OrganismVocabularyPreview vocabularyStats={vocabularyStats} />
            <OrganismArticleCarousel articles={articles || []} extraClassName="mb-12" />
         </div>

         <OrganismScoreSidebar extraClassName="w-full 2xl:w-4/12" scoreList={scoreList} user={user} />
      </div>
   )
}
