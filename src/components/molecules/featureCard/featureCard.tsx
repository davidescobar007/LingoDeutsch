import { ReactNode } from 'react'

type MoleculeFeatureCardProps = {
   content?: ReactNode
   description: string
   gradient: string
   icon: string
   iconBg: string
   title: string
}

export const MoleculeFeatureCard = ({
   content,
   description,
   gradient,
   icon,
   iconBg,
   title
}: MoleculeFeatureCardProps) => {
   return (
      <div className="group">
         <div
            className={`card-3d overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br ${gradient} to-white p-12 transition-all hover:shadow-2xl`}
         >
            <div className={`${iconBg} mb-6 inline-block rounded-2xl p-4`}>
               <div className="text-5xl">{icon}</div>
            </div>
            <h3 className="mb-4 text-3xl font-black text-gray-900">{title}</h3>
            <p className="mb-6 text-base leading-relaxed text-gray-600">{description}</p>
            {content}
         </div>
      </div>
   )
}
