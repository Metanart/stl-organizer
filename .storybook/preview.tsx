// eslint-disable-next-line unused-imports/no-unused-imports
import React from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { Preview } from '@storybook/react-vite'

import { theme } from '../src/renderer/src/theme'

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
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    )
  ]
}

export default preview
