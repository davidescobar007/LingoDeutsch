import { FunctionComponent } from "react"
import { useTranslation } from "react-i18next"

import AtomStat from "@/components/atoms/stat"

type TMoleculeCardsStats = {
   easyCards: number
   mediumCards: number
   hardCards: number
}

const MoleculeCardsStats: FunctionComponent<TMoleculeCardsStats> = ({ easyCards, mediumCards, hardCards }) => {
   const { t } = useTranslation()

   return (
      <div className="stats mb-6 w-full shadow">
         <AtomStat
            content={easyCards}
            endContent={t("practice.cards")}
            title={`🙂 ${t("practice.cardStat.easy")}`}
         />
         <AtomStat
            content={mediumCards}
            endContent={t("practice.cards")}
            title={`🤔 ${t("practice.cardStat.medium")}`}
         />
         <AtomStat
            content={hardCards}
            endContent={t("practice.cards")}
            title={`😰 ${t("practice.cardStat.hard")}`}
         />
      </div>
   )
}

export default MoleculeCardsStats
