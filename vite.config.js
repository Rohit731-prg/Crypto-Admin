import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/users": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
      "/coins": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
      "transactions": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [react()],
})
