import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '~': resolve(__dirname, './'),
      '@': resolve(__dirname, 'src'),
      "@pages": resolve(__dirname, "src/pages"),
      "@utils": resolve(__dirname, "src/utils"),
      "@styles": resolve(__dirname, "src/styles"),
      "@assets": resolve(__dirname, "src/assets"),
      "@layouts": resolve(__dirname, "src/layouts"),
      "@context": resolve(__dirname, "src/context"),
      "@services": resolve(__dirname, "src/services"),
      "@forms": resolve(__dirname, "src/components/forms"),
      "@views": resolve(__dirname, "src/components/views"),
      "@components": resolve(__dirname, "src/components/elements"),
    }
  },
  build: {
    outDir: 'build',
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true, 
    strictPort: true,
    port: 5173,
  },
  plugins: [react(), AutoImport({
    imports: ['react', 'react-router-dom', 'ahooks'],
    dts: './src/auto-imports.d.ts',
    eslintrc: {
      enabled: false,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: true
    }
  })],
})
