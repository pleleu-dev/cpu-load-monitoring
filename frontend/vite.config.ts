import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/cpu-monitoring/average-load': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
