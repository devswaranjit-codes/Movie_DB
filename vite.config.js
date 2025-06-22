import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    hmr: {
      overlay: false, // Disable the overlay for HMR errors
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
