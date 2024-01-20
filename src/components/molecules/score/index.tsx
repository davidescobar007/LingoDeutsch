import { useContext, useEffect } from "react"
import { useTranslation } from "react-i18next"

import AtomTitle from "@/components/atoms/title"

import { StoreContext } from "../../../context/global.state"

const MoleculeScore = () => {
   const { t } = useTranslation()
   const {
      getScoreList,
      state: { scoreList, user }
   } = useContext(StoreContext)

   useEffect(() => {
      getScoreList()
   }, [])
   const scoreMedals = {
      1: "🥇",
      2: "🥈",
      3: "🥉"
   }
   return (
      <>
         <AtomTitle extraClassName="font-medium text-xl mb-3 -mt-3 underline">
            {t("score.title")} <span className="text-3xl" />
         </AtomTitle>
         <ul className="w-full">
            {scoreList.map(({ username, score, position }, index) => (
               <li className="mb-4" key={username + position}>
                  <div
                     className={`stat border-secondary rounded-xl border-2 shadow-md ${
                        user?.username === username ? "bg-secondary" : "bg-white"
                     }`}
                  >
                     <div className="stat-figure text-secondary text-3xl">{scoreMedals[index + 1] || "⚡"}</div>
                     <div className="stat-title">
                        <span className="font-bold">
                           {position} - @{username}
                        </span>
                     </div>
                     <div className="stat-value text-lg">
                        {score} {t("score.span")}
                     </div>
                  </div>
               </li>
            ))}
         </ul>
      </>
   )
}

export default MoleculeScore
