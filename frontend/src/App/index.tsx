import layout from './layout.module.css'
import app from './app.module.css'

function App() {
  return (
    <>
      <header className={app.header}>
        <h1>CPU Load Monitoring</h1>
      </header>
      <main className={`${layout.main} ${app.main}`}>
        <section className={layout.current}>
          <h2>Current average load</h2>
        </section>
        <section className={layout.average}>
          <h2>Average load</h2>
        </section>
        <section className={layout.recovery}>
          <h2>Recovery summary</h2>
        </section>
        <section className={layout.heavy}>
          <h2>CPU heavy load summary</h2>
        </section>
      </main>
    </>
  )
}

export default App
