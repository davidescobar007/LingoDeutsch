import { FunctionComponent } from "react"
import { useTranslations } from "next-intl"

import AtomStat from "@/components/atoms/stat"
import { useGetCardsList } from "@/store/cards"

const MoleculeCardsStats: FunctionComponent = () => {
   const t = useTranslations()
   const { data: cards } = useGetCardsList()
   return (
      <div className="stats mb-6 w-full shadow">
         <AtomStat
            content={cards?.filter((card) => card.level === "easy").length}
            endContent={t("practice.cards")}
            extraClassName="text-accent"
            title={`🙂 ${t("practice.cardStat.easy")}`}
         />
         <AtomStat
            content={cards?.filter((card) => card.level === "medium").length}
            endContent={t("practice.cards")}
            extraClassName="text-primary"
            title={`🤔 ${t("practice.cardStat.medium")}`}
         />
         <AtomStat
            content={cards?.filter((card) => card.level === "hard").length}
            endContent={t("practice.cards")}
            extraClassName="text-warning"
            title={`😰 ${t("practice.cardStat.hard")}`}
         />
      </div>
   )
}

export default MoleculeCardsStats
