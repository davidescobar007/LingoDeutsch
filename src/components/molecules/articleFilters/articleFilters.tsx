'use client'
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'

import { AtomButton, Select } from '@/components/atoms'

type TFilterFormData = {
   level?: string
   sortCriteria?: string
   state?: string
}

type MoleculeArticleFiltersProps = {
   isLoading?: boolean
   levelOptions: Array<{ label: string; value: string }>
   methods: UseFormReturn<TFilterFormData>
   onSubmit: SubmitHandler<TFilterFormData>
   sortCriteriaOptions: Array<{ label: string; value: string }>
   stateOptions: Array<{ label: string; value: string }>
}

export const MoleculeArticleFilters = ({
   isLoading = false,
   levelOptions,
   methods,
   onSubmit,
   sortCriteriaOptions,
   stateOptions
}: MoleculeArticleFiltersProps) => {
   return (
      <div className="container-card-interactive my-6 w-full">
         <div className="card-body p-6">
            <div className="mb-4">
               <h3 className="text-primary mb-1 text-lg font-semibold">🔍 Personaliza tu búsqueda</h3>
            </div>

            <FormProvider {...methods}>
               <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                     <div className="form-control">
                        <label className="label">
                           <span className="label-text font-medium">📚 Nivel de alemán</span>
                        </label>
                        <Select id="level" label="" options={levelOptions} />
                        <label className="label">
                           <span className="label-text-alt text-xs">Elige tu nivel actual</span>
                        </label>
                     </div>

                     <div className="form-control">
                        <label className="label">
                           <span className="label-text font-medium">⭐ Estado del artículo</span>
                        </label>
                        <Select id="state" label="" options={stateOptions} />
                        <label className="label">
                           <span className="label-text-alt text-xs">Filtra por progreso</span>
                        </label>
                     </div>

                     <div className="form-control">
                        <label className="label">
                           <span className="label-text font-medium">🗂️ Ordenar por</span>
                        </label>
                        <Select id="sortCriteria" label="" options={sortCriteriaOptions} />
                        <label className="label">
                           <span className="label-text-alt text-xs">Organiza los resultados</span>
                        </label>
                     </div>
                  </div>

                  <div className="divider my-2" />
                  <div className="flex flex-col items-center gap-3 sm:flex-row">
                     <AtomButton disabled={isLoading} type="submit" variant="PRIMARY">
                        {isLoading ? (
                           <>
                              <span className="loading loading-spinner loading-sm" />
                              Buscando...
                           </>
                        ) : (
                           <>
                              🔍 Buscar artículos
                              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                           </>
                        )}
                     </AtomButton>
                  </div>
               </form>
            </FormProvider>
         </div>
      </div>
   )
}
