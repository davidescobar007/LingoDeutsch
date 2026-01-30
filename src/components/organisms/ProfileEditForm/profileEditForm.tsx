'use client'
import { useTranslations } from 'next-intl'

import { AtomButton, AtomInput, AtomTitle, SpinLoader } from '@/components/atoms'
import { TUser } from '@/modules/actions/types'

type OrganismProfileEditFormProps = {
   extraClassName?: string
   hasChanges: boolean
   isPending: boolean
   onCancel: () => void
   onChange: (_e: any) => void
   onSubmit: (_e: any) => void
   userCopy: TUser
   userInfo: TUser
}

export const OrganismProfileEditForm = ({
   extraClassName = '',
   hasChanges,
   isPending,
   onCancel,
   onChange,
   onSubmit,
   userCopy,
   userInfo
}: OrganismProfileEditFormProps) => {
   const t = useTranslations()

   return (
      <div className={`border-base-300 bg-base-100 rounded-lg border p-6 ${extraClassName}`}>
         <AtomTitle extraClassName="!mb-4" type="h4">
            Editar Perfil
         </AtomTitle>

         <form className="space-y-4" onSubmit={onSubmit}>
            <AtomInput
               inputId="name"
               labelText={t('profile.name')}
               maxLength="30"
               name="name"
               onChange={onChange}
               placeholder={userCopy?.name}
               value={userInfo?.name}
               withLabel
            />

            <AtomInput
               id="username"
               labelText={t('profile.alias')}
               maxLength="13"
               name="username"
               onChange={onChange}
               placeholder={`@${userCopy?.username}`}
               value={`@${userInfo?.username}`}
               withLabel
            />

            <AtomInput
               disabled
               id="email"
               labelText={t('profile.email')}
               name="email"
               onChange={onChange}
               placeholder={userCopy?.email}
               value={userInfo?.email}
               withLabel
            />

            {/* Action Buttons */}
            <div
               className={`flex gap-3 transition-all duration-500 ${
                  hasChanges ? 'opacity-100' : 'pointer-events-none opacity-0'
               }`}
            >
               <AtomButton
                  disabled={isPending}
                  extraClassName="flex-1"
                  onClick={onCancel}
                  type="reset"
                  variant="OUTLINE"
               >
                  {isPending ? <SpinLoader centered={false} size="sm" /> : 'Cancelar'}
               </AtomButton>
               <AtomButton disabled={isPending} extraClassName="flex-1" type="submit" variant="PRIMARY">
                  {isPending ? <SpinLoader centered={false} size="sm" /> : t('profile.saveButton')}
               </AtomButton>
            </div>
         </form>
      </div>
   )
}
