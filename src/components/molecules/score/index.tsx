"use client"
import { FunctionComponent } from "react"
import { useTranslations } from "next-intl"

import { TScore, TUser } from "@/modules/actions/types"

type MoleculeScoreProps = {
   scoreList: TScore
   user: TUser | undefined
}
const MoleculeScore: FunctionComponent<MoleculeScoreProps> = ({ scoreList, user }) => {
   const t = useTranslations()

   const scoreMedals: { [key: string]: string } = {
      "1": "🥇",
      "2": "🥈",
      "3": "🥉"
   }

   return (
      <aside className="hidden w-4/12 lg:block">
         <div className="stats stats-vertical shadow">
            <div className="stat">
               <div className="stat-title">Downloads</div>
               <div className="stat-value">31K</div>
               <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat">
               <div className="stat-title">New Users</div>
               <div className="stat-value">4,200</div>
               <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
               <div className="stat-title">New Registers</div>
               <div className="stat-value">1,200</div>
               <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
         </div>
      </aside>
   )
}

export default MoleculeScore
