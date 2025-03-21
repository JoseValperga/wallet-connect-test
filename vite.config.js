import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getPlugin } from 'react-svg-module'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  static:{
    directory:'public',
    serveDirectory: true
  },
  plugins: [react(), getPlugin()],
})

