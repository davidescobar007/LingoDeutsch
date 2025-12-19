'use client'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

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
}

const EMPTY_ARRAY: TArticle[] = []

const LEVEL_OPTIONS = [
   { label: 'A1 - Principiante', value: 'A1' },
   { label: 'A2 - Elemental', value: 'A2' },
   { label: 'B1 - Intermedio', value: 'B1' },
   { label: 'B2 - Intermedio avanzado', value: 'B2' },
   { label: 'C1 - Avanzado', value: 'C1' },
   { label: 'C2 - Proficiente', value: 'C2' }
]

const STATE_OPTIONS = [
   { label: '⚪️ Todos', value: 'all' },
   { label: '🟢 Aprendido ', value: 'learned' },
   { label: '🟡 Creado para mi', value: 'bookmarked' }
]

const SORT_CRITERIA_OPTIONS = [
   { label: 'Mas reciente', value: 'recent' },
   { label: 'Mas antiguo', value: 'old' }
]

export const TemplateArticleList = ({
   articles = EMPTY_ARRAY,
   isLoading = false,
   onFiltersChange
}: TemplateArticleListProps) => {
   const methods = useForm<TFilterFormData>()
   const [localFilters, setLocalFilters] = useState<TFilterFormData>({})

   useEffect(() => {
      if (localFilters.level || localFilters.state || localFilters.sortCriteria) {
         onFiltersChange(localFilters)
      }
   }, [localFilters, onFiltersChange])

   const handleSubmitForm: SubmitHandler<TFilterFormData> = (data) => {
      setLocalFilters({
         level: data.level,
         sortCriteria: data.sortCriteria,
         state: data.state
      })
   }

   return (
      <div className="w-full">
         <OrganismArticleHeader />

         <MoleculeArticleFilters
            isLoading={isLoading}
            levelOptions={LEVEL_OPTIONS}
            methods={methods}
            onSubmit={handleSubmitForm}
            sortCriteriaOptions={SORT_CRITERIA_OPTIONS}
            stateOptions={STATE_OPTIONS}
         />

         <OrganismArticleList articles={articles} isLoading={isLoading} />
      </div>
   )
}
