import { ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles'
import * as React from 'react'

interface AppThemeProps {
  themeComponents: ThemeOptions
  children: React.ReactNode
}

export const AppTheme = ({ themeComponents, children }: AppThemeProps) => {
  const theme = createTheme(themeComponents)
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
