import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Project is served from https://fosterion.github.io/webtools/ on GitHub Pages.
export default defineConfig({
  base: '/webtools/',
  plugins: [vue(), tailwindcss()],
})
