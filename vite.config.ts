import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: ({'process.env': {'API_KEY': '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'}}),
})
