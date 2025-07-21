import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server:{
    proxy: {
      '/api' : {
        target : 'https://api-recipes-alpha.vercel.app/api',
        changeOrigin: true,
        headers: {
          Accept : 'application/json',
          'Content-Type' : 'application/json'
        }
      }
    }
  }
})
