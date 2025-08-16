import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { BASE_LOCALE } from '@i18n/utils/i18n-constants'
import TypesafeI18n from '@i18n/i18n-react.generated'
import { loadedLocales } from '@i18n/i18n-util.generated'
import { loadLocale } from '@i18n/i18n-util.generated.sync'
import { CssBaseline, ThemeProvider } from '@mui/material'

import { AppContainer } from './domains/App/containers/AppContainer'
import { AppProvidersContainer } from './domains/App/containers/AppProvidersContainer'
import { AppRoutesContainerMemo } from './domains/App/containers/AppRoutesContainer'
import { theme } from './theme'

import './styles/mui.overrides.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

loadLocale(BASE_LOCALE)

console.log('RENDERER loaded locales', loadedLocales)

root.render(
  <TypesafeI18n locale={BASE_LOCALE}>
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
