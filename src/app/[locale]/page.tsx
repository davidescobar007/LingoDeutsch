"use client"
import { Suspense } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"

import Navbar from "@/components/_common/navbar"
import AtomButton from "@/components/atoms/button"
import AtomTitle from "@/components/atoms/title"
import { Link } from "@/navigation"

const Home = ({ params: { locale } }: { params: { locale: string } }) => {
   const t = useTranslations()
   return (
      <div className="flex h-screen flex-col">
         <Suspense fallback="loading Navigation bar...">
            <Navbar locale={locale} />
         </Suspense>
         <section className="mx-4 flex flex-grow justify-between md:mx-10 lg:mx-20">
            <div className="flex flex-wrap items-center justify-center">
               <div className="flex flex-wrap justify-center">
                  <div className="floating flex w-full flex-wrap justify-center md:w-1/3">
                     <div className="bg-green-4000 flex justify-center">
                        <Image
                           alt="map of Germany in cartoon style"
                           height="0"
                           priority
                           src="/images/germany.png"
                           width={110}
                        />
                     </div>
                     <div className="flex w-full justify-center">
                        <div className="bg-green-4000">
                           <Image
                              alt="map of Switzerland in cartoon style"
                              height="0"
                              priority
                              src="/images/switzerland.png"
                              width={150}
                           />
                        </div>
                        <div className="bg-yellow-4000">
                           <Image
                              alt="map of Austria in cartoon style"
                              height="0"
                              priority
                              src="/images/austria.png"
                              width={200}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="flex w-2/3 flex-wrap items-center justify-center">
                     <AtomTitle extraClassName="!text-3xl text-center">{t("home.tittle")}</AtomTitle>
                     <Link href="/app/learn">
                        <AtomButton extraClassName="btn-wide"> {t("home.button")}</AtomButton>
                     </Link>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}
export default Home
