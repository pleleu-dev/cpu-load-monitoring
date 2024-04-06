import { CPU } from '../CPU'

import layout from '../styles/layout.module.css'
import app from './app.module.css'

function App() {
  return (
    <>
      <header className={app.header}>
        <h1>CPU Load Monitoring</h1>
      </header>
      <main className={`${layout.main} ${app.main}`}>
        <CPU />
      </main>
    </>
  )
}

export default App
