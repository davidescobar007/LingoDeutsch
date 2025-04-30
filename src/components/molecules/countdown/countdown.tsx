'use client'
import React, { useEffect, useState } from 'react'

interface AtomCountdownProps {
   targetDate: Date
}

export const AtomCountdown: React.FC<AtomCountdownProps> = ({ targetDate }) => {
   const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date()
      let timeLeft = {
         days: 0,
         hours: 0,
         minutes: 0,
         seconds: 0
      }

      if (difference > 0) {
         timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
         }
      }

      return timeLeft
   }

   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

   useEffect(() => {
      const timer = setTimeout(() => {
         setTimeLeft(calculateTimeLeft())
      }, 1000)

      // Clear timeout if the component is unmounted or the countdown finishes
      return () => clearTimeout(timer)
   }) // Runs on every render to update the countdown

   const addLeadingZero = (value: number) => {
      return value < 10 ? `0${value}` : value
   }

   return (
      <div className="flex h-24 w-full flex-wrap justify-center gap-4  text-center">
         {timeLeft.days > 0 && (
            <div className="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
               <span className="countdown font-mono text-5xl">
                  {/* @ts-ignore */}
                  <span style={{ '--value': timeLeft.days }} />
               </span>
               Dias
            </div>
         )}
         <div className="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
            <span className="countdown font-mono text-5xl">
               {/* @ts-ignore */}
               <span style={{ '--value': addLeadingZero(timeLeft.hours) }} />
            </span>
            Horas
         </div>
         <div className="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
            <span className="countdown font-mono text-5xl">
               {/* @ts-ignore */}
               <span style={{ '--value': addLeadingZero(timeLeft.minutes) }} />
            </span>
            Min
         </div>
         <div className="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
            <span className="countdown font-mono text-5xl">
               {/* @ts-ignore */}
               <span style={{ '--value': addLeadingZero(timeLeft.seconds) }} />
            </span>
            Seg
         </div>
      </div>
   )
}
