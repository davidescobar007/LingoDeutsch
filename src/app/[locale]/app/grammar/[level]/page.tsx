/* eslint-disable react/forbid-component-props */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-danger */
'use client'

import React, { useMemo } from 'react'
import { FiChevronsDown } from 'react-icons/fi'

import MoleculeCollapse from '@/components/molecules/collapse'
import { Link } from '@/navigation'
import { useGetGrammarByLevel } from '@/store/grammar'
import { getCookie, parseHtmlToTIterableData } from '@/utils'

import { RenderSchema } from './grammar.utils'

const Page = ({ params: { level } }: { params: { level: string } }) => {
   const { data: listOfGrammarTopics } = useGetGrammarByLevel(level)
   const language = useMemo(() => getCookie('NEXT_LOCALE'), []) as string
   return (
      <div className="w-full">
         {listOfGrammarTopics?.length &&
            listOfGrammarTopics.map(({ id, topic, content }, index) => {
               if (!topic?.[language as keyof typeof topic]) return
               // if (topic.es !== 'El género') return
               return (
                  <>
                     <Link className=" mb-2 block lg:hidden" href={`${level}/${id}`}>
                        {index + 1} - <span className="link ">{topic?.[language as keyof typeof topic]}</span>
                     </Link>
                     <div className="hidden lg:block">
                        <MoleculeCollapse title={`${level} - ${topic?.[language as keyof typeof topic]}`}>
                           <>
                              <div className="mb-4" />
                              {content && RenderSchema(parseHtmlToTIterableData(content))}
                           </>
                        </MoleculeCollapse>
                        {index !== listOfGrammarTopics.length - 1 && (
                           <FiChevronsDown className="w-full text-3xl" />
                        )}
                     </div>
                  </>
               )
            })}
      </div>
   )
}

export default Page
