import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://berita-indo-api-next.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy-news/, '/api/cnn-news')
      }
    }
  }
})