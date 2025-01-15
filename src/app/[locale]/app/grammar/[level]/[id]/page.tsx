/* eslint-disable react/forbid-component-props */
'use client'
import { useMemo } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useTranslations } from 'next-intl'

import { AtomTitle } from '@/components/atoms'
import { Link } from '@/navigation'
import { useGetSingleGrammarTopic } from '@/hooks/grammar'
import { getCookie, parseHtmlToTIterableData } from '@/utils'

import { RenderSchema } from '../grammar.utils'

const Topic = ({ params: { id, level } }: { params: { id: string; level: string } }) => {
   const { data } = useGetSingleGrammarTopic(id)
   const language = useMemo(() => getCookie('NEXT_LOCALE'), []) as string
   const t = useTranslations()

   return (
      <div className="w-full">
         <Link className="link text-accent flex" href={`/app/grammar/${level}`}>
            <IoMdArrowRoundBack className="mr-1 mt-1 text-lg" />
            {t('back')}
         </Link>
         {data?.topic && (
            <AtomTitle extraClassName="my-3" type="h3">
               {data.topic[language as keyof typeof Topic]}
            </AtomTitle>
         )}
         {data?.content && RenderSchema(parseHtmlToTIterableData(data?.content as string))}
      </div>
   )
}

export default Topic
