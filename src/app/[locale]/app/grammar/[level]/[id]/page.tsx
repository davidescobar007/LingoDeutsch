'use client'
import { useGetSingleGrammarTopic } from '@/store/grammar'
import { parseHtmlToTIterableData } from '@/utils'

import { RenderSchema } from '../grammar.utils'

const Topic = ({ params: { id } }: { params: { id: string } }) => {
   console.log({ id })
   const { data, isLoading } = useGetSingleGrammarTopic(id)
   console.log(data)
   //    const {} = data
   return (
      <div className="">{data?.content && RenderSchema(parseHtmlToTIterableData(data?.content as string))}</div>
   )
}

export default Topic
