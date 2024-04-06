/**
 * Heavy laod bar chart component
 * @param {Load[]} data - The load data
 * @Description This component displays a bar chart with the low and heavy load averages
 */

import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

import { HEAVY_LIMIT } from '../constants'
import { getColors } from '../utils'
import heavy from './heavy.module.css'

import type { Load } from '../types'

type HeavyProps = {
  data: Load[]
}

function Heavy({ data }: HeavyProps) {
  const colors = getColors()

  const adaptedData = data.map((item) => {
    if (item.average > 1) {
      return { ...item, heavy: item.average - HEAVY_LIMIT, low: HEAVY_LIMIT }
    }

    return { ...item, heavy: 0, low: item.average }
  })

  return (
    <div className={heavy.chart}>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={adaptedData}>
          <CartesianGrid stroke={colors.dark} strokeDasharray='5 5' />
          <XAxis dataKey='formattedTime' stroke={colors.text} />
          <YAxis stroke={colors.text} />
          <ReferenceLine y={HEAVY_LIMIT} stroke={colors.heavy} />
          <Bar dataKey='low' stackId='a' fill={colors.low} />
          <Bar dataKey='heavy' stackId='a' fill={colors.heavy} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export { Heavy }
