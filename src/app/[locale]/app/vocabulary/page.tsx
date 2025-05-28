'use client'
import { useMemo } from 'react'

import { AtomText, AtomTitle } from '@/components/atoms'
import { MoleculeCard, MoleculeTable } from '@/components/molecules'
import { useGetVocabularyList } from '@/hooks/cards'

const Vocabulary = () => {
   const { data } = useGetVocabularyList()
   const easyWords = data?.filter((item: any) => item.level === 'easy')
   const mediumWords = data?.filter((item: any) => item.level === 'medium')
   const hardWords = data?.filter((item: any) => item.level === 'hard')

   const tableData = useMemo(() => {
      if (!data) return []
      return data.map((item: any) => {
         let levelDisplay = item.level || '-'
         if (item.level === 'hard') {
            levelDisplay = `🔴 ${item.level}`
         } else if (item.level === 'medium') {
            levelDisplay = `🟡 ${item.level}`
         } else if (item.level === 'easy') {
            levelDisplay = `🟢 ${item.level}`
         }
         return {
            german: item.expand?.word_id?.german_translation || '-',
            spanish: item.expand?.word_id?.spanish_translation || '-',
            level: levelDisplay
         }
      })
   }, [data])

   const columns = useMemo(
      () => [
         {
            header: 'Alemán',
            accessorKey: 'german'
         },
         {
            header: 'Español',
            accessorKey: 'spanish'
         },
         {
            header: 'Nivel',
            accessorKey: 'level'
         }
      ],
      []
   )

   return (
      <div className="w-full">
         <header className="w-full">
            <AtomTitle type="h3">Tu guia de Vocabulario</AtomTitle>
            <AtomText>
               Explora tu guía de vocabulario. Selecciona tu set de palabras por nivel para empezar a aprender y
               practicar.
            </AtomText>
         </header>
         {data?.length === 0 ? (
            <>
               <section className="bg-secondary my-8 flex items-center justify-between rounded-md border-b-2 p-2 shadow-md">
                  <AtomTitle extraClassName="text-primary mt-3" type="h4">
                     No tienes palabras en tu vocabulario
                  </AtomTitle>
               </section>
               <AtomText>
                  Empieza a practicar con las palabras que has guardado en la seccion de articulos
               </AtomText>
            </>
         ) : (
            <>
               <section className="bg-secondary my-8 flex items-center justify-between rounded-md border-b-2 p-2 shadow-md">
                  <AtomTitle extraClassName="text-primary mt-3" type="h4">
                     {`Tienes ${data?.length} palabras en tu vocabulario`}
                  </AtomTitle>
               </section>
               <AtomTitle type="h5">Practica por nivel de dificultad</AtomTitle>

               <div className="mb-8 flex w-full flex-wrap justify-between gap-4">
                  <MoleculeCard
                     buttonText={easyWords?.length ? 'Practicar' : undefined}
                     cardType="simple"
                     content={
                        easyWords
                           ?.map((item) => item.expand?.word_id?.german_translation)
                           .slice(0, 3)
                           .join(', ') || ''
                     }
                     footerText={`${easyWords?.length} palabras`}
                     title="🟢 Facil"
                  />
                  <MoleculeCard
                     buttonText={mediumWords?.length ? 'Practicar' : undefined}
                     cardType="simple"
                     content={
                        mediumWords
                           ?.map((item) => item.expand?.word_id?.german_translation)
                           .slice(0, 3)
                           .join(', ') || 'No tienes palabras en este nivel'
                     }
                     footerText={`${mediumWords?.length} palabras`}
                     title="🟡 Medio"
                  />

                  <MoleculeCard
                     buttonText={hardWords?.length ? 'Practicar' : undefined}
                     cardType="simple"
                     content={
                        hardWords
                           ?.map((item) => item.expand?.word_id?.german_translation)
                           .slice(0, 3)
                           .join(', ') || ''
                     }
                     footerText={`${hardWords?.length} palabras`}
                     title="🔴 Dificil"
                  />
               </div>
               <div className="shadow-xl">
                  <MoleculeTable columns={columns} data={tableData} title="Tu vocabulario" />
               </div>
            </>
         )}
      </div>
   )
}

export default Vocabulary
