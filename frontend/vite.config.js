import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🔧 Corrige o caminho base para produção e local
export default defineConfig({
  plugins: [react()],
  base: './', // ✅ garante que arquivos públicos (ex: /comurg.jpg) funcionem no Render
})
