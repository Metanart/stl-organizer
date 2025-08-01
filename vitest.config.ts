import path from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    projects: [
      {
        resolve: {
          alias: {
            '@i18n': path.resolve(__dirname, 'src/i18n'),
            '@renderer': path.resolve(__dirname, 'src/renderer'),
            '@main': path.resolve(__dirname, 'src/main'),
            '@shared': path.resolve(__dirname, 'src/shared')
          }
        },
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./setupTests.ts'],
          include: ['src/**/*.test.ts', 'src/**/*.test.tsx']
        }
      }
    ]
  }
})
