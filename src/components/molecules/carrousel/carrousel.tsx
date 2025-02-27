import React, { ReactElement } from 'react'
import { GiPlainCircle } from 'react-icons/gi'
import { RiCheckboxBlankCircleLine } from 'react-icons/ri'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

import { Icon } from '@/components/atoms'

import { NextButton, PrevButton, usePrevNextButtons } from './arrowButtons'
import { DotButton, useDotButton } from './dotButtons'

import './styles.scss'

type PropType = {
   options?: EmblaOptionsType
   children: ReactElement<{ className?: string }>[]
}

export const EmblaCarousel: React.FC<PropType> = ({ options, children }) => {
   const [emblaRef, emblaApi] = useEmblaCarousel(options)

   const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

   const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

   return (
      <section className="embla">
         <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container gap-8">
               {React.Children.map(children, (child) =>
                  React.cloneElement(child, { className: `${child.props.className || ''} embla__slide` })
               )}
            </div>
         </div>

         <div className="flex items-center justify-between">
            <div className="flex gap-3">
               <PrevButton disabled={prevBtnDisabled} onClick={onPrevButtonClick} />
               <NextButton disabled={nextBtnDisabled} onClick={onNextButtonClick} />
            </div>

            <div className="flex gap-2">
               {scrollSnaps.map((_, index) => (
                  <DotButton key={index} onClick={() => onDotButtonClick(index)}>
                     {index === selectedIndex ? (
                        <Icon icon={<GiPlainCircle />} iconSize="medium" />
                     ) : (
                        <Icon icon={<RiCheckboxBlankCircleLine />} iconSize="medium" />
                     )}
                  </DotButton>
               ))}
            </div>
         </div>
      </section>
   )
}
