/* eslint-disable react/forbid-component-props */
import React from 'react'
import { FiChevronsDown } from 'react-icons/fi'
import { useTranslations } from 'next-intl'

import AtomTitle from '@/components/atoms/title'
import { grammarLevels } from '@/modules/global.types'
import { Link } from '@/navigation'
const Page = () => {
   const t = useTranslations()
   return (
      <div className="">
         <AtomTitle>{t('grammar.chooseLevel')}</AtomTitle>

         <div className="mt-3 flex flex-col justify-center">
            {grammarLevels.map(({ icon, label }, index) => (
               <>
                  <Link href={`grammar/${label}`}>
                     <div
                        className="border-primary my-3 flex cursor-pointer rounded-xl border p-2 shadow-md"
                        key={label}
                     >
                        <div className="mr-2 flex items-center text-2xl">{icon}</div>
                        <div className="">
                           <AtomTitle type="h3">{label}</AtomTitle>
                           {t(`grammar.${label}`)}
                        </div>
                     </div>
                  </Link>
                  {index !== grammarLevels.length - 1 && <FiChevronsDown className="w-full text-4xl" />}
               </>
            ))}
         </div>
      </div>
   )
}

export default Page
