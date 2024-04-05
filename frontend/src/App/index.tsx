import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  ReferenceLine,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts'
import { GoCpu } from 'react-icons/go'
import { VscPulse } from 'react-icons/vsc'
import { FiBarChart2 } from 'react-icons/fi'
import { RiHeartPulseLine } from 'react-icons/ri'

import { cssValue } from '../utils'

import layout from './layout.module.css'
import app from './app.module.css'
import card from './card.module.css'

function App() {
  const data = [
    { time: 1712299156981, average: 0.1 },
    { time: 1712299159991, average: 0.2 },
    { time: 1712299160001, average: 0.3 },
    { time: 1712299156011, average: 0.4 },
    { time: 1712299157021, average: 0.5 },
    { time: 1712299158031, average: 2.6 },
    { time: 1712299159041, average: 2.7 },
    { time: 1712299156051, average: 0.8 },
    { time: 1712299156061, average: 0.2 },
    { time: 1712299156071, average: 0.4 },
  ]

  const adaptedData = data.map((item) => {
    const date = new Date(item.time)
    return { ...item, formattedTime: date.toLocaleTimeString() }
  })

  const dataHeavy = adaptedData.map((item) => {
    if (item.average > 1) {
      return { ...item, heavy: item.average - 1, low: 1 }
    }

    return { ...item, heavy: 0, low: item.average }
  })
  const heavyColor = cssValue('--heavy')
  const lowColor = cssValue('--low')
  const textColor = cssValue('--text')
  const darkColor = cssValue('--dark')
  const primaryColor = cssValue('--primary')

  const currentLoad = adaptedData.at(-1)
  const isUnderHeavyLoad = currentLoad && currentLoad.average > 1
  const heavyLoadArr = adaptedData.filter((item) => item.average > 1)
  const lastHeavy = heavyLoadArr.at(-1)
  const lastRecovery = lastHeavy
    ? adaptedData.find((item) => item.time > lastHeavy.time)
    : adaptedData[0]

  return (
    <>
      <header className={app.header}>
        <h1>CPU Load Monitoring</h1>
      </header>
      <main className={`${layout.main} ${app.main}`}>
        <section className={layout.current}>
          <header className={card.header}>
            <h2>Current average load</h2>
            <GoCpu size={36} />
          </header>
          <p
            className={
              isUnderHeavyLoad ? card['indicator-heavy'] : card['indicator-low']
            }
          >
            {currentLoad ? currentLoad.average : 'Loading...'}
          </p>
          <p className={card.info}> 1 min load average </p>
        </section>
        <section className={layout.average}>
          <header className={card.header}>
            <h2>Average load</h2>
            <VscPulse size={36} />
          </header>
          <div className={card.chart}>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={adaptedData}>
                <Line type='monotone' dataKey='average' stroke={primaryColor} />
                <CartesianGrid stroke={darkColor} strokeDasharray='5 5' />
                <XAxis dataKey='formattedTime' stroke={textColor} />
                <YAxis stroke={textColor} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className={layout.recovery}>
          <header className={card.header}>
            <h2>Recovery summary</h2>
            <RiHeartPulseLine size={36} />
          </header>
          <div role='grid' className={card.grid}>
            {adaptedData.map((item) => (
              <div
                key={item.time}
                role='gridcell'
                className={
                  item.average > 1 ? card['square-heavy'] : card['square-low']
                }
              >
                <p role='tooltip' className={card.tooltip}>
                  {item.formattedTime}
                </p>
              </div>
            ))}
          </div>
          {isUnderHeavyLoad ? (
            <p className={card.info}>Under heavy load</p>
          ) : (
            <p className={card.info}>
              Last recovery at {lastRecovery?.formattedTime}
            </p>
          )}
        </section>
        <section className={layout.heavy}>
          <header className={card.header}>
            <h2>CPU heavy load</h2>
            <FiBarChart2 size={36} />
          </header>
          <div className={card.chart}>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={dataHeavy}>
                <CartesianGrid stroke={darkColor} strokeDasharray='5 5' />
                <XAxis dataKey='formattedTime' stroke={textColor} />
                <YAxis stroke={textColor} />
                <ReferenceLine y={1} stroke={heavyColor} />
                <Bar dataKey='low' stackId='a' fill={lowColor} />
                <Bar dataKey='heavy' stackId='a' fill={heavyColor} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
