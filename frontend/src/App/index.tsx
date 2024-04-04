import { GoCpu } from 'react-icons/go'
import { VscPulse } from 'react-icons/vsc'
import { FiBarChart2 } from 'react-icons/fi'
import { RiHeartPulseLine } from 'react-icons/ri'

import layout from './layout.module.css'
import app from './app.module.css'
import card from './card.module.css'

function App() {
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
        </section>
        <section className={layout.average}>
          <header className={card.header}>
            <h2>Average load</h2>
            <VscPulse size={36} />
          </header>
        </section>
        <section className={layout.recovery}>
          <header className={card.header}>
            <h2>Recovery summary</h2>
            <RiHeartPulseLine size={36} />
          </header>
        </section>
        <section className={layout.heavy}>
          <header className={card.header}>
            <h2>CPU heavy load summary</h2>
            <FiBarChart2 size={36} />
          </header>
        </section>
      </main>
    </>
  )
}

export default App
