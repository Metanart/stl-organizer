import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import TypesafeI18n from '@i18n/i18n-react.generated'
import { loadLocaleAsync, loadNamespaceAsync } from '@i18n/i18n-util.generated.async'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { LOCALE } from '@shared/locale'

import { AppContainer } from './domains/App/containers/AppContainer'
import { AppProvidersContainer } from './domains/App/containers/AppProvidersContainer'
import { AppRoutesContainerMemo } from './domains/App/containers/AppRoutesContainer'
import { theme } from './theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

await loadLocaleAsync(LOCALE)
await loadNamespaceAsync(LOCALE, 'common')

root.render(
  <TypesafeI18n locale={LOCALE}>
    <HashRouter>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <AppContainer>
            <AppProvidersContainer>
              <AppRoutesContainerMemo />
            </AppProvidersContainer>
          </AppContainer>
        </ThemeProvider>
      </CssBaseline>
    </HashRouter>
  </TypesafeI18n>
)
