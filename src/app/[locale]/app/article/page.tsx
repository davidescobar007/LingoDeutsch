'use client'
import { useEffect, useState } from 'react'

import { TemplateArticleList } from '@/components/templates'
import { useGetArticlesListByUserAndState } from '@/hooks/articles'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'

const Article = () => {
   const user = getUserInfo() as TUser

   const [level, setLevel] = useState<string | undefined>(undefined)
   const [sortCriteria, setSortCriteria] = useState<string | undefined>(undefined)
   const [state, setState] = useState<string | undefined>(undefined)

   const {
      data: articlesList,
      isLoading,
      refetch
   } = useGetArticlesListByUserAndState({
      level,
      sortCriteria,
      state,
      userId: user.id
   })

   useEffect(() => {
      refetch()
   }, [level, state, sortCriteria, refetch])

   const handleFiltersChange = (filters: { level?: string; sortCriteria?: string; state?: string }) => {
      setLevel(filters.level)
      setState(filters.state)
      setSortCriteria(filters.sortCriteria)
   }

   return (
      <TemplateArticleList articles={articlesList} isLoading={isLoading} onFiltersChange={handleFiltersChange} />
   )
}

export default Article
