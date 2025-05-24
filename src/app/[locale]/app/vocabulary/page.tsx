'use client'
import { useMemo } from 'react'

import { AtomText, AtomTitle, Icon } from '@/components/atoms'
import { MoleculeCard, MoleculeMiniCard, MoleculeTable } from '@/components/molecules'
import { useGetVocabularyList } from '@/hooks/cards'

const Vocabulary = () => {
   const { data } = useGetVocabularyList()
   console.log(data)

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
         <div className="my-4 flex justify-center">
            <MoleculeMiniCard
               className="!border-primary"
               content="tienes 250 palabras guardadas en tu vocabulario"
               icon={<Icon icon="book" iconSize="large" iconState="primary" />}
            />
         </div>
         <AtomTitle type="h5">Practica por nivel de dificultad</AtomTitle>

         <div className="mb-8 flex w-full flex-wrap justify-between gap-4">
            <MoleculeCard buttonText="Practicar" cardType="simple" content="Brot, Wasser, Tag" title="🟢 Facil" />
            <MoleculeCard buttonText="Practicar" cardType="simple" content="Brot, Wasser, Tag" title="🟡 Medio" />
            <MoleculeCard
               buttonText="Practicar"
               cardType="simple"
               content="Brot, Wasser, Tag"
               title="🔴 Dificil"
            />
         </div>
         <div>
            <MoleculeTable columns={columns} data={tableData} title="Tu vocabulario" />
         </div>
      </div>
   )
}

export default Vocabulary
