import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://pronoia9.github.io/jsm-krypt/',
  plugins: [react()],
});
