'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { AtomBadge, AtomText, AtomTitle } from '@/components/atoms'

type FaqItem = {
   questionKey: string
   answerKey: string
}

const faqItems: FaqItem[] = [
   { questionKey: 'q1', answerKey: 'a1' },
   { questionKey: 'q2', answerKey: 'a2' },
   { questionKey: 'q3', answerKey: 'a3' },
   { questionKey: 'q4', answerKey: 'a4' },
   { questionKey: 'q5', answerKey: 'a5' },
   { questionKey: 'q6', answerKey: 'a6' }
]

export const OrganismFaqSection = () => {
   const t = useTranslations('landing')
   const [openIndex, setOpenIndex] = useState<number | null>(null)

   const toggleFaq = (index: number) => {
      setOpenIndex(openIndex === index ? null : index)
   }

   return (
      <section className="bg-base-200 py-20" id="faq">
         <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
               <div className="mb-4 flex justify-center">
                  <AtomBadge color="info" size="lg">
                     {t('faq.badge')}
                  </AtomBadge>
               </div>
               <AtomTitle extraClassName="!text-3xl sm:!text-4xl lg:!text-5xl !font-bold !mb-4" type="h2">
                  {t('faq.title')}
               </AtomTitle>
               <AtomText className="mx-auto max-w-2xl !text-lg text-gray-600" fontSize="large">
                  {t('faq.subtitle')}
               </AtomText>
            </div>

            <div className="mx-auto max-w-3xl">
               {faqItems.map((item, index) => (
                  <div
                     className="mb-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                     key={index}
                  >
                     <button
                        aria-controls={`faq-answer-${index}`}
                        aria-expanded={openIndex === index}
                        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                        onClick={() => toggleFaq(index)}
                        type="button"
                     >
                        <span className="pr-4 text-lg font-semibold text-gray-800">
                           {t(`faq.${item.questionKey}`)}
                        </span>
                        <span
                           className={`bg-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 ${
                              openIndex === index ? 'rotate-180' : ''
                           }`}
                        >
                           <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                           >
                              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </span>
                     </button>
                     <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                           openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                        id={`faq-answer-${index}`}
                     >
                        <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                           <AtomText className="text-gray-600" fontSize="medium">
                              {t(`faq.${item.answerKey}`)}
                           </AtomText>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Still have questions? */}
            <div className="mt-12 text-center">
               <div className="inline-block rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 p-6">
                  <AtomText className="text-gray-700" fontSize="large">
                     {t('faq.stillQuestions')}{' '}
                     <a className="text-primary font-semibold hover:underline" href="mailto:support@blabling.com">
                        {t('faq.contactUs')}
                     </a>
                  </AtomText>
               </div>
            </div>
         </div>
      </section>
   )
}
