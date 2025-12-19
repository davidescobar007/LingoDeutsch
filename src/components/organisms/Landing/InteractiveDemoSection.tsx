'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { AtomBadge, AtomButton, AtomText, AtomTitle } from '@/components/atoms'
import { Link } from '@/navigation'

type DemoWord = {
   german: string
   spanish: string
   type: string
   example?: string
}

const demoText: DemoWord[] = [
   { german: 'Der', spanish: 'El', type: 'artículo' },
   { german: 'Kaffee', spanish: 'café', type: 'sustantivo (m)', example: 'Ich trinke Kaffee.' },
   { german: 'ist', spanish: 'es/está', type: 'verbo (sein)' },
   { german: 'in', spanish: 'en', type: 'preposición' },
   { german: 'Deutschland', spanish: 'Alemania', type: 'sustantivo (n)', example: 'Ich wohne in Deutschland.' },
   { german: 'sehr', spanish: 'muy', type: 'adverbio' },
   { german: 'beliebt', spanish: 'popular', type: 'adjetivo', example: 'Das Buch ist sehr beliebt.' },
   { german: '.', spanish: '', type: '' },
   { german: 'Viele', spanish: 'muchos/as', type: 'adjetivo' },
   { german: 'Menschen', spanish: 'personas', type: 'sustantivo (pl)', example: 'Die Menschen sind freundlich.' },
   { german: 'trinken', spanish: 'beben', type: 'verbo', example: 'Wir trinken Wasser.' },
   { german: 'jeden', spanish: 'cada', type: 'adjetivo' },
   { german: 'Tag', spanish: 'día', type: 'sustantivo (m)', example: 'Heute ist ein schöner Tag.' },
   { german: 'mehrere', spanish: 'varias', type: 'adjetivo' },
   { german: 'Tassen', spanish: 'tazas', type: 'sustantivo (pl)', example: 'Zwei Tassen Tee, bitte.' },
   { german: '.', spanish: '', type: '' }
]

