'use client'
import { AtomText, AtomTitle, Icon } from '@/components/atoms'
import { MoleculeMiniCard } from '@/components/molecules'

const Vocabulary = () => {
   return (
      <div className="w-full">
         <header className="w-full">
            <AtomTitle type="h3">Tu guia de Vocabulario</AtomTitle>
            <AtomText>
               Explora tu guía de vocabulario. Selecciona tu set de palabras por nivel para empezar a aprender y
               practicar.
            </AtomText>
         </header>
         <MoleculeMiniCard
            className="!border-primary"
            content="tienes 250 palabras guardadas en tu vocabulario"
            icon={<Icon icon="book" iconSize="large" iconState="primary" />}
         />
         <AtomTitle type="h5">Practica por nivel de dificultad</AtomTitle>

         <div className="flex w-full flex-wrap justify-between gap-4">
            <div className="card bg-base-100 w-full shadow-xl sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.666rem)]">
               <div className="card-body">
                  <h2 className="card-title">Card title!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                     <button className="btn btn-primary">Buy Now</button>
                  </div>
               </div>
            </div>
            <div className="card bg-base-100 w-full shadow-xl sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.666rem)]">
               <div className="card-body">
                  <h2 className="card-title">Card title!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                     <button className="btn btn-primary">Buy Now</button>
                  </div>
               </div>
            </div>
            <div className="card bg-base-100 w-full shadow-xl sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.666rem)]">
               <div className="card-body">
                  <h2 className="card-title">Card title!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                     <button className="btn btn-primary">Buy Now</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Vocabulary
