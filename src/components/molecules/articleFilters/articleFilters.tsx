'use client'

import { AtomPill } from '@/components/atoms'

type TFilterFormData = {
   level?: string
   sortCriteria?: string
   state?: string
}

type LevelOption = {
   emoji?: string
   label: string
   value: string
}

type MoleculeArticleFiltersProps = {
   levelOptions: LevelOption[]
   onFilterChange: (_filters: TFilterFormData) => void
   selectedFilters: TFilterFormData
   sortCriteriaOptions: Array<{ label: string; value: string }>
   stateOptions: Array<{ label: string; value: string }>
}

export const MoleculeArticleFilters = ({
   levelOptions,
   onFilterChange,
   selectedFilters,
   sortCriteriaOptions,
   stateOptions
}: MoleculeArticleFiltersProps) => {
   const handleLevelClick = (level: string) => {
      onFilterChange({
         ...selectedFilters,
         level: selectedFilters.level === level ? undefined : level
      })
   }

   const handleStateClick = (state: string) => {
      const isSameFilter = selectedFilters.state === state

      if (isSameFilter) {
         onFilterChange({
            ...selectedFilters,
            state: undefined
         })
      } else {
         onFilterChange({
            ...selectedFilters,
            state
         })
      }
   }

   const handleSortClick = (sortCriteria: string) => {
      onFilterChange({
         ...selectedFilters,
         sortCriteria: selectedFilters.sortCriteria === sortCriteria ? undefined : sortCriteria
      })
   }

   return (
      <div className="space-y-4">
         <div className="group relative">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
               {levelOptions.map((option) => (
                  <AtomPill
                     emoji={option.emoji}
                     isSelected={selectedFilters.level === option.value}
                     key={option.value}
                     label={option.label}
                     onClick={() => handleLevelClick(option.value)}
                  />
               ))}
            </div>
            <div className="from-base-100 pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent opacity-0 transition-opacity group-hover:opacity-100 md:opacity-0" />
         </div>

         <div className="group relative">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
               {stateOptions.map((option) => (
                  <AtomPill
                     isSelected={selectedFilters.state === option.value}
                     key={option.value}
                     label={option.label}
                     onClick={() => handleStateClick(option.value)}
                  />
               ))}
            </div>
            <div className="from-base-100 pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l to-transparent opacity-0 transition-opacity group-hover:opacity-100 md:opacity-0" />
         </div>

         {/*
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
             {sortCriteriaOptions.map((option) => (
                <AtomPill
                   isSelected={selectedFilters.sortCriteria === option.value}
                   key={option.value}
                   label={option.label}
                   onClick={() => handleSortClick(option.value)}
                />
             ))}
          </div>
          */}
      </div>
   )
}