export const OrganismInteractiveDemoSection = () => {
   const t = useTranslations('landing')
   const [selectedWord, setSelectedWord] = useState<DemoWord | null>(null)
   const [clickedWords, setClickedWords] = useState<Set<string>>(new Set())

   const handleWordClick = (word: DemoWord) => {
      if (word.type === '') return // Skip punctuation
      setSelectedWord(word)
      setClickedWords((prev) => new Set(prev).add(word.german))
   }

   const closeTooltip = () => {
      setSelectedWord(null)
   }

   return (
      <section
         aria-labelledby="demo-title"
         className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20"
      >
         {/* Background decorations - purely decorative */}
         <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/4 top-0 h-64 w-64 rounded-full bg-purple-100/40 blur-3xl"
         />
         <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl"
         />

         <div className="container relative z-10 mx-auto px-4">
            <div className="mb-12 text-center">
               <div className="mb-4 flex justify-center">
                  <AtomBadge color="accent" size="lg">
                     {t('demo.badge')}
                  </AtomBadge>
               </div>
               <AtomTitle
                  extraClassName="!text-3xl sm:!text-4xl lg:!text-5xl !font-bold !mb-4"
                  id="demo-title"
                  type="h2"
               >
                  {t('demo.title')}
               </AtomTitle>
               <AtomText className="mx-auto max-w-2xl !text-lg text-gray-600" fontSize="large">
                  {t('demo.subtitle')}
               </AtomText>
            </div>

            <div className="mx-auto max-w-4xl">
               {/* Demo card */}
               <div className="relative rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
                  {/* Header */}
                  <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                     <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-lg text-white">
                           📖
                        </div>
                        <div>
                           <AtomText className="font-semibold text-gray-800" fontSize="medium">
                              {t('demo.articleTitle')}
                           </AtomText>
                           <AtomText className="text-gray-500" fontSize="small">
                              {t('demo.level')}
                           </AtomText>
                        </div>
                     </div>
                     <AtomBadge color="info" size="sm">
                        {t('demo.demo')}
                     </AtomBadge>
                  </div>

                  {/* Interactive text */}
                  <div className="mb-6 rounded-2xl bg-gray-50 p-6">
                     <p className="text-xl leading-relaxed text-gray-800 sm:text-2xl">
                        {demoText.map((word, index) => {
                           const isPunctuation = word.type === ''
                           const isClicked = clickedWords.has(word.german)
                           const isSelected = selectedWord?.german === word.german

                           if (isPunctuation) {
                              return (
                                 <span className="mr-1" key={index}>
                                    {word.german}
                                 </span>
                              )
                           }

                           return (
                              <button
                                 className={`relative mx-0.5 rounded-lg px-1 py-0.5 transition-all duration-200 ${
                                    isSelected
                                       ? 'bg-primary scale-105 text-white shadow-lg'
                                       : isClicked
                                       ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                       : 'hover:bg-yellow-100 hover:text-yellow-900'
                                 }`}
                                 key={index}
                                 onClick={() => handleWordClick(word)}
                                 type="button"
                              >
                                 {word.german}
                                 {isClicked && !isSelected && (
                                    <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-green-500 text-[8px] text-white">
                                       ✓
                                    </span>
                                 )}
                              </button>
                           )
                        })}
                     </p>

                     {/* Instruction */}
                     <div className="mt-4 flex items-center gap-2 text-gray-500">
                        <span className="animate-pulse text-lg">👆</span>
                        <AtomText className="text-gray-500" fontSize="small">
                           {t('demo.instruction')}
                        </AtomText>
                     </div>
                  </div>

                  {/* Translation tooltip */}
                  {selectedWord && (
                     <div className="animate-fadeIn mb-6 rounded-2xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-6 shadow-lg">
                        <div className="flex items-start justify-between">
                           <div className="flex-1">
                              <div className="mb-3 flex items-center gap-3">
                                 <AtomText className="text-2xl font-bold text-gray-800" fontSize="huge">
                                    {selectedWord.german}
                                 </AtomText>
                                 <AtomBadge color="primary" size="sm">
                                    {selectedWord.type}
                                 </AtomBadge>
                              </div>
                              <div className="mb-2 flex items-center gap-2">
                                 <span className="text-lg">🇪🇸</span>
                                 <AtomText className="text-xl text-gray-700" fontSize="large">
                                    {selectedWord.spanish}
                                 </AtomText>
                              </div>
                              {selectedWord.example && (
                                 <div className="mt-3 rounded-lg bg-white/60 p-3">
                                    <AtomText className="text-gray-600" fontSize="small">
                                       <span className="font-semibold">{t('demo.example')}:</span>{' '}
                                       <span className="italic">{selectedWord.example}</span>
                                    </AtomText>
                                 </div>
                              )}
                           </div>
                           <button
                              aria-label={t('demo.closeTranslation')}
                              className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                              onClick={closeTooltip}
                              type="button"
                           >
                              <svg
                                 aria-hidden="true"
                                 className="h-5 w-5"
                                 fill="none"
                                 stroke="currentColor"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    d="M6 18L18 6M6 6l12 12"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                 />
                              </svg>
                           </button>
                        </div>

                        {/* Save button preview */}
                        <div className="mt-4 flex items-center gap-3 border-t border-purple-100 pt-4">
                           <AtomButton extraClassName="opacity-50 cursor-not-allowed" size="sm" variant="PRIMARY">
                              💾 {t('demo.saveWord')}
                           </AtomButton>
                           <AtomText className="text-gray-500" fontSize="small">
                              {t('demo.signUpToSave')}
                           </AtomText>
                        </div>
                     </div>
                  )}

                  {/* Progress indicator */}
                  <div className="mb-6 flex items-center justify-between rounded-xl bg-gray-50 p-4">
                     <div className="flex items-center gap-2">
                        <span aria-hidden="true" className="text-lg">
                           🎯
                        </span>
                        <AtomText className="text-gray-600" fontSize="small">
                           {t('demo.wordsClicked', {
                              count: clickedWords.size,
                              total: demoText.filter((w) => w.type !== '').length
                           })}
                        </AtomText>
                     </div>
                     <div
                        aria-label={t('demo.progressLabel')}
                        aria-valuemax={demoText.filter((w) => w.type !== '').length}
                        aria-valuemin={0}
                        aria-valuenow={clickedWords.size}
                        className="h-2 w-32 overflow-hidden rounded-full bg-gray-200"
                        role="progressbar"
                     >
                        <div
                           className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                           style={{
                              width: `${(clickedWords.size / demoText.filter((w) => w.type !== '').length) * 100}%`
                           }}
                        />
                     </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                     <Link href="/app/home">
                        <AtomButton
                           extraClassName="transform-gpu transition-all duration-300 hover:scale-105 hover:shadow-xl"
                           size="lg"
                           variant="PRIMARY"
                        >
                           {t('demo.cta')}
                        </AtomButton>
                     </Link>
                     <AtomText className="mt-3 text-gray-500" fontSize="small">
                        {t('demo.articlesCount')}
                     </AtomText>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}
