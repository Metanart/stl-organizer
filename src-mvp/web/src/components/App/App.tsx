import CssBaseline from '@mui/material/CssBaseline'
import { FC } from 'react'

import { AppNavigation } from './AppNavigation'
import { AppTheme } from './AppTheme'
import { darkGreenTheme } from './themes'

type Props = { children: React.ReactNode }

export const App: FC<Props> = (props) => {
  const { children } = props

  return (
    <AppTheme themeComponents={darkGreenTheme}>
      <CssBaseline enableColorScheme />
      <AppNavigation />
      {children}
    </AppTheme>
  )
}
