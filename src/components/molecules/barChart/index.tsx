/* eslint-disable react/no-unused-prop-types */
import { FunctionComponent } from "react"
import { Bar } from "react-chartjs-2"
import type { ChartData, ChartOptions } from "chart.js"
// eslint-disable-next-line unused-imports/no-unused-imports
import { Chart as ChartJs, scales } from "chart.js/auto"

type TMoleculeBadgeList = {
   options: ChartOptions<"bar">
   data: ChartData<"bar">
}

const MoleculeBarChart: FunctionComponent<TMoleculeBadgeList> = ({ data }) => {
   return <Bar data={data} />
}

export default MoleculeBarChart
