import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { defineConfig } from 'vitest/config'

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    globals: true,
    projects: [
      {
        resolve: {
          alias: {
            '@i18n': path.resolve(__dirname, 'src/i18n'),
            '@renderer': path.resolve(__dirname, 'src/renderer/src'),
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
      },
      {
        extends: true,
        resolve: {
          alias: {
            '@i18n': path.resolve(__dirname, 'src/i18n'),
            '@renderer': path.resolve(__dirname, 'src/renderer/src'),
            '@shared': path.resolve(__dirname, 'src/shared')
          }
        },
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') })
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }]
          },
          setupFiles: ['.storybook/vitest.setup.ts']
        }
      }
    ]
  }
})
