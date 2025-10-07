import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blood: resolve(__dirname, 'blood/index.html'),
        organ: './src/pages/organ.html',
        questions: './src/pages/chatbot.html',
      },
    },
  },
})
