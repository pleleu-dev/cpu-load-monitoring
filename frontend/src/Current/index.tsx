/**
 * Current component
 * @param {Load[]} data - The load data
 * @Description This component displays the current load average
 */
import { HEAVY_LIMIT } from '../constants'
import current from './current.module.css'
import type { Load } from '../types'

type CurrentProps = {
  data: Load[]
}

function Current({ data }: CurrentProps) {
  const currentLoad = data.at(-1)

  if (!currentLoad) {
    return 'No data available.'
  }

  const isUnderHeavyLoad = currentLoad.average > HEAVY_LIMIT

  return (
    <>
      <p
        className={
          isUnderHeavyLoad
            ? current['indicator-heavy']
            : current['indicator-low']
        }
      >
        {currentLoad.average.toFixed(2)}
      </p>
      <p className={current.info}> 1 min load average </p>
    </>
  )
}

export { Current }
