import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { AppContainer } from './domains/App/containers/AppContainer'
import { AppProvidersContainer } from './domains/App/containers/AppProvidersContainer'
import { AppRoutesContainerMemo } from './domains/App/containers/AppRoutesContainer'
import { theme } from './theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <HashRouter>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <AppContainer>
        <AppProvidersContainer>
          <AppRoutesContainerMemo />
        </AppProvidersContainer>
      </AppContainer>
    </ThemeProvider>
  </HashRouter>
)
