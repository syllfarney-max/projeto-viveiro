import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_TITLE__: JSON.stringify('Viveiros ® Comurg - Sustentabilidade e Meio Ambiente'),
    __APP_DESCRIPTION__: JSON.stringify('Plataforma de gestão e contato do Viveiros ® Comurg, promovendo sustentabilidade e conservação ambiental.'),
  },
  build: { outDir: 'dist', emptyOutDir: true }
})
