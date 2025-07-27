// eslint-disable-next-line simple-import-sort/imports, unused-imports/no-unused-imports
import React from 'react'

import type { Decorator, Preview } from '@storybook/react-vite'

import TypesafeI18n from '../src/i18n/i18n-react.generated'
import { loadLocaleAsync, loadNamespaceAsync } from '../src/i18n/i18n-util.generated.async'
import { LOCALE } from '../src/shared/locale'
import { ThemeProvider } from '@mui/material'
import { theme } from '../src/renderer/src/theme'

await loadLocaleAsync(LOCALE)
await loadNamespaceAsync(LOCALE, 'app')
await loadNamespaceAsync(LOCALE, 'config')
await loadNamespaceAsync(LOCALE, 'home')
await loadNamespaceAsync(LOCALE, 'models')
await loadNamespaceAsync(LOCALE, 'common')
await loadNamespaceAsync(LOCALE, 'sources')
await loadNamespaceAsync(LOCALE, 'tasks')

const decorators: Decorator[] = [
  (Story) => {
    return (
      <ThemeProvider theme={theme}>
        <TypesafeI18n locale={LOCALE}>
          <Story />
        </TypesafeI18n>
      </ThemeProvider>
    )
  }
]

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  decorators
}

export default preview
