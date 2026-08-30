import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // ← 追記

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ← 追記
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true, // Docker環境でのファイル変更検知を強制
    },
  },
})