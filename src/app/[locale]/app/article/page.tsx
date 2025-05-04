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
   { value: 'A1', label: 'A1' },
   { value: 'A2', label: 'A2' },
   { value: 'B1', label: 'B1' },
   { value: 'B2', label: 'B2' },
   { value: 'C1', label: 'C1' },
   { value: 'C2', label: 'C2' }
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
   }, [level, state, sortCriteria])

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
         <div className="card-outlined !border-primary my-4 w-full shadow-xl">
            <FormProvider {...methods}>
               <form
                  className="flex w-full flex-wrap justify-between gap-2"
                  onSubmit={methods.handleSubmit(onSubmitForm)}
               >
                  <Select id="level" label="Nivel" options={levelOptions} />
                  <Select id="state" label="Estado" options={stateOptions} />
                  <Select id="sortCriteria" label="Ordernar por" options={sortCriteriaOptions} />

                  <AtomButton isBlock type="submit" variant="PRIMARY">
                     Buscar
                  </AtomButton>
               </form>
            </FormProvider>
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
