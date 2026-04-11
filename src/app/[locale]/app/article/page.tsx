'use client'
import { useEffect, useState } from 'react'

import { TemplateArticleList } from '@/components/templates'
import { useGetArticlesListByUserAndState } from '@/hooks/articles'
import { useAuthState } from '@/providers/AuthProvider'

const Article = () => {
   const { user } = useAuthState()

   const [level, setLevel] = useState(undefined)
   const [sortCriteria, setSortCriteria] = useState(undefined)
   const [state, setState] = useState(undefined)

   const {
      data: articlesList,
      isLoading,
      refetch
   } = useGetArticlesListByUserAndState({
      level,
      sortCriteria,
      state,
      userId: user?.id || undefined
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
      <TemplateArticleList
         articles={articlesList}
         isLoading={isLoading}
         isLoggedIn={!!user?.id}
         onFiltersChange={handleFiltersChange}
      />
   )
}

export default Article
