import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// En desarrollo el frontend corre en el puerto 5173 y el servidor en el 3001.
// El proxy manda las peticiones a /api y /uploads al servidor.
export default defineConfig({
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1000 },
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
      '/uploads': 'http://localhost:3001',
    },
  },
})
