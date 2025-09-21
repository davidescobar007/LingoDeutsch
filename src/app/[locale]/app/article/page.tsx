'use client'
import React, { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { AtomButton, AtomText, AtomTitle, Select } from '@/components/atoms'
import { MoleculeAlert, MoleculeCard } from '@/components/molecules'
import { useGetArticlesListByUserAndState } from '@/hooks/articles'
import { TUser } from '@/modules/actions/types'
import { getUserInfo } from '@/modules/actions/users.actions'
import { constants } from '@/modules/global.types'

const levelOptions = [
   { value: 'A1', label: 'A1 - Principiante' },
   { value: 'A2', label: 'A2 - Elemental' },
   { value: 'B1', label: 'B1 - Intermedio' },
   { value: 'B2', label: 'B2 - Intermedio avanzado' },
   { value: 'C1', label: 'C1 - Avanzado' },
   { value: 'C2', label: 'C2 - Proficiente' }
]

const stateOptions = [
   { value: 'all', label: '⚪️ Todos' },
   { value: 'learned', label: '🟢 Aprendido ' },
   { value: 'bookmarked', label: '🟡 Creado para mi' }
]

const sortCriteriaOptions = [
   { value: 'recent', label: 'Mas reciente' },
   { value: 'old', label: 'Mas antiguo' }
]

const Article = () => {
   const methods = useForm()
   const user = getUserInfo() as TUser

   const [level, setLevel] = useState<string | undefined>(undefined)
   const [sortCriteria, setSortCriteria] = useState<string | undefined>(undefined)
   const [state, setState] = useState<string | undefined>(undefined)

   const {
      data: articlesList,
      isLoading,
      refetch
   } = useGetArticlesListByUserAndState({
      userId: user.id,
      level,
      state,
      sortCriteria
   })

   useEffect(() => {
      refetch()
   }, [level, state, sortCriteria, refetch])

   const onSubmitForm: SubmitHandler<any> = (data) => {
      setLevel(data.level)
      setState(data.state)
      setSortCriteria(data.sortCriteria)
   }

   return (
      <div className="w-full">
         <header className="mb-4 w-full">
            <AtomTitle type="h3">Lee y aprende</AtomTitle>
            <AtomText>
               Aca puedes encontrar articulos para leer y aprender vocabulario nuevo. Puedes filtrar por nivel,
               estado y ordenarlos por fecha de publicacion o por estado.
            </AtomText>
         </header>
         <div className="card my-6 w-full shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="card-body p-6">
               <div className="mb-4">
                  <h3 className="text-primary mb-1 text-lg font-semibold">🔍 Personaliza tu búsqueda</h3>
               </div>

               <FormProvider {...methods}>
                  <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmitForm)}>
                     {/* Form Grid - responsive layout */}
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

                     {/* Enhanced Submit Button */}
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
         {isLoading ? (
            'Buscando...'
         ) : (
            <div className=" flex flex-wrap justify-center gap-4 md:justify-evenly">
               {!articlesList?.length && (
                  <MoleculeAlert
                     message="No se encontraron articulos con esta criteria, intenta con un filtro diferente"
                     type="warning"
                  />
               )}
               <AtomText isBlock>Total articulos: {articlesList?.length}</AtomText>
               {articlesList?.length
                  ? articlesList.map(({ id, title, imageFile, estimated_read_time, is_completed, created }) => {
                       return (
                          <div className="" key={title}>
                             <MoleculeCard
                                buttonText="Leer articulo"
                                date={created as unknown as Date}
                                image={`${process.env.NEXT_PUBLIC_API_ENVIRONMENT}/api/files/${constants.ARTICLES}/${id}/${imageFile}`}
                                isCompleted={is_completed}
                                redirectTo={id}
                                timeToRead={estimated_read_time}
                                title={title}
                             />
                          </div>
                       )
                    })
                  : []}
            </div>
         )}
      </div>
   )
}

export default Article
