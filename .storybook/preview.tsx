// eslint-disable-next-line simple-import-sort/imports, unused-imports/no-unused-imports
import React from 'react'

import type { Decorator, Preview } from '@storybook/react-vite'

import TypesafeI18n from '../src/i18n/i18n-react.generated'
import { loadLocaleAsync, loadNamespaceAsync } from '../src/i18n/i18n-util.generated.async'
import { LOCALE } from '../src/shared/locale'

await loadLocaleAsync(LOCALE)
await loadNamespaceAsync(LOCALE, 'config')

const decorators: Decorator[] = [
  (Story) => {
    return (
      <TypesafeI18n locale={LOCALE}>
        <Story />
      </TypesafeI18n>
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
