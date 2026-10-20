import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath } from 'node:url'
import { deploymentMetadata } from './scripts/deployment-metadata.js'

export default defineConfig(({ mode }) => ({
  plugins: [deploymentMetadata({
    siteUrl: process.env.SITE_URL || loadEnv(mode, process.cwd(), 'SITE_URL').SITE_URL,
    productionHost: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  })],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        contacto: fileURLToPath(new URL('./contacto.html', import.meta.url)),
      },
    },
  },
}))
