'use client'
import { AtomButton, AtomText, AtomTitle } from '@/components/atoms'

type RecommendationType = 'grammar' | 'article' | 'vocabulary' | 'general'

type Recommendation = {
   type: RecommendationType
   title: string
   message: string
   cta: string
   href: string
}

type OrganismRecommendedNextStepsProps = {
   recommendation: Recommendation
   extraClassName?: string
}

export const OrganismRecommendedNextSteps = ({
   recommendation,
   extraClassName = ''
}: OrganismRecommendedNextStepsProps) => {
   const getGradientClasses = (type: RecommendationType): string => {
      switch (type) {
         case 'grammar':
            return 'bg-base-100 border-base-300'
         case 'article':
            return 'bg-base-100 border-base-300'
         case 'vocabulary':
            return 'bg-base-100 border-base-300'
         case 'general':
            return 'bg-base-100 border-base-300'
         default:
            return 'bg-base-100 border-base-300'
      }
   }

   return (
      <div className={`w-full ${extraClassName}`}>
         <AtomTitle extraClassName="!text-lg mb-4" type="h3">
            💡 Próximos Pasos
         </AtomTitle>

         <div
            className={`border-base-300 rounded-2xl border p-6 shadow-md transition-all duration-300 hover:shadow-lg ${getGradientClasses(
               recommendation.type
            )}`}
         >
            <div className="mb-4">
               <AtomText className="block" fontSize="large" isBold>
                  {recommendation.title}
               </AtomText>
            </div>

            <div className="mb-6">
               <AtomText className="block leading-relaxed" fontSize="medium">
                  {recommendation.message}
               </AtomText>
            </div>

            <AtomButton href={recommendation.href} size="md" type="link" variant="PRIMARY">
               {recommendation.cta} →
            </AtomButton>
         </div>
      </div>
   )
}
