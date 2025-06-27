'use client'
import { useMemo } from 'react'

import { AtomText, AtomTitle } from '@/components/atoms'
import { MoleculeAlert, MoleculeCard, MoleculeTable } from '@/components/molecules'
import { useGetVocabularyList } from '@/hooks/cards'

const Vocabulary = () => {
   const { data } = useGetVocabularyList({})
   const easyWords = data?.filter((item: any) => item.level === 'easy')
   const mediumWords = data?.filter((item: any) => item.level === 'medium')
   const hardWords = data?.filter((item: any) => item.level === 'hard')

   const tableData = useMemo(() => {
      if (!data) return []
      return data.map((item: any) => {
         let levelDisplay = item.level || '-'
         if (item.level === 'hard') {
            levelDisplay = `🔴 Dificil`
         } else if (item.level === 'medium') {
            levelDisplay = `🟡 Medio`
         } else if (item.level === 'easy') {
            levelDisplay = `🟢 Facil`
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
               {data?.length
                  ? 'Explora tu guía de vocabulario. Selecciona tu set de palabras por nivel para empezar a aprender y practicar.'
                  : 'Tu espacio personal para guardar y practicar nuevas palabras en alemán.'}
            </AtomText>
         </header>
         {/* Always informative banner */}
         <section className="my-8">
            {data?.length ? (
               <MoleculeAlert
                  message={`Tienes ${data.length} palabra${
                     data.length === 1 ? '' : 's'
                  } en tu vocabulario. ¡Selecciona un nivel para practicar!`}
                  type="success"
               />
            ) : (
               <MoleculeAlert
                  message="Tu vocabulario está vacío. Visita la sección de artículos y haz clic en cualquier palabra mientras lees para guardarla en tu diccionario personal y comenzar a practicar."
                  type="info"
               />
            )}
         </section>

         {data?.length === 0 ? null : (
            <>
               <AtomTitle type="h5">Practica por nivel de dificultad</AtomTitle>

               <div className="mb-8 flex w-full flex-wrap justify-between gap-4">
                  <MoleculeCard
                     buttonText={easyWords?.length ? 'Practicar' : undefined}
                     cardType="simple"
                     content={
                        easyWords
                           ?.map((item) => item.expand?.word_id?.german_translation)
                           .slice(0, 3)
                           .join(', ') || 'No tienes palabras en este nivel'
                     }
                     footerText={`${easyWords?.length} palabras`}
                     redirectTo="vocabulary/practice?level=easy"
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
                     redirectTo="vocabulary/practice?level=medium"
                     title="🟡 Medio"
                  />

                  <MoleculeCard
                     buttonText={hardWords?.length ? 'Practicar' : undefined}
                     cardType="simple"
                     content={
                        hardWords
                           ?.map((item) => item.expand?.word_id?.german_translation)
                           .slice(0, 3)
                           .join(', ') || 'No tienes palabras en este nivel'
                     }
                     footerText={`${hardWords?.length} palabras`}
                     redirectTo="vocabulary/practice?level=hard"
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
