import { ProfileLoader } from "@/components/atoms/loader"

const Loading = () => {
   return (
      <section className="flex w-full justify-center p-5 lg:px-20">
         <ProfileLoader />
      </section>
   )
}

export default Loading
