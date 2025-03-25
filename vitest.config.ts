import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environmentMatchGlobs: [
      ['src/http/controllers/**', 'prisma']
    ],
    dir: 'src',
    coverage: {
      enabled: true,
      provider: 'v8'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}) 