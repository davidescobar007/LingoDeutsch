/* eslint-disable react/no-multi-comp */

import React from "react"

export const Loader = (): React.JSX.Element => {
   return (
      <div className="gap-3">
         <div className="skeleton mb-3 h-2.5 w-24 bg-slate-400" />
         <div className="skeleton mb-3 h-2.5 w-36 bg-slate-400" />
         <div className="skeleton mb-3 h-2.5 w-36 bg-slate-400" />
      </div>
   )
}

export const CardLoader = (): React.JSX.Element => {
   return (
      <article className="card card-side mb-8 h-48 bg-white shadow-lg">
         <figure>
            <div className="avatar">
               <div className="w-52">
                  <div className="skeleton h-full w-full rounded-none" />
               </div>
            </div>
         </figure>
         <div className="card-body p-4">
            <article className="prose">
               <div className="skeleton my-3 h-5 w-full" />
               <div className="skeleton mb-3 h-3 w-10" />
               <div className="skeleton my-2 h-3 w-full" />
               <div className="skeleton mb-2 h-3 w-11/12" />
            </article>
         </div>
      </article>
   )
}

export const PracticeLoader = (): React.JSX.Element => {
   return (
      <div className="mt-3 flex w-full flex-wrap justify-center">
         <div className="w-full lg:w-10/12">
            <div className="mb-7 flex w-full justify-start gap-2">
               <div className="skeleton md:w-3/32 h-5 w-2/12" />
               <div className="skeleton md:w-3/32 h-5 w-2/12" />
               <div className="skeleton md:w-3/32 h-5 w-2/12" />
            </div>
            <div className="skeleton mb-5 h-5 w-full" />
            <div className="skeleton mb-6 h-24 w-full" />
            <div className="flex w-full justify-center gap-1">
               <div className="skeleton w-5/24 h-12 md:w-2/12" />
               <div className="skeleton w-5/24 h-12 md:w-2/12" />
               <div className="skeleton w-5/24 h-12 md:w-2/12" />
            </div>
         </div>
      </div>
   )
}

export const ArticleLoader = (): React.JSX.Element => {
   return (
      <div className="w-full content-center gap-2">
         <div className="skeleton mb-4 h-56 w-full" />
         <div className="skeleton mb-5 h-8 w-full" />
         <div className="my-6 flex justify-center gap-2">
            <div className="skeleton h-5 w-2/12" />
            <div className="skeleton h-5 w-2/12" />
         </div>
         <div className="flex flex-wrap justify-between gap-2">
            <div className="skeleton h-6 w-6/12" />
            <div className="skeleton h-6 w-2/12" />
            <div className="skeleton h-6 w-3/12" />
            <div className="skeleton h-6 w-1/12" />
            <div className="skeleton h-6 w-5/12" />
            <div className="skeleton h-6 w-4/12" />
            <div className="skeleton h-6 w-3/12" />
            <div className="skeleton h-6 w-1/12" />
            <div className="skeleton h-6 w-7/12" />
            <div className="skeleton h-6 w-8/12" />
            <div className="skeleton h-6 w-3/12" />
            <div className="skeleton h-6 w-5/12" />
            <div className="skeleton h-6 w-1/12" />
            <div className="skeleton h-6 w-4/12" />
         </div>
      </div>
   )
}

export const QuizzLoader = (): React.JSX.Element => {
   return (
      <div className="w-full content-center gap-3 md:w-10/12">
         <div className="skeleton mb-4 h-7 w-full" />
         <div className="skeleton mb-12 h-6 w-full" />

         <div className="flex flex-wrap justify-start gap-10">
            <div className="skeleton h-5 w-6/12" />
            <div className="skeleton h-5 w-6/12" />
            <div className="skeleton h-5 w-6/12" />
            <div className="skeleton h-5 w-6/12" />
         </div>
         <div className="skeleton w-7/24 mt-10 h-12" />
      </div>
   )
}

export const ProfileLoader = (): React.JSX.Element => {
   return (
      <div className="flex w-full flex-col items-center justify-center">
         <div className="skeleton h-24 w-24 rounded-full" />
         <div className="skeleton my-8 h-4 w-24" />

         <div className="mt-4 flex w-full flex-wrap justify-center gap-10 md:w-7/12">
            <div className="skeleton h-10 w-full" />
            <div className="skeleton h-10 w-full" />
            <div className="skeleton h-10 w-full" />
         </div>
      </div>
   )
}

export const SpinLoader = (): React.JSX.Element => {
   return <span className="loading loading-spinner loading-xs" />
}
