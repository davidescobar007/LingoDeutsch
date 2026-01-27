'use client'
import { useState } from 'react'

import { MoleculeArticleFilters } from '@/components/molecules/articleFilters/articleFilters'
import { OrganismArticleHeader, OrganismArticleList } from '@/components/organisms'
import { TArticle } from '@/modules/actions/types'

type TFilterFormData = {
   level?: string
   sortCriteria?: string
   state?: string
}

type TemplateArticleListProps = {
   articles?: TArticle[]
   isLoading?: boolean
   onFiltersChange: (_filters: { level?: string; sortCriteria?: string; state?: string }) => void
   isLoggedIn?: boolean
}

const EMPTY_ARRAY: TArticle[] = []

const LEVEL_OPTIONS = [
   { emoji: '🌱', label: 'A1', value: 'A1' },
   { emoji: '🌿', label: 'A2', value: 'A2' },
   { emoji: '🌳', label: 'B1', value: 'B1' },
   { emoji: '🏔️', label: 'B2', value: 'B2' },
   { emoji: '⭐', label: 'C1', value: 'C1' },
   { emoji: '🏆', label: 'C2', value: 'C2' }
]

const SORT_CRITERIA_OPTIONS = [
   { label: 'Mas reciente', value: 'recent' },
   { label: 'Mas antiguo', value: 'old' }
]

export const TemplateArticleList = ({
   articles = EMPTY_ARRAY,
   isLoading = false,
   onFiltersChange,
   isLoggedIn = false
}: TemplateArticleListProps) => {
   const STATE_OPTIONS = isLoggedIn
      ? [
           { label: 'Todos', value: 'all' },
           { label: 'Leídos', value: 'learned' }
        ]
      : [{ label: 'Todos', value: 'all' }]

   const [selectedFilters, setSelectedFilters] = useState<TFilterFormData>({ state: 'all' })

   const handleFilterChange = (filters: TFilterFormData) => {
      setSelectedFilters(filters)
      onFiltersChange(filters)
   }

   return (
      <div className="w-full">
         <OrganismArticleHeader />

         <MoleculeArticleFilters
            levelOptions={LEVEL_OPTIONS}
            onFilterChange={handleFilterChange}
            selectedFilters={selectedFilters}
            sortCriteriaOptions={SORT_CRITERIA_OPTIONS}
            stateOptions={STATE_OPTIONS}
         />

         <OrganismArticleList articles={articles} isLoading={isLoading} />
      </div>
   )
}
