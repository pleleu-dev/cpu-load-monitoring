import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CPU } from '../CPU'

import layout from '../styles/layout.module.css'
import app from './app.module.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <header className={app.header}>
        <h1>CPU Load Monitoring</h1>
      </header>
      <main className={`${layout.main} ${app.main}`}>
        <CPU />
      </main>
    </QueryClientProvider>
  )
}

export default App
