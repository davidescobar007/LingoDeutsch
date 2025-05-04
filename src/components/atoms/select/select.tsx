'use client'
import { FunctionComponent } from 'react'
import { useFormContext } from 'react-hook-form'

type TSelect = {
   id: string
   type?: 'primary' | 'secondary'
   label: string
   options: { value: string; label: string }[]
   disabled?: boolean
   required?: boolean
   className?: string
}

export const Select: FunctionComponent<TSelect> = ({
   id,
   type = 'primary',
   label,
   options,
   disabled = false,
   required = false,
   className = ''
}) => {
   const { register } = useFormContext() // Get register from context
   const typeClass = type === 'primary' ? 'select-primary' : 'select-secondary'
   return (
      <label className={`form-control w-full md:max-w-52 xl:max-w-72 ${typeClass} ${className}`}>
         <div className="label">
            <span className="label-text">{label}</span>
         </div>
         <select
            className="select select-bordered"
            disabled={disabled}
            id={id}
            required={required}
            {...register(id)} // Use register from context
         >
            <option disabled selected value="">
               Selecciona una opción
            </option>
            {options.map((option) => (
               <option key={option.value} value={option.value}>
                  {option.label}
               </option>
            ))}
         </select>
         {/* Optional: Add logic for bottom labels if needed */}
         {/* <div className="label">
            <span className="label-text-alt">Alt label</span>
            <span className="label-text-alt">Alt label</span>
         </div> */}
      </label>
   )
}
