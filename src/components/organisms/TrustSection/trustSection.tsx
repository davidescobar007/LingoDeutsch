'use client'

import { useTranslations } from 'next-intl'

import { Icon } from '@/components/atoms'

type TrustTitle = 'cefr' | 'science' | 'available'
type TrustDesc = 'cefrDesc' | 'scienceDesc' | 'noInstall'

type Item = { descKey: TrustDesc; icon: 'check'; titleKey: TrustTitle }

const ITEMS: Item[] = [
   { descKey: 'cefrDesc', icon: 'check', titleKey: 'cefr' },
   { descKey: 'scienceDesc', icon: 'check', titleKey: 'science' },
   { descKey: 'noInstall', icon: 'check', titleKey: 'available' }
]

export const OrganismTrustSection = () => {
   const t = useTranslations('landing.trust')

   return (
      <section className="bg-base-200/60 border-base-300 border-y">
         <div className="mx-auto max-w-5xl px-6 py-20 md:py-24">
            <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2 md:grid-cols-3">
               {ITEMS.map((item) => (
                  <div className="text-center" key={item.titleKey}>
                     <div className="bg-success/10 text-success mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                        <Icon icon={item.icon} iconSize="medium" />
                     </div>
                     <h3 className="text-neutral mb-1 text-base font-bold">{t(item.titleKey)}</h3>
                     <p className="text-neutral/60 text-sm">{t(item.descKey)}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}
