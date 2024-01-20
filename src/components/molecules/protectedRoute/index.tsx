import { FunctionComponent, ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { redirect } from "next/navigation"

import { handleErrorModal } from "../../../context/actions/global.actions"

type tMoleculeProtectedRoute = {
   children: ReactNode
}

const storedData = localStorage.getItem("pocketbase_auth")

const MoleculeProtectedRoute: FunctionComponent<tMoleculeProtectedRoute> = ({ children }) => {
   const { t } = useTranslation()
   const user = JSON.parse(storedData || "")
   if (user?.model?.id) {
      return children
   } else {
      handleErrorModal(t("constants.needSignUp"))
      redirect("/login")
   }
}

export default MoleculeProtectedRoute
