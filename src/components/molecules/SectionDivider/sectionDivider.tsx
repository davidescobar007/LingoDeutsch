type MoleculeSectionDividerProps = {
   className?: string
}

export const MoleculeSectionDivider = ({ className = '' }: MoleculeSectionDividerProps) => {
   return <div className={`border-base-300/50 my-8 h-px w-full border-t ${className}`} />
}
