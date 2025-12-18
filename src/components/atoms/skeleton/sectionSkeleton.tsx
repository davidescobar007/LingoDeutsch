interface SectionSkeletonProps {
   height?: string
}

export const AtomSectionSkeleton = ({ height = 'h-96' }: SectionSkeletonProps) => (
   <div className={`${height} animate-pulse bg-gradient-to-b from-gray-100 to-gray-50`}>
      <div className="container mx-auto px-4 py-16">
         <div className="mx-auto max-w-2xl space-y-4">
            <div className="mx-auto h-8 w-32 rounded-full bg-gray-200" />
            <div className="mx-auto h-10 w-3/4 rounded-lg bg-gray-200" />
            <div className="mx-auto h-6 w-1/2 rounded-lg bg-gray-200" />
         </div>
      </div>
   </div>
)
