import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import { getColors } from '../utils'
import average from './average.module.css'

import type { Load } from '../types'

type AverageProps = {
  data: Load[]
}

function Average({ data }: AverageProps) {
  const colors = getColors()

  return (
    <div className={average.chart}>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={data}>
          <Line type='monotone' dataKey='average' stroke={colors.primary} />
          <CartesianGrid stroke={colors.dark} strokeDasharray='5 5' />
          <XAxis dataKey='formattedTime' stroke={colors.text} />
          <YAxis stroke={colors.text} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export { Average }
