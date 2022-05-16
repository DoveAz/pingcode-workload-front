import react from '@vitejs/plugin-react'
import antdDayjs from 'antd-dayjs-vite-plugin'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), antdDayjs()],
  server: {
    host: '0.0.0.0',
    port: 9000,
    proxy: {
      '/api': 'http://localhost:8600',
    },
  },
})
