import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/user": {
        target: "http://209.126.4.145:4000",
        changeOrigin: true,
        secure: false,
      },
      "/coins": {
        target: "http://209.126.4.145:4000",
        changeOrigin: true,
        secure: false,
      },
      "transactions": {
        target: "http://209.126.4.145:4000",
        changeOrigin: true,
        secure: false
      },
      "qrCode": {
        target: "http://209.126.4.145:4000",
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [react()],
})
