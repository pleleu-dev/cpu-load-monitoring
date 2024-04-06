/**
 * Recovery component
 * @param {Load[]} data - The load data
 * @Description This component displays a grid with a green square for each low load and a red square for each heavy load, and a message if the current load is under heavy load
 */

import recovery from './recovery.module.css'
import { HEAVY_LIMIT } from '../constants'

import type { Load } from '../types'

type RecoveryProps = {
  data: Load[]
}

function Recovery({ data }: RecoveryProps) {
  const currentLoad = data.at(-1)

  if (!currentLoad) {
    return 'No data available.'
  }

  const isUnderHeavyLoad = currentLoad && currentLoad.average > HEAVY_LIMIT
  const heavyLoadArr = data.filter((item) => item.average > HEAVY_LIMIT)
  const lastHeavy = heavyLoadArr.at(-1)
  const lastRecovery = lastHeavy
    ? data.find((item) => item.time > lastHeavy.time)
    : data[0]

  return (
    <>
      <div role='grid' className={recovery.grid}>
        {data.map((item) => (
          <div
            key={item.time}
            role='gridcell'
            className={
              item.average > 1
                ? recovery['square-heavy']
                : recovery['square-low']
            }
          >
            <p role='tooltip' className={recovery.tooltip}>
              {item.formattedTime}
            </p>
          </div>
        ))}
      </div>
      {isUnderHeavyLoad ? (
        <p className={recovery.info}>Under heavy load</p>
      ) : (
        <p className={recovery.info}>
          Last recovery at {lastRecovery?.formattedTime}
        </p>
      )}
    </>
  )
}

export { Recovery }
