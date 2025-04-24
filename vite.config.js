import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/user": {
        target: "https://really-classic-moray.ngrok-free.app",
        changeOrigin: true,
        secure: false,
      },
      "/coins": {
        target: "https://really-classic-moray.ngrok-free.app",
        changeOrigin: true,
        secure: false,
      },
      "transactions": {
        target: "https://really-classic-moray.ngrok-free.app",
        changeOrigin: true,
        secure: false
      },
      "qrCode": {
        target: "https://really-classic-moray.ngrok-free.app",
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [react()],
})
