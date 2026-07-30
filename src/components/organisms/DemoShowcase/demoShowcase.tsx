'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { AtomBadge, AtomButton, Icon } from '@/components/atoms'

const SAMPLE_TEXT = [
   'Die Kaffeekultur in Deutschland ist Teil des Alltags. Morgens, im Büro oder am Nachmittag eine kurze Pause zu machen ist für viele eine echte Kultur.',
   'Hier beginnt man den Tag oft mit einer Tasse Kaffee und einer Pause mit den Kollegen.'
]

// Map of clickable German words to their Spanish translation.
const TRANSLATIONS: Record<string, string> = {
   Kaffeekultur: 'la cultura del café',
   Deutschland: 'Alemania',
   Kultur: 'la cultura',
   morgens: 'por la mañana',
   Büro: 'la oficina',
   Pause: 'la pausa',
   Tag: 'el día',
   Kollegen: 'los compañeros',
   Tasse: 'la taza'
}

export const OrganismDemoShowcase = () => {
   const t = useTranslations('landing.demo')
   const [activeWord, setActiveWord] = useState<string | null>(null)

   const handleClickWord = (rawWord: string) => {
      const cleanWord = rawWord.replace(/[.,]/g, '')
      setActiveWord(cleanWord === activeWord ? null : cleanWord)
   }

   return (
      <section className="bg-base-200/60 border-base-300 border-y" id="demo">
         <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
            <div className="mb-12 text-center">
               <span className="text-primary mb-4 block text-sm font-medium">{t('badge')}</span>
               <h2 className="text-neutral mb-4 text-3xl font-bold tracking-tight md:text-4xl">{t('title')}</h2>
               <p className="text-neutral/70 mx-auto max-w-2xl text-lg">{t('subtitle')}</p>
            </div>

            {/* Browser-like mockup frame */}
            <div className="container-card mx-auto max-w-3xl overflow-hidden p-0">
               <div className="border-base-300 bg-base-100 flex items-center gap-2 border-b px-4 py-3">
                  <span className="bg-error h-3 w-3 rounded-full" />
                  <span className="bg-warning h-3 w-3 rounded-full" />
                  <span className="bg-success h-3 w-3 rounded-full" />
                  <span className="bg-base-200 text-neutral/50 ml-4 hidden rounded-md px-3 py-1 text-xs sm:inline">
                     blabling.com/app/article/kaffeekultur
                  </span>
               </div>

               <div className="bg-base-100 p-6 md:p-10">
                  <div className="mb-4 flex items-center justify-between">
                     <h3 className="text-neutral text-xl font-bold md:text-2xl">{t('articleTitle')}</h3>
                     <AtomBadge color="primary" outline size="sm">
                        {t('level')}
                     </AtomBadge>
                  </div>

                  <div className="border-base-300 bg-primary/5 text-neutral/70 mb-6 flex items-center gap-2 rounded-lg border border-dashed px-3 py-2 text-sm">
                     <Icon icon="info" iconSize="small" iconState="primary" />
                     {t('instruction')}
                  </div>

                  <div className="text-neutral text-lg leading-relaxed">
                     {SAMPLE_TEXT.map((paragraph, pIndex) => (
                        <p className="mb-4" key={pIndex}>
                           {paragraph.split(' ').map((word, wIndex) => {
                              const cleanWord = word.replace(/[.,]/g, '')
                              const isClickable = Boolean(TRANSLATIONS[cleanWord])
                              const isActive = activeWord === cleanWord
                              return (
                                 <span
                                    className={`${
                                       isClickable
                                          ? 'hover:bg-primary/15 decoration-primary cursor-pointer rounded px-0.5 underline decoration-dotted underline-offset-4 transition-colors'
                                          : ''
                                    } ${isActive && isClickable ? 'bg-primary/20 rounded px-0.5' : ''}`}
                                    key={`${pIndex}-${wIndex}`}
                                    onClick={isClickable ? () => handleClickWord(word) : undefined}
                                 >
                                    {word}{' '}
                                 </span>
                              )
                           })}
                        </p>
                     ))}
                  </div>

                  {/* Translation popover */}
                  {activeWord && TRANSLATIONS[activeWord] && (
                     <div className="border-base-300 bg-base-100 mt-6 flex items-center justify-between rounded-xl border p-4 shadow-lg">
                        <div>
                           <div className="text-primary text-xs font-bold uppercase tracking-wide">
                              {t('example')}
                           </div>
                           <div className="text-neutral mt-1 text-lg font-bold">{activeWord}</div>
                           <div className="text-neutral/70">{TRANSLATIONS[activeWord]}</div>
                        </div>
                        <button
                           className="text-neutral/40 hover:text-neutral"
                           onClick={() => setActiveWord(null)}
                           type="button"
                        >
                           <Icon icon="cross" iconSize="small" />
                        </button>
                     </div>
                  )}
               </div>
            </div>

            <div className="mt-10 text-center">
               <AtomButton href="/app/home" size="lg" type="link" variant="PRIMARY">
                  {t('cta')}
               </AtomButton>
               <p className="text-neutral/50 mt-3 text-sm">{t('articlesCount')}</p>
            </div>
         </div>
      </section>
   )
}
