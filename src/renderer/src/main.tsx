import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import { AppContainer } from './domains/App/containers/AppContainer'
import { AppProvidersContainer } from './domains/App/containers/AppProvidersContainer'
import { AppRoutesContainerMemo } from './domains/App/containers/AppRoutesContainer'

import 'reset.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <HashRouter>
    <AppContainer>
      <AppProvidersContainer>
        <AppRoutesContainerMemo />
      </AppProvidersContainer>
    </AppContainer>
  </HashRouter>
)
